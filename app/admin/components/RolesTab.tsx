"use client";
import React, { useState } from 'react';
import Modal from './Modal';
import {
    XIcon,
    PlusIcon,
    PencilAltIcon,
    TrashIcon,
    CheckIcon,
} from '@heroicons/react/outline'; // Ensure you have these icons installed

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

    // States for validation errors
    const [errors, setErrors] = useState({
        name: '',
        permissions: '',
    });

    const openEditModal = (role: Role) => {
        setCurrentRole(role);
        setErrors({
            name: '',
            permissions: '',
        });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setCurrentRole(null);
        setNewRole({
            id: roles.length + 1,
            name: '',
            permissions: []
        });
        setErrors({
            name: '',
            permissions: '',
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        const roleToSave = currentRole ? currentRole : newRole;

        // Validation
        const newErrors = {
            name: '',
            permissions: '',
        };
        let isValid = true;

        if (!roleToSave.name.trim()) {
            newErrors.name = 'Пожалуйста, укажите название роли.';
            isValid = false;
        }

        if (roleToSave.permissions.length === 0) {
            newErrors.permissions = 'Пожалуйста, выберите хотя бы одно право.';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            return;
        }

        if (currentRole) {
            // Update existing role
            setRoles(roles.map(role => role.id === currentRole.id ? roleToSave : role));
        } else {
            // Add new role
            setRoles([...roles, roleToSave]);
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

    // Handler to delete a role
    const handleDeleteRole = (roleId: number) => {
        if (confirm('Вы уверены, что хотите удалить эту роль?')) {
            setRoles(roles.filter(role => role.id !== roleId));
        }
    };

    return (
        <div className="bg-[#FAF3DD] text-black p-6 rounded-lg shadow-lg p-20">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Роли</h2>
                <button
                    className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 flex items-center"
                    onClick={openAddModal}
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Добавить роль
                </button>
            </div>
            <div className="overflow-x-auto">
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
                                    <div className="flex justify-center space-x-2">
                                        {/* Edit Button */}
                                        <button
                                            onClick={() => openEditModal(role)}
                                            className="text-blue-500 hover:text-blue-700 p-2 rounded transition-colors duration-200"
                                            aria-label="Редактировать"
                                            title="Редактировать"
                                        >
                                            <PencilAltIcon className="h-5 w-5" />
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteRole(role.id)}
                                            className="text-red-500 hover:text-red-700 p-2 rounded transition-colors duration-200"
                                            aria-label="Удалить"
                                            title="Удалить"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Модальное окно для добавления/редактирования роли */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="m-20">
                        <h2 className="text-2xl font-bold mb-4 text-center w-[500px]">
                            {currentRole ? 'Редактирование роли' : 'Добавление роли'}
                        </h2>
                        <div className="flex flex-col space-y-4">
                            {/* Название роли */}
                            <div className="flex flex-col">
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
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.name ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Права */}
                            <div className="flex flex-col">
                                <span className="font-medium mb-2">Права:</span>
                                <div className="flex flex-wrap gap-2">
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
                                                className="mr-2 h-8 w-8"
                                            />
                                            {permission}
                                        </label>
                                    ))}
                                </div>
                                {errors.permissions && (
                                    <p className="text-red-500 text-sm mt-1">{errors.permissions}</p>
                                )}
                            </div>

                            {/* Кнопка сохранения */}
                            <button
                                className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 flex items-center justify-center"
                                onClick={handleSave}
                            >
                                <CheckIcon className="h-5 w-5 mr-2" />
                                {currentRole ? 'Сохранить изменения' : 'Добавить роль'}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )};

    export default RolesTab;
