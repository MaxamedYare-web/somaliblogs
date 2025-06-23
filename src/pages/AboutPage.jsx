import { useAuth } from "../lib/BlogContext"
import { FooterPage } from "./FooterPage"
import about_bg from "../assets/about_bg_two.jpg"
import header_image from "../assets/header_img.avif"
import html_image from "../assets/html.png"
import css_image from "../assets/css logo.png"
import github_image from "../assets/github.png"
import js_image from "../assets/jslogo.png"
import reactjs_image from "../assets/reactjs.png"
export const AboutPage = ()=>{
const {themeDarkColor} = useAuth()
    return (<>
    
  <div className="absolute inset-0 -z-1 mt-10">
     <section className={`h-50  bg-no-repeat flex justify-center items-center bg-cover bg-position-[center]`} style={{backgroundImage:`linear-gradient(90deg, rgba(8,41,89,0.8) 0%, rgba(8,41,89,0.9) 35%, rgba(8,41,89,0.9) 100%),url(${about_bg})`}}>
      <h1 className="font-bold text-2xl">Aboute Us</h1>
    </section>

<div className={`${themeDarkColor.darkBg}`}>
 
<div className="p-5 sm:flex flex-col sm:justify-center items-center">
  <div className="flex flex-col justify-center">
    <h1 className="text-center font-bold text-2xl ">About our web blog</h1>
    <p className="text-center text-gray-300">here you can read somthings about our website</p>
  </div>
  <div className={`lg:flex mt-5 ${themeDarkColor.box} sm:w-[80%]  items-center gap-3 rounded`}>
    <img className="rounded sm:h-[300px] sm:w-[100%] md:w-full lg:w-[80%]" src={`${header_image}`} alt="" />
   <div>
     <p className="max-w-[700px] mt-3 p-3">This is my first webstite i biuld by using reactjs and tailwindcss this website is blog website by create you own posts
      i am student who learning web devlopment now i am frontend devlopment I never went to university
      2020 i have started web devlopment but 
Unfortunately i confused even i can't to leanring javascript but now i learned more like html css javascript git github and reactjs when i jioned @Dugsiiye 
fisrt
thanks Allah also thanks dugsiiye team and McHamuuda
     </p>
     <div className="flex p-2">
      <img className="h-[50px] w-[50px]" src={html_image} alt="" />
      <img className="h-[50px] w-[50px]" src={css_image} alt="" />
      <img className="h-[50px] w-[50px]" src={github_image} alt="" />
      <img className="h-[50px] w-[50px]" src={js_image} alt="" />
      <img className="h-[50px] w-[50px]" src={reactjs_image} alt="" />
     </div>
   </div>
  </div>
</div>

</div>

      <footer className={`inset-x-0 absolute ${themeDarkColor.darkBg}`}>
            <FooterPage/>
          </footer>
   </div>
    </>)
}

