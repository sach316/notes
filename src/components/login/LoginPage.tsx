import { DescriptionTwoTone } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginProps from "../../models/credential";
import { login } from "../../api";
import { Link, useNavigate } from "react-router-dom";

const defaultObj: LoginProps = {
    email: '',
    password: ''
};

export default function LoginPage() {
    const [credentials, setCredentials] = useState<LoginProps>(defaultObj);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token: string = await login(credentials);
            if (token) {
                navigate('/app'); 
            }
        } catch (error) {
            navigate('/error')
            console.log('Failed to login:', error);
        }
    };

    return (
        <Grid container sx={{ height: '100vh' }}>
            {/* Left half for text and background color */}
            <Grid item xs={12} sm={6} sx={{ backgroundColor: "black", color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Box>
                    <DescriptionTwoTone sx={{ color: 'green', fontSize: 'clamp(2rem, 5vw, 4.375rem)' }} />
                    <Typography noWrap component="div" sx={{ color: 'green', fontSize: 'clamp(2rem, 5vw, 4.375rem)' }}>
                        JotSpot
                    </Typography>
                    <p style={{ fontSize: 'clamp(2rem, 5vw, 4.375rem)', fontWeight: 600 }}>
                        Login to get started
                    </p>
                </Box>
            </Grid>

            {/* Right half for the login form */}
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        ml: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={credentials.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: 'green' }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                            <Link to='/signup'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
