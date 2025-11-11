// src/components/sections/StatisticsSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Users, CheckCircle, Award } from 'lucide-react';

const CountUp = ({ endValue }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    const options = { threshold: 0.4 };
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const increment = endValue / (duration / 10);
        const timer = setInterval(() => {
          start += increment;
          if (start >= endValue) {
            start = endValue;
            clearInterval(timer);
          }
          setCount(Math.ceil(start));
        }, 10);
      }
    }, options);

    if (ref.current) observer.current.observe(ref.current);
    return () => observer.current?.disconnect();
  }, [endValue]);

  return (
    <p
      ref={ref}
      className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm"
      style={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary)' }}
    >
      {count}
    </p>
  );
};

const Statistics = () => {
  const stats = [
    { icon: Users, value: 840, label: 'Clients satisfaits' },
    { icon: CheckCircle, value: 710, label: 'Projets suivis' },
    { icon: Award, value: 17, label: 'Distinctions' },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-[var(--color-light-gray)] to-white overflow-hidden">
      {/* Décor flou et gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-lg hover:shadow-xl transition-all duration-500 rounded-2xl p-8 flex flex-col items-center text-center space-y-4 border border-white/40 transform hover:-translate-y-1"
              style={{ animation: `fadeUp 0.6s ease ${index * 0.2}s both` }}
            >
              {/* Icône circulaire avec dégradé */}
              <div className="p-5 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-blue-400 text-white shadow-md">
                <stat.icon size={36} />
              </div>

              <CountUp endValue={stat.value} />

              <p className="text-base md:text-lg font-medium text-gray-700">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Animation fade-up */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Statistics;
