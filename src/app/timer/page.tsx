// app/timer/page.tsx
import React from 'react';
import Timer from './timer';

// This page can be a server component (no "use client" at the top).
// It just needs to render the Timer component.
// If you need client-side code or hooks in this page, add "use client" here as well.

export default function TimerPage() {
  return <Timer workDuration={25} breakDuration={5} />;
}