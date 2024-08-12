import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";  
import { Button, InputAdornment, OutlinedInput, Snackbar } from "@mui/material";

function PostForm(props) {
  const { userId, userName, setIsRefreshed } = props;
  const [text, setText] = useState("");   
  const [title, setTitle] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const savePost = () => {
    fetch("http://localhost:9090/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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

  return (
    <>
      <Card sx={{ maxWidth: 600, minWidth: 350, padding: '20px' }}>
        <CardHeader
          avatar={
            <Link to={`/users/${userId}`} style={{ textDecoration: 'none' }}>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <OutlinedInput
              id="outlined-adornment-amount"
              multiline={true}
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              value={title}
              onChange={(e) => handleTitle(e.target.value)}
            />
          }
          sx={{
            '& .MuiCardHeader-content': {
              flex: '1 1 auto',
              textAlign: 'left'
            },
            '& .MuiCardHeader-action': {
              alignSelf: 'center',
              marginTop: 0,
              marginRight: 0
            }
          }}
        />
        
        <CardContent>
          <OutlinedInput
            id="outlined-adornment-amount"
            multiline={true}
            placeholder="Text"
            inputProps={{ maxLength: 250 }}
            fullWidth
            value={text}
            onChange={(e) => handleText(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button 
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Post
                </Button>
              </InputAdornment>
            } 
          />
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        message="Post created successfully"
        autoHideDuration={1000}
      />
    </>
  );
}

export default PostForm;