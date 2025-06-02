import React from "react";

function Extra({ contitle, consubtitle, timerange, desc }) {
  return (
    <li>
      <div className="d-flex">
        <div className="left w-75">
          <p className="fw-bold m-0 p-0 lh-1">{contitle}</p>

          {consubtitle && (
            <p className="fst-italic fs-6 m-0 p-0 lh-1">{consubtitle}</p>
          )}
        </div>
        <div className="right w-25 text-end">
          {timerange && <p className="m-0 p-0 lh-1">{timerange}</p>}
        </div>
      </div>
      <ul className="custom-list">
        {desc.map((des, index) => (
          <li className="m-0 p-0 lh-1" key={index}>
            {des}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Extra;
