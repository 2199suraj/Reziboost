import React from 'react'

function Exp({ title, comp, duration, onlineoroffline, desc }) {
    return (
        <li>
            <div className='d-flex'>
                <div className="left w-75">
                    <p className='fw-bold m-0 p-0 lh-1'>{title}</p>
                    <p className='fst-italic fs-6 m-0 p-0 lh-1'>({comp})</p>
                </div>
                <div className="right w-25 text-end">
                    <p className='m-0 p-0 lh-1'>{duration}</p>
                    <p className='m-0 p-0 lh-1'>{onlineoroffline}</p>
                </div>
            </div>
            <ul className='custom-list'>

                {desc.map((des,index) => (
                    <li className='m-0 p-0 lh-1' key={index}>{des}</li>
                ))}
            </ul>
        </li>

    )
}

export default Exp