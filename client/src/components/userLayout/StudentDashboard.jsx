import React, { useState, useEffect } from "react";

const StudentDashboard = () => {

  const [userProfile, setUserProfile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");
  const [activeTab, setActiveTab] = useState("subjects");

  // ================= SUBJECT DATA =================
  const courseSubjects = {
    "Master of Computer Application": {
      "Semester 1": [
        { code: "MCA101", name: "Programming in C", credits: 4, type: "Theory" },
        { code: "MCA102", name: "Discrete Mathematics", credits: 4, type: "Theory" },
        { code: "MCA103", name: "Computer Organization", credits: 3, type: "Theory" },
        { code: "MCA104", name: "Digital Electronics", credits: 3, type: "Theory" },
        { code: "MCA105", name: "C Programming Lab", credits: 2, type: "Practical" }
      ],
      "Semester 2": [
        { code: "MCA201", name: "Data Structures", credits: 4, type: "Theory" },
        { code: "MCA202", name: "Object Oriented Programming", credits: 4, type: "Theory" },
        { code: "MCA203", name: "Database Management Systems", credits: 4, type: "Theory" },
        { code: "MCA204", name: "Operating Systems", credits: 3, type: "Theory" },
        { code: "MCA205", name: "Data Structures Lab", credits: 2, type: "Practical" }
      ]
    }
  };

  // ================= MOCK GRADES =================
  const mockGrades = [
    { subjectCode: "MCA101", subjectName: "Programming in C", grade: "A+", credits: 4, semester: "Semester 1" },
    { subjectCode: "MCA102", subjectName: "Discrete Mathematics", grade: "A", credits: 4, semester: "Semester 1" },
    { subjectCode: "MCA201", subjectName: "Data Structures", grade: "A", credits: 4, semester: "Semester 2" }
  ];

  // ================= FETCH PROFILE =================
  const fetchUserProfile = async () => {

    setLoading(true);
    setError(null);

    try {

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) throw new Error("Failed to fetch user profile");

      const data = await response.json();

      setUserProfile(data.user);

      if (data.user.course && courseSubjects[data.user.course]) {
        setSubjects(courseSubjects[data.user.course][selectedSemester] || []);
      }

      setGrades(mockGrades);

    } catch (err) {

      console.error("Error fetching user profile:", err);
      setError(err.message);

    } finally {

      setLoading(false);

    }
  };

  // ================= LOAD PROFILE =================
  useEffect(() => {
    fetchUserProfile();
  }, [selectedSemester]);

  // ================= SEMESTER CHANGE =================
  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);

    if (userProfile?.course && courseSubjects[userProfile.course]) {
      setSubjects(courseSubjects[userProfile.course][semester] || []);
    }
  };

  // ================= GPA CALCULATION =================
  const calculateGPA = () => {

    if (grades.length === 0) return "N/A";

    const gradePoints = {
      "A+": 10,
      A: 9,
      "B+": 8,
      B: 7,
      "C+": 6,
      C: 5,
      D: 4,
      F: 0
    };

    let totalCredits = 0;
    let totalPoints = 0;

    grades.forEach((grade) => {
      const points = gradePoints[grade.grade] || 0;
      totalPoints += points * grade.credits;
      totalCredits += grade.credits;
    });

    return totalCredits > 0
      ? (totalPoints / totalCredits).toFixed(2)
      : "0.00";
  };

  const getAvailableSemesters = () => {

    if (!userProfile?.course || !courseSubjects[userProfile.course]) {
      return ["Semester 1"];
    }

    return Object.keys(courseSubjects[userProfile.course]);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h3>Loading Student Dashboard...</h3>
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h3>Error: {error}</h3>

        <button
          onClick={fetchUserProfile}
          style={{
            padding: "10px 20px",
            background: "#667eea",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div style={{ padding: "40px" }}>

      <h2>Student Dashboard</h2>

      {userProfile && (
        <div style={{ marginBottom: "30px" }}>
          <h3>{userProfile.name}</h3>
          <p>{userProfile.email}</p>
          <p>{userProfile.course}</p>
          <p>Result: {userProfile.result || "Not Available"}</p>
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        {getAvailableSemesters().map((semester) => (
          <button
            key={semester}
            onClick={() => handleSemesterChange(semester)}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          >
            {semester}
          </button>
        ))}
      </div>

      <h3>Subjects</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((sub, i) => (
            <tr key={i}>
              <td>{sub.code}</td>
              <td>{sub.name}</td>
              <td>{sub.credits}</td>
              <td>{sub.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "40px" }}>Grades</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Semester</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {grades.map((g, i) => (
            <tr key={i}>
              <td>{g.subjectName}</td>
              <td>{g.semester}</td>
              <td>{g.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "30px" }}>GPA: {calculateGPA()}</h3>

    </div>
  );
};

export default StudentDashboard;