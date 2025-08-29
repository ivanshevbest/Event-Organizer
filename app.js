// Получаем элементы DOM
const calendarBody = document.getElementById("calendarBody");
const eventsContainer = document.getElementById("eventsContainer");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const currentMonthElement = document.getElementById("currentMonth");

let currentDate = new Date();
let events = [];
function addEvent(eventData) {
    const selectedDate = new Date(eventData.date);
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    // Найти ячейку с выбранным числом
    const cells = document.querySelectorAll('#calendarTable td');
    cells.forEach(cell => {
        if (cell.textContent === day.toString()) {
            // Добавить событие под числом
            cell.innerHTML += `<div class="event">${eventData.time}<br>${eventData.description}</div>`;
        }
    });
}

// Функция для отображения календаря
function displayCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    // Очищаем календарь
    calendarBody.innerHTML = "";
    
    function addEvent(eventData) {
    const selectedDate = new Date(eventData.date);
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    // Найти ячейку с выбранным числом
    const cells = document.querySelectorAll('#calendarTable td');
    cells.forEach(cell => {
        if (cell.textContent === day.toString()) {
            // Добавить событие под числом
            cell.innerHTML += `<div class="event">${eventData.time}<br>${eventData.description}</div>`;
        }
    });
}

function getAccessToken(code) {
  const tokenConfig = {
    code: code,
    redirect_uri: 'YOUR_REDIRECT_URI',
    scope: 'calendar'
  };

  oauth2.authorizationCode.getToken(tokenConfig)
    .then(function(result) {
      const accessToken = oauth2.accessToken.create(result);
      // Сохраните accessToken для дальнейшего использования
    })
    .catch(function(error) {
      console.error('Получение токена доступа завершилось ошибкой:', error.message);
    });
}

function getEvents(accessToken) {
  const url = 'https://api.calendar.yandex.net/v1/events/';
  const headers = {
    Authorization: `Bearer ${accessToken.token.access_token}`
  };

  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      // Обработка полученных событий
      console.log(data);
    })
    .catch(error => {
      console.error('Ошибка при получении событий:', error);
    });
}
const date = new Date();
const dayOfWeek = date.getDay(); // 0 - воскресенье, 1 - понедельник, и т.д.



    // Заполняем календарь
    let day = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            if (i === 0 && j < startDay || day > daysInMonth) {
                cell.textContent = "";
            } else {
                cell.textContent = day;
                cell.addEventListener("click", () => {
                    selectDate(day);
                });
                day++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }

    // Обновляем заголовок месяца
    currentMonthElement.textContent = `${new Date(year, month).toLocaleString('ru', { month: 'long' })} ${year}`;
}

// Выбор даты
function selectDate(day) {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const eventDescription = prompt("Введите описание события:");
    if (eventDescription) {
        const eventTime = prompt("Введите время события (HH:MM):");
        if (eventTime) {
            const newEvent = {
                id: generateUniqueID(),
                date: selectedDate.toLocaleDateString(),
                time: eventTime,
                description: eventDescription
            };
            addEvent(newEvent);
        }
    }
}

// Добавление события
function addEvent(eventData) {
    const li = document.createElement("li");
    li.className = "event-item";
    li.innerHTML = `
        Дата: ${eventData.date}<br>
        Время: ${eventData.time}<br>
        Описание: ${eventData.description}<br>
        <span class="delete-event" onclick="deleteEvent(${eventData.id})">Удалить</span>
    `;
    eventsContainer.appendChild(li);
    events.push(eventData); // Сохраняем в массив событий
}

// Удаление события
function deleteEvent(id) {
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
        events.splice(index, 1);
        updateEventsList(); // Перерисовываем список
    }
}

// Обновляет список событий
function updateEventsList() {
    eventsContainer.innerHTML = "";
    events.forEach((event) => {
        addEvent(event);
    });
}

// Генерируем уникальный ID для каждого события
function generateUniqueID() {
    return Math.random().toString(36).substr(2, 9);
}

// Обработка нажатия кнопок "Предыдущий месяц" и "Следующий месяц"
prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    displayCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    displayCalendar();
});

// Инициализация календаря
displayCalendar();
