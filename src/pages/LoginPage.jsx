import { useState } from "react";
import { SubaPaseAuth } from "../lib/supabase";
import toast from "react-hot-toast";
import { Navigate, NavLink, useNavigate } from "react-router";
import { useAuth } from "../lib/BlogContext";
import { FooterPage } from "./FooterPage";



export const LoginPage = ()=>{
  const { isAuthentication ,themeDarkColor} = useAuth();
 const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate()

  const HandleLogin = (e)=>{
   e.preventDefault();
   LoginAuth(email,password)
  }

if(isAuthentication){
    return <Navigate to="/dashboard" />
}

 const LoginAuth = async(emailLog,passwordLog)=>{
    const {data,error} = await SubaPaseAuth.auth.signInWithPassword({
    email:emailLog,
    password:passwordLog
})

try {

if(data?.user){
    toast.success("Success Login!")
    setTimeout(()=>{
      navigate("/dashboard" ,{replace:true})
    },1000)
}
    
} catch (error) {
    console.log(error)
}

if(error?.message){
    if(error.message == "Email not confirmed"){
        toast.error("Email not confirm Please check you email and click link to confrim")
    }
    
}
}


    return(  <>
      <div className={`flex justify-center  h-screen mt-5 p-3`}>
        <form
          onSubmit={HandleLogin}
          className={`space-y-3 w-full shadow-2xl mb-auto  md:w-[55%] p-5 ${themeDarkColor.darkBg} rounded`}
        >
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-center">Welcome Back!</h1>
              <p className="font-semibold  text-center">login here to access you account dashborad</p>
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
            Login
          </button>
          <div className="flex justify-center gap-2">
            <p>You don't have account? click</p>
            <NavLink to="/register" className="text-orange-200 text-[18px] font-bold">Register</NavLink>
          </div>
        </form>
      </div>
       <footer className={`inset-x-0 absolute ${themeDarkColor.darkBg}`}>
              <FooterPage/>
            </footer>
    </>)
}



