// Создает плавающие звезды в фоне
function createStars() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    // Звезды и космические символы
    const stars = ['💙', '💠', '🔷', '🔹', '🌌', '✨', '🌟', '⭐', '💎', '🌀','⭐', '🌟', '✨', '💫', '🌠', '🌌', '🌙'];

    // Создаем 25 звезд
    for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.className = 'heart';
        star.innerHTML = stars[Math.floor(Math.random() * stars.length)];

        // Случайная позиция
        star.style.left = Math.random() * 100 + 'vw';

        // Случайная задержка анимации
        star.style.animationDelay = Math.random() * 10 + 's';

        // Случайный размер
        const size = Math.random() * 25 + 15;
        star.style.fontSize = size + 'px';

        // Случайная скорость
        const duration = Math.random() * 10000 + 15000;
        star.style.animationDuration = duration + 'ms';

        // Мерцание
        star.style.animation = `float ${duration}ms linear infinite, twinkle ${Math.random() * 3 + 2}s infinite alternate`;

        container.appendChild(star);

        // Удаляем звезду после завершения анимации
        setTimeout(() => {
            if (star.parentNode === container) {
                container.removeChild(star);
            }
        }, duration);
    }

    // Периодически добавляем падающие звезды
    setTimeout(createShootingStar, 3000);
    setTimeout(createStars, 5000);
}

// Создает падающую звезду
function createShootingStar() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.left = Math.random() * 100 + 'vw';
    shootingStar.style.top = '-100px';

    container.appendChild(shootingStar);

    setTimeout(() => {
        if (shootingStar.parentNode === container) {
            container.removeChild(shootingStar);
        }
    }, 2000);

    // Случайное время до следующей падающей звезды
    setTimeout(createShootingStar, Math.random() * 5000 + 3000);
}

// Создает звезду в месте клика
function createClickStar(x, y) {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const stars = ['⭐', '🌟', '✨', '💫'];
    const star = document.createElement('div');
    star.innerHTML = stars[Math.floor(Math.random() * stars.length)];

    // Позиционируем
    star.style.position = 'fixed';
    star.style.left = (x - 20) + 'px';
    star.style.top = (y - 20) + 'px';
    star.style.fontSize = '40px';
    star.style.zIndex = '9999';
    star.style.pointerEvents = 'none';
    star.style.userSelect = 'none';
    star.style.animation = 'floatUpNight 2.5s ease-out forwards';
    star.style.color = '#4cc9f0';
    star.style.textShadow = '0 0 20px rgba(76, 201, 240, 0.8)';

    document.body.appendChild(star);

    // Эффект взрыва
    createStarExplosion(x, y);

    // Удаляем через 2.5 секунды
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 2500);
}

// Создает эффект взрыва звезды
function createStarExplosion(x, y) {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'star-explosion';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            document.body.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 800);
        }, i * 50);
    }
}

// Создает взрыв звезд
function createStarExplosionEffect(count = 15, x = null, y = null) {
    const centerX = x || window.innerWidth / 2;
    const centerY = y || window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createClickStar(
                centerX + (Math.random() - 0.5) * 150,
                centerY + (Math.random() - 0.5) * 150
            );
        }, i * 30);
    }
}

// Создает метеоритный дождь
function createMeteorShower(count = 5) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            meteor.style.left = Math.random() * 100 + 'vw';
            meteor.style.top = '-100px';

            document.body.appendChild(meteor);

            setTimeout(() => {
                if (meteor.parentNode) {
                    meteor.parentNode.removeChild(meteor);
                }
            }, 1500);
        }, i * 800);
    }
}