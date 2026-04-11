// ═══════════════════════════════════════════════════════════════
// 4_code.jsx  — КОДИУС: АЛГОРИТМИЧЕСКАЯ ЛОГИКА
// Дизайн: аналогично 3_model.jsx  (3-col grid, prof-theme)
// ═══════════════════════════════════════════════════════════════

// ── Node palette config ──────────────────────────────────────
const NODE_DEFS = [
    { type: 'move',          label: 'ПЕРЕМЕСТИТЬ',   color: 'var(--prof-accent)',   desc: 'Команда перемещения к цели (Мусор / Бак)', icon: '→', cost: 0 },
    { type: 'grip',          label: 'ЗАХВАТ',        color: 'var(--prof-warning)',  desc: 'Управление захватом (Зажать / Отпустить)', icon: '✊', cost: 0 },
    { type: 'wait_sensor',   label: 'ДАТЧИК',        color: 'var(--neon-purple)',   desc: 'Ожидание условий датчика (LTE / GTE)', icon: '👁', cost: 0 },
    { type: 'kalman_filter', label: 'ФИЛЬТР К.',     color: 'var(--prof-error)',    desc: 'Математическая фильтрация и очистка помех', icon: '⚗', cost: 40 },
    { type: 'delay',         label: 'ПАУЗА',         color: 'var(--prof-success)',  desc: 'Приостановка выполнения на время (мс)', icon: '⏱', cost: 0 },
    { type: 'loop',          label: 'ЦИКЛ',          color: '#bd93f9',              desc: 'Группировка для многократного повторения', icon: '🔁', cost: 10 },
];

const SOFTWARE_LIST = [
    { id: 'TELEMETRY_PRO', name: 'Telemetry Ultra', desc: 'Расширенный мониторинг энергопотребления в реальном времени.', icon: '📊' },
    { id: 'CLOUD_CORE', name: 'Cloud Runtime V4', desc: 'Ускоряет обработку данных в облаке на 15%.', icon: '🌐' },
    { id: 'VISION_API', name: 'Vision API Pro', desc: 'Нейросетевая детекция объектов с точностью до 99.8%.', icon: '👁' },
    { id: 'RTOS_KERNEL', name: 'RTOS Core V2', desc: 'Ядро реального времени для минимизации задержек управления.', icon: '⚛' }
];

// ── Default program templates ────────────────────────────────
const PROGRAM_TEMPLATES = [
    {
        name: 'Базовый Pick & Place',
        nodes: [
            { id: 'p1', type: 'move',        target: 'trash', x: -0.72, y: 0.53, z: 0.05 },
            { id: 'p2', type: 'wait_sensor', sensor: 'distance', operator: 'lte', threshold: 0.1, timeout: 1200 },
            { id: 'p3', type: 'grip',        action: 'close' },
            { id: 'p4', type: 'move',        target: 'bin',   x: -0.32, y: 0.43, z: 0.05 },
            { id: 'p5', type: 'grip',        action: 'open'  },
        ]
    },
    {
        name: 'С фильтром Калмана',
        nodes: [
            { id: 'k1', type: 'move',          target: 'trash', x: -0.72, y: 0.53, z: 0.05 },
            { id: 'k2', type: 'kalman_filter', processNoise: 0.01, measurementNoise: 0.1 },
            { id: 'k3', type: 'wait_sensor',   sensor: 'distance', operator: 'lte', threshold: 0.08, timeout: 1000 },
            { id: 'k4', type: 'grip',          action: 'close' },
            { id: 'k5', type: 'move',          target: 'bin',   x: -0.32, y: 0.43, z: 0.05 },
            { id: 'k6', type: 'grip',          action: 'open'  },
        ]
    },
];

// ── Mission system ────────────────────────────────────────────
const MISSIONS = [
    {
        id: 'basic',
        title: 'СЦЕНАРИЙ 1 / 3',
        name: 'ПЕРВЫЙ ЗАПУСК',
        objective: 'Базовое задание. Переместите мусор из зоны забора в контейнер-утилизатор.',
        tip: 'Мусор находится на расстоянии ~0.08м. Используйте WAIT_SENSOR с порогом 0.10.',
        difficulty: '★☆☆',
        diffColor: 'var(--prof-success)',
        noiseOverride: null,       // Use real noise from simulation
        startTemplate: 0,          // Index in PROGRAM_TEMPLATES (pre-load for tutorial)
        successCondition: 'deliver',
        scoreMultiplier: 1.0,
        allowClear: true,
    },
    {
        id: 'noisy',
        title: 'СЦЕНАРИЙ 2 / 3',
        name: 'ЗАШУМЛЁННЫЕ СЕНСОРЫ',
        objective: 'Уровень шума в цехе критический. Без фильтрации данных захват нестабилен.',
        tip: 'Шум до 0.15м. Мусор в 0.08м. Используйте KALMAN + WAIT_SENSOR (DIST, <=, 0.20).',
        difficulty: '★★☆',
        diffColor: 'var(--prof-warning)',
        noiseOverride: 0.14,       // Force high noise for this mission
        startTemplate: null,       // Player builds from scratch
        successCondition: 'deliver_with_kalman',
        scoreMultiplier: 1.5,
        allowClear: true,
    },
    {
        id: 'debug',
        title: 'СЦЕНАРИЙ 3 / 3',
        name: 'ОТЛАДКА СИСТЕМЫ',
        objective: 'Стажёр написал программу, но в ней есть ошибки. Найдите и исправьте их.',
        tip: 'Мусор: 0.08м. Бак: 0.45м. Проверьте направления MOVE и пороги SENSOR.',
        difficulty: '★★★',
        diffColor: 'var(--prof-error)',
        noiseOverride: null,
        startTemplate: 'broken',   // Special broken pre-loaded program
        successCondition: 'deliver',
        scoreMultiplier: 2.0,
        allowClear: false,         // Can't clear in debug mode
    },
];

// ── Broken template for Mission 3 ────────────────────────────
const BROKEN_TEMPLATE = [
    { id: 'b1', type: 'move',        target: 'bin'   },   // 🐛 BUG: should be 'trash'
    { id: 'b2', type: 'wait_sensor', sensor: 'distance', operator: 'lte', threshold: 0.1, timeout: 1200 },
    { id: 'b3', type: 'grip',        action: 'open'  },   // 🐛 BUG: should be 'close'
    { id: 'b4', type: 'move',        target: 'trash' },   // 🐛 BUG: should be 'bin'
    { id: 'b5', type: 'grip',        action: 'open'  },
];

// ── Make blank node ──────────────────────────────────────────
const makeNode = (type) => {
    const id = 'n_' + Math.random().toString(36).substr(2, 7);
    if (type === 'move')          return { id, type, target: 'trash', x: -0.7, y: 0.5, z: 0.05 };
    if (type === 'grip')          return { id, type, action: 'close' };
    if (type === 'wait_sensor')   return { id, type, sensor: 'distance', operator: 'lte', threshold: 0.1 };
    if (type === 'kalman_filter') return { id, type, processNoise: 0.01, measurementNoise: 0.1 };
    if (type === 'delay')         return { id, type, ms: 500 };
    if (type === 'loop')          return { id, type, iterations: 3 };
    return { id, type };
};

// ── Hint system ──────────────────────────────────────────────
const getHints = (nodes, mission) => {
    const hints = [];
    const types = nodes.map(n => n.type);
    const hasFilter = types.includes('kalman_filter') || types.includes('ai_filter_adv');
    const hasSensor = types.includes('wait_sensor');
    const grips = nodes.filter(n => n.type === 'grip');
    const moves = nodes.filter(n => n.type === 'move');

    if (nodes.length === 0) hints.push({ sev: 'error', text: 'Программа пуста — добавьте узлы из палитры' });
    if (moves.length < 2)   hints.push({ sev: 'error', text: 'Нужно минимум 2 MOVE (к мусору и к баку)' });
    if (!grips.some(g => g.action === 'close')) hints.push({ sev: 'error', text: 'Нет GRIP CLOSE — манипулятор не захватит объект' });
    if (!grips.some(g => g.action === 'open'))  hints.push({ sev: 'error', text: 'Нет GRIP OPEN — манипулятор не сбросит объект' });
    
    // Context-aware sensor hints based on mission noise level
    if (hasSensor) {
        const noiseLevel = mission.noiseOverride ?? 0.04; // Default low noise
        if (noiseLevel > 0.10 && !hasFilter) {
            hints.push({ sev: 'error', text: `ВЫСОКИЙ ШУМ (${(noiseLevel * 100).toFixed(0)}%)! Добавьте KALMAN фильтр для стабилизации датчика` });
        } else if (noiseLevel > 0.06 && !hasFilter) {
            hints.push({ sev: 'warning', text: `Средний шум (${(noiseLevel * 100).toFixed(0)}%). KALMAN улучшит стабильность` });
        }
        // DON'T show filter warning for low noise missions (noise <= 0.06)
    }
    
    if (hints.length === 0) hints.push({ sev: 'ok', text: 'Программа корректна. Запустите цикл проверки' });
    return hints;
};

// ── Validate runnable ─────────────────────────────────────────
const validate = (nodes) => {
    const moves = nodes.filter(n => n.type === 'move');
    const grips = nodes.filter(n => n.type === 'grip');
    if (nodes.length === 0) return 'Программа пуста';
    if (moves.length < 2)   return 'Нужно минимум 2 MOVE';
    if (!grips.some(g => g.action === 'close')) return 'Нет GRIP CLOSE';
    if (!grips.some(g => g.action === 'open'))  return 'Нет GRIP OPEN';
    return null;
};

// ── Score calculation ─────────────────────────────────────────
const calcScore = (nodes, sensorNoise) => {
    const hasKalman = nodes.some(n => n.type === 'kalman_filter' || n.type === 'ai_filter_adv');
    const delays = nodes.filter(n => n.type === 'delay').length;
    let score = 60;
    if (hasKalman) score += 25;
    if (sensorNoise > 0.05 && !hasKalman) score -= 20;
    if (delays > 2) score -= 10;
    score += (nodes.length <= 6) ? 10 : -5;
    return Math.max(10, Math.min(100, score));
};

