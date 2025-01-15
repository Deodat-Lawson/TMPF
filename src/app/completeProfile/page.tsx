'use client'

import React, { useEffect, useState } from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import { useRouter } from "next/navigation";

export default function CompleteProfile() {
  const router = useRouter();
  const { user } = useUser()
  const { userId } = useAuth()

  const [isSaving, setIsSaving] = useState(true);
  const [error, setError] = useState<string | null>(null);


  function toErrorString(e: unknown): string {
    if (e instanceof Error) {
      return e.message;
    }
    return typeof e === "string" ? e : "An error occurred";
  }


  // On mount, optionally prefill from Clerk’s user
  useEffect(() => {
    const saveToDatabase = async () => {
      if (!user?.id) return;

      try {

        console.log("Saving user data to database", user.username);
        console.log("User ID", userId);

        const response = await fetch('/api/user/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            userName: user.username,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to store user data')
        }

        router.replace("/");
      } catch (err: unknown) {
        console.error(err);
        setError(toErrorString(err) || "An error occurred");
        setIsSaving(false);
      }
    }
    saveToDatabase().catch((error) => {
      console.error(error);
      setError((error as string) || "An error occurred");
      setIsSaving(false);
    });
  }, [user, userId, router])



  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(45deg, #1a365d, #2563eb)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Rotating Shapes in the Background */}
      {
        [...Array(5).keys()].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "60vw",
              height: "60vw",
              borderRadius: "43%",
              background: "rgba(255, 255, 255, 0.05)",
              animation: `rotate ${20 + i * 5}s linear infinite`,
              top: `${-20 + i * 10}%`,
              left: `${-10 + i * 5}%`,
              transformOrigin: "center center",
            }}
          />
        ))
      }


      {/* Inline keyframes */}
      <style>
        {`
          @keyframes rotate {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes spin {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Glassy container for the loading message */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          padding: "3rem 4rem",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        {isSaving && !error ? (
          <>
            <div
              style={{
                width: "64px",
                height: "64px",
                margin: "0 auto 1rem",
                border: "8px solid rgba(255, 255, 255, 0.2)",
                borderTop: "8px solid #fff",
                borderRadius: "50%",
                animation: "spin 1.2s linear infinite",
              }}
            />
            <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Saving Profile...</h2>
            <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Please wait while we complete your profile setup.
            </p>
          </>
        ) : error ? (
          <>
            <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Error</h2>
            <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              {error}. Please try again or contact support.
            </p>
          </>
        ) : (
          // If user had no user?.id, you'd show a fallback
          <h2 style={{ color: "#fff" }}>No user data available.</h2>
        )}
      </div>
    </div>
  )

}