import React from 'react'

function project({title, subtitle, desc}) {
  return (
    <ul className='mb-1'>
        <li className='fw-bold'>{title}</li>
        <p className='fst-italic fs-6 m-0 lh-1'>{subtitle}</p>
        <ul className='custom-list p-0 m-0 lh-1'>
            {desc.map((line,index)=>
                (<li key={index} className='p-0 lh-1'>
                    {line}
                </li>)
                )}
        </ul>
    </ul>
  )
}

export default project