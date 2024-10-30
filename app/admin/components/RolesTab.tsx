
"use client";
import React, { useState } from 'react';
import Modal from './Modal';

interface Role {
    id: number;
    name: string;
    permissions: string[];
}

const RolesTab: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([
        { id: 1, name: 'Администратор', permissions: ['Все права'] },
        { id: 2, name: 'Кассир', permissions: ['Приём оплаты', 'Проверка оплаты'] },
        { id: 3, name: 'Официант', permissions: ['Получение вызовов'] },
    ]);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentRole, setCurrentRole] = useState<Role | null>(null);
    const [newRole, setNewRole] = useState<Role>({
        id: roles.length + 1,
        name: '',
        permissions: []
    });

    const openEditModal = (role: Role) => {
        setCurrentRole(role);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setCurrentRole(null);
        setNewRole({
            id: roles.length + 1,
            name: '',
            permissions: []
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (currentRole) {
            setRoles(roles.map(role => role.id === currentRole.id ? currentRole : role));
        } else {
            setRoles([...roles, newRole]);
        }
        setIsModalOpen(false);
    };

    const togglePermission = (permission: string) => {
        if (currentRole) {
            const hasPermission = currentRole.permissions.includes(permission);
            const updatedPermissions = hasPermission
                ? currentRole.permissions.filter(p => p !== permission)
                : [...currentRole.permissions, permission];
            setCurrentRole({ ...currentRole, permissions: updatedPermissions });
        } else {
            const hasPermission = newRole.permissions.includes(permission);
            const updatedPermissions = hasPermission
                ? newRole.permissions.filter(p => p !== permission)
                : [...newRole.permissions, permission];
            setNewRole({ ...newRole, permissions: updatedPermissions });
        }
    };

    const allPermissions = ['Все права', 'Приём оплаты', 'Проверка оплаты', 'Получение вызовов'];

    return (
        <div className="bg-[#FAF3DD] text-black p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Роли</h2>
                <button
                    className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                    onClick={openAddModal}
                >
                    Добавить роль
                </button>
            </div>
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Роль</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Права</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role, index) => (
                        <tr
                            key={role.id}
                            className={`${
                                index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5E1]'
                            } hover:bg-gray-200 transition-colors duration-200`}
                        >
                            <td className="border px-4 py-3 text-center">{role.name}</td>
                            <td className="border px-4 py-3 text-center">{role.permissions.join(', ')}</td>
                            <td className="border px-4 py-3 text-center">
                                <button
                                    className="bg-[#D4A373] text-white px-3 py-1 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                                    onClick={() => openEditModal(role)}
                                >
                                    Редактировать
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Модальное окно для добавления/редактирования роли */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-4 text-center">{currentRole ? 'Редактирование роли' : 'Добавление роли'}</h2>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="Название роли"
                            value={currentRole ? currentRole.name : newRole.name}
                            onChange={(e) => {
                                if (currentRole) {
                                    setCurrentRole({ ...currentRole, name: e.target.value });
                                } else {
                                    setNewRole({ ...newRole, name: e.target.value });
                                }
                            }}
                            className="p-2 rounded border"
                        />
                        <div className="permissions flex flex-col space-y-2">
                            <span>Права:</span>
                            {allPermissions.map((permission) => (
                                <label key={permission} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={
                                            currentRole
                                                ? currentRole.permissions.includes(permission)
                                                : newRole.permissions.includes(permission)
                                        }
                                        onChange={() => togglePermission(permission)}
                                        className="mr-2"
                                    />
                                    {permission}
                                </label>
                            ))}
                        </div>
                        <button
                            className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                            onClick={handleSave}
                        >
                            {currentRole ? 'Сохранить изменения' : 'Добавить роль'}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default RolesTab;
