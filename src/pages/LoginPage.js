import { LoginApi } from '../services/Api';
import './LoginPage.css';
import { useState } from 'react';
import { storeUserData } from '../services/Storage';
import { isAuthenticated } from '../services/Auth';
import { Link, Navigate } from 'react-router-dom';
import NavBar from "../components/NavBar"

export default function LoginPage (){
    
    const initialStateErrors = {
        email:{required:false},
        password:{required:false},
        custom_error:null,
    }; 

    const[inputs,setInputs]  = useState({
        email:"",
        password:"",
      })

    const[errors,setErrors] = useState(initialStateErrors);

    const[loading,setLoading] = useState(false);

    const handleInput = (event) =>{
        setInputs({...inputs,[event.target.name]:event.target.value})
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;
        if(inputs.email === "")
        {
           errors.email.required = true;
           hasError = true;
        }
        if(inputs.password === "")
        {
           errors.password.required = true;
           hasError = true;
        }
        if(!hasError)
        {
           //sending register api request
           setLoading(true);
           LoginApi(inputs).then((response)=>{
              console.log(response);
              storeUserData(response.data.idToken);
           }).catch((err)=>{
              if(err.response.data.error.message==="EMAIL_EXISTS"){
                 setErrors({...errors,custom_error:"Already this email has been registered!"})
              }
              else if((err.response.data.error.message).includes('WEAK_PASSWORD')){
                 setErrors({...errors,custom_error:"Password should be atleast 6 characters"})
              }
           }).finally(() => {
              setLoading(false);
           })
        }
        setErrors({...errors});
   }


  if(isAuthenticated())
  {
    if(inputs.email=="admin@gmail.com" && inputs.password=="admin@123")
    {
        return <Navigate to="/admin"/>
    }
    else{
        return <Navigate to="/dashboard"/>
    }
  }

    return (
        <div>
        <NavBar/>
        <section className="login-block">
            <div className="container">
                <div className="row ">
                    <div className="col login-sec">
                        <h2 className="text-center">Login Now</h2>
                        <form className="login-form" onSubmit={handleSubmit} action="">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                            <input type="email" onChange={handleInput}  className="form-control" name="email"  id="" placeholder="email"  />
                            { errors.email.required? (<span className="text-danger" >
                                Email is required.
                            </span>):null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                            <input  className="form-control" type="password" onChange={handleInput} name="password" placeholder="password" id="" />
                            {errors.password.required?(<span className="text-danger" >
                                Password is required.
                            </span>):null}
                        </div>
                        <div className="form-group">
                        {loading?<div  className="text-center">
                                <div className="spinner-border text-primary " role="status">
                                <span className="sr-only">Loading...</span>
                                </div>
                            </div>:null
                        }
                            {errors.custom_error?<span className="text-danger" >
                            <p>{errors.custom_error}</p>
                            </span>:null}
                            <input  type="submit" className="btn btn-login float-right" disabled={loading}  value="Login"/>
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                        Create new account ? Please <Link  to="/register">Register</Link>
                        </div>
                        </form>
                    </div>
                </div>
                </div>
        </section>
        </div>
    );
}