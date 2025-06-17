import { Link, NavLink } from "react-router";
import { useAuth } from "../lib/BlogContext";
import { FaPenToSquare } from "react-icons/fa6";
import { AiOutlineFundView } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import Chart from "react-apexcharts";
import { SubaPaseAuth } from "../lib/supabase";
import { useState } from "react";
import { BiLoader } from "react-icons/bi";

export const Dashboard = () => {
  const { user, setUserInformation, userInformation,themeDarkColor } = useAuth();
  const [userLimited, setUserLimited] = useState();
  const [isLoadind,setIsloadin] = useState(true)

  var options = {
    series: [
      {
        name: "Website Blog",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      },
      {
        name: "Social Media",
        type: "line",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ],
    chart: {
      height: 350,
      color: "red",
      type: "line",
    },
    stroke: {
      width: [0, 4],
      background: "red",
    },
    title: {
      text: "Traffic Sources",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "01 Jan 2025",
      "02 Jan 2025",
      "03 Jan 2025",
      "04 Jan 2025",
      "05 Jan 2025",
      "06 Jan 2025",
      "07 Jan 2025",
      "08 Jan 2025",
      "09 Jan 2025",
      "10 Jan 2025",
      "11 Jan 2025",
      "12 Jan 2025",
    ],
    yaxis: [
      {
        title: {
          text: "Website Blog",
        },
      },
      {
        opposite: true,
        title: {
          text: "Social Media",
        },
      },
    ],
  };

  const readUserData = async () => {
    const { data, error } = await SubaPaseAuth.from("blog_content")
      .select("*")
      .eq("auther_id", user.id);

    const { data: userLData, error: userEroor } = await SubaPaseAuth.from(
      "blog_content"
    )
      .select("*")
      .eq("auther_id", user.id)
      .limit(3).order("created_at",{ascending:false});

    if (data) {
      setUserInformation(data);
    }
    if (userLData) {
      setUserLimited(userLData);
      setIsloadin(false)
    }
  };
  readUserData();

  const isData = new Date(user?.last_sign_in_at);
  const dataForm = isData.toLocaleDateString("en-Us", {
    day: "numeric",
    month: "short",
    weekday: "short",
    year: "numeric",
  });

  const creatDay = new Date(user?.created_at);
  const joined = creatDay.toLocaleDateString("en-Us", {
    dateStyle: "full",
  });




  if (!user) {
    return (
      <>
        <div className="flex flex-col justify-center items-center inset-y-0 inset-x-0 absolute w-screen h-screen bg-gradient-to-b from-rose-600 to-orange-900">
          <div class="loader"></div>
          <h1 className="text-2xl text-white mt-2 font-bold">
            Welcome Blog Web by
          </h1>
          <p className="text-white font-bold">Mucawiye</p>
        </div>
      </>
    );
  }

  return (
    <div className={`h-screen ${themeDarkColor.darkBg} p-2`}>
      <section className={`mt-8 text-[18px] shadow-2xl ${themeDarkColor.darkBg}  rounded font-bold`}>
        <div className="flex justify-between  py-5 px-2 sm:px-3">
          <h1>Dashboard</h1>
          <Link
            className="bg-orange-500 text-white px-3 py-1 rounded"
            to="/create_blog"
          >
            Add Blog
          </Link>
        </div>
        <section className="mt-3 pb-3">
          <div className="flex justify-between space-x-2 p-2">
            <div className={`flex items-center w-full py-5 ${themeDarkColor.box}  justify-between rounded p-3`}>
              <article >
                <h1 className="font-medium">Blogs</h1>
                <p className="text-rose-400 text-[18px]">
                  {userInformation?.length}
                </p>
              </article>
              <FaPenToSquare className="text-3xl text-rose-300 sm:text-4xl" />
            </div>
            <NavLink
              to="/VeiwsYrAllBlogs"
              className={`flex items-center w-full ${themeDarkColor.box} justify-between rounded  p-3`}
            >
              <article>
                <h1 className="font-medium">All Blogs</h1>
                <p className="text-rose-400 text-[15px]">Views</p>
              </article>
              <AiOutlineFundView className="text-3xl text-rose-300 sm:text-4xl" />
            </NavLink>
            <div className={`flex items-center ${themeDarkColor.box} w-full justify-between p-3`}>
              <article>
                <h1 className="font-bold">last login</h1>
                <p className="text-rose-400 font-bold text-[15px]">{dataForm}</p>
              </article>
              <FaHistory className="text-3xl  text-white sm:text-4xl" />
            </div>
          </div>

          <div className="mt-7 px-2 grid-cols-1 sm:space-x-3 text-[16px] grid sm:grid-cols-3 ">
            <div className= {` sm:col-span-2 sm:${themeDarkColor.box} rounded`}>
              <Chart 
                options={options}
                series={options.series}
                type="bar"
                width="500"
              />
            </div>

            {/* latest blogs */}
            <div className="">
              <h1 className={`${themeDarkColor.box} w-full text-center mt-3 sm:mt-0 p-4 rounded-2xl`}>
                Latest your blogs
              </h1>
              {
                isLoadind ? (<div className="flex justify-center h-[100px] items-center">
                    <div className="animate-spin duration-1000 h-12 w-12"><BiLoader className="w-full h-full" /></div>
                </div>) : (<div className="space-y-3 mt-3  flex flex-col">
                {userLimited?.map((blog) => (
                  <NavLink key={blog.id}>
                    <h1 className="">{blog.blog_title}</h1>
                    <p className="text-sky-200 text-[15px]">
                      {new Date(blog.created_at).toLocaleDateString("en-Us", {
                        dateStyle: "full",
                      })}
                    </p>
                  </NavLink>
                ))}
                
              </div>)
              
              }
              <div className={`flex items-center mt-3 w-full justify-between ${themeDarkColor.box} rounded  p-3`}>
                  <article>
                    <h1 className="font-medium">Your Joined</h1>
                    <p className="text-rose-400 text-[15px]">{joined}</p>
                  </article>
                  <GiArchiveRegister className="text-3xl  sm:text-4xl" />
                </div>
            </div>
          </div>
        </section>
      </section>
     
    </div>
  );
};
