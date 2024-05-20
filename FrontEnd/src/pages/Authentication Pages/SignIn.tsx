import React from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../../Dashboard/src/images/logo/logo-dark.svg';
import Logo from '../../Dashboard/src/images/logo/logo.svg';
import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb';
import AuthLayout from '../../Dashboard/src/layout/AuthLayout';

import { useRef, useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../Features/auth/authSlice'
import { useLoginMutation } from '../../../Features/auth/authApiSlice'
import ReCAPTCHA from "react-google-recaptcha";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { GoogleLogin } from "@react-oauth/google";
import  YouthFootballsigin  from "../../assets/YouthFootballsigin.png";
import  linkuptournamentlogo  from "../../assets/linkuptournamentlogo.png";

const SignIn: React.FC = () => {

  const onChange = (response) => {
    setIsCaptchaCompleted(true);
  };
  

  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!email.trim() || !password.trim()) {
        setErrMsg('Email and password are required.');
        return;
    }

    // Validate captcha completion
    if (!isCaptchaCompleted) {
        setErrMsg('Please complete the captcha.');
        return;
    }

    try {
        const userData = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...userData, email }));
        setEmail('');
        setPassword('');
        navigate('/Profile');
    } catch (err) {
      if (err.originalStatus === 400) {
            setErrMsg('Incorrect email or password');
        } else if (err.originalStatus === 401) {
            setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login failed. Please check your email and password and try again.');
        }
        
        if (errRef.current) {
            errRef.current.focus();
        }
    }
};

  

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const [isCaptchaCompleted, setIsCaptchaCompleted] = useState(false);
  
  return (
    <AuthLayout>
      <Breadcrumb pageName="" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center text-black dark:text-white">
              <Link className="mb-5.5 inline-block" to="/">
                {/* <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" /> */}
                <img
                        src={linkuptournamentlogo}
                        alt="Soccer Team"
                        width="350"
                        height="350"
                    />
              </Link>

              <p className="2xl:px-20">
              Simplify tournaments, focus on the game. Elevate your experience effortlessly!
              </p>

              <span className="inline-block">
                    <img
                        src={YouthFootballsigin}
                        alt="Soccer Team"
                        width="350"
                        height="350"
                    />
                </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
      <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
        <span className="mb-1.5 block font-medium text-black dark:text-white">Start your tournament for free</span>
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Sign In To LinkUptournament
        </h2>

        <form onSubmit={handleSubmit}>
          {errMsg && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">{errMsg}</Alert>
            </Stack>
          )}
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ref={userRef}
                value={email}
                onChange={handleUserInput}
                autoComplete="off"
                required
              />
              <span className="absolute right-4 top-4">
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                      fill=""
                    />
                  </g>
                </svg>
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={password}
                onChange={handlePasswordInput}
                required
              />
              <span className="absolute right-4 top-4">
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                      fill=""
                    />
                    <path
                      d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                      fill=""
                    />
                  </g>
                </svg>
              </span>
            </div>
          </div>

          <div className="mb-5">
            <input
              type="submit"
              value="Sign In"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            />
          </div>

          <ReCAPTCHA
            sitekey="6LfPoeIpAAAAAMlNXi1eOIeVRjNP1x8c16c3nTiz"
            onChange={onChange}
          />

          <div className="mt-6 text-center">
            <p className='text-black dark:text-white'>
              Don’t have any account?{' '}
              <Link to="/register" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
