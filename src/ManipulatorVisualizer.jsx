/**
 * RobotLivePreview Component
 *
 * Real-time SVG visualization of a 3-axis manipulator arm that updates instantly
 * when hardware selections change in selectedHardware / simulationData.hardware.
 *
 * Hardware → Visual mapping:
 *  - Actuators (Servos/Steppers): SG90 → тонкие линии; MG995 / NEMA 17 → массивные
 *    звенья с двойным контуром и «металлическим» градиентом.
 *  - Links (Каркас): толщина и стиль зависят от материала (Пластик — тонкие сплошные
 *    линии, Алюминий — широкие полые линии с технической штриховкой).
 *  - End-effector (Захват): полностью меняет форму (клешня / присоска / магнит).
 *
 * Reactivity: useEffect следит за hardware; при любом изменении атрибуты
 * stroke-width, d (path), transform обновляются мгновенно.
 *
 * Team Sync: объект визуальных параметров транслируется через localStorage /
 * merge.js всем участникам команды (инженер меняет мотор → программист видит
 * как манипулятор стал «тяжелее»).
 */

/* ──────────────────────────────────────────────
   1. HARDWARE → VISUAL MAPPER
   ────────────────────────────────────────────── */

const HARDWARE_VISUAL_MAP = {
    actuators: {
        /* SG90 — лёгкие, тонкие, голубые */
        sg90_micro: {
            type: 'micro',
            jointRadius: 7,
            strokeWidth: 1.5,
            linkStroke: '#5dade2',
            linkWidth: 6,
            color: '#5dade2',
            accent: '#3498db',
            isHeavy: false,
            metallic: false,
            showDoubleContour: false,
            showGradient: false,
            showHatching: false,
            glow: false,
            label: 'SG90 Micro'
        },
        /* MG90S — средние, бирюзовые */
        mg90s: {
            type: 'micro',
            jointRadius: 9,
            strokeWidth: 2,
            linkStroke: '#1abc9c',
            linkWidth: 8,
            color: '#1abc9c',
            accent: '#16a085',
            isHeavy: false,
            metallic: true,
            showDoubleContour: false,
            showGradient: true,
            showHatching: false,
            glow: false,
            label: 'MG90S'
        },
        /* MG995 — рабочие, зелёные */
        mg995: {
            type: 'servo',
            jointRadius: 12,
            strokeWidth: 3,
            linkStroke: '#2ecc71',
            linkWidth: 12,
            color: '#2ecc71',
            accent: '#27ae60',
            isHeavy: true,
            metallic: true,
            showDoubleContour: true,
            showGradient: true,
            showHatching: false,
            glow: false,
            label: 'MG995'
        },
        /* MG996R — усиленные, оранжевые */
        mg996r: {
            type: 'servo',
            jointRadius: 14,
            strokeWidth: 3.5,
            linkStroke: '#e67e22',
            linkWidth: 14,
            color: '#e67e22',
            accent: '#d35400',
            isHeavy: true,
            metallic: true,
            showDoubleContour: true,
            showGradient: true,
            showHatching: false,
            glow: false,
            label: 'MG996R'
        },
        /* Feetech — промышленные, фиолетовые */
        feetech_ft5335m: {
            type: 'servo',
            jointRadius: 15,
            strokeWidth: 3.5,
            linkStroke: '#9b59b6',
            linkWidth: 15,
            color: '#9b59b6',
            accent: '#8e44ad',
            isHeavy: true,
            metallic: true,
            showDoubleContour: true,
            showGradient: true,
            showHatching: false,
            glow: false,
            label: 'Feetech FT5335M'
        },
        /* NEMA 17 — промышленные шаговые, серебристые */
        nema17_42: {
            type: 'stepper',
            jointRadius: 18,
            strokeWidth: 4,
            linkStroke: '#95a5a6',
            linkWidth: 20,
            color: '#95a5a6',
            accent: '#ecf0f1',
            isHeavy: true,
            metallic: true,
            showDoubleContour: true,
            showGradient: true,
            showHatching: true,
            glow: false,
            label: 'NEMA 17'
        },
        /* Dynamixel — премиум, красные с glow */
        dynamixel_xl430: {
            type: 'smart',
            jointRadius: 12,
            strokeWidth: 3,
            linkStroke: '#e74c3c',
            linkWidth: 15,
            color: '#e74c3c',
            accent: '#ff6b6b',
            isHeavy: true,
            metallic: true,
            showDoubleContour: true,
            showGradient: true,
            showHatching: false,
            glow: true,
            label: 'Dynamixel XL430'
        }
    },

    /* Материал каркаса — определяется по контроллеру (условная логика) */
    materials: {
        plastic: {
            linkStroke: '#8fa7bc',
            linkWidth: 1.2,
            pattern: 'solid',
            opacity: 0.7,
            label: 'Plastic'
        },
        aluminum: {
            linkStroke: '#b0b0b0',
            linkWidth: 2.5,
            pattern: 'hatched',
            opacity: 0.85,
            label: 'Aluminum'
        }
    },

    grippers: {
        micro_gripper_sg90: {
            type: 'micro_claw',
            label: 'Micro Gripper SG90',
            color: '#a8e6cf',
            maxSpan: 10
        },
        parallel_gripper_2f: {
            type: 'claw',
            label: 'Parallel Gripper 2F',
            color: '#8cffb1',
            maxSpan: 20
        },
        vacuum_gripper_mini: {
            type: 'suction',
            label: 'Vacuum Gripper',
            color: '#ffd3b6',
            maxSpan: 14
        },
        robotiq_2f85: {
            type: 'adaptive_claw',
            label: 'Robotiq 2F-85',
            color: '#ffaaa5',
            maxSpan: 25
        }
    },
    controllers: {
        arduino_uno_r3: { fill: '#0068b5', stroke: '#00aced', label: 'ARDUINO UNO', type: 'board_large', ports: 20 },
        esp32_devkit: { fill: '#1a5276', stroke: '#5dade2', label: 'ESP32 DEV', type: 'board_compact', ports: 30 },
        stm32_nucleo_f446re: { fill: '#1e4d63', stroke: '#48c9b0', label: 'NUCLEO F446', type: 'board_pro', ports: 64 },
        teensy_41: { fill: '#4a235a', stroke: '#a569bd', label: 'TEENSY 4.1', type: 'board_slim', ports: 55 },
        raspberry_pi_4: { fill: '#b7950b', stroke: '#f4d03f', label: 'RPi 4B', type: 'board_computer', ports: 40 }
    }
};

/* Определяем материал каркаса: явный frameMaterial из hardware или fallback на контроллер */
const deriveMaterial = (controllerId, hardware) => {
    if (hardware?.frameMaterial) return hardware.frameMaterial;
    if (!controllerId) return 'aluminum';
    const cheapControllers = ['arduino_uno_r3', 'esp32_devkit'];
    return cheapControllers.includes(controllerId) ? 'plastic' : 'aluminum';
};

/* ──────────────────────────────────────────────
   2. SVG SUB-COMPONENTS
   ────────────────────────────────────────────── */

