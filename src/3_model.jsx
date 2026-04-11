// КОНСТАНТЫ МИССИЙ И СОБЫТИЙ
const MISSION_EVENTS = {
    normal: {
        id: 'normal',
        name: 'ШТАТНЫЙ РЕЖИМ',
        desc: 'Работа в рамках базового ТЗ. Все показатели стабильны.',
        modifiers: [0, 0, 0, 0],
        weightMod: 1
    },
    rain: {
        id: 'rain',
        name: 'ЛИВНЕВЫЙ ДОЖДЬ',
        desc: 'Мусор намок и стал на 30% тяжелее. Требуется повышенная грузоподъемность!',
        modifiers: [0, -0.05, 0.3, 0.1], // Меньше скорости, больше веса и точности
        weightMod: 1.3
    },
    rush: {
        id: 'rush',
        name: 'СРОЧНЫЙ ЗАКАЗ',
        desc: 'Логистический хаб перегружен. Заказчик требует ускорить циклы на 25%!',
        modifiers: [0.1, 0.35, 0, -0.1], // Дороже, быстрее, меньше точности
        weightMod: 1.0
    }
};

const MARKET_NEWS = [
    // 🟢 ПОЛОЖИТЕЛЬНЫЕ (СКИДКИ)
    { id: 1, text: "🟢 ГЛОБАЛЬНАЯ РАСПРОДАЖА: Излишки на складах. Электроника -30%!", impact: { type: 'tech', multiplier: 0.7, title: 'РАСПРОДАЖА ИЗЛИШКОВ', color: '#8cffb1' } },
    { id: 2, text: "🟢 ПРОРЫВ В ОПТИКЕ: Новая технология линз. Датчики -40%!", impact: { type: 'tech', multiplier: 0.6, title: 'TECH BREAKTHROUGH', color: '#8cffb1' } },
    { id: 3, text: "🟢 ЧЕРНАЯ ПЯТНИЦА: Глобальный дискаунт. Общая скидка -15%!", impact: { type: 'price', multiplier: 0.85, title: 'BLACK FRIDAY', color: '#8cffb1' } },

    // 🔴 ОТРИЦАТЕЛЬНЫЕ (РИСКИ - ЗАЩИЩАЕТ КАРТА ХЕДЖИРОВАНИЯ)
    { id: 4, text: "🔴 ДЕФИЦИТ ЧИПОВ: Завод в Тайване на паузе. Контроллеры +50%!", impact: { type: 'tech', multiplier: 1.5, title: 'ДЕФИЦИТ ЧИПОВ', color: 'var(--prof-error)' } },
    { id: 5, text: "🔴 САНКЦИИ НА ОПТИКУ: Дефицит высокоточных линз. Сенсоры +60%!", impact: { type: 'tech', multiplier: 1.6, title: 'САНКЦИИ (СЕНСОРЫ)', color: 'var(--prof-error)' } },
    { id: 6, text: "🔴 ВАЛЮТНЫЙ СКАЧОК: Курс валют нестабилен. Всё железо +25%!", impact: { type: 'price', multiplier: 1.25, title: 'ВАЛЮТНЫЙ РИСК', color: 'var(--prof-error)' } }
];

const BASE_TARGETS = [0.75, 0.8, 0.6, 0.85]; // Цена, Скорость, Грузоподъем, Точность

const BRICS_GRANTS = [
    { 
        id: 'eco_tech', 
        name: 'Грант "Eco-Tech"', 
        bonus: 150, 
        desc: '+$150 к бюджету. ЛОК: Запрет на задержки > 2.0с (экономия энергии).',
        constraint: 'Soft-Lock: Max Wait 2.0s'
    },
    { 
        id: 'heavy_duty', 
        name: 'Грант "Heavy Duty"', 
        bonus: 200, 
        desc: '+$200 к бюджету. ШТРАФ: -10% к Идеалу при весе > 5кг.',
        constraint: 'Hard-Lock: Weight < 5.0kg'
    }
];

const STRATEGIC_ACTIONS = [
    { 
        id: 'CLOUD_OPTIM', 
        name: 'Open Source Контейнеры', 
        type: 'Оптимизация',
        cost: { label: '20с времени', val: 20, icon: '⏳' },
        result: { label: '+$100 в Бюджет ПО', val: 100, icon: '📦' },
        desc: '💡 DEV: Использование свободно распространяемых библиотек вместо платных аналогов для снижения затрат.'
    },
    { 
        id: 'GRANT', 
        name: 'Грант "GreenTech"', 
        type: 'Грант',
        cost: { label: 'Вес < 4.0кг', val: 4.0, icon: '🎯' },
        result: { label: '+$150 в Бюджет', val: 150, icon: '💰' },
        desc: '💡 CEO: Дает деньги сейчас, но оштрафует в конце, если робот выйдет тяжелым.'
    },
    { 
        id: 'INVEST', 
        name: 'Лицензия на AI-фильтр', 
        type: 'Инвестиция',
        cost: { label: '-$80 Бюджета', val: 80, icon: '💰' },
        result: { label: 'Чистый сигнал', icon: '⚙️' },
        desc: '💡 CODE: Полностью убирает шум датчиков. Программисту больше не нужны фильтры.'
    },
    { 
        id: 'HEDGING', 
        name: 'Фьючерс: Чипы', 
        type: 'Хеджирование',
        cost: { label: '-$50 Бюджета', val: 50, icon: '💰' },
        result: { label: 'Иммунитет', icon: '🛡️' },
        desc: '💡 РЫНОК: Любые новости о росте цен на чипы не будут влиять на ваш бюджет.'
    }
];

const SOFTWARE_SHOP = [
    { id: 'TELEMETRY_PRO', name: 'Telemetry Ultra', price: 120, desc: 'Расширенный мониторинг энергопотребления в реальном времени.' },
    { id: 'CLOUD_CORE', name: 'Cloud Runtime V4', price: 90, desc: 'Ускоряет обработку данных в облаке на 15%.' },
    { id: 'VISION_API', name: 'Vision API Pro', price: 150, desc: 'Нейросетевая детекция объектов с точностью до 99.8%.' },
    { id: 'RTOS_KERNEL', name: 'RTOS Core V2', price: 110, desc: 'Ядро реального времени для минимизации задержек управления.' }
];

const PITCH_SCENARIOS = [
    {
        id: 'hook',
        question: "Инвестор: 'Ваш робот выглядит как дипломная работа. Почему я должен верить, что это продукт?'",
        options: [
            { text: "Показать детальные ТТХ и график испытаний надежности.", trust: 25, emoji: '🧐' },
            { text: "Заявить, что это первый шаг к полной роботизации Индии!", trust: -15, emoji: '🔥' },
            { text: "Рассказать о реальных заказах от местных складов.", trust: 15, emoji: '💸' }
        ]
    },
    {
        id: 'scale',
        question: "Инвестор: 'Как вы будете конкурировать с дешевыми аналогами из Китая?'",
        options: [
            { text: "У нас уникальная прошивка и локальный сервис 24/7.", trust: 25, emoji: '👍' },
            { text: "Мы захватим рынок через нашу сеть гаражных стартапов!", trust: -25, emoji: '🚀' },
            { text: "Наш BOM уже на 20% ниже за счет переработанных деталей.", trust: 30, emoji: '📈' }
        ]
    },
    {
        id: 'exit',
        question: "Инвестор: 'Где вы будете через 5 лет?'",
        options: [
            { text: "Станем стандартом для малого бизнеса по всей Азии.", trust: 15, emoji: '🌍' },
            { text: "Продадимся Google за миллиард долларов!", trust: -40, emoji: '🤑' },
            { text: "Постепенно расширим линейку до 6-осевых систем.", trust: 30, emoji: '🛠' }
        ]
    },
    {
        id: 'team',
        question: "Инвестор: 'Кто в вашей команде? Почему именно вы сможете это сделать?'",
        options: [
            { text: "У нас слаженная тройка: инженер, экономист и программист.", trust: 20, emoji: '🤝' },
            { text: "Мы — молодые гении из гаража! Следующие основатели Tesla!", trust: -30, emoji: '⚡' },
            { text: "Каждый имеет 5+ лет опыта в своей области.", trust: 25, emoji: '💼' }
        ]
    },
    {
        id: 'moat',
        question: "Инвестор: 'Что помешает крупным игрокам просто скопировать вашу технологию?'",
        options: [
            { text: "У нас патент на алгоритм калибровки сенсоров.", trust: 30, emoji: '🔒' },
            { text: "Мы слишком быстрые — они не успеют за нашей итерацией!", trust: -15, emoji: '💨' },
            { text: "Наша сила в локальном знании рынка Индии и BRICS.", trust: 20, emoji: '🇮🇳' }
        ]
    },
    {
        id: 'revenue',
        question: "Инвестор: 'Как вы планируете зарабатывать деньги? Какая бизнес-модель?'",
        options: [
            { text: "Продажа роботов + подписка на обновления ПО.", trust: 30, emoji: '💰' },
            { text: "RaaS (Robot-as-a-Service) — сдача в аренду по часам.", trust: 20, emoji: '⏱' },
            { text: "Сначала захватим рынок, потом монетизируем!", trust: -35, emoji: '🎪' }
        ]
    },
    {
        id: 'risk',
        question: "Инвестор: 'Какой самый большой риск в вашем проекте и как вы его mitigируете?'",
        options: [
            { text: "Цепочки поставок. Поэтому мы нашли локальных производителей.", trust: 25, emoji: '🔗' },
            { text: "Риска нет! Мы уже всё продумали.", trust: -30, emoji: '😎' },
            { text: "Технологический риск. Держим 20% бюджета на R&D.", trust: 20, emoji: '🔬' }
        ]
    },
    {
        id: 'traction',
        question: "Инвестор: 'Есть ли у вас уже первые клиенты или пилотные проекты?'",
        options: [
            { text: "Да, 3 склада в Бангалоре готовы подписать контракт.", trust: 35, emoji: '📋' },
            { text: "Пока нет, но у нас очередь из interested покупателей!", trust: -20, emoji: '📢' },
            { text: "Мы фокусируемся на продукте — клиенты сами придут.", trust: 5, emoji: '🎯' }
        ]
    }
];

const GOV_CONTRACTS = [
    { 
        id: 'agri_scan', 
        name: 'Агро-Сканирование', 
        desc: 'Мониторинг полей в Пенджабе. Нужна высокая надежность.', 
        minRep: 40, 
        advance: 120, 
        bonus: 5,
        reqs: { precision: 0.6 } // Требуемый индекс точности
    },
    { 
        id: 'postal_delhi', 
        name: 'Логистика Почты Дели', 
        desc: 'Сортировка посылок. Нужен быстрый цикл и точность.', 
        minRep: 65, 
        advance: 220, 
        bonus: 10,
        reqs: { precision: 0.75, speed: 0.7 }
    },
    { 
        id: 'defence_isro', 
        name: 'НИОКР для ISRO', 
        desc: 'Работа с хрупкими компонентами. Только для элиты рынка.', 
        minRep: 85, 
        advance: 450, 
        bonus: 25,
        reqs: { precision: 0.9, payload: 0.4 }
    }
];

