import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <Loader2 className="w-16 h-16 animate-spin text-black mx-auto" />
        <h2 className="mt-4 text-xl font-semibold text-black">Loading...</h2>
      </div>
    </div>
  );
}
