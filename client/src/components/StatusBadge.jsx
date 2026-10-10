const statusClasses = {
  Applied: 'status-applied',
  Interview: 'status-interview',
  Offered: 'status-offered',
  Placed: 'status-placed',
}

function StatusBadge({ status }) {
  return <span className={`status-badge ${statusClasses[status] ?? ''}`}>{status}</span>
}

export default StatusBadge