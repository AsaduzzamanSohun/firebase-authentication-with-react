import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const Register = () => {

    const {createUser} = useContext(AuthContext);

    const [signInError, setSignInError] = useState('');
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = e => {

        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        const confirmPassword = form.get('confirm-password');

        console.log(name, photo, email, password, confirmPassword);

        setSignInError('');
        setSuccess('')


        if (password.length < 8) {
            setSignInError("Password must have at least 8 characters")
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setSignInError("Password must be have an uppercase character.")
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setSignInError("Password must be have a lowercase character.")
            return;
        }
        else if (!/[0-9]/.test(password)) {
            setSignInError("Password must be have a number.")
            return;
        }
        else if (!/[!@#$%^&*]/.test(password)) {
            setSignInError("Password must be have a special character.")
            return;
        }
        else if (confirmPassword !== password) {
            setSignInError("Password doesn't match")
            return;
        }


        createUser(email, password)
            .then(res => {
                const newUser = res.user
                console.log(newUser);
                setSuccess('User successfully created')
            })
            .catch(error => {
                console.error(error);
                setSignInError(error.message)
            })

        

    }

    return (
        <div>
            <Navbar></Navbar>

            <div className="hero min-h-screen bg-base-200">

                <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                    <form onSubmit={handleSignIn} className="card-body">
                        <h1 className="text-center text-3xl font-bold my-4">Register!!</h1>

                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" placeholder="Enter Your Name" className="input input-bordered" required />
                        </div>

                        {/* Photo URL */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input name="photo" type="text" placeholder="Enter Your Photo URL" className="input input-bordered" required />
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="Enter Your Enter" className="input input-bordered" required />
                        </div>

                        {/* Password */}
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type={showPassword ? "text" : "password"} placeholder="Enter Your Password" className="input input-bordered" required />

                            <div onClick={() => setShowPassword(!showPassword)} className="absolute bottom-4 right-4">
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>

                                }
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input name="confirm-password" type={showPassword ? "text" : "password"} placeholder="Enter Your Confirm Password" className="input input-bordered" required />

                            <div onClick={() => setShowPassword(!showPassword)} className="absolute bottom-12 right-4">
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>

                                }
                            </div>

                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        {/* Button */}
                        <div className="form-control">
                            <p>Already have an account? Please <Link className="font-semibold text-blue-600" to="/login">Login</Link></p>
                        </div>
                        <div className="form-control">
                            {
                                <p className="text-red-600">{signInError}</p>
                            }
                        </div>
                        <div className="form-control">
                            {

                                <p className="text-green-600">{success}</p>
                            }
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-neutral">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;