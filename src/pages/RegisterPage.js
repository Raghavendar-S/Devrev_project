import { useState } from 'react';
import './RegisterPage.css';
import { RegisterApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import { isAuthenticated } from '../services/Auth';
import { Link, Navigate } from 'react-router-dom';
import NavBar from "../components/NavBar"

export default function RegisterPage(){

      const initialStateErrors = {
        email:{required:false},
        password:{required:false},
        name:{required:false},
        custom_error:null,
    }; 

    const[errors,setErrors] = useState(initialStateErrors);

    const[loading,setLoading] = useState(false);

    const handleSubmit = (event) => {
         event.preventDefault();
         let errors = initialStateErrors;
         let hasError = false;
         if(inputs.name === "")
         {
            errors.name.required = true;
            hasError = true;
         }
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
            RegisterApi(inputs).then((response)=>{
               console.log(response);
               storeUserData(response.data.idToken);
            }).catch((err)=>{
               if(err.code=="ERR_BAD_REQUEST"){
                  setErrors({...errors,custom_error:"Invalid Credentials"})
               }
            }).finally(() => {
               setLoading(false);
            })
         }
         setErrors({...errors});
    }

    const[inputs,setInputs]  = useState({
      email:"",
      password:"",
      name:"",
    })

    const handleInput = (event) =>{
      setInputs({...inputs,[event.target.name]:event.target.value})
    }

    if(isAuthenticated())
    {
       return <Navigate to="/dashboard"/>
    }

    return(
      <div>
         <NavBar/>
        <section className="register-block">
            <div className="container">
               <div className="row ">
                  <div className="col register-sec">
                     <h2 className="text-center">Register Now</h2>
                     <form onSubmit={handleSubmit} className="register-form" action="" >
                      <div className="form-group">
                        <label htmlform="exampleInputEmail1" className="text-uppercase">Name</label>
          
                        <input type="text" className="form-control" onChange={handleInput} name="name" id=""  />
                        { errors.name.required?
                            (<span className="text-danger" >
                            Name is required.
                        </span>):null
                        }
                     </div>
                      <div className="form-group">
                        <label htmlform="exampleInputEmail1" className="text-uppercase">Email</label>
          
                        <input type="text"  className="form-control" onChange={handleInput} name="email" id=""  />
                        { errors.email.required?
                           (<span className="text-danger" >
                            Email is required.
                        </span>):null
                        }
                     </div>
                     <div className="form-group">
                        <label htmlform="exampleInputPassword1" className="text-uppercase">Password</label>
                        <input  className="form-control" type="password"   onChange={handleInput} name="password" id="" />
                        { errors.password.required?
                        (<span className="text-danger" >
                            Password is required.
                        </span>):null
                        }
                     </div>
                     <div className="form-group">
          
                        {errors.custom_error?(<span className="text-danger" >
                           <p>{errors.custom_error}</p>
                        </span>):null}
                        {loading?
                        <div  className="text-center">
                          <div className="spinner-border text-primary " role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>:null
                        }
                        <input type="submit" className="btn btn-login float-right"  disabled ={loading} value="Register"/>
                     </div>
                     <div className="clearfix"></div>
                     <div className="form-group">
                       Already have account ? Please <Link to="/login">Login</Link>
                     </div>
                     </form>
                  </div>
               </div>
            </div>
          </section>
          </div>
    );
}