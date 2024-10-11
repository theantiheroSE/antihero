'use client'

import React, { useState, useEffect } from 'react'
import { Link as ScrollLink, Element } from 'react-scroll'
import { motion } from 'framer-motion'

const sections = [
  { id: 'about', title: 'About' },
  { id: 'contact', title: 'Contact' },
]

const AnimatedBackground = () => {
  const [triangles, setTriangles] = useState([])

  useEffect(() => {
    const generateTriangles = () => {
      const newTriangles = []
      for (let i = 0; i < 20; i++) {
        newTriangles.push({
          id: i,
          size: Math.random() * 50 + 20,
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.5 + 0.1,
          animationDuration: Math.random() * 20 + 10,
          animationDelay: Math.random() * 10,
        })
      }
      setTriangles(newTriangles)
    }

    generateTriangles()
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
      <svg className="w-full h-full">
        {triangles.map((triangle) => (
          <polygon
            key={triangle.id}
            points={`0,${triangle.size} ${triangle.size / 2},0 ${triangle.size},${triangle.size}`}
            fill="url(#triangle-gradient)"
            opacity={triangle.opacity}
            style={{
              transform: `translate(${triangle.x}%, ${triangle.y}%)`,
              animation: `float-${triangle.id} ${triangle.animationDuration}s infinite alternate ${triangle.animationDelay}s ease-in-out`,
            }}
          />
        ))}
        <defs>
          <linearGradient id="triangle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
      <style jsx>{`
        ${triangles.map((triangle) => `
          @keyframes float-${triangle.id} {
            0% {
              transform: translate(${triangle.x}%, ${triangle.y}%) rotate(0deg);
            }
            100% {
              transform: translate(${triangle.x + 10}%, ${triangle.y + 10}%) rotate(360deg);
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  )
}

export default function AntiHero() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('Sending...')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      if (response.ok) {
        setFormStatus('Message sent successfully!')
        setFormState({ name: '', email: '', message: '' })
      } else {
        setFormStatus('Failed to send message. Please try again.')
      }
    } catch (error) {
      setFormStatus('An error occurred. Please try again later.')
    }
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <AnimatedBackground />
      <div className="relative z-10">
        <main>
          <Element name="home" className="min-h-screen flex items-center">
            <div className="container mx-auto px-4 lg:px-20">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-12"
                >
                  <h1 className="text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    The Anti-Hero
                  </h1>
                  <p className="text-2xl mb-8 text-purple-300">Embrace the darkness, find your light</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex justify-center gap-6"
                >
                  {sections.map((section) => (
                    <ScrollLink
                      key={section.id}
                      to={section.id}
                      smooth={true}
                      duration={500}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full cursor-pointer transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 text-lg"
                    >
                      {section.title}
                    </ScrollLink>
                  ))}
                </motion.div>
              </div>
            </div>
          </Element>

          <Element name="about" className="min-h-screen flex items-center justify-center py-20">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              >
                About The Anti-Hero
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  <p className="text-xl text-purple-300">
                    The Anti-Hero is not your typical protagonist. We challenge conventions and redefine what it means to be
                    a hero in today's world.
                  </p>
                  <p className="text-xl text-purple-300">
                    Our mission is to inspire individuals to embrace their unique qualities and use them to make a difference,
                    even if it means going against the grain.
                  </p>
                  <ul className="list-disc list-inside text-purple-300 space-y-2 text-lg">
                    <li>Unconventional methods</li>
                    <li>Complex morality</li>
                    <li>Resilience in adversity</li>
                    <li>Challenging status quo</li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20"
                >
                  <img
                    src="/placeholder.svg?height=600&width=800&text=Anti-Hero"
                    alt="Anti-Hero"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </Element>

          <Element name="contact" className="min-h-screen flex items-center justify-center py-20">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              >
                Join The Anti-Hero Movement
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-md mx-auto"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300"
                  />
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
                {formStatus && (
                  <p className="mt-4 text-center text-purple-300">{formStatus}</p>
                )}
              </motion.div>
            </div>
          </Element>
        </main>

        <footer className="bg-black bg-opacity-50 backdrop-blur-lg py-8 border-t border-purple-500">
          <div className="container mx-auto px-4 text-center">
            <p className="text-purple-300">&copy; {new Date().getFullYear()} The Anti-Hero. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}