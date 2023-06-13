import NavBar from "../components/NavBar";
import { logout } from "../services/Auth"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection,getDocs, query} from "firebase/firestore"
import {db} from "../services/firebase";
import "./AdminPage.css";

export default function  AdminPage()
{
    const navigate = useNavigate();
    const [person,setPerson] = useState([]);

    const logOutUser = ()=>{
        logout();
        navigate('/login')
    }

    useEffect(()=>{
        getPerson();
    },[]);
  
    const getPerson = async() =>{
        const q = query(collection(db,"person"));
        const querySnapshot = await getDocs(q);
        let person = []
        querySnapshot.forEach((doc)=>{
        person.push({...doc.data(),id:doc.id})
        })
        setPerson(person)
    } 

    return (
        <div>
            <NavBar logOutUser={logOutUser}/>
            <div>
                <h3 className="text-center mt-5">Admin page</h3>
            </div>
            <div className="pn">
            <table>
                <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Date</th>
                <th>Time</th>
                </tr>
                </thead>
                <tbody>
                { 
                person.map((person)=>{
                    return (<tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                        <td>{person.email}</td>
                        <td>{person.phoneNumber}</td>
                        <td>{person.selectedDate}</td>
                        <td>{person.selectedTime}</td>
                    </tr>)
                })
                }
                </tbody>
            </table>
            </div>
        </div>
    )
}