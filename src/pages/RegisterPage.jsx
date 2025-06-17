import { useState } from "react";
import { SubaPaseAuth } from "../lib/supabase";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../lib/BlogContext";
import { FooterPage } from "./FooterPage";



export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate()
  const { isAuthentication,themeDarkColor } = useAuth();
 
if(isAuthentication){
    return navigate("/dashboard")
}


  const HandleRegister = async (e) => {
    e.preventDefault();

    if (email.trim() == "") {
      toast.error("Email is required!", {
        position: "top-right",
        duration: 4000,
      });
      return;
    }
    if (password.trim() == "") {
      toast.error("Password is reuiered!");
      throw password;
    }

    if (password.length < 6) {
      toast.error("Password must be 6 number or characters!");
        
    }

    if (email && password) {
      SignUpAuth(email, password);
    }
  };

 const SignUpAuth = async (emailAuth, passwordAuth) => {
    const { data, error } = await SubaPaseAuth.auth.signUp({
      email: emailAuth,
      password: passwordAuth,
    });

   
    if (error?.message) {
      toast.error(error?.message);
    }

    if (data?.user) {
      toast.success("Succesfully Registered");
      setTimeout(()=>{
        navigate("/login")
      },1000)
    }
  };

  return (
    <>
      <div className={`flex items-center justify-center h-screen mt-5 p-3`}>
        <form
          onSubmit={HandleRegister}
          className={`space-y-3 w-full mt-20 shadow-2xl mb-auto  md:w-[55%] p-5  rounded`}
        >
          <div className="mb-5">
            <h1 className="text-2xl font-bold  text-center">
              Register Form
            </h1>
            <p className="font-semibold text-gray-300 text-center">
              Register here to access you account dashborad
            </p>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-bold text-gray-300" htmlFor="">
              Username
            </label>
            <input className="border p-2 rounded" type="text" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-bold text-gray-300" htmlFor="">
              Email Address
            </label>
            <input
              value={email}
              className="border p-2 rounded"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-bold text-gray-300" htmlFor="">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              className="border p-2 rounded"
              type="password"
            />
          </div>
          <button className="w-full bg-orange-500 p-2 rounded text-white font-bold text-[18px]">
            Register
          </button>
        </form>
      </div>
       <footer className={`inset-x-0 absolute ${themeDarkColor.darkBg}`}>
        <FooterPage/>
      </footer>
    </>
  );
};
