import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import React, { useState } from "react";

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
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
                    color: 'white'
                }}
            >
                Register
            </Button>
            <FormHelperText>Already have an account?</FormHelperText>
            <Button 
                variant="contained" 
                style={{ 
                    marginTop: "10px",
                    background: 'linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(7,157,97,1) 25%, rgba(5,111,188,1) 50%, rgba(7,157,97,1) 75%, rgba(9,9,121,1) 100%)',
                    color: 'white'
                }}
            >
                Login
            </Button>
        </FormControl>
    );
}

export default Auth;
