'use client';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Loader2 } from 'lucide-react';
import './LoginForm.css';

const LoginForm = ({ onClose }) => {
    const {
        signInWithGoogle,
        signInWithEmail,
        registerWithEmail,
        isAdmin
    } = useAuth();

    const [isRegister, setIsRegister] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (isRegister && formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            const result = isRegister
                ? await registerWithEmail(formData.email, formData.password)
                : await signInWithEmail(formData.email, formData.password);

            if (!result.success) {
                setError(result.error);
            }
        } catch (err) {
            setError("An error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        setIsLoading(true);
        setError(null);
        try {
            let result;
            if (provider === 'google') result = await signInWithGoogle();
            else if (provider === 'github') result = await signInWithGithub();
            else if (provider === 'microsoft') result = await signInWithMicrosoft();

            if (result && !result.success) {
                setError(result.error);
            }
        } catch (err) {
            setError("Social login failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container relative animate-fade-in transition-all duration-300">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors"
                aria-label="Close"
            >
                <X size={20} />
            </button>

            <p className="title">{isRegister ? 'Sign Up' : 'Welcome Back'}</p>

            {error && isAdmin && (
                <p className="text-[10px] text-red-500 text-center mb-4 font-bold">{error}</p>
            )}

            <form className="form" onSubmit={handleEmailSubmit}>
                <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                    required
                    onChange={handleInputChange}
                    value={formData.email}
                />
                <input
                    type="password"
                    name="password"
                    className="input"
                    placeholder="Password"
                    required
                    onChange={handleInputChange}
                    value={formData.password}
                />
                {isRegister && (
                    <input
                        type="password"
                        name="confirmPassword"
                        className="input"
                        placeholder="Confirm Password"
                        required
                        onChange={handleInputChange}
                        value={formData.confirmPassword}
                    />
                )}

                {!isRegister && (
                    <p className="page-link">
                        <span className="page-link-label">Forgot Password?</span>
                    </p>
                )}

                <button className="form-btn" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin mx-auto" size={18} /> : (isRegister ? 'Sign Up' : 'Sign In')}
                </button>
            </form>

            <p className="sign-up-label text-center">
                {isRegister ? 'Already have an account?' : "Don't have an account?"}
                <span
                    className="sign-up-link"
                    onClick={() => {
                        setIsRegister(!isRegister);
                        setError(null);
                    }}
                >
                    {isRegister ? 'Sign In' : 'Sign Up'}
                </span>
            </p>

            <div className="buttons-container">
                <div className="google-login-button" onClick={() => handleSocialLogin('google')}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                            c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                            c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                            C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                            c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                            c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    <span>Continue with Google</span>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
