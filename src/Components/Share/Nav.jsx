import React from 'react';
import { NavLink } from 'react-router-dom';
import appIcon from "../../icon/AppIcon.png"

const Nav = () => {
    return (
      <>
    
        <div className="w-full bg-sky-900 md:px-16 p-2 py-5 drop-shadow-lg">
            <div className="flex md:justify-start justify-between items-center">

            <div className='w-20 md:w-32 md:ml-2'>
            <img className='' src={appIcon} alt="site icon" />
            </div>
              
            <nav className="md:text-gray-600 text-gray-100 md:text-lg font-semibold md:ml-16">
                <NavLink className="md:bg-gray-100 md:px-4 px-3 py-2 m-2 rounded" to="/">Home</NavLink>
                <NavLink className="md:bg-gray-100 md:px-4 px-3 py-2 m-2 rounded" to="/WhiteBoard">White Board</NavLink>
            </nav>
         
        </div>
        </div>
      
      </>
    );
};

export default Nav;