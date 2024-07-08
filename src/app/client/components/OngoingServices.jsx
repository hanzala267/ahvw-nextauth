"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OngoingServices({ service }) {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // Handle comment submission logic here
    console.log(`Comment submitted: ${comment}`);
    setComment(""); // Clear the comment field
  };

  return (
    <Card classname="my-2">
      <CardHeader>
        <CardTitle>Ongoing Service</CardTitle>
        <CardDescription>
          <div>Service ID: {service.id}</div>
          <div>Service Name: {service.name}</div>
          <div>Date In: {service.dateIn}</div>
          <div>Date Out: {service.dateOut}</div>
        </CardDescription>
        {/* <Button className="my-3">See Details</Button> */}
      </CardHeader>
      <br />
      <CardFooter className="flex flex-col">
        <Textarea
          placeholder="Add your comment here"
          value={comment}
          onChange={handleCommentChange}
          className="mb-2"
        />
        <Button onClick={handleCommentSubmit}>Submit Comment</Button>
      </CardFooter>
    </Card>
  );
}
