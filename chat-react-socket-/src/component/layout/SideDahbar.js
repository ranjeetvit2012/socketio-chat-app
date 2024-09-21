import { NavLink, Outlet } from "react-router-dom";
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiUser } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import { Banner } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import { MdAnnouncement } from 'react-icons/md';

import { useState } from "react";
const SideDahbar =()=>{
  const navigate = useNavigate();

 const userInfo =  JSON.parse(localStorage.getItem('getToken'));

 if(!userInfo.token){
  navigate('/', { replace: true });
 }
//  const handleLogOut = ()=>{
//   localStorage.removeItem('getToken');

// // To clear the whole data stored in localStorage
// localStorage.clear();
//    console.log(" hello logout")
//  }
    return(
        <div class="p-4 md:p-2">
          <Banner>
          <span>Welcome :-
               <a href="https://flowbite.com" 
               className="inline font-medium text-cyan-600
                underline dark:text-cyan-500 underline-offset-2
                 decoration-600 dark:decoration-500 decoration-solid
                  hover:no-underline">
               {userInfo.name}</a></span>
    </Banner>
             <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
                <NavLink to="/dashboard">
                <Sidebar.Item href="#" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item> 
                </NavLink>
              <NavLink to="/user-list">
              <Sidebar.Item  icon={HiUser}>
               User List
              </Sidebar.Item>
              </NavLink>
             
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>

            <Outlet/>
        </div>
    )
}

export default SideDahbar;