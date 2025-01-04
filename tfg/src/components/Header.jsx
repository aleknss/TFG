import React from 'react'
import { HiHome, HiUser, HiOutlineRss } from "react-icons/hi";
import HeaderItem from './HeaderItem';

function Header() {
    const menu = [
        {
            id: 1,
            name: "HOME",
            icon: HiHome,
        },
        {
            id: 2,
            name: "CUENTA",
            icon: HiUser,
        },
        {
            id: 3,
            name: "CONTROL",
            icon: HiOutlineRss,
        },
    ]

  return (
    <div className='sticky top-0 z-50 bg-white'>
        <nav className='flex items-center w-full h-24 ml-20 gap-20'>
            <div className='hidden md:flex gap-20'>
                {menu.map((item) => (
                    <HeaderItem name={item.name} Icon={item.icon} key={item.id}/>
                ))}
            </div>
            <div className='flex md:hidden gap-20'>
                {menu.map((item) => (
                    <HeaderItem name={item.name} Icon={item.icon} key={item.id}/>
                ))}
            </div>
        </nav>
    </div>
  )
}

export default Header