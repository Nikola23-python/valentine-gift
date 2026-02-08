// Инициализация ночной темы
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

    // Запускаем звездную анимацию
    setTimeout(() => {
        createStarExplosionEffect(5, window.innerWidth / 2, 100);
        createMeteorShower(2);
    }, 1000);

    // Создаем звезды
    setTimeout(createStars, 500);

    // Обновляем счетчики сразу
    updateCounters();
    updateStatisticsCounters();

    // Загружаем воспоминания если есть контейнер
    if (document.getElementById('recent-memories')) {
        loadRecentMemories();
    }
    if (document.getElementById('all-memories')) {
        loadAllMemories();
    }

    // Создаем звезды при клике
    document.addEventListener('click', function(e) {
        if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && e.target.id !== 'secret-password') {
            createClickStar(e.clientX, e.clientY);
            playStarSound();
        }
    });

    // Анимация появления элементов
    const animatedElements = document.querySelectorAll('.card, .memory-item, .counter-card');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('fade-in-up');
    });
});

// Звук звезды
function playStarSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Звездный звук - высокие ноты
        oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime); // C6
        oscillator.frequency.setValueAtTime(1318.51, audioContext.currentTime + 0.05); // E6
        oscillator.frequency.setValueAtTime(1567.98, audioContext.currentTime + 0.1); // G6

        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    } catch (e) {
        // Если Web Audio API не поддерживается, ничего не делаем
    }
}

// Функция для получения случайного сообщения (обновленная)
window.getRandomMessage = function() {
    const messageElement = document.getElementById('random-message');
    if (!messageElement) return;

    const message = getRandomMessage();

    // Эффект появления
    messageElement.style.animation = 'none';
    setTimeout(() => {
        messageElement.innerHTML = `✨ <strong>${message}</strong> ✨`;
        messageElement.style.animation = 'fadeInUp 0.5s ease';
    }, 10);

    // Создаем взрыв звезд
    createStarExplosionEffect(8);

    // Проигрываем звук
    playStarSound();
};

// Счётчик дней
function calculateDaysTogether() {
    const meetDate = new Date(SITE_DATA.meet_date);
    const now = new Date();

    // Разница в миллисекундах
    const diffTime = Math.abs(now - meetDate);

    // Разница в днях
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

// Обновление счётчиков
function updateCounters() {
    const days = calculateDaysTogether();
    const daysElement = document.getElementById('days-counter');
    if (daysElement) {
        daysElement.textContent = days;
    }
}

// Функция для загрузки воспоминаний (если её нет)
function getRecentMemories() {
    return SITE_DATA.memories.slice(0, 3); // Первые 3 воспоминания
}

// Функция для загрузки всех воспоминаний
function loadAllMemories() {
    const container = document.getElementById('all-memories');
    const emptyState = document.getElementById('no-memories');

    if (!container) return;

    const memories = SITE_DATA.memories;

    if (memories.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = memories.map(memory => `
        <div class="memory-item">
            <div class="memory-date">
                <i class="fas fa-calendar-day"></i>
                ${new Date(memory.date).toLocaleDateString('ru-RU')}
            </div>
            <h3 style="color: var(--white); margin-bottom: 10px;">${memory.title}</h3>
            <p style="color: var(--silver);">${memory.description}</p>
        </div>
    `).join('');
}


// Обновление счетчиков статистики
function updateStatisticsCounters() {
    console.log('Обновление счетчиков статистики...');
    console.log('SITE_DATA:', SITE_DATA);

    // Проверяем, загружены ли данные
    if (!SITE_DATA) {
        console.error('SITE_DATA не загружен!');
        return;
    }

    // Счетчик воспоминаний
    const memoriesElement = document.getElementById('memories-counter');
    if (memoriesElement) {
        const memoriesCount = SITE_DATA.memories ? SITE_DATA.memories.length : 0;
        console.log('Количество воспоминаний:', memoriesCount);
        memoriesElement.textContent = memoriesCount;
    }

    // Счетчик комплиментов (сообщений)
    const complimentsElement = document.getElementById('compliments-counter');
    if (complimentsElement) {
        const messagesCount = SITE_DATA.messages ? SITE_DATA.messages.length : 0;
        console.log('Количество сообщений:', messagesCount);
        complimentsElement.textContent = messagesCount;
    }
}

// Добавим эту функцию в глобальную область видимости
window.updateStatisticsCounters = updateStatisticsCounters;
// Обновляем глобальные функции
window.createClickStar = createClickStar;
window.createStarExplosionEffect = createStarExplosionEffect;
window.createMeteorShower = createMeteorShower;