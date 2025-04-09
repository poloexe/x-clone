import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { usePosts } from "../../hooks/usePosts";
import { useEffect } from "react";

const Posts = ({ feedType }) => {
  const getEndPoint = () => {
    if (feedType === "forYou") {
      return "/api/post/all";
    } else if (feedType === "following") {
      return "/api/post/following";
    } else {
      return "/api/post/all";
    }
  };

  const postEndPoint = getEndPoint();

  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = usePosts({ postEndPoint });

  useEffect(() => {
    refetch();
  }, [feedType, refetch]);

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && !isRefetching && posts && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
