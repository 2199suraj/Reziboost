import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyAezbFG1AA__6_bH3mR_qbT5zy3rc8EjMs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function Bot(resume, jd) {
  const prompt = `{prompt: "Extract the data from this resume and job description and tailer the given data for this specific job description and give the tailored resume in a json format with given blueprint.Add the sections that are not directly specified in the blueprint in Extras. Respond nothing else than a json object with the given blueprint.",
    blueprint: {Name,Position(if doesnt exist then create), LinkedIn,GitHub,Email,Mobile,Summary,Education:[{degree,college,duration,location}...],Projects:[{title,subtitle,desc:[]}...],Experiences:[{title,comp,desc:[],duration,onlineoroffline}...],Skills:[{title,content}...],Certificates:[{title,comp, date,desc:[]}],Extras:[{title, content:[{contitle, consubtitle(if exists),timerange(date/duration/onlineoroffline/location),desc:[]}]}], savingData:{name, email, location, gender(determine from name), education(UG/PG),mobile_num, experience (less than 2y/greater than 2y), college, position}}}`;

  return await model.generateContent([prompt, resume, jd]);
}

export default Bot;

// email, position, college name, education, mobile number, age, experience, gender, industry, location

//email, location, gender, education(UG/PG),mobile num, age, experience (>2y or <2y), college, position, 

