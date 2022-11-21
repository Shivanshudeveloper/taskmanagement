import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  FormControl,
  FormControlLabel,
  Switch,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  MenuProps,
  Select,
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
    teams,
  } = props;

  const { user } = useAuth();
  const teamMails=teams.map((t)=>{return t.email;});
  console.log(teamMails);
  console.log(selectedTask);
  const Members=(ele)=>{
    let s=""  
    ele.forEach((m)=>{
      s = s + m
      s = s + " , "  
    })
    s  = s.substring(0,s.length-2)
    return s;
    };
  const [state, setState] = useState({
    name: "",
    description: "",
    assignedTo: "",
    fromDate: "",
    targetDate: "",
    points: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [personName, setPersonName] = useState([]);
  const [membersName,setMembersName]=useState("");
  const [emails, setEmails] = useState([]);
  const [mems, setMems] = useState([]);
  const [results,setResults] = useState([]);


  useEffect(async () => {
    try {
      const response = await fetch(`${API_SERVICE}/get_all_users`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const userData = await response.json();
        // console.log(userData);
        userData.forEach((data) => {
          if (data?.email) {
            setEmails(emails => [...emails, data.email]);
          }
          // console.log(data?.email)
        })
        // setEmails(...emails, userData);
       // console.log(emails);
      }

    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(async () => {
    try {
      const response = await fetch(`${API_SERVICE}/get_all_groups`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const userData = await response.json();
        // console.log(userData);
        userData.forEach((data) => {
          if (data?.members) {
            setIsLoading(false);
            setMems(mems => [...mems, data.members]);
          }
        })
        console.log(mems);
      }

    } catch (error) {
      console.log(error);
    }
  }, []);
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
    debugger;
    console.log("hello 55");
    const assignnames=[...personName,...results];
    console.log(personName,results);
    smsSend();
    try {
      const response = await fetch(`${API_SERVICE}/add_task`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...state, userId: user?.id, approved: 0, assignedTo: [...assignnames] }),
      });
      if (response.status === 200) {
        onClose();
        alert("Task created");
        setToggler();
        console.log(assignnames);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const smsSend = async () => {
    debugger;
    try {
      const user = "SANSKARDSA";
      const pass = "s123456";
      const sender = "SANSKR";
      const phone = state.phonenumber;
      const text = "Test SMS";
      const priority = "Priority";
      const stype = "smstype";
      const response = await fetch(`http://bhashsms.com/api/sendmsg.php?user=${user}&pass=${pass}&sender=${sender}&phone=${phone}&text=${text}&priority=${priority}&stype=${stype}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });
      if (response.status === 200) {
        onClose();
        alert("Task created");
        setToggler();
      }
    } catch (err) {
      console.log(err);
    }

  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(personName)
  };
    
  const handleSingleChange = (event) => { 
    setMembersName(event.target.value);
    // console.log(event.target.value);
    const GroupMemName=event.target.value;
    const MyArrayLower = [];
    GroupMemName.map((name)=>{
      MyArrayLower.push(name.toLowerCase());
    })
    // console.log(MyArrayLower);
    const emailsOfGroupMems=teamMails.filter((email)=>{
      return MyArrayLower.includes(email.slice(0,email.indexOf('@')))
    })
    console.log(emailsOfGroupMems);
    setResults(emailsOfGroupMems);

  }
  
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
            teams={teams}
            selectedTask={selectedTask}
            setToggler={setToggler}
          />

        </Box>
      </Box>
      
      <br/>
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
            {/* <TextField
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              label="Assign To"
              name="assignedTo"
              onChange={handleChange}
              value={state.assignedTo}
            /> */}
            <FormControl fullWidth>
              <InputLabel>Assigned To</InputLabel>
              <Select
                id="multiple-checkbox"
                multiple
                value={personName}
                onChange={handleSelectChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {emails.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name?.slice(0, name?.indexOf('@'))} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            {
              isLoading?(<center>
                <CircularProgress sx={{ mt: 15 }} />
              </center>):(
                <FormControl  fullWidth>
              <InputLabel id="demo-simple-select-label">Assign To a group</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={membersName}
                label="Age"
                onChange={handleSingleChange}
              >
               {mems.map((name) => (
                  <MenuItem key={name.id} value={name}>
                    <ListItemText primary={Members(name)} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
              )
            }
            
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              label="Phone Number"
              name="phonenumber"
              onChange={handleChange}
              value={state.phonenumber}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel control={<Switch defaultChecked />} label="DND" />
          </Grid>

          <Grid item sm={12}>

            <Box textAlign="right">
              {/* <Button
                margin={2}
                variant="contained"
                color="error"
                style={{ marginRight: "20px" }}
                onClick={handleCloseSearchDialog}
              >
                Cancel
              </Button> */}
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




      <Box sx={{ mt: 5 }}>
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