// Вспомогательный компонент для радарной диаграммы (вынесен выше для читаемости)
const RadarChart = ({ current, target, size = 300 }) => {
    const r = size / 2;
    const center = r;
    const margin = 55; 
    const chartRadius = r - margin;

    const getPoints = (values) => values.map((v, i) => {
        const angle = (i * Math.PI) / 2 - Math.PI / 2;
        const x = center + chartRadius * v * Math.cos(angle);
        const y = center + chartRadius * v * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    const axes = [
        { label: 'ЦЕНА', angle: -Math.PI / 2, anchor: 'middle', dy: '-10px' },
        { label: 'СКОРОСТЬ', angle: 0, anchor: 'start', dy: '4px' },
        { label: 'ГРУЗОПОДЪЕМ', angle: Math.PI / 2, anchor: 'middle', dy: '15px' },
        { label: 'ТОЧНОСТЬ', angle: Math.PI, anchor: 'end', dy: '4px' }
    ];

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
            {[0.25, 0.5, 0.75, 1].map(scale => (
                <g key={scale}>
                    <polygon 
                        points={getPoints([scale, scale, scale, scale])} 
                        fill="none" 
                        stroke="rgba(125,232,255,0.1)" 
                        strokeWidth="1" 
                    />
                </g>
            ))}
            {axes.map((axis, i) => {
                const x2 = center + chartRadius * Math.cos(axis.angle);
                const y2 = center + chartRadius * Math.sin(axis.angle);
                const tx = center + (chartRadius + 12) * Math.cos(axis.angle);
                const ty = center + (chartRadius + 12) * Math.sin(axis.angle);
                return (
                    <g key={axis.label}>
                        <line x1={center} y1={center} x2={x2} y2={y2} stroke="rgba(125,232,255,0.2)" strokeWidth="1" />
                        <text 
                            x={tx} 
                            y={ty} 
                            dy={axis.dy}
                            textAnchor={axis.anchor} 
                            fill="var(--prof-text-dim)" 
                            fontSize="10" 
                            fontWeight="900" 
                            letterSpacing="1px"
                        >
                            {axis.label}
                        </text>
                    </g>
                );
            })}
            <polygon 
                points={getPoints(target)} 
                fill="rgba(0, 243, 255, 0.03)" 
                stroke="var(--prof-accent)" 
                strokeWidth="1.5" 
                strokeDasharray="4 2" 
                style={{ transition: 'all 0.8s ease-out' }} 
            />
            <polygon 
                points={getPoints(current)} 
                fill="rgba(255, 179, 107, 0.2)" 
                stroke="#ffb36b" 
                strokeWidth="3" 
                style={{ 
                    filter: 'drop-shadow(0 0 10px rgba(255,179,107,0.4))', 
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                }} 
            />
        </svg>
    );
};


const LogisticsMap = ({ activeAlert, upgrades, activeCorridor = 'mumbai', onSwitch }) => {
    const hasLogOpt = upgrades?.includes('LOG_OPT');
    const isDelayed = activeAlert?.type === 'logistics';
    const speed = isDelayed ? 15 : (hasLogOpt ? 3 : 6);
    const color = isDelayed ? 'var(--prof-error)' : 'var(--prof-success)';
    
    const mumbaiActive = activeCorridor === 'mumbai';
    const borderActive = activeCorridor === 'border';

    return (
        <div className="prof-card" style={{ padding: '20px', background: 'rgba(0,0,0,0.5)', border: `2px solid ${color}66`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ fontSize: '11px', fontWeight: '900', color: 'var(--prof-text-dim)', letterSpacing: '2px' }}>LOGISTICS INFRASTRUCTURE: INDIA HUB</div>
                <div style={{ fontSize: '10px', color: color, fontWeight: '900', background: `${color}22`, padding: '2px 10px', borderRadius: '4px' }}>{isDelayed ? '⚠ CORRIDOR BLOCKED' : 'SYSTEM OPTIMAL'}</div>
            </div>
            
            <svg viewBox="0 0 200 130" style={{ width: '100%', height: '280px' }}>
                {/* Detailed India Outline */}
                <path d="M40,20 L60,10 L100,10 L140,20 L160,50 L155,80 L140,105 L100,120 L60,105 L30,70 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                
                {/* Routes with Glow */}
                <path d="M45,55 Q70,70 100,85" fill="none" stroke={mumbaiActive ? 'var(--prof-accent)' : 'rgba(255,255,255,0.05)'} strokeWidth={mumbaiActive ? 3 : 1} style={{ filter: mumbaiActive ? 'drop-shadow(0 0 8px var(--prof-accent))' : 'none', transition: 'all 0.5s' }} />
                <path d="M70,15 Q85,50 100,85" fill="none" stroke={borderActive ? 'var(--prof-accent)' : 'rgba(255,255,255,0.05)'} strokeWidth={borderActive ? 3 : 1} style={{ filter: borderActive ? 'drop-shadow(0 0 8px var(--prof-accent))' : 'none', transition: 'all 0.5s' }} />

                {/* Interactible Hubs */}
                <g style={{ cursor: 'pointer' }} onClick={() => onSwitch('border')}>
                    <circle cx="70" cy="15" r={borderActive ? 6 : 4} fill={borderActive ? '#fff' : 'rgba(255,255,255,0.3)'} stroke={borderActive ? 'var(--prof-accent)' : 'none'} strokeWidth="2" style={{ transition: 'all 0.3s' }} />
                    <text x="80" y="16" fill="#fff" style={{ fontSize: '10px', fontWeight: borderActive ? '900' : '400', filter: borderActive ? 'drop-shadow(0 0 5px #fff)' : 'none' }}>NORTH BORDER</text>
                </g>

                <g style={{ cursor: 'pointer' }} onClick={() => onSwitch('mumbai')}>
                    <circle cx="45" cy="55" r={mumbaiActive ? 6 : 4} fill={mumbaiActive ? '#fff' : 'rgba(255,255,255,0.3)'} stroke={mumbaiActive ? 'var(--prof-accent)' : 'none'} strokeWidth="2" style={{ transition: 'all 0.3s' }} />
                    <text x="15" y="65" fill="#fff" style={{ fontSize: '10px', fontWeight: mumbaiActive ? '900' : '400', filter: mumbaiActive ? 'drop-shadow(0 0 5px #fff)' : 'none' }}>MUMBAI PORT</text>
                </g>

                <circle cx="100" cy="85" r="5" fill="var(--prof-success)" style={{ filter: 'drop-shadow(0 0 10px var(--prof-success))' }} />
                <text x="108" y="93" fill="var(--prof-success)" style={{ fontSize: '11px', fontWeight: '900' }}>HQ BANGALORE</text>

                {/* Animated Trucks */}
                {mumbaiActive && (
                    <circle r="3" fill={color}>
                        <animateMotion dur={speed + "s"} repeatCount="indefinite" path="M45,55 Q70,70 100,85" />
                        <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite" />
                    </circle>
                )}
                {borderActive && (
                    <circle r="3" fill={color}>
                        <animateMotion dur={speed + "s"} repeatCount="indefinite" path="M70,15 Q85,50 100,85" />
                        <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite" />
                    </circle>
                )}

                {isDelayed && (
                    <g onClick={() => {}} style={{ cursor: 'default' }}>
                        <rect x="25" y="105" width="150" height="20" rx="4" fill="var(--prof-error)" opacity="0.2" />
                        <text x="100" y="118" textAnchor="middle" fill="var(--prof-error)" style={{ fontSize: '9px', fontWeight: '900', animation: 'blink 1s infinite' }}>⚠️ LOGISTICS BREACH DETECTED</text>
                    </g>
                )}
            </svg>
        </div>
    );
};

const BusinessBlueprint = ({ purchasedSamples, activeAlert }) => {
    const isSample = (id) => purchasedSamples?.includes(id);
    const isRisk = (type) => activeAlert?.type === type;
    
    const colors = {
        owned: '#8cffb1',
        risk: 'var(--prof-error)',
        normal: 'rgba(125, 232, 255, 0.4)'
    };

    const getPartColor = (id, type) => {
        if (isSample(id)) return colors.owned;
        if (isRisk(type)) return colors.risk;
        return colors.normal;
    };

    return (
        <div className="prof-card" style={{ padding: '20px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(125, 232, 255, 0.1)', position: 'relative' }}>
            <div style={{ fontSize: '9px', fontWeight: '900', color: 'var(--prof-text-dim)', marginBottom: '15px', letterSpacing: '1px' }}>PROJECT BLUEPRINT: COST & SUPPLY ANALYSIS</div>
            <svg viewBox="0 0 240 180" style={{ width: '100%', height: '160px' }}>
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>

                {/* Base Section */}
                <rect x="80" y="140" width="80" height="20" fill="none" stroke={getPartColor('teensy_41', 'tech')} strokeWidth="1" strokeDasharray="2 2" />
                <text x="120" y="153" textAnchor="middle" fill={getPartColor('teensy_41', 'tech')} style={{ fontSize: '7px', fontWeight: '800' }}>[ CONTROLLER / CHIPS ]</text>

                {/* Arm Structure */}
                <path d="M120,140 L120,100 L180,60 L220,60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />
                
                {/* Joints (Motors) */}
                <circle cx="120" cy="100" r="10" fill="none" stroke={getPartColor('dynamixel_xl430', 'energy')} strokeWidth="1.5" />
                <path d="M120,95 L120,105 M115,100 L125,100" stroke={getPartColor('dynamixel_xl430', 'energy')} strokeWidth="1" />
                <text x="100" y="90" textAnchor="end" fill={getPartColor('dynamixel_xl430', 'energy')} style={{ fontSize: '7px' }}>SHOULDER ACTUATOR</text>

                <circle cx="180" cy="60" r="8" fill="none" stroke={getPartColor('mg996r', 'energy')} strokeWidth="1.5" />
                <text x="180" y="50" textAnchor="middle" fill={getPartColor('mg996r', 'energy')} style={{ fontSize: '7px' }}>ELBOW</text>

                {/* Gripper */}
                <rect x="220" y="52" width="15" height="16" fill="none" stroke={getPartColor('robotiq_2f85', 'materials')} strokeWidth="1.5" />
                <text x="240" y="62" textAnchor="start" fill={getPartColor('robotiq_2f85', 'materials')} style={{ fontSize: '7px' }}>GRIPPER</text>

                {/* Camera */}
                <path d="M115,40 L125,40 L120,30 Z" fill="none" stroke={getPartColor('ov2640_cam', 'tech')} strokeWidth="1.5" />
                <text x="120" y="25" textAnchor="middle" fill={getPartColor('ov2640_cam', 'tech')} style={{ fontSize: '7px' }}>VISION SYSTEM</text>

                {/* Dynamic Price Tags */}
                {isRisk('tech') && <circle cx="120" cy="35" r="3" fill="var(--prof-error)"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/></circle>}
                {isRisk('energy') && <circle cx="120" cy="100" r="3" fill="var(--prof-error)"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/></circle>}

                {/* Legend */}
                <g transform="translate(10, 160)">
                    <rect width="6" height="6" fill={colors.owned} />
                    <text x="10" y="6" fill={colors.owned} style={{ fontSize: '6px' }}>OWNED / SAMPLE</text>
                    <rect y="10" width="6" height="6" fill={colors.risk} />
                    <text x="10" y="16" fill={colors.risk} style={{ fontSize: '6px' }}>MARKET RISK</text>
                </g>
            </svg>
        </div>
    );
};

const CreditRatingGauge = ({ score }) => {
    const color = score > 85 ? 'var(--prof-success)' : (score > 60 ? 'var(--prof-accent)' : 'var(--prof-error)');
    const angle = (score / 100) * 180 - 180;
    
    return (
        <div style={{ position: 'relative', width: '140px', textAlign: 'center' }}>
            <svg viewBox="0 0 100 60" style={{ width: '140px' }}>
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" strokeLinecap="round" />
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" 
                    strokeDasharray="125.6" strokeDashoffset={125.6 * (1 - score/100)} style={{ transition: 'all 1s' }} />
            </svg>
            <div style={{ position: 'absolute', top: '25px', left: 0, right: 0 }}>
                <div style={{ fontSize: '20px', fontWeight: '900', color }}>{score}</div>
                <div style={{ fontSize: '8px', opacity: 0.5 }}>CREDIT SCORE</div>
            </div>
        </div>
    );
};

const PitchDuel = ({ onFinish, simulationData, roundOverride }) => {
    const [round, setRound] = useState(roundOverride || 0);
    const [stats, setStats] = useState({ trust: 40 }); // Хайп удален
    const [bubbles, setBubbles] = useState([]);
    const [isEnding, setIsEnding] = useState(false);
    const [scenarioPool] = useState(() => {
        const shuffled = [...PITCH_SCENARIOS].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    });

    const handleOption = (opt) => {
        const nextTrust = Math.max(0, Math.min(100, stats.trust + (opt.trust || 0)));
        setStats({ trust: nextTrust });

        // Add emoji bubble
        const newBubble = { id: Date.now(), emoji: opt.emoji, x: Math.random() * 60 + 20 };
        setBubbles(prev => [...prev, newBubble]);
        setTimeout(() => setBubbles(prev => prev.filter(b => b.id !== newBubble.id)), 2000);

        if (round < 2) {
            setRound(round + 1);
        } else {
            setIsEnding(true);
        }
    };

    const finalize = () => {
        let moneyBonus = 0;
        let pointsBonus = 0;
        let success = false;
        
        if (stats.trust >= 85) {
            moneyBonus = 150;
            // Шанс 40% получить дополнительные очки за супер-доверие
            if (Math.random() > 0.6) pointsBonus = 40;
            success = true;
        } else if (stats.trust >= 65) {
            moneyBonus = 60;
            success = true;
        } else if (stats.trust >= 40) {
            moneyBonus = 15;
            success = true;
        } else if (stats.trust < 25) {
            moneyBonus = -80; // КРИТИЧЕСКИЙ ПРОВАЛ - ШТРАФ
        } else {
            moneyBonus = -30; // НЕБОЛЬШОЙ ПРОВАЛ
        }

        onFinish(moneyBonus, success, pointsBonus);
    };

    const current = scenarioPool[round];

    return (
        <div className="pitch-overlay" style={{
            position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(5, 10, 20, 0.98)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px'
        }}>
            <style>{`
                @keyframes float-up { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-100px); opacity: 0; } }
                .audience-bubble { position: absolute; bottom: 40px; font-size: 32px; animation: float-up 2s ease-out forwards; }
                .pitch-card:hover { transform: translateY(-5px); border-color: var(--prof-accent); background: rgba(125, 232, 255, 0.1); }
            `}</style>

            <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{ height: '240px', background: '#0a1525', borderRadius: '16px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 20%, rgba(125, 232, 255, 0.2) 0%, transparent 70%)' }} />
                    <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%' }}>
                        <path d="M0,0 L180,60 L220,60 L400,0" fill="rgba(88, 166, 255, 0.05)" />
                        <circle cx="200" cy="80" r="15" fill="var(--prof-accent)" opacity="0.8" />
                        <path d="M180,140 Q200,90 220,140" fill="var(--prof-accent)" opacity="0.6" />
                        {Array.from({length: 12}).map((_, i) => (
                            <circle key={i} cx={20 + i*34} cy={145} r="12" fill="rgba(255,255,255,0.1)" />
                        ))}
                    </svg>

                    {bubbles.map(b => (
                        <div key={b.id} className="audience-bubble" style={{ left: `${b.x}%` }}>{b.emoji}</div>
                    ))}

                    <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '320px', textAlign: 'center' }}>
                         <div style={{ fontSize: '10px', fontWeight: '900', color: 'var(--prof-accent)', marginBottom: '8px', letterSpacing: '2px' }}>ДОВЕРИЕ ИНВЕСТОРОВ</div>
                         <div style={{ height: '12px', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                             <div style={{ 
                                 height: '100%', 
                                 width: `${stats.trust}%`, 
                                 background: stats.trust > 60 ? 'var(--prof-success)' : stats.trust > 30 ? 'var(--prof-warning)' : 'var(--prof-error)', 
                                 transition: 'all 0.5s', 
                                 boxShadow: `0 0 15px ${stats.trust > 60 ? 'var(--prof-success)' : 'var(--prof-error)'}` 
                             }} />
                         </div>
                    </div>
                </div>

                {isEnding ? (
                    <div className="prof-card" style={{ padding: '40px', textAlign: 'center', background: 'rgba(10, 20, 30, 0.8)', animation: 'scale-up 0.5s', border: '2px solid var(--prof-accent)' }}>
                        <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--prof-accent)', marginBottom: '20px' }}>ВЫСТУПЛЕНИЕ ЗАВЕРШЕНО</div>
                        <p style={{ color: '#fff', fontSize: '18px', marginBottom: '30px', lineHeight: '1.6' }}>
                            {stats.trust >= 85 ? "Инвесторы видят в вас будущих единорогов! Финансирование выделено в полном объеме." : 
                             stats.trust >= 60 ? "Вы были убедительны. Часть фонда согласна войти в ваш проект." :
                             stats.trust >= 40 ? "Скепсиса много, но минимальный бюджет на прототипы вы получили." :
                             "Полный провал. Инвесторы в ярости от ваших ответов и забирают ранее выделенные квоты."}
                        </p>
                        <button className="btn-prof primary" onClick={finalize} style={{ padding: '18px 60px', fontSize: '20px', fontWeight: '900' }}>УЗНАТЬ РЕШЕНИЕ</button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ fontSize: '22px', fontWeight: '700', color: '#fff', textAlign: 'center', padding: '0 40px', lineHeight: '1.4' }}>{current.question}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                            {current.options.map((opt, i) => (
                                <div key={i} className="prof-card pitch-card" onClick={() => handleOption(opt)} style={{ padding: '24px', cursor: 'pointer', transition: 'all 0.3s', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '140px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ fontSize: '15px', fontWeight: '800', lineHeight: '1.4' }}>{opt.text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const TrustGauge = ({ score }) => {
    const getRating = (s) => {
        if (s >= 92) return { label: 'AAA', status: 'ИДЕАЛЬНО', color: 'var(--prof-success)' };
        if (s >= 82) return { label: 'AA', status: 'ВЫСОКОЕ', color: '#4affff' };
        if (s >= 70) return { label: 'A', status: 'СТАБИЛЬНО', color: 'var(--prof-accent)' };
        if (s >= 55) return { label: 'B', status: 'РАСТУЩЕЕ', color: 'var(--prof-warning)' };
        if (s >= 40) return { label: 'C', status: 'ПОД УГРОЗОЙ', color: '#ffb36b' };
        return { label: 'D', status: 'КРИТИЧНО', color: 'var(--prof-error)' };
    };

    const rating = getRating(score);

    return (
        <div style={{ padding: '4px 0 10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <div style={{ fontSize: '10px', color: 'var(--prof-text-dim)', fontWeight: '900', letterSpacing: '1px' }}>
                    УРОВЕНЬ ДОВЕРИЯ: <span style={{ color: rating.color, fontSize: '14px', marginLeft: '4px' }}>{rating.label}</span>
                </div>
                <div style={{ fontSize: '9px', color: rating.color, fontWeight: '800', opacity: 0.8 }}>
                    {rating.status}
                </div>
            </div>
            
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                {/* Background segments */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: '2px' }}>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} style={{ flex: 1, background: 'rgba(0,0,0,0.2)', borderRight: '1px solid rgba(255,255,255,0.03)' }} />
                    ))}
                </div>
                {/* Active bar */}
                <div style={{ 
                    height: '100%', 
                    width: `${score}%`, 
                    background: rating.color, 
                    boxShadow: `0 0 10px ${rating.color}44`,
                    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    zIndex: 2
                }} />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ fontSize: '7px', color: 'var(--prof-text-dim)', letterSpacing: '0.5px' }}>РЕЙТИНГ РЕПУТАЦИИ:</span>
                <span style={{ fontSize: '8px', color: '#fff', fontWeight: 'bold', fontFamily: 'IBM Plex Mono' }}>{Math.round(score)}/100</span>
            </div>
        </div>
    );
};

