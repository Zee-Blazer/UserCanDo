"use client";
import AuthProvider from "@/context/authContext";
import LoginPage from "./login";

export default function Home() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}
