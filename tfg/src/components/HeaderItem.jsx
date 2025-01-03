import React from 'react'

function HeaderItem({name, Icon}) {
  return (
    <div className='flex items-center mx-8'>
        <Icon className='w-8 h-8 mr-3' />
        <h2>{name}</h2>
    </div>
  )
}

export default HeaderItem