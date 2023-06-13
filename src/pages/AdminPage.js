import NavBar from "../components/NavBar";
import { logout } from "../services/Auth"
import { useNavigate } from "react-router-dom"

export default function  AdminPage()
{
    const navigate = useNavigate();
  
    const logOutUser = ()=>{
        logout();
        navigate('/login')
      }

    return (
        <div>
            <NavBar logOutUser={logOutUser}/>
            <div class="container">
                <div class="text-center mt-5">
                <h3>Admin page</h3>
                </div>
            </div>
        </div>
    )
}