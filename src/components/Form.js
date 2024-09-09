import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFormData,
  setError,
  setFormData,
  setFormStatus,
} from "../redux/formSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

const Form = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.form);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Validation function
  const validate = () => {
    let errors = {};

    if (!formValues.name) {
      errors.name = "Name is required.";
    }

    if (!formValues.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formValues.password) {
      errors.password = "Password is required.";
    } else if (formValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(formValues.password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[0-9]/.test(formValues.password)) {
      errors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*]/.test(formValues.password)) {
      errors.password =
        "Password must contain at least one special character (!@#$%^&*).";
    }

    return errors;
  };

  const handleChange = (e) => {
    dispatch(setFormStatus("idle"));
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(setFormStatus("loading"));

      try {
        await dispatch(setFormData(formValues));
        dispatch(setFormStatus("succeeded"));
      } catch (error) {
        dispatch(setFormStatus("failed"));
        dispatch(setError(error.message));
      }
    }
  };

  const handleReset = () => {
    setFormValues({
      name: "",
      email: "",
      password: "",
    });
    setFormErrors({});
    dispatch(clearFormData());
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>

      {status === "loading" && (
        <Box display="flex" justifyContent="center" mb={2}>
          <CircularProgress />
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
            variant="outlined"
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            variant="outlined"
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            variant="outlined"
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </Button>
      </form>

      {status === "succeeded" && (
        <Typography color="success.main" align="center" mt={2}>
          Form submitted successfully!
        </Typography>
      )}

      {status === "failed" && (
        <Typography color="error" align="center" mt={2}>
          {error || "Submission failed, please try again."}
        </Typography>
      )}

      <Button
        onClick={handleReset}
        fullWidth
        variant="outlined"
        color="secondary"
        sx={{ mt: 2 }}
        disabled={status === "loading"}
      >
        Reset Form
      </Button>
    </Box>
  );
};

export default Form;
