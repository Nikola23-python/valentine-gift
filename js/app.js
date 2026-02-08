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

        oscillator.start(aContext.currentTime);
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

// Обновляем глобальные функции
window.createClickStar = createClickStar;
window.createStarExplosionEffect = createStarExplosionEffect;
window.createMeteorShower = createMeteorShower;