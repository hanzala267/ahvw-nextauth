"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import useCommentsStore from "@/stores/commentsStore";

export default function OngoingServices({ service }) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { comments, addComment, fetchComments } = useCommentsStore();

  useEffect(() => {
    fetchComments(service.id);
  }, [service.id, fetchComments]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/customer/services/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service.id,
          content: comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const newComment = await response.json();
      addComment(service.id, newComment);
      setComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to submit comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>Ongoing Service</CardTitle>
        <CardDescription>
          <div>Service ID: {service.id}</div>
          <div>
            Vehicle: {service.vehicle.name} ({service.vehicle.licensePlate})
          </div>
          <div>Status: {service.status}</div>
          <div>
            Created At: {new Date(service.createdAt).toLocaleDateString()}
          </div>
          <div>
            Updated At: {new Date(service.updatedAt).toLocaleDateString()}
          </div>
          <div>Total Cost: ${service.totalCost.toFixed(2)}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">Comments:</h3>
        {comments[service.id] && comments[service.id].length > 0 ? (
          comments[service.id].map((comment, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
              <p>{comment.content}</p>
              <small>
                By: {comment.user.firstName} {comment.user.lastName} on{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col">
        <Textarea
          placeholder="Add your comment here"
          value={comment}
          onChange={handleCommentChange}
          className="mb-2"
        />
        <Button
          className="w-full"
          onClick={handleCommentSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </Button>
      </CardFooter>
    </Card>
  );
}
