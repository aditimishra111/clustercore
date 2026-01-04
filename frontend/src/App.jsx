import { useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [projects, setProjects] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");

  // 🔁 AUTO LOAD when studentId changes
  useEffect(() => {
    if (!studentId) return;

    const fetchResume = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/resume/${studentId}`
        );

        if (res.data) {
          setName(res.data.name || "");
          setEmail(res.data.email || "");
          setPhone(res.data.phone || "");
          setEducation(res.data.education || "");
          setProjects(res.data.projects || "");
          setSkills(res.data.skills?.join(", ") || "");
          setMessage("Resume loaded automatically ✅");
        } else {
          setMessage("New resume ✍️");
        }
      } catch {
        setMessage("New resume ✍️");
      }
    };

    fetchResume();
  }, [studentId]);

  // SAVE / UPDATE
  const saveResume = async () => {
    try {
      await axios.post("http://localhost:5000/api/resume/save", {
        studentId,
        data: {
          name,
          email,
          phone,
          education,
          projects,
          skills: skills.split(",").map((s) => s.trim())
        }
      });
      setMessage("Resume saved successfully ✅");
    } catch (err) {
      console.error(err);
      setMessage("Error saving resume ❌");
    }
  };

  // PDF DOWNLOAD
  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("resume.pdf");
  };

  return (
    <div className="container">
      {/* FORM */}
      <div className="card">
        <h2>Resume Builder</h2>

        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <input placeholder="Name" value={name}
          onChange={(e) => setName(e.target.value)} />

        <input placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <input placeholder="Phone" value={phone}
          onChange={(e) => setPhone(e.target.value)} />

        <input placeholder="Education" value={education}
          onChange={(e) => setEducation(e.target.value)} />

        <input placeholder="Projects" value={projects}
          onChange={(e) => setProjects(e.target.value)} />

        <input placeholder="Skills (comma separated)" value={skills}
          onChange={(e) => setSkills(e.target.value)} />

        <button className="save" onClick={saveResume}>Save</button>
        <button className="pdf" onClick={downloadPDF}>PDF</button>

        <p>{message}</p>
      </div>

      {/* PREVIEW */}
      <div className="preview" id="resume-preview">
        <h2>{name}</h2>
        <p>{email} | {phone}</p>

        <h4>Education</h4>
        <p>{education}</p>

        <h4>Projects</h4>
        <p>{projects}</p>

        <h4>Skills</h4>
        <p>{skills}</p>
      </div>
    </div>
  );
}

export default App;
