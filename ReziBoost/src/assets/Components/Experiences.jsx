import React from 'react'
import Exp from './snippets/Exp'
import Title from './snippets/Title'

function Experiences({exp}) {
    return (
        <div className="exp">
            <Title title="Experiences"/>
            <ul>
                {
                    exp?.map((exper, index) => (
                        <Exp key={index} title={exper.title} comp={exper.comp} duration={exper.duration} online={exper.onlineoroffline} desc={exper.desc} />
                    ))
                }
            </ul>
        </div>
    )
}

export default Experiences