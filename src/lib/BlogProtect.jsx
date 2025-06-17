
import { useAuth } from "./BlogContext";
import { Navigate } from "react-router";

const BlogProtect = ({element})=>{

const {isAuthentication} = useAuth()
if(!isAuthentication){
    return <Navigate to="/login" />
}

return element

}

export default BlogProtect;