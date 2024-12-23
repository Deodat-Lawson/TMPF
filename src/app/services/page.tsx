'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';


// If using CSS modules:
import styles from '~/styles/Service.module.css';

// If you’re using a global stylesheet, comment the above line and use:
// import '../../globals.css';

export default function Services() {
  const services = [
    {
      title: 'Quick Guide',
      description:
        'Get an idea of where you are at in the process of application and what you need to do next.',
      features: [
        'University Recommendation',
        'Current Application Overview',
        'General Overview',
      ],
      link: '/universityApp/',
    },
    {
      title: 'Pomodoro Timer (Beta)',
      description:
        'Improve your productivity and focus with the Pomodoro technique. Our timer helps you break down work into intervals, allowing you to work efficiently and take regular breaks.',
      features: [
        'Customizable work intervals',
        'Break reminders',
        'Task tracking',
        'Progress visualization',
        'Time management tips',
      ],
      link: '/timer',
    },
    {
      title: 'University Matching',
      description:
        'Our comprehensive university matching service helps you find the perfect institution based on your academic profile, interests, and career goals. We analyze factors such as academic programs, campus culture, location, and admission requirements to provide personalized recommendations.',
      features: [
        'Personalized university shortlisting',
        'Academic profile evaluation',
        'Admission probability assessment',
        'Location and culture matching',
        'Budget and financial aid guidance',
      ],
      link: '/featureUnavailable',
    },
    {
      title: 'Application Guidance',
      description:
        'Navigate the complex university application process with confidence. Our experienced counselors provide step-by-step guidance on applications, essays, and documentation requirements for your target universities.',
      features: [
        'Application strategy planning',
        'Essay writing assistance',
        'Document preparation support',
        'Portfolio development',
        'Interview preparation',
      ],
      link: '/featureUnavailable',
    },
    {
      title: 'Career Planning',
      description:
        'Build a strong foundation for your future career. Our career planning services help you align your academic choices with your professional aspirations, ensuring you’re on the right path to achieve your career goals.',
      features: [
        'Career assessment and exploration',
        'Major selection guidance',
        'Industry insights and trends',
        'Internship planning',
        'Professional development roadmap',
      ],
      link: '/featureUnavailable',
    },
  ];

  return (
    <div className={styles['video-background'] /* or just "video-background" if global CSS */}>

      {/* Video Section */}
      <div className={styles['video-container']}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles['background-video']}
        >
          <source src="/HomeBackground.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={styles['video-overlay']} />
      </div>

      {/* Services Content */}
      <div
        className={styles['services-page']}
        style={{ paddingTop: '64px', width: '65%', margin: '0 auto' }}
      >
        {/* Header Section */}
        <div className={styles['services-header']}>
          <h1>Our Services</h1>
          <p>
            Comprehensive support for your academic journey, from university
            selection to career planning.
          </p>
        </div>

        {/* Services Section */}
        <div className={styles['services-container']}>
          <div className={styles['services-grid']}>
            {services.map((service, index) => (
              <div key={index} className={styles['service-card']}>
                <div className={styles['service-header']}>
                  {/* If you had a custom icon per service, you could replace `service.icon` here. */}
                  <div className={styles['service-icon']}>
                    {/* Placeholder or actual icon */}
                    {/* e.g. <SomeIcon size={32} /> */}
                  </div>
                  <h2>{service.title}</h2>
                </div>

                <p className={styles['service-description']}>
                  {service.description}
                </p>

                <div className={styles['features-container']}>
                  <h3>Key Features:</h3>
                  <ul className={styles['features-list']}>
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <div className={styles['feature-dot']} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use Next.js <Link> for client-side routing */}
                <Link href={service.link} className={styles['learn-more-link']}>
                  Learn More <ArrowRight size={20} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className={styles['services-footer']}>
          <p>© 2024 The Most Promising Future. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
