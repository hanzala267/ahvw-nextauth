import { useEffect, useState } from "react";

const CommentsComponent = ({ serviceId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `/api/admin/services/comments/${serviceId}`
        );
        if (!response.ok) {
          throw new Error(await response.text());
        }
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message || "Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [serviceId]);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (comments.length === 0) return <div>No comments found.</div>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-gray-100 p-2 rounded">
            <p>{comment.content}</p>
            <small className="text-gray-600">
              By: {comment.user.firstName} {comment.user.lastName} on{" "}
              {new Date(comment.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsComponent;
