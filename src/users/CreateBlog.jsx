import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { SubaPaseAuth } from "../lib/supabase";
import { useAuth } from "../lib/BlogContext";
import { FooterPage } from "../pages/FooterPage";

export const CreateBlog = () => {
  const [titleName, setTitleName] = useState("");
  const [file, setFile] = useState(null);
  const [blogContent, setBlogContent] = useState("");
  const [prevImage, setPrevImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsloadin] = useState(false);
  const [userIp, setUserIp] = useState();
  const  [userImage,setUserImage] = useState(null)

 useEffect(() => {
    if (file) {
      const prevUrl = URL.createObjectURL(file);
      setPrevImage(prevUrl);
      setImageData(file);
    }
    fetchIpAddess()
    // console.log(userIp)
  }, [file]);


  const handleAddBlog = async (e) => {
    e.preventDefault();
    setTitleName("");
    setFile(null);
    setBlogContent("");
    setPrevImage(null);
    if (titleName.trim() == "") {
      toast.error("Title name is required");
      throw titleName;
    }
    if (file == null) {
      toast.error("file image is required");
      throw file;
    }

    if (blogContent == "") {
      toast.error("Blog Content is reuired");
    }

    if (!userIp) {
      toast.error("error Please Try again ip");
      return;
    }

    if (titleName && imageData && blogContent && userIp) {
      await blogInsert(titleName, imageData.name, blogContent, userIp);
     
    }
  };

  const { user, themeDarkColor } = useAuth();

  const fetchIpAddess = async()=>{
     const getApiAddress = import.meta.env.VITE_API_GEOLOCATION;
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch(
        `https://api.ipgeolocation.io/v2/ipgeo?apiKey=${getApiAddress}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            setUserIp(result);
            return;
          }
        })
        .catch((error) => {
          if (error) {
            console.error(error);
            throw error;
          }
        });

        const {data:profileData} = await SubaPaseAuth.from("profile_info")
        .select()
        .eq("auther_id",user.id)
        setUserImage(profileData[0].profile_image)

        
  }

  const blogInsert = async (titleName, imageDat, blogContent, userIp) => {
    setIsloadin(true);
    try {
      const fileExt = imageDat.split(".").pop().toLowerCase();
      const filePath = `blog-image/${Date.now()}.${fileExt}`;

      const {
        data: { publicUrl },
      } = SubaPaseAuth.storage.from("blog-image").getPublicUrl(filePath);
      console.log(publicUrl);

      const { data: dataInsert, error: errorInsert } = await SubaPaseAuth.from(
        "blog_content"
      )
        .insert([
          {
            auther_id: user?.id,
            blog_title: titleName,
            content: blogContent,
            blog_image: publicUrl,
            user_ipadress: userIp,
            user_image:userImage,
            user_name:user.email.split("@")[0]
          },
        ])
        .select();

      if (dataInsert) {
        console.log(dataInsert);
      }
      if (errorInsert) {
        console.log(errorInsert);
        return errorInsert;
      }

      if (!file) {
        toast.error("Please upload image");
        throw file;
      }

      const { data: dataUpload, error: uploadError } =
        await SubaPaseAuth.storage
          .from("blog-image")
          .upload(filePath, imageData, {
            contentType: file.type,
            cacheControl: "3600",
            upsert: true,
          });
      if (uploadError) {
        console.log(uploadError);
        return uploadError;
      }
      console.log(dataUpload);
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setIsloadin(false);
    }
  };

 

  return (
    <>
      <div className={`flex h-screen bg-inherit justify-center mt-5 p-5`}>
        <form
          onSubmit={handleAddBlog}
          className={`space-y-5 mb-auto ${themeDarkColor.box} shadow p-5 rounded w-full md:w-[55%]`}
        >
          <div className="flex flex-col">
            <label
              className={`mb-2 ${themeDarkColor.textGray} text-2xl font-semibold`}
              htmlFor=""
            >
              Tile Blog
            </label>
            <input
              value={titleName}
              onChange={(e) => setTitleName(e.target.value)}
              className="border focus:outline-orange-300 rounded p-2 text-[17px] font-bold text-gray-300  capitalize"
              type="text"
              placeholder="title"
            />
          </div>

          <div className="flex relative flex-col">
            <label
              className={`mb-2 ${themeDarkColor.textGray} text-2xl font-semibold`}
              htmlFor=""
            >
              Blog Image
            </label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              className="rounded file:pl-9 file:font-semibold file:bg-orange-500 file:p-1 file:rounded file:text-white p-1 text-2xl  capitalize"
              type="file"
            />
            <MdOutlineDriveFileMove className="text-4xl  absolute top-12 left-1 text-white" />
            {prevImage && (
              <img
                className="w-[80px] h-[80px] rounded"
                src={prevImage}
                alt=""
              />
            )}
          </div>
          <div className="flex flex-col">
            <label
              className={`mb-2 ${themeDarkColor.textGray} text-2xl font-semibold`}
              htmlFor=""
            >
              Blog Content
            </label>
            <textarea
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              className="border focus:outline-orange-300 rounded p-2 text-[17px] font-bold text-gray-300 first-letter:capitalize"
              placeholder="Content..."
            />
          </div>
          <button
            className={`${
              isLoading ? "bg-orange-300" : "bg-orange-500"
            } relative w-full text-[18px] rounded font-semibold text-white p-2`}
          >
            Add Blog
            {isLoading && (
              <div className="absolute flex justify-center  w-full top-0">
                <svg
                  className="mt-[-10px] text-orange-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 24 24"
                >
                  <circle cx="18" cy="12" r="0" fill="currentColor">
                    <animate
                      attributeName="r"
                      begin=".67"
                      calcMode="spline"
                      dur="1.5s"
                      keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                      repeatCount="indefinite"
                      values="0;2;0;0"
                    />
                  </circle>
                  <circle cx="12" cy="12" r="0" fill="currentColor">
                    <animate
                      attributeName="r"
                      begin=".33"
                      calcMode="spline"
                      dur="1.5s"
                      keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                      repeatCount="indefinite"
                      values="0;2;0;0"
                    />
                  </circle>
                  <circle cx="6" cy="12" r="0" fill="currentColor">
                    <animate
                      attributeName="r"
                      begin="0"
                      calcMode="spline"
                      dur="1.5s"
                      keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                      repeatCount="indefinite"
                      values="0;2;0;0"
                    />
                  </circle>
                </svg>
              </div>
            )}
          </button>
        </form>
      </div>
      <footer className={`inset-x-0 absolute ${themeDarkColor.darkBg}`}>
        <FooterPage />
      </footer>
    </>
  );
};
