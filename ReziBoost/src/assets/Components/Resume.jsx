import { React, useState, useEffect } from 'react';
import Education from './Education';
import Projects from './Projects';
import Experiences from './Experiences';
import Skills from './Skills';
import Certificates from './Certificates';
import Diamond from './ui/Diamond';
import Bot from './GenAI/Bot';
import FontBox from './ui/FontBox';
import Loader from './ui/Loader1';
import Extras from './Extras';

function Resume({ stat, printstat }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);
  const [resumePrompt, setResumePrompt] = useState('');
  const [font, setFont] = useState();
  const [searching, setSearching] = useState(false);

  function print() {
    turnoff();
  }

  useEffect(() => {
    if (printing, stat) {
      window.print();
      setTimeout(() => {
        setPrinting(!printing);
        printstat(!stat);
      }, 500);
    }
  },[stat,printing]);

  function turnoff() {
    setPrinting(!printing);
    printstat(!stat);
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("output"));
    setData(storedData);
    console.log(storedData);
    document.title = `ReziBoost : ${storedData?.Name || "Resume"}`;
    setLoading(false);
  }, []);


  useEffect(() => {
    if (loading) return; // Wait until data is loaded

    const resume = document.getElementById("resume");
    if (resume) {
      resume.querySelectorAll("*").forEach((el) => {
        el.setAttribute("contentEditable", "true");
      });
    }
  }, [loading]);


  if (loading) return <div>Loading...</div>;

  function Update() {
    setSearching(true);

    Bot(localStorage.getItem("output"), resumePrompt).then((res) => {
      localStorage.setItem("output", format(res.response.text()));
      setData(JSON.parse(format(res.response.text())));
      setSearching(false);
    });
  }

  function format(jsonString) {
    try {
      const lines = jsonString?.trim().split("\n");
      if (lines?.length > 2) {
        return lines?.slice(1, -1).join("\n");
      }
      return "";

    } catch (error) {
      console.error("JSON Parse Error:", error);
      return {};
    }
  }


  return (
    <div className={`  d-flex flex-column-reverse flex-md-row w-100 justify-content-center  ${!printing ? 'p-3 gap-4' : 'p-0 m-0'}`}>

      {/* Left Section - Resume Update Input */}
      {/* Left Section - Hide during print */}
      {!printing && (
        <div className="left no-print border p-3 rounded shadow-sm bg-light d-flex flex-column align-items-start custom-width-md">
          <h5 className="mb-2">AI Update Resume</h5>
          <textarea
            type="text"
            placeholder="Enter Prompt to Update Resume"
            value={resumePrompt}
            onChange={(e) => setResumePrompt(e.target.value)}
            className="form-control mb-2"
            rows="8"
          />
          <button className="btn btn-primary w-100" onClick={Update}>Update</button>
          <FontBox setFont={setFont} />
        </div>
      )}

      {/* Resume Section */}
      <div id="resume" className={` border bg-white ${!printing ? 'p-3 w-100' : 'p-2 m-0 a4'} overflow-x-auto`} style={{ fontFamily: font }}>
        <header>
          <p id="name" className="fw-bold fs-2 m-0 pb-0 lh-1 text-center">
            {data.Name}
          </p>
          <p id="designation" className="fs-6 m-0 pt-0 lh-1 text-dark text-center">
            {data?.Position || "Position Not Found"}
          </p>

          {/* Contact Information */}
          <div className="info d-flex justify-content-center align-items-center mt-2 gap-2">
            <span className="m-0 p-0 lh-1">{data.Mobile}</span>
            <Diamond />
            <span className="m-0 p-0 lh-1">
              <a href={`mailto:${data.Email}`}>{data.Email}</a>
            </span>
            <Diamond />
            <span className="m-0 p-0 lh-1">
              <a href={data.GitHub} target="_blank" rel="noopener noreferrer">GitHub</a>
            </span>
            <Diamond />
            <span className="m-0 p-0 lh-1">
              <a href={data.LinkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </span>
          </div>

          <hr />
          <p className="lh-1">{data.Summary}</p>
        </header>

        {/* Resume Sections */}
        {data.Education?.length > 0 && <Education edu={data.Education} />}
        {data.Projects?.length > 0 && <Projects projectdata={data.Projects} />}
        {data.Experiences?.length > 0 && <Experiences exp={data.Experiences} />}
        {data.Skills?.length > 0 && <Skills skilldata={data.Skills} />}
        {data.Certificates?.length > 0 && <Certificates certData={data.Certificates} />}
        {data.Extras?.length > 0 && <Extras Extras={data.Extras} />}

        {/* Print Button - Hide during print */}
        {!printing && (
          <button onClick={print} contentEditable="false" className="btn btn-success no-print w-100 mt-3">
            Print Resume
          </button>
        )}

      </div>
      {searching && (<div>
                <div className="d-flex justify-content-center align-items-center vh-100 vw-100 position-fixed top-0 start-0 bg-dark bg-opacity-75">
                    <Loader />
                </div>
            </div>)}
    </div>
  );
}

export default Resume;