const ProjectCharter = ({ scenario, totals, economics, marketState }) => {
    const targets = scenario.targets || { budget: 420, reliability: 75, cycleTime: 8.0, payload: 0.42 };
    const currentActiveNews = marketState.activeAlert;
    
    // ВЫЧИСЛЯЕМ РЕАЛЬНЫЙ BOM С УЧЕТОМ РЫНКА
    let adjustedBom = totals.bomCost || 0;
    if (currentActiveNews?.impact) {
        const { impact } = currentActiveNews;
        const isImmune = marketState.immuneToSpikes && (impact.type === 'tech' || impact.type === 'energy' || impact.type === 'price' || impact.type === 'logistics');
        if (!isImmune) {
            if (impact.multiplier) adjustedBom *= impact.multiplier;
            if (impact.penalty) adjustedBom += impact.penalty;
        }
    }

    const currentBudget = Math.round(adjustedBom);
    const currentReliability = totals.reliabilityScore || 80;
    const currentCycle = totals.estimatedCycleSeconds || 7.5;
    const currentPayload = totals.payloadCapacity || 0; // Реальная грузоподъемность от инженера

    const metrics = [
        { label: 'ЗАТРАТЫ (BOM)', target: `$${targets.budget}`, actual: `$${currentBudget}`, ok: currentBudget <= targets.budget },
        { label: 'НАДЕЖНОСТЬ', target: `≥${targets.reliability}%`, actual: `${currentReliability}%`, ok: currentReliability >= targets.reliability },
        { label: 'ЦИКЛ', target: `≤${targets.cycleTime}с`, actual: `${currentCycle}с`, ok: currentCycle <= targets.cycleTime && currentCycle > 0 },
        { label: 'ТЯГА (LIFT)', target: `≥${targets.payload}кг`, actual: `${currentPayload.toFixed(2)}кг`, ok: currentPayload >= targets.payload }
    ];

    return (
        <div 
            className="prof-card" 
            onClick={() => { if (onClose) onClose(); }}
            style={{ 
                padding: '12px 14px 16px 14px', 
                marginBottom: '10px', 
                background: 'linear-gradient(135deg, rgba(26,26,31,0.95) 0%, rgba(10,10,12,0.98) 100%)',
                border: '1px solid var(--prof-border)',
                borderTop: '3px solid var(--prof-accent)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            title="Нажмите, чтобы скрыть ТЗ"
        >
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '3px 10px', background: 'var(--prof-accent)', color: 'black', fontSize: '8px', fontWeight: '900', letterSpacing: '1px' }}>
                CHARTER v1.0 [×]
            </div>
            
            <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '10px', color: 'var(--prof-accent)', fontWeight: '900', letterSpacing: '4px', marginBottom: '4px' }}>ТЕХНИЧЕСКОЕ ЗАДАНИЕ (ТЗ)</div>
                <div style={{ fontSize: '13px', color: 'var(--prof-text-main)', opacity: 0.9, lineHeight: '1.4', fontWeight: '500' }}>
                    Спроектировать, обосновать экономически и запрограммировать 3-осевой манипулятор...
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {metrics.map(m => (
                    <div key={m.label} style={{ padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: `1px solid ${m.ok ? 'rgba(140,255,177,0.05)' : 'rgba(255,101,101,0.1)'}`, transition: 'all 0.5s' }}>
                        <div style={{ fontSize: '10px', color: 'var(--prof-text-dim)', fontWeight: '800', marginBottom: '4px' }}>{m.label}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <div style={{ fontSize: '18px', fontWeight: '900', color: m.ok ? 'var(--prof-success)' : 'var(--prof-error)' }}>{m.actual}</div>
                            <div style={{ fontSize: '11px', color: '#ffb36b', opacity: 0.8, fontWeight: '700' }}>/ {m.target}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MarketTicker = ({ activeNews }) => {
    // Дублируем список для бесшовного зацикливания
    const extendedNews = [...MARKET_NEWS, ...MARKET_NEWS];
    
    return (
        <div style={{
            background: '#0a0a0c',
            borderBottom: '1px solid #1a1a1f',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}>
            <style>{`
                @keyframes ticker-pulse {
                    0% { opacity: 1; filter: brightness(1); }
                    50% { opacity: 0.9; filter: brightness(1.2); }
                    100% { opacity: 1; filter: brightness(1); }
                }
                @keyframes ticker-scroll {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
            `}</style>
            <div style={{
                background: activeNews ? activeNews.impact?.color || 'var(--prof-error)' : '#222',
                color: 'white',
                padding: '0 20px',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '8px 0 15px rgba(0,0,0,0.5)',
                letterSpacing: '2px',
                transition: 'background 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>{activeNews ? (activeNews.impact?.title || 'ALERT') : 'BRICS NEWS'}</div>
            
            <div style={{
                display: 'flex',
                whiteSpace: 'nowrap',
                animation: 'ticker-scroll 210s linear infinite',
                paddingLeft: '40px',
                alignItems: 'center',
                willChange: 'transform', // ГОВОРИМ БРАУЗЕРУ ВЫНЕСТИ НА GPU
                backfaceVisibility: 'hidden'
            }}>
                {extendedNews.map((news, i) => {
                    const isActive = activeNews && activeNews.id == news.id && (i % MARKET_NEWS.length) === (MARKET_NEWS.findIndex(n => n.id == activeNews.id));
                    const color = news.impact?.color || 'var(--prof-accent)';
                    
                    return (
                        <div key={i} style={{ 
                            width: '1200px', 
                            flexShrink: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <span style={{ 
                                fontSize: '22px', // ФИКСИРОВАННЫЙ РАЗМЕР (чтобы не было layout thrashing)
                                color: isActive ? '#fff' : '#444', 
                                fontWeight: '900',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                background: isActive ? color : 'transparent',
                                padding: '12px 60px', // ФИКСИРОВАННЫЙ ПАДДИНГ
                                borderRadius: '40px',
                                boxShadow: 'none', // УБРАЛИ СВЕЧЕНИЕ
                                opacity: isActive ? 1 : 0.2,
                                filter: isActive ? 'none' : 'grayscale(1) brightness(0.4)',
                                transform: isActive ? 'scale(1.1)' : 'scale(0.8)', // АНИМИРУЕМ ТОЛЬКО SCALE
                                transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.2s, background 1.2s, box-shadow 1.2s',
                                willChange: 'transform, opacity',
                                textShadow: 'none' // УБРАЛИ ТЕНЬ ТЕКСТА
                             }}>
                                {isActive && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ 
                                            color: color, 
                                            fontSize: '10px', 
                                            background: '#fff', 
                                            padding: '3px 12px', 
                                            borderRadius: '20px', 
                                            fontWeight: '900'
                                        }}>LIVE</span>
                                    </div>
                                )}
                                {news.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ModelingTable = () => {
    const { simulationData, setSimulationData, setCurrentScreen, setTeamState, teamState, userRole } = useContext(GameContext);
    const [activeEvent, setActiveEvent] = useState(MISSION_EVENTS.normal);
    const [panicCooldown, setPanicCooldown] = useState(0);
    const [showCharter, setShowCharter] = useState(true);

    // Ссылка на время монтирования для синхронизации с CSS анимацией
    const [mountTime] = useState(Date.now());

    // Получаем текущее состояние рынка
    const marketState = simulationData.marketState || { 
        indices: { tech: 1.0, energy: 1.0, logistics: 1.0 },
        activeAlert: null,
        upgrades: [],
        creditScore: 70,
        contracts: [],
        activeCorridor: 'mumbai'
    };
    const economics = simulationData.economics || { 
        hardwareLimit: 300, 
        softwareLimit: 120, 
        debt: 0,
        activeKpi: null, 
        kpiBonus: 0, 
        tco: { wear: 0, opex: 0 } 
    };

    const currentActiveNews = marketState.activeAlert;

    const totals = simulationData.totals || {};
    const scenario = simulationData.scenario || {};
    const collaboration = simulationData.collaboration || {};

    // НОРМАЛИЗАЦИЯ ДАННЫХ И TCO (Moved up to fix ReferenceError)
    const currentMetrics = useMemo(() => {
        const budget = economics.hardwareLimit || 300;
        const marketState = simulationData.marketState || {};
        
        let adjustedBom = totals.bomCost || 0;

        // Если робот еще не собран (BOM = 0), возвращаем нулевые показатели
        if (adjustedBom === 0) {
            return {
                radar: [0, 0, 0, 0],
                tco: { wear: 0, opex: 0 }
            };
        }

        if (currentActiveNews?.impact) {
            const { impact } = currentActiveNews;
            const isImmune = marketState.immuneToSpikes && (impact.type === 'tech' || impact.type === 'energy' || impact.type === 'price' || impact.type === 'logistics');
            
            if (!isImmune) {
                if (impact.multiplier) adjustedBom *= impact.multiplier;
                if (impact.penalty) adjustedBom += impact.penalty;
            }
        }

        // TCO Calculations
        const wear = totals.mechanicalRisk ? 35 : (totals.torqueMargin < 0 ? 25 : (totals.powerSupplyOverload ? 15 : 5));
        let opexValue = totals.powerWatts * 0.15;
        if (marketState.upgrades?.includes('ENERGY_SAVER')) {
            opexValue *= 0.7;
        }
        const opex = Number(opexValue.toFixed(2));
        
        const priceNorm = Math.max(0.05, Math.min(1, 1 - (adjustedBom / (budget * 1.4))));
        const speedNorm = Math.max(0.1, Math.min(1, (totals.armSpeedFactor || 0.5) / 4.5));
        const payloadNorm = Math.max(0.1, Math.min(1, (totals.payloadCapacity || 0.1) / 8.5));
        const reliability = totals.reliabilityScore || 80;
        const precisionNorm = Math.max(0.1, Math.min(1, (reliability / 100) * 0.7 + (totals.frameDurability || 0.5) * 0.3));
        
        return {
            radar: [priceNorm, speedNorm, payloadNorm, precisionNorm],
            tco: { wear, opex }
        };
    }, [totals, economics, currentActiveNews, simulationData.marketState]);

    const radarData = currentMetrics.radar;
    const { wear, opex } = currentMetrics.tco;

    // ДИНАМИЧЕСКИЙ ТАРГЕТ (Идеал меняется от события)
    const targetMetrics = useMemo(() => {
        const event = activeEvent || MISSION_EVENTS.normal;
        return BASE_TARGETS.map((base, i) => Math.max(0.2, Math.min(1, base + (event.modifiers[i] || 0))));
    }, [activeEvent]);
    
    // ДИНАМИЧЕСКИЙ РЫНОК: Визуальная синхронизация с тикером
    useEffect(() => {
        const syncLoop = setInterval(() => {
            const now = Date.now();
            const elapsedSinceMount = now - mountTime;
            
            // Логика задержки удалена для немедленной синхронизации

            // РАСЧЕТ ИНДЕКСА (Синхронно с анимацией 210с на 6 айтемов)
            const SCROLL_DURATION = 210000;
            const ITEM_DURATION = 35000; // 210000 / 6
            const SHIFT = 35000; // Установлено в ITEM_DURATION, чтобы избежать "прыжка" через 2 секунды после старта
            
            const activeIndex = Math.floor((elapsedSinceMount + SHIFT) / ITEM_DURATION) % MARKET_NEWS.length;
            const targetNews = MARKET_NEWS[activeIndex];

            // AUTO-CHECK CONTRACTS (If conditions no longer met)
            const [cPrice, cSpeed, cPayload, cPrecision] = radarData;
            const currentContracts = simulationData.marketState?.contracts || [];
            
            const brokenContract = currentContracts.find(c => {
                const cfg = GOV_CONTRACTS.find(gc => gc.id === c);
                if (!cfg) return false;
                if (cfg.reqs.precision && cPrecision < cfg.reqs.precision) return true;
                if (cfg.reqs.speed && cSpeed < cfg.reqs.speed) return true;
                if (cfg.reqs.payload && cPayload < cfg.reqs.payload) return true;
                return false;
            });

            if (brokenContract) {
                setSimulationData(prev => ({
                    ...prev,
                    marketState: {
                        ...prev.marketState,
                        contracts: prev.marketState.contracts.filter(c => c !== brokenContract),
                        creditScore: Math.max(0, (prev.marketState.creditScore || 70) - 20)
                    }
                }));
            }

            if (simulationData.marketState?.activeAlert?.id !== targetNews.id) {
                setSimulationData(prev => ({
                    ...prev,
                    marketState: {
                        ...(prev.marketState || {}),
                        activeAlert: targetNews,
                        lastUpdate: now
                    }
                }));
            }
        }, 500);

        return () => clearInterval(syncLoop);
    }, [mountTime, simulationData.marketState?.activeAlert?.id, radarData]);

    const handleGrantChange = (type, value) => {
        const other = type === 'hardware' ? 'softwareLimit' : 'hardwareLimit';
        const budget = (scenario.grantCap || 420) + (economics.kpiBonus || 0);
        const capped = Math.min(value, budget - 20); // Резерв 20
        
        setSimulationData(prev => ({
            ...prev,
            economics: {
                ...prev.economics,
                [`${type}Limit`]: capped,
                [other]: budget - capped
            }
        }));
    };

    const handlePanic = () => {
        if (panicCooldown > 0) return;
        setSimulationData(prev => ({
            ...prev,
            collaboration: {
                ...prev.collaboration,
                panicActive: true,
                panicEndTime: Date.now() + 10000
            }
        }));
        setPanicCooldown(120); // 2 min cooldown
    };

    useEffect(() => {
        if (panicCooldown > 0) {
            const timer = setInterval(() => setPanicCooldown(p => p - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [panicCooldown]);

    // ТАЙМЕР СБРОСА ПАНИКИ
    useEffect(() => {
        if (collaboration.panicActive) {
            const timer = setTimeout(() => {
                setSimulationData(prev => ({
                    ...prev,
                    collaboration: { ...prev.collaboration, panicActive: false }
                }));
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [collaboration.panicActive]);

    const selectKpi = (id) => {
        let bonus = 0;
        let meets = false;
        if (id === 'weight') {
            meets = totals.structuralWeight < 0.8;
            bonus = meets ? 50 : 0;
        } else if (id === 'power') {
            meets = totals.powerWatts < 15;
            bonus = meets ? 40 : 0;
        }
        
        setSimulationData(prev => ({
            ...prev,
            economics: { ...prev.economics, activeKpi: id, kpiBonus: bonus }
        }));
    };

    const acceptGrant = (grantId) => {
        if (economics.activeGrants?.includes(grantId)) return;
        const grant = BRICS_GRANTS.find(g => g.id === grantId);
        setSimulationData(prev => ({
            ...prev,
            economics: {
                ...prev.economics,
                activeGrants: [...(prev.economics.activeGrants || []), grantId],
                hardwareLimit: prev.economics.hardwareLimit + grant.bonus / 2,
                softwareLimit: prev.economics.softwareLimit + grant.bonus / 2,
                transactionHistory: [
                    { id: Date.now(), type: 'income', label: 'ГРАНТ: ' + grant.id, amount: grant.bonus, icon: '🏦' },
                    ...(prev.economics.transactionHistory || []).slice(0, 9)
                ]
            }
        }));
    };

    const buySoftware = (item) => {
        if (economics.purchasedLibraries?.includes(item.id)) return;
        // Позволяем уходить в минус (Овердрафт)

        setSimulationData(prev => ({
            ...prev,
            economics: {
                ...prev.economics,
                purchasedLibraries: [...(prev.economics.purchasedLibraries || []), item.id],
                hardwareLimit: prev.economics.hardwareLimit - item.price / 2,
                softwareLimit: prev.economics.softwareLimit - item.price / 2,
                transactionHistory: [
                    { id: Date.now(), type: 'expense', label: 'SOFT: ' + item.label, amount: -item.price, icon: '📜' },
                    ...(prev.economics.transactionHistory || []).slice(0, 9)
                ]
            }
        }));
    };

    const purchaseSample = (id, price) => {
        if (simulationData.purchasedSamples?.includes(id)) return;
        setSimulationData(prev => ({
            ...prev,
            purchasedSamples: [...(prev.purchasedSamples || []), id],
            economics: {
                ...prev.economics,
                hardwareLimit: prev.economics.hardwareLimit - price / 2,
                softwareLimit: prev.economics.softwareLimit - price / 2,
                transactionHistory: [
                    { id: Date.now(), type: 'expense', label: 'PROTOTYPE: ' + id, amount: -price, icon: '⚙️' },
                    ...(prev.economics.transactionHistory || []).slice(0, 9)
                ]
            }
        }));
    };

    const [isPitching, setIsPitching] = useState(false);
    const [pitchCooldown, setPitchCooldown] = useState(0); // 60 second cooldown
    
    // Pitch cooldown timer
    useEffect(() => {
        if (pitchCooldown > 0) {
            const timer = setInterval(() => setPitchCooldown(p => p - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [pitchCooldown]);
    
    const playStrategicCard = (card) => {
        const econ = simulationData.economics || {};
        const m = simulationData.marketState || {};

        if (card.id === 'SCOUTING') {
            setSimulationData(prev => ({
                ...prev,
                marketState: {
                    ...prev.marketState,
                    timeLeft: Math.max(0, (prev.marketState?.timeLeft || 300) - card.cost.val),
                    playedCards: [...(prev.marketState?.playedCards || []), card.id],
                    indianAluminumUnlocked: true
                }
            }));
        } else if (card.id === 'GRANT') {
            setSimulationData(prev => ({
                ...prev,
                economics: {
                    ...prev.economics,
                    hardwareLimit: prev.economics.hardwareLimit + card.result.val / 2,
                    softwareLimit: prev.economics.softwareLimit + card.result.val / 2
                },
                marketState: {
                    ...prev.marketState,
                    playedCards: [...(prev.marketState?.playedCards || []), card.id],
                    weightConstraintActive: true
                }
            }));
        } else if (card.id === 'INVEST') {
            // Позволяем уходить в минус
            setSimulationData(prev => ({
                ...prev,
                economics: {
                    ...prev.economics,
                    hardwareLimit: prev.economics.hardwareLimit - card.cost.val / 2,
                    softwareLimit: prev.economics.softwareLimit - card.cost.val / 2,
                    transactionHistory: [
                        { id: Date.now(), type: 'expense', label: 'CARD: ' + card.name, amount: -card.cost.val, icon: '🛡️' },
                        ...(prev.economics.transactionHistory || []).slice(0, 9)
                    ]
                },
                marketState: {
                    ...prev.marketState,
                    playedCards: [...(prev.marketState?.playedCards || []), card.id],
                },
                softwareState: {
                    ...prev.softwareState,
                    aiFilterActive: true
                }
            }));
        } else if (card.id === 'HEDGING') {
            // Позволяем уходить в минус
            setSimulationData(prev => ({
                ...prev,
                economics: {
                    ...prev.economics,
                    hardwareLimit: prev.economics.hardwareLimit - card.cost.val / 2,
                    softwareLimit: prev.economics.softwareLimit - card.cost.val / 2,
                    transactionHistory: [
                        { id: Date.now(), type: 'expense', label: 'CARD: ' + card.name, amount: -card.cost.val, icon: '📊' },
                        ...(prev.economics.transactionHistory || []).slice(0, 9)
                    ]
                },
                marketState: {
                    ...prev.marketState,
                    playedCards: [...(prev.marketState?.playedCards || []), card.id],
                    immuneToSpikes: true
                }
            }));
        }
    };

    const handlePitchFinish = (bonus, success, pointsBonus = 0) => {
        setIsPitching(false);
        setPitchCooldown(60); 
        
        setSimulationData(prev => ({
            ...prev,
            pitchOutcome: { completed: true, bonus, timestamp: Date.now(), pointsBonus },
            pitchPointsBonus: (prev.pitchPointsBonus || 0) + pointsBonus,
            economics: {
                ...prev.economics,
                hardwareLimit: Math.max(100, prev.economics.hardwareLimit + (bonus / 2)),
                softwareLimit: Math.max(40, prev.economics.softwareLimit + (bonus / 2)),
                transactionHistory: [
                    { 
                        id: Date.now(), 
                        type: bonus >= 0 ? 'income' : 'expense', 
                        label: bonus >= 0 ? 'ВЕНЧУРНЫЙ ПИТЧ: УСПЕХ' : 'ВЕНЧУРНЫЙ ПИТЧ: ОТКАЗ', 
                        amount: bonus, 
                        icon: bonus >= 0 ? '🎤' : '📉' 
                    },
                    ...(prev.economics.transactionHistory || []).slice(0, 9)
                ]
            },
            marketState: {
                ...prev.marketState,
                creditScore: Math.max(0, Math.min(100, prev.marketState.creditScore + (success ? 10 : -20)))
            }
        }));
        
        setTimeout(() => {
            setSimulationData(prev => ({
                ...prev,
                pitchOutcome: { completed: false, bonus: 0, timestamp: Date.now() }
            }));
        }, 3000);
    };
    
    const handleStartPitch = () => {
        if (pitchCooldown > 0) return;
        setIsPitching(true);
    };

    // === RACE SCORE: 1000-point system with decay ===
    // Базовые очки за завершение модулей
    const moduleCompletionScore = useMemo(() => {
        let score = 0;
        if (teamState.prototyping?.status === 'done') score += 200;
        if (teamState.modeling?.status === 'done') score += 200;
        if (teamState.coding?.status === 'done') score += 200;
        return score;
    }, [teamState]);

    // Очки за близость к идеальному роботу
    const idealRobotScore = useMemo(() => {
        let score = 0;
        
        // Proto ideal score (берём ЛУЧШИЙ результат из сессии)
        const bestProto = Math.max(simulationData.protoIdealScore || 0, simulationData.protoBestIdealScore || 0);
        score += Math.round(bestProto * 1.35); // Увеличиваем вес качества (x1.35)
        
        // Бонус за фильтры (код)
        const hasFilter = (simulationData.software?.nodes || []).some(n => 
            n.type === 'kalman_filter' || n.type === 'ai_filter_adv'
        );
        if (hasFilter) score += 30; // Было 20

        // Бонус за питчи
        score += (simulationData.pitchPointsBonus || 0);
        
        return score;
    }, [simulationData.protoIdealScore, simulationData.protoBestIdealScore, simulationData.software, simulationData.pitchPointsBonus]);

    // Decay: теряем 5 очков каждые 2 секунды
    const [decayTick, setDecayTick] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDecayTick(t => t + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const totalDecay = decayTick * 5; // 5 очков за тик
    
    // Штраф за незавершённые модули
    const incompletePenalty = useMemo(() => {
        let penalty = 0;
        if (teamState.prototyping?.status !== 'done') penalty += 100;
        if (teamState.modeling?.status !== 'done') penalty += 100;
        if (teamState.coding?.status !== 'done') penalty += 100;
        return penalty;
    }, [teamState]);

    const projectedScore = useMemo(() => {
        const allDone = teamState.prototyping?.status === 'done' && 
                        teamState.modeling?.status === 'done' && 
                        teamState.coding?.status === 'done';
        
        const baseScore = moduleCompletionScore + idealRobotScore;
        const decayToApply = allDone ? 0 : totalDecay;
        const netScore = Math.max(0, baseScore - decayToApply - incompletePenalty);
        return Math.min(1000, Math.round(netScore));
    }, [moduleCompletionScore, idealRobotScore, totalDecay, incompletePenalty, teamState]);

    // Отображение таймера decay
    const [secondsSinceTick, setSecondsSinceTick] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsSinceTick(s => (s + 1) % 2);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleReleaseProject = () => {
        const prototypingDone = teamState.prototyping?.status === 'done';
        const codingDone = teamState.coding?.status === 'done';
        
        if (!prototypingDone || !codingDone) {
            let missing = [];
            if (!prototypingDone) missing.push("КОНСТРУКТОР (Constructor)");
            if (!codingDone) missing.push("ПРОГРАММИСТ (Programmer)");
            
            alert(`❗ ОШИБКА ВЫПУСКА: Проект не может быть завершен без подтверждения от следующих участников:\n\n- ${missing.join("\n- ")}\n\nСначала они должны нажать «ПОДТВЕРДИТЬ ПРОЕКТ» в своих терминалах.`);
            return;
        }
        
        setSimulationData(prev => ({
            ...prev,
            finalResult: {
                totalScore: projectedScore,
                engineering: idealRobotScore,
                completion: moduleCompletionScore,
                pitching: prev.pitchPointsBonus || 0,
                trust: prev.marketState?.creditScore || 70,
                timestamp: Date.now(),
                metrics: {
                    bom: totals.bomCost,
                    reliability: totals.reliabilityScore,
                    cycle: totals.estimatedCycleSeconds,
                    payload: totals.payloadCapacity
                }
            }
        }));

        setTeamState(prev => ({
            ...prev,
            modeling: { progress: 100, status: 'done' }
        }));
        setCurrentScreen('final');
    };

    // MARKET ENGINE: Обновление индексов и репутации
    useEffect(() => {
        const interval = setInterval(() => {
            const m = simulationData.marketState || {};
            const econ = simulationData.economics || {};

            // 1. Колебания индексов
            const updateIdx = (val) => Number((val + (Math.random() * 0.02 - 0.01)).toFixed(3));
            
            // КОРИДОРНЫЕ БОНУСЫ: Мумбаи (тяжмет/энергия -5%), Граница (чипы/тех -5%)
            const corridor = m.activeCorridor || 'mumbai';
            const techBonus = corridor === 'border' ? 0.95 : 1.0;
            const energyBonus = corridor === 'mumbai' ? 0.95 : 1.0;

            const newIndices = {
                tech: updateIdx((m.indices?.tech || 1) * techBonus),
                energy: updateIdx((m.indices?.energy || 1) * energyBonus),
                logistics: updateIdx(m.indices?.logistics || 1)
            };

            // 2. Обновление истории
            const updateHist = (hist, newVal) => [...(hist || [1,1,1,1,1]).slice(1), newVal];
            const newHistory = {
                tech: updateHist(m.history?.tech, newIndices.tech),
                energy: updateHist(m.history?.energy, newIndices.energy),
                logistics: updateHist(m.history?.logistics, newIndices.logistics)
            };

            // 3. Обновление инвестиций
            const updateInvest = (type) => {
                const amount = m.investments?.[type] || 0;
                if (amount <= 0) return 0;
                return Number((amount * (newIndices[type] / (m.indices?.[type] || 1))).toFixed(2));
            };
            const newInvestments = {
                tech: updateInvest('tech'),
                energy: updateInvest('energy'),
                logistics: updateInvest('logistics')
            };

            // 4. Расчет репутации
            let newScore = m.creditScore || 70;
            if (econ.kpiBonus > 0) newScore += 0.5;
            if (totals.bomCost > (econ.hardwareLimit + econ.softwareLimit)) newScore -= 1.0;
            if (totals.mechanicalRisk) newScore -= 0.5;
            if (econ.debt > 0) newScore -= 0.2; 
            newScore = Math.max(0, Math.min(100, newScore));

            // 5. Бонусы и долги
            let bonusMoney = 0;
            if (m.contracts?.length > 0) {
                m.contracts.forEach(id => {
                    const cfg = GOV_CONTRACTS.find(gc => gc.id === id);
                    if (cfg) bonusMoney += cfg.bonus;
                });
            }
            const debtInterest = Math.round((econ.debt || 0) * 0.02);

            setSimulationData(prev => {
                const history = [...(prev.economics.transactionHistory || [])];
                if (bonusMoney > 0) {
                    history.unshift({ id: Date.now(), type: 'income', label: 'ВЫПЛАТА ПО КОНТРАКТАМ', amount: bonusMoney, icon: '📜' });
                }
                if (debtInterest > 0) {
                    history.unshift({ id: Date.now() + 1, type: 'expense', label: 'ПРОЦЕНТЫ ПО ДОЛГУ', amount: -debtInterest, icon: '🏦' });
                }

                return {
                    ...prev,
                    economics: {
                        ...prev.economics,
                        hardwareLimit: prev.economics.hardwareLimit + bonusMoney/2 - debtInterest/2,
                        softwareLimit: prev.economics.softwareLimit + bonusMoney/2 - debtInterest/2,
                        transactionHistory: history.slice(0, 10)
                    },
                    marketState: {
                        ...m,
                        indices: newIndices,
                        history: newHistory,
                        investments: newInvestments,
                        creditScore: newScore
                    }
                };
            });

        }, 15000); 

        return () => clearInterval(interval);
    }, [simulationData.marketState, simulationData.economics, totals]);


    const insights = useMemo(() => {
        const list = [];
        const [cPrice, cSpeed, cPayload, cPrecision] = currentMetrics.radar;
        const [tPrice, tSpeed, tPayload, tPrecision] = targetMetrics;

        if (cPrice < tPrice) list.push({ type: 'warning', text: 'Критический перерасход бюджета! Маржа проекта под угрозой.' });
        if (cSpeed < tSpeed) list.push({ type: 'info', text: 'Скорость не соответствует новым ввводным. Нужна оптимизация приводов.' });
        if (cPayload < tPayload) list.push({ type: 'warning', text: 'Грузоподъемность ниже лимита Заказчика. Риск поломки при захвате.' });
        if (cPrecision < tPrecision) list.push({ type: 'info', text: 'Технические риски: повысьте надежность через материалы рамы.' });
        
        if (list.length === 0) list.push({ type: 'success', text: 'Модель идеальна для текущей ситуации. Утверждайте проект.' });
        return list;
    }, [currentMetrics, targetMetrics]);

    useEffect(() => {
        setTeamState(prev => ({
            ...prev,
            modeling: {
                progress: Math.round((radarData.reduce((s,v) => s+v, 0) / 4) * 100),
                status: 'playing'
            }
        }));
    }, [radarData, setTeamState]);

    const handleInvest = (type, amount) => {
        const m = marketState;
        // Позволяем уходить в минус

        setSimulationData(prev => ({
            ...prev,
            economics: { ...prev.economics, hardwareLimit: prev.economics.hardwareLimit - amount/2, softwareLimit: prev.economics.softwareLimit - amount/2 },
            marketState: {
                ...prev.marketState,
                investments: {
                    ...prev.marketState.investments,
                    [type]: (prev.marketState.investments?.[type] || 0) + amount
                }
            }
        }));
    };

    const handleSell = (type) => {
        const amount = simulationData.marketState.investments?.[type] || 0;
        if (amount <= 0) return;

        setSimulationData(prev => ({
            ...prev,
            economics: { ...prev.economics, hardwareLimit: prev.economics.hardwareLimit + amount/2, softwareLimit: prev.economics.softwareLimit + amount/2 },
            marketState: {
                ...prev.marketState,
                investments: { ...prev.marketState.investments, [type]: 0 }
            }
        }));
    };

    const takeAdvance = () => {
        const limit = (marketState.creditScore / 100) * 500;
        if (economics.debt + 100 > limit) return;

        setSimulationData(prev => ({
            ...prev,
            economics: {
                ...prev.economics,
                hardwareLimit: prev.economics.hardwareLimit + 50,
                softwareLimit: prev.economics.softwareLimit + 50,
                debt: (prev.economics.debt || 0) + 100
            }
        }));
    };

    const repayFullDebt = () => {
        const total = economics.debt || 0;
        if ((economics.hardwareLimit + economics.softwareLimit) < total) return;
        setSimulationData(prev => ({
            ...prev,
            economics: {
                ...prev.economics,
                hardwareLimit: prev.economics.hardwareLimit - total/2,
                softwareLimit: prev.economics.softwareLimit - total/2,
                debt: 0
            }
        }));
    };

    const signContract = (contract) => {
        if (marketState.contracts?.includes(contract.id)) return;
        if (marketState.creditScore < contract.minRep) return;

        setSimulationData(prev => ({
            ...prev,
            economics: {
                ...prev.economics,
                hardwareLimit: prev.economics.hardwareLimit + contract.advance/2,
                softwareLimit: prev.economics.softwareLimit + contract.advance/2
            },
            marketState: {
                ...prev.marketState,
                contracts: [...(prev.marketState.contracts || []), contract.id]
            }
        }));
    };

    const handleSwitchCorridor = (id) => {
        setSimulationData(prev => ({
            ...prev,
            marketState: { ...prev.marketState, activeCorridor: id }
        }));
    };

    const fixLogistics = () => {
        if (!simulationData.marketState?.activeAlert || simulationData.marketState?.activeAlert?.type !== 'logistics') return;
        const COST = 30;
        if ((economics.hardwareLimit + economics.softwareLimit) < COST) return;

        setSimulationData(prev => ({
            ...prev,
            economics: {
                ...prev.economics,
                hardwareLimit: prev.economics.hardwareLimit - COST/2,
                softwareLimit: prev.economics.softwareLimit - COST/2
            },
            marketState: {
                ...prev.marketState,
                activeAlert: null // Снимаем алерт
            }
        }));
    };



    const lastIndices = marketState.indices || { tech: 1, energy: 1, logistics: 1 };
    const nextUpdateSecs = Math.max(0, Math.round(((marketState.nextUpdate || 0) - Date.now()) / 1000));

    // Проверка режима просмотра
    const isViewingMode = userRole && userRole !== 'model';

    return (
        <div className="sim-screen prof-theme game-screen game-screen-model" style={{
            background: 'var(--prof-bg)',
            color: 'var(--prof-text-main)',
            display: 'grid',
            gridTemplateAreas: '"ticker ticker ticker" "intake spending analytics"',
            gridTemplateColumns: '1fr 1.2fr 1fr',
            gridTemplateRows: 'auto 1fr',
            height: '100vh',
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif",
            paddingTop: '64px',
            boxSizing: 'border-box',
            pointerEvents: isViewingMode ? 'none' : 'auto',
            opacity: isViewingMode ? 0.7 : 1
        }}>
            {isPitching && <PitchDuel onFinish={handlePitchFinish} simulationData={simulationData} />}
            <div style={{ gridArea: 'ticker' }}>
                <MarketTicker activeNews={currentActiveNews} />
            </div>

            {/* 1. SECTOR: INTAKE (ТЗ И ФИНАНСЫ) */}
            <aside style={{ 
                gridArea: 'intake', 
                padding: '15px', 
                background: 'var(--prof-sidebar)', 
                borderRight: '1px solid var(--prof-border)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                height: '100%',
                boxSizing: 'border-box',
                overflowY: 'auto' 
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '13px', fontWeight: '900', color: 'var(--prof-accent)', letterSpacing: '2px', paddingBottom: '6px', borderBottom: '2px solid var(--prof-accent)' }}>
                    I. REPUTATION & CAPITAL / РЕПУТАЦИЯ И ДЕНЬГИ
                </div>

                <TrustGauge score={marketState.creditScore || 70} />

                {/* PROJECT CHARTER SUMMARY */}
                {showCharter && (
                    <ProjectCharter 
                        scenario={scenario} 
                        totals={totals} 
                        economics={economics} 
                        marketState={marketState} 
                        onClose={() => setShowCharter(false)}
                    />
                )}

                {/* REPUTATION GAUGE & ADVANCE */}
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--prof-border)', position: 'relative' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'stretch' }}>
                        {/* LEFT: BALANCE */}
                        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ fontSize: '9px', color: 'var(--prof-text-dim)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>ТЕКУЩИЙ БАЛАНС</div>
                            <div style={{ 
                                fontSize: '32px', 
                                fontWeight: '900', 
                                color: (economics.hardwareLimit + economics.softwareLimit) < 0 ? 'var(--prof-error)' : '#fff', 
                                letterSpacing: '1px',
                                textShadow: (economics.hardwareLimit + economics.softwareLimit) < 0 ? '0 0 20px var(--prof-error)44' : 'none',
                                transition: 'all 0.4s',
                                marginBottom: (economics.hardwareLimit + economics.softwareLimit) < 0 ? '0' : '2px'
                            }}>
                                ${Math.round(economics.hardwareLimit + economics.softwareLimit)}
                            </div>
                            {(economics.hardwareLimit + economics.softwareLimit) < 0 && (
                                <div style={{ fontSize: '8px', color: 'var(--prof-error)', marginTop: '4px', fontWeight: '800', letterSpacing: '1px', textAlign: 'center' }}>
                                    ⚠️ ОВЕРДРАФТ
                                </div>
                            )}
                        </div>

                        {/* VERTICAL DIVIDER */}
                        <div style={{ width: '1px', background: 'rgba(255,255,255,0.05)', margin: '5px 0' }}></div>

                        {/* RIGHT: HISTORY */}
                        <div style={{ flex: '1.5' }}>
                            <div style={{ fontSize: '9px', color: 'var(--prof-accent)', fontWeight: '900', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>История изменений:</div>
                            <div style={{ 
                                maxHeight: '110px', 
                                overflowY: 'auto', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '4px',
                                paddingRight: '5px'
                            }}>
                                {(economics.transactionHistory || []).length === 0 && (
                                    <div style={{ fontSize: '9px', color: 'var(--prof-text-dim)', fontStyle: 'italic', textAlign: 'center', opacity: 0.5, marginTop: '25px' }}>Нет транзакций...</div>
                                )}
                                {(economics.transactionHistory || []).map(tx => (
                                    <div key={tx.id} style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center', 
                                        padding: '4px 6px', 
                                        background: 'rgba(255,255,255,0.02)', 
                                        borderRadius: '3px',
                                        borderLeft: `2px solid ${tx.type === 'income' ? 'var(--prof-success)' : 'var(--prof-error)'}`
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: '1', minWidth: 0 }}>
                                            <span style={{ fontSize: '10px', flexShrink: 0 }}>{tx.icon}</span>
                                            <span style={{ 
                                                fontSize: '9px', 
                                                color: 'var(--prof-text-main)', 
                                                whiteSpace: 'nowrap', 
                                                overflow: 'hidden', 
                                                textOverflow: 'ellipsis', 
                                                flex: '1'
                                            }}>{tx.label}</span>
                                        </div>
                                        <div style={{ fontSize: '10px', fontWeight: '900', color: tx.type === 'income' ? 'var(--prof-success)' : 'var(--prof-error)' }}>
                                            {tx.amount > 0 ? '+' : ''}{tx.amount}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                
                {/* PITCHING PLATFORM - SEPARATE BLOCK / ОТДЕЛЬНАЯ ПЛАШКА */}
                <div>
                    <div className="prof-card" style={{ padding: '20px', background: 'rgba(255,179,107,0.05)', border: '1px solid rgba(255,179,107,0.4)', borderRadius: '12px', textAlign: 'center' }}>
                        <div style={{ fontSize: '10px', color: 'var(--prof-accent)', fontWeight: '900', letterSpacing: '1.5px', marginBottom: '12px', textTransform: 'uppercase' }}>
                            {simulationData.pitchOutcome?.completed ? 'ИНВЕСТИЦИОННЫЙ РАУНД ПОВТОРНО' : 'ИНВЕСТИЦИОННЫЙ РАУНД'}
                        </div>

                        {/* Button with cooldown progress bar */}
                        <div style={{ position: 'relative', width: '100%', marginBottom: '10px', borderRadius: '4px', overflow: 'hidden' }}>
                            {/* Cooldown progress bar background */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: pitchCooldown > 0 ? 'rgba(0,0,0,0.3)' : 'transparent',
                                borderRadius: '4px'
                            }}>
                                {/* Cooldown progress bar fill */}
                                {pitchCooldown > 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, var(--prof-accent) 0%, #ffb36b 100%)',
                                        width: `${((60 - pitchCooldown) / 60) * 100}%`,
                                        transition: 'width 1s linear',
                                        opacity: 0.3
                                    }} />
                                )}
                            </div>
                            
                            <button
                                className="btn-prof primary"
                                onClick={handleStartPitch}
                                disabled={pitchCooldown > 0}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    fontSize: '13px',
                                    background: pitchCooldown > 0 ? 'rgba(139,148,158,0.15)' : 'var(--prof-accent)',
                                    border: pitchCooldown > 0 ? '2px dashed rgba(139,148,158,0.3)' : 'none',
                                    color: pitchCooldown > 0 ? 'rgba(255,255,255,0.35)' : 'black',
                                    fontWeight: '900',
                                    letterSpacing: '1px',
                                    boxShadow: pitchCooldown > 0 ? 'none' : '0 4px 15px rgba(255,179,107,0.3)',
                                    cursor: pitchCooldown > 0 ? 'not-allowed' : 'pointer',
                                    opacity: pitchCooldown > 0 ? 0.65 : 1,
                                    transition: 'all 0.3s',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                {pitchCooldown > 0 ? (
                                    <span>⏱ ПИТЧ НЕДОСТУПЕН ({pitchCooldown}с)</span>
                                ) : (
                                    <span>🎤 {simulationData.pitchOutcome?.completed ? 'НОВЫЙ ПИТЧ' : 'НАЧАТЬ ПИТЧ ВЕНЧУР-ФОНДУ'}</span>
                                )}
                            </button>
                        </div>

                        <div style={{ marginTop: '10px', fontSize: '9px', color: 'var(--prof-text-dim)', fontStyle: 'italic', minHeight: '12px' }}>
                            {pitchCooldown > 0
                                ? ''
                                : 'Докажите инвесторам, что ваш проект достоин вложений'}
                        </div>
                    </div>
                </div>
                
                {/* FINAL RELEASE CONTROLS - Moved from right column */}
                <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid var(--prof-border)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                        {/* Score progress bar - теперь показывает прогресс очков */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            height: '3px',
                            background: 'linear-gradient(90deg, var(--prof-accent) 0%, var(--prof-success) 100%)',
                            width: `${Math.min(100, (projectedScore / 1000) * 100)}%`,
                            transition: 'width 0.5s ease-out',
                            opacity: 0.8,
                            boxShadow: '0 0 10px var(--prof-accent)'
                        }} />
                        <div style={{ fontSize: '13px', fontWeight: '900', color: '#ffb36b', letterSpacing: '1px' }}>
                            ФИНАЛЬНЫЕ ОЧКИ: <span style={{ fontSize: '24px' }}>{projectedScore}</span> / 1000
                        </div>
                        <div style={{ fontSize: '8px', color: 'var(--prof-text-dim)', marginTop: '4px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                            <span>🛠 ИНЖЕНЕРИЯ: {idealRobotScore}</span>
                            <span>•</span>
                            <span>📦 ГОТОВНОСТЬ: {moduleCompletionScore}/600</span>
                        </div>
                        <div style={{ fontSize: '8px', color: 'var(--prof-text-dim)', marginTop: '2px' }}>
                            {teamState.prototyping?.status === 'done' && teamState.modeling?.status === 'done' && teamState.coding?.status === 'done' 
                                ? '✓ Все модули завершены — очки не убывают'
                                : `⏱ -5 очков через ${2 - secondsSinceTick}с`}
                        </div>
                        {simulationData.pitchOutcome?.completed && (
                            <div style={{ 
                                fontSize: '11px', 
                                color: simulationData.pitchOutcome.bonus >= 0 ? 'var(--prof-success)' : 'var(--prof-error)', 
                                marginTop: '6px', 
                                fontWeight: '800',
                                animation: 'pulse 2s infinite'
                            }}>
                                🎤 ПИТЧ: {simulationData.pitchOutcome.bonus >= 0 ? '+' : ''}${simulationData.pitchOutcome.bonus}
                                {simulationData.pitchOutcome.pointsBonus > 0 && (
                                    <span style={{ marginLeft: '10px', color: 'var(--prof-accent)' }}>
                                        🎯 +{simulationData.pitchOutcome.pointsBonus} ОЧКОВ
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex' }}>
                            <button className="btn-prof primary"
                                onClick={handleReleaseProject}
                                style={{
                                    flex: 1, fontSize: '15px', fontWeight: '900',
                                    background: 'var(--prof-success)', color: 'black', border: 'none',
                                    boxShadow: '0 0 20px rgba(46, 204, 113, 0.3)',
                                    height: '48px'
                                }}
                            >
                                🚀 ВЫПУСК
                            </button>
                        </div>
                        {!(teamState.prototyping?.status === 'done' && teamState.coding?.status === 'done') && (
                            <div style={{ 
                                fontSize: '9px', 
                                color: 'rgba(255,255,255,0.5)', 
                                textAlign: 'center',
                                padding: '6px',
                                background: 'rgba(255, 179, 107, 0.1)',
                                borderRadius: '4px',
                                border: '1px solid rgba(255, 179, 107, 0.3)'
                            }}>
                                 ⚠ Ожидание: 
                                 {teamState.prototyping?.status !== 'done' && ' КОНСТРУКТОР'}
                                 {teamState.prototyping?.status !== 'done' && teamState.coding?.status !== 'done' && ' + '}
                                 {teamState.coding?.status !== 'done' && 'ПРОГРАММИСТ'}
                            </div>
                        )}
                    </div>
                    
                </div>
            </aside>

            {/* 2. SECTOR: OPERATIONS (ЦЕНТРАЛЬНЫЙ ПУЛЬТ) */}
            <section style={{ gridArea: 'spending', padding: '15px', background: 'rgba(0,0,0,0.1)', borderRight: '1px solid var(--prof-border)', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: '900', color: 'var(--prof-warn)', letterSpacing: '2px', paddingBottom: '8px', borderBottom: '2px solid var(--prof-warn)', marginBottom: '5px' }}>
                    II. CORE OPERATIONS / СОСТОЯНИЕ ПРОЕКТА
                </div>

                {/* РОЗА (РАДАР) ОПТИМИЗИРОВАННЫЙ РАЗМЕР */}
                <div className="prof-card" style={{ padding: '12px 10px', textAlign: 'center', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', border: '1px solid rgba(0,243,255,0.05)' }}>
                    <div style={{ fontSize: '9px', fontWeight: '900', color: 'var(--prof-accent)', letterSpacing: '2px', marginBottom: '8px', textTransform: 'uppercase' }}>RADAR IDEALIS (КАЧЕСТВО ПРОЕКТА)</div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <RadarChart current={radarData} target={targetMetrics} size={280} />
                    </div>
                    
                    <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '9px', fontWeight: '700' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '12px', height: '0', borderTop: '2px dashed var(--prof-accent)' }} />
                            <span style={{ color: 'var(--prof-text-dim)' }}>ЦЕЛЬ</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '12px', height: '12px', background: 'rgba(255, 179, 107, 0.25)', border: '1px solid #ffb36b' }} />
                            <span style={{ color: 'var(--prof-text-dim)' }}>ФАКТ</span>
                        </div>
                    </div>
                </div>

                {/* 2. SUPPLY MARKET & SHOP (Expanded to bottom) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', flex: 1, minHeight: '150px' }}>
                    {/* SAMPLE MARKET */}
                    <div style={{ 
                        background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,179,107,0.3)',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{ fontSize: '13px', fontWeight: '900', color: '#ffb36b', marginBottom: '15px', letterSpacing: '1px' }}>РЫНОК ОБРАЗЦОВ (HARDWARE)</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                            {[
                                { id: 'teensy_41', name: 'Teensy 4.1', price: 45, desc: 'Микроконтроллер 600 МГц для ускорения расчетов.' },
                                { id: 'robotiq_2f85', name: 'Robotiq 2F-85', price: 160, desc: 'Адаптивный захват для объектов любой формы.' },
                                { id: 'dynamixel_xl430', name: 'Dyn XL430', price: 80, desc: 'Сервопривод с обратной связью по позиции.' },
                                { id: 'nema17_42', name: 'NEMA 17 Stepper', price: 35, desc: 'Шаговый двигатель для высокого удержания позиции.' }
                            ].map(sample => {
                                const owned = simulationData.purchasedSamples?.includes(sample.id);
                                return (
                                    <div key={sample.id} style={{ 
                                        padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', 
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flex: 1
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{sample.name}</div>
                                            <div style={{ fontSize: '10px', opacity: 0.5, lineHeight: '1.1', marginTop: '1px' }}>{sample.desc}</div>
                                        </div>
                                        <button 
                                            className="btn-prof" 
                                            disabled={owned || (economics.hardwareLimit + economics.softwareLimit) < sample.price}
                                            onClick={() => purchaseSample(sample.id, sample.price)}
                                            style={{ 
                                                padding: '8px 16px', fontSize: '12px', minWidth: '80px',
                                                background: owned ? 'var(--prof-success)33' : '',
                                                border: owned ? '1px solid var(--prof-success)' : '1px solid #ffb36b',
                                                color: owned ? 'var(--prof-success)' : '#ffb36b',
                                                fontWeight: '900'
                                            }}
                                        >
                                            {owned ? 'OWNED' : `$${sample.price}`}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. SOFTWARE SHOP (Expanded) */}
                    <div style={{ 
                        background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(175, 82, 222, 0.3)',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{ fontSize: '13px', fontWeight: '900', color: 'var(--neon-purple)', marginBottom: '15px', letterSpacing: '1px' }}>ЛИЦЕНЗИИ ПО И ТЕХНОЛОГИИ</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                            {SOFTWARE_SHOP.map(item => {
                                const owned = economics.purchasedLibraries?.includes(item.id);
                                return (
                                    <div key={item.id} style={{ 
                                        padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', 
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flex: 1
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{item.name}</div>
                                            <div style={{ fontSize: '10px', opacity: 0.5, lineHeight: '1.1', marginTop: '1px' }}>{item.desc}</div>
                                        </div>
                                        <button 
                                            className="btn-prof" 
                                            disabled={owned || (economics.hardwareLimit + economics.softwareLimit) < item.price}
                                            onClick={() => buySoftware(item)}
                                            style={{ 
                                                padding: '8px 16px', fontSize: '12px', minWidth: '80px',
                                                border: '1px solid var(--neon-purple)', color: 'var(--neon-purple)', fontWeight: '900' 
                                            }}
                                        >
                                            {owned ? 'ACTIVE' : `$${item.price}`}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SECTOR: ANALYTICS & OPS (ОСТАЛЬНЫЕ ФИЧИ) */}
            <main style={{ gridArea: 'analytics', padding: '20px', background: 'var(--prof-sidebar)', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                <div style={{ fontSize: '15px', fontWeight: '900', color: 'var(--prof-success)', letterSpacing: '2px', paddingBottom: '10px', borderBottom: '2px solid var(--prof-success)' }}>
                    III. ANALYTICS & RELEASE / АНАЛИТИКА И ВЫПУСК
                </div>

                {/* STRATEGIC DECK / КОЛОДА ДЕЙСТВИЙ - REPOSITIONED TO RIGHT */}
                <div style={{ pointerEvents: collaboration.panicActive ? 'none' : 'auto', opacity: collaboration.panicActive ? 0.5 : 1 }}>
                    <div style={{ fontSize: '11px', fontWeight: '900', color: 'var(--prof-accent)', letterSpacing: '2px', marginBottom: '15px' }}>
                        СТРАТЕГИЧЕСКАЯ КОЛОДА (CEO ACTIONS)
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        {STRATEGIC_ACTIONS.map(card => {
                            const isPlayed = simulationData.marketState?.playedCards?.includes(card.id);
                            if (isPlayed) return null;

                            return (
                                <div key={card.id} className="prof-card" style={{ 
                                    padding: '12px', background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,179,107,0.3)', 
                                    display: 'flex', flexDirection: 'column', height: '100%', gap: '8px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '9px', fontWeight: '900', color: 'var(--prof-text-dim)', opacity: 0.5 }}>{card.type}</div>
                                        <div style={{ fontSize: '14px' }}>{card.cost.icon}</div>
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: '900', lineHeight: '1.2', color: '#fff' }}>{card.name}</div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ fontSize: '10px', color: 'var(--prof-error)', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{opacity:0.6}}>ЦЕНА:</span>
                                            <span style={{fontWeight:'800'}}>{card.cost.label}</span>
                                        </div>
                                        <div style={{ fontSize: '10px', color: 'var(--prof-success)', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{opacity:0.6}}>БОНУС:</span>
                                            <span style={{fontWeight:'800'}}>{card.result.label}</span>
                                        </div>
                                    </div>

                                    <div style={{ fontSize: '10px', color: 'var(--prof-text-dim)', fontStyle: 'italic', lineHeight: '1.3', padding: '4px 0' }}>
                                        {card.desc}
                                    </div>

                                    <button 
                                        className="btn-prof primary" 
                                        onClick={() => playStrategicCard(card)}
                                        style={{ fontSize: '11px', padding: '10px', background: 'var(--prof-accent)22', border: '1px solid var(--prof-accent)', marginTop: 'auto', fontWeight: '900' }}
                                    >
                                        АКТИВИРОВАТЬ
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>



                {simulationData.marketState?.activeAlert?.type === 'logistics' && (
                    <button className="btn-prof" onClick={fixLogistics} style={{ width: '100%', padding: '10px', background: 'rgba(231, 76, 60, 0.2)', border: '1px solid var(--prof-error)', color: 'var(--prof-error)', fontSize: '10px', fontWeight: '900' }}>
                        ⚡ ОПЛАТИТЬ ПОШЛИНУ ДЛЯ РАЗБЛОКИРОВКИ ($30)
                    </button>
                )}

                {/* 3. COMMAND CENTER / СВЯЗЬ */}
                <div style={{
                    marginTop: 'auto',
                    paddingTop: '16px'
                }}>
                    <ChatPanel variant="large" />
                </div>

            </main>
        </div>
    );
};
