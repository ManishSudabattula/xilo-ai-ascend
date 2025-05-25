// src/components/ui/FloatingBubble.tsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SECTIONS: { id: string; label: string }[] = [
  { id: 'landing', label: '' },
  { id: 'about',   label: 'About' },
  { id: 'projects',label: 'Projects' },
  // add more as you build
];

const FloatingBubble: React.FC = () => {
  const [current, setCurrent] = useState<string>('');

  useEffect(() => {
    const sectionEls = SECTIONS
      .map(s => ({ ...s, el: document.getElementById(s.id) }))
      .filter(s => s.el);

    const observer = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            const found = sectionEls.find(s => s.el === entry.target);
            setCurrent(found?.label || '');
          }
        }
      },
      {
        rootMargin: '0px 0px -50% 0px',
        threshold: 0,
      }
    );

    sectionEls.forEach(s => observer.observe(s.el!));
    return () => observer.disconnect();
  }, []);

  if (!current) return null;

  return (
    <motion.div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="
          flex items-center justify-center
          w-16 h-16 rounded-full
          bg-frameworkx-black bg-opacity-70 backdrop-blur-sm
          border border-white border-opacity-40
          text-white font-medium
        "
      >
        {current}
      </div>
    </motion.div>
  );
};

export default FloatingBubble;
