import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };


    if (!details.email) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    }
    if (!details.password) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    }
    if (!details.firstname) {
      newErrors.firstname = 'First Name is required';
      formIsValid = false;
    }
    if (!details.lastname) {
      newErrors.lastname = 'Last Name is required';
      formIsValid = false;
    }


    setErrors(newErrors);


    if (formIsValid) {
      console.log('Submitted for registering:', details);

      navigate('/app');
    } else {
      console.log('Form has errors. Please fill out all required fields.');
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Grid container sx={{ flex: 1 }}>

        <Grid item xs={12} md={6} sx={{ backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h2" sx={{ color: 'green' }}>JotSpot</Typography>
          <Typography variant="h4" sx={{ color: 'green' }}>Sign Up to get started.</Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: '80%' }}>
            <Typography component="h1" variant="h5" align="center">Sign Up</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    autoComplete="firstname"
                    autoFocus
                    onChange={handleChange}
                    error={!!errors.firstname}
                    helperText={errors.firstname}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="lastname"
                    onChange={handleChange}
                    error={!!errors.lastname}
                    helperText={errors.lastname}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: 'green' }}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Link to='/login'>
                                    {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpPage;
