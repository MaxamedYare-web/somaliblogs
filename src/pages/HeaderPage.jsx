import { Navigate, NavLink } from "react-router";
import { useAuth } from "../lib/BlogContext";
import { useState } from "react";
import userProfile from "../assets/profile-user.png";
import logoImage from "../assets/somaliblogs_logo.png";
import { FaBars } from "react-icons/fa";

export const HeaderPage = () => {
  const { isAuthentication, Logout } = useAuth();
  const [isBars, setIsBars] = useState(false);
  const [isProfileClick, setIsProfileClick] = useState(false);
  const { user, getProfieImage, getUserData, themeDarkColor } = useAuth();
  getUserData();
  const email = user?.email;
  const username = email?.split("@")[0];
  const handleLogout = () => {
    Logout();
    return <Navigate to="/login" />;
  };

  const clickBars = () => {
    setIsBars(!isBars);
  };

  return (
    <>
      <header>
        <nav className="flex justify-between md:justify-around border-b-2 border-b-sky-400 shadow-lg text-[18px]  font-bold p-3">
          <NavLink to="/" className="flex items-center gap-1">
            <img
              className="w-[40px] h-[40px]"
              src={`${logoImage}`}
              alt="logo"
            />
            <p>Somali Blog</p>
          </NavLink>

          <div className="space-x-6">
            {!isAuthentication ? (
              <>
              <div className="items-center hidden sm:flex">
                  <NavLink
              className={({ isActive }) =>
                `p-1 px-3 rounded ${isActive ? "bg-orange-500 text-white" : ""}`
              }
              to="/"
            >
              Home
            </NavLink>
                  <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `p-1 px-2 rounded ${
                      isActive ? "bg-orange-500 text-white" : ""
                    }`
                  }
                >
                  About
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `py-1 hover:bg-orange-400 duration-300 px-5 rounded hidden md:block text-2xl ${
                      isActive && "bg-orange-500 text-white"
                    }`
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              </div>
                <FaBars onClick={clickBars} className="text-4xl md:hidden" />
                <div
                  className={`flex ${
                    isBars ? "block" : "hidden"
                  } md:hidden flex-col p-3 w-[300px] right-5 mt-4 ${
                    themeDarkColor.darkBg
                  } ${themeDarkColor.box} absolute z-10`}
                >
                  <NavLink
                    className={({ isActive }) =>
                      `p-1 px-3 rounded ${
                        isActive ? "bg-orange-500 text-white" : ""
                      }`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `p-1 px-2 rounded ${
                        isActive ? "bg-orange-500 text-white" : ""
                      }`
                    }
                  >
                    About
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `p-1 px-3 rounded ${
                        isActive && "bg-orange-500 text-white"
                      }`
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3 relative">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-[15px] sm:text-[18px]">Welcome:</h1>
                    <h1 className="text-[10px] first-letter:capitalize sm:text-[18px]">
                      {username ? username : "loading"}
                    </h1>
                    <img
                      onClick={() => setIsProfileClick(!isProfileClick)}
                      className={`h-[40px] w-[40px] ${
                        !getProfieImage && "bg-white"
                      } rounded-[100%]`}
                      src={getProfieImage ? getProfieImage : userProfile}
                      alt=""
                    />
                  </div>

                  {isProfileClick && (
                    <div
                      className={`absolute z-50 top-14 rounded w-[300px] right-5 p-3 ${themeDarkColor.darkBg} text-white`}
                    >
                      <div className="space-y-4 flex flex-col">
                      
                        <NavLink
                          to="/"
                          className="cursor-pointer border-b-2 text-center hover:text-orange-200 transition duration-1000"
                        >
                          Home
                        </NavLink>
                        <NavLink
                          to="/dashboard"
                          className="cursor-pointer border-b-2 text-center hover:text-orange-200 transition duration-1000"
                        >
                          Dashboard
                        </NavLink>
                        <NavLink
                          to="/editprofile"
                          className="cursor-pointer border-b-2 text-center hover:text-orange-200 transition duration-1000"
                        >
                          Edit Profile
                        </NavLink>
                        <NavLink
                          to="/addreview"
                          className="text-center border-b-2 hover:text-orange-200 transition duration-1000"
                        >
                          Add Review
                        </NavLink>
                        <button
                          onClick={handleLogout}
                          className="bg-orange-500 hover:bg-orange-300 transition duration-1000 cursor-pointer p-1 px-5 rounded text-white"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};
