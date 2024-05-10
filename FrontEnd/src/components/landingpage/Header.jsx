import React, { useEffect, useState } from "react";
import Logo from "../../../public/images/logo_vector.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [top, setTop] = useState(true);
  const navigate = useNavigate();
  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    //console.log(user.roles == "Admin");
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);
  
  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? "bg-white backdrop-blur-sm shadow-lg" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4 cursor-pointer">
            <img src={Logo} className="h-10" onClick={() => navigate("/")} />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">

            {/* Desktop navigation links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              {/* Chatrooms link */}
              <li>
                <button
                  onClick={() => navigate("/ChatFront")}
                  className="font-medium text-gray-600 hover:text-gray-900 px-4 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Chatrooms
                </button>
              </li>
               <li>
            <button
                onClick={() => navigate("/tournaments")}
                className="font-medium text-gray-600 hover:text-gray-900 px-4 py-2 flex items-center transition duration-150 ease-in-out"
            >
                Tournaments
            </button>
        </li>
              <li>
                <button
                  onClick={() => navigate("/fetchmatchforview")}
                  className="font-medium text-gray-600 hover:text-gray-900 px-4 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Matches
                </button>
              </li>

              {/* User authentication links */}
              {user ? (
                <>
                  <li>
                    <button
                      onClick={() => navigate("/profile")}
                      className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-900 ml-3 flex items-center"
                    >
                      <span>Dashboard</span>
                      <svg
                        className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button

                        onClick={() => navigate("/signin")}
                        className="font-medium text-gray-600 hover:text-gray-900 px-4 py-2 flex items-center transition duration-150 ease-in-out"

                    >
                      Sign in
                    </button>
                  </li>
                  <li>
                    <button

                        onClick={() => navigate("/register")}
                        className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-900 ml-3 flex items-center"

                    >
                      <span>Sign up</span>
                      <svg
                        className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* <MobileMenu /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
