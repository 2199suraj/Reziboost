import { useState } from "react";

export default function FontBox({ setFont }) {
  const [selectedFont, setSelectedFont] = useState("");
  const fonts = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Comic Sans MS",
  ];

  return (
    <div className="p-3 border rounded shadow bg-white w-100 w-md-50 text-center">
      <p className="mb-3 fw-semibold">Select a Font:</p>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {fonts.map((f) => (
          <button
            key={f}
            onClick={() => {
              setFont(f);
              setSelectedFont(f);
            }}
            className={`btn btn-outline-dark px-3 py-1 ${
              selectedFont === f ? "btn-primary text-white" : ""
            }`}
            style={{ fontFamily: f }}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
