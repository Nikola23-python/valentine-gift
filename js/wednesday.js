// Эффекты в стиле Уэнздей

// Создаёт пауков
function createSpiders(count = 3) {
    const container = document.getElementById('wednesday-effects');
    if (!container) return;

    for (let i = 0; i < count; i++) {
        const spider = document.createElement('div');
        spider.className = 'spider';

        // Случайная позиция
        spider.style.top = Math.random() * 100 + 'vh';
        spider.style.left = '-100px';

        // Случайная скорость
        const duration = Math.random() * 30000 + 20000;
        spider.style.animationDuration = duration + 'ms';

        // Случайный размер
        const size = Math.random() * 20 + 20;
        spider.style.width = size + 'px';
        spider.style.height = size + 'px';

        container.appendChild(spider);

        // Удаляем через время
        setTimeout(() => {
            if (spider.parentNode === container) {
                container.removeChild(spider);
            }
        }, duration);
    }

    // Новые пауки через случайное время
    setTimeout(() => createSpiders(1), Math.random() * 10000 + 5000);
}

// Создаёт летучих мышей
function createBats(count = 2) {
    const container = document.getElementById('wednesday-effects');
    if (!container) return;

    for (let i = 0; i < count; i++) {
        const bat = document.createElement('div');
        bat.className = 'bat';

        // Случайная позиция
        bat.style.top = Math.random() * 100 + 'vh';
        bat.style.left = '-100px';

        // Случайная скорость
        const duration = Math.random() * 25000 + 15000;
        bat.style.animationDuration = duration + 'ms';

        // Случайный размер
        const size = Math.random() * 30 + 30;
        bat.style.width = size + 'px';
        bat.style.height = size + 'px';

        container.appendChild(bat);

        // Удаляем через время
        setTimeout(() => {
            if (bat.parentNode === container) {
                container.removeChild(bat);
            }
        }, duration);
    }

    // Новые мыши через случайное время
    setTimeout(() => createBats(1), Math.random() * 15000 + 8000);
}

// Эффект при клике (паутина)
function createWebEffect(x, y) {
    const web = document.createElement('div');
    web.style.position = 'fixed';
    web.style.left = (x - 50) + 'px';
    web.style.top = (y - 50) + 'px';
    web.style.width = '100px';
    web.style.height = '100px';
    web.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='%238b0000' stroke-width='2' stroke-opacity='0.5'/%3E%3Cline x1='50' y1='5' x2='50' y2='95' stroke='%238b0000' stroke-width='1' stroke-opacity='0.3'/%3E%3Cline x1='5' y1='50' x2='95' y2='50' stroke='%238b0000' stroke-width='1' stroke-opacity='0.3'/%3E%3Cline x1='20' y1='20' x2='80' y2='80' stroke='%238b0000' stroke-width='1' stroke-opacity='0.3'/%3E%3Cline x1='80' y1='20' x2='20' y2='80' stroke='%238b0000' stroke-width='1' stroke-opacity='0.3'/%3E%3C/svg%3E")`;
    web.style.backgroundSize = 'contain';
    web.style.backgroundRepeat = 'no-repeat';
    web.style.zIndex = '9999';
    web.style.pointerEvents = 'none';
    web.style.animation = 'webExpand 1s ease-out forwards';

    document.body.appendChild(web);

    setTimeout(() => {
        if (web.parentNode) {
            web.parentNode.removeChild(web);
        }
    }, 1000);
}

// Звуки (готы любят тишину, но добавим немного)
function playWednesdaySound(type) {
    const sounds = {
        click: '🔇', // Уэнздей предпочитает тишину
        spider: '🕷️',
        bat: '🦇',
        mystery: '🔮'
    };

    // В реальном проекте здесь были бы звуковые файлы
    console.log(sounds[type] || '🎹');
}

// Тайные послания как у Уэнздей
function showCrypticMessage(message, duration = 10000) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'cryptic-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--black);
        color: var(--blood-red);
        padding: 30px;
        border: 3px solid var(--blood-red);
        font-family: 'Courier New', monospace;
        font-size: 1.2rem;
        z-index: 10000;
        max-width: 80%;
        text-align: center;
        box-shadow: 0 0 40px rgba(139, 0, 0, 0.5);
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}

