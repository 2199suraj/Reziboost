import React from 'react'
import Title from './snippets/Title'

function Skills({skilldata}) {
    const js = [
        {title:"Languages",content:"HTML, CSS, Javascript, Python, Java, C++"},
        {title:"Frameworks", content:"NodeJS, ExpressJS,ReactJs"},
        {title:"DataBases", content:"MySQL, MongoDB"}
    ]
  return (
    <div>
        <Title title="Skills"/>
        {
            skilldata?.map((skill,index)=>(
                <p key={index} className='m-0 p-0 lh-1 '><span className='fw-bold'>{skill.title}: </span><span>{skill.content}</span></p>
            ))
        }
    </div>
  )
}

export default Skills