import React from 'react'
import { FileText, AlignLeft, Monitor, Briefcase, Palette, LayoutTemplate, Moon, LayoutGrid, Terminal } from 'lucide-react'

const templates = [
  // Free Templates
  { id: 'modern', name: 'Moderno', color: '#3b82f6', icon: <FileText size={28} strokeWidth={1.5} />, isPro: false },
  { id: 'minimalist', name: 'Minimalista', color: '#10b981', icon: <AlignLeft size={28} strokeWidth={1.5} />, isPro: false },
  { id: 'pixel', name: 'Pixel Art', color: '#f97316', icon: <Monitor size={28} strokeWidth={1.5} />, isPro: false },
  { id: 'executive', name: 'Ejecutivo', color: '#1e40af', icon: <Briefcase size={28} strokeWidth={1.5} />, isPro: false },
  { id: 'creative', name: 'Creativo', color: '#06b6d4', icon: <Palette size={28} strokeWidth={1.5} />, isPro: false },

  // Pro Templates
  { id: 'pro-editorial', name: 'Editorial', color: '#475569', icon: <LayoutTemplate size={28} strokeWidth={1.5} />, isPro: true },
  { id: 'pro-dark', name: 'Oscuro', color: '#1e293b', icon: <Moon size={28} strokeWidth={1.5} />, isPro: true },
  { id: 'pro-border', name: 'Vanguardia', color: '#6366f1', icon: <LayoutGrid size={28} strokeWidth={1.5} />, isPro: true },
  { id: 'pro-y2k', name: 'Y2K Win98', color: '#d946ef', icon: <Terminal size={28} strokeWidth={1.5} />, isPro: true },
]

function TemplateSelector({ selectedTemplate, onSelect }) {
  const handleSelect = tpl => {
    onSelect(tpl.id)
  }

  return (
    <div
      className='template-selector-container'
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        background: 'transparent',
        padding: '0',
      }}
    >
      {templates.map(tpl => {
        return (
          <div
            key={tpl.id}
            onClick={() => handleSelect(tpl)}
            style={{
              height: '90px',
              background: selectedTemplate === tpl.id ? 'white' : '#f8fafc',
              border: `3px solid ${selectedTemplate === tpl.id ? tpl.color : '#e2e8f0'}`,
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              transform: selectedTemplate === tpl.id ? 'scale(1.05)' : 'scale(1)',
              boxShadow: selectedTemplate === tpl.id ? `0 5px 15px ${tpl.color}40` : 'none',
            }}
          >
            <span style={{ color: selectedTemplate === tpl.id ? tpl.color : '#94a3b8', display: 'flex' }}>{tpl.icon}</span>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: selectedTemplate === tpl.id ? tpl.color : '#64748b',
                marginTop: '5px',
              }}
            >
              {tpl.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default TemplateSelector
