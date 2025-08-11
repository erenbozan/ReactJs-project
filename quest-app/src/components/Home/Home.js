import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import { Box, Typography, CircularProgress } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const [isRefreshed, setIsRefreshed] = useState(false);

    const refreshPosts = () => {
        fetch("http://localhost:9090/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                    console.log(result);
                    
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    console.log("Error:", error);
                }
            )
    }

    useEffect(() => {
        refreshPosts()
    }, [isRefreshed]);

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
    };

    const contentStyle = {
        maxWidth: '800px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    };

    const loadingStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        gap: '16px'
    };

    const errorStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        gap: '16px',
        color: '#e0e0e0'
    };

    if (error) {
        return (
            <div style={containerStyle}>
                <Box sx={errorStyle}>
                    <ErrorIcon sx={{ fontSize: 60, color: '#ff6b6b' }} />
                    <Typography variant="h5" sx={{ color: '#e0e0e0', fontWeight: 600 }}>
                        Something went wrong
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Please try again later
                    </Typography>
                </Box>
            </div>
        );
    } else if (!isLoaded) {
        return (
            <div style={containerStyle}>
                <Box sx={loadingStyle}>
                    <CircularProgress 
                        size={60}
                        sx={{
                            color: '#667eea',
                            '& .MuiCircularProgress-circle': {
                                strokeLinecap: 'round',
                            }
                        }}
                    />
                    <Typography variant="h6" sx={{ color: '#e0e0e0', fontWeight: 500 }}>
                        Loading posts...
                    </Typography>
                </Box>
            </div>
        );
    } else {
        return (
            <div style={containerStyle}>
                <Box sx={contentStyle} className="fade-in">
                    {localStorage.getItem("currentUsersId") == null ? "" :
                        <PostForm userId={localStorage.getItem("currentUsersId")} userName={localStorage.getItem("username")} setIsRefreshed={setIsRefreshed} />
                    }
                    
                    {postList.length === 0 ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '300px',
                            gap: '16px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '40px'
                        }}>
                            <Typography variant="h6" sx={{ color: '#e0e0e0', fontWeight: 600 }}>
                                No posts yet
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
                                Be the first to share something amazing!
                            </Typography>
                        </Box>
                    ) : (
                        postList.map(post => (
                            <Post key={post.id} likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text} />
                        ))
                    )}
                </Box>
            </div>
        );
    }
}

export default Home;    