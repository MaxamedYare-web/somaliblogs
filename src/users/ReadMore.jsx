import { NavLink, useParams } from "react-router";
import { useAuth } from "../lib/BlogContext";
import { SubaPaseAuth } from "../lib/supabase";
import { MdDelete } from "react-icons/md";
import { BiArrowFromRight } from "react-icons/bi";
import toast from "react-hot-toast";
import { useState } from "react";
import { FooterPage } from "../pages/FooterPage";

export const ReadMore = () => {
  const { read_more } = useParams();
  const { userInformation, user, setUserInformation, themeDarkColor } =
    useAuth();

  const [testTry, setTestTry] = useState(false);
  const userReadMore = userInformation.filter((rM) => rM.id === read_more);
  const handeHover = () => {
    setTestTry(!testTry);
    return;
  };

  const handleDelate = async (displayId) => {
    const { error } = await SubaPaseAuth.from("blog_content")
      .delete()
      .eq("id", displayId);
    if (error) {
      toast.error(error?.message);
    } else {
      toast.success("Succeful Deleted!");
    }

    const { data: updateDate } = await SubaPaseAuth.from("blog_content")
      .select("*")
      .eq("auther_id", user.id);

    console.log(updateDate);
    setUserInformation(updateDate);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className={`mt-5 rounded ${themeDarkColor.box} duration-300 hover:shadow-lg w-[100%] sm:w-[50%] p-3`}
        >
          <NavLink
            to="/VeiwsYrAllBlogs"
            className="flex items-center space-x-2 p-2 border rounded font-bold text-rose-500 text-2xl"
          >
            <BiArrowFromRight /> <p>Go Back</p>
          </NavLink>
          {userReadMore.map((dis) => (
            <div
              onClick={handeHover}
              key={dis.id}
              className="mt-5 shadow p-2 rounded"
            >
              <img
                className="rounded w-full h-[400px] sm:w-[100%] sm:h-[400px]"
                src={dis.blog_image}
                alt=""
              />
              <h1 className="text-2xl mt-2 font-semibold capitalize">
                {dis.blog_title}
              </h1>
              <p className="mt-2 max-w-[500px]   text-[17px]">${dis.content}</p>
              {
                <MdDelete
                  onClick={() => handleDelate(dis.id)}
                  className={`text-4xl cursor-pointer ${
                    testTry ? "block" : "hidden"
                  }  mt-3 text-red-500`}
                />
              }
            </div>
          ))}
        </div>
      </div>
      <footer className={`inset-x-0 absolute ${themeDarkColor.darkBg}`}>
        <FooterPage />
      </footer>
    </>
  );
};