/** Металлический градиент для массивных приводов */
const MetallicGradient = ({ id, color, accent }) => (
    <radialGradient id={id} cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
        <stop offset="60%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor={color} stopOpacity="1" />
    </radialGradient>
);

/** Техническая штриховка (алюминий / NEMA) */
const HatchingPattern = ({ id }) => (
    <pattern id={id} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    </pattern>
);

/** Звено манипулятора (трапециевидный профиль как у промышленных роботов) */
const RobotLink = ({ x1, y1, x2, y2, actuatorConfig, materialConfig, linkIndex }) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const perpX = -dy / len;
    const perpY = dx / len;
    /* Трапеция: шире у основания (joint), уже у конца */
    const wideW = (actuatorConfig.linkWidth || 12) * 0.6;
    const narrowW = (actuatorConfig.linkWidth || 12) * 0.35;

    const gradId = `linkGrad-${linkIndex}`;
    const useGrad = actuatorConfig.metallic;

    return (
        <g className={`robot-link-group link-${linkIndex}`}>
            <defs>
                {useGrad ? <MetallicGradient id={gradId} color={actuatorConfig.color} accent={actuatorConfig.accent} /> : null}
            </defs>
            {/* Трапециевидное звено — шире у мотора */}
            <polygon
                points={`${x1 + perpX * wideW},${y1 + perpY * wideW} ${x2 + perpX * narrowW},${y2 + perpY * narrowW} ${x2 - perpX * narrowW},${y2 - perpY * narrowW} ${x1 - perpX * wideW},${y1 - perpY * wideW}`}
                fill={useGrad ? `url(#${gradId})` : 'rgba(10,15,25,0.5)'}
                stroke={actuatorConfig.linkStroke || materialConfig.linkStroke}
                strokeWidth={1}
                opacity={materialConfig.opacity}
                className="robot-link-body"
            />
            {/* Ребро жёсткости по центру */}
            <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={actuatorConfig.accent || '#fff'} strokeWidth={0.5} opacity={0.15}
            />
        </g>
    );
};

/** Сустав / мотор — промышленный стиль с фланцем и болтами */
/** Сустав / мотор — промышленный стиль с фланцем и болтами */
const RobotJoint = ({ cx, cy, config, jointIndex }) => {
    const gradId = `jointGrad-${jointIndex}`;
    const R = config.jointRadius || 10;
    const type = config.type || 'servo';

    return (
        <g className={`robot-joint-group joint-${jointIndex} type-${type}`}>
            <defs>
                {config.showGradient ? <MetallicGradient id={gradId} color={config.color} accent={config.accent} /> : null}
            </defs>
            
            {/* Outer glow для premium */}
            {config.glow && (
                <circle cx={cx} cy={cy} r={R + 8}
                    fill="none" stroke={config.accent} strokeWidth="2"
                    opacity="0.25" className="joint-glow"
                    style={{ animation: 'jointPulse 1.5s ease-in-out infinite', transition: 'all 0.3s ease' }} />
            )}

            {/* DESIGN BY TYPE */}
            {type === 'micro' && (
                <g>
                    {/* Характерный закругленный корпус MG90S/SG90 */}
                    <path d={`M ${cx-R} ${cy} 
                             L ${cx-R} ${cy-R*0.8} 
                             A ${R} ${R} 0 0 1 ${cx+R} ${cy-R*0.8} 
                             L ${cx+R} ${cy+R*0.8} 
                             A ${R*0.4} ${R*0.4} 0 0 1 ${cx+R*0.6} ${cy+R*1.2} 
                             L ${cx-R*0.6} ${cy+R*1.2} 
                             A ${R*0.4} ${R*0.4} 0 0 1 ${cx-R} ${cy+R*0.8} Z`}
                        fill="rgba(30,50,100,0.6)" stroke={config.accent} strokeWidth={1} />
                    {/* Силуэт шестерни */}
                    <circle cx={cx} cy={cy-R*0.3} r={R*0.6} fill="rgba(255,255,255,0.1)" stroke={config.accent} strokeWidth={0.5} strokeDasharray="1,1" />
                    <circle cx={cx} cy={cy-R*0.3} r={R*0.2} fill={config.accent} opacity={0.4} />
                </g>
            )}

            {type === 'servo' && (
                <g>
                    {/* Корпус сервопривода с "ушками" (MG995) */}
                    <path d={`M ${cx-R*1.5} ${cy-R*0.6} L ${cx-R*1.2} ${cy-R*0.6} 
                             L ${cx-R*1.2} ${cy-R*1} L ${cx+R*1.2} ${cy-R*1} 
                             L ${cx+R*1.2} ${cy-R*0.6} L ${cx+R*1.5} ${cy-R*0.6} 
                             L ${cx+R*1.5} ${cy-R*0.4} L ${cx+R*1.2} ${cy-R*0.4} 
                             L ${cx+R*1.2} ${cy+R*0.8} L ${cx-R*1.2} ${cy+R*0.8} 
                             L ${cx-R*1.2} ${cy-R*0.4} L ${cx-R*1.5} ${cy-R*0.4} Z`}
                        fill="rgba(25,30,40,0.9)" stroke={config.accent} strokeWidth={1} />
                    {/* Выступ вала */}
                    <rect x={cx+R*0.3} y={cy-R*1.3} width={R*0.6} height={R*0.4} fill={config.accent} opacity={0.5} />
                    {/* Крепежные отверстия в ушках */}
                    <circle cx={cx-R*1.35} cy={cy-R*0.5} r={1} fill="rgba(255,255,255,0.2)" />
                    <circle cx={cx+R*1.35} cy={cy-R*0.5} r={1} fill="rgba(255,255,255,0.2)" />
                    {/* Текстурная полоса */}
                    <rect x={cx-R*1.2} y={cy-R*0.2} width={R*2.4} height={R*0.4} fill="rgba(255,255,255,0.05)" />
                </g>
            )}

            {type === 'stepper' && (
                <g>
                    {/* Корпус Nema 17 с фасками */}
                    <path d={`M ${cx-R} ${cy-R+2} L ${cx-R+2} ${cy-R} L ${cx+R-2} ${cy-R} L ${cx+R} ${cy-R+2} L ${cx+R} ${cy+R-2} L ${cx+R-2} ${cy+R} L ${cx-R+2} ${cy+R} L ${cx-R} ${cy+R-2} Z`}
                        fill="rgba(35,40,50,0.95)" stroke={config.accent} strokeWidth={1.5} />
                    {/* Передний круглый фланец */}
                    <circle cx={cx} cy={cy} r={R*0.85} fill="rgba(255,255,255,0.05)" stroke={config.accent} strokeWidth={0.5} opacity={0.3} />
                    {/* Болты в углах */}
                    <circle cx={cx-R+3} cy={cy-R+3} r={1} fill={config.accent} opacity={0.6} />
                    <circle cx={cx+R-3} cy={cy-R+3} r={1} fill={config.accent} opacity={0.6} />
                    <circle cx={cx-R+3} cy={cy+R-3} r={1} fill={config.accent} opacity={0.6} />
                    <circle cx={cx+R-3} cy={cy+R-3} r={1} fill={config.accent} opacity={0.6} />
                    {/* Охлаждающие ребра */}
                    {[1, 2, 3].map(idx => (
                        <line key={idx} x1={cx - R + 2} y1={cy - R + idx * (R*2/4)} x2={cx + R - 2} y2={cy - R + idx * (R*2/4)}
                            stroke={config.accent} strokeWidth={0.5} opacity={0.1} />
                    ))}
                </g>
            )}

            {type === 'smart' && (
                <g>
                    {/* Усложненный восьмигранник Dynamixel */}
                    <path d={`M ${cx-R} ${cy-R*0.5} L ${cx-R*0.5} ${cy-R} L ${cx+R*0.5} ${cy-R} L ${cx+R} ${cy-R*0.5} L ${cx+R} ${cy+R*0.5} L ${cx+R*0.5} ${cy+R} L ${cx-R*0.5} ${cy+R} L ${cx-R} ${cy+R*0.5} Z`}
                        fill={config.showGradient ? `url(#${gradId})` : config.color} stroke={config.accent} strokeWidth={1.5} />
                    {/* Детализация креплений (4 винта) */}
                    <circle cx={cx-R*0.6} cy={cy-R*0.6} r={1.5} fill="rgba(0,0,0,0.4)" stroke={config.accent} strokeWidth={0.5} />
                    <circle cx={cx+R*0.6} cy={cy-R*0.6} r={1.5} fill="rgba(0,0,0,0.4)" stroke={config.accent} strokeWidth={0.5} />
                    <circle cx={cx-R*0.6} cy={cy+R*0.6} r={1.5} fill="rgba(0,0,0,0.4)" stroke={config.accent} strokeWidth={0.5} />
                    <circle cx={cx+R*0.6} cy={cy+R*0.6} r={1.5} fill="rgba(0,0,0,0.4)" stroke={config.accent} strokeWidth={0.5} />
                    {/* Центр с индикатором */}
                    <circle cx={cx} cy={cy} r={R*0.4} fill="rgba(0,0,0,0.2)" stroke={config.accent} strokeWidth={0.5} />
                    <circle cx={cx} cy={cy} r={2.5} fill={config.accent} style={{ animation: 'jointPulse 1s infinite' }}>
                        <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                    </circle>
                </g>
            )}

            {!['micro', 'servo', 'stepper', 'smart'].includes(type) && (
                <>
                    <circle cx={cx} cy={cy} r={R + 2} fill="rgba(10,15,25,0.7)" stroke={config.accent} strokeWidth={1} />
                    <circle cx={cx} cy={cy} r={R} fill={config.showGradient ? `url(#${gradId})` : config.color} stroke={config.accent} strokeWidth={1.5} opacity={0.9} />
                </>
            )}
        </g>
    );
};

