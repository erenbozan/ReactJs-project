import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";  
import { Button, InputAdornment, OutlinedInput, Snackbar, Box, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

function PostForm(props) {
  const { userId, userName, setIsRefreshed } = props;
  const [text, setText] = useState("");   
  const [title, setTitle] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const savePost = () => {
    fetch("http://localhost:9090/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        title: title,
        userId: userId,
        text: text
      })
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
        });
      }
      setIsRefreshed(prev => {return !prev});
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setOpenSnackbar(true);
      setTimeout(() => setOpenSnackbar(false), 2000);
    })
    .catch(error => console.error('Error:', error.message));
  }

  const handleTitle = (value) => {
    setTitle(value);
  };

  const handleText = (value) => {
    setText(value);
  };

  const handleSubmit = () => {
    console.log("Title: ", title);
    console.log("Text: ", text);
    savePost();
    setTitle("");
    setText("");
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    margin: '16px 0',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
    }
  };

  const headerStyle = {
    '& .MuiCardHeader-content': {
      flex: '1 1 auto',
      textAlign: 'left'
    },
    '& .MuiCardHeader-action': {
      alignSelf: 'center',
      marginTop: 0,
      marginRight: 0
    }
  };

  const inputStyle = {
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
      '& textarea': {
        color: '#e0e0e0'
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: 1
      }
    }
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    padding: '8px 16px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '14px',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    }
  };

  return (
    <>
      <Card sx={cardStyle} className="fade-in">
        <CardHeader
          avatar={
            <Link to={`/users/${userId}`} style={{ textDecoration: 'none' }}>
              <Avatar 
                sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontWeight: 600,
                  fontSize: '18px'
                }} 
                aria-label="recipe"
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          action={
            <IconButton aria-label="settings" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Box sx={{ width: '100%' }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1, fontWeight: 500 }}>
                Share your thoughts, @{userName}
              </Typography>
              <OutlinedInput
                id="title-input"
                placeholder="What's on your mind?"
                inputProps={{ maxLength: 100 }}
                fullWidth
                value={title}
                onChange={(e) => handleTitle(e.target.value)}
                sx={inputStyle}
              />
            </Box>
          }
          sx={headerStyle}
        />
        
        <CardContent>
          <OutlinedInput
            id="text-input"
            multiline={true}
            rows={3}
            placeholder="Tell us more..."
            inputProps={{ maxLength: 500 }}
            fullWidth
            value={text}
            onChange={(e) => handleText(e.target.value)}
            sx={inputStyle}
            endAdornment={
              <InputAdornment position="end">
                <Button 
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!title.trim() || !text.trim()}
                  startIcon={<SendIcon />}
                  sx={buttonStyle}
                >
                  Post
                </Button>
              </InputAdornment>
            } 
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {title.length}/100 characters
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {text.length}/500 characters
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        message="Post created successfully"
        autoHideDuration={2000}
        sx={{
          '& .MuiSnackbarContent-root': {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: '#e0e0e0'
          }
        }}
      />
    </>
  );
}

export default PostForm;