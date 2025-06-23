import { Routes } from "react-router";
import { HeaderPage } from "./pages/HeaderPage";
import { Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { Dashboard } from "./users/dashboard";
import { CreateBlog } from "./users/CreateBlog";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import BlogProtect from "./lib/BlogProtect";
import { AboutPage } from "./pages/AboutPage";
import { EditProfilePage } from "./pages/editProfilePage";
import { VeiwsYrAllBlogs } from "./users/VeiwsYrAllBogs";
import { ReadMore } from "./users/ReadMore";
import { useAuth } from "./lib/BlogContext";
import { VeiwSingleBlog } from "./pages/VeiwsSingleBlog";
import { ShowAllBlogs } from "./pages/ShowAllBlogs";
import { ReadLatestPosts } from "./pages/ReadLatestPosts";
import { AddReview } from "./users/AddReview";



const App = () => {
  const {themeDarkColor} = useAuth()
  return ( <>
    <div className={`${themeDarkColor.darkBg}  h-full`}>
      <HeaderPage />
      <div className="px-2 sm:px-50">
        <main className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<BlogProtect element={<Dashboard/>}/>}/>
          <Route path="/create_blog" element={<BlogProtect element={<CreateBlog/>} />}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/editprofile" element={<BlogProtect element={<EditProfilePage/>}/>}/>
          <Route path="/VeiwsYrAllBlogs" element={<BlogProtect element={<VeiwsYrAllBlogs/>} />}/>
          <Route path="/VeiwsYrAllBlogs/:read_more" element={<BlogProtect element={<ReadMore/>}/>}/>
          <Route path="VeiwSingleBlog/:blogid" element={<BlogProtect element={<VeiwSingleBlog/>}/>}/>
          <Route path="all-blogs" element={<ShowAllBlogs/>}/>
          <Route path="/latestposts/:postid" element={<ReadLatestPosts/>}/>
          <Route path="/addreview" element={<BlogProtect element={<AddReview/>}/>}/>
        </Routes>
      </main>
      </div>
     
    </div>
    </>
    
  );
};

export default App;
