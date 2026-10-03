export enum GroupStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum LessonDay {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export enum StudentGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum StudentLevel {
  BEGINNER = "BEGINNER",
  ELEMENTARY = "ELEMENTARY",
  INTERMEDIATE = "INTERMEDIATE",
  UPPER_INTERMEDIATE = "UPPER_INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export interface Direction {
  id: number;
  name: string;
  description: string;
  status: GroupStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: number;
  fullName: string;
  phone: string;
  directionId: number;
  experience: number;
  status: GroupStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: number;
  fullName: string;
  phone: string;
  birthDate: string;
  gender: StudentGender;
  directionId: number;
  level: StudentLevel;
  status: GroupStatus | "GRADUATED";
  createdAt: string;
  updatedAt: string;
}

export interface GroupStudent {
  id: number;
  groupId: number;
  studentId: number;
  createdAt: string;
  student: Student;
}

export interface Group {
  id: number;
  name: string;
  directionId: number;
  teacherId: number;
  startDate: string;
  lessonDays: LessonDay[];
  startTime: string;
  status: GroupStatus;
  createdAt: string;
  updatedAt: string;

  direction: Direction;
  teacher: Teacher;

  students: GroupStudent[];
  studentsCount: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: Group[];
  pagination: Pagination;
}