/** Захват — промышленная параллельная клешня (Высокое качество) */
const GripperClaw = ({ x, y, isOpen, config }) => {
    const span = isOpen ? config.maxSpan : config.maxSpan * 0.15;
    return (
        <g className="gripper-claw" transform={`translate(${x}, ${y})`}>
            {/* Промышленный корпус с направляющей (Rail) */}
            <path d={`M -14 6 L -12 -6 L 12 -6 L 14 6 Z`}
                fill="rgba(20,25,35,0.9)" stroke={config.color} strokeWidth={1} />
            <rect x={-10} y={-2} width={20} height={3} rx={1} fill="rgba(0,0,0,0.4)" stroke={config.color} strokeWidth={0.5} opacity={0.3} />
            
            {/* Пальцы — составные (Proximal & Distal) */}
            {[-1, 1].map(side => {
                const off = side * span;
                const baseX = side * 6 + off;
                return (
                    <g key={side}>
                        {/* Проксимальное звено (рычаг) */}
                        <path d={`M ${side*4} 6 L ${baseX} 16 L ${baseX + side*4} 16 L ${side*8} 6 Z`}
                            fill={config.color} opacity={0.6} stroke={config.color} strokeWidth={0.5} 
                            style={{ transition: 'd 0.3s ease' }} />
                        {/* Дистальное звено (палец) */}
                        <path d={`M ${baseX} 16 L ${baseX} 28 L ${baseX + side*5} 28 L ${baseX + side*2} 16 Z`}
                            fill={config.color} opacity={0.8} stroke={config.color} strokeWidth={0.5} 
                            style={{ transition: 'd 0.3s ease' }} />
                        {/* Мягкая накладка (Grip Pad) */}
                        <rect x={side > 0 ? baseX : baseX + side*5} y={20} width={2} height={6} 
                            fill="rgba(0,0,0,0.5)" rx={0.5} 
                            style={{ transition: 'x 0.3s ease' }} />
                        {/* Шарнирные болты */}
                        <circle cx={baseX + side} cy={16} r={1.2} fill="#fff" opacity={0.4} 
                            style={{ transition: 'cx 0.3s ease' }} />
                    </g>
                );
            })}
        </g>
    );
};

