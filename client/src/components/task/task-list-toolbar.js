import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Tooltip,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { useEffect, useRef, useState } from "react";
import { ContentSearchDialog } from "../dashboard/content-search-dialog";

import { API_SERVICE } from "src/config";
import { useAuth } from "src/hooks/use-auth";

export const TaskListToolbar = (props) => {
  let {
    openDialog,
    handleOpenSearchDialog,
    handleCloseSearchDialog,
    selectedTask,
    setSelectedTask,
    setToggler,
  } = props;

  const { user } = useAuth();

  console.log(selectedTask);

  const [state, setState] = useState({
    name: "",
    description: "",
    assignedTo: "",
    fromDate: "",
    targetDate: "",
    points: "",
  });

  const editTask = async () => {
    try {
      const response = await fetch(`${API_SERVICE}/edit_task/${selectedTask._id}/${user?.id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...state }),
      });
      if (response.status === 200) {
        handleCloseSearchDialog();
        alert("Task edited");
        setToggler();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async () => {
    try {
      const response = await fetch(`${API_SERVICE}/add_task`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...state, userId: user?.id, approved: 0 }),
      });
      if (response.status === 200) {
        handleCloseSearchDialog();
        alert("Task created");
        setToggler();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    console.log("Hello");
    createTask();
  };

  useEffect(() => {
    console.log(selectedTask);
    setState({
      name: selectedTask?.name,
      description: selectedTask?.description,
      assignedTo: selectedTask?.assignedTo,
      fromDate: selectedTask?.fromDate,
      targetDate: selectedTask?.targetDate,
      points: selectedTask?.points,
    });
  }, [selectedTask]);

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Task
        </Typography>
        <Box sx={{ m: 1 }}>
          <Tooltip title="Search">
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setSelectedTask(null);
                handleOpenSearchDialog();
              }}
            >
              Add Tasks
            </Button>
          </Tooltip>

          <Dialog fullWidth maxWidth="sm" onClose={handleCloseSearchDialog} open={openDialog}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: 2,
              }}
            >
              <Typography variant="h6">Add Tasks</Typography>
              <IconButton color="inherit"></IconButton>
            </Box>
            <DialogContent>
              <Grid
                container
                spacing={3}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Task Name"
                    name="name"
                    onChange={handleChange}
                    value={state.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    multiline={true}
                    rows={4}
                    fullWidth
                    label="Additional Info"
                    name="description"
                    onChange={handleChange}
                    value={state.description}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Assign To"
                    name="assignedTo"
                    onChange={handleChange}
                    value={state.assignedTo}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Points"
                    type="Number"
                    name="points"
                    onChange={handleChange}
                    value={state.points}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="date"
                    label="From Date"
                    name="fromDate"
                    onChange={handleChange}
                    value={state.fromDate}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="date"
                    label="Target Date"
                    name="targetDate"
                    onChange={handleChange}
                    value={state.targetDate}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Box textAlign="right">
                    <Button
                      margin={2}
                      variant="contained"
                      color="error"
                      style={{ marginRight: "20px" }}
                      onClick={handleCloseSearchDialog}
                    >
                      Cancel
                    </Button>
                    <Button
                      margin={2}
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (selectedTask) {
                          editTask();
                        } else {
                          createTask();
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>

          <ContentSearchDialog
            onClose={handleCloseSearchDialog}
            open={openDialog}
            selectedTask={selectedTask}
            setToggler={setToggler}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search Task"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
