import { Card,Button,Label,TextInput } from 'flowbite-react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { apiCall } from '../../utils/Utils';
import toast from 'react-hot-toast';


const Login = ()=>{

    const [loader,SetLoader] = useState(false)
    const navigate = useNavigate();

    
    const personSchema = yup.object({
        email: yup.string().email('Invalid Email').required('Email is Required'),
        password: yup.string().min(5, 'Too Short').required('Password is Required'),
       
      });
    const formik = useFormik({
        validationSchema:personSchema,
        initialValues:{
            email:"",
            password:"",
            
        },
        async onSubmit(values){
            const userRes = await apiCall("POST", '/user/login', values, false);
            if (userRes?.data?.status == 200) {
                const localData = {
                  name:userRes?.data?.data.name,
                  email:userRes?.data?.data.email,
                  id:userRes?.data?.data._id,
                  token:userRes?.data?.token
                }
                localStorage.setItem('getToken', JSON.stringify(localData));
                
               toast.success(userRes?.data?.message)
               navigate('/dashboard', { replace: true });
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
           Login
         </p>
       </h5>
       <p className="font-normal text-gray-700 dark:text-gray-400">
       
       </p>
       <form className="flex max-w-md flex-col gap-4"
        onSubmit={formik.handleSubmit}>
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
       </div>
       <p>{formik.touched.email && formik.errors.email
        && (<span className='text-red-400' style={{ color: 'red' }}>
            {formik.errors.email}</span>)}</p>
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
           name='password'
           value={formik.values.password}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
         />
           <p>{formik.touched.password && formik.errors.password
        && (<span className='text-red-400' style={{ color: 'red' }}>
            {formik.errors.password}</span>)}</p>
       </div>
       <Button type="submit" isProcessing = {loader}
        size="md" ><p>Login</p></Button>
      
       
       
     </form>
     <div style={{ textAlign: "center" }}>
                    <NavLink to="/register">Register</NavLink>
                  </div>
     </Card>
         </div>
    )
}


export default Login;