import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";

import { Button, InputAdornment, OutlinedInput} from "@mui/material";

function CommentForm(props) {
  const { userId, userName, setNewComment ,postId } = props;
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

  return (
    <>
 
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
                  Comment
                </Button>
              </InputAdornment>
            } 
          />
        </CardContent>
    </>
  );
}

export default CommentForm;