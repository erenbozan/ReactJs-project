import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

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
                    console.log("Error:", error); // Hatanın ne olduğunu görmek için bu satırı ekledim
                }
            )
    }

    useEffect(() => {
        refreshPosts()
    }, [isRefreshed]);

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
                <PostForm userId={1} userName={"aaa"} setIsRefreshed = {setIsRefreshed}/>
                {postList.map(post => (
                    <Post key={post.id} likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text} />
                ))}
            </div>
        );
    }
}

export default Home;    