import React from "react";
import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    padding: '5px',
    margin: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '10px'
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: 'orange',
    color: 'black'
}));

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    '& .MuiOutlinedInput-input': {
        color: 'black',  // Metin rengini siyah yapıyoruz
    },
    '&.Mui-disabled': {
        '& .MuiOutlinedInput-input': {
            color: 'black',  // Disabled durumunda da metin rengini siyah tutuyoruz
        },
    },
}));

function Comment(props) {
    const { text, userId, userName } = props;

    return (
        <StyledCardContent>
            <StyledOutlinedInput
                disabled
                id="outlined-adornment-amount"
                multiline
                placeholder="Comment"
                inputProps={{ 
                    maxLength: 100,
                    style: { color: 'black' }  // Bu satırda metin rengini siyah olarak ayarlıyoruz
                }}
                fullWidth           
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Link to={`/users/${userId}`} style={{ textDecoration: 'none' }}>
                            <StyledAvatar aria-label="recipe">
                                {userName ? userName.charAt(0).toUpperCase() : '?'}
                            </StyledAvatar> 
                        </Link>
                    </InputAdornment> 
                }
            />
        </StyledCardContent>
    );
}

export default Comment;
