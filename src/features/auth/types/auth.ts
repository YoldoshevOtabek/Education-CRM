export interface loginType{
    username:string;
    password:string
}

export type USER_ROLE = 
    "ADMIN" |
   "RECEPTION"|
    "TEACHER"|
     "STUDENT"
  


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
 