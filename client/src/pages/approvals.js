import Head from "next/head";
import { Box, Container } from "@mui/material";
import { ApprovalListResults } from "../components/approval/approval-list-results";
import { ApprovalListToolbar } from "../components/approval/approval-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import approvals from "../__mocks__/approvals";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { useEffect, useState } from "react";
import { API_SERVICE } from "src/config";
import { useAuth } from "src/hooks/use-auth";


const Customers = () => {
  
  const [tasks, setTasks] = useState([]);
  const {user} = useAuth();
  
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
          var allTasks =`${API_SERVICE}/get_all_tasks`
        }
        else{
          var allTasks = `${API_SERVICE}/get_all_tasks_complete/${user?.id}`
        }
        const response = await fetch(allTasks, {
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
  }, [])
  

  return (
    <>
      <Head>
        <title>Customers | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ApprovalListToolbar />
          <Box sx={{ mt: 3 }}>
            <ApprovalListResults customers={tasks} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

Customers.getLayout = (page) => (
  <DashboardLayout>
    <AuthGuard> {page}</AuthGuard>
  </DashboardLayout>
);

export default Customers;
