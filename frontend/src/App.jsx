import { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function App() {
  const studentId = "123"; // demo student id
  const resumeRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    projects: ""
  });

  const [resume, setResume] = useState(null);

  // SAVE RESUME
  const saveResume = async () => {
    try {
      await axios.post("http://localhost:5000/api/resume/save", {
        studentId,
        data: {
          ...form,
          skills: form.skills.split(",")
        }
      });

      alert("Resume saved successfully");
      fetchResume();
    } catch (err) {
      console.error(err);
      alert("Error saving resume");
    }
  };

  // FETCH RESUME
  const fetchResume = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/resume/${studentId}`
    );
    setResume(res.data);
  };

  // FETCH ON PAGE LOAD
  useEffect(() => {
    fetchResume();
  }, []);

  // DOWNLOAD PDF
  const downloadPDF = async () => {
    if (!resumeRef.current) {
      alert("Resume not loaded yet");
      return;
    }

    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Resume Builder</h2>

      {/* FORM */}
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      /><br />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      /><br />

      <input
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      /><br />

      <input
        placeholder="Skills (comma separated)"
        onChange={(e) => setForm({ ...form, skills: e.target.value })}
      /><br />

      <input
        placeholder="Education"
        onChange={(e) => setForm({ ...form, education: e.target.value })}
      /><br />

      <input
        placeholder="Projects"
        onChange={(e) => setForm({ ...form, projects: e.target.value })}
      /><br /><br />

      <button onClick={saveResume}>Save Resume</button>

      <br /><br />

      {/* DOWNLOAD BUTTON */}
      {resume && <button onClick={downloadPDF}>Download PDF</button>}

      {/* RESUME TEMPLATE */}
      {resume && (
        <div
          ref={resumeRef}
          style={{
            marginTop: "30px",
            padding: "20px",
            width: "210mm",
            background: "white",
            color: "black",
            border: "1px solid black"
          }}
        >
          <h1>{resume.name}</h1>
          <p><b>Email:</b> {resume.email}</p>
          <p><b>Phone:</b> {resume.phone}</p>

          <h3>Skills</h3>
          <ul>
            {resume.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>

          <h3>Education</h3>
          <p>{resume.education}</p>

          <h3>Projects</h3>
          <p>{resume.projects}</p>
        </div>
      )}
    </div>
  );
}

export default App;
