import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';

function NavBar() {
    const navigate = useNavigate();
    
    const logOutClick = () => {
        localStorage.removeItem("currentUsersId");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate(0);
    }

    const appBarStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    };

    const linkStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#e0e0e0',
        padding: '10px 16px',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.15)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }
    };

    const logoutButtonStyle = {
        color: '#e0e0e0',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '8px',
        transition: 'all 0.3s ease',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.15)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={appBarStyle}>
                <Toolbar sx={{ justifyContent: 'space-between', padding: '0 24px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{
                                color: '#e0e0e0',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.15)'
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/" style={linkStyle}>
                            <HomeIcon sx={{ fontSize: 20 }} />
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                Home
                            </Typography>
                        </Link>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {localStorage.getItem("currentUsersId") == null ? (
                            <Link to="/auth" style={linkStyle}>
                                <LockIcon sx={{ fontSize: 20 }} />
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    Sign In
                                </Typography>
                            </Link>
                        ) : (
                            <>
                                <Link to={`/users/${localStorage.getItem("currentUsersId")}`} style={linkStyle}>
                                    <PersonIcon sx={{ fontSize: 20 }} />
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        Profile
                                    </Typography>
                                </Link>
                                <IconButton 
                                    onClick={logOutClick}
                                    sx={logoutButtonStyle}
                                    title="Logout"
                                >
                                    <LogoutIcon />
                                </IconButton>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;