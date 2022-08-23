import { Box, Button, Card, CardContent, Checkbox, Container, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/use-auth';

import { API_SERVICE } from "src/config";
import { DashboardLayout } from 'src/components/dashboard-layout';
import { AuthGuard } from 'src/components/authentication/auth-guard';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Budget } from 'src/components/dashboard/budget';
import { TotalCustomers } from 'src/components/dashboard/total-customers';
import { TasksProgress } from 'src/components/dashboard/tasks-progress';

const tasksAssigned = () => {

    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();
    // const [totTasks, setTotTasks] = useState(0);
    const [totApprov, setTotApprov] = useState(0);
    const [totComp, setTotComp] = useState(0);
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
        }
      })
      console.log("comp", totComp)
      console.log("approv", totApprov);
    }, [tasks])

    const handleSelectOne = async (task) => {
        if(task.approved === 1){
          return;
        }
        // task.status = 1;
        // console.log({...task});
        task.status = (task.status === 1 ? 0 : 1);
        // console.log(task._id);
        // console.log(user?.id);
        try {
          const response = await fetch(`${API_SERVICE}/edit_task/${task._id}/${task.userId}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({...task})
          });
          if (response.status === 200) {
            alert("Task Updated");
            const userData = await response.json();
            console.log(userData);
            // setToggler();
          }
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <>
      <Container>

          <Grid container spacing={3} marginTop='40px' >
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget tasks={tasks.length} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers tasks={totApprov} flag={1}/>
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress tasks={totComp} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
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
          </Grid>

        <Typography variant='h3' align='center' margin='40px'>Tasks Assigned</Typography>
        <PerfectScrollbar>
            <Box sx={{ minWidth: 500 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Task</TableCell>
                    <TableCell>Assigned On</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Points</TableCell>
                    <TableCell>Created At</TableCell>
                    {/* <TableCell>Action</TableCell> */}
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    tasks.map(task => (
                      <TableRow
                        hover
                        key={task._id}
                      >
                        <TableCell>{task.name}</TableCell>
                        <TableCell>{task.fromDate}</TableCell>
                        <TableCell>{task.targetDate}</TableCell>
                        <TableCell>{task.points}</TableCell>
                        <TableCell>{task.createdAt.split("T")[0]}</TableCell>
                        <TableCell padding="checkbox">
                          <Button 
                            variant="contained" 
                            color={task.status === 1 ? "success" : "error"} 
                            onClick={() => handleSelectOne(task)}
                          >
                            {/* {task.status === 1 ? "Complete" : "Incomplete"} */}
                            {task.status === 0 ? "Inomplete" : (task.approved === 1) ? "Approved" : "Complete"}
                          </Button>
                          {/* <Button variant="contained" color="error">
                            Error
                          </Button> */}
                        </TableCell>
                      </TableRow>

                    ))
                  }
                </TableBody>
              </Table>
            </Box>
        </PerfectScrollbar>
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