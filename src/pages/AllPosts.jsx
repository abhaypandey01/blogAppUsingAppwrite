import {Container, PostCard} from "../components"
import service from "../appwrite/configure"
import {useState, useEffect} from "react"

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                console.log("Fetched Posts:", posts.documents)
                setPosts(posts.documents)
            }
        })
    },[])


    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id}>
                                <PostCard key={post.$id} $id={post.$id} title={post.title} featuredImage={post.featuredImage} />
                            </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts