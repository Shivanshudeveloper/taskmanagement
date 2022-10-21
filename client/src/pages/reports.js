import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { AuthGuard } from 'src/components/authentication/auth-guard';
import { CustomerListResults } from 'src/components/customer/customer-list-results';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { Budget } from 'src/components/dashboard/budget';
import { TasksProgress } from 'src/components/dashboard/tasks-progress';
import { TotalCustomers } from 'src/components/dashboard/total-customers';
import ReportTable from 'src/components/report/report-table';
import { API_SERVICE } from 'src/config';
import { useAuth } from 'src/hooks/use-auth';

const Reports = () => {

    const [customers, setCustomers] = useState([]);
    const [month, setMonth] = useState(-1);
    const { user } = useAuth();

    function checkMonth(m) {
        if (month === -1) {
            return true;
        } else {
            console.log(m.split("Z")[0].split("-"));
            return parseInt(m.split("Z")[0].split("-")[1]) == month + 1;
        }
    }

    const allTasks = () => {
        return customers.filter((customer) => {
            return checkMonth(customer.createdAt);
        });
    };

    const completedTasks = () => {
        console.log(allTasks());
        return customers.filter((customer) => {
            return checkMonth(customer.createdAt) && customer.status === 1;
        });
    };

    const pendingTasks = () => {
        return customers.filter((customer) => {
            return checkMonth(customer.createdAt) && customer.status === 0;
        });
    };

    const fetchTasks = async (userType) => {
        if(userType=="admin"){
          var tasksAllUrl =`${API_SERVICE}/get_all_tasks_complete`
        }
        else{
          var tasksAllUrl = `${API_SERVICE}/get_all_tasks_complete/${user?.id}`
        }
        
        try {
            const response = await fetch(tasksAllUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            });
            if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            setCustomers(data);
            }
        } catch (err) {
            console.log(err);
        }
      }
    

    useEffect(async () => {
      const userId = sessionStorage.getItem("userId");
      try {
        const response = await fetch(`${API_SERVICE}/get_user/${userId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 200) {
          const userData = await response.json();
          var userType=userData.userType
        }
      } catch (error) {
        console.log(error);
      }  
        fetchTasks(userType);
    }, []);

  return (
    <>
      <Head>
        <title>Reports | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget tasks={allTasks()?.length} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers tasks={pendingTasks()?.length} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress tasks={completedTasks()?.length} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={month}
                  label="Select Month"
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <MenuItem value={-1}>All</MenuItem>
                  <MenuItem value={0}>January</MenuItem>
                  <MenuItem value={1}>February</MenuItem>
                  <MenuItem value={2}>March</MenuItem>
                  <MenuItem value={3}>April</MenuItem>
                  <MenuItem value={4}>May</MenuItem>
                  <MenuItem value={5}>June</MenuItem>
                  <MenuItem value={6}>July</MenuItem>
                  <MenuItem value={7}>August</MenuItem>
                  <MenuItem value={8}>September</MenuItem>
                  <MenuItem value={9}>October</MenuItem>
                  <MenuItem value={10}>November</MenuItem>
                  <MenuItem value={11}>December</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  py: 8,
                }}
              >
                <Container maxWidth={false}>
                    <Box sx={{ mt: 3 }}>
                        {/* <CustomerListResults customers={allTasks()} /> */}
                        <ReportTable customers={allTasks()}/>
                    </Box>
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};
Reports.getLayout = (page) => (
    <DashboardLayout>
        <AuthGuard> {page}</AuthGuard>
    </DashboardLayout>
);
  
export default Reports