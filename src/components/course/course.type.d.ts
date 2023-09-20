export type Course = {
  id: string;
  name: string;
  completedByStudentIDs: string[];
  enrolledByStudentIDs: string[];
  lecturerIDs: string[];
  available: boolean;
  onYear: 'GANJIL' | 'GENAP';
};
