"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  BookOpen,
  School,
  Clock,
  FileText,
  MessageSquare
} from 'lucide-react';
import styles from '../../styles/Service.module.css';

const ServicesPage = () => {
  const router = useRouter();

  const services = [
    {
      icon: <Search size={40} />,
      title: 'University Matching',
      description: 'Our AI-powered algorithm analyzes your academic profile, interests, and career goals to match you with universities that align perfectly with your aspirations.',
      features: [
        'Personalized university recommendations',
        'Admission likelihood assessment',
        'Program compatibility analysis'
      ],
      path: '/services/university-matching'
    },
    {
      icon: <BookOpen size={40} />,
      title: 'Application Guidance',
      description: 'Get comprehensive support throughout your application process with expert guidance on documentation, essays, and requirements.',
      features: [
        'Application timeline planning',
        'Document checklist management',
        'Essay review and feedback'
      ],
      path: '/services/application-guidance'
    },
    {
      icon: <School size={40} />,
      title: 'Career Planning',
      description: 'Make informed decisions about your academic path by understanding how it aligns with your future career goals.',
      features: ['Career path exploration', 'Industry insights', 'Skills gap analysis'],
      path: '/services/career-planning'
    },
    {
      icon: <Clock size={40} />,
      title: 'Study Management',
      description: 'Boost your productivity with our integrated study tools including Pomodoro timer and task management features.',
      features: [
        'Pomodoro technique timer',
        'Study schedule planner',
        'Progress tracking'
      ],
      path: '/services/study-management'
    },
    {
      icon: <FileText size={40} />,
      title: 'Document Preparation',
      description: 'Get assistance with preparing and organizing all necessary documents for your university applications.',
      features: [
        'Document templates',
        'Format checking',
        'Digital portfolio organization'
      ],
      path: '/services/document-preparation'
    },
    {
      icon: <MessageSquare size={40} />,
      title: 'AI Consultation',
      description: 'Access our AI education experts for personalized advice and immediate responses to your questions.',
      features: [
        '24/7 AI support',
        'Personalized guidance',
        'Quick query resolution'
      ],
      path: '/services/ai-consultation'
    }
  ];


  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.backgroundVideo}
        >
          <source src="/HomeBackground.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoOverlay} />
      </div>


      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Comprehensive University Planning Services
          </h1>
          <p className={styles.heroDescription}>
            From university selection to application submission, we provide all the tools and guidance you need for your
            academic journey.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className={styles.servicesContainer}>
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <button
              key={index}
              type="button"
              onClick={() => router.push(service.path)}
              className={styles.serviceCard}
              style={{
                // Remove default button styles to preserve your existing CSS
                background: 'none',
                border: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'inherit',
                cursor: 'pointer'
              }}
            >
              <div className={styles.serviceContent}>
                <div className={styles.serviceIcon}>
                  {service.icon}
                </div>
                <h3 className={styles.serviceTitle}>
                  {service.title}
                </h3>
                <p className={styles.serviceDescription}>
                  {service.description}
                </p>
                <ul className={styles.featuresList}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <div className={styles.featureDot} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Ready to Start Your Journey?
          </h2>
          <p className={styles.ctaDescription}>
            Try our AI-powered university planning tools and take the first step towards your academic success.
          </p>
          <button
            onClick={() => router.push('/universityApp/form')}
            className={styles.ctaButton}
          >
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 Nora AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ServicesPage;