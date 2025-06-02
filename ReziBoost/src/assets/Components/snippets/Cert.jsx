import React from 'react'

function Cert({ title, comp, date, desc }) {
    return (
        <div className='mb-0'>
            <div className="d-flex m-0">
                <div className="left w-75">
                    <p className='m-0 p-0 lh-1 fw-bold'>{title}({comp})</p>
                </div>
                <div className="right w-25 text-end">
                    <p className='m-0 p-0 lh-1'>{date}</p>
                </div>
            </div>
            <ul className='custom-list'>
                {
                    desc.map((des, index) => (
                        <li key={index} className='m-0 p-0 lh-1'>{des}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Cert