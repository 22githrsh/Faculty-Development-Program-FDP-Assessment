export function validateStudent(student) {
  if (!student.name.trim() || !student.email.trim() || !student.course.trim()) {
    return 'Name, email, and course are required.'
  }

  // Challenge 2: add email-format and duplicate-email validation.
  return ''
}