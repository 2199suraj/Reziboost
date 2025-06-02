import React from 'react'
import Cert from './snippets/Cert'
import Title from './snippets/Title'

function Certificates({certData}) {
    return (
        <div>
            <Title title='Certificates'/>
            {
                certData?.map((cert, index) => (
                    <Cert key={index} title={cert.title} comp={cert.comp} date={cert.date} desc={cert.desc} />
                ))
            }
        </div>
    )
}

export default Certificates