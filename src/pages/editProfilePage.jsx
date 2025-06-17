import { IoMdReverseCamera } from "react-icons/io";
import { useAuth } from "../lib/BlogContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SubaPaseAuth } from "../lib/supabase";
import { FooterPage } from "./FooterPage";
import userProfile from "../assets/profile-user.png"

export const EditProfilePage = () => {
  const { user, getUserData, getProfieImage,themeDarkColor } = useAuth();
  const [profileFile, setProfileFile] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsloadin] = useState(false);
  getUserData();
  useEffect(() => {
    if (profileFile) {
      const file = URL.createObjectURL(profileFile);
      setFile(file);
    }

    return () => clearInterval(() => setProfileFile(null));
  }, [profileFile]);

  const handleProfile = async (e) => {
    e.preventDefault();
    setIsloadin(true);

    if (!getProfieImage) {
      getDataProfile();
    } else {
      // update profile
      updateProfile();
    }
  };

  const getDataProfile = async () => {
    if (!profileFile) {
      toast.error("Please upload image");
      return;
    }
    const fileEx = profileFile.name.split(".").pop();
    const filePath = `ProfileImage/${Date.now()}.${fileEx}`;

    const { data: dataUpload, error: errorUpload } = await SubaPaseAuth.storage
      .from("profile-image")
      .upload(filePath, profileFile);

    const {
      data: { publicUrl },
    } = SubaPaseAuth.storage.from("profile-image").getPublicUrl(filePath);

    const { data: inserDataImage, error: erroInserDataImage } =
      await SubaPaseAuth.from("profile_info")
        .insert([{ profile_image: publicUrl, auther_id: user?.id }])
        .select()
        .single();

    if (inserDataImage) {
      setIsloadin(false);
    }
    if (erroInserDataImage) {
      toast.error(erroInserDataImage.message);
      setIsloadin(false);
      return;
    }

    try {
      if (dataUpload) {
        toast.success("Success uploaded");
        setIsloadin(false);
      }
    } catch (error) {
      console.log(error);
      setIsloadin(false);
      return;
    }
    if (errorUpload) {
      console.log(errorUpload);
      toast.error(errorUpload.message);
      setIsloadin(false);
      return;
    }
  };

  const updateProfile = async () => {
    try {
      const fileEx = profileFile.name.split(".").pop();
      const filePath = `ProfileImage/${Date.now()}.${fileEx}`;

      const { data: dataUpload, error: errorUpload } =
        await SubaPaseAuth.storage
          .from("profile-image")
          .update(filePath, profileFile);

      const {
        data: { publicUrl },
      } = SubaPaseAuth.storage.from("profile-image").getPublicUrl(filePath);

      if (dataUpload) {
        console.log(dataUpload);
      }

      if (errorUpload) {
        console.log(errorUpload);
        return errorUpload;
      }

      const { data: updateData, error: errorData } = await SubaPaseAuth.from(
        "profile_info"
      )
        .update([{ profile_image: publicUrl }])
        .eq("auther_id", user.id);
      if (updateData) {
        console.log(updateData);
      } else {
        if(errorData){
          console.log(errorData);
        }
        return errorData;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloadin(false);
    }
  };

  return (
    <>
      <div className="px-2 sm:px-50">
        <div className="relative">
          <img
            className="w-full h-30 sm:h-40 rounded"
            src="https://img.freepik.com/free-photo/red-light-round-podium-black-background-mock-up_43614-950.jpg?ga=GA1.1.1379415082.1741265387&semt=ais_hybrid&w=740"
            alt=""
          />
          <div className="flex  absolute top-[10%] sm:top-[15%] flex-col items-center justify-center w-full ">
            {file ? (
              <img
                className="w-[150px]   h-[150px] rounded-full"
                src={
                  file
                    ? file
                    : "https://cdn.pixabay.com/photo/2023/04/27/10/22/cat-7954262_1280.jpg"
                }
                alt=""
              />
            ) : (
              <img
                className={`w-[150px] ${!getProfieImage && "bg-gray-300"}  h-[150px] rounded-full`}
                src={getProfieImage ? getProfieImage : userProfile}
                alt=""
              />
            )}
            <label
              className="absolute  right-40 sm:right-120"
              htmlFor="uploadImage"
            >
              {" "}
              <IoMdReverseCamera className="text-5xl  text-rose-500" />{" "}
            </label>
          </div>
        </div>
        <form onSubmit={handleProfile} className="p-5 rounded">
          <input
            accept="image/*"
            onChange={(e) => setProfileFile(e.target.files[0])}
            className="hidden"
            id="uploadImage"
            type="file"
          />
          <div className="flex flex-col mt-10">
            <label className="font-bold text-[18px]" htmlFor="">
              Email Address
            </label>
            <input
              className="border capitalize outline-orange-500 rounded p-3"
              readOnly
              value={user?.email}
              type="text"
            />
          </div>
          {!getProfieImage ? (
            <button
              className={`${
                isLoading ? "bg-orange-300" : "bg-orange-500"
              } relative p-2 rounded text-white w-full mt-5`}
            >
              Change Profile
              <div className="absolute top-0  w-full flex justify-center">
                {isLoading && (
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
                )}
              </div>
            </button>
          ) : (
            <button
              className={`${
                isLoading ? "bg-orange-300" : "bg-orange-500"
              } relative p-2 rounded text-white w-full mt-5`}
            >
              Update Profile
              <div className="absolute top-0  w-full flex justify-center">
                {isLoading && (
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
                )}
              </div>
            </button>
          )}
        </form>
      </div>
      <footer className={`inset-x-0 absolute ${themeDarkColor.darkBg}`}>
        <FooterPage/>
      </footer>
    </>
  );
};
