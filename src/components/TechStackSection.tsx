// src/components/TechStackSection.tsx
import React from 'react'
import { motion } from 'framer-motion'
import {
  SiReact,
  SiTypescript,
  SiPython,
  SiTensorflow,
  SiTailwindcss,
  SiVite,
  SiLangchain,
  SiGraphql,
  SiAwsamplify,
  SiAutodesk,        // ← Autodesk icon for Revit
} from 'react-icons/si'
import { FaProjectDiagram, FaRobot } from 'react-icons/fa'

const tech = [
  { Icon: SiReact,        label: 'React' },
  { Icon: SiTypescript,   label: 'TypeScript' },
  { Icon: SiPython,       label: 'Python' },
  { Icon: SiTensorflow,   label: 'TensorFlow' },
  { Icon: SiTailwindcss,  label: 'TailwindCSS' },
  { Icon: SiVite,         label: 'Vite' },
  { Icon: SiLangchain,    label: 'LangChain' },
  { Icon: FaProjectDiagram, label: 'LangGraph' },
  { Icon: SiGraphql,      label: 'RAG' },
  { Icon: FaRobot,        label: 'Agentic' },
  { Icon: SiAwsamplify,   label: 'AWS/Amplify' },
  { Icon: SiAutodesk,     label: 'Revit' },      // ← added back in
]

export default function TechStackSection() {
  return (
    <section
      id="tech"
      className="relative py-32 flex flex-col items-center"
    >
      {/* Title + underline */}
      <motion.h2
        className="text-4xl font-thin text-white mb-16 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Tech Stack
        <motion.div
          className="
            absolute bottom-[-4px] left-1/2 -translate-x-1/2
            h-[1px] bg-white/80
            drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]
          "
          initial={{ width: 0 }}
          whileInView={{ width: '50%' }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        />
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-12 px-4">
        {tech.map(({ Icon, label }, i) => (
          <motion.div
            key={label}
            className="flex flex-col items-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
          >
            <Icon size={48} className="mb-3" />
            <span>{label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
