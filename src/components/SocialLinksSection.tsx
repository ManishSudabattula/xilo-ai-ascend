// src/components/ContactSection.tsx

import React from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'

const contacts = [
  { Icon: FaEnvelope, label: 'Email', href: 'mailto:sudabattulam@frameworkx.in' },
  { Icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/manishsudabattula/' },
  { Icon: FaGithub,   label: 'GitHub',   href: 'https://github.com/ManishSudabattula' },
  { Icon: FaInstagram,label: 'Instagram', href: 'https://www.instagram.com/frameworkx.ai/' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 bg-frameworkx-black flex flex-col items-center">
      {/* Section Title with underline, same as other sections */}
      <motion.h2
        className="text-4xl font-thin text-white mb-16 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Let’s Connect
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

      {/* Icon links */}
      <div className="flex gap-12 mb-16">
        {contacts.map(({ Icon, label, href }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-white hover:text-frameworkx-accent transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + contacts.indexOf({ Icon, label, href }) * 0.1, duration: 0.6 }}
          >
            <Icon size={36} />
            <span className="mt-2 text-sm">{label}</span>
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/20 pt-6 text-center text-xs text-white/50">
        © 2021&ndash;2025 Frameworkx. All rights reserved.
      </footer>
    </section>
  )
}
