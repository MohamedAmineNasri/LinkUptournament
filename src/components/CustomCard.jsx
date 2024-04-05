import React, { useState } from "react";

const CustomCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div>
      <div class="relative flex flex-col text-black shadow-md bg-clip-border rounded-xl w-50 bg-gray-2 dark:bg-meta-4">
        <div class="relative mx-auto mt-4 overflow-hidden text-black dark:text-white bg-white shadow-lg bg-clip-border rounded-xl h-40 w-40">
          {/*<img
            src="/assets/images/confirm.jpg"
            alt="profile-picture"
            className="h-full object-cover"
  />*/}
          <img
            src="/assets/images/avatar_placeholder.jpg"
            alt="profile-picture"
            className="h-full object-cover"
          />
        </div>
        <div class="p-6 text-center">
          <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-black dark:text-white">
            Endrick
          </h4>
          <p class="block font-sans text-sm  antialiased font-bold leading-relaxed text-black dark:text-gray bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
            <span className=" uppercase">Field position:</span>{" "}
            <span className="text-primary ">MDF</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
