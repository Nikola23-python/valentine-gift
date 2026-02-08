// Создает плавающие сердечки в фоне
function createHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const hearts = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝'];

    // Создаем 20 сердечек
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

        // Случайная позиция
        heart.style.left = Math.random() * 100 + 'vw';

        // Случайная задержка анимации
        heart.style.animationDelay = Math.random() * 8 + 's';

        // Случайный размер
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';

        // Случайная скорость
        const duration = Math.random() * 5000 + 10000;
        heart.style.animationDuration = duration + 'ms';

        container.appendChild(heart);

        // Удаляем сердечко после завершения анимации
        setTimeout(() => {
            if (heart.parentNode === container) {
                container.removeChild(heart);
            }
        }, duration);
    }

    // Периодически добавляем новые сердечки
    setTimeout(createHearts, 3000);
}

// Создает сердечко в месте клика
function createClickHeart(x, y) {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const hearts = ['❤️', '💖', '💗', '💓'];
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

    // Позиционируем
    heart.style.position = 'fixed';
    heart.style.left = (x - 20) + 'px';
    heart.style.top = (y - 20) + 'px';
    heart.style.fontSize = '40px';
    heart.style.zIndex = '9999';
    heart.style.pointerEvents = 'none';
    heart.style.userSelect = 'none';
    heart.style.animation = 'floatUp 2s ease forwards';

    document.body.appendChild(heart);

    // Удаляем через 2 секунды
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 2000);
}

// Создает взрыв сердечек
function createHeartExplosion(count = 20, x = null, y = null) {
    const centerX = x || window.innerWidth / 2;
    const centerY = y || window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createClickHeart(
                centerX + (Math.random() - 0.5) * 100,
                centerY + (Math.random() - 0.5) * 100
            );
        }, i * 50);
    }
}