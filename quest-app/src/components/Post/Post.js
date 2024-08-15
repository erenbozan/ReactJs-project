import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, pink } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";  
import Comment from "../Commnet/Comment";
import CommentForm from "../Commnet/CommentForm";


function Post(props) {
  const { title, text, userId, userName, postId, likes} = props;
  const [expanded, setExpanded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [likecount, setLikecount] = useState(likes.length); 
  const [newLikeHandler, setNewLikeHandler] = useState(null);

  const handleExpandClick = () => {
    refreshComments();
    console.log("handleExpandClick"); 
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    console.log("handleFavoriteClick");
    setAlreadyLiked(!alreadyLiked);
    if(alreadyLiked){
      setLikecount(likecount - 1);
      deleteLike();
    }
    else{
      setLikecount(likecount + 1);
      saveLike();
    }
  };


  useEffect(() => {
    if (expanded) {
      refreshComments();
    }
  }, [newComment]);

  useEffect(() => {
    checkLikes();
  }, []);

  const checkLikes = () => {

    console.log("checkLikes******************************************");
    if(localStorage.getItem("currentUsersId") == null){
      return;
    }
    var likeControl = likes.find((like) => like.userId === localStorage.getItem("currentUsersId"));
    
    if(likeControl!=undefined){

      console.log("likeControl id si ID mi: ", likeControl.id);
      setAlreadyLiked(true); 

    }
  }

  const refreshComments = () => {
    console.log("refreshComments******************************************");
    fetch(`http://localhost:9090/comments?postId=${postId}`)
        .then(res => res.json())  
        .then(
            (result) => {   
                setCommentList(result);           
            },  
            (error) => {
                console.log(error);
            }
        )
  }

  const saveLike = () => {
    fetch("http://localhost:9090/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        postId: postId,
        userId: 1
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
      setNewLikeHandler(data.id);
      console.log('Success liked good:', data);
    })
    .catch(error => console.error('Error:', error.message));
  }

  const deleteLike = () => {
    var deneme;
    if(likes.find((like) => like.userId === 1) !== undefined  && newLikeHandler == null){
      console.log("if statementi içindeyim silinen şey",(Number(likes.find((like) => like.userId === 1).id)));
      deneme = (Number(likes.find((like) => like.userId === 1).id));
    }
    else{
      console.log("else statementi içindeyim new like fln da şu",newLikeHandler);
      deneme = (Number(newLikeHandler));
    }


    fetch(`http://localhost:9090/likes/`+deneme, {  // Use path variable instead of query parameter
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
        });
      }
      return response.text();  // DELETE request usually doesn't return JSON data
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => console.error('Error:', error.message));
  }
  


  

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <Card sx={{ maxWidth: 600, minWidth: 350, padding: '20px' }}>
      <CardHeader
         avatar={
          <Link to={`/users/${userId}`} style={{  textDecoration: 'none' }}>
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
        title={title}
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
        <Typography variant="body1" color="text.primary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
          disabled={localStorage.getItem("currentUsersId") == null}
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
        >
          <FavoriteIcon sx={{ color: alreadyLiked ? pink[300] : 'inherit' }} />
        </IconButton>
        {likecount}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            {commentList.map(comment => (
                <Comment userId={1} userName={"aaa"} text={comment.text} />
            ))}     
            {localStorage.getItem("currentUsersId") == null ?"":
            <CommentForm setNewComment={setNewComment} userId={localStorage.getItem("currentUsersId")} postId={postId}></CommentForm>}
            
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;