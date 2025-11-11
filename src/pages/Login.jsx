import React, { useContext } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const {signInWithGoogle} = useContext(AuthContext);
  const navigate = useNavigate();


  const handleGoogleSignIn = () =>{
    signInWithGoogle()
    .then(result =>{
      console.log(result.user);
      toast.success('user logged in via google')
      navigate('/')
    })
    .catch(error=>{
      console.log(error)
    })
  }

    return (
        <div className="py-10 md:py-20 lg:py-40 flex justify-center items-center bg-base-100">
      <div className="bg-base-200 p-8 rounded-2xl shadow-[9px_9px_16px_#a3b1c6,-9px_-9px_16px_#ffffff] w-[400px] md:w-[500px]">
        <h2 className="text-center text-accent text-4xl font-bold mb-10">
          Login
        </h2>

        <form
        
        className="flex flex-col gap-1 relative">
          <label className="text-sm  mt-3 ml-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-3 py-2 rounded-xl bg-[#e0e5ec] shadow-inner shadow-[#a3b1c6]/70 outline-none"
          />

          <label className="text-sm  mt-3 ml-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-3 py-2 rounded-xl bg-[#e0e5ec] shadow-inner shadow-[#a3b1c6]/70 outline-none"
          />

          <div
            className="absolute right-4 top-[125px] text-xl cursor-pointer"
          >
            <FaEyeSlash></FaEyeSlash>
          </div>

          <Link to={'/auth/forget-pass'} className="text-center mt-4 text-gray-600 text-sm hover:underline hover:underline-offset-2">
            Forgot your password?
          </Link>

          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-xl bg-accent shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] font-bold hover:bg-green-500 transition text-xl text-white"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4 text-gray-600 text-sm">
          Dont have an account?{" "}
          <Link
            to={"/auth/signup"}
            className="text-yellow-400 font-semibold underline underline-offset-4"
          >
            Sign In
          </Link>
        </div>

        <div className="flex items-center px-15 my-4">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-4 text-gray-600">or</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>

        <button 
        onClick={handleGoogleSignIn}
        className="btn bg-white text-black border-[#e5e5e5] w-full py-6 text-lg rounded-xl">
          <svg
            aria-label="Google logo"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
    );
};

export default Login;