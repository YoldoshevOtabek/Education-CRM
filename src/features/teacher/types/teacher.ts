export interface Student {
    id: number;
    fullName: string;
    phone: string;
    level: string;
    status: string;
  }
  
  export interface GroupStudent {
    id: number;
    student: Student;
  }
  
 export interface Group {
    id: number;
    name: string;
    startTime: string;
    lessonDays: string[];
    status: string;
    students: GroupStudent[];
  }
  
  export interface Direction {
    id: number;
    name: string;
    description: string;
    status: string;
  }
  
  export interface TeacherType {
    id: number;
    fullName: string;
    phone: string;
    directionId: number;
    experience: number;
    status: string;
    direction?: Direction;
    groups?: Group[];
  }
  
  export interface ApiResponse {
    success: boolean;
    message: string;
    data: TeacherType[];
  }