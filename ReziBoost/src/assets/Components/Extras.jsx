import React from "react";
import Extra from "./snippets/Extra";
import Title from "./snippets/Title";
function Extras({ Extras }) {
  return (
    <div>
      {Extras?.map((ed, index) => (
        <div className="exp" key={index}>
            <Title title={ed.title}/>
            <ul>
                {
                    ed.content?.map((content, index) => (
                        <Extra key={index} contitle={content.contitle} consubtitle={content.consubtitle} timerange={content.timerange}  desc={content.desc} />
                    ))
                }
            </ul>
        </div>

      ))}
    </div>
  );
}

export default Extras;
