import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";



const Login = () => {


    const { user, signIn, signInGoogle, signInGithub, logOut } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()


    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        e.target.reset();

        console.log(email, password);

        signIn(email, password)
            .then(res => {
                console.log(res.user);
                navigate(location?.state ? location.state : "/")
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleGoogleLogin = () => {

        const googleProvider = new GoogleAuthProvider();
        signInGoogle(googleProvider)
            .then(() => {
                navigate(location?.state ? location.state : "/")
            })
            .catch()
    }

    const handleGitHubLogin = () => {

        const githubProvider = new GithubAuthProvider();

        signInGithub(githubProvider)
            .then(() => {
                navigate(location?.state ? location.state : "/")
            })
            .catch()
    }

    const handleSignOut = () => {
        logOut()
            .then(() => {
                console.log("User sign out");
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="hero min-h-screen bg-base-200">

                <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-center text-3xl font-bold my-4">Login!!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="Enter Your Enter" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="Enter Your Password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <p>Are you new here? Please <Link className="font-semibold text-blue-600" to="/register">Register</Link></p>
                        </div>
                        <div className="form-control">

                            {
                                user ?
                                    <div className="form-control mt-6">
                                        <button onClick={handleSignOut} className="btn btn-neutral">Logout</button>
                                    </div>
                                    :
                                    <button className="btn btn-neutral  mt-6">Login</button>
                            }


                        </div>

                        {
                            user ? <>
                            </>
                                :
                                <div className="grid grid-cols-2 space-x-4">
                                    <button onClick={handleGoogleLogin} className="btn btn-neutral"><FaGoogle /> Google</button>
                                    <button onClick={handleGitHubLogin} className="btn btn-neutral w-auto"><FaGithub /> Github</button>
                                </div>
                        }

                    </form>


                </div>
            </div>
        </div>

    );
};

export default Login;