import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import Post from "../Post/Post";
function User(){
    const {userId} = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const [isRefreshed, setIsRefreshed] = useState(false);

    const refreshPosts = () => {
        const userId = localStorage.getItem("currentUsersId");
        const url = `http://localhost:9090/posts${userId ? `?userId=${userId}` : ''}`;
    
        fetch(url, {
            method: "GET",
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
            return response.json();
        })
        .then(result => {
            setIsLoaded(true);
            setPostList(result);
            console.log(result);
        })
        .catch(error => {
            setIsLoaded(true);
            setError(error);
            console.log("Error:", error.message); // Hatanın ne olduğunu görmek için bu satırı ekledim
        });
    };
    
    useEffect(() => {
        refreshPosts()
    }, []);

    const backgroundStyle = {
        backgroundImage: `
            linear-gradient(90deg, 
                rgba(9,9,121,1) 0%, 
                rgba(7,157,97,1) 25%, 
                rgba(5,111,188,1) 50%, 
                rgba(7,157,97,1) 75%, 
                rgba(9,9,121,1) 100%
            )
        `,
        backgroundAttachment: 'fixed',
        backgroundSize: '100% 100%',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "5px",
        gap: "2px"
    };

    if (error) {
        return <div>Error !!!</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div style={backgroundStyle}> 
                {postList.map(post => (
                    <Post key={post.id} likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text} />
                ))}
            </div>
        );
    }

}
export default User;