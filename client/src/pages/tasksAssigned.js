import { Box, Button, Card, CardContent, Checkbox, Container, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/use-auth';

import { API_SERVICE } from "src/config";
import { DashboardLayout } from 'src/components/dashboard-layout';
import { AuthGuard } from 'src/components/authentication/auth-guard';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Budget } from 'src/components/dashboard/budget';
import { TotalCustomers } from 'src/components/dashboard/total-customers';
import { TasksProgress } from 'src/components/dashboard/tasks-progress';
import TasksAssignedTable from 'src/components/tasksAssigned/tasks-assigned-table';

const tasksAssigned = () => {

    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();
    // const [totTasks, setTotTasks] = useState(0);
    const [totApprov, setTotApprov] = useState(0);
    const [totComp, setTotComp] = useState(0);
    const [totMarks, setTotMarks] = useState(0);
    // let totTasks = 0;
    
    useEffect(async () => {
      try {
        const response = await fetch(`${API_SERVICE}/get_all_tasks_mail/${user?.email}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setTasks(data);
        }
        console.log(user?.email)
      } 
      catch (err) {
        console.log(err);
      };
      
      // tasks.map((task) => {
      //   setTotTasks(totTasks + 1);
      // })
      // console.log("total", totTasks)
    }, [])

    useEffect(() => {
      tasks.map((task) => {
        if(task.status === 1)
        {
          setTotComp(totComp + 1);
        }
        else {

        }
        if(task.approved === 1)
        {
          setTotApprov(totApprov + 1);
          setTotMarks(totMarks + task?.points);
          console.log(totMarks);
        }
      })
      console.log("comp", totComp)
      console.log("approv", totApprov);
    }, [tasks])

  return (
    <>
      <Container>

          <Grid container spacing={2} marginTop='40px' >
            <Grid item xl={1} lg={12/5} sm={6} xs={12}>
              <Budget tasks={tasks.length} />
            </Grid>
            <Grid item xl={1} lg={12/5} sm={6} xs={12}>
              <TotalCustomers tasks={totApprov} flag={1}/>
            </Grid>
            <Grid item xl={1} lg={12/5} sm={6} xs={12}>
              <TasksProgress tasks={totComp} />
            </Grid>
            <Grid item xl={1} lg={12/5} sm={6} xs={12}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
                    <Grid item>
                      <Typography color="textSecondary" gutterBottom variant="overline">
                        INCOMPLETE TASKS
                      </Typography>
                      <Typography color="textPrimary" variant="h4">
                        {tasks.length - totComp}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xl={1} lg={12/5} sm={6} xs={12}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
                    <Grid item>
                      <Typography color="textSecondary" gutterBottom variant="overline">
                        TOTAL MARKS
                      </Typography>
                      <Typography color="textPrimary" variant="h4">
                        {totMarks}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        <Typography variant='h3' align='center' margin='40px'>Tasks Assigned</Typography>
        <TasksAssignedTable
          tasks={tasks}
        />
      </Container>
    </>
  )
}

tasksAssigned.getLayout = (page) => (
    <DashboardLayout>
      <AuthGuard> {page}</AuthGuard>
    </DashboardLayout>
  );

export default tasksAssigned