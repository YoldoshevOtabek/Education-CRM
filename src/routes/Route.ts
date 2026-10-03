export const priviteRoute = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: "bi bi-grid",
    role:["ADMIN"]
  },
  {
    id: 2,
    title: "Course",
    path: "/course",
    icon: "bi bi-person-lock",
    role:["ADMIN","RECEPTION"]

  },
  {
    id: 3,
    title: "Groups",
    path: "/groups",
    icon: "bi bi-people",
    role:["ADMIN","RECEPTION","TEACHER"]

  },
  {
    id: 4,
    title: "Directions",
    path: "/direction",
    icon: "bi bi-person",
    role:["ADMIN","RECEPTION","TEACHER","STUDENTS"]

  },
  {
    id: 5,
    title: "Reception",
    path: "/reception",
    icon: "bi bi-building",
    role:["ADMIN","RECEPTION"]

  },
  {
    id: 6,
    title: "Students",
    path: "/students",
    icon: "bi bi-mortarboard",
    role:["ADMIN","RECEPTION","TEACHER"]

  },
  {
    id: 7,
    title: "Teacher",
    path: "/teacher",
    icon: "bi bi-person-workspace",
    role:["ADMIN","RECEPTION"]

  },
];

export const authRoute = [
  {
    id: 1,
    path: "/login",

  }
]