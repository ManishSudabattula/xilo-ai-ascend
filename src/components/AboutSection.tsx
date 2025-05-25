// src/components/AboutSection.tsx

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FaUser, FaBullseye } from 'react-icons/fa';
import LogoWhite from '@/assets/logo-white.png';

interface AboutSectionProps {
  isVisible: boolean;
}

interface Node {
  id: 'who' | 'mission' | 'why';
  title: string;
  content: string;
  angle: number;
  Icon?: React.ComponentType<{ size?: number; className?: string }>;
}

const nodes: Node[] = [
  {
    id: 'who',
    title: 'Who I Am',
    content:
      'I’m Manish Sudabattula, a Master’s graduate in Computer Science from USF (’25). I build intuitive AI-driven tools that streamline everyday workflows and empower people to work smarter.',
    angle: -90,
    Icon: FaUser,
  },
  {
    id: 'mission',
    title: 'My Mission',
    content:
      'Frameworkx’s motto is to adapt AI into our daily lives and solve problems rapidly through seamless AI integration.',
    angle: 30,
    Icon: FaBullseye,
  },
  {
    id: 'why',
    title: 'Why Frameworkx',
    content:
      'It’s also a social and educational hub for AI and problem-solving, and the foundation of an AI-SaaS platform I’m building to democratize intelligent tools for everyone.',
    angle: 150,
    // we’ll use the logo PNG here
  },
];

const lineVariants: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { delay: 0.5, duration: 1, ease: 'easeInOut' },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.8 + i * 0.3 },
  }),
};

const translateMap: Record<Node['id'], string> = {
  who: 'translate(-50%, -100%)',
  mission: 'translate(0, 0)',
  why: 'translate(-100%, 0)',
};

const AboutSection: React.FC<AboutSectionProps> = ({ isVisible }) => {
  const size = 360;
  const center = size / 2;
  const radius = 100;

  return (
    <section id="about" className="relative pt-56 pb-32 flex flex-col items-center">
      <motion.h2
        className="text-4xl font-thin text-white mb-44 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        About Me &amp; Frameworkx
        <motion.div
          className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 h-[1px] bg-white/80 drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
          initial={{ width: 0 }}
          animate={isVisible ? { width: '50%' } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        />
      </motion.h2>

      <div className="relative w-full max-w-[360px] h-[360px] mt-12">
        <svg className="absolute inset-0" width={size} height={size}>
          {nodes.map((n) => {
            const theta = (n.angle * Math.PI) / 180;
            const x2 = radius * Math.cos(theta) + center;
            const y2 = radius * Math.sin(theta) + center;
            return (
              <motion.line
                key={n.id}
                x1={center} y1={center}
                x2={x2} y2={y2}
                stroke="white" strokeWidth={2}
                variants={lineVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
              />
            );
          })}
        </svg>

        {nodes.map((n, i) => {
          const theta = (n.angle * Math.PI) / 180;
          const cx = radius * Math.cos(theta);
          const cy = radius * Math.sin(theta);
          const Icon = n.Icon;

          return (
            <div
              key={n.id}
              style={{
                position: 'absolute',
                left: `calc(50% + ${cx}px)`,
                top: `calc(50% + ${cy}px)`,
                transform: translateMap[n.id],
              }}
            >
              <motion.div
  className="
    w-72 p-6
    bg-white bg-opacity-10 text-white
    rounded-lg backdrop-blur-sm border border-white/20
    flex flex-col items-center space-y-4
  "
  custom={i}
  variants={cardVariants}
  initial="hidden"
  animate={isVisible ? 'visible' : 'hidden'}
>
  {n.id === 'why' ? (
    <img src={LogoWhite} alt="Frameworkx Logo" className="w-10 h-10 mb-2" />
  ) : (
    <Icon size={n.id === 'who' ? 20 : 20} className="text-white" />
  )}

  <h3 className="text-xl font-semibold text-center">{n.title}</h3>
  <p className="text-sm leading-relaxed text-justify whitespace-pre-line">
    {n.content}
  </p>
</motion.div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutSection;
