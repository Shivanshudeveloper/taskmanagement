import Head from "next/head";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Budget } from "../../components/dashboard/budget";
import { LatestOrders } from "../../components/dashboard/latest-orders";
import { LatestProducts } from "../../components/dashboard/latest-products";
import { Sales } from "../../components/dashboard/sales";
import { TasksProgress } from "../../components/dashboard/tasks-progress";
import { TotalCustomers } from "../../components/dashboard/total-customers";
import { TotalProfit } from "../../components/dashboard/total-profit";
import { TrafficByDevice } from "../../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useRouter } from 'next/router'
import { CustomerListResults } from "../../components/customer/customer-list-results";
import { CustomerListToolbar } from "../../components/customer/customer-list-toolbar";
import { ApprovalListResults } from "../../components/approval/approval-list-results";

// import { customers } from "../../__mocks__/customers";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { useEffect, useState } from "react";

import { API_SERVICE } from "src/config";
import { useAuth } from "src/hooks/use-auth";
import { Router } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [month, setMonth] = useState(-1);
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
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

      try {
        if(userType=="admin"){
          var tasksCompleteUrl =`${API_SERVICE}/get_all_tasks_complete`
        }
        else{
          var tasksCompleteUrl = `${API_SERVICE}/get_all_tasks_complete/${user?.id}`
        }
        
        const response = await fetch(tasksCompleteUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          // console.log(data);
          setTasks(data);
          console.log(tasks)
        }
      } catch (err) {
        console.log(err);
      }
    fetchTasks(userType);
  }, [])

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
    console.log("Hello");
    console.log(allTasks());
    return customers.filter((customer) => {
      return checkMonth(customer.createdAt) && customer.status === 1;
    });
  };

  const pendingTasks = () => {
    console.log("Hello");
    return customers.filter((customer) => {
      return checkMonth(customer.createdAt) && customer.status === 0;
    });
  };

  const fetchTasks = async (userType) => {
    if(userType=="admin"){
      var tasksAllUrl =`${API_SERVICE}/get_all_tasks`
    }
    else{
      var tasksAllUrl = `${API_SERVICE}/get_all_tasks/${user?.id}`
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
  };

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Button
            color="primary"
            variant="contained"
            sx={{ float: 'right' }}
            onClick={() => router.push('/tasks?t=1')}
          >
            Add Tasks
          </Button>
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
            {/* <Grid item xl={3} lg={3} sm={6} xs={12} sx={{ display: "flex", alignItems: "center" }}>
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
            </Grid> */}
            {/* <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid> */}
            {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
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
                  <h3>Approval Tasks</h3>
                  <Box sx={{ mt: 3 }}>
                    <ApprovalListResults customers={tasks} />
                  </Box>
                </Container>
                
                
                <Container sx={{ mt: 4 }} maxWidth={false}>
                  <h3>Pending Tasks</h3>

                  <Box sx={{ mt: 3 }}>
                    <CustomerListResults customers={pendingTasks()} />
                  </Box>
                </Container>

                
              </Box>
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  py: 8,
                }}
              >
                <Container maxWidth={false}>
                  <h3> Tasks sent for approval</h3>

                  <Box sx={{ mt: 3 }}>
                    <CustomerListResults customers={customers} />
                  </Box>
                </Container>
              </Box>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    <AuthGuard> {page}</AuthGuard>
  </DashboardLayout>
);

export default Dashboard;
