import React from 'react'

function Edu(props) {
    return (
        <div className='d-flex'>
            <div className="left w-75">
                <p className="degree m-0 fw-bold">{props.degree}</p>
                <p className="college m-0">{props.college}</p>
            </div>
            <div className="right w-25 text-end">
                <p className="college m-0">{props.duration}</p>
                <p className="college m-0">{props.location}</p>
            </div>
        </div>
    )
}

export default Edu