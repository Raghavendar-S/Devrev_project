import NavBar from "../components/NavBar";
import './Home.css';

export default function HomePage(){
    return (
        <div>
            <NavBar/>
            <div className="bg">
                <div className="mt-5 p-4">
                <h2 className="text-center">Covid Vaccination Booking</h2>
                </div>
            </div>
        </div>
    )
} 