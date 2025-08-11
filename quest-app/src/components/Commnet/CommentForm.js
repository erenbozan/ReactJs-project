import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import { Button, InputAdornment, OutlinedInput, Box, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

function CommentForm(props) {
  const { userId, userName, setNewComment, postId } = props;
  const [text, setText] = useState("");   

  const saveComment = () => {
    fetch("http://localhost:9090/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({   
        postId: postId,
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
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setNewComment(prev => {return !prev});
    })
    .catch(error => console.error('Error:', error.message));
  }

  const handleText = (value) => {
    setText(value);
  };

  const handleSubmit = () => {
    console.log("Text: ", text);
    saveComment();
    setText("");
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
      <CardContent sx={{ 
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        mt: 2
      }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontWeight: 500,
            mb: 1
          }}>
            Add a comment
          </Typography>
        </Box>
        
        <OutlinedInput
          id="comment-form-input"
          multiline={true}
          rows={2}
          placeholder="Share your thoughts..."
          inputProps={{ maxLength: 250 }}
          fullWidth
          value={text}
          onChange={(e) => handleText(e.target.value)}
          sx={inputStyle}
          endAdornment={
            <InputAdornment position="end">
              <Button 
                variant="contained"
                onClick={handleSubmit}
                disabled={!text.trim()}
                startIcon={<SendIcon />}
                sx={buttonStyle}
              >
                Comment
              </Button>
            </InputAdornment>
          } 
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            {text.length}/250 characters
          </Typography>
        </Box>
      </CardContent>
    </>
  );
}

export default CommentForm;