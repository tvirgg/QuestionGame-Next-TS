"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "baseapi/config";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  name: string;
  password?: string;
}

const UsersAccounts: React.FC = () => {
  const { token, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Partial<User>>({});
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);

  const fetchUsers = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        console.warn("Token expired or invalid. Logging out...");
        logout();
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const createUser = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (response.status === 401) {
        console.warn("Token expired or invalid. Logging out...");
        logout();
        return;
      }

      if (response.ok) {
        fetchUsers();
        setNewUser({});
        alert("Пользователь успешно создан!");
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUser = async () => {
    if (!token || !selectedUser?.id) return;
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedUser),
      });

      if (response.status === 401) {
        console.warn("Token expired or invalid. Logging out...");
        logout();
        return;
      }

      if (response.ok) {
        fetchUsers();
        setSelectedUser(null);
        alert("Данные пользователя успешно обновлены!");
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id: string) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.warn("Token expired or invalid. Logging out...");
        logout();
        return;
      }

      if (response.ok) {
        fetchUsers();
        alert("Пользователь успешно удалён!");
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <div className="bg-[#FAF3DD] text-black p-6 rounded-lg shadow-lg text-center py-20">
      <h2 className="text-2xl font-bold mb-4">Управление пользователями</h2>
      <div className="flex flex-col space-y-4 items-center">
        <table className="table-auto w-2/3 border-collapse border border-gray-300 text-left text-sm">
          <thead>
            <tr className="bg-[#D4A373] text-white">
              <th className="p-2 border">Имя</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Роль</th>
              <th className="p-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">
                  <button
                    className="px-2 py-1 bg-[#D4A373] text-white rounded hover:bg-[#c99b6d] transition-colors duration-200 mr-2"
                    onClick={() => setSelectedUser(user)}
                  >
                    Редактировать
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                    onClick={() => deleteUser(user.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-2/3 space-y-4">
          <h3 className="text-xl font-bold">Создать нового пользователя</h3>
          <input
            type="text"
            placeholder="Имя"
            value={newUser.name || ""}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="p-2 rounded border w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email || ""}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="p-2 rounded border w-full"
          />
          <input
            type="text"
            placeholder="Роль"
            value={newUser.role || ""}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="p-2 rounded border w-full"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={newUser.password || ""}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="p-2 rounded border w-full"
          />
          <button
            onClick={createUser}
            className="w-full bg-[#D4A373] text-white py-2 rounded hover:bg-[#c99b6d] transition-colors duration-200"
          >
            Создать пользователя
          </button>
        </div>

        {selectedUser && (
          <div className="w-2/3 space-y-4">
            <h3 className="text-xl font-bold">Редактировать пользователя</h3>
            <input
              type="text"
              placeholder="Имя"
              value={selectedUser.name || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              className="p-2 rounded border w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={selectedUser.email || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              className="p-2 rounded border w-full"
            />
            <input
              type="text"
              placeholder="Роль"
              value={selectedUser.role || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
              className="p-2 rounded border w-full"
            />
            <button
              onClick={updateUser}
              className="w-full bg-[#D4A373] text-white py-2 rounded hover:bg-[#c99b6d] transition-colors duration-200"
            >
              Сохранить изменения
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersAccounts;
