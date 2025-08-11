import { Button, FormControl, FormHelperText, Snackbar, TextField, Box, Typography, Paper } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRegister = () => {
        sendRequest("register");
        setUsername("");
        setPassword("");
        console.log("Registering user with username:", username);
    };

    const handleLogin = () => {
        sendRequest("login");   
        setUsername("");
        setPassword("");
        console.log("Logging in user with username:", username);
    }

    const sendRequest = (path) => {
        fetch(`http://localhost:9090/auth/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: username,
                password: password,
            }),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then((data) => {
                    throw new Error(data.message);
                });
            }
        }).then((data) => {
            if (path === "login") {
                console.log("Login response data:", data);
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('currentUsersId', data.userId);
                localStorage.setItem('username', username);
                setSnackbarMessage("Login successful!");
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate(0);
                }, 1000);
            } else {
                setSnackbarMessage("User created successfully!");
                setOpenSnackbar(true);
            }
            console.log('Success:', data);
            setTimeout(() => setOpenSnackbar(false), 2000);
            
        }).catch((error) => {
            console.error("Error occurred in auth class:", error);
            setSnackbarMessage("Error: " + error.message);
            setOpenSnackbar(true);
        });
    };

    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '20px'
    };

    const paperStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    };

    const textFieldStyle = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px'
            },
            '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#667eea'
            },
            '& input': {
                color: '#e0e0e0'
            },
            '& label': {
                color: 'rgba(255, 255, 255, 0.7)'
            },
            '& label.Mui-focused': {
                color: '#667eea'
            }
        }
    };

    const buttonStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        padding: '12px 24px',
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '16px',
        marginTop: '20px',
        marginBottom: '10px',
        '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
        }
    };

    return (
        <div style={containerStyle}>
            <Paper elevation={0} style={paperStyle} className="fade-in">
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box sx={{ 
                        width: 60, 
                        height: 60, 
                        borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                    }}>
                        <LockOutlinedIcon sx={{ color: 'white', fontSize: 30 }} />
                    </Box>
                    <Typography variant="h4" sx={{ 
                        color: '#e0e0e0', 
                        fontWeight: 600,
                        mb: 1
                    }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        mb: 3
                    }}>
                        {isLogin ? 'Sign in to your account' : 'Join our community'}
                    </Typography>
                </Box>

                <FormControl fullWidth>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={handleUsernameChange}
                        sx={textFieldStyle}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={handlePasswordChange}
                        sx={textFieldStyle}
                        fullWidth
                    />
                    
                    <Button 
                        variant="contained" 
                        sx={buttonStyle}
                        onClick={isLogin ? handleLogin : handleRegister}
                        startIcon={isLogin ? <LoginIcon /> : <PersonAddIcon />}
                        fullWidth
                    >
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <Button 
                                onClick={() => setIsLogin(!isLogin)}
                                sx={{ 
                                    color: '#667eea', 
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    '&:hover': {
                                        background: 'rgba(102, 126, 234, 0.1)'
                                    }
                                }}
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </Button>
                        </Typography>
                    </Box>
                </FormControl>

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={openSnackbar}
                    message={snackbarMessage}
                    autoHideDuration={2000}
                    sx={{
                        '& .MuiSnackbarContent-root': {
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            color: '#e0e0e0'
                        }
                    }}
                />
            </Paper>
        </div>
    );
}

export default Auth;
