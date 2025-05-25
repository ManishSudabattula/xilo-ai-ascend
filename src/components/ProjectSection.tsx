// src/components/ProjectsSection.tsx
import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Project {
  title: string
  description: string
  tech: string[]
  link?: string
}

const projects: Project[] = [
  {
    title: 'Adversarial Testing on GPT-2',
    description:
      'Developed “Adversarial Safenet” to probe and guard GPT-2 against toxic or adversarial prompts using TextAttack and a safety-aware classifier.',
    tech: ['Python', 'TensorFlow', 'HuggingFace'],
    link: 'https://github.com/ManishSudabattula/Adversarial-Safenet',
  },
  {
    title: 'AWS-Based AI App Deployment',
    description:
      'Built and deployed a containerized, microservices-based AI app on AWS (EC2, Lambda, S3) with FastAPI back-ends, React front-end and GitHub Actions CI/CD.',
    tech: ['AWS', 'Docker', 'FastAPI', 'React'],
    link: 'https://github.com/ManishSudabattula/aws-ai-deploy',
  },
  {
    title: 'USF Bulls Connect Enhancement',
    description:
      'Rebuilt core React UI components, integrated Firebase for auth & real-time sync, and optimized load speed with Tailwind CSS.',
    tech: ['React.js', 'Firebase', 'Tailwind CSS'],
    link: 'https://github.com/ManishSudabattula/USF-Bulls-Connect',
  },
  {
    title: 'Social Network Analysis of Authors',
    description:
      'Visualized citation and co-authorship networks using NetworkX & Gephi; applied PageRank/centrality to find key influencers.',
    tech: ['Python', 'NetworkX', 'Gephi'],
    link: 'https://github.com/ManishSudabattula/author-network-analysis',
  },
  {
    title: 'xv6 OS Enhancements',
    description:
      'Enhanced kernel memory & scheduling subsystems in the xv6 teaching OS, and built debugging tools for performance analysis.',
    tech: ['C', 'x86', 'OS Kernel'],
    link: 'https://github.com/ManishSudabattula/xv6-enhancements',
  },
]

export default function ProjectsSection() {
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const onWheel = (e: WheelEvent) => {
      const rect = rail.getBoundingClientRect()
      const midY = window.innerHeight / 2

      // Only hijack if the rail occupies the vertical middle of viewport
      const inMiddle =
        rect.top < midY * 1.1 && rect.bottom > midY * 0.9

      if (!inMiddle) return

      const atLeftEnd = rail.scrollLeft === 0 && e.deltaY < 0
      const atRightEnd =
        Math.ceil(rail.scrollLeft) >= rail.scrollWidth - rail.clientWidth &&
        e.deltaY > 0

      if (atLeftEnd || atRightEnd) return

      e.preventDefault()
      rail.scrollLeft += e.deltaY
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <section
      id="projects"
      className="relative py-32"
    >
      {/* ——— Heading + matching underline ——— */}
      <motion.h2
        className="text-4xl font-thin text-white mb-16 relative text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Projects
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

      {/* ——— Horizontal scroll rail ——— */}
      <div
        ref={railRef}
        className="overflow-x-auto overflow-y-hidden no-scrollbar px-4"
      >
        <div className="flex gap-6">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-none w-80 p-6 bg-white bg-opacity-10 border border-white/20 rounded-lg text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-sm leading-relaxed mb-4">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