// ════════════════════════════════════════════════════════════════
// NodeCard — редактируемый узел в центральной панели
// ════════════════════════════════════════════════════════════════
const NodeCard = ({ node, index, isActive, onChange, onRemove, currentSensorVal }) => {
    const def = NODE_DEFS.find(d => d.type === node.type) || { color: '#888', icon: '?' };

    return (
        <div style={{
            display: 'flex', alignItems: 'stretch', gap: 0,
            border: `1.5px solid ${isActive ? def.color : 'var(--prof-border)'}`,
            borderRadius: '8px', overflow: 'hidden', marginBottom: '12px',
            background: isActive ? `${def.color}18` : 'rgba(0,0,0,0.25)',
            boxShadow: isActive ? `0 0 20px ${def.color}44` : 'none',
            transition: 'all 0.25s',
        }}>
            {/* Index + type stripe */}
            <div style={{
                width: '60px', flexShrink: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '4px',
                background: `${def.color}22`, borderRight: `1px solid ${def.color}44`,
            }}>
                <div style={{ fontSize: '24px' }}>{def.icon}</div>
                <div style={{ fontSize: '11px', color: def.color, fontWeight: '900' }}>{index + 1}</div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, padding: '12px 20px' }}>
                <div style={{ fontSize: '13px', fontWeight: '900', color: def.color, marginBottom: '8px', letterSpacing: '1px' }}>
                    {def.label}
                </div>

                {/* Fields per type */}
                {node.type === 'move' && (
                    <ToggleGroup 
                        value={node.target || 'trash'}
                        onChange={v => onChange({ ...node, target: v })}
                        activeColor="var(--prof-accent)"
                        options={[
                            { value: 'trash', label: 'МУСОР', icon: '🗑️' },
                            { value: 'bin',   label: 'БАК',   icon: '📥' },
                            { value: 'home',  label: 'ДОМ',  icon: '🏠' }
                        ]}
                    />
                )}
                {node.type === 'grip' && (
                    <ToggleGroup 
                        value={node.action}
                        onChange={v => onChange({ ...node, action: v })}
                        activeColor="var(--prof-warning)"
                        options={[
                            { value: 'close', label: 'ЗАХВАТ', icon: '✊' },
                            { value: 'open',  label: 'СБРОС',  icon: '✋' }
                        ]}
                    />
                )}
                {node.type === 'wait_sensor' && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <select value={node.sensor} onChange={e => onChange({ ...node, sensor: e.target.value })} style={selectStyle}>
                            <option value="distance">DIST</option>
                            <option value="force">FORCE</option>
                        </select>
                        <select value={node.operator} onChange={e => onChange({ ...node, operator: e.target.value })} style={selectStyle}>
                            <option value="lte">{'<='}</option>
                            <option value="gte">{'>='}</option>
                        </select>
                        <InputField label="VAL" value={node.threshold} step={0.01} onChange={v => onChange({ ...node, threshold: v })} />
                        
                        {/* Live sensor value indicator */}
                        {isActive && currentSensorVal !== undefined && node.sensor === 'distance' && (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '4px',
                                padding: '4px 8px', borderRadius: '4px',
                                background: 'rgba(0,243,255,0.1)', border: '1px solid rgba(0,243,255,0.3)',
                                fontSize: '10px', fontFamily: 'monospace', whiteSpace: 'nowrap'
                            }}>
                                <span style={{ color: 'rgba(0,243,255,0.7)' }}>📡</span>
                                <span style={{ color: 'var(--prof-accent)', fontWeight: '900' }}>{currentSensorVal.toFixed(3)}м</span>
                            </div>
                        )}
                        
                    </div>
                )}
                {node.type === 'kalman_filter' && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <InputField label="Q (процесс)" value={node.processNoise} step={0.001} onChange={v => onChange({ ...node, processNoise: v })} />
                        <InputField label="R (сенсор)" value={node.measurementNoise} step={0.01} onChange={v => onChange({ ...node, measurementNoise: v })} />
                    </div>
                )}
                {node.type === 'delay' && (
                    <InputField label="мс" value={node.ms} step={100} onChange={v => onChange({ ...node, ms: v })} />
                )}
                {node.type === 'loop' && (
                    <InputField label="итерации" value={node.iterations} step={1} onChange={v => onChange({ ...node, iterations: v })} />
                )}
            </div>

            {/* Remove button */}
            <button onClick={onRemove} style={{
                background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.2)',
                fontSize: '18px', cursor: 'pointer', padding: '0 12px',
                borderLeft: '1px solid var(--prof-border)', transition: 'color 0.2s',
                fontFamily: 'inherit',
            }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--prof-error)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
            >×</button>
        </div>
    );
};

const ToggleGroup = ({ options, value, onChange, activeColor = 'var(--prof-accent)' }) => (
    <div style={{ 
        display: 'flex', 
        background: 'rgba(0,0,0,0.4)', 
        border: '1px solid var(--prof-border)',
        borderRadius: '6px',
        padding: '2px',
        width: 'fit-content',
        gap: '2px'
    }}>
        {options.map(opt => {
            const isActive = opt.value === value;
            return (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    style={{
                        background: isActive ? activeColor : 'transparent',
                        color: isActive ? '#000' : 'var(--prof-text-dim)',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '900',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: isActive ? `0 0 10px ${activeColor}44` : 'none'
                    }}
                >
                    {opt.icon && <span>{opt.icon}</span>}
                    {opt.label}
                </button>
            );
        })}
    </div>
);

const selectStyle = {
    background: 'rgba(0,0,0,0.6)', 
    border: '1px solid var(--prof-border)', 
    color: 'var(--prof-text-main)',
    padding: '6px 12px', 
    borderRadius: '4px', 
    fontSize: '11px', 
    fontFamily: 'IBM Plex Mono, monospace',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none', // Remove browser default arrow if possible in some contexts
    transition: 'border-color 0.2s',
};

const InputField = ({ label, value, step, onChange }) => {
    // Local state to allow typing partial decimals like "0."
    const [localValue, setLocalValue] = useState(String(value));

    // Sync local state when external value changes (e.g. from state reset)
    useEffect(() => {
        if (Number(localValue) !== value) {
            setLocalValue(String(value));
        }
    }, [value]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--prof-text-dim)', whiteSpace: 'nowrap', fontWeight: '800' }}>{label}:</span>
            <input
                type="text"
                value={localValue}
                onChange={e => {
                    const val = e.target.value;
                    // Allow numbers, dots, and empty string
                    if (val === '' || /^-?\d*\.?\d*$/.test(val)) {
                        setLocalValue(val);
                        const num = parseFloat(val);
                        if (!isNaN(num)) {
                            onChange(num);
                        }
                    }
                }}
                onBlur={() => {
                    // Cleanup formatting on blur
                    const num = parseFloat(localValue);
                    if (isNaN(num)) {
                        setLocalValue(String(value));
                    } else {
                        setLocalValue(String(num));
                    }
                }}
                onWheel={e => e.target.blur()} // Kill wheel input
                style={{
                    ...selectStyle, width: '90px', textAlign: 'right',
                }}
            />
        </div>
    );
};

