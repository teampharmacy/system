import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
        Welcome to the Pharmacy Management System
      </h1>
      <p className="text-lg text-center text-gray-700 mb-6">
        Manage your pharmacy efficiently with our easy-to-use system. Sign up or
        log in to get started!
      </p>

      <div className="flex space-x-4">
        <Link href="sign-in">
          <Button variant="default">Sign In</Button>
        </Link>
        <Link href="sign-up">
          <Button variant="outline">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
