export interface Direction {
    id: number;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Teacher {
    id: number;
    fullName: string;
    phone: string;
    directionId: number;
    experience: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Group {
    id: number;
    name: string;
    groupId?: number;
    studentId?: number;
    directionId: number;
    teacherId: number;
    startDate: string;
    lessonDays: string[];
    startTime: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    teacher?: Teacher;
  }
  
  export interface StudentGroup {
    id: number;
    groupId: number;
    studentId: number;
    createdAt: string;
    group: Group;
  }
  
  export interface Student {
    id: number;
    fullName: string;
    phone: string;
    birthDate: string;
    gender: "MALE" | "FEMALE";
    directionId: number;
    level:
      | "BEGINNER"
      | "ELEMENTARY"
      | "INTERMEDIATE"
      | "UPPER_INTERMEDIATE"
      | "ADVANCED";
  
    status: "ACTIVE" | "GRADUATED";
  
    createdAt: string;
    updatedAt: string;
  
    direction: Direction;
  
    groups: StudentGroup[];
  }
  
  export interface StudentResponse {
    success: boolean;
    message: string;
  
    data: Student[];
  
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }