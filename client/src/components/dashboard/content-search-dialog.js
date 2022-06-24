import { Fragment, useState } from "react";
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
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";

import { Tip } from "../tip";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const results = {
  Platform: [
    {
      description:
        "Provide your users with the content they need, exactly when they need it, by building a next-level site search experience using our AI-powered search API.",
      title: "Level up your site search experience with our hosted API",
      path: "Users / Api-usage",
    },
    {
      description:
        "Algolia is a search-as-a-service API that helps marketplaces build performant search experiences at scale while reducing engineering time.",
      title: "Build performant marketplace search at scale",
      path: "Users / Api-usage",
    },
  ],
  Resources: [
    {
      description: "Algolia’s architecture is heavily redundant, hosting every application on …",
      title: "Using NetInfo API to Improve Algolia’s JavaScript Client",
      path: "Resources / Blog posts",
    },
    {
      description:
        "Algolia is a search-as-a-service API that helps marketplaces build performant search experiences at scale while reducing engineering time.",
      title: "Build performance",
      path: "Resources / UI libraries",
    },
  ],
};

export const ContentSearchDialog = (props) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { onClose, open, ...other } = props;
  const [user, setUser] = useState(null);
  const [marks, setMarks] = useState(null);
  const [repeat, setRepeat] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowResults(false);
    setIsLoading(true);
    // Do search here
    await wait(1500);
    setIsLoading(false);
    setShowResults(true);
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
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={3}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Enter task name" />
            </Grid>
            {/* <Grid item sm={12}>
              <TextField fullWidth label="Enter email" />
            </Grid>
            <Grid item sm={12}>
              <TextField fullWidth label="Enter description" />
            </Grid> */}
            <Grid item xs={12} md={6}>
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
            </Grid>
          </Grid>
        </form>
        {isLoading && (
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
        )}
      </DialogContent>
    </Dialog>
  );
};

ContentSearchDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
