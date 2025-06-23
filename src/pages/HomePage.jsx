import { useEffect, useState } from "react";
import imageOne from "../assets/image_1.avif";
import image2 from "../assets/image_2.avif";
import image3 from "../assets/image_3.avif";
import image4 from "../assets/image_4.avif";
import image5 from "../assets/image_5.avif";
import { useAuth } from "../lib/BlogContext";
import { NavLink } from "react-router";
import { GrBlog } from "react-icons/gr";
import { IoNewspaperOutline } from "react-icons/io5";
import { FooterPage } from "./FooterPage";
import { SubaPaseAuth } from "../lib/supabase";
import userProfile from "../assets/profile-user.png";
import { IoIosStar } from "react-icons/io";
export const HomePage = () => {
  const imageArray = [imageOne, image2, image3, image4, image5];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [latestReviews, setLatestReviews] = useState(null);
  const {
    themeDarkColor,
    isAuthentication,
    sixBlogsHome,
    setSixBlogsHome,
    lastestPosts,
    setLatestPosts,
  } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setNextIndex((currentIndex + 1) % imageArray.length);

      setTimeout(() => {
        setCurrentIndex(nextIndex);
      }, 1000); // Transition duration
    }, 5000); // Change every 5 seconds
    getBlogsAll();
    return () => clearInterval(timer);
  }, [currentIndex, nextIndex, imageArray.length]);

  const getBlogsAll = async () => {
    const { data } = await SubaPaseAuth.from("blog_content")
      .select("*")
      .limit(9);
    setSixBlogsHome(data);
    const { data: latestData } = await SubaPaseAuth.from("blog_content")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);
    setLatestPosts(latestData);
    const { data: userReviews } = await SubaPaseAuth.from(
      "user_reviews"
    ).select("*");
    // console.log(userReviews)
    setLatestReviews(userReviews);
  };

  return (
    <>
      <section
        className={`h-screen bg-no-repeat bg-cover bg-center absolute inset-x-0`}
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(8,41,89,0.8) 0%, rgba(8,41,89,0.9) 35%, rgba(8,41,89,0.9) 100%), url(${imageArray[currentIndex]})`,
          opacity: nextIndex !== currentIndex ? 1 : 1,
        }}
      >
        <div className="flex justify-center items-center h-screen">
          <div className="px-5 flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl font-bold capitalize text-center">
              Welcome our web blogs
            </h1>
            <p className="mt-4 text-center text-[18px] max-w-[500px]">
              Here you can upload you own posts and make account by u self enjoy
              our web blogs
            </p>
            {isAuthentication ? (
              <NavLink
                to="/dashboard"
                className={`mt-5 ${themeDarkColor.darkBg} hover:opacity-70 duration-300 shadow-lg border font-semibold p-1 px-3 text-2xl rounded bg-`}
              >
                Go Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/register"
                className={`mt-5 ${themeDarkColor.darkBg} hover:opacity-70 duration-300 shadow-lg border font-semibold p-1 px-3 text-2xl rounded bg-`}
              >
                Get Start
              </NavLink>
            )}
          </div>
        </div>
        {/* feature posts */}
        <div className={`text-gray-700 ${themeDarkColor.darkBg} p-10 sm:px-15`}>
          <article className="flex justify-center">
            <h1 className="text-3xl text-center font-semibold ">
              Feature Posts{" "}
            </h1>
            <GrBlog />
          </article>
          <div className="mt-5 grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {!sixBlogsHome ? (
              <div className="flex justify-center col-span-3">
                <p
                  className="animate-spin duration-5000 border-t-4 border-t-rose-700 border-l-orange-300
             p-5  border-b-3 border-r-6 border-l-6 rounded-full border-r-sky-400  h-12 w-12"
                ></p>
              </div>
            ) : (
              sixBlogsHome?.map((blogsS) => (
                <div
                  key={blogsS.id}
                  className={`w-[100%] duration-300 hover:-translate-y-2 p-3 ${themeDarkColor.box} shadow-lg hover:shadow-2xl`}
                >
                  <img
                    src={blogsS?.blog_image}
                    className="w-full h-[300px] duration-500 hover:scale-101 rounded"
                    alt=""
                  />
                  <h1 className="mt-3 text-2xl font-bold">
                    {blogsS.blog_title}
                  </h1>
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
                        src={blogsS.user_image}
                        className="w-[70px] h-[70px] rounded-full"
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
              ))
            )}

            <div className="p-4 relative flex justify-center items-center lg:col-span-3">
              <div className="absolute w-[200px] top-6 lg:top-7 h-[50px] p-3 border-4 shadow-lg border-blue-500 rounded-lg animate-pulse"></div>
              <NavLink
                to="/all-blogs"
                className="text-center relative z-10 font-bold text-orange-300 sm:text-2xl mt-5 w-full"
              >
                View All Blogs
              </NavLink>
            </div>
          </div>
        </div>
        {/* la test review */}
        <div
          className={`${themeDarkColor.darkBg} flex flex-col justify-center items-center p-2`}
        >
          <article>
            <p className="text-center">Latest Reviews</p>
            <h1 className="text-2xl sm:text-4xl font-bold">
              What Our Customers Says
            </h1>
          </article>
          <div className="relative w-full overflow-hidden mt-5">
            <section className="flex pb-4 mt-5 mask-linear">
              {/* First set of reviews (original) */}
              <div className="flex  gap-4 animate-[scroll_70s_linear_infinite]">
                {latestReviews?.map((LR, index) => (
                  <div
                    key={`original-${index}`}
                    className={`${themeDarkColor.box} p-3 hover:shadow-lg w-[600px] `}
                  >
                    {/* Your review content */}
                    <div className="flex items-center gap-3">
                      <img
                        className="w-[100px] h-[100px] rounded-full"
                        src={LR.user_profile ? LR.user_profile : userProfile}
                        alt=""
                      />
                      <h1 className="first-letter:uppercase">{LR.username}</h1>
                    </div>
                    <p className="max-w-[500px]">{LR.user_content}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <p className="text-orange-200 font-bold">Rates:</p>
                      <div className="flex">
                        {LR.user_rate.map((rat,index) => (
                          <strong key={index} className="text-orange-500">
                            <IoIosStar />
                          </strong>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="relative w-full overflow-hidden ">
            <section className="flex pb-4 mt-5 mask-linearTwo">
              {/* First set of reviews (original) */}
              <div className="flex  gap-4 animate-[scrollTwo_80s_linear_infinite]">
                {latestReviews?.map((LR, index) => (
                  <div
                    key={`original-${index}`}
                    className={`${themeDarkColor.box} p-3 hover:shadow-lg w-[600px] `}
                  >
                    {/* Your review content */}
                    <div className="flex items-center gap-3">
                      <img
                        className="w-[100px] h-[100px] rounded-full"
                        src={LR.user_profile ? LR.user_profile : userProfile}
                        alt=""
                      />
                      <h1 className="first-letter:uppercase">{LR.username}</h1>
                    </div>
                    <p className="max-w-[500px]">{LR.user_content}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <p className="text-orange-200 font-bold">Rates:</p>
                      <div className="flex">
                        {LR.user_rate.map((rat) => (
                          <strong className="text-orange-500">
                            <IoIosStar />
                          </strong>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        {/* latest blogs */}
        <div className={`px-10 py-3 ${themeDarkColor.darkBg} sm:px-15`}>
          <article className="flex items-center justify-center space-x-2">
            <h1 className="font-semibold text-2xl">News Latest Posts</h1>
            <IoNewspaperOutline />
          </article>
          <div className="grid grid-cols-1 mt-5 gap-3">
            {lastestPosts?.map((post) => (
              <div
                key={post.id}
                className={`w-[100%] sm:grid items-center justify-center sm:gap-5 sm:grid-cols-1 md:grid-cols-2 ${themeDarkColor.box} duration-300 hover:-translate-y-2 p-3 rounded hover:shadow-lg`}
              >
                <img
                  src={post.blog_image}
                  className="w-[450px] lg:w-[650px] h-[300px]  duration-500 hover:scale-101 rounded"
                  alt=""
                />
                <div>
                  <p className="mt-2">
                    {post?.content?.length > 500 ? (
                      <>
                        {post?.content?.substring(0, 500)}{" "}
                        <NavLink
                          to={`/latestposts/${post.id}`}
                          className="text-orange-300 text-[18px] font-bold"
                        >
                          Reading more...
                        </NavLink>
                      </>
                    ) : (
                      post?.content?.substring(0, 500)
                    )}
                  </p>
                  <hr className="p-2 mt-3" />
                  {/* user writer */}
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.user_image ? post.user_image : userProfile}
                        className={`w-[70px] ${
                          !post.user_image && "bg-white"
                        } h-[70px] rounded-full`}
                        alt=""
                      />
                      <p>{post.user_name}</p>
                    </div>
                    <div>
                      <article className="flex items-center gap-2">
                        <h1>{post.user_ipadress.location.country_name}</h1>
                        <img
                          src={post.user_ipadress.location.country_flag}
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
                          {post.user_ipadress.location.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* latest reviews */}
        </div>
        <footer className={`inset-x-0 absolute ${themeDarkColor.darkBg}`}>
          <FooterPage />
        </footer>
      </section>
    </>
  );
};
