import { directionService } from "../../directions/services/directions";
import type { Direction } from "../../directions/types/directions";
import { studentService } from "../services/student";
import type { CreateStudentDto } from "../types/student";

type SeedStudent = {
  fullName: string;
  phone: string;
  birthDate: string;
  gender: "MALE" | "FEMALE";
  directionName: string;
  level: CreateStudentDto["level"];
};

export const DEMO_STUDENTS: SeedStudent[] = [
  { fullName: "Azizbek Karimov", phone: "+998901234567", birthDate: "2005-03-15", gender: "MALE", directionName: "Frontend", level: "BEGINNER" },
  { fullName: "Madina Rahimova", phone: "+998911234568", birthDate: "2004-07-22", gender: "FEMALE", directionName: "Backend", level: "INTERMEDIATE" },
  { fullName: "Jasurbek Aliyev", phone: "+998931234569", birthDate: "2006-11-10", gender: "MALE", directionName: "React.js", level: "BEGINNER" },
  { fullName: "Sevinch Qodirova", phone: "+998941234570", birthDate: "2005-02-05", gender: "FEMALE", directionName: "UI/UX Design", level: "BEGINNER" },
  { fullName: "Sardorbek Ismoilov", phone: "+998951234571", birthDate: "2003-09-18", gender: "MALE", directionName: "Python", level: "ADVANCED" },
  { fullName: "Nilufar Tursunova", phone: "+998971234572", birthDate: "2006-04-27", gender: "FEMALE", directionName: "Frontend", level: "INTERMEDIATE" },
  { fullName: "Bekzod Abdullayev", phone: "+998991234573", birthDate: "2004-12-12", gender: "MALE", directionName: "Backend", level: "BEGINNER" },
  { fullName: "Mohira Ergasheva", phone: "+998901234574", birthDate: "2005-06-30", gender: "FEMALE", directionName: "Graphic Design", level: "INTERMEDIATE" },
  { fullName: "Diyorbek Xasanov", phone: "+998911234575", birthDate: "2007-01-08", gender: "MALE", directionName: "JavaScript", level: "BEGINNER" },
  { fullName: "Shaxnoza Olimova", phone: "+998931234576", birthDate: "2004-05-19", gender: "FEMALE", directionName: "Frontend", level: "ADVANCED" },
  { fullName: "Umidjon Sobirov", phone: "+998941234577", birthDate: "2003-08-25", gender: "MALE", directionName: "Python", level: "INTERMEDIATE" },
  { fullName: "Gulnoza Mamatova", phone: "+998951234578", birthDate: "2006-10-14", gender: "FEMALE", directionName: "Backend", level: "BEGINNER" },
  { fullName: "Akmaljon Norboyev", phone: "+998971234579", birthDate: "2005-03-03", gender: "MALE", directionName: "React.js", level: "INTERMEDIATE" },
  { fullName: "Ziyoda Usmonova", phone: "+998991234580", birthDate: "2004-12-21", gender: "FEMALE", directionName: "UI/UX Design", level: "ADVANCED" },
  { fullName: "Boburjon Yoqubov", phone: "+998901234581", birthDate: "2006-07-09", gender: "MALE", directionName: "Frontend", level: "BEGINNER" },
];

function asDirectionList(data: unknown): Direction[] {
  if (Array.isArray(data)) return data as Direction[];
  if (data && typeof data === "object" && Array.isArray((data as { data?: unknown }).data)) {
    return (data as { data: Direction[] }).data;
  }
  return [];
}

async function ensureDirections(): Promise<Map<string, Direction>> {
  const res = await directionService.getDirections(1, 100);
  const list = asDirectionList(res.data);
  const byName = new Map(
    list.map((item) => [item.name.trim().toLowerCase(), item])
  );

  const names = [...new Set(DEMO_STUDENTS.map((item) => item.directionName))];

  for (const name of names) {
    const key = name.toLowerCase();
    if (byName.has(key)) continue;

    const created = await directionService.createDirection({
      name,
      description: `${name} kursi`,
    });
    const direction = (created.data as unknown as Direction) ?? created.data;
    if (direction && "id" in direction) {
      byName.set(key, direction as Direction);
    }
  }

  return byName;
}

export async function seedDemoStudents(): Promise<number> {
  const directions = await ensureDirections();
  const existing = await studentService.getStudents(1, 200);
  const phones = new Set(
    (Array.isArray(existing.data) ? existing.data : []).map((item) => item.phone)
  );

  let createdCount = 0;

  for (const student of DEMO_STUDENTS) {
    if (phones.has(student.phone)) continue;

    const direction = directions.get(student.directionName.toLowerCase());
    if (!direction?.id) continue;

    await studentService.createStudent({
      fullName: student.fullName,
      phone: student.phone,
      birthDate: student.birthDate,
      gender: student.gender,
      directionId: direction.id,
      level: student.level,
      status: "ACTIVE",
    });
    phones.add(student.phone);
    createdCount += 1;
  }

  return createdCount;
}
