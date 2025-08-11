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
import { Box, Chip } from "@mui/material";

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
      console.log("currentUsersId null geldi");
      return;
    }
    likes.find((like) => console.log( "like user id si: ", like.userId, "post id si: ", ""+like.postId, "current user id: ", localStorage.getItem("currentUsersId")));
    var likeControl = likes.find((like) => ""+like.userId === localStorage.getItem("currentUsersId"));
    if(likeControl!==undefined){
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
                console.log("result bu result var ya comments objesi",result);
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
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        postId: postId,
        userId: localStorage.getItem("currentUsersId")
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
    if(likes.find((like) => ""+like.userId === localStorage.getItem("currentUsersId")) !== undefined  && newLikeHandler == null){
      console.log("if statementi içindeyim silinen şey",(Number(likes.find((like) => ""+like.userId === localStorage.getItem("currentUsersId")).id)));
      deneme = (Number(likes.find((like) => ""+like.userId === localStorage.getItem("currentUsersId")).id));
    }
    else{
      console.log("else statementi içindeyim new like fln da şu",newLikeHandler);
      deneme = (Number(newLikeHandler));
    }

    fetch(`http://localhost:9090/likes/`+deneme, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
        });
      }
      return response.text();
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

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    margin: '16px 0',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
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
    },
    '& .MuiCardHeader-title': {
      color: '#e0e0e0',
      fontWeight: 600
    },
    '& .MuiCardHeader-subheader': {
      color: 'rgba(255, 255, 255, 0.7)'
    }
  };

  const contentStyle = {
    '& .MuiTypography-root': {
      color: '#e0e0e0',
      lineHeight: 1.6
    }
  };

  const actionsStyle = {
    '& .MuiIconButton-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#667eea',
        transform: 'scale(1.1)'
      }
    }
  };

  return (
    <Card sx={cardStyle} className="fade-in">
      <CardHeader
        avatar={
          <Link to={`/users/${userId}`} style={{ textDecoration: 'none' }}>
            <Avatar 
              sx={{ 
                bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ color: '#e0e0e0', fontWeight: 600 }}>
              {title}
            </Typography>
            <Chip 
              label={`${likecount} likes`} 
              size="small" 
              sx={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '12px'
              }} 
            />
          </Box>
        }
        subheader={
          <Link to={`/users/${userId}`} style={{ textDecoration: 'none', color: 'rgba(255, 255, 255, 0.7)' }}>
            @{userName}
          </Link>
        }
        sx={headerStyle}
      />
      
      <CardContent sx={contentStyle}>
        <Typography variant="body1" sx={{ color: '#e0e0e0', lineHeight: 1.6 }}>
          {text}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing sx={actionsStyle}>
        <IconButton 
          disabled={localStorage.getItem("currentUsersId") == null}
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
          sx={{
            color: alreadyLiked ? '#ff6b6b' : 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              color: alreadyLiked ? '#ff5252' : '#667eea'
            }
          }}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', ml: 1 }}>
          {likecount}
        </Typography>
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
        <CardContent sx={{ 
          background: 'rgba(255, 255, 255, 0.02)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          mt: 2
        }}>
          <Typography variant="h6" sx={{ color: '#e0e0e0', mb: 2, fontWeight: 600 }}>
            Comments ({commentList.length})
          </Typography>
          {commentList.map(comment => (
            <Comment key={comment.id} userId={comment.userId} userName={comment.username} text={comment.text} />
          ))}     
          {localStorage.getItem("currentUsersId") == null ? "" :
            <CommentForm setNewComment={setNewComment} userId={localStorage.getItem("currentUsersId")} postId={postId} />
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;