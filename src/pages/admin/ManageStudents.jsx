import { useApp } from "../../../context/AppContext";
import Layout from "../../Layout";
import Card from "../../ui/Card";

export default function ManageStudents() {
  const { students, complaints, toggleBlockUser } = useApp();

  const complaintCount = (studentId) => complaints.filter((c) => c.studentId === studentId).length;

  return (
    <Layout title="Manage students" subtitle="View registered students and their complaint activity">
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-500 uppercase bg-gray-50">
              <th className="text-left px-4 py-2.5">Student ID</th>
              <th className="text-left px-4 py-2.5">Name</th>
              <th className="text-left px-4 py-2.5">Complaints filed</th>
              <th className="text-left px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-mono font-bold">{s.id}</td>
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3">{complaintCount(s.id)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                    s.blocked ? "bg-red-50 text-red-600" : "bg-teal-50 text-teal-600"
                  }`}>
                    {s.blocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleBlockUser(s.id)}
                    className={`text-xs border rounded-lg px-3 py-1.5 ${
                      s.blocked
                        ? "border-teal-200 text-teal-600 hover:bg-teal-50"
                        : "border-red-200 text-red-600 hover:bg-red-50"
                    }`}
                  >
                    {s.blocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Layout>
  );
}