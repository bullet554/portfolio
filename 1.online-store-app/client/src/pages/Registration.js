import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Subscribe from "../components/Subscribe/Subscribe";
import '../styles/pagesStyles/Registration.css';

const Registration = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валидация данных
        let validationErrors = {};

        if (!formData.firstName) {
            validationErrors.firstName = 'First name is required';
        }

        if (!formData.lastName) {
            validationErrors.lastName = 'Last name is required';
        }

        if (!formData.gender) {
            validationErrors.gender = 'Gender is required';
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Valid email is required';
        }

        if (!formData.password || formData.password.length < 8) {
            validationErrors.password = 'Password must be at least 8 characters';
        }

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Registration successful!');
                navigate('/');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <section className="breadcrumbs center">

                <div className="breadcrumbs__left">
                    <h1 className="breadcrumbs__left_title">REGISTRATION</h1>
                </div>

                <ul className="breadcrumbs__right"></ul>
            </section>

            <section className="regist center">

                <div className="regist-left">

                    <form onSubmit={handleSubmit} className="regist-left__form">

                        <h2 className="regist-left__title">Your Name</h2>

                        <input
                            className={`regist-left__input ${errors.firstName ? 'error' : ''}`}
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        {errors.firstName && <p className="error-message">{errors.firstName}</p>}

                        <input
                            className={`regist-left__input ${errors.firstName ? 'error' : ''}`}
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        {errors.lastName && <p className="error-message">{errors.lastName}</p>}

                        <div className="regist-left__gender-box">

                            <div className="regist-left__gender">
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === 'male'}
                                    onChange={handleInputChange}
                                />
                                <span></span>
                                <label htmlFor="male">Male</label>
                            </div>

                            <div className="regist-left__gender">
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === 'female'}
                                    onChange={handleInputChange}
                                />
                                <span></span>
                                <label htmlFor="female">Female</label>
                            </div>

                            <div className="regist-left__gender regist-left__gender_third-gender">
                                <input
                                    type="radio"
                                    id="other"
                                    name="gender"
                                    value="other"
                                    checked={formData.gender === 'other'}
                                    onChange={handleInputChange}
                                />
                                <span></span>
                                <label htmlFor="other">Other</label>
                            </div>
                        </div>

                        <h2 className="regist-left__title">Login details</h2>

                        <input
                            className={`regist-left__input ${errors.email ? 'error' : ''}`}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}

                        <input
                            className={`regist-left__input ${errors.password ? 'error' : ''}`}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}

                        <p className="regist-left__pass-info">Please use 8 or more characters, with at least 1 number and a
                            mixture of uppercase and lowercase letters</p>

                        <button
                            className="regist-left__button_style"
                            type="submit"
                        >
                            JOIN NOW
                            <svg className="regist-left__button_svg"
                                width="17" height="10" viewBox="0 0 17 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M11.54 0.208095C11.6058 0.142131 11.684 0.0897967 11.77 0.0540883C11.8561 0.01838 11.9483 0 12.0415 0C12.1347 0 12.2269 0.01838 12.313 0.0540883C12.399 0.0897967 12.4772 0.142131 12.543 0.208095L16.7929 4.458C16.8589 4.5238 16.9112 4.60196 16.9469 4.68802C16.9826 4.77407 17.001 4.86632 17.001 4.95949C17.001 5.05266 16.9826 5.14491 16.9469 5.23097C16.9112 5.31702 16.8589 5.39518 16.7929 5.46098L12.543 9.71089C12.41 9.84389 12.2296 9.91861 12.0415 9.91861C11.8534 9.91861 11.673 9.84389 11.54 9.71089C11.407 9.57788 11.3323 9.39749 11.3323 9.2094C11.3323 9.0213 11.407 8.84091 11.54 8.70791L15.2898 4.95949L11.54 1.21107C11.474 1.14528 11.4217 1.06711 11.386 0.981059C11.3503 0.895005 11.3319 0.802752 11.3319 0.709584C11.3319 0.616415 11.3503 0.524162 11.386 0.438109C11.4217 0.352055 11.474 0.273891 11.54 0.208095Z"
                                    fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M0 4.95948C0 4.77162 0.0746263 4.59146 0.207462 4.45862C0.340297 4.32579 0.52046 4.25116 0.708318 4.25116H15.583C15.7708 4.25116 15.951 4.32579 16.0838 4.45862C16.2167 4.59146 16.2913 4.77162 16.2913 4.95948C16.2913 5.14734 16.2167 5.3275 16.0838 5.46033C15.951 5.59317 15.7708 5.6678 15.583 5.6678H0.708318C0.52046 5.6678 0.340297 5.59317 0.207462 5.46033C0.0746263 5.3275 0 5.14734 0 4.95948Z"
                                    fill="white" />
                            </svg>
                        </button>
                    </form>
                </div>

                <div className="regist-right">
                    <h2 className="regist-right__title">LOYALTY HAS ITS PERKS</h2>
                    <p className="regist-right__info">Get in on the loyalty program where you can earn points and unlock
                        serious perks. Starting with these as soon as you join:</p>
                    <ul className="regist-right__list">
                        <li className="regist-right__list_item">15% off welcome offer</li>
                        <li className="regist-right__list_item">Free shipping, returns and exchanges on all orders</li>
                        <li className="regist-right__list_item">$10 off a purchase on your birthday</li>
                        <li className="regist-right__list_item">Early access to products</li>
                        <li className="regist-right__list_item">Exclusive offers & rewards</li>
                    </ul>
                </div>
            </section>

            <Subscribe />
        </div>
    );
}

export default Registration;