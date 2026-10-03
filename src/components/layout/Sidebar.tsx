import { Link, NavLink, useNavigate } from "react-router-dom";
import { priviteRoute } from "../../routes/Route";
import { useState } from "react";
import avatar from "../../assets/img/photo_2026-08-13_12-27-13.png";
import { clearToken } from "../../features/auth/utils/authStorage";

export default function Sidebar() {
  const [openToggle, setOpenToggle] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login", { replace: true });
  };

  return (
    <div
      className={`${
        openToggle ? "w-20" : "w-2xs"
      } layout-sidebar transition-all duration-300 h-screen border-r flex flex-col justify-between shrink-0`}
    >
      <div>
        <div className="flex justify-between items-center p-6">
          <div className="text-2xl font-semibold">
            {!openToggle ? "G-CRM" : ""}
          </div>
          <i
            className={`${
              openToggle ? "w-full flex justify-center" : ""
            } bi bi-layout-sidebar toggle-icon`}
            onClick={() => setOpenToggle(!openToggle)}
          ></i>
        </div>

        <div className="flex flex-col p-4">
          {priviteRoute.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={`${
                openToggle ? "px-3.5" : "px-5"
              } nav-link py-3 flex items-center gap-5`}
            >
              <i className={`${item.icon} text-[14px]`}></i>
              <span className="text-[14px]">
                {!openToggle ? item.title : ""}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="p-4">
        <button
          type="button"
          onClick={handleLogout}
          className={`${
            openToggle ? "px-3.5" : "px-5"
          } logOut flex items-center gap-5 py-3 w-full text-left`}
        >
          <i className="bi bi-box-arrow-left text-[14px]"></i>
          <span className="text-[14px] " style={{color:"red"}}>
            {!openToggle ? "Log Out" : ""}
          </span>
        </button>
        <div
          className={`${
            openToggle ? "p-1" : "p-1.5"
          } flex items-center gap-2.5 bg-gray-800 rounded-lg`}
        >
          <img src={avatar} alt="img" className="w-12 h-12 rounded-full" />
          {!openToggle && (
            <div>
              <span className="text-[14px] text-[#F3F5F7]">
                Otabek Yo'ldoshev
              </span>
              <br />
              <Link to={"mailto:yoldoshevo2000@gmail.com"} className="text-[12px] text-gray-300">
                otabek@gmail.com
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
