import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Features/auth/authSlice'
import { useLoginMutation } from '../../Features/auth/authApiSlice'

    
const Login = () => {
    const sectionStyle = {
        padding: '10em 0',
    };
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setpassword]= useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(()=> {
        userRef.current.focus()
    },[])

    useEffect(()=> {
        //We use the state we have for the user and the password and if either one of those changes
        //Then we will go ahead and set the error message back to empty because we might change one of those fields 
        //And hide the error message that is showed up
        setErrMsg('')
    },[email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const userData = await login({ email, password }).unwrap();
            // Use the user information to dispatch the setCredentials action
            dispatch(setCredentials({ ...userData, email }));
            setEmail('');
            setpassword('');
            navigate('/welcome');
        } catch (err) {
            if(!err?.originalStatus) {
                setErrMsg('No Server Response')
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Faild')
            }
            errRef.current.focus();
        }
    }

    //Handlers :
    const handleUserInput = (e) => setEmail(e.target.value)
    const handlepasswordInput = (e) => setpassword(e.target.value)

    const handlePasswordInput = (e) => setpassword(e.target.value);

    return (
    <div className="site-wrap">
        <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close">
            <span className="icon-close2 js-menu-toggle"></span>
            </div>
        </div>
        <div className="site-mobile-menu-body"></div>
        </div>

        <header className="site-navbar py-4" role="banner">
        <div className="container">
            <div className="d-flex align-items-center">
            <div className="site-logo">
                <a href="index.html">
                <img src="/public/assets/images/logo.png" alt="Logo" />
                </a>
            </div>
            <div className="ml-auto">
                <nav
                className="site-navigation position-relative text-right"
                role="navigation"
                >
                <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                    <li>
                    <a href="index.html" className="nav-link">
                        Home
                    </a>
                    </li>
                    <li>
                    <a href="matches.html" className="nav-link">
                        Matches
                    </a>
                    </li>
                    <li>
                    <a href="players.html" className="nav-link">
                        Players
                    </a>
                    </li>
                    <li>
                    <a href="blog.html" className="nav-link">
                        Blog
                    </a>
                    </li>
                    <li>
                        <Link to="/signup" className="nav-link">
                        SignUp
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="nav-link">
                        Login
                        </Link>
                    </li>
                </ul>
                </nav>

                <a
                href="#"
                className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"
                >
                <span className="icon-menu h3 text-white"></span>
                </a>
            </div>
            </div>
        </div>
        </header>
        <div className="site-section" style={sectionStyle}>
            {/* <div className="container">
                <div className="row">
                <div className="col-lg-12">
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        ref={userRef}
                        value={email}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={handlepasswordInput}
                        required
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="submit"
                        className="btn btn-primary py-3 px-5"
                        value="Sign In"
                        />
                    </div>
                    </form>
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                    {errMsg}
                    </p>
                </div>
                </div>
            </div> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">Sign In Form</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">Email</label>
                        <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        ref={userRef}
                        value={email}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                        />
                    </div>

                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">Password</label>
                        <input
                        type="password"
                        placeholder="Enter password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={password}
                        onChange={handlePasswordInput}
                        required
                        />
                    </div>

                    <div className="mt-5 mb-5.5 flex items-center justify-between">
                        <label htmlFor="formCheckbox" className="flex cursor-pointer">
                        <div className="relative pt-0.5">
                            <input type="checkbox" id="formCheckbox" className="taskCheckbox sr-only" />
                            <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                            <span className="text-white opacity-0">
                                <svg
                                className="fill-current"
                                width="10"
                                height="7"
                                viewBox="0 0 10 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                                    fill=""
                                />
                                </svg>
                            </span>
                            </div>
                        </div>
                        <p>Remember me</p>
                        </label>

                        <Link to="#" className="text-sm text-primary hover:underline">
                        Forget password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                        Sign In
                    </button>
                    </div>
                </form>
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                    {errMsg}
                </p>
                </div>
        </div>
        <footer className="footer-section">
        <div className="container">
            <div className="row">
            <div className="col-lg-3">
                <div className="widget mb-3">
                <h3>News</h3>
                <ul className="list-unstyled links">
                    <li>
                    <a href="#">All</a>
                    </li>
                    <li>
                    <a href="#">Club News</a>
                    </li>
                    <li>
                    <a href="#">Media Center</a>
                    </li>
                    <li>
                    <a href="#">Video</a>
                    </li>
                    <li>
                    <a href="#">RSS</a>
                    </li>
                </ul>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="widget mb-3">
                <h3>Tickets</h3>
                <ul className="list-unstyled links">
                    <li>
                    <a href="#">Online Ticket</a>
                    </li>
                    <li>
                    <a href="#">Payment and Prices</a>
                    </li>
                    <li>
                    <a href="#">Contact &amp; Booking</a>
                    </li>
                    <li>
                    <a href="#">Tickets</a>
                    </li>
                    <li>
                    <a href="#">Coupon</a>
                    </li>
                </ul>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="widget mb-3">
                <h3>Matches</h3>
                <ul className="list-unstyled links">
                    <li>
                    <a href="#">Standings</a>
                    </li>
                    <li>
                    <a href="#">Tournament</a>
                    </li>
                    <li>
                    <a href="#">La Lega</a>
                    </li>
                    <li>
                    <a href="#">Hyper Cup</a>
                    </li>
                    <li>
                    <a href="#">World League</a>
                    </li>
                </ul>
                </div>
            </div>

            <div className="col-lg-3">
                <div className="widget mb-3">
                <h3>Social</h3>
                <ul className="list-unstyled links">
                    <li>
                    <a href="#">Twitter</a>
                    </li>
                    <li>
                    <a href="#">Facebook</a>
                    </li>
                    <li>
                    <a href="#">Instagram</a>
                    </li>
                    <li>
                    <a href="#">Youtube</a>
                    </li>
                </ul>
                </div>
            </div>
            </div>

            <div className="row text-center">
            <div className="col-md-12">
                <div className=" pt-5">
                <p>
                    Copyright &copy;
                    <script>
                    document.write(new Date().getFullYear());
                    </script>{" "}
                    All rights reserved | This template is made with{" "}
                    <i className="icon-heart" aria-hidden="true"></i> by{" "}
                    <a href="https://colorlib.com" target="_blank">
                    Colorlib
                    </a>
                </p>
                </div>
            </div>
            </div>
        </div>
        </footer>
    </div>
    );
}

export default Login