// ════════════════════════════════════════════════════════════════
// ArmViz — SVG-визуализация манипулятора
// ════════════════════════════════════════════════════════════════
const ArmViz = ({ isRunning, activeNodeType, armTarget, trashStatus, gripOpen }) => {
    const W = 340, H = 220;
    const BX = 240, BY = 165; 
    const L1 = 92, L2 = 82, L3 = 40; // Increased reach for Cartesian IK envelope

    // Cartesian targets in absolute SVG coordinates
    const TARGET_COORDS = {
        home:  { x: 140, y: 70 },
        trash: { x: 81,  y: 168 }, // Raised to avoid floor collision
        bin:   { x: 170, y: 145 }, // Significantly raised to avoid bin collision
        grip:  { x: 150, y: 100 },
    };

    // Inverse Kinematics Solver (2-link + horizontal gripper)
    const solveIK = (tx, ty) => {
        const wx = tx;
        const wy = ty - L3; // Wrist position (above gripper)
        const dx = wx - BX;
        const dy = wy - BY;
        const d2 = dx*dx + dy*dy;
        const d = Math.sqrt(d2);

        // Law of cosines
        let c2 = (d2 - L1*L1 - L2*L2) / (2 * L1 * L2);
        c2 = Math.max(-1, Math.min(1, c2));
        const s2 = -Math.sqrt(Math.max(0, 1 - c2*c2)); // Elbow-Up
        const a2_rad = Math.atan2(s2, c2);
        const a1_rad = Math.atan2(dy, dx) - Math.atan2(L2 * s2, L1 + L2 * c2);

        return {
            a1: (a1_rad * 180 / Math.PI),
            a2: (a2_rad * 180 / Math.PI),
            a3: 90 - (a1_rad * 180 / Math.PI + a2_rad * 180 / Math.PI) // Force vertical DOWN
        };
    };

    const [currentPos, setCurrentPos] = useState(TARGET_COORDS.home);
    const posRef = useRef(TARGET_COORDS.home);
    const rafRef = useRef(null);

    // Inertial Angle Smoothing
    const [renderAng, setRenderAng] = useState(solveIK(TARGET_COORDS.home.x, TARGET_COORDS.home.y));
    const smoothAngRef = useRef(renderAng);

    // State for animation and physical effects
    const [fallingOffset, setFallingOffset] = useState(0);
    const [fallStartPos, setFallStartPos] = useState({ x: 0, y: 0 }); 
    const [snapOffset, setSnapOffset] = useState({ x: 0, y: 0 }); 
    const [recoilY, setRecoilY] = useState(0); 

    // 1. Position Interpolation Loop (Cubic Bezier Trajectory)
    useEffect(() => {
        const targetKey = armTarget || 'home';
        const P0 = { ...posRef.current };
        const P2 = TARGET_COORDS[targetKey] || TARGET_COORDS.home;
        const P1 = { x: (P0.x + P2.x) / 2, y: Math.min(P0.y, P2.y) - 65 };

        const dur = 1200; 
        const t0 = performance.now();

        // If distance is near zero, don't play the "up-and-down" loop
        const d = Math.sqrt((P0.x - P2.x)**2 + (P0.y - P2.y)**2);
        if (d < 0.1) {
            posRef.current = P2;
            setCurrentPos({...P2});
            return;
        }

        const animate = (now) => {
            const raw = Math.min(1, (now - t0) / dur);
            const t = raw < 0.5 ? 4 * raw ** 3 : 1 - (-2 * raw + 2) ** 3 / 2;
            const mt = 1 - t;
            const nextX = mt * mt * P0.x + 2 * mt * t * P1.x + t * t * P2.x;
            const nextY = mt * mt * P0.y + 2 * mt * t * P1.y + t * t * P2.y;
            posRef.current = { x: nextX, y: nextY };
            setCurrentPos({ ...posRef.current });
            if (raw < 1) rafRef.current = requestAnimationFrame(animate);
        };

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(animate);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [isRunning, activeNodeType, armTarget]);

    // 2. High-Frequency Angle Damping Loop (Eliminates Jitter)
    useEffect(() => {
        let r;
        const smooth = () => {
            const target = solveIK(posRef.current.x, posRef.current.y + recoilY);
            // Damping logic: actual = actual + (target - actual) * k
            const k = 0.22; // Smoothness factor (0.1 = heavy inertia, 1.0 = instant)
            const next = {
                a1: smoothAngRef.current.a1 + (target.a1 - smoothAngRef.current.a1) * k,
                a2: smoothAngRef.current.a2 + (target.a2 - smoothAngRef.current.a2) * k,
                a3: smoothAngRef.current.a3 + (target.a3 - smoothAngRef.current.a3) * k,
            };
            smoothAngRef.current = next;
            setRenderAng(next);
            r = requestAnimationFrame(smooth);
        };
        r = requestAnimationFrame(smooth);
        return () => cancelAnimationFrame(r);
    }, [recoilY]);

    useEffect(() => {
        if (trashStatus === 'held') {
            const TRASH_TARGET_Y = 175 + 8; 
            const dx = 81 - currentPos.x;
            const dy = TRASH_TARGET_Y - (currentPos.y + 8);
            setSnapOffset({ x: dx, y: dy });
            
            let start = null;
            const anim = (t) => {
                if (!start) start = t;
                const progress = Math.min(1, (t - start) / 400); 
                setSnapOffset({ x: dx * (1 - progress), y: dy * (1 - progress) });
                if (progress < 1) requestAnimationFrame(anim);
            };
            requestAnimationFrame(anim);
        } else {
            setSnapOffset({ x: 0, y: 0 });
        }
    }, [trashStatus === 'held']);

    useEffect(() => {
        if (trashStatus === 'falling') {
            // Capture hand position at release
            const startX = currentPos.x;
            const startY = currentPos.y;
            setFallStartPos({ x: startX, y: startY });
            setFallingOffset(0);
            
            // Recoil "Throwing" Motion
            setRecoilY(-12);
            let recoilStart = null;
            const animRecoil = (t) => {
                if (!recoilStart) recoilStart = t;
                const p = Math.min(1, (t - recoilStart) / 400); 
                setRecoilY(-12 * (1 - Math.pow(p, 2))); // Snappy recoil then settle
                if (p < 1) requestAnimationFrame(animRecoil);
            };
            requestAnimationFrame(animRecoil);

            let fallStart = null;
            const animFall = (t) => {
                if (!fallStart) fallStart = t;
                const p = Math.min(1, (t - fallStart) / 500);
                setFallingOffset(p * 50); // Fall depth
                if (p < 1) requestAnimationFrame(animFall);
            };
            requestAnimationFrame(animFall);
        } else {
            setRecoilY(0);
        }
    }, [trashStatus === 'falling']);

    // Geometry derived from IK (with Inertial Smoothing)
    const r = d => d * Math.PI / 180;
    const r1 = r(renderAng.a1);
    const r2 = r(renderAng.a1 + renderAng.a2);
    const r3 = r(renderAng.a1 + renderAng.a2 + renderAng.a3);
    const j1 = { x: BX, y: BY };
    const j2 = { x: j1.x + L1 * Math.cos(r1), y: j1.y + L1 * Math.sin(r1) };
    const j3 = { x: j2.x + L2 * Math.cos(r2), y: j2.y + L2 * Math.sin(r2) };
    const ee = { x: j3.x + L3 * Math.cos(r3), y: j3.y + L3 * Math.sin(r3) };

    const TRASH_POS = { x: 81, y: 175 }; 
    const BIN_POS   = { x: 170, y: 175 }; 

    return (
        <svg width="100%" viewBox={`0 20 ${W} ${H - 20}`} style={{ display: 'block', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(176,38,255,0.1)' }}>
            <defs>
                <pattern id="cvGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(176,38,255,0.05)" strokeWidth="0.6"/>
                </pattern>
            </defs>

            <rect width={W} height={H} fill="url(#cvGrid)" />

            {/* Floor */}
            <line x1={20} y1={190} x2={W - 20} y2={190} stroke="rgba(176,38,255,0.2)" strokeWidth="1" strokeDasharray="5,5" />

            {/* Trash bin: BACK Layer */}
            <g transform={`translate(${BIN_POS.x}, ${BIN_POS.y})`} style={{ pointerEvents: 'none' }}>
                <path d="M -15 15 L -12 -25 L 12 -25 L 15 15 Z" fill="#1e3a2e" stroke="#27AE60" strokeWidth="1" />
                <path d="M -12 -25 L 12 -25" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </g>



            {/* Robot base */}
            <rect x={BX - 12} y={BY} width={24} height={18} rx={3} fill="#1e2d42" stroke="#4A6278" strokeWidth="1.5" />
            <rect x={BX - 18} y={BY + 14} width={36} height={8} rx={2} fill="#263547" stroke="#4A6278" strokeWidth="1" />
            <circle cx={BX - 5} cy={BY + 7} r={2.5} fill={isRunning ? '#3fb950' : '#4A6278'} />
            <circle cx={BX + 0} cy={BY + 7} r={2.5} fill="#F39C12" opacity="0.8" />
            <circle cx={BX + 5} cy={BY + 7} r={2.5} fill="#E74C3C" opacity="0.8" />



            {/* Link 1 */}
            <line x1={j1.x} y1={j1.y} x2={j2.x} y2={j2.y} stroke="#2e5a7e" strokeWidth={9} strokeLinecap="round" />
            <line x1={j1.x} y1={j1.y} x2={j2.x} y2={j2.y} stroke="#5dade2" strokeWidth={4} strokeLinecap="round" />

            {/* Joint 2 */}
            <circle cx={j2.x} cy={j2.y} r={7.5} fill="#1e2d42" stroke="#5dade2" strokeWidth="1.5" />
            <circle cx={j2.x} cy={j2.y} r={3.5} fill="#5dade2" opacity="0.85" />

            {/* Link 2 */}
            <line x1={j2.x} y1={j2.y} x2={j3.x} y2={j3.y} stroke="#2e5a7e" strokeWidth={7} strokeLinecap="round" />
            <line x1={j2.x} y1={j2.y} x2={j3.x} y2={j3.y} stroke="#5dade2" strokeWidth={3} strokeLinecap="round" />

            {/* Joint 3 */}
            <circle cx={j3.x} cy={j3.y} r={6} fill="#1e2d42" stroke="#5dade2" strokeWidth="1.5" />
            <circle cx={j3.x} cy={j3.y} r={3} fill="#5dade2" opacity="0.85" />

            {/* Link 3 */}
            <line x1={j3.x} y1={j3.y} x2={ee.x} y2={ee.y} stroke="#5dade2" strokeWidth={5} strokeLinecap="round" />

            {/* Gripper */}
            <g transform={`translate(${ee.x}, ${ee.y})`}>
                <rect x={-5} y={-4} width={10} height={8} rx={2} fill="#1e2d42" stroke="#5dade2" strokeWidth="1.2" />
                {[-1, 1].map(s => (
                    <line key={s}
                        x1={s * 4} y1={4}
                        x2={s * 4 + s * (gripOpen ? 6 : 2)} y2={18}
                        stroke="#5dade2" strokeWidth="3" strokeLinecap="round"
                        style={{ transition: 'all 0.3s' }}
                    />
                ))}
                {/* ATTACHED TRASH: When held, it's relative to gripper (LERPED IN G-SPACE) */}
                {trashStatus === 'held' && (
                    <g transform={`translate(${snapOffset.x}, ${8 + snapOffset.y})`}>
                        <path d="M -7 -4 L -3 -8 L 3 -8 L 7 -4 L 7 4 L 3 8 L -3 8 L -7 4 Z" fill="#8d6e63" stroke="#5d4037" strokeWidth="1.2" />
                        <circle r="12" fill="var(--neon-purple)" opacity="0.15">
                            <animate attributeName="r" values="10;14;10" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                    </g>
                )}
                {isRunning && (
                    <circle cx={0} cy={4} r={6} fill="none" stroke="#5dade2" strokeWidth="1" opacity="0.5">
                        <animate attributeName="r" values="5;9;5" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1s" repeatCount="indefinite" />
                    </circle>
                )}
            </g>

            {/* Base joint */}
            <circle cx={j1.x} cy={j1.y} r={9} fill="#1e2d42" stroke="#5dade2" strokeWidth="2" />
            <circle cx={j1.x} cy={j1.y} r={4} fill="#5dade2" opacity="0.85" />

            {/* Phase label */}
            {isRunning && activeNodeType && (
                <text x={W / 2} y={H - 6} textAnchor="middle" fill="var(--neon-purple)" fontSize="9" fontWeight="700">
                    EXEC › {activeNodeType.toUpperCase()}
                </text>
            )}

            {/* External Trash (Source / Falling / Bin) */}
            {(trashStatus === 'at_source' || trashStatus === 'falling' || trashStatus === 'at_bin') && (
                <g 
                    transform={
                        trashStatus === 'falling' ? `translate(${fallStartPos.x}, ${fallStartPos.y + 8 + fallingOffset})` :
                        trashStatus === 'at_source' ? `translate(${TRASH_POS.x}, ${TRASH_POS.y + 8})` : 
                        `translate(${BIN_POS.x}, ${BIN_POS.y + 8})` 
                    } 
                    style={{ 
                        opacity: (trashStatus === 'at_bin') ? 0 : 1,
                        transition: 'opacity 0.3s',
                        pointerEvents: 'none'
                    }}
                >
                    <path d="M -7 -4 L -3 -8 L 3 -8 L 7 -4 L 7 4 L 3 8 L -3 8 L -7 4 Z" fill="#8d6e63" stroke="#5d4037" strokeWidth="1.2" />
                </g>
            )}

            {/* Bin: FRONT Layer (For Depth) */}
            <g transform={`translate(${BIN_POS.x}, ${BIN_POS.y})`} style={{ pointerEvents: 'none' }}>
                {/* Semi-transparent front wall */}
                <path d="M -15 15 L -12 -5 L 12 -5 L 15 15 Z" fill="rgba(39, 174, 96, 0.2)" />
                {/* Top Rim */}
                <rect x={-13} y={-27} width={26} height={4} rx={1} fill="#27AE60" />
                <text x={0} y={-12} textAnchor="middle" fill="rgba(39, 174, 96, 0.5)" fontSize="9">♻</text>
                <text x={0} y={10} textAnchor="middle" fill="#27AE60" fontSize="7" fontWeight="700">БАК</text>
            </g>
        </svg>
    );
};

// ════════════════════════════════════════════════════════════════
// CodingTable — главный компонент
// ════════════════════════════════════════════════════════════════
const CodingTable = () => {
    const { simulationData, setSimulationData, setCurrentScreen, setScoreTotal, setTeamState, teamState, userRole } = useContext(GameContext);
    const { localElapsed } = useTeamSimulation('coding');

    const metrics = simulationData.totals || {};
    const sensorNoise = metrics.sensorNoise || 0.04;
    const softwareLimit = simulationData.economics?.softwareLimit || 120;

    const [missionStates, setMissionStates] = useState(() => {
        const saved = simulationData.software?.missionStates;
        if (saved) return saved;
        // Default init
        return {
            basic: { nodes: PROGRAM_TEMPLATES[0].nodes.map(n => ({...n, id: 'n_'+Math.random().toString(36).substr(2,9)})), bestScore: 0, completed: false },
            noisy: { nodes: [], bestScore: 0, completed: false },
            debug: { nodes: BROKEN_TEMPLATE.map(n => ({...n, id: 'n_'+Math.random().toString(36).substr(2,9)})), bestScore: 0, completed: false },
        };
    });

    const [activeMissionId, setActiveMissionId] = useState('basic');
    const mission = MISSIONS.find(m => m.id === activeMissionId) || MISSIONS[0];
    const missionIdx = MISSIONS.indexOf(mission);

    // Current nodes for the active mission
    const nodes = missionStates[activeMissionId].nodes;
    const setNodes = (newNodesOrFn) => {
        setMissionStates(prev => {
            const currentNodes = prev[activeMissionId].nodes;
            const nextNodes = typeof newNodesOrFn === 'function' ? newNodesOrFn(currentNodes) : newNodesOrFn;
            return {
                ...prev,
                [activeMissionId]: { ...prev[activeMissionId], nodes: nextNodes }
            };
        });
    };

    // ── Run state ────────────────────────────────────────────
    const [isRunning, setIsRunning]     = useState(false);
    const [activeIdx, setActiveIdx]     = useState(-1);
    const [activeType, setActiveType]   = useState(null);
    const [armTarget, setArmTarget]     = useState('home');
    const [trashStatus, setTrashStatus] = useState('at_source');

    // --- REAL-TIME TAB SYNC ---
    // Save missionStates back to simulationData
    useEffect(() => {
        setSimulationData(prev => ({
            ...prev,
            software: { ...prev.software, missionStates, nodes }
        }));
    }, [missionStates, activeMissionId]);
    const [gripOpen, setGripOpen]       = useState(true);
    const [logLines, setLogLines]       = useState(['C: Система готова. Выполните задание 1/3.']);
    const [runResult, setRunResult]     = useState(null);
    const [runHistory, setRunHistory]   = useState([]);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [feedback, setFeedback]       = useState(null);
    const cancelRef = useRef(false);

    // ── Effective sensor noise (mission may override) ─────────
    const effectiveNoise = mission.noiseOverride ?? sensorNoise;

    // ── Mission switch reset ────────────────────────────────
    useEffect(() => {
        setIsRunning(false);
        setActiveIdx(-1);
        // Reseting ONLY the Trash object for new mission layout, but ARM stays where it is
        setTrashStatus('at_source');
        setRunResult(null);
        setLogLines([`C: Переключение на ${mission.title}: ${mission.name}.`]);
        cancelRef.current = false;
    }, [activeMissionId]);

    // ── Sensor readout ───────────────────────────────────────
    const [sensorVal, setSensorVal] = useState(0.08);
    const [sensorRawVal, setSensorRawVal] = useState(0.08);
    const [sensorTrace, setSensorTrace] = useState([]);
    const [sensorMeanVal, setSensorMeanVal] = useState(0.08);
    useEffect(() => {
        const avg = sensorTrace.length > 0 ? sensorTrace.reduce((s, v) => s + v, 0) / sensorTrace.length : sensorVal;
        setSensorMeanVal(avg);
    }, [sensorTrace, sensorVal]);

    useEffect(() => {
        const t = setInterval(() => {
            let baseDist = 0.9;
            if (armTarget === 'trash') baseDist = 0.08;
            else if (armTarget === 'bin') baseDist = 0.45;
            
            const v = baseDist + (Math.random() - 0.5) * effectiveNoise * 10;
            setSensorVal(v);
            setSensorRawVal(v); // Idle raw = idle clean
            setSensorTrace(p => [v, ...p].slice(0, 22));
        }, 280);
        return () => clearInterval(t);
    }, [effectiveNoise, armTarget]);

    // ── Cost calculation ─────────────────────────────────────
    const usedBudget = nodes.reduce((s, n) => {
        if (n.type === 'kalman_filter') return s + 40;
        if (n.type === 'loop') return s + 10;
        return s;
    }, 0);
    const budgetOk = usedBudget <= softwareLimit;

    const addNode = (type) => {
        const cleanType = (typeof type === 'string' ? type : type?.type || '').trim();
        const def = NODE_DEFS.find(d => d.type === cleanType);
        const cost = def ? Number(def.cost || 0) : 0;
        const limit = Number(softwareLimit || 100);
        
        if ((usedBudget + cost) > limit) {
            log(`❌ Превышен бюджет ПО ($${limit})`);
            return;
        }

        try {
            const newNode = makeNode(cleanType);
            setNodes(p => [...p, newNode]);
        } catch (err) {
            console.error('makeNode/setNodes Failed:', err);
        }
    };
    
    // Expose for console debugging
    useEffect(() => { window._addNode = addNode; }, [addNode]);
    const removeNode = id => setNodes(p => p.filter(n => n.id !== id));
    const updateNode = (id, next) => setNodes(p => p.map(n => n.id === id ? next : n));
    const loadTemplate = (tpl) => setNodes(tpl.nodes.map(n => ({ ...n, id: 'n_' + Math.random().toString(36).substr(2, 7) })));

    // Mission completed tracking
    const missionComplete = missionStates[activeMissionId].completed;

    // ── Log helper ───────────────────────────────────────────
    const log = (line) => setLogLines(p => [line, ...p].slice(0, 8));

    // ── Sleep helper ─────────────────────────────────────────
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const advance = () => {
        const err = validate(nodes);
        if (err) {
            setFeedback(`⚠ ОШИБКА: ${err.toUpperCase()}`);
            return;
        }

        const isReconfirmation = teamState.coding?.status === 'done';
        
        // Calculate average score across all missions
        const scores = Object.values(missionStates).map(m => m.bestScore || 0);
        const avgScore = Math.floor(scores.reduce((a, b) => a + b, 0) / MISSIONS.length);
        
        setSimulationData(prev => {
            const update = {
                ...prev,
                codingConfirmedScore: avgScore,
            };

            // Logistics / History record
            update.economics = {
                ...prev.economics,
                transactionHistory: [
                    {
                        id: Date.now(),
                        type: isReconfirmation ? 'income' : 'expense',
                        label: isReconfirmation ? 'ОПТИМИЗАЦИЯ АЛГОРИТМОВ' : 'РАЗВЕРТЫВАНИЕ ПО',
                        amount: 0,
                        icon: '💾'
                    },
                    ...(prev.economics?.transactionHistory || [])
                ].slice(0, 10)
            };

            return update;
        });

        if (!isReconfirmation) setScoreTotal((prev) => prev + 100);
        setTeamState((prev) => ({ ...prev, coding: { progress: 100, status: 'done' } }));
        setFeedback(isReconfirmation 
            ? '📈 Алгоритмы обновлены: новая конфигурация успешно скомпилирована!' 
            : '✅ Программный комплекс утвержден и загружен в бортовую систему.'
        );
    };

    // ── Run program ───────────────────────────────────────────
    const runProgram = async () => {
        if (isRunning) {
            cancelRef.current = true;
            log('⏹ ЗАВЕРШЕНИЕ...');
            return;
        }
        

        setIsRunning(true);
        cancelRef.current = false;
        setRunResult(null);
        
        // --- REALISTIC START: ALWAYS RESET OBJECT TO SOURCE IF NOT HELD ---
        if (trashStatus !== 'held') {
            setTrashStatus('at_source');
        }

        log('▶ Запуск (текущее сост. сохранено)...');

        const t0 = performance.now();
        const hasKalman = nodes.some(n => n.type === 'kalman_filter' || n.type === 'ai_filter_adv');
        const loopNode = nodes.find(n => n.type === 'loop');
        const totalCycles = loopNode ? (loopNode.iterations || 3) : 1;
        
        let success = true;
        let currentTarget = armTarget; // Logic target
        let currentTrashStatus = trashStatus === 'at_bin' || trashStatus === 'falling' ? 'at_source' : trashStatus;

        // --- PHYSICAL STATE TRACKING ---
        const getDistForPos = (pos) => (pos === 'trash' ? 0.08 : pos === 'bin' ? 0.45 : 0.9);
        let moveStartTime = 0;
        let moveStartDist = getDistForPos(armTarget);
        let moveEndDist = getDistForPos(armTarget);
        const MOVE_DUR = 1000;

        const getPhysDist = () => {
            if (moveStartTime === 0) return moveEndDist;
            const elapsed = performance.now() - moveStartTime;
            const progress = Math.min(1, elapsed / MOVE_DUR);
            // Ease-in-out matches visual animation exactly
            const ease = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
            return moveStartDist + (moveEndDist - moveStartDist) * ease;
        };

        try {
            for (let cycle = 0; cycle < totalCycles; cycle++) {
                if (totalCycles > 1 && success) log(`> [${cycle + 1}/${totalCycles}] ЦИКЛ ЗАПУЩЕН`);
                
                for (let i = 0; i < nodes.length; i++) {
                    if (cancelRef.current || !success) break;
                    const node = nodes[i];
                    if (node.type === 'loop') continue; 

                    setActiveIdx(i);
                    setActiveType(node.type);
                    // Log intent
                    const label = NODE_DEFS.find(d => d.type === node.type)?.label || node.type.toUpperCase();
                    log(`▶ [${i + 1}/${nodes.length}] ${label}`);

                    if (node.type === 'move') {
                        moveStartDist = getPhysDist(); 
                        currentTarget = node.target || 'home';
                        moveEndDist = getDistForPos(currentTarget);
                        moveStartTime = performance.now();

                        setArmTarget(currentTarget);
                        await sleep(MOVE_DUR + 50); // Buffer for animation end
                        
                        const afterMoveDist = getPhysDist();
                        log(`📍 ПРИБЫЛ: ${currentTarget.toUpperCase()} (~${afterMoveDist.toFixed(2)}м)`);
                    } else if (node.type === 'grip') {
                        const close = node.action === 'close';
                        setGripOpen(!close);
                        await sleep(350); // Gripper closing time (transition in SVG)

                        if (close) {
                            const currentPhys = getPhysDist();
                            // Real Grab Check
                            if (currentTarget === 'trash' && currentPhys < 0.35 && currentTrashStatus === 'at_source') {
                                currentTrashStatus = 'held';
                                setTrashStatus('held');
                                log('✓ ОБЪЕКТ ЗАХВАЧЕН');
                            } else {
                                let reason = '';
                                if (currentTarget !== 'trash') {
                                    reason = `ЦЕЛЬ: ${currentTarget.toUpperCase()} (нужен МУСОР)`;
                                } else if (currentTrashStatus === 'held') {
                                    reason = 'ОБЪЕКТ УЖЕ В ЗАХВАТЕ';
                                } else if (currentPhys >= 0.30) {
                                    reason = `ДАЛЕКО: ${currentPhys.toFixed(2)}м (нужно <0.30м)`;
                                } else if (currentTrashStatus !== 'at_source') {
                                    reason = 'МУСОР НЕ НА МЕСТЕ';
                                } else {
                                    reason = `ПОЗИЦИЯ: ${currentPhys.toFixed(2)}м, ЦЕЛЬ: ${currentTarget}`;
                                }
                                log(`✗ ПРОМАХ: ${reason}`);
                            }
                        } else {
                            if (currentTrashStatus === 'held') {
                                if (currentTarget === 'bin') {
                                    currentTrashStatus = 'falling';
                                    setTrashStatus('falling');
                                    log('✓ ОБЪЕКТ ДОСТАВЛЕН В БАК');
                                    setTimeout(() => {
                                        setTrashStatus('at_bin');
                                        currentTrashStatus = 'at_bin';
                                    }, 350);
                                } else {
                                    currentTrashStatus = 'at_source';
                                    setTrashStatus('at_source');
                                    log('⚠ ОБЪЕКТ ПОТЕРЯН');
                                }
                            }
                        }
                        await sleep(400);
                    } else if (node.type === 'wait_sensor') {
                        let conditionMet = false;
                        const timeoutMs = 15000; // Hardcoded high timeout (15s) for manual tuning
                        const pollInterval = 150;
                        const maxAttempts = Math.ceil(timeoutMs / pollInterval);

                        // Find active Kalman filter parameters if any
                        const activeKalman = nodes.slice(0, i).reverse().find(n => n.type === 'kalman_filter');
                        const activeAdvAi = nodes.slice(0, i).reverse().find(n => n.type === 'ai_filter_adv');

                        const currentDist = getPhysDist();
                        log(`📡 СЕНСОР: ${currentDist.toFixed(2)}м | ПОРОГ: ${node.operator} ${node.threshold}`);

                        for (let attempt = 0; attempt < maxAttempts; attempt++) {
                            if (cancelRef.current || !success) break;

                            // 1. Determine base distance based on PHYSICAL position, not logical target
                            const baseDist = getPhysDist();

                            // 2. Apply environmental noise
                            const noiseLevel = effectiveNoise;
                            const noise = (Math.random() - 0.5) * noiseLevel * 4;
                            const rawVal = baseDist + noise;

                            // 3. Apply filtering logic
                            let filtered = rawVal;
                            if (activeAdvAi) {
                                filtered = baseDist + (noise * 0.05); // Super accurate
                            } else if (activeKalman) {
                                // Simplified Kalman: Higher measurement noise = less trust in raw signal
                                const mNoise = activeKalman.measurementNoise || 0.1;
                                const pNoise = activeKalman.processNoise || 0.01;
                                const gain = pNoise / (pNoise + mNoise);
                                // Real noise reduction should be significant with high R
                                const suppression = 1 - (gain * 1.5); 
                                filtered = baseDist + (noise * Math.max(0.05, suppression));
                            }

                            setSensorVal(filtered);
                            setSensorRawVal(rawVal);
                            // setSensorNoise(noiseLevel); // Removed: undefined state setter
                            setSensorTrace(prev => [...prev.slice(-43), filtered]);

                            const PRECISION_LIMIT = 0.06; // Must be within 6cm of the real signal
                            const targetVal = Number(node.threshold);
                            
                            const mathCond = node.operator === 'lte'
                                ? filtered <= targetVal
                                : filtered >= targetVal;
                            
                            const delta = Math.abs(filtered - targetVal);

                            if (mathCond) {
                                if (delta <= PRECISION_LIMIT) {
                                    conditionMet = true;
                                    log(`✓ СЕНСОР OK: ${filtered.toFixed(3)}м ${node.operator} ${node.threshold}`);
                                    break;
                                } else if (attempt % 10 === 0) {
                                    log(`⚠️ ОШИБКА НАСТРОЙКИ: Δ${delta.toFixed(3)}м (нужна точность <${PRECISION_LIMIT}м)`);
                                }
                            } else if (attempt === 0) {
                                log(`... ${filtered.toFixed(3)}м (цель: ${node.operator} ${node.threshold})`);
                            } else if (attempt % 5 === 0) {
                                log(`... ОЖИДАНИЕ (${filtered.toFixed(3)}м)`);
                            }

                            await sleep(pollInterval);
                        }
                        
                        if (!conditionMet) {
                            const physDist = getPhysDist();
                            let failReason = '';
                            if (node.operator === 'lte' && physDist > node.threshold + TOLERANCE) {
                                failReason = `РАССТОЯНИЕ ${physDist.toFixed(2)}м > порога ${node.threshold + TOLERANCE}м`;
                            } else if (node.operator === 'gte' && physDist < node.threshold - TOLERANCE) {
                                failReason = `РАССТОЯНИЕ ${physDist.toFixed(2)}м < порога ${node.threshold - TOLERANCE}м`;
                            } else {
                                failReason = `ШУМ не позволяет стабилизировать сигнал`;
                            }
                            log(`✗ ТАЙМАУТ: ${failReason}`);
                            success = false;
                            break;
                        }
                    } else if (node.type === 'kalman_filter') {
                        await sleep(200);
                    } else if (node.type === 'delay') {
                        await sleep(Math.min(node.ms || 500, 1500));
                    }
                }
                if (!success) break;
            }
        } catch (e) {
            console.error('Runtime error:', e);
            log('❌ КРИТИЧЕСКАЯ ОШИБКА ВЫПОЛНЕНИЯ');
            success = false;
        } finally {
            const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
            const delivered = currentTrashStatus === 'at_bin' || currentTrashStatus === 'falling';
            const needsKalman = mission.successCondition === 'deliver_with_kalman';
            const missionSuccess = success && delivered && (!needsKalman || hasKalman);
            const rawScore = Math.round(calcScore(nodes, effectiveNoise) * mission.scoreMultiplier);
            const score = Math.min(100, rawScore);

            if (missionSuccess) {
                log(`✓ Задание выполнено за ${elapsed}с. Оценка: ${score}%`);
                setScoreTotal(p => p + Math.round(score * 1.5));
                const run = { time: parseFloat(elapsed), score, success: true, hasKalman, missionId: mission.id, ts: Date.now() };
                setRunHistory(p => [...p.slice(-9), run]);
                setRunResult(run);
                
                // Update mission state with best score
                setMissionStates(prev => ({
                    ...prev,
                    [activeMissionId]: { 
                        ...prev[activeMissionId], 
                        completed: true, 
                        bestScore: Math.max(prev[activeMissionId].bestScore || 0, score) 
                    }
                }));
                
                // Check if all are completed (optional, for visual feedback)
                const allDone = Object.values(missionStates).every(m => m.completed);
                if (allDone) {
                    log('✓ ВСЕ ЭТАПЫ ПРОЙДЕНЫ! МОЖНО УТВЕРЖДАТЬ ПРОЕКТ.');
                }
            } else if (success && delivered && needsKalman && !hasKalman) {
                log('⚠ ВНИМАНИЕ: ДОСТАВКА БЕЗ ФИЛЬТРАЦИИ');
                const run = { time: parseFloat(elapsed), score: Math.round(score * 0.5), success: false, hasKalman, missionId: mission.id, ts: Date.now() };
                setRunHistory(p => [...p.slice(-9), run]);
                setRunResult(run);
            } else {
                log('✗ ВЫПОЛНЕНИЕ ОСТАНОВЛЕНО');
                const run = { time: parseFloat(elapsed), score: 0, success: false, hasKalman, missionId: mission.id, ts: Date.now() };
                setRunHistory(p => [...p.slice(-9), run]);
                setRunResult(run);
            }

            setActiveIdx(-1);
            setActiveType(null);
            setIsRunning(false);
        }
    };

    const hints = getHints(nodes, mission);
    const canRun = hints[0]?.sev === 'ok' && !isRunning && budgetOk;

    // ── Colors ───────────────────────────────────────────────
    const noiseColor = sensorNoise > 0.08 ? 'var(--prof-error)' : sensorNoise > 0.05 ? 'var(--prof-warning)' : 'var(--prof-success)';

    // Проверка режима просмотра
    const isViewingMode = userRole && userRole !== 'code';

    // ════════════════════════════════════════════════════════════
    return (
        <Fragment>
            {/* TOP-LEVEL GRID — same pattern as ModelingTable */}
            <div className="sim-screen prof-theme game-screen game-screen-code" style={{
                background: 'var(--prof-bg)',
                color: 'var(--prof-text-main)',
                display: 'grid',
                gridTemplateAreas: '"library workbench telemetry"',
                gridTemplateColumns: 'minmax(240px, 0.85fr) 1.3fr minmax(280px, 0.85fr)',
                gridTemplateRows: '1fr',
                height: '100vh',
                overflow: 'hidden',
                fontFamily: "'Inter', sans-serif",
                paddingTop: '64px', // height of TeamProgressIndicator
                boxSizing: 'border-box',
                pointerEvents: isViewingMode ? 'none' : 'auto',
                opacity: isViewingMode ? 0.7 : 1
            }}>




                {/* ══════════════════════════════════════════════
                    LEFT — LIBRARY (палитра + шаблоны)
                ══════════════════════════════════════════════ */}
                <aside style={{
                    gridArea: 'library', overflowY: 'auto',
                    borderRight: '1px solid var(--prof-border)',
                    background: 'var(--prof-sidebar)', padding: '14px 14px',
                    display: 'flex', flexDirection: 'column', gap: '0',
                }}>

                    {/* Node palette */}
                     <SectionHeader>ПАЛИТРА УЗЛОВ</SectionHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
                        {NODE_DEFS.map(def => (
                             <div
                                 key={def.type}
                                 draggable="true"
                                 onDragStart={e => {
                                     e.dataTransfer.setData('text/plain', def.type);
                                     e.dataTransfer.setData('text', def.type); // Fallback
                                     e.dataTransfer.effectAllowed = 'copy';
                                     e.currentTarget.style.opacity = '0.4';
                                 }}
                                 onDragEnd={e => {
                                     e.currentTarget.style.opacity = '1';
                                 }}
                                 style={{
                                     display: 'flex', alignItems: 'center', gap: '14px',
                                     padding: '12px 16px', borderRadius: '6px', cursor: 'grab',
                                     background: `${def.color}12`, border: `1px solid ${def.color}40`,
                                     color: 'var(--prof-text-main)', fontSize: '13px', fontWeight: '800',
                                     textAlign: 'left', fontFamily: 'inherit',
                                     transition: 'all 0.2s',
                                     userSelect: 'none',
                                 }}
                                 onMouseEnter={e => e.currentTarget.style.background = `${def.color}25`}
                                 onMouseLeave={e => e.currentTarget.style.background = `${def.color}12`}
                             >
                                 <span style={{ fontSize: '18px', lineHeight: 1, pointerEvents: 'none' }}>{def.icon}</span>
                                 <div style={{ display: 'flex', alignItems: 'baseline', flex: 1, gap: '15px', pointerEvents: 'none' }}>
                                     <div style={{ color: def.color, fontWeight: '900', fontSize: '14px' }}>{def.label}</div>
                                     <div style={{ fontSize: '10px', color: 'var(--prof-text-dim)', fontWeight: '400', marginLeft: 'auto', opacity: 0.5, fontStyle: 'italic' }}>{def.desc}</div>
                                 </div>
                             </div>
                        ))}
                        {/* AI Filter if purchased */}
                        {(simulationData.softwareState?.aiFilterActive || simulationData.economics?.purchasedLibraries?.includes('AI_FILTER')) && (
                            <button onClick={() => addNode('ai_filter_adv')} style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '8px 12px', borderRadius: '5px', cursor: 'pointer',
                                background: 'rgba(176,38,255,0.12)', border: '1px solid rgba(176,38,255,0.4)',
                                color: 'var(--neon-purple)', fontSize: '11px', fontWeight: '700',
                                textAlign: 'left', fontFamily: 'inherit',
                            }}>
                                <span>🧠</span> ADV. AI FILTER
                            </button>
                        )}
                    </div>

                    {/* Activated Software Licenses - Always Visible */}
                    <div style={{ marginBottom: '22px' }}>
                        <SectionHeader>АКТИВИРОВАННЫЕ ЛИЦЕНЗИИ</SectionHeader>
                        
                        {simulationData.economics?.purchasedLibraries && simulationData.economics.purchasedLibraries.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {simulationData.economics.purchasedLibraries.map(libId => {
                                    const lib = SOFTWARE_LIST.find(s => s.id === libId);
                                    if (!lib) return null;
                                    return (
                                        <div key={libId} style={{
                                            padding: '10px', borderRadius: '6px',
                                            background: 'rgba(125, 232, 255, 0.04)',
                                            border: '1px solid rgba(125, 232, 255, 0.1)',
                                            display: 'flex', gap: '10px', alignItems: 'flex-start'
                                        }}>
                                            <span style={{ fontSize: '16px' }}>{lib.icon}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '11px', fontWeight: '900', color: '#fff', marginBottom: '2px' }}>{lib.name}</div>
                                                <div style={{ fontSize: '9px', color: 'var(--prof-text-dim)', lineHeight: '1.3' }}>{lib.desc}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{
                                padding: '16px', borderRadius: '8px', 
                                border: '1px dashed rgba(255,255,255,0.05)',
                                background: 'rgba(255,255,255,0.01)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '18px', marginBottom: '6px', opacity: 0.3 }}>🛒</div>
                                <div style={{ fontSize: '10px', color: 'var(--prof-text-dim)', fontStyle: 'italic', lineHeight: '1.4' }}>
                                    Нет активных лицензий.<br />
                                    <span style={{ color: 'var(--prof-warning)', fontWeight: '700' }}>Модули может заказать менеджер</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Templates */}
                    <SectionHeader>ШАБЛОНЫ ПРОГРАММ</SectionHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
                        {PROGRAM_TEMPLATES.map((tpl, i) => (
                            <div key={i} onClick={() => loadTemplate(tpl)} style={{
                                padding: '10px 12px', borderRadius: '5px', cursor: 'pointer',
                                background: 'rgba(88,166,255,0.05)', border: '1px dashed var(--prof-border)',
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(88,166,255,0.1)'; e.currentTarget.style.borderColor = 'var(--prof-accent)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(88,166,255,0.05)'; e.currentTarget.style.borderColor = 'var(--prof-border)'; }}
                            >
                                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--prof-text-main)', marginBottom: '3px' }}>{tpl.name}</div>
                                <div style={{ fontSize: '9px', color: 'var(--prof-text-dim)' }}>{tpl.nodes.length} узлов</div>
                            </div>
                        ))}
                    </div>


                    <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                        {feedback && (
                            <div style={{ 
                                padding: '10px', borderRadius: '4px', marginBottom: '12px', fontSize: '10px',
                                background: feedback.includes('⚠') ? 'rgba(231,76,60,0.1)' : 'rgba(63,185,80,0.1)',
                                border: `1px solid ${feedback.includes('⚠') ? 'var(--prof-error)' : 'var(--prof-success)'}40`,
                                color: feedback.includes('⚠') ? 'var(--prof-error)' : 'var(--prof-success)',
                                textAlign: 'center', transition: 'all 0.3s'
                            }}>
                                {feedback}
                            </div>
                        )}

                        <button 
                            className="btn-prof"
                            style={{
                                width: '100%', padding: '16px', 
                                background: teamState.coding?.status === 'done' ? 'rgba(63,185,80,0.1)' : 'rgba(176,38,255,0.8)', 
                                border: teamState.coding?.status === 'done' ? '1px solid var(--prof-success)' : '1px solid var(--neon-purple)',
                                color: teamState.coding?.status === 'done' ? 'var(--prof-success)' : 'white', 
                                fontWeight: '900', letterSpacing: '1px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontSize: '12px',
                                opacity: 1,
                                boxShadow: teamState.coding?.status === 'done' ? 'none' : '0 0 15px rgba(176,38,255,0.3)'
                            }}
                            onClick={advance}
                        >
                            {teamState.coding?.status === 'done' ? '✓ ОБНОВИТЬ ПРОЕКТ' : 'ПОДТВЕРДИТЬ ПРОЕКТ'}
                        </button>
                        
                    </div>
                </aside>

                {/* ══════════════════════════════════════════════
                    CENTER — WORKBENCH (редактор программы)
                ══════════════════════════════════════════════ */}
                <main style={{
                    gridArea: 'workbench', display: 'flex', flexDirection: 'column',
                    overflow: 'hidden', background: 'var(--prof-bg)',
                    borderRight: '1px solid var(--prof-border)',
                }}>
                    {/* NEW HORIZONTAL MISSION SELECTOR (SHAPKA) */}
                    <div style={{ borderBottom: '1px solid var(--prof-border)', background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(3, 1fr)', 
                            gap: '10px', 
                            padding: '12px 16px',
                            background: 'rgba(255,255,255,0.02)'
                        }}>
                            {MISSIONS.map((m, idx) => {
                                const isActive = activeMissionId === m.id;
                                const state = missionStates[m.id];
                                const bestScore = state?.bestScore || 0;
                                const isPassed = state?.completed;

                                return (
                                    <button
                                        key={m.id}
                                        onClick={() => setActiveMissionId(m.id)}
                                        style={{
                                            padding: '12px 14px',
                                            border: isActive ? `1px solid ${m.diffColor}` : '1px solid rgba(255,255,255,0.05)',
                                            borderRadius: '8px',
                                            background: isActive ? `${m.diffColor}11` : 'rgba(0,0,0,0.3)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px',
                                            cursor: 'pointer',
                                            transition: 'all 0.25s ease',
                                            textAlign: 'left',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            boxShadow: isActive ? `0 4px 15px ${m.diffColor}11` : 'none',
                                        }}
                                    >
                                        {isActive && (
                                            <div style={{
                                                position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
                                                background: m.diffColor, boxShadow: `0 0 10px ${m.diffColor}`
                                            }} />
                                        )}
                                        
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{ fontSize: '9px', fontWeight: '900', color: isActive ? m.diffColor : 'var(--prof-text-dim)', letterSpacing: '1px' }}>
                                                {m.title}
                                            </div>
                                            {isPassed && <span style={{ fontSize: '10px' }}>✅</span>}
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2px' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '13px', fontWeight: '900', color: isActive ? 'white' : 'rgba(255,255,255,0.6)' }}>{m.name}</div>
                                                <div style={{ fontSize: '9px', color: m.diffColor, opacity: 0.7, marginTop: '2px' }}>{m.difficulty}</div>
                                            </div>
                                            {bestScore > 0 && (
                                                <div style={{ fontSize: '14px', fontWeight: '900', color: 'var(--prof-success)', fontFamily: 'monospace' }}>
                                                    {bestScore}%
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        
                        {/* Selected Mission Briefing */}
                        <div style={{ 
                            padding: '10px 16px', 
                            background: 'rgba(0,0,0,0.15)', 
                            borderTop: '1px solid rgba(255,255,255,0.03)',
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'center'
                        }}>
                             <div style={{ flex: 1 }}>
                                <span style={{ fontSize: '10px', color: mission.diffColor, fontWeight: '900', marginRight: '8px' }}>ЦЕЛЬ:</span>
                                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.4' }}>{mission.objective}</span>
                             </div>
                             <div style={{ flex: 1, borderLeft: '1px solid rgba(255,255,255,0.05)', paddingLeft: '20px' }}>
                                <span style={{ fontSize: '10px', color: 'var(--prof-warning)', fontWeight: '900', marginRight: '8px' }}>СОВЕТ:</span>
                                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>{mission.tip}</span>
                             </div>
                        </div>
                    </div>

                    {/* TOP PART: EDITOR (75%) */}
                    <div style={{ flex: 3, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        {/* Workbench sub-header */}
                        <div style={{
                            padding: '8px 20px',
                            borderBottom: '1px solid var(--prof-border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            background: 'rgba(0,0,0,0.15)',
                        }}>
                            <div style={{ fontSize: '9px', fontWeight: '900', color: 'var(--neon-purple)', letterSpacing: '1.5px' }}>
                                РЕДАКТОР ПРОГРАММЫ
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '9px', color: 'var(--prof-text-dim)' }}>{nodes.length} узлов</span>
                                {mission.allowClear && (
                                    <button onClick={() => setNodes([])} style={{
                                        fontSize: '9px', padding: '3px 8px', borderRadius: '3px',
                                        background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)',
                                        color: 'var(--prof-error)', cursor: 'pointer', fontFamily: 'inherit',
                                    }}>ОЧИСТИТЬ</button>
                                )}
                            </div>
                        </div>

                        {/* Nodes list */}
                        <div
                            onDragOver={e => { 
                                e.preventDefault(); 
                                e.dataTransfer.dropEffect = 'copy';
                                if (!isDraggingOver) setIsDraggingOver(true); 
                            }}
                            onDragEnter={e => { e.preventDefault(); setIsDraggingOver(true); }}
                            onDragLeave={() => setIsDraggingOver(false)}
                             onDrop={e => {
                                 e.preventDefault();
                                 setIsDraggingOver(false);
                                 const type = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('text') || e.dataTransfer.getData('Text');
                                 console.log('DEBUG: onDrop received type string:', type);
                                 if (type) {
                                     addNode(type);
                                 } else {
                                     console.warn('DEBUG: onDrop - No type data found in dataTransfer');
                                 }
                             }}
                            className="no-scrollbar"
                            style={{ 
                                flex: 1, overflowY: 'auto', padding: '16px 20px',
                                background: isDraggingOver ? 'rgba(176,38,255,0.06)' : 'transparent',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {nodes.length === 0 ? (
                                <div style={{
                                    height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    color: 'rgba(255,255,255,0.08)', border: '2px dashed rgba(255,255,255,0.03)',
                                    borderRadius: '12px', margin: '20px'
                                }}>
                                    <div style={{ fontSize: '32px', marginBottom: '12px', opacity: 0.4 }}>⚡</div>
                                    <div style={{ fontSize: '12px', fontWeight: '800' }}>ПЕРЕТАЩИТЕ БЛОКИ СЮДА</div>
                                </div>
                            ) : (
                                nodes.map((node, idx) => (
                                    <Fragment key={node.id}>
                                        <NodeCard
                                            node={node} index={idx}
                                            isActive={activeIdx === idx}
                                            currentSensorVal={sensorVal}
                                            onChange={next => updateNode(node.id, next)}
                                            onRemove={() => removeNode(node.id)}
                                        />
                                        {idx < nodes.length - 1 && (
                                            <div style={{ height: '32px', borderLeft: '2px dashed rgba(176,38,255,0.25)', margin: '0 0 0 30px' }} />
                                        )}
                                    </Fragment>
                                ))
                            )}
                            <div style={{ height: '20px' }} />
                        </div>
                    </div>

                    {/* BOTTOM PART: ANALYSIS (26%) */}
                    <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderTop: '2px solid var(--prof-border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '9px', fontWeight: '900', color: 'var(--prof-accent)', letterSpacing: '1px' }}>АНАЛИЗ КОДА</div>
                        </div>
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '15px', padding: '12px 16px' }}>
                            
                            {/* Sensor Column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ fontSize: '8px', color: 'var(--prof-text-dim)', fontWeight: '800' }}>СИГНАЛ ДАТЧИКА</div>
                                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '5px', padding: '10px', border: '1px solid var(--prof-border)', flex: 1 }}>
                                    <div style={{ height: '40px', display: 'flex', alignItems: 'flex-end', gap: '2px', marginBottom: '6px' }}>
                                        {sensorTrace.map((v, i) => (
                                            <div key={i} style={{
                                                flex: 1, borderRadius: '1px 1px 0 0',
                                                height: `${Math.min(100, Math.abs(v) * 600)}%`,
                                                background: 'var(--prof-accent)', opacity: 0.3 + (i / 44),
                                                transition: 'height 0.25s',
                                            }} />
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px' }}>
                                        <span style={{ color: 'var(--prof-text-dim)' }}>READOUT: <strong style={{ color: 'var(--prof-accent)' }}>{sensorVal.toFixed(3)}</strong></span>
                                        <span style={{ color: noiseColor }}>NOISE: {(sensorNoise * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Run Result Column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ fontSize: '8px', color: 'var(--prof-text-dim)', fontWeight: '800' }}>РЕЗУЛЬТАТ ЗАПУСКА</div>
                                {runResult ? (
                                    <div style={{
                                        padding: '12px', borderRadius: '6px', flex: 1,
                                        background: runResult.success ? 'rgba(63,185,80,0.1)' : 'rgba(248,81,73,0.1)',
                                        border: `1px solid ${runResult.success ? 'var(--prof-success)' : 'var(--prof-error)'}40`,
                                        display: 'flex', flexDirection: 'column', justifyContent: 'center'
                                    }}>
                                        <div style={{ fontSize: '10px', fontWeight: '900', color: runResult.success ? 'var(--prof-success)' : 'var(--prof-error)', marginBottom: '8px' }}>
                                            {runResult.success ? '✓ УСПЕШНО' : '✗ ПРЕРВАНО'}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                                            <MetricTile label="ВРЕМЯ" value={`${runResult.time}с`} color="var(--prof-text-main)" />
                                            <MetricTile label="ОЦЕНКА" value={`${runResult.score}%`} color={runResult.score >= 80 ? 'var(--prof-success)' : 'var(--prof-warning)'} />
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px dashed rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--prof-text-dim)', fontSize: '9px' }}>
                                        ОЖИДАНИЕ...
                                    </div>
                                )}
                            </div>

                            {/* History Column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ fontSize: '8px', color: 'var(--prof-text-dim)', fontWeight: '800' }}>ЖУРНАЛ ЗАПУСКОВ</div>
                                <div style={{ flex: 1, overflowY: 'auto' }} className="no-scrollbar">
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {runHistory.slice(-4).reverse().map((r, i) => (
                                            <div key={i} style={{
                                                display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px',
                                                padding: '4px 8px', borderRadius: '3px', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.05)'
                                            }}>
                                                <span style={{ color: r.success ? 'var(--prof-success)' : 'var(--prof-error)', fontWeight: '700', width: '8px' }}>{r.success ? '✓' : '✗'}</span>
                                                <span style={{ color: 'var(--prof-text-dim)', flex: 1 }}>{r.time}с</span>
                                                <span style={{ color: r.score >= 80 ? 'var(--prof-success)' : 'var(--prof-warning)', fontWeight: '700' }}>{r.score}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* ══════════════════════════════════════════════
                    RIGHT — TELEMETRY
                ══════════════════════════════════════════════ */}
                <aside className="no-scrollbar" style={{
                    gridArea: 'telemetry', 
                    background: 'var(--prof-sidebar)', padding: '10px 14px',
                    display: 'flex', flexDirection: 'column', gap: '6px',
                    height: '100%', boxSizing: 'border-box', overflow: 'hidden'
                }}>
                    <style>{`
                        .no-scrollbar::-webkit-scrollbar { display: none; }
                        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    `}</style>
                    {/* Arm visualization */}
                    <div>
                        <SectionHeader>СИМУЛЯЦИЯ МАНИПУЛЯТОРА</SectionHeader>
                        <ArmViz
                            isRunning={isRunning}
                            activeNodeType={activeType}
                            armTarget={armTarget}
                            trashStatus={trashStatus}
                            gripOpen={gripOpen}
                        />
                        {/* Real-time Telemetry Panel */}
                    <div style={{ marginBottom: '8px' }}>
                        <SectionHeader>ТЕЛЕМЕТРИЯ ДАТЧИКОВ</SectionHeader>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                            <div style={{
                                padding: '10px 4px', borderRadius: '6px', textAlign: 'center',
                                background: 'rgba(255,100,100,0.05)', border: '1px solid rgba(255,100,100,0.1)'
                            }}>
                                <div style={{ fontSize: '13px', fontWeight: '900', color: '#ff6b6b', fontFamily: 'monospace' }}>
                                    {sensorRawVal.toFixed(3)}
                                </div>
                                <div style={{ fontSize: '7px', color: 'rgba(255,100,100,0.6)', marginTop: '2px', textTransform: 'uppercase' }}>RAW</div>
                            </div>
                            <div style={{
                                padding: '10px 4px', borderRadius: '6px', textAlign: 'center',
                                background: 'rgba(0,243,255,0.05)', border: '1px solid rgba(0,243,255,0.1)'
                            }}>
                                <div style={{ fontSize: '13px', fontWeight: '900', color: 'var(--prof-accent)', fontFamily: 'monospace' }}>
                                    {sensorVal.toFixed(3)}
                                </div>
                                <div style={{ fontSize: '7px', color: 'rgba(0,243,255,0.6)', marginTop: '2px', textTransform: 'uppercase' }}>CLEAN</div>
                            </div>
                            <div style={{
                                padding: '10px 4px', borderRadius: '6px', textAlign: 'center',
                                background: 'rgba(176,38,255,0.05)', border: '1px solid rgba(176,38,255,0.1)'
                            }}>
                                <div style={{ fontSize: '13px', fontWeight: '900', color: 'var(--neon-purple)', fontFamily: 'monospace' }}>
                                    {sensorMeanVal.toFixed(3)}
                                </div>
                                <div style={{ fontSize: '7px', color: 'rgba(176,38,255,0.6)', marginTop: '2px', textTransform: 'uppercase' }}>MEAN</div>
                            </div>
                        </div>
                    </div>

                    </div>

                    {/* Hints / Instructions Moved from Left Sidebar */}
                    {hints.length > 0 && (
                        <div>
                            <SectionHeader>ИНСТРУКЦИИ</SectionHeader>
                            <div style={{ 
                                display: 'flex', flexDirection: 'column', gap: '3px',
                                maxHeight: '100px', overflowY: 'auto', paddingRight: '4px'
                            }}>
                                {hints.map((h, i) => (
                                    <div key={i} style={{
                                        padding: '8px 10px', borderRadius: '4px', fontSize: '10px', lineHeight: '1.3',
                                        background: h.sev === 'error' ? 'rgba(248,81,73,0.1)' : h.sev === 'warning' ? 'rgba(210,153,34,0.1)' : 'rgba(63,185,80,0.05)',
                                        border: `1px solid ${h.sev === 'error' ? 'var(--prof-error)' : h.sev === 'warning' ? 'var(--prof-warning)' : 'var(--prof-success)'}30`,
                                        color: h.sev === 'error' ? 'var(--prof-error)' : h.sev === 'warning' ? 'var(--prof-warning)' : 'var(--prof-success)',
                                    }}>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                                            <span style={{ fontSize: '11px' }}>{h.sev === 'error' ? '✗' : h.sev === 'warning' ? '⚠' : '✓'}</span>
                                            <span>{h.text}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* RUN BUTTON - ALWAYS CLICKABLE */}
                    <div style={{ marginTop: '15px', display: 'flex', gap: '8px' }}>
                        <button
                            className={`btn-prof${isRunning ? '' : ' primary'}`}
                            style={{
                                flex: 4, padding: '16px', fontSize: '12px', fontWeight: '900',
                                letterSpacing: '1px', borderRadius: '6px',
                                background: isRunning ? 'rgba(248,81,73,0.15)' : undefined,
                                borderColor: isRunning ? 'var(--prof-error)' : undefined,
                                color: isRunning ? 'white' : undefined,
                                position: 'relative', overflow: 'hidden',
                                cursor: 'pointer', opacity: 1
                            }}
                            onClick={runProgram}
                        >
                            {isRunning ? '⏹ ОСТАНОВИТЬ ЦИКЛ' : '▶ ЗАПУСТИТЬ ЦИКЛ'}
                            {isRunning && (
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, height: '3px',
                                    background: 'var(--prof-error)',
                                    animation: 'loading-bar 2s linear infinite',
                                    width: '100%',
                                }} />
                            )}
                        </button>
                        
                        {!isRunning && (
                            <button
                                onClick={() => {
                                    setArmTarget('home');
                                    setGripOpen(true);
                                    setTrashStatus('at_source');
                                    log('♻ Робот сброшен в исходную точку.');
                                }}
                                style={{
                                    flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--prof-border)',
                                    borderRadius: '6px', cursor: 'pointer', color: 'var(--prof-text-dim)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '18px'
                                }}
                                title="Сбросить робота (Дом)"
                            >
                                ♻
                            </button>
                        )}
                    </div>


                    {/* 3. COMMAND CENTER / ЧАТ */}
                    <ChatPanel variant="compact" />
                </aside>
            </div>

            {/* ── PANIC OVERLAY ── */}
            {simulationData.collaboration?.panicActive && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 99999,
                    background: 'rgba(13,17,23,0.95)', backdropFilter: 'blur(15px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
                    <div style={{
                        padding: '40px', border: '1px solid var(--neon-purple)', borderRadius: '8px',
                        background: 'var(--prof-sidebar)', textAlign: 'center', maxWidth: '520px',
                        boxShadow: '0 0 50px rgba(176,38,255,0.2)',
                    }}>
                        <div style={{ fontSize: '40px', marginBottom: '16px', animation: 'blink 1s infinite' }}>📡</div>
                        <h2 style={{ fontSize: '18px', fontWeight: '900', color: 'var(--neon-purple)', marginBottom: '12px' }}>ЭКСТРЕННОЕ СОВЕЩАНИЕ</h2>
                        <p style={{ fontSize: '13px', color: 'var(--prof-text-main)', lineHeight: '1.6', marginBottom: '20px' }}>
                            Экономист инициировал приостановку разработки. Используйте голосовую связь.
                        </p>
                        <div style={{ height: '4px', background: 'rgba(125,232,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: 'var(--neon-purple)', animation: 'panic-timer 10s linear forwards' }} />
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

// ── Tiny helper components ────────────────────────────────────
const SectionHeader = ({ children }) => (
    <div style={{
        fontSize: '10px', fontWeight: '900', color: 'var(--prof-accent)',
        letterSpacing: '1.5px', borderLeft: '2px solid var(--prof-accent)',
        paddingLeft: '8px', marginBottom: '10px', marginTop: '4px',
        textTransform: 'uppercase',
    }}>{children}</div>
);

const MetricTile = ({ label, value, color }) => (
    <div style={{ textAlign: 'center', padding: '7px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: color || 'var(--prof-text-main)', fontFamily: 'monospace' }}>{value}</div>
        <div style={{ fontSize: '8px', color: 'var(--prof-text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '1px' }}>{label}</div>
    </div>
);

// ── App entry point ───────────────────────────────────────────
const App = () => {
    const { currentScreen } = useContext(GameContext);
    const { localElapsed } = useTeamSimulation('global'); // Using the hook for the global timer

    return (
        <div className="app-main-container">
            {currentScreen !== 'hub' && currentScreen !== 'quiz' && currentScreen !== 'final' && <TeamProgressIndicator localElapsed={localElapsed} />}
            <div style={{ paddingTop: '0px' }}> {/* Container for screens */}
                {currentScreen === 'quiz'         && <QuizScreen />}
                {currentScreen === 'hub'          && <HubScreen />}
                {currentScreen === 'prototyping'  && <PrototypingTable />}
                {currentScreen === 'modeling'     && <ModelingTable />}
                {currentScreen === 'coding'       && <CodingTable />}
                {currentScreen === 'final'        && <FinalScreen />}
            </div>
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    try {
        const root = ReactDOM.createRoot(container);
        root.render(<GameProvider><App /></GameProvider>);
        console.log('Технолэнд: Приложение запущено');
    } catch (e) {
        console.error('Mount error:', e);
    }
}
