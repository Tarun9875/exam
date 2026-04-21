import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Warmup backend (VERY IMPORTANT)
  useEffect(() => {
    axios.get(API_URL)
      .then(() => console.log("Server Warmed 🔥"))
      .catch(() => console.log("Warmup failed"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/submit`, form, {
        timeout: 10000
      });

      alert("✅ Data Saved Successfully!");

      setForm({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {
      alert("❌ Error or Server Slow (try again)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>React Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br /><br />

        <textarea
          name="message"
          placeholder="Enter Message"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea><br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "⏳ Submitting..." : "Submit"}
        </button>
      </form>

      {/* ✅ UX Message */}
      {loading && <p>🚀 Connecting to server...</p>}
    </div>
  );
}

export default App;