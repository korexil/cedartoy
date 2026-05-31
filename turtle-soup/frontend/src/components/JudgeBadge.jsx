const JUDGMENT_STYLES = {
  yes: ['YES', 'judgment-yes'],
  no: ['NO', 'judgment-no'],
  partial: ['???', 'judgment-partial'],
  unrelated: ['--', 'judgment-unrelated'],
}

export default function JudgeBadge({ value }) {
  if (!value || value === 'game_over' || value === 'auto_hint') return null
  const [label, cls] = JUDGMENT_STYLES[value] || [value, 'judgment-other']
  return <span className={`log-judgment ${cls}`}>&gt; {label}</span>
}
