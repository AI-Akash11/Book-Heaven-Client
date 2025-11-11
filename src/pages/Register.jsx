import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const [nameError, setNameError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const { signInWithGoogle, createUser, updateUser, setUser } = useContext(AuthContext);

  const [eye, setEye] = useState(true);
  const navigate = useNavigate();



  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;
    let hasError = false;

    const name = form.name.value;
    if(name.length < 3){
      setNameError("Name should be more the 3 charecter");
      hasError = true;
    } else{
      setNameError("");
    }

    const photo = form.photo.value;
    if (!/^https?:\/\/.+/.test(photo)) {
      setPhotoError(
        "Please enter a valid photo URL starting with http or https"
      );
      hasError = true;
    } else {
      setPhotoError("");
    }

    const email = form.email.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    } else {
      setEmailError("");
    }

    const password = form.password.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 chars long, include uppercase, lowercase, number, and special character"
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;


    console.log({name, email, photo, password})

    createUser(email, password)
    .then(result =>{
      console.log(result.user)
      const user = result.user;
      updateUser({displayName: name, photoURL: photo})
      .then(()=>{ 
        setUser({...user,displayName:name, photoURL: photo});
        navigate('/');
        toast.success("Account succesfully created")
      })
      .catch(error =>{
        console.log(error);
        setUser(user);
      })
    })
    .catch(err =>{
      console.log(err)
      toast.error(err.message)
    })
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate("/");
        toast.success("user logged in with google");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="py-10 md:py-20 lg:py-30 flex justify-center items-center bg-base-100">
      <div className="bg-base-200 p-8 rounded-2xl shadow-[9px_9px_16px_#a3b1c6,-9px_-9px_16px_#ffffff] w-[400px] md:w-[500px]">
        <h2 className="text-center text-4xl text-yellow-400 font-bold mb-10">
          Register
        </h2>

        <form onSubmit={handleSignIn} className="flex flex-col gap-1 relative">
          <label className="text-sm  mt-3 ml-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="px-3 py-2 rounded-xl bg-[#e0e5ec] shadow-inner shadow-[#a3b1c6]/70 outline-none"
          />
          {nameError && <p className="text-xs text-error">{nameError}</p>}

          <label className="text-sm  mt-3 ml-1">Photo URL</label>
          <input
            type="text"
            name="photo"
            placeholder="Enter a photo URL"
            className="px-3 py-2 rounded-xl bg-[#e0e5ec] shadow-inner shadow-[#a3b1c6]/70 outline-none"
          />
          {photoError && <p className="text-xs text-error">{photoError}</p>}

          <label className="text-sm  mt-3 ml-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-3 py-2 rounded-xl bg-[#e0e5ec] shadow-inner shadow-[#a3b1c6]/70 outline-none"
          />
          {emailError && <p className="text-xs text-error">{emailError}</p>}

          <label className="text-sm  mt-3 ml-1">Password</label>
          <input
            type={eye ? "password" : "text"}
            name="password"
            placeholder="Password"
            className="px-3 py-2 rounded-xl bg-[#e0e5ec] shadow-inner shadow-[#a3b1c6]/70 outline-none"
          />
          <div
            onClick={() => {
              setEye(!eye);
            }}
            className="absolute right-4 top-[287px] text-xl cursor-pointer"
          >
            {eye ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </div>
          {passwordError && (
            <p className="text-xs text-error">{passwordError}</p>
          )}

          <button
            type="submit"
            className="mt-5 w-full py-3 rounded-xl bg-yellow-300 shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] font-bold hover:bg-yellow-500 transition text-xl text-white"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-accent font-semibold underline underline-offset-4"
          >
            Login
          </Link>
        </div>

        <div className="flex items-center px-15 my-4">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-4 text-gray-600">or</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5] w-full py-6 text-lg rounded-xl"
        >
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

export default Register;
