import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useReducer } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";
import firebase from "../../lib/firebase";

const reducer = (state, action) => {
  if (action.type === "AUTH_STATE_CHANGED") {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export const FirebaseRegister = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { createUserWithEmailAndPassword, signInWithGoogle } = useAuth();

  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      contact: "",
      password: "",
      policy: true,
      submit: null,
    },
    validationSchema: Yup.object({
      fName: Yup.string().max(255).required("First name is required"),
      lName: Yup.string().max(255).required("First name is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      contact: Yup.string().max(255),
      password: Yup.string().min(7).max(255).required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        sessionStorage.setItem("first", values.fName);
        sessionStorage.setItem("last", values.lName);
        sessionStorage.setItem("contact", values.contact);

        await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);

        if (isMounted()) {
          const returnUrl = router.query.returnUrl || "/dashboard";
          router.push(returnUrl);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const handleGoogleClick = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div {...props}>
      {/* <Button
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        sx={{
          backgroundColor: "common.white",
          color: "common.black",
          "&:hover": {
            backgroundColor: "common.white",
            color: "common.black",
          },
        }}
        variant="contained"
      >
        <Box
          alt="Google"
          component="img"
          src="/static/icons/google.svg"
          sx={{ mr: 1 }}
        />
        Google
      </Button> */}
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          mt: 2,
        }}
      >
        {/* <Box sx={{ flexGrow: 1 }}>
          <Divider orientation="horizontal" />
        </Box>
        <Typography color="textSecondary" sx={{ m: 2 }} variant="body1">
          OR
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Divider orientation="horizontal" />
        </Box> */}
      </Box>
      <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          error={Boolean(formik.touched.fName && formik.errors.fName)}
          fullWidth
          helperText={formik.touched.fName && formik.errors.fName}
          label="First Name"
          margin="normal"
          name="fName"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.fName}
        />
        <TextField
          error={Boolean(formik.touched.lName && formik.errors.lName)}
          fullWidth
          helperText={formik.touched.lName && formik.errors.lName}
          label="Last Name"
          margin="normal"
          name="lName"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.lName}
        />

        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email Address"
          margin="normal"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
        />

        <TextField
          error={Boolean(formik.touched.contact && formik.errors.contact)}
          fullWidth
          helperText={formik.touched.contact && formik.errors.contact}
          label="Contact"
          margin="normal"
          name="contact"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.contact}
        />
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            ml: -1,
            mt: 2,
          }}
        >
          <Checkbox checked={formik.values.policy} name="policy" onChange={formik.handleChange} />
          <Typography color="textSecondary" variant="body2">
            I have read the{" "}
            <Link component="a" href="#">
              Terms and Conditions
            </Link>
          </Typography>
        </Box>
        {Boolean(formik.touched.policy && formik.errors.policy) && (
          <FormHelperText error>{formik.errors.policy}</FormHelperText>
        )}
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Button
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </Box>
      </form>
    </div>
  );
};