/** Захват — микро-клешня (Высокое качество, скелетон) */
const GripperMicroClaw = ({ x, y, isOpen, config }) => {
    const angle = isOpen ? 25 : 5;
    const servoRot = isOpen ? -30 : 0;
    return (
        <g className="gripper-micro-claw" transform={`translate(${x}, ${y})`}>
            {/* Прозрачный корпус микро-серво SG90 */}
            <rect x={-7} y={-6} width={14} height={10} rx={1} fill="rgba(50,120,255,0.3)" stroke="rgba(50,120,255,0.6)" strokeWidth={0.8} />
            <circle cx={0} cy={-2} r={3} fill="rgba(255,255,255,0.1)" stroke="rgba(50,120,255,0.4)" strokeWidth={0.5} />
            
            {/* Качалка сервопривода (Horn) */}
            <rect x={-1} y={-6} width={2} height={8} rx={1} fill="#fff" opacity={0.5} 
                style={{ transform: `rotate(${servoRot}deg)`, transformOrigin: '0px -2px', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />

            {/* Тонкие скелетные пальцы */}
            {[-1, 1].map(side => {
                const rot = side * angle;
                return (
                    <g key={side}>
                        {/* Палец вращается вокруг своего мини-шарнира */}
                        <g style={{ transform: `rotate(${rot}deg)`, transformOrigin: `${side*2}px 4px`, transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                            <path d={`M ${side*3} 4 L ${side*5} 18 L ${side*2} 18 L ${side*1} 4 Z`}
                                fill={config.color} opacity={0.6} stroke={config.color} strokeWidth={0.5} />
                        </g>
                        {/* Мини-шарнир */}
                        <circle cx={side*2} cy={4} r={0.8} fill="#fff" opacity={0.3} />
                    </g>
                );
            })}
        </g>
    );
};

/** Компонент датчика (динамический и высокодетализированный) */
const HardwareSensor = ({ id, type, x, y, angle = 0, isTesting, label }) => {
    /* Цвета для разных типов сигналов */
    const typeColors = {
        vision: '#ff4d4d',
        distance: '#4da6ff',
        imu: '#ccff33',
        force: '#ff9933'
    };
    const baseColor = typeColors[type] || '#8fa7bc';

    return (
        <g transform={`translate(${x}, ${y}) rotate(${angle})`} className={`sensor-node-${id}`}>
            {type === 'force' ? (
                /* Структурный элемент (Механический мост-проставка) для датчика усилия */
                <g>
                    {/* Фланец к запястью */}
                    <rect x={-10} y={-8} width={20} height={4} rx={1} fill="#34495e" stroke="#2c3e50" strokeWidth={1} />
                    {/* Фланец к захвату */}
                    <rect x={-10} y={4} width={20} height={4} rx={1} fill="#34495e" stroke="#2c3e50" strokeWidth={1} />
                    {/* Деформируемое тензо-тело */}
                    <rect x={-6} y={-4} width={12} height={8} fill="#1a1a2e" stroke={baseColor} strokeWidth={1} />
                    <line x1={0} y1={-4} x2={0} y2={4} stroke={baseColor} strokeDasharray="1,1" strokeWidth={1} />
                </g>
            ) : type === 'vision' ? (
                /* Специальная высокая стойка (Stanchion) для обзора */
                <>
                    <rect x={-4} y={4} width={8} height={14} fill="rgba(30,35,45,0.9)" stroke="#455a64" strokeWidth={1} />
                    <line x1={-2} y1={4} x2={-2} y2={18} stroke="#455a64" strokeWidth={0.5} />
                    <line x1={2} y1={4} x2={2} y2={18} stroke="#455a64" strokeWidth={0.5} />
                    {/* Базовый кронштейн */}
                    <rect x={-6} y={16} width={12} height={3} rx={1} fill="#34495e" stroke="#2c3e50" strokeWidth={1} />
                    {/* Основной корпус (Body) */}
                    <rect x={-8} y={-6} width={16} height={12} rx={1.5} fill="#1a1a2e" stroke={baseColor} strokeWidth={1} />
                </>
            ) : (
                /* 1. Монтажный кронштейн (Bracket) — «прикручивает» датчик к корпусу */
                <>
                    <rect x={-6} y={4} width={12} height={4} fill="rgba(30,35,45,0.8)" stroke="#455a64" strokeWidth={0.5} />
                    <line x1={-4} y1={4} x2={-4} y2={8} stroke="#455a64" strokeWidth={0.5} />
                    <line x1={4} y1={4} x2={4} y2={8} stroke="#455a64" strokeWidth={0.5} />
                    {/* 2. Основной корпус (Body) */}
                    <rect x={-8} y={-6} width={16} height={12} rx={1.5} fill="#1a1a2e" stroke={baseColor} strokeWidth={1} />
                </>
            )}
            
            {/* 3. Специфические модели на основе ID */}
            {(() => {
                if (id === 'ultrasonic_hcsr04') {
                    return (
                        <>
                            {/* Два глаза HC-SR04 */}
                            <circle cx={-4} cy={0} r={3.5} fill="#000" stroke={baseColor} strokeWidth={0.5} />
                            <circle cx={4} cy={0} r={3.5} fill="#000" stroke={baseColor} strokeWidth={0.5} />
                            <circle cx={-4} cy={0} r={1.2} fill={baseColor} opacity={0.6} />
                            <circle cx={4} cy={0} r={1.2} fill={baseColor} opacity={0.6} />
                            {/* Кварцевый резонатор на плате */}
                            <rect x={-1.5} y={-3.5} width={3} height={1.5} fill="#ccc" opacity={0.4} />
                        </>
                    );
                }
                if (id?.includes('vl53l')) {
                    return (
                        <>
                            {/* ToF объектив со стеклом */}
                            <rect x={-4} y={-3} width={8} height={6} rx={0.5} fill="#0a0a0a" />
                            <rect x={-3} y={-2} width={2.5} height={4} fill={baseColor} opacity={0.6} />
                            <rect x={0.5} y={-2} width={2.5} height={4} fill={baseColor} opacity={0.2} />
                        </>
                    );
                }
                if (id === 'tfmini_lidar') {
                    return (
                        <>
                            {/* Лидарный объектив */}
                            <rect x={-6} y={-4} width={12} height={8} fill="#2c3e50" rx={1} />
                            <rect x={-4} y={-2} width={3} height={4} fill={baseColor} />
                            <rect x={1} y={-2} width={3} height={4} fill="#000" />
                        </>
                    );
                }
                if (id === 'ov2640_cam') {
                    return (
                        <>
                            {/* Камера с объективом */}
                            <circle cx={0} cy={0} r={4.5} fill="#000" stroke={baseColor} strokeWidth={1} />
                            <circle cx={0} cy={0} r={2} fill={baseColor} opacity={0.4} />
                            <circle cx={-1} cy={-1} r={0.8} fill="#fff" opacity={0.4} />
                            {/* Шлейф (визуально) */}
                            <rect x={-2} y={6} width={4} height={4} fill="#e67e22" opacity={0.5} />
                        </>
                    );
                }
                if (id === 'hx711_loadcell') {
                    return (
                        <g transform="scale(0.8)">
                            <rect x={-8} y={-2} width={16} height={4} rx={1} fill="#95a5a6" />
                            <path d="M-6 0 L6 0" stroke={baseColor} strokeWidth={1} strokeDasharray="1,1" />
                        </g>
                    );
                }
                if (id === 'mpu6050_imu') {
                    return (
                        <g transform="scale(0.9)">
                            <rect x={-6} y={-6} width={12} height={12} fill="#27ae60" opacity={0.2} />
                            <path d="M-3 0 L3 0 M0 -3 L0 3" stroke={baseColor} strokeWidth={1.5} />
                            <circle cx={0} cy={0} r={1.5} fill="none" stroke={baseColor} strokeWidth={0.5} />
                        </g>
                    );
                }
                return <circle cx={0} cy={0} r={2} fill={baseColor} />;
            })()}

            {/* 4. Теги и индикаторы с выноской */}
            <g transform="translate(10, 0)">
                <line x1={0} y1={-4} x2={10} y2={-4} stroke={baseColor} strokeWidth={0.5} opacity={0.5} />
                <text x={14} y={-2} fill={baseColor} fontSize={7} fontFamily="monospace" fontWeight="bold">
                    {label || id?.split('_')[0].toUpperCase()}
                </text>
            </g>

            {/* 5. Визуализация активности (Data Pulse) */}
            {isTesting && (
                <circle r={10} fill="none" stroke={baseColor} strokeWidth={0.5} opacity={0.2}>
                    <animate attributeName="r" values="6;14" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0" dur="1.2s" repeatCount="indefinite" />
                </circle>
            )}
        </g>
    );
};

/** Захват — вакуумный (Высокое качество, сильфон) */
const GripperSuction = ({ x, y, isOpen, config }) => {
    const cupR = config.maxSpan * 0.4 || 6;
    const bellowsH = isOpen ? 4 : 2; // Восстанавливаем оригинальный расчет высоты
    return (
        <g className="gripper-suction" transform={`translate(${x}, ${y})`}>
            {/* Вакуумный блок (Manifold) */}
            <rect x={-6} y={-14} width={12} height={10} rx={1.5} 
                fill="rgba(30,35,45,0.9)" stroke={config.color} strokeWidth={1} />
            {/* Штуцер (Air Fitting) */}
            <path d={`M -2 -14 L -3 -18 L 3 -18 L 2 -14 Z`} fill="#aaa" />
            
            {/* Сильфон (Bellows / Accordion) */}
            <g transform={`translate(0, -4)`}>
                {[0, 1, 2].map(i => (
                    <ellipse key={i} cx={0} cy={i * bellowsH + 4} rx={cupR + (2-i)*2} ry={2.5}
                        fill="rgba(10,15,25,0.7)" stroke={config.color} strokeWidth={0.8} 
                        style={{ transition: 'cy 0.3s ease' }} />
                ))}
                {/* Финальная присоска */}
                <ellipse cx={0} cy={3 * bellowsH + 4} rx={cupR + 6} ry={3}
                    fill={isOpen ? 'rgba(140,255,177,0.1)' : config.color}
                    stroke={config.color} strokeWidth={1} opacity={isOpen ? 0.4 : 0.8} 
                    style={{ transition: 'cy 0.3s ease, fill 0.3s ease, opacity 0.3s ease' }} />
            </g>
            
            {/* Манометр / Индикатор */}
            <circle cx={3} cy={-9} r={1.5} fill={isOpen ? '#8cffb1' : '#ffb36b'} style={{ transition: 'fill 0.3s' }} />
        </g>
    );
};

/** Захват — адаптивная клешня */
const GripperMagnet = ({ x, y, isOpen, config }) => {
    const spread = isOpen ? 16 : 3;
    return (
        <g className="gripper-magnet" transform={`translate(${x}, ${y})`}>
            <rect x={-6} y={-3} width={12} height={8} rx={2}
                fill="rgba(10,15,25,0.7)" stroke={config.color} strokeWidth={1} />
            
            {[-1, 1].map(side => {
                return (
                    <g key={side}>
                        <path d={`M ${side*3} 5 L ${side*(spread + 6)} 14 L ${side*(spread + 3)} 14 L ${side*1} 8`}
                            fill={config.color} opacity={0.6} stroke={config.color} strokeWidth={0.5} 
                            style={{ transition: 'd 0.3s ease' }} />
                        <line x1={side*(spread + 5)} y1={10} x2={side*(spread + 2)} y2={14} 
                            stroke="#fff" strokeWidth={0.5} opacity={0.4} 
                            style={{ transition: 'x1 0.3s, x2 0.3s' }} />
                        <ellipse cx={side*(spread + 4)} cy={14} rx={3} ry={1.5} 
                            fill={config.color} opacity={0.8} 
                            style={{ transition: 'cx 0.3s ease' }} />
                    </g>
                );
            })}
        </g>
    );
};

/** Контроллер — уникальный дизайн для каждой платы */
const ControllerBoard = ({ id, x, y, width, height, config }) => {
    const type = config.type || 'board_compact';
    const c = config;
    
    return (
        <g transform={`translate(${x}, ${y})`}>
            <rect x={0} y={0} width={width} height={height} rx={4}
                fill={c.fill} stroke={c.stroke} strokeWidth={1.5}
                style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.4))' }} />
            
            {type === 'board_large' && (
                <g>
                    <rect x={2} y={height*0.2} width={width*0.25} height={height*0.3} fill="silver" stroke="rgba(0,0,0,0.3)" strokeWidth={0.5} />
                    <rect x={width*0.4} y={height*0.2} width={width*0.4} height={height*0.5} rx={2} fill="rgba(0,0,0,0.8)" />
                    <rect x={2} y={2} width={width-4} height={4} fill="rgba(0,0,0,0.5)" rx={1} />
                    <rect x={2} y={height-6} width={width-4} height={4} fill="rgba(0,0,0,0.5)" rx={1} />
                </g>
            )}
            
            {type === 'board_compact' && (
                <g>
                    <rect x={width*0.3} y={height*0.1} width={width*0.4} height={height*0.5} rx={1} fill="rgba(0,0,0,0.9)" stroke={c.stroke} strokeWidth={0.5} />
                    <rect x={width*0.05} y={height*0.1} width={width*0.15} height={height*0.3} fill="#444" rx={1} />
                    {[2, 6, 10, 14, 18, 22].map(px => (
                        <rect key={px} x={px} y={height-3} width={2} height={2} fill="gold" opacity={0.8} />
                    ))}
                    <path d={`M ${width*0.8} ${height*0.1} L ${width*0.95} ${height*0.1} L ${width*0.95} ${height*0.4} L ${width*0.85} ${height*0.4}`} stroke="#fff" strokeWidth={0.5} fill="none" />
                </g>
            )}

            {type === 'board_pro' && (
                <g>
                    <rect x={width*0.35} y={height*0.3} width={width*0.3} height={height*0.4} rx={1} fill="rgba(0,0,0,0.8)" />
                    <rect x={2} y={2} width={4} height={height-4} fill="#555" />
                    <rect x={width-6} y={2} width={4} height={height-4} fill="#555" />
                </g>
            )}

            {type === 'board_slim' && (
                <g>
                    <rect x={width*0.3} y={height*0.3} width={width*0.4} height={height*0.4} rx={1} fill="rgba(0,0,0,0.9)" />
                </g>
            )}

            {type === 'board_computer' && (
                <g>
                    <rect x={width*0.75} y={2} width={width*0.2} height={height-4} fill="silver" stroke="#888" />
                    <rect x={width*0.2} y={height*0.3} width={width*0.3} height={height*0.4} rx={2} fill="rgba(0,0,0,0.9)" />
                </g>
            )}

            <text x={width/2} y={height - 2} textAnchor="middle" fontSize="5" fontWeight="900" fill="white" opacity="0.4" style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>
                {c.label}
            </text>
        </g>
    );
};

/** Линия коммуникации (провод) — рисуется вдоль суставов */
const WirePath = ({ points, color, isTesting }) => {
    if (!points || points.length < 2) return null;
    
    // Генерируем строку пути
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        d += ` L ${points[i].x} ${points[i].y}`;
    }
    
    return (
        <g className="comm-wire-group">
            {/* Основная оболочка кабеля */}
            <path d={d} fill="none" stroke="rgba(20,25,35,0.4)" strokeWidth={2.5} strokeLinejoin="round" />
            <path d={d} fill="none" stroke={color} strokeWidth={0.8} opacity={0.6} strokeLinejoin="round" />
            
            {/* Анимированный сигнал (бегущая пунктирная линия) */}
            {isTesting && (
                <path d={d} fill="none" stroke={color} strokeWidth={1.2} 
                    strokeDasharray="4,8" strokeLinecap="round"
                    style={{ 
                        animation: 'signalFlow 1.2s linear infinite', 
                        filter: `drop-shadow(0 0 3px ${color})` 
                    }} />
            )}
        </g>
    );
};

/** Рендер захвата по типу */
const renderEndEffector = (type, x, y, isOpen, config) => {
    switch (type) {
        case 'claw':
            return <GripperClaw x={x} y={y} isOpen={isOpen} config={config} />;
        case 'micro_claw':
            return <GripperMicroClaw x={x} y={y} isOpen={isOpen} config={config} />;
        case 'suction':
            return <GripperSuction x={x} y={y} isOpen={isOpen} config={config} />;
        case 'adaptive_claw':
            return <GripperMagnet x={x} y={y} isOpen={isOpen} config={config} />;
        default:
            return <GripperClaw x={x} y={y} isOpen={isOpen} config={config} />;
    }
};

/* ──────────────────────────────────────────────
   3. MAIN COMPONENT
   ────────────────────────────────────────────── */

const ManipulatorVisualizer = ({ hardware, ikState, gripClosed, totals, scale = 1, baseYOffset = 0, showStats = true, isTesting = false, testPhase = 0, sceneBackground, sceneForeground }) => {
    const SVG_W = 500;
    const SVG_H = 500;
    const BASE_X = 100;
    const BASE_Y = 190;
    const BASE_H = 60;

    /* Длины звеньев (px) */
    const L1 = 165;
    const L2 = 135;
    const L3 = 90;

    /* ── Pan & Zoom ── */
    var containerRef = useRef(null);
    var svgGroupRef = useRef(null);
    var isFrozen = !showStats && sceneBackground;
    var panZoomRef = useRef(isFrozen ? { x: 170, y: 50, zoom: 0.3 } : { x: 0, y: 0, zoom: 1.2 });
    var isDraggingRef = useRef(false);
    var lastMouseRef = useRef({ x: 0, y: 0 });
    var zoomDisplayState = useState(120);
    var zoomDisplay = zoomDisplayState[0];
    var setZoomDisplay = zoomDisplayState[1];

    function applyTransform() {
        var g = svgGroupRef.current;
        if (!g) return;
        var pz = panZoomRef.current;
        var s = pz.zoom * scale;
        var yOff = parseFloat(baseYOffset) || 0;
        g.setAttribute('transform',
            'translate(' + pz.x + ' ' + (pz.y + yOff) + ') scale(' + s + ')');
    }

    function zoomAt(delta, cx, cy) {
        var pz = panZoomRef.current;
        var el = containerRef.current;
        if (!el) return;
        var rect = el.getBoundingClientRect();
        var mx = cx - rect.left;
        var my = cy - rect.top;
        var oldZoom = pz.zoom;
        var newZoom = Math.min(3, Math.max(0.3, oldZoom + delta));
        var ratio = newZoom / oldZoom;
        pz.x = mx - ratio * (mx - pz.x);
        pz.y = my - ratio * (my - pz.y);
        pz.zoom = newZoom;
        setZoomDisplay(Math.round(newZoom * 100));
        applyTransform();
    }

    function resetView() {
        panZoomRef.current = { x: 0, y: 0, zoom: 1.2 };
        setZoomDisplay(120);
        applyTransform();
    }

    // Кнопки refs
    var btnZoomIn = useRef(null);
    var btnZoomOut = useRef(null);
    var btnReset = useRef(null);

    useEffect(function() {
        setTimeout(function() {
            var el = containerRef.current;
            if (!el) return;

            if (isFrozen) {
                applyTransform();
                return;
            }

            function onWheel(e) {
                e.preventDefault();
                var d = e.deltaY > 0 ? -0.1 : 0.1;
                zoomAt(d, e.clientX, e.clientY);
            }

            function onMouseDown(e) {
                if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
                    isDraggingRef.current = true;
                    lastMouseRef.current = { x: e.clientX, y: e.clientY };
                    el.style.cursor = 'grabbing';
                    e.preventDefault();
                }
            }

            function onMouseMove(e) {
                if (!isDraggingRef.current) return;
                var dx = e.clientX - lastMouseRef.current.x;
                var dy = e.clientY - lastMouseRef.current.y;
                panZoomRef.current.x += dx;
                panZoomRef.current.y += dy;
                lastMouseRef.current = { x: e.clientX, y: e.clientY };
                applyTransform();
            }

            function onMouseUp() {
                if (isDraggingRef.current) {
                    isDraggingRef.current = false;
                    el.style.cursor = 'grab';
                }
            }

            function onMouseLeave() {
                isDraggingRef.current = false;
                el.style.cursor = 'grab';
            }

            el.addEventListener('wheel', onWheel, { passive: false });
            el.addEventListener('mousedown', onMouseDown);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            el.addEventListener('mouseleave', onMouseLeave);

            // Кнопки
            var bIn = btnZoomIn.current;
            var bOut = btnZoomOut.current;
            var bRst = btnReset.current;
            if (bIn) bIn.onclick = function(e) { e.stopPropagation(); var r = el.getBoundingClientRect(); zoomAt(0.2, r.left + r.width/2, r.top + r.height/2); };
            if (bOut) bOut.onclick = function(e) { e.stopPropagation(); var r = el.getBoundingClientRect(); zoomAt(-0.2, r.left + r.width/2, r.top + r.height/2); };
            if (bRst) bRst.onclick = function(e) { e.stopPropagation(); resetView(); };

            // Установка начального вида
            applyTransform();

            return function() {
                el.removeEventListener('wheel', onWheel);
                el.removeEventListener('mousedown', onMouseDown);
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
                el.removeEventListener('mouseleave', onMouseLeave);
            };
        }, 100);
    }, [isFrozen]);

    /* ── Разрешение визуальных параметров из hardware — используем useMemo для мгновенного рендера ── */
    const shoulderCfg = HARDWARE_VISUAL_MAP.actuators[hardware?.shoulderActuator]
        || HARDWARE_VISUAL_MAP.actuators.mg995;
    const elbowCfg = HARDWARE_VISUAL_MAP.actuators[hardware?.elbowActuator]
        || HARDWARE_VISUAL_MAP.actuators.mg995;
    const wristCfg = HARDWARE_VISUAL_MAP.actuators[hardware?.wristActuator]
        || HARDWARE_VISUAL_MAP.actuators.mg996r;
    const gripperCfg = HARDWARE_VISUAL_MAP.grippers[hardware?.gripper]
        || HARDWARE_VISUAL_MAP.grippers.parallel_gripper_2f;
    const matKey = deriveMaterial(hardware?.controller, hardware);
    const materialCfg = HARDWARE_VISUAL_MAP.materials[matKey]
        || HARDWARE_VISUAL_MAP.materials.aluminum;

    const visualParams = {
        shoulder: shoulderCfg,
        elbow: elbowCfg,
        wrist: wristCfg,
        gripper: gripperCfg,
        material: materialCfg,
        materialKey: matKey
    };

    /* ── Team Sync: трансляция визуальных параметров ── */
    useEffect(() => {
        try {
            const syncPayload = {
                type: 'VISUAL_PARAMS_UPDATE',
                timestamp: Date.now(),
                params: {
                    shoulder: shoulderCfg.label,
                    elbow: elbowCfg.label,
                    wrist: wristCfg.label,
                    gripper: gripperCfg.type,
                    material: matKey
                }
            };
            const prev = JSON.parse(localStorage.getItem('tehnoland_visual_sync') || '{}');
            prev.feed = prev.feed || [];
            prev.feed.unshift(syncPayload);
            prev.feed = prev.feed.slice(0, 20);
            prev.latest = syncPayload;
            localStorage.setItem('tehnoland_visual_sync', JSON.stringify(prev));
        } catch (_) { /* ignore */ }
    }, [hardware?.shoulderActuator, hardware?.elbowActuator, hardware?.wristActuator, hardware?.gripper, hardware?.controller]);

    /* ── Углы из IK ── */
    const baseRad = ikState?.base || 0;
    const shoulderRad = ikState?.shoulder || 0;
    const elbowRad = ikState?.elbow || 0;

    /* ── Плавная анимация углов при тестировании ── */
    const shoulderAnimRef = useRef(shoulderRad);
    const elbowAnimRef = useRef(elbowRad);
    const homeRef = useRef({ s: shoulderRad, e: elbowRad });
    const [animTick, setAnimTick] = useState(0);

    // Сохраняем домашнюю позицию при каждом рендере
    homeRef.current = { s: shoulderRad, e: elbowRad };

    // Запускаем анимацию только при смене фазы теста
    useEffect(() => {
        const { s: homeS, e: homeE } = homeRef.current;
        const targetS = (isTesting && testPhase === 2) ? homeS - 0.3 : homeS;
        const targetE = (isTesting && testPhase === 2) ? homeE + 0.4 : homeE;

        let running = true;
        let frame;
        const tick = () => {
            if (!running) return;
            const sDiff = targetS - shoulderAnimRef.current;
            const eDiff = targetE - elbowAnimRef.current;
            if (Math.abs(sDiff) > 0.001 || Math.abs(eDiff) > 0.001) {
                shoulderAnimRef.current += sDiff * 0.12;
                elbowAnimRef.current += eDiff * 0.12;
                setAnimTick(t => t + 1);
                frame = requestAnimationFrame(tick);
            } else {
                shoulderAnimRef.current = targetS;
                elbowAnimRef.current = targetE;
                setAnimTick(t => t + 1);
            }
        };
        frame = requestAnimationFrame(tick);
        return () => { running = false; cancelAnimationFrame(frame); };
    }, [isTesting, testPhase]);

    const activeShoulderRad = isTesting ? shoulderAnimRef.current : shoulderRad;
    const activeElbowRad = isTesting ? elbowAnimRef.current : elbowRad;
    const activeWristRad = ikState?.wrist || 0;

    /* ── Индикатор пикового тока при старте ── */
    const showPeakIndicator = isTesting && testPhase === 1;

    /* Преобразуем в градусы для отладки */
    const shoulderDeg = -(activeShoulderRad * 180 / Math.PI);
    const elbowDeg = -(activeElbowRad * 180 / Math.PI);

    /* ── Forward Kinematics (2D проекция) ── */
    const baseJX = BASE_X;
    const baseJY = BASE_Y - BASE_H;

    /* Сустав shoulder → elbow */
    const sEndX = baseJX + L1 * Math.sin(activeShoulderRad);
    const sEndY = baseJY - L1 * Math.cos(activeShoulderRad);

    /* Сустав elbow → wrist */
    const eEndX = sEndX + L2 * Math.sin(activeShoulderRad + activeElbowRad);
    const eEndY = sEndY - L2 * Math.cos(activeShoulderRad + activeElbowRad);

    /* Конечная точка (wrist → end-effector) */
    const wEndX = eEndX + L3 * Math.sin(activeShoulderRad + activeElbowRad + activeWristRad);
    const wEndY = eEndY - L3 * Math.cos(activeShoulderRad + activeElbowRad + activeWristRad);

    /* Риск механической поломки */
    const mechRisk = totals?.mechanicalRisk || false;

    const { shoulder, elbow, wrist, gripper, material } = visualParams;

    return (
        <div ref={containerRef} className="manipulator-visualizer-wrap" style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            cursor: isFrozen ? 'default' : 'grab',
            userSelect: 'none'
        }}>

            {/* Индикатор механического риска (Industrial Alert) */}
            {mechRisk && showStats && (
                <div style={{
                    position: 'absolute', top: 10, right: 10, zIndex: 10,
                    padding: '6px 12px', background: 'var(--prof-error)',
                    borderRadius: 4, fontSize: '10px', color: '#fff',
                    textTransform: 'uppercase', fontWeight: '900', letterSpacing: '1.5px',
                    boxShadow: '0 0 20px rgba(248, 81, 73, 0.4)',
                    animation: 'jointPulse 0.8s ease-in-out infinite',
                    fontFamily: "'Inter', sans-serif"
                }}>
                    STRESS ALERT
                </div>
            )}

            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                style={{
                    width: '100%', height: '100%',
                    overflow: 'visible',
                    filter: mechRisk ? 'drop-shadow(0 0 10px rgba(255,60,60,0.35))' : 'none',
                    pointerEvents: 'none'
                }}>

                {/* Группа панорамирования и зума — управляется через ref */}
                <g ref={svgGroupRef}
                   transform={'translate(0 ' + (parseFloat(baseYOffset) || 0) + ') scale(' + scale + ')'}>
                    {/* ─── SCENE BACKGROUND ─── */}
                    {sceneBackground}

                    {/* Линия земли */}
                    <line x1={-SVG_W} y1={BASE_Y} x2={SVG_W * 2} y2={BASE_Y}
                        stroke="rgba(125,232,255,0.15)" strokeWidth="1"
                        strokeDasharray="6,4" />

                    {/* ─── BASE ─── */}
                    <g className="robot-base" style={{ transition: 'all 0.3s ease' }}>
                        {/* Основание-фланец */}
                        <polygon
                            points={`${BASE_X - 32},${BASE_Y} ${BASE_X - 24},${baseJY - 5} ${BASE_X + 24},${baseJY - 5} ${BASE_X + 32},${BASE_Y}`}
                            fill="rgba(10,15,25,0.6)"
                            stroke="rgba(125,232,255,0.3)"
                            strokeWidth="1"
                        />
                        {/* Крепёжные болты */}
                        <circle cx={BASE_X - 22} cy={BASE_Y - 4} r={2} fill="rgba(125,232,255,0.4)" />
                        <circle cx={BASE_X + 22} cy={BASE_Y - 4} r={2} fill="rgba(125,232,255,0.4)" />
                        {/* Пьедестал */}
                        <rect x={BASE_X - 6} y={baseJY - 5} width={12} height={5}
                            fill="rgba(10,15,25,0.4)" stroke="rgba(125,232,255,0.2)" strokeWidth={0.5} />
                        {/* Монтажная плита */}
                        <rect x={BASE_X - 18} y={BASE_Y - 3} width={36} height={3} rx={1}
                            fill="rgba(125,232,255,0.08)" stroke="rgba(125,232,255,0.2)" strokeWidth={0.5} />
                        {/* ─── КОНТРОЛЛЕР И КОММУНИКАЦИИ ─── */}
                        {(() => {
                            const ctrlId = hardware?.controller || 'esp32_devkit';
                            const c = HARDWARE_VISUAL_MAP.controllers[ctrlId] || HARDWARE_VISUAL_MAP.controllers.esp32_devkit;
                            const bW = 42;
                            const bH = 30;
                            const bX = BASE_X - bW / 2;
                            const bY = BASE_Y - bH - 4;

                            // Общие узлы для трассировки кабелей
                            const root = { x: bX + bW/2, y: bY + bH/2 };
                            const j0 = { x: baseJX, y: baseJY };
                            const j1 = { x: sEndX, y: sEndY };
                            const j2 = { x: eEndX, y: eEndY };
                            const j3 = { x: wEndX, y: wEndY };

                            // Смещения для каждого провода в пучке (чтобы не сливались)
                            const off = (val) => ({ x: 0, y: val }); // Упрощенное смещение по Y

                             // Точки для сенсоров (синхронизированные с hardware)
                             const visId = hardware?.visionSensor || 'ov2640_cam';
                             const forceId = hardware?.forceSensor || 'hx711_loadcell';

                             const sPos = { x: sEndX, y: sEndY - 26 }; // Камера поднята на стойке над локтем
                             
                             // Датчик усилия встроен прямо между запястьем и захватом (S-образный тензодатчик)
                             const forcePos = { x: wEndX, y: wEndY - 8 }; 

                            return (
                                <g>
                                    {/* Кабели к приводам */}
                                    <WirePath points={[root, j0]} color={shoulder.color} isTesting={isTesting} />
                                    <WirePath points={[root, j0, j1]} color={elbow.color} isTesting={isTesting} />
                                    <WirePath points={[root, j0, j1, j2]} color={wrist.color} isTesting={isTesting} />
                                    <WirePath points={[root, j0, j1, j2, j3]} color={gripper.color} isTesting={isTesting} />
                                    
                                    {/* Кабели к сенсорам (рисуем только если сенсор активен) */}
                                    {visId !== 'none' && <WirePath points={[root, j0, j1, sPos]} color="#ff4d4d" isTesting={isTesting} />}
                                    {forceId !== 'none' && <WirePath points={[root, j0, j1, j2, forcePos]} color="#ff9933" isTesting={isTesting} />}
                                    
                                    <ControllerBoard id={ctrlId} x={bX} y={bY} width={bW} height={bH} config={c} />

                                </g>
                            );
                        })()}
                    </g>



                {/* ─── LINK 1 (shoulder → elbow) ─── */}
                <g className="link1-group" style={isTesting ? { transition: 'none' } : {}}>
                    <RobotLink
                        x1={baseJX} y1={baseJY}
                        x2={sEndX} y2={sEndY}
                        actuatorConfig={shoulder}
                        materialConfig={material}
                        linkIndex={1}
                    />
                </g>

                {/* ─── LINK 2 (elbow → wrist) ─── */}
                <g className="link2-group" style={isTesting ? { transition: 'none' } : {}}>
                    <RobotLink
                        x1={sEndX} y1={sEndY}
                        x2={eEndX} y2={eEndY}
                        actuatorConfig={elbow}
                        materialConfig={material}
                        linkIndex={2}
                    />
                </g>

                {/* ─── LINK 3 (wrist → end-effector) ─── */}
                <g className="link3-group" style={isTesting ? { transition: 'none' } : {}}>
                    <RobotLink
                        x1={eEndX} y1={eEndY}
                        x2={wEndX} y2={wEndY}
                        actuatorConfig={wrist}
                        materialConfig={material}
                        linkIndex={3}
                    />
                </g>

                {/* ─── JOINTS ─── */}
                <RobotJoint
                    key="joint-shoulder"
                    cx={baseJX} cy={baseJY}
                    config={shoulder}
                    jointIndex={0}
                />

                <RobotJoint
                    key="joint-elbow"
                    cx={sEndX} cy={sEndY}
                    config={elbow}
                    jointIndex={1}
                />

                <RobotJoint
                    key="joint-wrist"
                    cx={eEndX} cy={eEndY}
                    config={wrist}
                    jointIndex={2}
                />

                {/* ─── END-EFFECTOR ─── */}
                <g className="end-effector-group">
                    {renderEndEffector(
                        gripper.type,
                        wEndX, wEndY,
                        isTesting ? (animTick % 2 !== 0) : !gripClosed,
                        gripper
                    )}
                </g>

                {/* ─── SENSORS ─── */}
                <g className="sensors-layer">
                    {(() => {
                        const visId = hardware?.visionSensor || 'ov2640_cam';
                        const forceId = hardware?.forceSensor || 'hx711_loadcell';

                        const sPos = { x: sEndX, y: sEndY - 26 };
                        const forcePos = { x: wEndX, y: wEndY - 8 };
                        
                        return (
                            <>
                                {visId !== 'none' && <HardwareSensor id={visId} type="vision" x={sPos.x} y={sPos.y} isTesting={isTesting} />}
                                {forceId !== 'none' && <HardwareSensor id={forceId} type="force" x={forcePos.x} y={forcePos.y} isTesting={isTesting} />}
                            </>
                        );
                    })()}
                </g>


                {/* ─── RELIABILITY BADGE ─── */}
                {showStats && totals?.reliabilityScore != null && (
                    <g className="reliability-badge">
                        <rect x={8} y={SVG_H - 32} width="85" height="24" rx="3"
                            fill="rgba(10,15,25,0.85)"
                            stroke={totals.reliabilityScore >= 80 ? '#8cffb1' : '#ffb36b'}
                            strokeWidth="0.7" />
                        <text x={14} y={SVG_H - 19} fill="#8fa7bc" fontSize="9"
                            fontFamily="'IBM Plex Mono', monospace">
                            RELIABILITY
                        </text>
                        <text x={14} y={SVG_H - 10}
                            fill={totals.reliabilityScore >= 80 ? '#8cffb1' : '#ffb36b'}
                            fontSize="14" fontWeight="bold"
                            fontFamily="'IBM Plex Mono', monospace">
                            {totals.reliabilityScore}%
                        </text>
                    </g>
                )}
                    {/* ─── SCENE FOREGROUND ─── */}
                    {sceneForeground}
                </g>
            </svg>


        </div>
    );
};

/* ──────────────────────────────────────────────
   4. GLOBAL CSS (инжектируется один раз)
   ────────────────────────────────────────────── */

if (typeof window !== 'undefined' && !window.__ROBOT_LIVE_PREVIEW_STYLED) {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        @keyframes signalFlow {
            from { stroke-dashoffset: 24; }
            to { stroke-dashoffset: 0; }
        }

        @keyframes jointPulse {
            0%, 100% { opacity: 0.25; }
            50% { opacity: 0.55; }
        }

        .robot-link-body,
        .robot-link-double-contour,
        .robot-joint,
        .joint-glow,
        .gripper-finger,
        .gripper-claw,
        .gripper-suction,
        .gripper-magnet,
        .end-effector-group,
        .link1-group,
        .link2-group,
        .link3-group,
        .joint-label-group,
        .hardware-callouts {
             /* Transitions removed to prevent lag */
        }

        .robot-base {
             /* Transitions removed to prevent lag */
        }
    `;
    document.head.appendChild(styleEl);
    window.__ROBOT_LIVE_PREVIEW_STYLED = true;
}
