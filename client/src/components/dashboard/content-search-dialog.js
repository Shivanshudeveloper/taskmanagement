import { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Menu,
  FormGroup,
  Switch,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";

import { Tip } from "../tip";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import { API_SERVICE } from "src/config";
import { useAuth } from "src/hooks/use-auth";



export const ContentSearchDialog = (props) => {
  // const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { onClose, open, selectedTask, setToggler, ...other } = props;
  const { user } = useAuth();
  const [emails, setEmails] = useState([]);
  const [mems, setMems] = useState([]);
  // const [marks, setMarks] = useState(null);
  // const [repeat, setRepeat] = useState(null);

  //console.log(selectedTask);
  const teamMails=props.teams.map((t)=>{return t.email;});
  console.log(teamMails);
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
    // assignedTo: "",
    fromDate: "",
    targetDate: "",
    points: "",
  });

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
        onClose();
        alert("Task edited");
        setToggler();
      }
    } catch (err) {
      console.log(err);
    }
  };


  const [personName, setPersonName] = useState([]);
  const [membersName,setMembersName]=useState("")
 const [results,setResults] = useState([]);
 // const [assignNames , setAssignNames]=useState([]);
 
 
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 150,
      },
    },
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
  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    console.log("Hello");
    createTask();
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
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
        <Typography variant="h6">Add Task</Typography>
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
          <Grid item xs={12} md={6} >
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
            <FormControl sx={{ m: 1, width: 250 }}>
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
                <FormControl fullWidth>
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
              <Button
                margin={2}
                variant="contained"
                color="error"
                style={{ marginRight: "20px" }}
                onClick={onClose}
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

          {/* <Grid item xs={12} md={6}>
              <TextField fullWidth label="Enter task status" />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <FormControlLabel
                      textAlign="center"
                      value="wnd"
                      control={<Switch color="success" />}
                      label="WND"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="notice"
                      control={<Switch color="success" />}
                      label="Notice"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="sms"
                      control={<Switch color="success" />}
                      label="SMS"
                      labelPlacement="top"
                    />
                  </Stack>
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">User</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user}
                  label="User"
                  fullWidth
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                >
                  <MenuItem value={10}>Public</MenuItem>
                  <MenuItem value={20}>Admin</MenuItem>
                  <MenuItem value={30}>Private</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Marks</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={marks}
                  label="Marks"
                  fullWidth
                  onChange={(e) => {
                    setMarks(e.target.value);
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField type="date" helperText="Start Date"></TextField>
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField type="date" helperText="End Date"></TextField>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <TextField center type="time" helperText="Time"></TextField>
            </Grid>
            <Grid item xs={12} textAlign="center" m={1}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="high" control={<Radio />} label="High" />
                  <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                  <FormControlLabel value="low" control={<Radio />} label="Low" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12} m={1}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Repeat</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={repeat}
                  label="Repeat"
                  fullWidth
                  onChange={(e) => {
                    setRepeat(e.target.value);
                  }}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="3 months">3 Months</MenuItem>
                  <MenuItem value="6 months">6 Months</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <Box textAlign="right">
                <Button
                  margin={2}
                  variant="contained"
                  color="error"
                  style={{ marginRight: "20px" }}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button margin={2} variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </Grid>{" "} */}
        </Grid>

        {/* {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {showResults && (
          <>
            {Object.keys(results).map((type, index) => (
              <div key={index}>
                <Typography sx={{ my: 2 }} variant="h6">
                  {type}
                </Typography>
                <Box
                  sx={{
                    borderColor: "divider",
                    borderRadius: 1,
                    borderStyle: "solid",
                    borderWidth: 1,
                  }}
                >
                  {results[type].map((result, index) => (
                    <Fragment key={result.title}>
                      <Box sx={{ p: 2 }}>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Badge color="primary" sx={{ ml: 1 }} variant="dot" />
                          <Typography variant="subtitle1" sx={{ ml: 2 }}>
                            {result.title}
                          </Typography>
                        </Box>
                        <Typography color="textSecondary" variant="body2">
                          {result.path}
                        </Typography>
                        <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                          {result.description}
                        </Typography>
                      </Box>
                      {index !== results[type].length - 1 && <Divider />}
                    </Fragment>
                  ))}
                </Box>
              </div>
            ))}
          </>
        )} */}
      </DialogContent>
    </Dialog>
  );
};

ContentSearchDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
