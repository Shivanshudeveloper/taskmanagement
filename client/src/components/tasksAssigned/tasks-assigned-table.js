import { Box, Button, Card, Dialog, DialogContent, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { API_SERVICE } from 'src/config';

const TasksAssignedTable = ({tasks}) => {
    const [selectedTask, setSelectedTask] = useState(tasks[0]);
    const [openDialog, setOpenDialog] = useState(false);

    const handleChangeTask = async (task) => {
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
        window.location.reload();
    };

    const handleOpenSearchDialog = (i) => {
        setSelectedTask(tasks[i]);
        console.log(selectedTask)
        setOpenDialog(true);
      };
    
    const handleCloseSearchDialog = () => {
        setOpenDialog(false);
    };

  return (
    <Card>
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
                <Typography variant="h3">Name : {selectedTask?.name}</Typography>
            </Box>
            <DialogContent>
                <Grid
                    container
                    spacing={3}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    flexDirection='column'
                    paddingLeft='16px'
                >
                    {/* <Grid item border='1px solid black' borderRadius='8px' marginTop='16px' width='100%'>
                        <Typography variant='h5' align='center' width='100%'>
                            Name: {selectedTask?.name}
                        </Typography>
                    </Grid> */}
                    <Grid item border='1px solid black' borderRadius='8px' marginTop='16px' width='100%'>
                        <Typography variant='h5' align='center' width='100%'>
                            Description: {selectedTask?.description}
                        </Typography>
                    </Grid>
                    <Grid item border='1px solid black' borderRadius='8px' marginTop='16px' width='100%'>
                        <Typography variant='h5' align='center' width='100%'>
                            Status: {selectedTask?.status === 0 ? "Incomplete" : (selectedTask?.approved === 1 ? "Approved" : "Complete")}
                        </Typography>
                    </Grid>
                    <Grid item border='1px solid black' borderRadius='8px' marginTop='16px' width='100%'>
                        <Typography variant='h5' align='center' width='100%'>
                            From : {selectedTask?.fromDate}
                        </Typography>
                    </Grid>
                    <Grid item border='1px solid black' borderRadius='8px' marginTop='16px' width='100%'>
                        <Typography variant='h5' align='center' width='100%'>
                            To: {selectedTask?.targetDate}
                        </Typography>
                    </Grid>
                    <Grid item border='1px solid black' borderRadius='8px' marginTop='16px' width='100%'>
                        <Typography variant='h5' align='center' width='100%'>
                            Points: {selectedTask?.points}
                        </Typography>
                    </Grid>
                    <Grid item border='1px solid black' borderRadius='8px' marginTop='16px' width='100%'>
                        <Typography variant='h5' align='center' width='100%'>
                            Created At: {selectedTask?.createdAt.split("T")[0]}
                        </Typography>
                    </Grid>
                    
                </Grid>
            </DialogContent>
        </Dialog>

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
                    tasks.map((task, i) => (
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
                          <Stack direction='row' spacing={2} paddingRight='24px'>
                            <Button onClick={() => handleOpenSearchDialog(i)}>
                              View
                            </Button>
                            <Button 
                              variant="contained" 
                              color={task.status === 1 ? "success" : "error"} 
                              onClick={() => handleChangeTask(task)}
                            >
                              {/* {task.status === 1 ? "Complete" : "Incomplete"} */}
                              {task.status === 0 ? "Mark as complete" : (task.approved === 1) ? "Approved" : "Complete"}
                            </Button>
                          </Stack>
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
    </Card>
  )
}

export default TasksAssignedTable