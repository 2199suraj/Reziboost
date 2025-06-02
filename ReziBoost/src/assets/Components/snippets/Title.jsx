import React from 'react'

function Title({title}) {
  return (
    <>
    <p className='fw-bold mb-0 fs-5 mt-3'>{title}</p>
    <hr className='m-0 mb-1 border border-black' />
    </>
  )
}

export default Title