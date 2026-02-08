// Основное приложение

// Обновление счетчиков времени
function updateCounters() {
    const days = calculateDaysTogether();

    // Обновляем счетчик дней
    const daysCounter = document.getElementById('days-counter');
    const daysTogether = document.getElementById('days-together');
    if (daysCounter) daysCounter.textContent = days;
    if (daysTogether) daysTogether.textContent = days;

    // Рассчитываем часы, минуты, секунды
    const meetDate = new Date(SITE_DATA.meet_date);
    const now = new Date();
    const diffMs = now - meetDate;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor(diffMs / (1000 * 60));
    const seconds = Math.floor(diffMs / 1000);

    // Обновляем маленькие счетчики
    const hoursCounter = document.getElementById('hours-together');
    const minutesCounter = document.getElementById('minutes-together');
    const secondsCounter = document.getElementById('seconds-together');

    if (hoursCounter) hoursCounter.textContent = hours.toLocaleString();
    if (minutesCounter) minutesCounter.textContent = minutes.toLocaleString();
    if (secondsCounter) secondsCounter.textContent = seconds.toLocaleString();

    // Обновляем цитату (меняем каждые 10 секунд для демо)
    if (Math.random() > 0.95) {
        const quoteElement = document.getElementById('love-quote');
        if (quoteElement) {
            quoteElement.style.animation = 'fadeIn 0.5s ease';
            setTimeout(() => {
                quoteElement.style.animation = '';
            }, 500);
        }
    }
}

// Загрузка недавних воспоминаний
function loadRecentMemories() {
    const container = document.getElementById('recent-memories');
    if (!container) return;

    const memories = getRecentMemories();

    if (memories.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <div style="font-size: 50px; color: var(--primary); margin-bottom: 20px;">💭</div>
                <h3 style="color: var(--primary);">Скоро здесь появятся наши воспоминания!</h3>
                <p style="color: #666;">Каждый новый день с тобой — это новое прекрасное воспоминание ❤️</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    memories.forEach(memory => {
        const memoryDate = new Date(memory.date);
        const formattedDate = memoryDate.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const memoryElement = document.createElement('div');
        memoryElement.className = 'memory-item fade-in';
        memoryElement.innerHTML = `
            <div class="memory-date">
                <i class="fas fa-calendar-day"></i> ${formattedDate}
            </div>
            <h4>${memory.title}</h4>
            <p>${memory.description.substring(0, 100)}${memory.description.length > 100 ? '...' : ''}</p>
            ${memory.image ?
                `<img src="${memory.image}" alt="${memory.title}"
                      style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-top: 10px;">`
                : ''
            }
        `;

        // Добавляем анимацию появления
        memoryElement.style.animationDelay = `${memories.indexOf(memory) * 0.2}s`;

        container.appendChild(memoryElement);
    });
}

// Загрузка всех воспоминаний
function loadAllMemories() {
    const container = document.getElementById('all-memories');
    const noMemories = document.getElementById('no-memories');

    if (!container) return;

    const memories = getAllMemories();

    if (memories.length === 0) {
        if (noMemories) noMemories.style.display = 'block';
        container.style.display = 'none';
        return;
    }

    if (noMemories) noMemories.style.display = 'none';
    container.style.display = 'grid';
    container.innerHTML = '';

    memories.forEach((memory, index) => {
        const memoryDate = new Date(memory.date);
        const formattedDate = memoryDate.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const memoryElement = document.createElement('div');
        memoryElement.className = 'memory-card';
        memoryElement.style.animationDelay = `${index * 0.1}s`;
        memoryElement.style.animation = 'fadeIn 0.5s ease forwards';
        memoryElement.style.opacity = '0';

        memoryElement.innerHTML = `
            ${memory.image ?
                `<img src="${memory.image}" alt="${memory.title}" class="memory-image"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZmY0ZDhkIi8+PHRleHQgeD0iMjAwIiB5PSIxMjUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiPk91ciBNZW1vcnk8L3RleHQ+PC9zdmc+'">`
                : `<div style="height: 250px; background: linear-gradient(45deg, var(--primary), var(--secondary));
                            display: flex; align-items: center; justify-content: center; color: white; font-size: 60px;">
                    📷
                   </div>`
            }
            <div class="memory-content">
                <div class="memory-date">
                    <i class="fas fa-calendar-alt"></i> ${formattedDate}
                </div>
                <h3 class="memory-title">${memory.title}</h3>
                <p>${memory.description}</p>
            </div>
        `;

        container.appendChild(memoryElement);

        // Анимация появления
        setTimeout(() => {
            memoryElement.style.opacity = '1';
        }, index * 100);
    });
}

// Функция для получения случайного сообщения (публичная, вызывается из HTML)
window.getRandomMessage = function() {
    const messageElement = document.getElementById('random-message');
    if (!messageElement) return;

    const message = getRandomMessage();

    // Эффект появления
    messageElement.style.animation = 'none';
    setTimeout(() => {
        messageElement.innerHTML = `💝 <strong>${message}</strong>`;
        messageElement.style.animation = 'fadeIn 0.5s ease';
    }, 10);

    // Создаем плавающие сердечки
    createHeartExplosion(5);

    // Воспроизводим звук (если есть)
    playHeartSound();
};

// Воспроизведение звука сердечка
function playHeartSound() {
    try {
        // Создаем звуковой контекст
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Нота C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // Нота E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // Нота G5

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        // Если Web Audio API не поддерживается, ничего не делаем
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем имя в заголовке
    const titles = document.querySelectorAll('.logo, footer p');
    titles.forEach(title => {
        if (title.textContent.includes('Али')) {
            title.textContent = title.textContent.replace('Али', SITE_DATA.her_name);
        }
    });

    // Обновляем цитату
    const quoteElement = document.getElementById('love-quote');
    if (quoteElement) {
        quoteElement.textContent = SITE_DATA.love_quote;
    }

    // Запускаем анимацию сердечек при загрузке
    setTimeout(() => {
        createHeartExplosion(3);
    }, 1000);
});

// Экспортируем функции для использования в HTML
window.calculateDaysTogether = calculateDaysTogether;
window.getRandomMessage = getRandomMessage;
window.loadRecentMemories = loadRecentMemories;
window.loadAllMemories = loadAllMemories;
window.createHeartExplosion = createHeartExplosion;
window.createClickHeart = createClickHeart;