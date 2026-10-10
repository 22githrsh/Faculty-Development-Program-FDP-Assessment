import StatusBadge from './StatusBadge.jsx'

function StudentTable({ students, hasFilters, onEdit }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-mark" aria-hidden="true">⌕</span>
        <strong>{hasFilters ? 'No matching students' : 'No student records yet'}</strong>
        <p>{hasFilters ? 'Try another search or clear the filters.' : 'Add a student to begin building this directory.'}</p>
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <table className="student-table">
        <thead>
          <tr>
            <th scope="col">STUDENT</th>
            <th scope="col">EMAIL</th>
            <th scope="col">COURSE</th>
            <th scope="col">STATUS</th>
            <th scope="col"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id ?? student.email}>
              <td>
                <div className="student-name">
                  <span className="student-avatar" aria-hidden="true">
                    {student.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                  </span>
                  <strong>{student.name}</strong>
                </div>
              </td>
              <td className="student-email">{student.email}</td>
              <td className="course-text">{student.course}</td>
              <td><StatusBadge status={student.status} /></td>
              <td><button className="edit-button" type="button" onClick={() => onEdit(student)}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable