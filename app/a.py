import os

# Текущая директория
current_directory = os.getcwd()

# Имя выходного файла
output_file = 'selected_components_code.txt'

# Список нужных файлов с их относительными путями от корневой директории
needed_files = [
    './admin/components/AdminMain.tsx',
    './admin/components/CreateGame.tsx',
    './admin/components/CreateVenue.tsx',
    './admin/components/TeamsTab.tsx',
    './admin/components/Users.tsx',
    './admin/components/RolesTab.tsx',
    './admin/components/PaymentsTab.tsx',
    './admin/components/ScoreCountingTab.tsx',
    './components/TeamResultTable.tsx',
    './components/TeamRatingTable.tsx',
    './components/UsersTable.tsx',
    # Добавьте сюда другие файлы, которые вам нужны
]

# Открываем файл для записи
with open(output_file, 'w', encoding='utf-8') as output:
    for file_relative_path in needed_files:
        # Полный путь к файлу
        file_path = os.path.join(current_directory, file_relative_path)
        # Проверяем, существует ли файл
        if os.path.isfile(file_path):
            # Получаем только имя файла
            filename = os.path.basename(file_path)
            # Записываем название файла в выходной файл
            output.write(f'File: {filename}\n')
            # Открываем файл и записываем его содержимое
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    code = file.read()
                    output.write(code + '\n\n')  # Добавляем пустую строку между файлами
            except Exception as e:
                output.write(f'Не удалось прочитать файл {filename}: {e}\n\n')
        else:
            output.write(f'Файл не найден: {file_relative_path}\n\n')

print(f'Код выбранных компонентов записан в {output_file}')
