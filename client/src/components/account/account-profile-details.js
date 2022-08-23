import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import firebase from "../../lib/firebase";
import { API_SERVICE } from "src/config";

// const states = [
//   {
//     value: 'alabama',
//     label: 'Alabama'
//   },
//   {
//     value: 'new-york',
//     label: 'New York'
//   },
//   {
//     value: 'san-francisco',
//     label: 'San Francisco'
//   }
// ];

export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // state: 'Alabama',
    // country: 'USA'
  });

  useEffect(async () => {
    const userId = sessionStorage.getItem("userId");

    firebase.auth().onAuthStateChanged(async (user) => {
      console.log(user);
      
      try {
        const response = await fetch(`${API_SERVICE}/get_user/${userId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   first: values.firstName || "",
          //   last: values.lastName || "",
          //   contact: values.phone || "",
          // }),
        });
  
        if(response.status === 200){
          const userData = await response.json();
          console.log(userData);
          // console.log("user updated");
          setValues({
            ...values,
            firstName: userData.first,
            lastName: userData.last,
            phone: userData.contact,
            email: user.email
          })
          
          sessionStorage.setItem("last", values.lastName)
          sessionStorage.setItem("first", values.firstName)
          sessionStorage.setItem("contact", values.phone)
        }
        
      } catch (error) {
        console.log(error);
      }
    })

  }, [])

  const handleSubmit = async() => {
    
    const userId = sessionStorage.getItem("userId");

    // firebase.auth().onAuthStateChanged(async (user) => {

      // console.log(user);

      try {
        const response = await fetch(`${API_SERVICE}/edit_user/${userId}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first: values.firstName || "",
            last: values.lastName || "",
            contact: values.phone || "",
          }),
        });
  
        if(response.status === 200){
          sessionStorage.setItem("last", values.lastName)
          sessionStorage.setItem("first", values.firstName)
          sessionStorage.setItem("contact", values.phone)
          const userData = await response.json();
          console.log(userData);
          console.log("user updated");
        }
        
      } catch (error) {
        console.log(error);
      }
      

    // })

  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField 
                disabled
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid> */}
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
