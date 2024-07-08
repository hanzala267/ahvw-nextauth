"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const getDashboardLink = () => {
    if (!session) return "/";
    switch (session.user.role) {
      case "customer":
        return "/client";
      case "employee":
        return "/employee";
      case "admin":
        return "/admin";
      default:
        return "/";
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to Your App
          </CardTitle>
        </CardHeader>
        <CardContent>
          {session ? (
            <div className="space-y-4">
              <p className="text-center">
                You are signed in as {session.user.email}.
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild>
                  <Link href={getDashboardLink()}>View Dashboard</Link>
                </Button>
                <Button variant="outline" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center">
                Please sign in to access all features.
              </p>
              <div className="flex justify-center">
                <Button onClick={() => signIn()}>Sign In</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
