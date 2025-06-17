import { createContext, useContext, useEffect, useState } from "react";
import { SubaPaseAuth } from "./supabase";
import toast from "react-hot-toast";

const BlogContext = createContext(null);
const BlogProvider = ({ children }) => {
  const [user, SetUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [getProfieImage, setGetProfieImage] = useState(null);
  const [userInformation, setUserInformation] = useState(null);
  const [sixBlogsHome,setSixBlogsHome] = useState(null)
  const [allBlogsHome,setAllBlogsHome] = useState(null)
    const [lastestPosts, setLatestPosts] = useState([]);
  

  useEffect(() => {
    const {
      data: { subscription },
    } = SubaPaseAuth.auth.onAuthStateChange(async (event, session) => {
      SetUser(session?.user);
      setIsLoading(false);
    });

    //    console.log(data)

    return () => subscription?.unsubscribe();
  }, []);

  const Logout = async () => {
    const { error } = await SubaPaseAuth.auth.signOut();
    toast.error(error.message);
  };

  const getUserData = async () => {
    const { data } = await SubaPaseAuth.from("profile_info")
      .select("*")
      .eq("auther_id", user?.id);
    if (data) {
      setGetProfieImage(data[0]?.profile_image);
      if (getProfieImage) {
        return getProfieImage;
      }
      return data;
    }
  };

 




// GeolocationApi()

  const themeDarkColor = {

      darkBg:"bg-[linear-gradient(90deg,rgba(8,41,89,1)_0%,rgba(9,9,121,1)_35%,rgba(0,212,215,1)_100%)] text-white",
      box:"border-sky-300 rounded shadow-sky-300 shadow border",
      textGray:"text-gray-300"
  };

  const value = {
    user,
    isLoading,
    isAuthentication: !!user,
    Logout,
    getProfieImage,
    getUserData,
    userInformation,
    setUserInformation,
    themeDarkColor,
    sixBlogsHome,
    setSixBlogsHome,
    allBlogsHome,
    setAllBlogsHome,
    lastestPosts,
     setLatestPosts
   

  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(BlogContext);
  return context;
};





export default BlogProvider;
