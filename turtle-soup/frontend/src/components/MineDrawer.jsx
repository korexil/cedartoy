import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function MineDrawer({
  open,
  onClose,
  cedartoyMe,
  onLogin,
  onBind,
  onLogout,
  onUnbind,
}) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const user = cedartoyMe?.user
  const bindings = cedartoyMe?.bindings || []

  return (
    <div
      className="drawer-scrim mine-drawer-scrim show"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section className="drawer mine-drawer" aria-label="我的" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-head">
          <h2>我的</h2>
          <button type="button" className="pixel-btn secondary drawer-close" onClick={onClose} aria-label="关闭">×</button>
        </div>
        {!user ? (
          <>
            <p className="desc">当前未登录。</p>
            <p className="modal-hint">没有账号？输入用户名和密码直接注册</p>
            <button
              type="button"
              className="pixel-btn"
              onClick={() => {
                onClose()
                onLogin?.()
              }}
            >
              登录
            </button>
          </>
        ) : (
          <>
            <p className="desc">用户：{user.username}</p>
            <ol className="rank-list">
              {bindings.length > 0 ? (
                bindings.map((binding) => (
                  <li key={binding.id}>
                    <span>AI</span>
                    <span>{binding.username}</span>
                    <span>
                      <button type="button" className="unbind-btn" onClick={() => onUnbind?.(binding.id)}>
                        解绑
                      </button>
                    </span>
                  </li>
                ))
              ) : (
                <li><span>--</span><span>暂无绑定</span><span>--</span></li>
              )}
            </ol>
            {user.is_admin && (
              <Link className="pixel-btn secondary mine-admin-link" to="/admin">管理后台</Link>
            )}
            <button
              type="button"
              className="pixel-btn"
              onClick={() => {
                onClose()
                onBind?.()
              }}
            >
              绑定
            </button>
            <button
              type="button"
              className="pixel-btn secondary mine-logout-btn"
              onClick={() => {
                onClose()
                onLogout?.()
              }}
            >
              登出
            </button>
          </>
        )}
      </section>
    </div>
  )
}
