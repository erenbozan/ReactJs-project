import React from "react";
import { Avatar, CardContent, InputAdornment, OutlinedInput, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '16px',
    margin: '8px 0',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.05)',
        transform: 'translateX(4px)'
    }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontWeight: 600,
    fontSize: '14px',
    width: '32px',
    height: '32px'
}));

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    '& .MuiOutlinedInput-input': {
        color: '#e0e0e0',
        fontSize: '14px',
        lineHeight: 1.5
    },
    '&.Mui-disabled': {
        '& .MuiOutlinedInput-input': {
            color: '#e0e0e0',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        }
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none'
    }
}));

function Comment(props) {
    const { text, userId, userName } = props;

    return (
        <StyledCardContent className="fade-in">
            <Link to={`/users/${userId}`} style={{ textDecoration: 'none' }}>
                <StyledAvatar aria-label="recipe">
                    {userName ? userName.charAt(0).toUpperCase() : '?'}
                </StyledAvatar> 
            </Link>
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Link to={`/users/${userId}`} style={{ textDecoration: 'none' }}>
                        <Typography variant="body2" sx={{ 
                            color: '#667eea', 
                            fontWeight: 600,
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}>
                            @{userName}
                        </Typography>
                    </Link>
                </Box>
                <StyledOutlinedInput
                    disabled
                    id="comment-input"
                    multiline
                    placeholder="Comment"
                    inputProps={{ 
                        maxLength: 100,
                        style: { color: '#e0e0e0' }
                    }}
                    fullWidth           
                    value={text}
                    sx={{
                        '& .MuiOutlinedInput-input': {
                            padding: '0',
                            fontSize: '14px',
                            lineHeight: 1.6
                        }
                    }}
                />
            </Box>
        </StyledCardContent>
    );
}

export default Comment;
