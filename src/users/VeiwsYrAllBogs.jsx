import { useEffect, useState } from "react";
import { useAuth } from "../lib/BlogContext";
import { MdDelete } from "react-icons/md";
import { SubaPaseAuth } from "../lib/supabase";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { Link, NavLink } from "react-router";
import { FooterPage } from "../pages/FooterPage";

export const VeiwsYrAllBlogs = () => {
  const { user, userInformation, setUserInformation, themeDarkColor } = useAuth();
  const [testTry, setTestTry] = useState("");

 

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

  const handeHover = (disId) => {
    if (disId === disId) {
      setTestTry(disId);
    }
  };

  if (!userInformation) {
    return (
      <>
        <div
          className={`flex flex-col justify-center items-center inset-y-0 inset-x-0 absolute w-screen h-screen ${themeDarkColor.darkBg}`}
        >
          <div className="loader"></div>
          <h1 className="text-2xl text-white mt-2 font-bold">
            Welcome Blog Web by
          </h1>
          <p className="text-white font-bold">Mucawiye</p>
        </div>
      </>
    );
  }

  return (
    <>
      <section className={`mt-5 ${themeDarkColor.darkBg} p-3 bg-inherit`}>
        <h1 className={`font-medium text-orange-700 bg-orange-100 p-2 rounded`}>
          Veiws your all blogs
        </h1>
        {userInformation?.length > 0 ? (
          <>
            <div className="grid mt-4 sm:grid-cols-3 space-x-2">
              {userInformation.map((dis) => (
                <div
                  onMouseOver={() => handeHover(dis.id)}
                  key={dis.id}
                  className={`mt-5 shadow ${themeDarkColor.box} p-2 rounded`}
                >
                  <img
                    className="rounded w-full h-[400px] sm:w-[100%] sm:h-[300px]"
                    src={dis.blog_image}
                    alt=""
                  />
                  <h1 className="text-2xl mt-2 font-semibold capitalize">
                    {dis.blog_title}
                  </h1>
                  <div
                    className={`mt-2 max-w-[500px]  ${themeDarkColor.textGray} text-[17px]`}
                  >
                    {dis.content.length > 174 ? (
                      <>
                        {" "}
                        <h1>${dis.content.slice(0, 174)}</h1>
                        <NavLink
                          to={`/VeiwsYrAllBlogs/${dis.id}`}
                          className="text-rose-500 font-semibold text-[15px]"
                        >
                          Read More...
                        </NavLink>
                      </>
                    ) : (
                      dis.content.slice(0, 174)
                    )}
                  </div>

                  {testTry === dis.id && (
                    <MdDelete
                      onClick={() => handleDelate(dis.id)}
                      className={`text-4xl cursor-pointer  mt-3 text-gray-600`}
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col mt-10 justify-center">
            <div className="w-full flex flex-col space-y-3 items-center justify-center">
              <h1 className="text-red-500 font-semibold">
                You don't have blogs
              </h1>
              <h2 className="max-w-90 text-center text-gray-500 font-semibold">
                If you want to add new blog please click the button plus below
              </h2>
              <Link to="/create_blog">
                {" "}
                <CiCirclePlus className="text-4xl text-red-500 hover:text-red-800" />{" "}
              </Link>
            </div>
          </div>
        )}
      </section>
      <footer className={`inset-x-0 absolute ${themeDarkColor.darkBg}`}>
        <FooterPage/>
      </footer>
    </>
  );
};
