import React from "react";
import { useLocation } from "react-router-dom";

const DiscoverPostPage = () => {
  const location = useLocation();
  const { posts } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Discover Posts</h2>
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const totalVotes = post.votesOnFirstOption.length + post.votesOnSecondOption.length;
            const firstOptionPercentage = totalVotes
              ? ((post.votesOnFirstOption.length / totalVotes) * 100).toFixed(2)
              : 0;
            const secondOptionPercentage = totalVotes
              ? ((post.votesOnSecondOption.length / totalVotes) * 100).toFixed(2)
              : 0;

            return (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
              >
                <img src={post.image} alt="Post" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Question: {post.poolQuestion}</h3>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Answers: {post.poolAnswers.join(" -or- ")}</h3>

                  <p className="text-gray-600 mb-2">Total Votes: {totalVotes}</p>
                  <div className="mt-4">
                    <p className="text-gray-600 mb-1">
                      Votes for Option 1: {firstOptionPercentage}% ({post.votesOnFirstOption.length} votes)
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${firstOptionPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-600 mb-1">
                      Votes for Option 2: {secondOptionPercentage}% ({post.votesOnSecondOption.length} votes)
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${secondOptionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">{post.likes.length}</span>{" "}
                      {post.likes.length === 1 ? "Like" : "Likes"}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">{post.comments.length}</span>{" "}
                      {post.comments.length === 1 ? "Comment" : "Comments"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600 mt-6">No posts available.</p>
      )}
    </div>
  );
};

export default DiscoverPostPage;
