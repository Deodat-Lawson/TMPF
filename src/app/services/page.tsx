"use client";
import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, School, Target, Calendar, Award } from 'lucide-react';
import styles from '../../styles/Service.module.css';

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  status: 'available' | 'coming-soon';
}

const ServicesPage = () => {
  const services: ServiceCard[] = [
    {
      title: "Pomodoro Timer",
      description: "Boost your productivity with our customizable Pomodoro timer. Track your study sessions and breaks effectively.",
      icon: <Clock size={32} />,
      path: "/timer",
      status: "available"
    },
    {
      title: "University Application Planning",
      description: "Get personalized university recommendations based on your academic profile and preferences.",
      icon: <School size={32} />,
      path: "/universityApp/form",
      status: "available"
    },
    {
      title: "Study Resources",
      description: "Access comprehensive study materials, guides, and resources to support your academic journey.",
      icon: <BookOpen size={32} />,
      path: "/resources",
      status: "coming-soon"
    },
    {
      title: "Goal Setting",
      description: "Set and track your academic goals with our intuitive goal management system.",
      icon: <Target size={32} />,
      path: "/goals",
      status: "coming-soon"
    },
    {
      title: "Application Timeline",
      description: "Stay organized with our interactive university application timeline and deadline tracker.",
      icon: <Calendar size={32} />,
      path: "/timeline",
      status: "coming-soon"
    },
    {
      title: "Achievement Tracking",
      description: "Record and showcase your academic achievements, extracurricular activities, and awards.",
      icon: <Award size={32} />,
      path: "/achievements",
      status: "coming-soon"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Our Services</h1>
        <p>Explore our suite of tools designed to help you succeed in your academic journey</p>
      </div>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <Link
            href={service.status === 'available' ? service.path : '#'}
            key={index}
            className={`${styles.serviceCard} ${service.status === 'coming-soon' ? styles.comingSoon : ''}`}
          >
            <div className={styles.iconContainer}>
              {service.icon}
            </div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            {service.status === 'coming-soon' && (
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;