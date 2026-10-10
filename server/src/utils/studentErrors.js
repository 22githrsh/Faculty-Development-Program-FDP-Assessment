export function getStudentWriteError(error, mongoose) {
  if (error.code === 11000) {
    return { status: 409, message: "A student with this email already exists" };
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return { status: 400, message: error.message };
  }

  return { status: 500, message: "Unable to save student" };
}