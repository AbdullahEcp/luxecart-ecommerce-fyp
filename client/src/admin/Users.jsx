import { useEffect, useState } from "react";
import { Users as UsersIcon } from "lucide-react";
import API from "../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/admin/users");
        setUsers(data);
      } catch (error) {
        alert("Users loading failed");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-black">Users</h1>
      <p className="text-slate-500 mt-2">All registered users.</p>

      <div className="card p-5 mt-8 overflow-x-auto">
        {users.length === 0 ? (
          <div className="text-center p-10">
            <UsersIcon className="mx-auto text-orange-500" size={60} />
            <h2 className="text-2xl font-black mt-4">No users found</h2>
          </div>
        ) : (
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Created</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-black">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-4 py-1 rounded-full font-bold ${
                        user.role === "admin"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}