import { CiYoutube } from "react-icons/ci";
import { FaTelegram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export const FooterPage = () => {
  return (
    <>
      <footer className="mt-5 p-5 bg-[rgba(8,41,89,1)]">
        <div className="md:flex justify-between">
          <div>
            <h1 className="font-bold text-2xl">BlogMaster</h1>
            <p className="max-w-[400px] text-gray-300">
              A modern blog platform featuring insightful articles on
              technology, design, and business. Join our community of readers
              and creators.
            </p>
            <article className="flex text-3xl gap-2 py-4">
              <CiYoutube className="hover:text-red-500 duration-300 rounded hover:text-4xl"/>
              <FaTelegram className="hover:text-sky-400 duration-300 rounded hover:text-4xl"/>
              <FaWhatsapp className="hover:text-green-500 duration-300 rounded hover:text-4xl"/>
              <FaTiktok className="hover:text-black duration-300 rounded hover:text-4xl"/>
            </article>
          </div>
          <div className="md:flex gap-25">
            <article className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Navigation</h1>
              <small className="text-gray-200 duration-300 hover:translate-x-1 hover:text-2xl">Home</small>
              <small className="text-gray-200 duration-300 hover:translate-x-1 hover:text-2xl">Blog</small>
              <small className="text-gray-200 duration-300 hover:translate-x-1 hover:text-2xl">About Us</small>
              <small className="text-gray-200 duration-300 hover:translate-x-1 hover:text-2xl">Contact</small>
            </article>
            <article className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Categories</h1>
              <small className="text-gray-200 duration-300 hover:translate-x-1 hover:text-2xl">Technology</small>
              <small className="text-gray-200 duration-300 hover:translate-x-1 hover:text-2xl">Design</small>
              <small className="text-gray-200 duration-300 hover:translate-x-1 hover:text-2xl">Business</small>
              <small className="text-gray-200 duration-300 hover:translate-x-1 hover:text-2xl">Marketing</small>
            </article>
            <article className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Legal</h1>
              <small className="text-gray-200 duration-300 hover:translate-x-1 hover:text-[17px]">Terms of Service</small>
              <small className="text-gray-200 duration-300 hover:translate-x-1 hover:text-[17px]">Privacy Policy</small>
              <small className="text-gray-200 duration-300 hover:translate-x-1 hover:text-[17px]">Cookie Policy</small>
            </article>
          </div>
        </div>
      </footer>
    </>
  );
};
