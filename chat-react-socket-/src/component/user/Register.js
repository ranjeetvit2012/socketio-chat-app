import { Card,Button,Label,TextInput } from 'flowbite-react';
import { NavLink,useNavigate } from 'react-router-dom';
import * as yup from "yup"
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {apiCall} from "../../utils/Utils"

const Register = ()=>{
      
    const [loader,SetLoader] = useState(false)
    const navigate = useNavigate();

    const validationYub = yup.object({
        name:yup.string("Enter Name").required("Name is required"),
        password:yup.string("Enter password").required("Password is  required"),
        email:yup.string("Enter is email").email("Please Enter valid Email").required("Email is required"),
        mobile:yup.number("Enter Mobile number").required("Mobile is required")
    })
    const formik = useFormik({
        validationSchema:validationYub,
        initialValues:{
            name:"",
            email:"",
            password:"",
            mobile:""
        },
        async onSubmit(values){
            const userRes = await apiCall("POST", '/user/register', values, false);
      
            if (userRes?.data?.status == 201) {
               toast.success(userRes?.data?.message)
               navigate('/', { replace: true });
            } else {
              toast.error(userRes?.data?.message)
              
            }
        }
    })
    return(
        <div>
    
        <Card className="max-w-sm  m-auto mt-24">
       <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
         <p className='text-center'>
           Register
         </p>
       </h5>
       <p className="font-normal text-gray-700 dark:text-gray-400">
       
       </p>
       <form className="flex max-w-md flex-col gap-4" onSubmit={formik.handleSubmit}>
       <div>
         <div className="mb-2 block">
           <Label
             htmlFor="name1"
             value="Your Name"
           />
         </div>
         <TextInput
           id="name1"
           placeholder="Enter Name"
           type="text"
           name="name"
           value={formik.values.name}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
         />
        
         <p>{formik.touched.name && formik.errors.name &&
         (<span className='text-red-400' style={{color:'red'}}>
            {formik.errors.name}
         </span>)}</p>
       </div>
       <div>
         <div className="mb-2 block">
           <Label
             htmlFor="email1"
             value="Your email"
           />
         </div>
         <TextInput
           id="email1"
           placeholder="Enter Email"
           type="email"
           name="email"
           value={formik.values.email}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
         />
         <p>{formik.touched.email && formik.errors.email && (<span className='' 
         style={{color:'red'}}>{formik.errors.email}</span>)}</p>
       </div>
       <div>
         <div className="mb-2 block">
           <Label
             htmlFor="password1"
             value="Your password"
           />
         </div>
         <TextInput
           id="password1"
           placeholder="Enter Password"
           type="password"
           name="password"
           value={formik.values.password}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}

         />
         <p>{formik.touched.password && formik.errors.password && 
         (<span style={{color:'red'}}>{formik.errors.password}</span>)}</p>
       </div>

       <div>
         <div className="mb-2 block">
           <Label
             htmlFor="mobile1"
             value="Your Mobile"
           />
         </div>
         <TextInput
           id="password1"
           placeholder="Enter Mobile"
           type="text"
           name="mobile"
           value={formik.values.mobile}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}

         />
         <p>{formik.touched.mobile && formik.errors.mobile
          && (<span style={{color:'red'}}>{formik.errors.mobile}</span>) }</p>
       </div>
       <Button type="submit" isProcessing = {loader}
        size="md" ><p> Save</p></Button>
      
       
       
     </form>
     <NavLink to="/" >Login</NavLink>
     </Card>
    
         </div>
    )
}


export default Register;