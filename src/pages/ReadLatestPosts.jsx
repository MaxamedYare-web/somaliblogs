import { useParams } from "react-router";
import { useAuth } from "../lib/BlogContext";
import { FooterPage } from "./FooterPage";
import userProfile from "../assets/profile-user.png"
export const ReadLatestPosts = () => {
  const { lastestPosts, themeDarkColor } = useAuth();
  const { postid } = useParams();

  const filterLastestPosts = lastestPosts?.filter((blog) => blog.id === postid);


  return (
    <>
      <div className="flex justify-center p-10">
        {filterLastestPosts?.map((blogsS) => (
          <div
            key={blogsS.id}
            className={`md:w-[100%] lg:w-[50%] duration-300 hover:-translate-y-2 p-3 ${themeDarkColor.box} shadow-lg hover:shadow-2xl`}
          >
            <img
              src={blogsS?.blog_image}
              className="w-full h-[300px] duration-500 hover:scale-101 rounded"
              alt=""
            />
            <h1 className="mt-3 text-2xl font-bold">{blogsS.blog_title}</h1>
            <p className="mt-2 max-w-[400px]">{blogsS?.content}</p>
            <hr className="p-2 mt-2"/>
              {/* user writer */}
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <img src={blogsS.user_image ? blogsS.user_image : userProfile} className={`w-[70px] ${!blogsS.user_image && "bg-white"} h-[70px] rounded-full`} alt="" />
                  <p>{blogsS.user_name}</p>
                </div>
                <div>
                  <article className="flex items-center gap-2">
                    <h1>{blogsS.user_ipadress.location.country_name}</h1>
                  <img src={blogsS.user_ipadress.location.country_flag} className="w-[20px] h-[20px]" alt="" />
                  </article>
                  <div className="flex gap-2"><strong className="flex wrap-break-word text-orange-200">City:</strong><p className="max-w-[150px]"> {blogsS.user_ipadress.location.city}</p></div>
                </div>
              </div>
          </div>
        ))}
      </div>
      <footer className={`inset-x-0 absolute ${themeDarkColor.darkBg}`}>
                <FooterPage />
              </footer>
    </>
  );
};
