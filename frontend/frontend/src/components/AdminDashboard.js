import React, { useState, useEffect } from "react";
import API from "../services/api";

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ question: "", options: ["", "", "", ""], correctAnswer: "" });

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await API.get("http://localhost:5000/api/admin/questions");
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post("http://localhost:5000/api/admin/questions", form);
    window.location.reload();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Question"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
        />
        {form.options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) =>
              setForm({
                ...form,
                options: form.options.map((opt, idx) =>
                  idx === index ? e.target.value : opt
                ),
              })
            }
          />
        ))}
        <input
          type="text"
          placeholder="Correct Answer"
          value={form.correctAnswer}
          onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
        />
        <button type="submit">Create Question</button>
      </form>
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            {q.question} - Correct: {q.correctAnswer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
