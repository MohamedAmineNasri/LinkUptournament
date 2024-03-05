    import React, { Component, useState } from 'react'
    import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from '../../Features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '../../Features/auth/authApiSlice';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        accountImage: '',
        roles: 'Supporter',
    });

    const [signup, { isLoading }] = useSignupMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await signup(formData).unwrap();
            dispatch(setCredentials({ ...userData, email: formData.email }));
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                password: '',
                accountImage: '',
                roles: 'Supporter',
            });
            navigate('/login');
        } catch (err) {
            console.error('Signup failed:', err);
        }
    };

    const sectionStyle = {
        padding: '10em 0',
    };

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
                            <Link to="/contact" className="nav-link">
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
            
                <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <form onSubmit={handleSubmit}>
                        {/* Your form fields */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone Number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="file"
                                className="form-control"
                                placeholder="Account Image"
                                name="accountImage"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Roles:
                                <select
                                    className="form-control"
                                    name="roles"
                                    value={formData.roles}
                                    onChange={handleChange}
                                >
                                    <option value="Supporter">Supporter</option>
                                    <option value="Agent">Agent</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Player">Player</option>
                                    <option value="TournamentCoordinator">Tournament Coordinator</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btn btn-primary py-3 px-5"
                                value="Sign Up"
                                disabled={isLoading}
                            />
                        </div>
                    </form>
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
    

    export default SignUp 