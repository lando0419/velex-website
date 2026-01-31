'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { FormInput } from './FormInput'
import { FormTextarea } from './FormTextarea'
import { CheckboxGroup } from './CheckboxGroup'
import { SubmitButton } from './SubmitButton'

interface FormData {
  name: string
  email: string
  company: string
  serviceType: string
  simulationTypes: string[]
  message: string
}

const SERVICE_OPTIONS = [
  { id: 'full-service', label: 'Full-Service (we design + simulate)' },
  { id: 'sim-only', label: 'Simulation-Only (I have CAD files)' },
]

interface FormErrors {
  name?: string
  email?: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const SIMULATION_OPTIONS = [
  { id: 'structural', label: 'Structural' },
  { id: 'thermal', label: 'Thermal' },
  { id: 'cfd', label: 'CFD' },
  { id: 'modal', label: 'Modal' },
  { id: 'optimization', label: 'Optimization' },
  { id: 'other', label: 'Other' },
]

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    serviceType: '',
    simulationTypes: [],
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Submission failed')

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        serviceType: '',
        simulationTypes: [],
        message: '',
      })
    } catch {
      setStatus('error')
    }
  }

  const isDisabled = status === 'loading' || status === 'success'

  return (
    <div className="rounded-xl border border-titanium/20 bg-void/80 p-6 md:p-8">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="w-16 h-16 text-success-green mx-auto mb-4" />
            </motion.div>
            <h3 className="font-headline text-2xl text-plasma-white mb-2">
              Message Sent!
            </h3>
            <p className="text-titanium">
              We&apos;ll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 text-velex-blue hover:text-electric-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Error Banner */}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-stress-red/10 border border-stress-red/30"
              >
                <AlertCircle className="w-5 h-5 text-stress-red flex-shrink-0" />
                <p className="text-sm text-stress-red">
                  Something went wrong. Please try again.
                </p>
              </motion.div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <FormInput
                label="Your Name"
                name="name"
                required
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
                error={errors.name}
                disabled={isDisabled}
              />
              <FormInput
                label="Your Email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                error={errors.email}
                disabled={isDisabled}
              />
            </div>

            <FormInput
              label="Company"
              name="company"
              value={formData.company}
              onChange={(value) => setFormData({ ...formData, company: value })}
              disabled={isDisabled}
            />

            <CheckboxGroup
              label="Service Type"
              options={SERVICE_OPTIONS}
              selected={formData.serviceType ? [formData.serviceType] : []}
              onChange={(selected) =>
                setFormData({ ...formData, serviceType: selected[selected.length - 1] || '' })
              }
              disabled={isDisabled}
            />

            <CheckboxGroup
              label="What type of analysis do you need?"
              options={SIMULATION_OPTIONS}
              selected={formData.simulationTypes}
              onChange={(selected) =>
                setFormData({ ...formData, simulationTypes: selected })
              }
              disabled={isDisabled}
            />

            <FormTextarea
              label="Project Description"
              name="message"
              value={formData.message}
              onChange={(value) => setFormData({ ...formData, message: value })}
              disabled={isDisabled}
            />

            <SubmitButton isLoading={status === 'loading'} disabled={isDisabled} />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
