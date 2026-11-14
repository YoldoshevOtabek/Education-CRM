import { lazy } from "react";
import type { USER_ROLE } from "../features/auth/types/auth";

type PrivateRouteItem = {
  id: number;
  title: string;
  path: string;
  icon: string;
  role: USER_ROLE[];
  element: ReturnType<typeof lazy>;
};

export const priviteRoute: PrivateRouteItem[] = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: "bi bi-grid",
    role:["ADMIN","RECEPTION","TEACHER","STUDENT"],
    element: lazy(()=> import("../features/dashboard/Dashboard"))
  },
  {
    id: 2,
    title: "Course",
    path: "/course",
    icon: "bi bi-person-lock",
    role:["ADMIN","RECEPTION",],
    element: lazy(()=> import("../features/course/Course"))

  },
  {
    id: 3,
    title: "Groups",
    path: "/groups",
    icon: "bi bi-people",
    role:["ADMIN","RECEPTION","TEACHER","STUDENT"],
    element: lazy(()=> import("../features/groups/Groups"))

  },
  {
    id: 4,
    title: "Directions",
    path: "/direction",
    icon: "bi bi-person",
    role: ["ADMIN", "RECEPTION", "TEACHER", ],
    element: lazy(()=> import("../features/directions/Directions"))

  },
  {
    id: 5,
    title: "Reception",
    path: "/reception",
    icon: "bi bi-building",
    role:["ADMIN","RECEPTION"],
    element: lazy(()=> import("../features/reception/Reception"))

  },
  {
    id: 6,
    title: "Students",
    path: "/students",
    icon: "bi bi-mortarboard",
    role:["ADMIN","RECEPTION","TEACHER","STUDENT"],
    element: lazy(()=> import("../features/students/Students"))
  },
  {
    id: 7,
    title: "Teachers",
    path: "/teachers",
    icon: "bi bi-person-workspace",
    role:["ADMIN","RECEPTION"],
    element: lazy(()=> import("../features/teacher/Teacher"))

  },
];

export const authRoute = [
  {
    id: 1,
    path: "/login",

  }
]