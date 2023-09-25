export type Student = {
  id: string;
  studentID: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  completedCoursesIDs: string[];
  enrolledCoursesIDs: string[];
  gradesIDs: string[];
  semester: number;
  createdAt: Date;
};
