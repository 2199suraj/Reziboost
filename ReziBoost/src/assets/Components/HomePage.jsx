import React, { useEffect, useState } from 'react';
// import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import Loader from './ui/Loader1';
import Bot from './GenAI/Bot';
import Swal from 'sweetalert2';
import axios from 'axios';
// const genAI = new GoogleGenerativeAI("AIzaSyAezbFG1AA__6_bH3mR_qbT5zy3rc8EjMs");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
function notify(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
    });
}
function HomePage() {
    const [originalResume, setOriginalResume] = useState(null);
    const [jobDesc, setJobDesc] = useState(null);
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [jdFile, setJdFile] = useState(true);
    const [textJD, setTextJD] = useState("");

    async function handleFile(file, name) {
        const base64 = await convertToBase64(file);
        if (name === "originalResume") {
            setOriginalResume(base64);
        } else if (name === "jobDesc") {
            setJobDesc(base64);
        }
    }
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const url = `http://127.0.0.1:5134/reziboost/auth`;
                const response = await axios.get(url, { withCredentials: true });
            } catch (err) {
                console.log(err);
                notify("Error", "Please login to continue", "error");
                window.location.href = "/login";
            }
        };
    
        fetchAuth(); // Call the async function inside useEffect
    }, []); 

    function choseFileText(xyz) {
        setJdFile(xyz);
    }

    function format(jsonString) {
        const lines = jsonString?.trim().split("\n");
        if (lines?.length > 2) {
            return lines?.slice(1, -1).join("\n");
        }
        return "";
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result.split(",")[1]; 
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    };



    async function send() {
        setLoading(true);
        const resume = {
            inlineData: {
                data: originalResume,
                mimeType: "application/pdf",
            },
        };
        var result;
        if(jdFile && jobDesc){
        const jd = {
            inlineData: {
                data: jobDesc,
                mimeType: "application/pdf",
            },
        };

        result = await Bot(resume, jd);
        
    }
        else if(!jdFile && textJD){
        result = await Bot(resume, textJD);
            
        }else{
            alert("Please upload job description");
        }
        setOutput(format(result.response.text()));
        const json = JSON.parse(format(result.response.text()));
        localStorage.setItem("savedData", JSON.stringify(JSON.parse(format(result.response.text())).savingData));
        const response = await axios.post("http://127.0.0.1:5134/reziboost/saveData",JSON.parse(format(result.response.text())).savingData);
        localStorage.setItem("output", format(result.response.text()));
        console.log(result.response.text());
        window.location.href = "/resume"
    }

    return (
        <div className="container mt-5 mb-5 h-75">

            <h1 className="text-center mb-4">AI-Powered Resume Tailoring</h1>
            <div className="row">
                <div className="col-md-6">
                    <label className="form-label pb-2">Upload Original Resume (PDF)</label>
                    <input type="file" className="form-control" onChange={(e) => handleFile(e.target.files[0], "originalResume")} />
                    {originalResume && <iframe className="mt-3 border rounded w-100" src={`data:application/pdf;base64,${originalResume}`} height="300"></iframe>}
                </div>
                <div className="col-md-6">
                    <label className="form-label d-flex justify-content-between"><span>Upload Job Description (PDF)</span>
                        <span >
                            <span
                                id="file"
                                className={`px-3 py-1 d-inline-block rounded-start pointer ${jdFile ? "bg-primary text-white" : "bg-secondary text-white opacity-75"}`}
                                onClick={() => choseFileText(true)}
                            >
                                File
                            </span>
                            <span
                                id="text"
                                className={`px-3 py-1 d-inline-block rounded-end pointer ${!jdFile ? "bg-primary text-white" : "bg-secondary text-white opacity-75"}`}
                                onClick={() => choseFileText(false)}
                            >
                                Text
                            </span>
                        </span>


                    </label>
                    {
                        jdFile ? (<>
                            <input type="file" className="form-control" onChange={(e) => handleFile(e.target.files[0], "jobDesc")} />
                            {jobDesc && <iframe
                                className="mt-3 border rounded w-100"
                                src={`data:application/pdf;base64,${jobDesc}`}
                                height="300"
                            ></iframe>}
                        </>
                        ) : (
                            <textarea
                                className="form-control"
                                value={textJD}
                                onChange={(e) => setTextJD(e.target.value)}
                                placeholder="Paste Job Description here"
                                rows="5"
                            ></textarea>
                        )
                    }
                </div>
            </div>
            <div className="text-center mt-4">
                <button className="btn btn-primary px-4" onClick={send}>Generate Resume</button>
            </div>
            {output && (
                <div className="card mt-4">
                    <div className="card-header bg-dark text-white">Generated Resume</div>
                    <div className="card-body">
                        <pre className="text-wrap">{output}</pre>
                    </div>
                </div>
            )}
            {loading && (<div>
                <div className="d-flex justify-content-center align-items-center vh-100 vw-100 position-fixed top-0 start-0 bg-dark bg-opacity-75">
                    <Loader />
                </div>
            </div>)}
        </div>
    );
}

export default HomePage;
