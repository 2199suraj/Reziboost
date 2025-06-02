import React from 'react'
import Proj from './snippets/Proj'
import Title from './snippets/Title'

function Projects({projectdata}) {
  return (
    <div>
        <Title title="Projects"/>
        {
            projectdata?.map((project,index)=>(
                <Proj key={index} title={project.title}  subtitle={project.subtitle} desc={project.desc}/>
            ))
        }

    </div>
  )
}

export default Projects