import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Unauthorized() {
  const navigate = useNavigate();
  const {role} = useUser()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-red-500">
          403
        </h1>

        <h2 className="text-2xl font-semibold mt-4">
          Access Denied
        </h2>

        <p className="text-gray-500 mt-2">
          Sizda ushbu sahifaga kirish uchun ruxsat yo'q.
        </p>

        {role == "STUDENT" ? <button
          onClick={() => navigate("/students")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Studentlarga qaytish
        </button> : ""}
        {
            role == "TEACHER" ? <button
            onClick={() => navigate("/students")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Teacherlarga qaytish
          </button> : ""
        }
      </div>
    </div>
  );
}