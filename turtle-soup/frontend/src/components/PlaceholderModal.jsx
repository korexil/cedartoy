import { useEffect, useRef } from 'react'

export default function PlaceholderModal({ open, title, message, onClose }) {
  const backdropPointerId = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="toy-modal show"
      id="placeholderModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="placeholderTitle"
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
        <h2 className="modal-title" id="placeholderTitle">{title || '敬请期待'}</h2>
        <p className="modal-hint" id="placeholderMsg">{message || '功能开发中，敬请期待。'}</p>
        <div className="modal-actions">
          <button type="button" className="pixel-btn" onClick={onClose}>知道了</button>
        </div>
      </div>
    </div>
  )
}
