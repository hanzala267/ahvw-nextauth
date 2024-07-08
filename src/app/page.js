"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react"; // Import the loader icon

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { signIn, signOut } = useAuth();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      switch (session.user.role) {
        case "admin":
          router.push("/admin");
          break;
        case "employee":
          router.push("/employee");
          break;
        case "customer":
          router.push("/client");
          break;
        default:
          break;
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[300px]">
          <CardContent className="flex flex-col items-center p-6">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-2 text-lg font-semibold">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <Button onClick={() => router.push(`/${session.user.role}`)}>
                  View Dashboard
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
                <Button onClick={() => router.push("/login")}>Sign In</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
