import React, { useEffect, useState } from "react";
import { BiSolidShow } from "react-icons/bi";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { IoIosCloseCircleOutline, IoIosStar } from "react-icons/io";
import Popup from "reactjs-popup";
import { useAuth } from "../lib/BlogContext";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SubaPaseAuth } from "../lib/supabase";
import { formatDistance } from "date-fns";
import { FooterPage } from "../pages/FooterPage";

export const AddReview = () => {
  const { themeDarkColor, user } =
    useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [profileImage, setProfileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reviewID, setReviewID] = useState("");
   const [userReviewsData,setUserReviewsData] = useState(null)
  let rateArray = [
    "<IoIosStar />",
    " <IoIosStar />",
    " <IoIosStar />",
    "<IoIosStar />",
    " <IoIosStar />",
  ];

  useEffect(() => {
    fetchIpAddess();
    const channel = SubaPaseAuth.channel("postgres_db_change")
    .on("postgres_changes",
      {event:"INSERT",schema:"public",table:"user_reviews"},
    (payload)=>{
      setUserReviewsData((prev)=>[...prev, payload.new])
    }
    )
    .on("postgres_changes",
      {event:"DELETE",schema:"public",table:"user_reviews"},
      (payload)=>{
        console.log(payload.old)
        setUserReviewsData((prev)=>
        prev.filter((userRevId)=>userRevId.id !== payload.old.id))
      }
    )
    .on("postgres_changes",
      {event:"UPDATE",schema:"public",table:"user_reviews"},
      (payload)=>{
       setUserReviewsData((prev)=>prev.map((pU)=>pU.id === payload.new.id ? payload.new : pU))
      })      
    .subscribe()

      return ()=>SubaPaseAuth.removeChannel(channel)
  }, []);

  const onSubmit = (data) => {
    reset()
    if (data.rate.trim() >= 6) {
      toast.error(
        "rate must less 5 or equil rate wa in 5 ka yarada ama la mid noqdo"
      );
      return data.rate;
    }

    let postRateArray = [];
    if (data.rate == 1) {
      postRateArray = rateArray.slice(0, 1);
    }
    if (data.rate == 2) {
      postRateArray = rateArray.slice(0, 2);
    }
    if (data.rate == 3) {
      postRateArray = rateArray.slice(0, 3);
    }
    if (data.rate == 4) {
      postRateArray = rateArray.slice(0, 4);
    }
    if (data.rate == 5) {
      postRateArray = rateArray.slice(0, 5);
    }
    postReview(data.content, postRateArray);

  };

  const fetchIpAddess = async () => {
    const { data: profileData, error: errorProfile } = await SubaPaseAuth.from(
      "profile_info"
    )
      .select("*")
      .eq("auther_id", user.id)
      .single();
    if (profileData) {
      setProfileImage(profileData?.profile_image);
      console.log(profileImage);
    }
    if (errorProfile) {
      toast.error(errorProfile.message);
    }

    const { data: userReviews } = await SubaPaseAuth.from("user_reviews")
      .select("*")
      .eq("user_autherid", user.id);

    setUserReviewsData(userReviews);
    console.log(userReviews);
  };

  const postReview = async (content, rate) => {
    setIsLoading(true);
    try {
      const { data: dataReview, error: errorDataReview } =
        await SubaPaseAuth.from("user_reviews").insert({
          user_autherid: user.id,
          user_content: content,
          user_rate: rate,
          user_profile: profileImage,
          username:user.email.split("@")[0]
        });
      if (errorDataReview) {
        toast.error(errorDataReview.message);
        return;
      }
      toast.success("Success you review was added!");
      console.log(dataReview);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [textAreaValue, setTextAreaValue] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true)
  try {
      console.log(textAreaValue);
    const { data: updateReview, error: errorUpdateReview } =
      await SubaPaseAuth.from("user_reviews")
        .update({ user_content: textAreaValue })
        .eq("id", reviewID);
    if (updateReview) {
      toast.success("Succefully you review was updated");
      console.log(updateReview);
    }
    if (errorUpdateReview) {
      toast.error(errorUpdateReview.message);
      console.log(errorUpdateReview);
      return;
    }
  } catch (error) {
    console.log(error)
  }finally{
    setIsLoading(false)
  }
  };

  const handleChange = (e) => {
    setReviewID(e.id);
  };

  const handleDelate = async(revID)=>{
setIsLoading(true)
try {
  const {data,error} = await SubaPaseAuth.from("user_reviews").delete().eq("id",revID)

toast.success("success deleted")
if(error){
  console.log(error)
  return
}
} catch (error) {
  console.log(error)
}finally{
  setIsLoading(false)
}

  }

  return (
    <>
      <section className={`h-screen mt-5`}>
        <h1 className="text-center font-bold">
          Add Review how you see our web blogs
        </h1>

        <Popup
          trigger={
            <div className="mt-5 w-[130px]">
              <button className="bg-orange-500 px-4 py-1 rounded flex items-center space-x-1">
                <FaPlusCircle />
                <p>Add New</p>
              </button>
            </div>
          }
          modal
          nested
        >
          {(close) => (
            <div
              className={`flex justify-center relative w-[500px] sm:w-sm md:w-md  lg:w-lg  px-2 pr-6`}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={`${themeDarkColor.darkBg} ${themeDarkColor.box} w-full p-3 rounded mt-3 text-white`}
              >
                <div className="flex justify-end">
                  <IoIosCloseCircleOutline
                    onClick={close}
                    className="text-4xl"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Content</label>
                  <textarea
                    {...register("content", {
                      required: "Content is required....",
                    })}
                    placeholder="Your message"
                    className="border px-2 rounded mt-1"
                  ></textarea>
                  <p className="text-red-500 font-bold">
                    {errors.firsttName?.message}
                  </p>
                </div>
                <div className="flex flex-col mt-5">
                  <label htmlFor="">Rate</label>
                  <input
                    {...register("rate", { required: "Rate is required..." })}
                    placeholder="5"
                    type="number"
                    className="border px-2 py-1.5  rounded mt-1"
                  ></input>
                  <p className="text-red-500 font-bold">
                    {errors.rate?.message}
                  </p>
                </div>
                <div className="flex space-x-2 mt-3 justify-end">
                  <input
                    value="close"
                    type="button"
                    onClick={close}
                    className="bg-gray-500 cursor-pointer px-4 py-1 rounded"
                  />
                  {/* Close
                </input> */}
                  <button
                    className={`${
                      isLoading ? "bg-orange-300" : "bg-orange-500"
                    } cursor-pointer px-4 py-1 rounded`}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </Popup>
        <div className="mt-5 overflow-x-auto shadow-md sm:rounded-lg">
          {!userReviewsData ? (
            <div className="flex justify-center col-span-3">
              <p
                className="animate-spin duration-5000 border-t-4 border-t-rose-700 border-l-orange-300
             p-5  border-b-3 border-r-6 border-l-6 rounded-full border-r-sky-400  h-12 w-12"
              ></p>
            </div>
          ) : userReviewsData.length > 0 ? (
            <table className="bg-[rgba(0,0,0,0.2)] overflow-x-auto p-3 divide-y divide-gray-200 min-w-full">
              <thead className=" bg-orange-500 px-2 py-2 rounded w-full">
                <tr>
                  <th className="px-6 py-3  text-xs font-medium text-white uppercase whitespace-nowrap  text-left tracking-wider">
                    Review Id
                  </th>
                  <th className="border-l-2 px-6 py-3 uppercase tracking-wider text-xs font-medium  border-gray-500 ">
                    Rate
                  </th>
                  <th className="border-l-2 border-gray-500 px-6 py-3 whitespace-nowrap text-xs font-medium text-white uppercase   text-left tracking-wider">
                    Data Time
                  </th>
                  <th className="border-l-2 border-gray-500 px-6 py-3 whitespace-nowrap flex justify-center  text-xs font-medium text-white uppercase   text-left tracking-wider">
                    status
                  </th>
                  <th className="border-l-2 border-gray-500 px-6 py-3 whitespace-nowrap text-xs font-medium text-white uppercase   text-left tracking-wider">
                    More
                  </th>
                  <th className="border-l-2 px-6 py-3 uppercase tracking-wider text-xs font-medium  border-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="px-2  rounded">
                {userReviewsData?.map((review) => (
                  <tr key={review.id} className="">
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                      {review.id}
                    </td>

                    <td className="flex px-6 py-4 whitespace-nowrap text-sm text-center justify-center">
                      {review.user_rate.map((userRate) => (
                        <i>
                          {" "}
                          <IoIosStar className="text-orange-400" />
                        </i>
                      ))}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                      <span className="">
                        {formatDistance(
                          new Date(review.created_at),
                          new Date(),
                          { addSuffix: true }
                        )}
                      </span>
                    </td>
                    <td className="flex justify-center">
                      <p className="bg-green-50 text-green-800 px-2 py-1 rounded">
                        Complated
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Popup
                        trigger={<BiSolidShow />}
                        modal
                        nested
                        position="right top"
                      >
                        {(close) => (
                          <div
                            className={`${themeDarkColor.darkBg} ${themeDarkColor.box} text-white flex justify-center gap-3 flex-col p-3 w-[400px]`}
                          >
                            <p>{review.user_content}</p>
                            <div className="flex space-x-2 mt-3 justify-end">
                              <button
                                value="close"
                                onClick={close}
                                className="bg-gray-500 flex items-center gap-1 cursor-pointer px-2 py-1 rounded"
                              >
                                <IoIosCloseCircleOutline className="text-[20px]" />
                                <p>Close</p>
                              </button>

                              <Popup
                                trigger={
                                  <button
                                    className={` bg-orange-500
                     cursor-pointer flex items-center px-4 py-1 rounded`}
                                  >
                                    <FaRegEdit /> Edit
                                  </button>
                                }
                                modal
                              >
                                <div
                                  className={`w-[400px] p-3 ${themeDarkColor.darkBg} ${themeDarkColor.box}`}
                                >
                                  <form
                                    onSubmit={handleUpdate}
                                    className="flex flex-col w-full"
                                  >
                                    <textarea
                                      className="p-2 border h-[150px]"
                                      defaultValue={review.user_content}
                                      onChange={(e) => {
                                        setTextAreaValue(e.target.value);
                                        handleChange(review);
                                      }}
                                      type="text"
                                    />
                                    <button className={`p-2 mt-3 ${isLoading ? "bg-orange-300":"bg-orange-500" }  rounded`}>
                                      Update
                                    </button>
                                  </form>
                                </div>
                              </Popup>
                            </div>
                            <div></div>
                          </div>
                        )}
                      </Popup>
                    </td>
                    <td className="flex justify-center">
                      <button onClick={()=>handleDelate(review.id)} className={`${isLoading ? "bg-orange-300":"bg-orange-500"} py-1 px-3 rounded`}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) 
          : (
            <div className="flex justify-center  w-full">
              <p className="max-w-[330px] text-center text-gray-200">
                You not add any review if you want to add review please click
                button add new
              </p>
            </div>
          )
          }
        </div>
      </section>
        <footer className={`inset-x-0 absolute ${themeDarkColor.darkBg}`}>
              <FooterPage/>
            </footer>
    </>
  );
};
