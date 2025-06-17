import { useEffect, useState } from "react";
import { useAuth } from "../lib/BlogContext";
import { SubaPaseAuth } from "../lib/supabase";
import { NavLink } from "react-router";
import { FooterPage } from "./FooterPage";
import userProfile from "../assets/profile-user.png"

export const ShowAllBlogs = () => {
  const { allBlogsHome, setAllBlogsHome, themeDarkColor } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [searchBlog, setSearchBlog] = useState([]);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    const { data } = await SubaPaseAuth.from("blog_content").select("*");
    setAllBlogsHome(data);
    setSearchBlog(data)
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setAllBlogsHome(searchBlog.filter((bf) =>bf.blog_title.toLowerCase().includes(inputValue.toLowerCase().trim())))
 
  };

  return (
    <>
      <div>
        <form className="w-full">
          <input
            value={inputValue}
            onChange={handleChange}
            className="border-2 w-full py-2 pl-2 focus:outline-orange-300 rounded mt-5"
            type="text"
            placeholder="Searching..."
          />
        </form>
      </div>
      <section className={`absolute px-5 ${themeDarkColor.darkBg} inset-x-0`}>
        <div className="mt-5 grid gap-3 sm:grid-cols-1  w-full md:grid-cols-2 lg:grid-cols-3">
          {!allBlogsHome ? (
            <div className="flex justify-center col-span-3">
              <p
                className="animate-spin duration-5000 border-t-4 border-t-rose-700 border-l-orange-300
             p-5  border-b-3 border-r-6 border-l-6 rounded-full border-r-sky-400  h-12 w-12"
              ></p>
            </div>
          ) : (
           allBlogsHome?.length === 0 ? (<>
           <div className="flex justify-center col-span-3">
            <h1 className="text-orange-300 font-bold">{inputValue}: </h1> <p>Not found you searching is not contains our blog</p>
           </div>
           </>): ( allBlogsHome?.map((blogsS) => (
              <div
                key={blogsS.id}
                className={`w-[100%] duration-300 hover:-translate-y-2 p-3 ${themeDarkColor.box} shadow-lg hover:shadow-2xl`}
              >
                <img
                  src={blogsS.blog_image}
                  className={`w-full h-[300px] duration-500 hover:scale-101 rounded`}
                  alt=""
                />
                <h1 className="mt-3 text-2xl font-bold">{blogsS.blog_title}</h1>
                <p className="mt-2 max-w-[400px]">
                  {blogsS?.content?.length > 170 ? (
                    <>
                      {blogsS?.content?.substring(0, 170)}{" "}
                      <NavLink
                        to={`/VeiwSingleBlog/${blogsS.id}`}
                        className="text-orange-300"
                      >
                        Reading more...
                      </NavLink>
                    </>
                  ) : (
                    blogsS?.content?.substring(0, 170)
                  )}
                </p>
                <hr className="p-2 mt-2" />
                {/* user writer */}
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={blogsS.user_image ? blogsS.user_image : userProfile }
                      className={`w-[70px] h-[70px] ${!blogsS.user_image && "bg-white"} rounded-full`}
                      alt=""
                    />
                    <p>{blogsS.user_name}</p>
                  </div>
                  <div>
                    <article className="flex items-center gap-2">
                      <h1>{blogsS.user_ipadress.location.country_name}</h1>
                      <img
                        src={blogsS.user_ipadress.location.country_flag}
                        className="w-[20px] h-[20px]"
                        alt=""
                      />
                    </article>
                    <div className="flex gap-2">
                      <strong className="flex wrap-break-word text-orange-200">
                        City:
                      </strong>
                      <p className="max-w-[150px]">
                        {" "}
                        {blogsS.user_ipadress.location.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )))
          )}
        </div>

        <footer className={`inset-x-0 absolute ${themeDarkColor.darkBg}`}>
          <FooterPage />
        </footer>
      </section>
    </>
  );
};