// Викторина в стиле Уэнздей
function startWednesdayQuiz() {
    const questions = [
        {
            question: "Что Уэнздей ненавидит больше всего?",
            options: ["Цвета", "Солнце", "Людей", "Всё вышеперечисленное"],
            answer: 3
        },
        {
            question: "Какое её любимое животное?",
            options: ["Паук", "Ворон", "Змея", "Все твари"],
            answer: 3
        },
        {
            question: "Какой её фирменный взгляд?",
            options: ["Смертельный", "Безразличный", "Загадочный", "Все варианты верны"],
            answer: 3
        },
        {
            question: "Что Уэнздей считает идеальным подарком?",
            options: ["Букет роз", "Новый альбом группы", "Череп с ещё не высохшей плотью", "Партию чёрного одеяния"],
            answer: 2
        },
        {
            question: "Какое её любимое занятие в дождливую погоду?",
            options: ["Смотреть жизнеутверждающие комедии", "Гулять без зонта", "Вскрывать чучела в своей комнате", "Сочинять поэмы о тщетности бытия"],
            answer: 3
        }
    ];

    let score = 0;
    let currentQuestion = 0;

    function showCrypticMessage(message) {
        alert(`🕸️  ${message} 🦇`);
    }

    function askQuestion(index) {
        if (index >= questions.length) {
            // Все вопросы заданы, показываем результат
            setTimeout(() => {
                if (score === questions.length) {
                    showCrypticMessage("Идеальный результат. Ты меня удивляешь... почти.");
                } else if (score >= questions.length * 0.7) {
                    showCrypticMessage(`Ты набрал ${score} из ${questions.length}. Приемлемо для смертного.`);
                } else if (score >= questions.length * 0.4) {
                    showCrypticMessage(`Всего ${score} из ${questions.length}. Посредственность — это тоже диагноз.`);
                } else {
                    showCrypticMessage(`${score} из ${questions.length}. Жалкое зрелище.`);
                }
            }, 1000);
            return;
        }

        const q = questions[index];

        setTimeout(() => {
            const answer = prompt(
                `🦇 Вопрос ${index + 1}/${questions.length} 🦇\n\n${q.question}\n\n` +
                q.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n') +
                `\n\nВведи номер ответа (1-${q.options.length}):`
            );

            // Обработка отмены или неверного ввода
            if (answer === null) {
                showCrypticMessage("Сбежал? Как предсказуемо...");
                return;
            }

            const userAnswer = parseInt(answer);

            if (isNaN(userAnswer) || userAnswer < 1 || userAnswer > q.options.length) {
                showCrypticMessage("Неспособность выбрать число... печально.");
                askQuestion(index + 1);
            } else if (userAnswer - 1 === q.answer) {
                score++;
                const correctMessages = [
                    "Правильно. Не ожидала от тебя.",
                    "Верно. Почти впечатляет.",
                    "Точно. Ты внимательно наблюдаешь.",
                    "Правильный ответ. Случайность?"
                ];
                showCrypticMessage(correctMessages[Math.floor(Math.random() * correctMessages.length)]);
                askQuestion(index + 1);
            } else {
                const wrongMessages = [
                    "Ошибка. Я разочарована.",
                    "Неправильно. Как банально.",
                    "Неверно. Ты не понимаешь тьмы.",
                    "Ошибочка. Попробуй жить с этим."
                ];
                showCrypticMessage(wrongMessages[Math.floor(Math.random() * wrongMessages.length)]);
                askQuestion(index + 1);
            }
        }, index === 0 ? 0 : 2000); // Первый вопрос без задержки, остальные с задержкой 2 секунды
    }

    // Начало викторины
    showCrypticMessage("Добро пожаловать в мою викторину. Надеюсь, твои нервы крепки...");
    setTimeout(() => {
        askQuestion(0);
    }, 1500);
}

// Инициализация эффектов
function initWednesdayEffects() {
    // Создаем контейнер для эффектов
    const effectsContainer = document.createElement('div');
    effectsContainer.id = 'wednesday-effects';
    effectsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(effectsContainer);

    // Запускаем эффекты
    setTimeout(() => createSpiders(2), 1000);
    setTimeout(() => createBats(1), 2000);

    // Эффект при клике
    document.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
            createWebEffect(e.clientX, e.clientY);
            playWednesdaySound('click');
        }
    });

    // Случайные загадочные сообщения
    setInterval(() => {
        const messages = [
            "Ты наблюдаешь за мной?",
            "Я знаю твой секрет.",
            "Тень всегда рядом.",
            "Паутина уже сплетена.",
            "Ночь раскрывает истины."
        ];

        if (Math.random() > 0.7) {
            showCrypticMessage(messages[Math.floor(Math.random() * messages.length)]);
        }
    }, 30000);
}