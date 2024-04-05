import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="bg-landing-page">
        <nav className="bg-transparent pt-1">
          {/**mx-auto max-w-7xl px-2 sm:px-6 container */}
          <div class="bg-white bg-opacity-75 rounded  mx-auto max-w-7xl px-2 sm:px-6">
            <div class="relative flex h-16 items-center justify-between gap-10">
              <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  type="button"
                  class="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white invert"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span class="absolute -inset-0.5"></span>
                  <span class="sr-only">Open main menu</span>

                  <svg
                    class="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>

                  <svg
                    class="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between ">
                <div class="flex flex-shrink-0 items-center ">
                  <img
                    src="../public/assets/images/logo_vector.svg"
                    alt=""
                    className="w-10 mr-3"
                  />
                  <div className="hidden md:block text-black text-sm font-extrabold">
                    LINKUP <span style={{ color: "#268247" }}>TOURNAMENT</span>
                  </div>
                </div>
                <div class="hidden sm:ml-6 sm:block">
                  <div class="flex space-x-4">
                    <a
                      href="#"
                      class="bg-gray-900 text-black  px-3 py-2 text-sm font-bold border-active"
                      aria-current="page"
                    >
                      Home
                    </a>
                    <a
                      href="#"
                      class="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-bold"
                    >
                      About
                    </a>
                    <a
                      href="#"
                      class="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-bold"
                    >
                      Gallery
                    </a>
                    <a
                      href="#"
                      class="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-bold"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                  style={{ background: "#262932" }}
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  SIGN IN
                </button>
              </div>
            </div>
          </div>

          <div class="hidden" id="mobile-menu">
            <div class="space-y-1 px-2 pb-3 pt-2">
              <a
                href="#"
                class="bg-gray-900 text-white block px-3 py-2 text-base font-medium border-nav"
                aria-current="page"
              >
                Dashboard
              </a>
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Team
              </a>
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Projects
              </a>
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Calendar
              </a>
            </div>
          </div>
        </nav>
        <div
          className="bg-white bg-opacity-75 rounded  mx-auto max-w-7xl px-2 sm:px-6 text-black mt-3 flex items-center"
          style={{ height: "87vh" }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-black leading-normal md:leading-normal">
            <span className="bg-black-2 text-white py-1 md:py-2">
              Simplify Tournament</span>
              <br /> Organization Like <br />
              <span className="bg-black-2 text-white py-1 md:py-2">
                Never Before
              </span>
            </h1>
            <p className="text-lg md:text-xl font-bold mb-8 mt-10">
              Streamline Scheduling, Management, and More.
            </p>
            <a
              className="text-white font-medium py-3 px-6 rounded-lg cursor-pointer"
              style={{ background: "#262932" }}
              onClick={() => {
                navigate("/signin");
              }}
            >
              Create Your Tournament
            </a>
          </div>
          <div className="text-black bg-hero rounded hidden lg:block"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
