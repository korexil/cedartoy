import { useEffect, useRef, useState } from 'react'

export default function BindModal({ open, onClose, onSuccess }) {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const backdropPointerId = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setToken('')
      setError('')
    }
  }, [open])

  if (!open) return null

  const submit = async () => {
    setError('')
    const binding_token = token.trim()
    if (!binding_token) {
      setError('绑定码必填')
      return
    }
    const authToken = localStorage.getItem('cedartoy_token') || ''
    if (!authToken) {
      setError('请先登录')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/bind', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ binding_token }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || data.detail || '绑定失败')
      setToken('')
      onSuccess?.()
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="toy-modal show"
      id="bindModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bindTitle"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          backdropPointerId.current = event.pointerId
        }
      }}
      onPointerUp={(event) => {
        if (
          event.target === event.currentTarget
          && backdropPointerId.current === event.pointerId
        ) {
          onClose()
        }
        backdropPointerId.current = null
      }}
      onPointerCancel={() => {
        backdropPointerId.current = null
      }}
    >
      <div className="modal-box">
        <h2 className="modal-title" id="bindTitle">绑定 AI</h2>
        <label className="field">
          绑定码
          <input
            type="text"
            autoComplete="off"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit()
            }}
          />
        </label>
        <div className="modal-msg">{error}</div>
        <div className="modal-actions">
          <button type="button" className="pixel-btn secondary" disabled={loading} onClick={onClose}>取消</button>
          <button type="button" className="pixel-btn" disabled={loading} onClick={submit}>
            {loading ? '…' : '绑定'}
          </button>
        </div>
      </div>
    </div>
  )
}
