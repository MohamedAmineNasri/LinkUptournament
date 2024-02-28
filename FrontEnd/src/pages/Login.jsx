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
        //We will receive the event and inside of that 
        //We prevent Default because it's a form which could cause a reload otherwise 
        e.preventDefault()

        try {
            //Inside the try block we're going to submit to the api
            const userData = await login({ email, password }).unwrap()
            //We're saving the username and we will get the access token 
            dispatch(setCredentials({...userData, email}))
            setEmail('')
            setpassword('')
            navigate('/welcome')
        } catch(err) {
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

        {/* <div className="site-section" style={sectionStyle}>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <form action="#">
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="submit"
                        className="btn btn-primary py-3 px-5"
                        value="Send Message"
                        />
                    </div>
                    </form>
                </div>
            </div>
        </div>
        </div> */}
        <div className="site-section" style={sectionStyle}>
            <div className="container">
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