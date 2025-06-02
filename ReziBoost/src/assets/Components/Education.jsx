import React from 'react'
import Edu from './snippets/Edu'
import Title from './snippets/Title'

function Education({edu}) {
    return (
        <div className="edu">
            <Title title="Education"/>
            {
                edu?.map((ed,index)=>(
                    <Edu key={index} degree={ed.degree} college={ed.college} duration={ed.duration} location={ed.location}/>
                ))
            }
        </div>
    )
}

export default Education