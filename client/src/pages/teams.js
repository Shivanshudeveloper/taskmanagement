import Head from "next/head";
import { Box, Container } from "@mui/material";
import queryString from "query-string";

import { TeamsListResults } from "../components/teams/teams-list-results";
import { TeamsListToolbar } from "../components/teams/teams-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
// import { Teams } from "../__mocks__/Teams";
import { AuthGuard } from "src/components/authentication/auth-guard";

import React, { useEffect, useState } from "react";
import { API_SERVICE } from "src/config";
import { useAuth } from "src/hooks/use-auth";

const Teams = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [teams, setTeams] = useState([]);
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
        setTeams(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTeams = async (userType) => {
    debugger;
    if(userType=="admin"){
      var allTeams =`${API_SERVICE}/get_all_teams`
    }
    else{
      var allTeams = `${API_SERVICE}/get_all_teams/${user?.id}`
    }
    try {
      const response = await fetch(allTeams, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setTeams(data);
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

  useEffect(async() => {
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

     
    fetchTeams(userType);
  }, [toggler]);
  return (
    <>
      <Head>
        <title>Teams | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <TeamsListToolbar
            selectedTask={selectedTask}
            openDialog={openDialog}
            handleCloseSearchDialog={handleCloseSearchDialog}
            handleOpenSearchDialog={handleOpenSearchDialog}
            setToggler={() => setToggler(!toggler)}
            setSelectedTask={setSelectedTask}
          />
        <Box sx={{ mt: 3 }}>
            <TeamsListResults
              customers={teams}
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
Teams.getLayout = (page) => (
  <DashboardLayout>
    <AuthGuard> {page}</AuthGuard>
  </DashboardLayout>
);

export default Teams;
