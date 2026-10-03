export interface loginType{
    username:string;
    password:string
}

export enum USER_ROLE {
    ADMIN = "ADMIN",
    RECEPTION = "RECEPTION",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
  }


export type LoginUser = {
    id: number;
    username: string;
    role: USER_ROLE;
    studentId: number | null;
    teacherId: number | null;
    createdAt: string;
    updatedAt: string;
    student: null;
    teacher: null;
  };
  
  export type LoginData = {
    token: string;
    user: LoginUser;
  };
  
  export type LoginResponse = {
    success: boolean;
    message: string;
    data: LoginData;
  };
 