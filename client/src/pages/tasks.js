import Head from "next/head";
import { Box, Container } from "@mui/material";
import queryString from "query-string";

import { TaskListResults } from "../components/task/task-list-results";
import { TaskListToolbar } from "../components/task/task-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
// import { customers } from "../__mocks__/customers";
import { AuthGuard } from "src/components/authentication/auth-guard";

import React, { useEffect, useState } from "react";
import { API_SERVICE } from "src/config";
import { useAuth } from "src/hooks/use-auth";

const Customers = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  const [toggler, setToggler] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [state, setState] = useState({
    name: "",
    description: "",
    assignedTo: "",
    fromDate: "",
    targetDate: "",
    points: "",
  });

  const handleOpenSearchDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseSearchDialog = () => {
    setOpenDialog(false);
  };

  const editTask = async () => {
    try {
      const response = await fetch(`${API_SERVICE}/get_all_tasks/${user?.id}`, {
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
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_SERVICE}/get_all_tasks/${user?.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        // console.log(data)
        setTasks(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const { t } = queryString.parse(window.location.search);
    if (t) {
      handleOpenSearchDialog();
    }

  }, []);

  useEffect(() => {
    fetchTasks();
  }, [toggler]);
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
          <TaskListToolbar
            selectedTask={selectedTask}
            openDialog={openDialog}
            handleCloseSearchDialog={handleCloseSearchDialog}
            handleOpenSearchDialog={handleOpenSearchDialog}
            setToggler={() => setToggler(!toggler)}
            setSelectedTask={setSelectedTask}
          />
          <Box sx={{ mt: 3 }}>
            <TaskListResults
              customers={tasks}
              setSelectedTask={setSelectedTask}
              handleOpenSearchDialog={handleOpenSearchDialog}
              setToggler={() => setToggler(!toggler)}
            />
            <div>{selectedTask?.name}</div>
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => (
  <DashboardLayout>
    <AuthGuard> {page}</AuthGuard>
  </DashboardLayout>
);

export default Customers;
