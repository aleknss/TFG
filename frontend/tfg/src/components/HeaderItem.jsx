import React from 'react'

function HeaderItem({name, Icon}) {
  return (
    <div className='flex items-center hover:cursor-pointer gap-3'>
        <Icon className='w-8 h-8' />
        <h2 className='hidden md:block'>{name}</h2>
    </div>
  )
}

export default HeaderItem