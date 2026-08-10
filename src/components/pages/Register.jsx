import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "", studentId: "", email: "", hallName: "", block: "", room: "", password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 8) {
      setError("Password must have at least 8 characters.");
      return;
    }
    // TODO: replace with real API call (POST /api/students/register)
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <Card className="w-[440px] p-9">
        <h1 className="text-xl font-bold mb-1">Create a student account</h1>
        <p className="text-sm text-gray-500 mb-5">Register with your university details.</p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Full name" value={form.fullName} onChange={update("fullName")} placeholder="Rafi Sikder" required />
            <Input label="Student ID" value={form.studentId} onChange={update("studentId")} placeholder="2021-CSE-041" required />
          </div>
          <Input label="University email" type="email" value={form.email} onChange={update("email")} placeholder="rafi@university.edu" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Hall name" value={form.hallName} onChange={update("hallName")} placeholder="Sadhinota Hall" required />
            <Input label="Block" value={form.block} onChange={update("block")} placeholder="Block A" required />
          </div>
          <Input label="Room number" value={form.room} onChange={update("room")} placeholder="214" required />
          <Input label="Password" type="password" value={form.password} onChange={update("password")} placeholder="At least 8 characters" required />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <Button type="submit" className="w-full">Register</Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already registered? <Link to="/login" className="font-semibold text-sky-700">Log in</Link>
        </p>
      </Card>
    </div>
  );
}