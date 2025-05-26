"use client"
import { useEffect, useState } from "react";
import AdminUserProjectsModal from "../../components/admin-user-projects-modal";
import { Button } from "../../components/ui/button";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProjects, setShowProjects] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    // For demo: get token from localStorage or prompt
    let t = localStorage.getItem("admin_token");
    if (!t) {
      t = window.prompt("Enter admin token:");
      if (t) localStorage.setItem("admin_token", t);
    }
    setToken(t);
    if (t) {
      let base = "";
      if (typeof window !== "undefined") {
        if (window.location.hostname === "localhost") {
          base = "http://localhost:5004";
        } else {
          base = window.location.origin;
        }
      }
      fetch(`${base}/v1/admin/users`, {
        headers: { Authorization: `Bearer ${t}` },
      })
        .then((res) => res.json())
        .then(setUsers);
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-2 py-1">{user.name}</td>
              <td className="border px-2 py-1">{user.email}</td>
              <td className="border px-2 py-1">
                <Button onClick={() => setSelectedUser(user)}>Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && !showProjects && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <h2 className="text-xl font-bold mb-2">User Details</h2>
            <div>Name: {selectedUser.name}</div>
            <div>Email: {selectedUser.email}</div>
            <div className="mt-4 flex gap-2">
              <Button 
                style={{ border: '2px solid red', background: 'yellow', color: 'black' }}
                onClick={() => {
                  alert('See Projects button clicked!');
                  setShowProjects(true);
                }}
              >
                SEE PROJECTS (DEBUG)
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedUser(null);
                  setShowProjects(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      <AdminUserProjectsModal
        isOpen={showProjects}
        onClose={() => setShowProjects(false)}
        user={selectedUser}
        token={token}
      />
    </div>
  );
}
