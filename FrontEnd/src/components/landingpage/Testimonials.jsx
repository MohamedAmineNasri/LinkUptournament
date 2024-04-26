import React from "react";
import TestimonialImage from '../../../public/images/testimonial.jpg'
export default function Testimonials() {
  return (
    <section className="relative">
      {/* Illustration behind content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -mb-32"
        aria-hidden="true"
      >
        <svg
          width="1760"
          height="518"
          viewBox="0 0 1760 518"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-02"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g
            transform="translate(0 -3)"
            fill="url(#illustration-02)"
            fillRule="evenodd"
          >
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">
              Trusted by over 20,000 companies all over the world
            </h2>
            <p className="text-xl text-gray-600" data-aos="zoom-y-out">
              Arcu cursus vitae congue mauris rhoncus viverra nibh cras pulvinar
              mattis blandit libero cursus mattis.
            </p>
          </div>

          {/* Items */}
          <div className="max-w-sm md:max-w-4xl mx-auto grid gap-2 grid-cols-4 md:grid-cols-5">
            {/* Item */}
            <div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
              <img
                src="https://upload.wikimedia.org/wikipedia/fr/thumb/3/33/Logo_Club_africain.svg/810px-Logo_Club_africain.svg.png"
                className="max-w-full fill-current text-gray-400"
                width="83"
                height="30"
                viewBox="0 0 83 30"
                xmlns="http://www.w3.org/2000/svg"
              />
            </div>

            {/* Item */}
            <div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
            <img
              src="https://upload.wikimedia.org/wikipedia/fr/thumb/3/33/Logo_Club_africain.svg/810px-Logo_Club_africain.svg.png"
              className="max-w-full fill-current text-gray-400"
              width="83"
              height="30"
              viewBox="0 0 83 30"
              xmlns="http://www.w3.org/2000/svg"
            />
            </div>

            {/* Item */}
            <div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
              <img
                src="https://upload.wikimedia.org/wikipedia/fr/thumb/3/33/Logo_Club_africain.svg/810px-Logo_Club_africain.svg.png"
                className="max-w-full fill-current text-gray-400"
                width="83"
                height="30"
                viewBox="0 0 83 30"
                xmlns="http://www.w3.org/2000/svg"
              />
            </div>

            {/* Item */}
            <div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
              <img
                src="https://upload.wikimedia.org/wikipedia/fr/thumb/3/33/Logo_Club_africain.svg/810px-Logo_Club_africain.svg.png"
                className="max-w-full fill-current text-gray-400"
                width="83"
                height="30"
                viewBox="0 0 83 30"
                xmlns="http://www.w3.org/2000/svg"
              />
            </div>

            {/* Item */}
            <div className="flex items-center justify-center py-2 col-span-2 md:col-auto col-start-2 col-end-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/fr/thumb/3/33/Logo_Club_africain.svg/810px-Logo_Club_africain.svg.png"
                className="max-w-full fill-current text-gray-400"
                width="83"
                height="30"
                viewBox="0 0 83 30"
                xmlns="http://www.w3.org/2000/svg"
              />
            </div>
          </div>

          {/* Testimonials */}
          <div className="max-w-3xl mx-auto mt-20" data-aos="zoom-y-out">
            <div className="relative flex items-start border-2 border-gray-200 rounded bg-white">
              {/* Testimonial */}
              <div className="text-center px-12 py-8 pt-20 mx-4 md:mx-0">
                <div className="absolute top-0 -mt-8 left-1/2 transform -translate-x-1/2">
                  <svg
                    className="absolute top-0 right-0 -mt-3 -mr-8 w-16 h-16 fill-current text-green-600"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M37.89 58.338c-2.648-5.63-3.572-10.045-2.774-13.249.8-3.203 8.711-13.383 23.737-30.538l2.135.532c-6.552 10.033-10.532 17.87-11.939 23.515-.583 2.34.22 6.158 2.41 11.457l-13.57 8.283zm-26.963-6.56c-2.648-5.63-3.572-10.046-2.773-13.25.799-3.203 8.71-13.382 23.736-30.538l2.136.533c-6.552 10.032-10.532 17.87-11.94 23.515-.583 2.339.22 6.158 2.41 11.456l-13.57 8.283z" />
                  </svg>
                  <img
                    className="relative rounded-full"
                    src="https://scontent.ftun14-1.fna.fbcdn.net/v/t1.15752-9/260661486_291736219628166_2022704157349701522_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BzTS97ZfL5MQ7kNvgGO9LRP&_nc_ht=scontent.ftun14-1.fna&oh=03_Q7cD1QGuzTK39mNNkMFiWjzPUpXQzYAi3FETarOcKo1L3p2vEg&oe=665249BE"
                    width={96}
                    height={96}
                    alt="Testimonial 01"
                  />
                </div>
                <blockquote className="text-xl font-medium mb-4">
                "LinkUpTournament is an exceptional football tournament management system! I'm genuinely impressed and would highly recommend it to anyone in the industry. Its user-friendly interface simplifies every aspect of tournament organization, from planning and registration to player management and result tracking. The customizable features are a game-changer, allowing organizers to tailor their tournaments precisely to their preferences. With LinkUpTournament, positive feedback is guaranteed!"
                </blockquote>
                <cite className="block font-bold text-lg not-italic mb-1">
                  Mondher Kebaier
                </cite>
                <div className="text-gray-600">
                  <span>CEO & Co-Founder</span>{" "}
                  <a className="text-green-600 hover:underline" href="#0">
                    @Dropbox
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
