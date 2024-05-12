document.addEventListener('DOMContentLoaded', function() {
    const URL = 'https://jsonplaceholder.typicode.com/users';
    const userList = document.getElementById('userList');

    // CREATE - ЗАПРОС PUT
    const inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('placeholder', 'Введите имя');

    const inputEmail = document.createElement('input');
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('placeholder', 'Введите email');

    const addButton = document.createElement('button');
    addButton.textContent = 'Добавить пользователя';
    addButton.className = 'add-button';
    addButton.onclick = function() {
        const newUser = {
            name: inputName.value,
            email: inputEmail.value
        };

        // Проверяем заполнение полей
        if (!newUser.name || !newUser.email) {
            alert('Заполните все поля!');
            return;
        }

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Новый пользователь добавлен:', data);
            // Добавляем карточку для нового пользователя
            const newCard = createUserCard(data);
            userList.insertBefore(newCard, userList.firstChild);

            // Очищаем поля ввода после добавления пользователя
            inputName.value = '';
            inputEmail.value = '';
        })
        .catch(error => console.error('Ошибка:', error));
    };

    // Создаем контейнер для инпутов добавления пользователя
    const addUserInputsContainer = document.createElement('div');
    addUserInputsContainer.className = 'add-user';
    addUserInputsContainer.appendChild(inputName);
    addUserInputsContainer.appendChild(inputEmail);
    addUserInputsContainer.appendChild(addButton);

    // Добавляем контейнер с инпутами перед списком пользователей
    userList.parentNode.insertBefore(addUserInputsContainer, userList);

    
    function createUserCard(user) {
        const card = document.createElement('div');
        card.className = 'user-card';

        const img = document.createElement('img');
        img.src = './assets/user-circle-svgrepo-com.svg'; // Используем SVG по умолчанию
        img.alt = 'User Photo';

        const info = document.createElement('div');
        info.className = 'user-info';
        info.textContent = `${user.name} (${user.username}) - ${user.email}`;


        //DELETE - ЗАПРОС DELETE
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            // Имитация DELETE запроса
            fetch(`${URL}/${user.id}`, { method: 'DELETE' })
                .then(() => {
                    // Удаление карточки из DOM
                    userList.removeChild(card);
                })
                .catch(error => console.error('Ошибка:', error));
        };

        //UPDATE - ЗАПРОС POST
        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.className = 'edit-button';
        editButton.onclick = function() {
            const newName = prompt('Введите новое имя пользователя:', user.name);
            const newEmail = prompt('Введите новый email пользователя:', user.email);

            if (newName !== null && newEmail !== null) {
                const updatedUser = {
                    name: newName,
                    email: newEmail
                };

                fetch(`${URL}/${user.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updatedUser),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    // Обновляем данные пользователя на карточке
                    info.textContent = `${data.name} (${data.username}) - ${data.email}`;
                })
                .catch(error => console.error('Ошибка:', error));
            }
        };

        card.appendChild(img);
        card.appendChild(info);
        card.appendChild(deleteButton);
        card.appendChild(editButton);

        return card;
    }

    // Получаем список пользователей
    fetch(URL)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const card = createUserCard(user);
                userList.appendChild(card);
            });
        })
        .catch(error => console.error('Ошибка:', error));
});









