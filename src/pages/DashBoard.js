import { useEffect, useState } from "react"
import { UserDetailsApi } from "../services/Api"
import NavBar from "../components/NavBar"
import { logout,isAuthenticated } from "../services/Auth"
import { Navigate, useNavigate } from "react-router-dom"
import { addDoc, collection} from "firebase/firestore"
import {db} from "../services/firebase";

export default function DashBoardPage(){
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vaccineType, setVaccineType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const[user,setUser] = useState({name:"",email:"",localId:""})  
  
  useEffect(()=>{
    if(isAuthenticated())
    {
    UserDetailsApi().then((response)=>{
      setUser({name:response.data.users[0].displayName,
        email:response.data.users[0].email,
        localId:response.data.users[0].localId
      })
    })
    }
  },[]);
  
  const logOutUser = ()=>{
    logout();
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission, e.g., send data to backend or display a success message
    alert("Your form has been submitted successfully");

    const person = {name,email,phoneNumber:parseInt(phoneNumber),vaccineType,selectedDate,selectedTime}
    await addDoc(collection(db,"person"),person);
    setName('');
    setEmail('');
    setPhoneNumber('');
    setVaccineType('');
    setSelectedDate('');
    setSelectedTime('');
  }

  if(!isAuthenticated())
  {
     return <Navigate to="/login"/>
  }

  return (
      <div>
        <NavBar logOutUser={logOutUser}/>
        <div className="container mt-5 p-4">
          <h2 className="text-center">COVID Vaccination Booking</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number:
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="vaccineType" className="form-label">
                Vaccine Type:  
              </label>
              <select
                className="form-select"
                id="vaccineType"
                value={vaccineType}
                onChange={(e) => setVaccineType(e.target.value)}
                required
              >
                <option value="">Select Vaccine Type</option>
                <option value="Covishield">Covishield</option>
                <option value="Covaccine">Covaccine</option>
                <option value="Sputnik">Sputnik </option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">
                Time:
              </label>
              <input
                type="time"
                className="form-control"
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2 col-4 mx-auto mt-4">
              <button type="submit" className="btn btn-primary">Book Appointment</button>
            </div>
          </form>
        </div>
        </div>
    )
}