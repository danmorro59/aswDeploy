import { useState, createContext, useEffect } from "react";

const MetubeContext = createContext()

export const MetubeProvider =({children}) =>{
    const [users, setUsers] = useState(null)
    const [commentsOrdered,setCommentsOrdered] = useState([])
    const [video, setVideo] = useState(null)
    const [commentsLiked, setCommentsLiked] = useState(null)
    const [videos, setVideos] = useState([])

    useEffect(()=>{
        fetch('/Users')
        .then((response)=> response.json())
        .then((data)=>setUsers(data))
    },[])
//fetch for comments by date
    useEffect(() => {
        fetch('/CommentsAll')
          .then(response => response.json())
          .then(data => {
            const sortedComments = data.sort((a, b) => new Date(b.date_published) - new Date(a.date_published));
            setCommentsOrdered(sortedComments);
          });
      }, []);

//fetch for comments liked in ASC
  useEffect(() => {
    fetch('/CommentsAll')
      .then(response => response.json())
      .then(data => {
        // Sort comments by number of likes in descending order
        const sortedComments = data.sort((a, b) => b.likes - a.likes);
        setCommentsLiked(sortedComments);
      });
  }, []);
  useEffect(() => {
    fetch('/Videos')
      .then((response) => response.json()) // Add parentheses after .json
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
    return(
        <MetubeContext.Provider value={{
            users,
            setUsers,
            commentsOrdered,
            setCommentsOrdered,
            commentsLiked,
            setCommentsLiked,
            video,
            setVideo,
            videos,
            setVideos
        }}>
            {children}
        </MetubeContext.Provider>
    )
}

export default MetubeContext