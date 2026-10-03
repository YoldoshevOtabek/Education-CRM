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
    directionId: number;
    teacherId: number;
    startDate: string;
    lessonDays: string[];
    startTime: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Student {
    id: number;
    fullName: string;
    phone: string;
    birthDate: string;
    gender: string;
    directionId: number;
    level: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    direction: Direction;
    groups: {
      id: number;
      groupId: number;
      studentId: number;
      createdAt: string;
      group: Group;
    }[];
  }
  
  export interface DashboardResponse {
    success: boolean;
    message: string;
  
    data: {
      stats: {
        totalStudents: number;
        totalTeachers: number;
        totalGroups: number;
        totalDirections: number;
      };
  
      recentStudents: Student[];
  
      recentGroups: (Group & {
        direction: Direction;
        teacher: Teacher;
        students: unknown[];
        studentsCount: number;
      })[];
    };
  }