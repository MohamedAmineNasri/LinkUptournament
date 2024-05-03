
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb';
import AuthLayout from "../../Dashboard/src/layout/AuthLayout";
import { useState } from "react";
import { useSignupMutation } from "../../../Features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../Features/auth/authSlice";
import ImagePlaceholder from "/public/images/image-placeholder.jpg";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
const steps = [
  { label: "Step 1", fields: ["firstName", "lastName"] },
  { label: "Step 2", fields: ["email", "phoneNumber", "password"] },
  { label: "Step 3", fields: ["birthday", "bio", "roles", "accountImage"] },
];
import soccerteam from "../../assets/soccerteam.png";
import linkuptournamentlogo from "../../assets/linkuptournamentlogo.png";
import axios from "axios";

const roleOptions = [
  "Agent",
  "Manager",
  "TournamentCoordinator",
  "Supporter",
  "Recruiter",
];

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(ImagePlaceholder);
  const [img, setImg] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImg(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    accountImage: "",
    roles: "Supporter",
    birthday: "",
    bio: "",
  });

  const [signup, { isLoading }] = useSignupMutation();
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate length of firstName and lastName
    if (formData.firstName.length < 3 || formData.lastName.length < 3) {
      setErrMsg("First Name and Last Name must be at least 3 characters long.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrMsg("Please enter a valid email address.");
      return;
    }

    // Validate phone number format
    // Assuming a valid phone number consists of only digits and is of length 10
    const phoneRegex = /^\d{8}(\d{2})?$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      setErrMsg("Please enter a valid phone number.");
      return;
    }

    // Validate password length
    if (formData.password.length < 5) {
      setErrMsg("Password must be at least 5 characters long.");
      return;
    }

    try {
      if (imageUrl != ImagePlaceholder) {
        handleUpload(img);
      } else {
        const userData = await signup(formData).unwrap();
        dispatch(
          setCredentials({
            ...userData,
            email: formData.email,
          })
        );
      }
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        accountImage: "",
        roles: "Supporter",
        birthday: "",
        bio: "",
      });
      navigate("/signin");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  //save avatar
  const handleUpload = async (uploadedPhoto) => {
    try {
      const imageData = new FormData();

      imageData.append("avatar", uploadedPhoto);

      const response = await axios.post(
        "http://localhost:8000/upload/image",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      formData.accountImage = response.data.imageUrl;
      const userData = await signup(formData).unwrap();
      dispatch(
        setCredentials({
          ...userData,
          email: formData.email,
          accountImage: response.data.imageUrl,
        })
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      return;
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <AuthLayout>
      <Breadcrumb pageName="" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img
                  src={linkuptournamentlogo}
                  alt="Soccer Team"
                  width="350"
                  height="350"
                />
              </Link>
              <p className="2xl:px-20 text-black dark:text-white ">
                Simplify tournaments, focus on the game. Elevate your experience
                effortlessly!
              </p>

              <span className="inline-block">
                <img
                  src={soccerteam}
                  alt="Soccer Team"
                  width="350"
                  height="350"
                />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <Box sx={{ width: "100%" }} className="px-4 sm:px-12.5 xl:px-17.5">
              <form onSubmit={handleSubmit}>
                <div className="p-4">
                  <span className="mb-1.5 block font-medium text-black dark:text-white">
                    Start for free
                  </span>
                  <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                    Sign Up To LinkUptournament
                  </h2>
                  <Stepper
                    activeStep={activeStep}
                    className="mb-6 "
                    alternativeLabel
                  >
                    {steps.map(({ label }, index) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {errMsg && <p className="text-red-500">{errMsg}</p>}
                  {steps[activeStep].fields.map((field) => (
                    <div className="form-group" key={field}>
                      <label className="text-black dark:text-white">
                        {field}
                      </label>
                      {field === "roles" ? (
                        <select
                          className="form-control"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                        >
                          {roleOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field === "birthday" ? (
                        <input
                          type="date"
                          className="form-control"
                          placeholder={field}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                        />
                      ) : field === "accountImage" ? (
                        <div className="mb-4">
                          <input
                            type="file"
                            className="mb-4 rounded-lg text-white font-light text-sm"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <figure className="will-change-auto">
                            <img
                              className="h-70 mx-auto max-w-full rounded-lg"
                              src={imageUrl}
                              alt="image description"
                            />
                            <figcaption className="mt-2 text-sm font-semibold text-center text-gray-500 dark:text-gray-400">
                              PLAYER AVATAR
                            </figcaption>
                          </figure>
                        </div>
                      ) : (
                        <input
                          type={field === "password" ? "password" : "text"}
                          className="form-control"
                          placeholder={field}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                        />
                      )}
                    </div>
                  ))}
                  <div className="form-group flex justify-between">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#2B9451" }}
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#2B9451" }}
                      onClick={handleNext}
                      disabled={activeStep === steps.length - 1}
                    >
                      Next
                    </Button>
                    {activeStep === steps.length - 1 && (
                      <Button
                        type="submit"
                        variant="contained"
                        style={{ backgroundColor: "#2B9451" }}
                        disabled={isLoading}
                      >
                        Create account
                      </Button>
                    )}
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-black dark:text-white">
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="text-primary text-black dark:text-white dark:text-white"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </Box>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
