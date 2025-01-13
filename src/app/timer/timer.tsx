"use client";

import React, { useState, useEffect } from "react";
import { Button, Typography, Container} from "@mui/material";
import { Play, Pause, Clock } from 'lucide-react';
import { useUser } from "@clerk/nextjs";


interface TimerProps {
  workDuration?: number;
  breakDuration?: number;
}



const Timer: React.FC<TimerProps> = ({ workDuration = 25, breakDuration = 5 }) => {

  const { user } = useUser();

  const [time, setTime] = useState(workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0) {
      clearInterval(interval);
      setIsWorkSession(!isWorkSession);
      setTime(isWorkSession ? breakDuration * 60 : workDuration * 60);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time, isWorkSession, breakDuration, workDuration]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #1a365d, #2563eb)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Animation */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '60vw',
            height: '60vw',
            borderRadius: '43%',
            background: 'rgba(255, 255, 255, 0.05)',
            animation: `rotate ${20 + i * 5}s linear infinite`,
            top: `${-20 + i * 10}%`,
            left: `${-10 + i * 5}%`,
            transformOrigin: 'center center',
          }}
        />
      ))}

      <style>
        {`
                    @keyframes rotate {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                `}
      </style>

      <Container style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        color: 'white'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '500px'
        }}>
          <Typography variant="h4" style={{
            marginBottom: '2rem',
            color: 'white',
            fontSize: '2rem'
          }}>
            Welcome, { user?.username || "Guest"}
          </Typography>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <Clock size={32} style={{ marginRight: '1rem' }} />
            <Typography style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              animation: 'pulse 2s infinite'
            }}>
              {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}
            </Typography>
          </div>

          <Typography style={{
            fontSize: '1.5rem',
            marginBottom: '2rem',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            {isWorkSession ? "Work Session" : "Break Time"}
          </Typography>

          <Button
            variant="contained"
            onClick={() => setIsActive(!isActive)}
            style={{
              backgroundColor: 'white',
              color: '#2563eb',
              padding: '12px 32px',
              fontSize: '1.2rem',
              borderRadius: '12px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            {isActive ? (
              <>
                <Pause size={24} /> Pause
              </>
            ) : (
              <>
                <Play size={24} /> Start
              </>
            )}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Timer;