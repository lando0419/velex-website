'use client'

import { motion } from 'framer-motion'
import { DollarSign, Clock, Scale, CheckCircle, Lightbulb } from 'lucide-react'

export interface EstimateData {
  title: string
  costRange: { low: number; high: number }
  timeline: string
  weight?: string
  material?: string
  materialReason?: string
  successRate: number
  suggestion?: {
    text: string
    costDelta: string
  }
}

interface EstimateCardProps {
  data: EstimateData
}

export function EstimateCard({ data }: EstimateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl border border-ixra-blue/30 bg-ixra-blue/5 overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-2.5 bg-ixra-blue/10 border-b border-ixra-blue/20">
        <h4 className="font-headline text-sm text-plasma-white flex items-center gap-2">
          <span className="text-base">🔧</span>
          {data.title}
        </h4>
      </div>

      {/* Stats Grid */}
      <div className="p-4 space-y-3">
        {/* Cost */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-ixra-blue/10 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-ixra-blue" />
          </div>
          <div>
            <p className="text-[10px] text-titanium/60 uppercase tracking-wider">Cost Estimate</p>
            <p className="font-numbers text-sm text-plasma-white">
              ${data.costRange.low.toLocaleString()} - ${data.costRange.high.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-ixra-blue/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-ixra-blue" />
          </div>
          <div>
            <p className="text-[10px] text-titanium/60 uppercase tracking-wider">Timeline</p>
            <p className="text-sm text-plasma-white">{data.timeline}</p>
          </div>
        </div>

        {/* Weight (if provided) */}
        {data.weight && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-ixra-blue/10 flex items-center justify-center">
              <Scale className="w-4 h-4 text-ixra-blue" />
            </div>
            <div>
              <p className="text-[10px] text-titanium/60 uppercase tracking-wider">Est. Weight</p>
              <p className="text-sm text-plasma-white">{data.weight}</p>
            </div>
          </div>
        )}

        {/* Success Rate */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-success-green/10 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-success-green" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-titanium/60 uppercase tracking-wider">Success Rate</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-titanium/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-success-green"
                  initial={{ width: 0 }}
                  animate={{ width: `${data.successRate}%` }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              <span className="text-sm text-success-green font-numbers">{data.successRate}%</span>
            </div>
          </div>
        </div>

        {/* Material Info */}
        {data.material && (
          <div className="pt-2 border-t border-titanium/10">
            <p className="text-xs text-titanium">
              <span className="text-plasma-white font-medium">Material:</span> {data.material}
            </p>
            {data.materialReason && (
              <p className="text-xs text-titanium/70 mt-0.5">{data.materialReason}</p>
            )}
          </div>
        )}

        {/* Suggestion */}
        {data.suggestion && (
          <div className="mt-3 p-3 rounded-lg bg-warning-orange/10 border border-warning-orange/20">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-warning-orange flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-plasma-white">{data.suggestion.text}</p>
                <p className="text-xs text-warning-orange mt-0.5">({data.suggestion.costDelta})</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
