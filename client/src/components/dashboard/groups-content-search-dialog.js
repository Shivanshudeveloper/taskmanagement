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



export const GroupsContentSearchDialog = (props) => {
  // const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { onClose, open, selectedTask, setToggler, ...other } = props;
  const { user } = useAuth();
  const [emails, setEmails] = useState([]);
  // const [marks, setMarks] = useState(null);
  // const [repeat, setRepeat] = useState(null);

  console.log(selectedTask);
//   console.log(props.customers[0].fullname);
   

  const [state, setState] = useState({
     groupname: "",
    members:[]
  });
  // const [gName,setGName]= useState(null);
  // const [members,setMembers] = useState([]);

  // useEffect(async () => {
  //   try {
  //     const response = await fetch(`${API_SERVICE}/get_all_users`, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       const userData = await response.json();
  //       // console.log(userData);
  //       userData.forEach((data) => {
  //         if (data?.email) {
  //           setEmails(emails => [...emails, data.email]);
  //         }
  //         // console.log(data?.email)
  //       })
  //       // setEmails(...emails, userData);
  //       console.log(emails);
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // const editTask = async () => {
  //   try {
  //     const response = await fetch(`${API_SERVICE}/edit_task/${selectedTask._id}/${user?.id}`, {
  //       method: "PATCH",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ ...state }),
  //     });
  //     if (response.status === 200) {
  //       onClose();
  //       alert("Task edited");
  //       setToggler();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  const [personName, setPersonName] = useState([]);

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
  
  console.log(props.customers);
  const names = props.customers.map((mem)=>{
    return(
      mem.fullname
    )
});
console.log(names);

  const handleSelectChange = (event) => {
    
    const {
      target: { value },
    } = event;
    
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    setState(state=>{
      return{
        ...state,
        members:event.target.value

      };
    })
  };
 
  const createGroup = async () => {
    try {      
      const response = await fetch(`${API_SERVICE}/add_group`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({...state, userId: user?.id}),
      });
      if (response.status === 200) {
        onClose();
        alert("Group created");
        // console.log()
        setToggler();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  // console.log(event.target.name);
  };

  const handleSubmit = async (event) => {
   // console.log("Hello");
    createUser();
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
        <Typography variant="h6">Add Group</Typography>
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
              label="Group Name"
              name="groupname"
              onChange={handleChange}
              value={state.groupname}
            />
          </Grid>
          <Grid>
          <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Add Members</InputLabel>
          <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          name="selected"
          value={personName}
          onChange={handleSelectChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          >
          {names.map((name) => (
            <MenuItem key={name.id} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
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
              <Button
                margin={2}
                variant="contained"
                color="primary"
                onClick={() => {
                  if (selectedTask) {
                    editTask();
                  } else {
                    createGroup();
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
  );
};

GroupsContentSearchDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
