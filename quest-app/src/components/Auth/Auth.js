import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
        console.log("Logging in user with username:", username  );
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
                return response.json(); // Return the resolved JSON
            } else {
                return response.json().then((data) => {
                    throw new Error(data.message);
                });
            }
        }).then((data) => {
            if (path === "login") {
                console.log("Login response data:", data);
                // Safely access the userId and message from the resolved data
                localStorage.setItem('token', data.message);
                localStorage.setItem('currentUsersId', data.userId);
                localStorage.setItem('username', username);
                navigate(0);
            }
            navigate(0);
        }).catch((error) => {
            console.error("Error acucried in auth class:", error);
        });
    };

    return (
        <FormControl>
            <TextField
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={handleUsernameChange}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={handlePasswordChange}
            />
            <Button 
                variant="contained" 
                style={{ 
                    marginTop: "10px",
                    background: 'linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(7,157,97,1) 25%, rgba(5,111,188,1) 50%, rgba(7,157,97,1) 75%, rgba(9,9,121,1) 100%)',
                    color: 'white',
                }}
                onClick={handleRegister}
            >
                Register
            </Button>
            <FormHelperText>Already have an account?</FormHelperText>
            <Button 
                variant="contained" 
                style={{ 
                    marginTop: "10px",
                    background: 'linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(7,157,97,1) 25%, rgba(5,111,188,1) 50%, rgba(7,157,97,1) 75%, rgba(9,9,121,1) 100%)',
                    color: 'white',
                }}
                onClick={handleLogin}

            >
                Login
            </Button>
        </FormControl>
    );
}

export default Auth;
