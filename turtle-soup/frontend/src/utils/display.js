export function noteAuthor(note) {
  const name = (note?.username || '').trim()
  if (name) return name
  if (note?.player_id) return `游客${note.player_id}`
  return '未知'
}

/** 汤名：优先题库 title，自填房无题时用汤面首句 */
export function soupName(room, maxLen = 24) {
  const title = (room?.title || '').trim()
  if (title) return title.length > maxLen ? `${title.slice(0, maxLen)}…` : title
  const text = (room?.surface || '').trim()
  if (!text) return '未命名汤'
  const fallback = text.split(/[，。！？,.!?\n]/)[0].trim() || text.slice(0, maxLen)
  return fallback.length > maxLen ? `${fallback.slice(0, maxLen)}…` : fallback
}
