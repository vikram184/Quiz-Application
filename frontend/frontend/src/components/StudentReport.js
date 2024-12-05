import React, { useEffect, useState } from "react";
import API from "../api/axios";

const StudentReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await API.get("http://localhost:5000/api/admin/reports");
        setReports(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h3>Student Reports</h3>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report.studentId.name}</td>
              <td>{report.studentId.email}</td>
              <td>{report.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentReport;
