import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';



function NavBar() {

    const navigate = useNavigate();
    
    const logOutClick = () => {
        localStorage.removeItem("currentUsersId");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate(0);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{ backgroundColor: "lightgreen" }} position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/" style={{ backgroundColor: 'white', color: 'gray', padding: '15px', borderRadius: '4px', textDecoration: 'none' }}>
                            Home
                        </Link>
                    </Box>
                    {localStorage.getItem("currentUsersId") == null ? (
                        <Link to="/auth" style={{ backgroundColor: 'white', color: 'gray', padding: '8px', borderRadius: '4px', textDecoration: 'none' }}>
                            Login/Register
                        </Link>
                    ) : (
                        <div><IconButton onClick={logOutClick}>    <LockIcon /> </IconButton>
                        <Link to={`/users/${localStorage.getItem("currentUsersId")}`} style={{ backgroundColor: 'white', color: 'gray', padding: '8px', borderRadius: '4px', textDecoration: 'none' }}>
                            User Page
                        </Link>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;