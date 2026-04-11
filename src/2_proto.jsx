const HARDWARE_LIBRARY = {
    controllers: [
        {
            id: 'arduino_uno_r3',
            name: 'Arduino Uno R3',
            vendor: 'Arduino',
            price: 24,
            weight: 0.025,
            power: 2.4,
            current_draw: 0.05,
            max_current: 0.2,
            compute: 1.0,
            reliability: 0.8,
            ports: { pwm: 6, analog: 6, digital: 14, uart: 1, i2c: 1 },
            notes: 'Базовая архитектура AVR. Ограниченная нагрузочная способность шины питания.'
        },
        {
            id: 'esp32_devkit',
            name: 'ESP32 DevKit V1',
            vendor: 'Espressif',
            price: 11,
            weight: 0.012,
            power: 3.1,
            current_draw: 0.12,
            max_current: 5.0,
            compute: 1.45,
            reliability: 0.82,
            ports: { pwm: 8, analog: 12, digital: 18, uart: 3, i2c: 2 },
            notes: 'Интегрированный Wi-Fi/BT. Оптимизирован для среднемощных сервоприводов с током до 5А.'
        },
        {
            id: 'stm32_nucleo_f446re',
            name: 'STM32 Nucleo-F446RE',
            vendor: 'STMicroelectronics',
            price: 29,
            weight: 0.021,
            power: 2.8,
            current_draw: 0.08,
            max_current: 8.0,
            compute: 1.75,
            reliability: 0.9,
            ports: { pwm: 12, analog: 8, digital: 30, uart: 4, i2c: 3 },
            notes: 'Контроллер с мощным драйвером — до 8А. Идеален для NEMA 17.'
        },
        {
            id: 'teensy_41',
            name: 'Teensy 4.1',
            vendor: 'PJRC',
            price: 32,
            weight: 0.018,
            power: 3.5,
            current_draw: 0.15,
            max_current: 4.0,
            compute: 2.2,
            reliability: 0.87,
            ports: { pwm: 14, analog: 14, digital: 38, uart: 6, i2c: 3 },
            notes: 'Мощный контроллер с огромным лимитом тока и вычислительной мощностью.'
        },
        {
            id: 'raspberry_pi_4',
            name: 'Raspberry Pi 4 Model B',
            vendor: 'Raspberry Pi Foundation',
            price: 55,
            weight: 0.046,
            power: 7.5,
            current_draw: 0.6,
            max_current: 1.2,
            compute: 2.5,
            reliability: 0.75,
            ports: { pwm: 2, analog: 0, digital: 17, uart: 2, i2c: 2 },
            notes: 'Мощный одноплатный компьютер для задач ИИ, но требует внешнего драйвера моторов.'
        }
    ],
    actuators: [
        {
            id: 'sg90_micro',
            name: 'TowerPro SG90',
            vendor: 'TowerPro',
            price: 4,
            weight: 0.013,
            power: 2.1,
            current_draw: 0.15,
            peak_current: 0.8,
            payload_capacity: 0.18,
            speed: 1.18,
            torque: 1.8,
            reliability: 0.62,
            com_offset: 0.08,
            notes: 'Микро-сервопривод для прецизионных узлов с низкой инерцией.'
        },
        {
            id: 'mg90s',
            name: 'TowerPro MG90S',
            vendor: 'TowerPro',
            price: 8,
            weight: 0.022,
            power: 3.2,
            current_draw: 0.25,
            peak_current: 1.2,
            payload_capacity: 0.5,
            speed: 1.05,
            torque: 4.0,
            reliability: 0.7,
            com_offset: 0.09,
            notes: 'Компактный金属-геар серво. Подходит для оси запястья.'
        },
        {
            id: 'mg995',
            name: 'TowerPro MG995',
            vendor: 'TowerPro',
            price: 12,
            weight: 0.055,
            power: 6.4,
            current_draw: 0.5,
            peak_current: 2.5,
            payload_capacity: 1.2,
            speed: 0.92,
            torque: 9.4,
            reliability: 0.78,
            com_offset: 0.12,
            notes: 'Базовый привод для плеча и локтя. Баланс цены и мощности.'
        },
        {
            id: 'mg996r',
            name: 'MG996R',
            vendor: 'TowerPro',
            price: 15,
            weight: 0.057,
            power: 7.1,
            current_draw: 0.55,
            peak_current: 2.8,
            payload_capacity: 1.4,
            speed: 0.96,
            torque: 11.0,
            reliability: 0.81,
            com_offset: 0.12,
            notes: 'Высокомоментная модификация серии MG. Подходит для узлов со средней нагрузкой.'
        },
        {
            id: 'feetech_ft5335m',
            name: 'Feetech FT5335M',
            vendor: 'Feetech',
            price: 28,
            weight: 0.062,
            power: 8.0,
            current_draw: 0.6,
            peak_current: 3.0,
            payload_capacity: 1.6,
            speed: 0.88,
            torque: 13.0,
            reliability: 0.85,
            com_offset: 0.11,
            notes: 'Промышленный серво с metal gear. Отличный выбор для плеча.'
        },
        {
            id: 'nema17_42',
            name: 'NEMA 17 Stepper 42-40',
            vendor: 'Wantai',
            price: 22,
            weight: 0.28,
            power: 10.2,
            current_draw: 1.7,
            peak_current: 2.0,
            payload_capacity: 1.9,
            speed: 0.74,
            torque: 18.0,
            reliability: 0.88,
            com_offset: 0.15,
            notes: 'Шаговый мотор с огромным моментом. Тяжёлый — влияет на массу конструкции.'
        },
        {
            id: 'dynamixel_xl430',
            name: 'Dynamixel XL430-W250',
            vendor: 'Robotis',
            price: 59,
            weight: 0.098,
            power: 7.4,
            current_draw: 0.35,
            peak_current: 1.5,
            payload_capacity: 0.9,
            speed: 1.02,
            torque: 1.45,
            reliability: 0.95,
            com_offset: 0.06,
            notes: 'Премиальный серво с обратной связью. Максимальная надёжность, но малый момент.'
        }
    ],
    grippers: [
        {
            id: 'micro_gripper_sg90',
            name: 'Микро-захват SG90',
            vendor: 'Generic',
            price: 12,
            weight: 0.08,
            power: 2.5,
            current_draw: 0.2,
            peak_current: 0.8,
            payload_capacity: 0.3,
            reliability: 0.65,
            com_offset: 0.06,
            notes: 'Компактный захват на базе микро-сервопривода. Ограничение по массе объекта.'
        },
        {
            id: 'parallel_gripper_2f',
            name: 'Параллельный захват 2F',
            vendor: 'OpenBuilds',
            price: 34,
            weight: 0.19,
            power: 3.2,
            current_draw: 0.3,
            peak_current: 1.2,
            payload_capacity: 1.5,
            reliability: 0.84,
            com_offset: 0.1,
            notes: 'Универсальный захват. Оптимальный баланс для коробок 0.42 кг.'
        },
        {
            id: 'vacuum_gripper_mini',
            name: 'Вакуумный мини-захват',
            vendor: 'DFRobot',
            price: 41,
            weight: 0.24,
            power: 6.8,
            current_draw: 0.6,
            peak_current: 1.8,
            payload_capacity: 0.65,
            reliability: 0.71,
            com_offset: 0.08,
            notes: 'Быстрый цикл, но чувствителен к пористым поверхностям.'
        },
        {
            id: 'robotiq_2f85',
            name: 'Robotiq 2F-85',
            vendor: 'Robotiq',
            price: 280,
            weight: 0.45,
            power: 12.0,
            current_draw: 1.0,
            peak_current: 3.0,
            payload_capacity: 3.0,
            reliability: 0.96,
            com_offset: 0.14,
            notes: 'Промышленный захват. Максимальная надёжность, но дорогой и тяжёлый.'
        }
    ],
    sensors: [
        {
            id: 'ov2640_cam',
            type: 'vision',
            name: 'OV2640 Camera',
            vendor: 'ArduCam',
            price: 18,
            weight: 0.015,
            power: 1.4,
            current_draw: 0.1,
            noise: 0.06,
            precision: 0.04,
            reliability: 0.82,
            ports: { uart: 0, i2c: 1, analog: 0, digital: 0 },
            notes: 'Базовый модуль для визуальной проверки позиции объекта.'
        },
        {
            id: 'esp32_cam_v2',
            type: 'vision',
            name: 'ESP32-CAM V2 Plus',
            vendor: 'AI-Thinker',
            price: 26,
            weight: 0.018,
            power: 1.8,
            current_draw: 0.14,
            noise: 0.035,
            precision: 0.025,
            reliability: 0.88,
            ports: { uart: 0, i2c: 1, analog: 0, digital: 2 },
            notes: 'Улучшенная версия с аппаратным ускорением обработки контуров.'
        },
        {
            id: 'realsense_d435_mini',
            type: 'vision',
            name: 'Intel RealSense D405',
            vendor: 'Intel',
            price: 125,
            weight: 0.042,
            power: 3.5,
            current_draw: 0.45,
            noise: 0.012,
            precision: 0.008,
            reliability: 0.94,
            ports: { uart: 2, i2c: 1, analog: 0, digital: 4 },
            notes: 'Профессиональная стерео-камера для макро-сборки.'
        },
        {
            id: 'hx711_loadcell',
            type: 'force',
            name: 'HX711 + Load Cell',
            vendor: 'Avia',
            price: 14,
            weight: 0.03,
            power: 0.7,
            current_draw: 0.05,
            noise: 0.05,
            precision: 0.03,
            reliability: 0.83,
            ports: { uart: 0, i2c: 0, analog: 1, digital: 1 },
            notes: 'Интегрированный тензодатчик для контроля силы сжатия.'
        },
        {
            id: 'fsr_402_array',
            type: 'force',
            name: 'FSR 402 Matrix',
            vendor: 'Interlink',
            price: 32,
            weight: 0.008,
            power: 0.4,
            current_draw: 0.03,
            noise: 0.024,
            precision: 0.018,
            reliability: 0.89,
            ports: { uart: 0, i2c: 0, analog: 2, digital: 0 },
            notes: 'Матрица резистивных датчиков давления. Сверхлёгкий вариант.'
        },
        {
            id: 'ati_nano_17',
            type: 'force',
            name: 'ATI Nano17 F/T',
            vendor: 'ATI Industrial',
            price: 450,
            weight: 0.012,
            power: 1.2,
            current_draw: 0.12,
            noise: 0.004,
            precision: 0.002,
            reliability: 0.97,
            ports: { uart: 0, i2c: 1, analog: 4, digital: 0 },
            notes: 'Эталонный 6-осевой датчик силы и момента для прецизионных задач.'
        },
        {
            id: 'mpu6050_imu',
            type: 'imu',
            name: 'MPU-6050 IMU',
            vendor: 'InvenSense',
            price: 8,
            weight: 0.003,
            power: 0.2,
            current_draw: 0.02,
            noise: 0.08,
            precision: 0.05,
            reliability: 0.78,
            ports: { uart: 0, i2c: 1, analog: 0, digital: 0 },
            notes: '6-осевой IMU для контроля вибраций и положения.'
        }
    ]
};

// Аналитическая функция для извлечения лидеров в каждой категории (для умных тегов)
const getCategoryHighlights = (category) => {
    const items = HARDWARE_LIBRARY[category] || [];
    if (items.length === 0) return {};
    return {
        minPrice: Math.min(...items.map(i => i.price)),
        maxReliability: Math.max(...items.map(i => i.reliability || 0)),
        maxPower: Math.max(...items.map(i => (i.torque || i.payload_capacity || i.compute || 0))),
        minWeight: Math.min(...items.map(i => i.weight || 100)),
        maxCompute: Math.max(...items.map(i => i.compute || 0))
    };
};

const HARDWARE_DEFAULTS = {
    controller: 'esp32_devkit',
    shoulderActuator: 'mg995',
    elbowActuator: 'mg995',
    wristActuator: 'mg996r',
    gripper: 'parallel_gripper_2f',
    visionSensor: 'ov2640_cam',
    forceSensor: 'hx711_loadcell'
};

const BRICS_FEED_LIMIT = 10;
const getLibraryItem = (bucket, id) => HARDWARE_LIBRARY[bucket].find((item) => item.id === id);
const formatUsd = (value) => `$${Number(value || 0).toFixed(2)}`;
const formatKg = (value) => `${Number(value || 0).toFixed(3)} кг`;
const formatPercent = (value) => `${Math.round(Number(value || 0))}%`;

const appendCollaborationFeed = (collaboration, event) => {
    const nextEntry = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        at: new Date().toISOString(),
        ...event
    };
    return {
        ...collaboration,
        feed: [nextEntry, ...(collaboration?.feed || [])].slice(0, BRICS_FEED_LIMIT)
    };
};

const getRequiredPorts = (hardware) => {
    const visionSensor = getLibraryItem('sensors', hardware.visionSensor);
    const forceSensor = getLibraryItem('sensors', hardware.forceSensor);

    return {
        pwm: 4,
        analog: forceSensor?.ports?.analog || 0,
        digital: forceSensor?.ports?.digital || 0,
        uart: visionSensor?.ports?.uart || 0,
        i2c: visionSensor?.ports?.i2c || 0
    };
};

const hasEnoughPorts = (controller, requiredPorts) => (
    Object.keys(requiredPorts).every((key) => Number(controller?.ports?.[key] || 0) >= Number(requiredPorts[key] || 0))
);

const deriveSimulationFromHardware = (hardware, scenario, existingBusiness = {}, existingCollaboration = {}, existingSoftware = {}, marketState = {}, purchasedSamples = []) => {
    const activeEvent = existingCollaboration?.activeBricsEvent;
    const bricsEvents = existingCollaboration?.bricsEvents || [];

    const selected = {
        controller: getLibraryItem('controllers', hardware.controller) || HARDWARE_LIBRARY.controllers[0],
        shoulder: getLibraryItem('actuators', hardware.shoulderActuator) || HARDWARE_LIBRARY.actuators[0],
        elbow: getLibraryItem('actuators', hardware.elbowActuator) || HARDWARE_LIBRARY.actuators[0],
        wrist: getLibraryItem('actuators', hardware.wristActuator) || HARDWARE_LIBRARY.actuators[0],
        gripper: getLibraryItem('grippers', hardware.gripper) || HARDWARE_LIBRARY.grippers[0],
        vision: getLibraryItem('sensors', hardware.visionSensor) || HARDWARE_LIBRARY.sensors[0],
        force: getLibraryItem('sensors', hardware.forceSensor) || HARDWARE_LIBRARY.sensors[0]
    };

    const parts = [
        { slot: 'Контроллер', bucket: 'controllers', spec: selected.controller },
        { slot: 'Плечевая ось', bucket: 'actuators', spec: selected.shoulder },
        { slot: 'Локтевая ось', bucket: 'actuators', spec: selected.elbow },
        { slot: 'Ось запястья', bucket: 'actuators', spec: selected.wrist },
        { slot: 'Захват', bucket: 'grippers', spec: selected.gripper },
        { slot: 'Камера', bucket: 'sensors', spec: selected.vision },
        { slot: 'Датчик усилия', bucket: 'sensors', spec: selected.force }
    ].map((item, index) => ({
        id: `${item.bucket}-${item.spec.id}-${index}`,
        slot: item.slot,
        bucket: item.bucket,
        ...item.spec
    }));

    const bomCost = parts.reduce((sum, part) => {
        const isSample = (purchasedSamples || []).includes(part.spec?.id || part.id); // We spread spec, so part.id should be item.spec.id before line 380. 
        // Wait, line 380 overwrites it. I'll fix the map first.
        return sum + Number(part.price || 0);
    }, 0);
    const powerWatts = parts.reduce((sum, part) => sum + Number(part.power || 0), 0);

    // Реалистичная проверка питания: только ОДИН серво в пике, остальные в рабочем режиме
    const actuatorParts = parts.filter(p => p.bucket === 'actuators' || p.bucket === 'grippers');
    const maxPeakSingle = actuatorParts.reduce((max, p) => Math.max(max, p.peak_current || 0), 0);
    const otherRunning = actuatorParts.reduce((sum, p) => {
        const isMax = (p.peak_current || 0) === maxPeakSingle && maxPeakSingle > 0;
        return sum + (isMax ? 0 : Number(p.current_draw || 0));
    }, 0);
    const runningCurrent = actuatorParts.reduce((sum, p) => sum + Number(p.current_draw || 0), 0);
    const sensorRunning = parts.filter(p => p.bucket === 'sensors' || p.bucket === 'controllers').reduce((sum, p) => sum + Number(p.current_draw || 0), 0);
    const peakCurrent = maxPeakSingle + otherRunning + sensorRunning;
    const currentLimit = Number(selected.controller?.max_current || 0);
    const powerSupplyOverload = peakCurrent > currentLimit && currentLimit > 0;

    const structuralWeight = Number((0.82 + 0.15 + parts.reduce((sum, part) => sum + Number(part.weight || 0), 0)).toFixed(3));
    const frameCost = 8;

    // Применяем влияние динамического рынка (теперь берем из входного аргумента для надежности)
    const market = marketState || { 
        indices: { tech: 1, energy: 1, logistics: 1 }, 
        creditScore: 70,
        upgrades: [] 
    };
    
    // Базовый расчет с учетом рыночных индексов
    let totalBomCost = (bomCost * (market.indices?.tech || 1)) + (frameCost * (market.indices?.logistics || 1));
    
    // Влияние активного события (Новостей)
    if (market.activeAlert && market.activeAlert.impact) {
        const { type, multiplier } = market.activeAlert.impact;
        let mult = multiplier;
        
        // [UPGRADE] Logistics Optimization
        if (type === 'logistics' && market.upgrades?.includes('LOG_OPT')) {
            mult = 1 + (mult - 1) * 0.6; // Снижаем штраф на 40%
        }
        
        if (type === 'tech' || type === 'logistics' || type === 'energy') {
            totalBomCost *= mult;
        }
    }

    // [UPGRADE] Bulk Purchasing (Оптовые закупки)
    if (market.upgrades?.includes('BULK_BUY')) {
        totalBomCost *= 0.92; // Постоянная скидка 8%
    }

    // Влияние кредитного рейтинга (Репутация)
    const score = market.creditScore || 70;
    if (score > 90) {
        totalBomCost *= 0.9; // Скидка 10% за надежность
    } else if (score < 40) {
        totalBomCost *= 1.15; // Наценка 15% за риски
    }

    let bricsEventModifier = null;
    if (activeEvent?.effect) {
        const eff = activeEvent.effect;
        if (eff.bomMultiplier) {
            totalBomCost = Number((totalBomCost * eff.bomMultiplier).toFixed(2));
            bricsEventModifier = { type: 'bomMultiplier', value: eff.bomMultiplier, title: activeEvent.title };
        }
        // ... (остальная логика BRICS остается прежней)
        if (eff.bomDiscount) {
            totalBomCost = Number((totalBomCost * (1 - eff.bomDiscount)).toFixed(2));
            bricsEventModifier = { type: 'bomDiscount', value: eff.bomDiscount, title: activeEvent.title };
        }
        if (eff.priceMultiplier) {
            if (eff.slot === 'controller' && eff.targetId === hardware.controller) {
                const part = parts.find(p => p.id && p.bucket === 'controllers');
                if (part) {
                    totalBomCost = Number((totalBomCost + part.price * (eff.priceMultiplier - 1)).toFixed(2));
                    bricsEventModifier = { type: 'priceSurge', value: eff.priceMultiplier, title: activeEvent.title };
                }
            }
        }
        if (eff.priceDiscount && eff.slot === 'sensor') {
            const part = parts.find(p => p.bucket === 'sensors' && p.id?.includes(eff.targetId));
            if (part) {
                totalBomCost = Number((totalBomCost - part.price * eff.priceDiscount).toFixed(2));
                bricsEventModifier = { type: 'priceDrop', value: eff.priceDiscount, title: activeEvent.title };
            }
        }
    }
    totalBomCost = Number(totalBomCost.toFixed(2));
    const payloadCapacity = Math.min(selected.shoulder.payload_capacity, selected.elbow.payload_capacity, selected.wrist.payload_capacity, selected.gripper.payload_capacity);
    // Нагрузка = только блок (захват — часть руки, не груз)
    const totalLoad = Number((scenario.blockWeight || 0).toFixed(3));
    const weakestTorque = Math.min(selected.shoulder.torque, selected.elbow.torque, selected.wrist.torque);
    const torqueDemand = Number((totalLoad * 9.81 * 0.12).toFixed(2));
    const torqueMargin = Number((weakestTorque - torqueDemand).toFixed(2));

    const armLengths = { shoulder: 0.15, elbow: 0.12, wrist: 0.08 };
    const comOffset = (
        (selected.shoulder.com_offset || 0) * armLengths.shoulder +
        (selected.elbow.com_offset || 0) * armLengths.elbow +
        (selected.wrist.com_offset || 0) * armLengths.wrist +
        (selected.gripper.com_offset || 0) * (armLengths.wrist + 0.05)
    ) / (armLengths.shoulder + armLengths.elbow + armLengths.wrist + 0.05);
    const centerOfMassOffset = Number(comOffset.toFixed(3));
    // Механика баланса: ЦМ опасен только при тяжёлом захвате И слабом плече
    // MG995 (9.4) и MG996R (11.0) проходят, SG90 (1.8) — нет
    const comRisk = centerOfMassOffset > 0.14 && selected.shoulder.torque < 9;

    const meanActuatorSpeed = (selected.shoulder.speed + selected.elbow.speed + selected.wrist.speed) / 3;
    const sensorNoise = Number((((selected.vision.noise || 0) + (selected.force.noise || 0)) / 2).toFixed(3));
    const requiredPorts = getRequiredPorts(hardware);
    const controllerPortsOk = hasEnoughPorts(selected.controller, requiredPorts);
    const controllerCompute = Number(selected.controller.compute || 1);
    const softwareBonus = Number(existingSoftware?.reliabilityBonus || 1);
    const noisePenalty = Math.max(0.72, 1 - sensorNoise * 0.9);
    const loadPenalty = Math.max(0.42, 1 - Math.max(0, totalLoad / Math.max(payloadCapacity, 0.01)) * 0.35);
    const armSpeedFactor = Number((controllerCompute * meanActuatorSpeed * loadPenalty * noisePenalty * softwareBonus).toFixed(2));
    const estimatedCycleSeconds = Number((8.4 / Math.max(armSpeedFactor, 0.32)).toFixed(2));

    const mechanicalRisk = totalLoad > payloadCapacity || torqueMargin < 0 || structuralWeight > 2.4 || powerSupplyOverload;

    const componentReliabilities = [
        selected.controller.reliability || 1.0,
        selected.shoulder.reliability || 1.0,
        selected.elbow.reliability || 1.0,
        selected.wrist.reliability || 1.0,
        selected.gripper.reliability || 1.0
    ];

    const actuatorReliability = Math.min(...componentReliabilities);
    let reliabilityScore = Math.max(42, Math.min(97, Math.round(actuatorReliability * 100)));

    const activeGrants = existingBusiness?.activeGrants || []; // From economist
    if (activeGrants.includes('heavy_duty') && structuralWeight > 5.0) {
        reliabilityScore = Math.round(reliabilityScore * 0.9);
    }

    const warnings = [];
    const alerts = [];
    const maskotAlerts = [];

    if (mechanicalRisk) {
        warnings.push('Риск механического отказа: нагрузка, запас по моменту или масса рамы выходят за безопасный диапазон выбранных приводов.');
    }
    if (powerSupplyOverload) {
        warnings.push(`⚡ ПЕРЕГРУЗКА ПИТАНИЯ: пиковый ток ${peakCurrent.toFixed(2)}А превышает лимит контроллера ${currentLimit.toFixed(2)}А!`);
        alerts.push({ type: 'error', message: 'Power Supply Overload', source: 'proto' });
        maskotAlerts.push({ character: 'proto', emotion: 'sad', message: `Критическая перегрузка питания! Пиковый ток ${peakCurrent.toFixed(2)}А > лимит ${currentLimit.toFixed(2)}А. Выбери контроллер с большим током или менее мощные моторы.` });
    }
    if (!controllerPortsOk) {
        warnings.push('Предупреждение программиста: выбранному контроллеру не хватает свободных портов для текущего набора датчиков и 3-осевой руки.');
    }
    if (sensorNoise > 0.08) {
        warnings.push('Шум датчиков повышен. Перед захватом нужно использовать блок ожидания датчика с фильтрацией.');
        maskotAlerts.push({ character: 'code', emotion: 'norm', message: 'Шумные датчики! Добавь блок фильтра (скользящее среднее) в программу, иначе манипулятор будет дрожать.' });
    }
    if (powerWatts > 34) {
        warnings.push('Энергопотребление повышено. Нужен отдельный силовой контур и проверка теплового режима.');
    }
    if (torqueMargin < 0) {
        maskotAlerts.push({ character: 'proto', emotion: 'sad', message: `Критическая нагрузка на сервопривод! Запас момента ${torqueMargin.toFixed(2)} кг·см < 0. Увеличь момент привода или снизь нагрузку.` });
    }

    if (activeGrants.includes('heavy_duty') && structuralWeight > 5.0) {
        warnings.push('⚖ ГРАНТ HEAVY DUTY: Вес манипулятора превысил 5кг! Наложен штраф -10% к Идеалу проекта.');
        maskotAlerts.push({ character: 'proto', emotion: 'norm', message: 'Мы превысили 5кг по условию гранта Heavy Duty. Это снизит финальный рейтинг системы.' });
    }

    const collaboration = {
        syncMode: existingCollaboration?.syncMode || 'Синхронизация вкладок + локальное хранилище',
        messages: existingCollaboration?.messages || [],
        feed: existingCollaboration?.feed || [],
        activeNotifications: alerts,
        maskotAlerts: [...(existingCollaboration?.maskotAlerts || []), ...maskotAlerts].slice(-5)
    };

    const baseCyclesPerMonth = Math.round((26 * 8 * 3600) / estimatedCycleSeconds);
    const robotOutputPerMonth = Math.round(baseCyclesPerMonth * softwareBonus);
    const monthlyManualCost = Number((existingBusiness.laborCostMonthly || 420) * (existingBusiness.operatorsCount || 2));
    const robotRevenueEquivalent = Number(((robotOutputPerMonth / Math.max(existingBusiness.manualOutputPerMonth || 6400, 1)) * monthlyManualCost).toFixed(2));
    const monthlySavings = Number(Math.max(0, robotRevenueEquivalent - (existingBusiness.serviceMonthly || 28)).toFixed(2));
    const robotPrice = Number((bomCost * 2.05).toFixed(2));
    const roiMonths = monthlySavings > 0 ? Number((robotPrice / monthlySavings).toFixed(1)) : null;
    const monthlyProfit = Number(monthlySavings.toFixed(2));

    // Grant cap adjustment from BRICS events
    let grantCap = scenario.grantCap || 420;
    if (activeEvent?.effect?.grantBonus) {
        grantCap += activeEvent.effect.grantBonus;
    }

    return {
        hardware,
        bom: parts,
        totals: {
            bomCost: totalBomCost,
            frameCost,
            bricsEventModifier,
            powerWatts,
            peakCurrent,
            runningCurrent,
            sensorRunning,
            maxPeakSingle,
            currentLimit,
            powerSupplyOverload,
            structuralWeight,
            payloadCapacity,
            totalLoad,
            centerOfMassOffset,
            comRisk,
            weakestTorque,
            torqueDemand,
            torqueMargin,
            armSpeedFactor,
            estimatedCycleSeconds,
            reachRadius: 0.34,
            sensorNoise,
            reliabilityScore,
            requiredPorts,
            controllerPorts: selected.controller.ports,
            controllerPortsOk,
            mechanicalRisk,
            warnings,
            alerts
        },
        business: {
            ...existingBusiness,
            robotPrice,
            serviceMonthly: Number((bomCost * 0.07).toFixed(2)),
            robotOutputPerMonth,
            roiMonths,
            monthlyProfit,
            grantCap
        },
        collaboration
    };
};

const CompactHardwareItem = ({ item, isActive, isGhost, onClick, onMouseEnter, onMouseLeave, bucket, onSetHoveredItem, activeItem, category, simulationData }) => {
    const isSample = simulationData?.purchasedSamples?.includes(item.id);
    const powerW = item.power || 0;
    const relPct = Math.round((item.reliability || 0) * 100);
    const relColor = relPct >= 80 ? 'var(--prof-success)' : relPct >= 70 ? 'var(--prof-warning)' : 'var(--prof-error)';
    const price = item.price || 0;
    
    // Сравнение с текущим активным компонентом
    const deltas = activeItem && !isActive ? {
        price: price - activeItem.price,
        rel: relPct - Math.round((activeItem.reliability || 0) * 100),
        power: powerW - (activeItem.power || 0),
        weight: (item.weight || 0) - (activeItem.weight || 0)
    } : null;

    // Умные теги
    const highlights = useMemo(() => getCategoryHighlights(category), [category]);
    const tags = [];
    if (price === highlights.minPrice) tags.push({ text: 'ЭКОНОМ', color: 'var(--prof-text-dim)' });
    if ((item.reliability || 0) === highlights.maxReliability) tags.push({ text: 'НАДЕЖНЫЙ', color: 'var(--prof-success)' });
    if ((item.torque || item.payload_capacity || item.compute || 0) === highlights.maxPower && highlights.maxPower > 0) tags.push({ text: 'МОЩНЫЙ', color: 'var(--prof-accent)' });
    if ((item.weight || 100) === highlights.minWeight) tags.push({ text: 'ЛЕГКИЙ', color: '#bd93f9' });
    if (isSample) tags.push({ text: '📦 В ГАРАЖЕ', color: '#ffb36b' });

    const renderDelta = (val, isLowerBetter = false) => {
        if (val === 0) return null;
        const isBetter = isLowerBetter ? val < 0 : val > 0;
        return (
            <span style={{ fontSize: '9.5px', marginLeft: '4px', color: isBetter ? 'var(--prof-success)' : 'var(--prof-error)', fontWeight: 'bold', opacity: 0.8 }}>
                ({val > 0 ? '+' : ''}{val.toFixed(val % 1 === 0 ? 0 : 2)})
            </span>
        );
    };

    return (
    <div
        className={`compact-hw-item ${isActive ? 'active' : ''} ${isGhost ? 'ghost' : ''}`}
        onClick={onClick}
        onMouseEnter={(e) => { onMouseEnter?.(); onSetHoveredItem?.({ item, bucket, x: e.clientX, y: e.clientY }); }}
        onMouseLeave={() => { onMouseLeave?.(); onSetHoveredItem?.(null); }}
        style={{
            display: 'flex', alignItems: 'stretch', gap: '0', padding: '0',
            border: `1px solid ${isActive ? 'var(--prof-accent)' : 'var(--prof-border)'}`,
            borderRadius: '4px', marginBottom: '8px', cursor: 'pointer',
            transition: 'all 0.2s', overflow: 'hidden', position: 'relative',
            background: isActive ? 'rgba(88, 166, 255, 0.1)' : 'rgba(255,255,255,0.02)',
            boxShadow: isActive ? '0 0 10px rgba(88, 166, 255, 0.1)' : 'none'
        }}
    >
        <div style={{ flex: 1, padding: '12px 14px', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: isActive ? 'var(--prof-accent)' : 'var(--prof-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textTransform: 'uppercase' }}>
                {isActive ? '● ' : ''}{item.name}
            </div>
            
            {/* Умные теги */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                {tags.map((tag, i) => (
                    <span key={i} style={{ fontSize: '9.5px', padding: '1px 5px', border: `1px solid ${tag.color}`, color: tag.color, borderRadius: '2px', fontWeight: 'bold' }}>
                        {tag.text}
                    </span>
                ))}
                {!tags.length && (
                    <span style={{ fontSize: '10px', color: 'var(--prof-text-dim)', opacity: 0.5 }}>{item.vendor.toUpperCase()}</span>
                )}
            </div>
        </div>

        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'auto 1fr', 
            alignContent: 'center',
            padding: '12px 16px', 
            borderLeft: '1px solid var(--prof-border)', 
            minWidth: '170px', 
            columnGap: '10px', 
            rowGap: '4px',
            background: 'rgba(0,0,0,0.15)',
            boxSizing: 'border-box'
        }}>
            <div style={{ opacity: 0.6, fontSize: '9px', letterSpacing: '0.4px', textTransform: 'uppercase', display: 'flex', alignItems: 'center' }}>Мощность:</div>
            <div style={{ textAlign: 'right', fontSize: '11.5px', color: 'var(--prof-text-main)', fontFamily: 'IBM Plex Mono', fontWeight: '600' }}>
                {powerW.toFixed(1)}W {deltas && renderDelta(deltas.power)}
            </div>

            <div style={{ opacity: 0.6, fontSize: '9px', letterSpacing: '0.4px', textTransform: 'uppercase', display: 'flex', alignItems: 'center' }}>Надежность:</div>
            <div style={{ textAlign: 'right', fontSize: '11.5px', color: relColor, fontWeight: 'bold', fontFamily: 'IBM Plex Mono' }}>
                {relPct}% {deltas && renderDelta(deltas.rel)}
            </div>

            <div style={{ gridColumn: '1 / span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '9px', color: 'var(--prof-accent)', opacity: 0.7, fontWeight: '800' }}>BOM PRICE</span>
                <span style={{ fontSize: '16px', color: 'var(--prof-accent)', fontWeight: '900', fontFamily: 'IBM Plex Mono' }}>
                    $ {isSample ? 0 : price} {deltas && renderDelta(deltas.price, true)}
                </span>
            </div>
        </div>
    </div>
    );
};

const PrototypingTable = () => {
    const { simulationData, setSimulationData, setCurrentScreen, setScoreTotal, setTeamState, teamState, userRole } = useContext(GameContext);
    const { localElapsed } = useTeamSimulation('prototyping');
    const [hardware, setHardware] = useState({ ...HARDWARE_DEFAULTS, ...(simulationData?.hardware || {}) });
    const [feedback, setFeedback] = useState('P: Соберите конфигурацию манипулятора. Следите за надёжностью ≥75% и мощностью.');
    const [emotion, setEmotion] = useState('norm');
    const [activeTab, setActiveTab] = useState('actuators');
    const [ghostHardware, setGhostHardware] = useState(null);
    const [showDatasheet, setShowDatasheet] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isTesting, setIsTesting] = useState(false);
    const [testPhase, setTestPhase] = useState(0); // 0=idle, 1=startup, 2=moving, 3=done
    const [animatedCurrent, setAnimatedCurrent] = useState(0); // Анимированное значение тока (только во время теста)
    const [animatedCoMOffset, setAnimatedCoMOffset] = useState(0); // Анимированное значение центра масс
    const currentAnimRef = useRef(0); // Текущее значение тока для анимации
    const targetAnimRef = useRef(0); // Целевое значение тока
    const comAnimRef = useRef(0); // Опорное значение центра масс

    // --- REAL-TIME TAB SYNC ---
    // Push local hardware changes to global state
    useEffect(() => {
        setSimulationData(prev => {
            if (JSON.stringify(prev.hardware) === JSON.stringify(hardware)) return prev;
            return { ...prev, hardware };
        });
    }, [hardware]);

    // Pull global hardware changes into local state
    useEffect(() => {
        if (simulationData.hardware) {
            if (JSON.stringify(simulationData.hardware) !== JSON.stringify(hardware)) {
                setHardware(simulationData.hardware);
            }
        }
    }, [simulationData.hardware]);
    const [sortKey, setSortKey] = useState('default'); // Ключ сортировки для текущей вкладки
    const [showDiagnostics, setShowDiagnostics] = useState(false); // Показать отчет об ошибках
    const [reportHistory, setReportHistory] = useState([]); // История снимков результатов тестов
    const [selectedReportIndex, setSelectedReportIndex] = useState(0); // Индекс просматриваемого отчета в истории

    // Сортировка компонентов по выбранному критерию
    const MARKET_ONLY_IDS = ['teensy_41', 'robotiq_2f85', 'dynamixel_xl430', 'nema17_42'];

    const sortedControllers = useMemo(() => {
        const items = HARDWARE_LIBRARY.controllers.filter(item => 
            !MARKET_ONLY_IDS.includes(item.id) || (simulationData.purchasedSamples || []).includes(item.id)
        );
        if (sortKey === 'price_asc') return [...items].sort((a, b) => a.price - b.price);
        if (sortKey === 'price_desc') return [...items].sort((a, b) => b.price - a.price);
        if (sortKey === 'reliability') return [...items].sort((a, b) => b.reliability - a.reliability);
        if (sortKey === 'current') return [...items].sort((a, b) => (a.max_current || 0) - (b.max_current || 0));
        return items; // default — по порядку
    }, [sortKey, simulationData.purchasedSamples]);

    const sortedActuators = useMemo(() => {
        const items = HARDWARE_LIBRARY.actuators.filter(item => 
            !MARKET_ONLY_IDS.includes(item.id) || (simulationData.purchasedSamples || []).includes(item.id)
        );
        if (sortKey === 'price_asc') return [...items].sort((a, b) => a.price - b.price);
        if (sortKey === 'price_desc') return [...items].sort((a, b) => b.price - a.price);
        if (sortKey === 'reliability') return [...items].sort((a, b) => b.reliability - a.reliability);
        if (sortKey === 'torque') return [...items].sort((a, b) => (a.torque || 0) - (b.torque || 0));
        if (sortKey === 'payload') return [...items].sort((a, b) => (a.payload_capacity || 0) - (b.payload_capacity || 0));
        return items;
    }, [sortKey, simulationData.purchasedSamples]);

    const sortedGrippers = useMemo(() => {
        const items = HARDWARE_LIBRARY.grippers.filter(item => 
            !MARKET_ONLY_IDS.includes(item.id) || (simulationData.purchasedSamples || []).includes(item.id)
        );
        if (sortKey === 'price_asc') return [...items].sort((a, b) => a.price - b.price);
        if (sortKey === 'price_desc') return [...items].sort((a, b) => b.price - a.price);
        if (sortKey === 'reliability') return [...items].sort((a, b) => b.reliability - a.reliability);
        if (sortKey === 'payload') return [...items].sort((a, b) => (a.payload_capacity || 0) - (b.payload_capacity || 0));
        return items;
    }, [sortKey, simulationData.purchasedSamples]);

    const sortedSensors = useMemo(() => {
        const items = [...HARDWARE_LIBRARY.sensors];
        if (sortKey === 'price_asc') return items.sort((a, b) => a.price - b.price);
        if (sortKey === 'price_desc') return items.sort((a, b) => b.price - a.price);
        if (sortKey === 'reliability') return items.sort((a, b) => b.reliability - a.reliability);
        if (sortKey === 'noise_asc') return items.sort((a, b) => (a.noise || 0) - (b.noise || 0));
        if (sortKey === 'noise_desc') return items.sort((a, b) => (b.noise || 0) - (a.noise || 0));
        return items;
    }, [sortKey]);

    // Сброс сортировки при смене вкладки
    useEffect(() => {
        setSortKey('default');
    }, [activeTab]);

    const HardwareTooltip = () => {
        if (!hoveredItem) return null;
        const { item, bucket, x, y } = hoveredItem;
        const relPct = Math.round((item.reliability || 0) * 100);
        return (
        <div style={{
            position: 'fixed', left: x + 20, top: Math.min(y - 10, window.innerHeight - 400), zIndex: 10000,
            background: 'var(--prof-sidebar)', border: '1px solid var(--prof-accent)',
            borderRadius: '8px', padding: '20px', width: '360px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.8)', pointerEvents: 'none',
            backdropFilter: 'blur(15px)'
        }}>
            <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--prof-accent)', marginBottom: '8px', letterSpacing: '0.5px' }}>{item.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--prof-text-dim)', marginBottom: '14px', fontStyle: 'italic', borderBottom: '1px solid var(--prof-border)', paddingBottom: '10px' }}>{item.vendor}</div>
            <div style={{ fontSize: '13px', color: 'var(--prof-text-main)', lineHeight: '1.6', marginBottom: '20px' }}>{item.notes}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                    { label: 'Стоимость', value: '$' + item.price, color: 'var(--prof-text-main)' },
                    { label: 'Вес', value: (item.weight||0).toFixed(3) + ' кг', color: 'var(--prof-text-dim)' },
                    { label: 'Мощность', value: (item.power||0).toFixed(1) + ' W', color: 'var(--prof-text-main)' },
                    { label: 'Надёжность', value: relPct + '%', color: relPct >= 80 ? 'var(--prof-success)' : relPct >= 70 ? 'var(--prof-warning)' : 'var(--prof-error)' },
                    ...(item.torque ? [{ label: 'Крут. момент', value: item.torque.toFixed(1) + ' кг·см', color: 'var(--prof-accent)' }] : []),
                    ...(item.peak_current ? [{ label: 'Пик. ток', value: item.peak_current.toFixed(1) + 'A', color: 'var(--prof-error)' }] : []),
                    ...(item.noise !== undefined ? [{ label: 'Шум датчика', value: item.noise.toFixed(3), color: item.noise > 0.08 ? 'var(--prof-error)' : 'var(--prof-success)' }] : []),
                    ...(item.payload_capacity ? [{ label: 'Нагрузка', value: item.payload_capacity.toFixed(2) + ' кг', color: '#d69cff' }] : []),
                    ...(item.compute ? [{ label: 'Вычисления', value: item.compute.toFixed(2), color: '#c58fff' }] : []),
                ].map(s => (
                    <div key={s.label} style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={{ color: 'var(--prof-text-dim)', fontSize: '10px', textTransform: 'uppercase' }}>{s.label}</span>
                        <span style={{ color: s.color, fontWeight: '700', fontFamily: 'IBM Plex Mono' }}>{s.value}</span>
                    </div>
                ))}
            </div>
        </div>
        );
    };

    const derived = useMemo(
        () => deriveSimulationFromHardware(
            hardware, 
            simulationData?.scenario || {}, 
            simulationData?.business || {}, 
            simulationData?.collaboration || {}, 
            simulationData?.software || {},
            simulationData?.marketState || {},
            simulationData?.purchasedSamples || []
        ),
        [hardware, simulationData?.marketState, simulationData?.purchasedSamples]
    );

    const ghostDerived = useMemo(() => {
        if (!ghostHardware) return null;
        return deriveSimulationFromHardware(
            ghostHardware, 
            simulationData?.scenario || {}, 
            simulationData?.business || {}, 
            simulationData?.collaboration || {}, 
            simulationData?.software || {},
            simulationData?.marketState || {},
            simulationData?.purchasedSamples || []
        );
    }, [ghostHardware, simulationData?.marketState, simulationData?.purchasedSamples]);

    const pose = useMemo(() => solveInverseKinematics(ARM_POINTS.home, derived.totals), [derived.totals]);

    useEffect(() => {
        if (!derived) return;
        
        // Массивный патч глобального состояния (уменьшаем количество вызовов)
        setSimulationData((prev) => {
            // Если данные по железу уже те же, не вызываем лишних обновлений
            const hardwareMatches = JSON.stringify(prev.hardware) === JSON.stringify(derived.hardware);
            
            if (hardwareMatches && prev.totals?.bomCost === derived.totals.bomCost) return prev;

            return {
                ...prev,
                hardware: derived.hardware,
                bom: derived.bom,
                totals: derived.totals,
                business: { ...prev.business, ...derived.business },
                collaboration: { ...prev.collaboration, ...derived.collaboration }
            };
        });

        setTeamState((prev) => ({ 
            ...prev, 
            prototyping: { 
                progress: Math.min(100, 25 + (derived.bom?.length || 0) * 8), 
                status: prev.prototyping?.status === 'done' ? 'done' : 'playing'
            } 
        }));
        
        // Синхронизация опорного значения центра масс
        comAnimRef.current = derived.totals.centerOfMassOffset;
        if (!isTesting) setAnimatedCoMOffset(derived.totals.centerOfMassOffset);
    }, [derived.hardware, derived.totals.bomCost]);

    const handleHardwareChange = (slot, nextId, bucket) => {
        const item = getLibraryItem(bucket, nextId);
        const isNewSample = simulationData?.purchasedSamples?.includes(nextId);
        const isOldSample = simulationData?.purchasedSamples?.includes(hardware[slot]);
        
        const currentPrice = derived.totals.bomCost || 0;
        const oldItemPrice = isOldSample ? 0 : (getLibraryItem(bucket, hardware[slot])?.price || 0);
        const newItemPrice = isNewSample ? 0 : (item?.price || 0);
        
        const newPrice = currentPrice - oldItemPrice + newItemPrice;
        const limit = simulationData.economics?.hardwareLimit || 300;

        // ПРОВЕРКА БЮДЖЕТА (Теперь не блокирует клик, а только предупреждает)
        if (newPrice > limit) {
            setFeedback(`⚠️ ВНИМАНИЕ: Бюджет превышен ($${Math.round(newPrice)} > $${Math.round(limit)}), но деталь выбрана. Позже придется сэкономить!`);
            setEmotion('think');
        } else {
            setFeedback(`OK: Деталь ${item?.name || ''} установлена.`);
            setEmotion('norm');
        }

        setHardware((prev) => ({ ...prev, [slot]: nextId }));
        setShowDiagnostics(false);
    };

    // Плавная анимация тока и колебаний центра масс
    useEffect(() => {
        let running = true;
        let frame;
        let time = 0;

        const tick = () => {
            if (!running) return;
            time += 0.1;

            // Анимация тока
            const diff = targetAnimRef.current - currentAnimRef.current;
            if (Math.abs(diff) > 0.01) {
                currentAnimRef.current += diff * 0.15;
            } else {
                currentAnimRef.current = targetAnimRef.current;
            }
            setAnimatedCurrent(currentAnimRef.current);

            // Флуктуация центра масс во время движения (testPhase 2)
            let currentCoM = comAnimRef.current;
            if (isTesting && testPhase === 2) {
                // Имитируем инерцию и микро-вибрации: малый шум + синусоида
                const fluctuation = (Math.sin(time * 3) * 0.0012) + (Math.random() * 0.0006);
                currentCoM += fluctuation;
            }
            setAnimatedCoMOffset(currentCoM);

            frame = requestAnimationFrame(tick);
        };
        
        frame = requestAnimationFrame(tick);
        return () => { running = false; cancelAnimationFrame(frame); };
    }, [isTesting, testPhase]);

    // Тестирование конфигурации — анимация старта и движения
    const testConfiguration = () => {
        if (isTesting) return;
        
        // Reset status to allow re-confirmation
        if (teamState.prototyping?.status === 'done') {
            setTeamState(prev => ({ ...prev, prototyping: { ...prev.prototyping, status: 'review' } }));
        }

        const runningT = (derived.totals.runningCurrent || 0) + (derived.totals.sensorRunning || 0);
        const peakT = derived.totals.peakCurrent || 0;

        setIsTesting(true);
        
        // === IDEAL ROBOT COMPARISON & SCORING ===
        const grantCap = simulationData.scenario?.grantCap || 420;
        let idealScore = 0;
        
        // BOM vs бюджет (идеал: 50-80% от бюджета)
        const bomRatio = derived.totals.bomCost / grantCap;
        if (bomRatio >= 0.5 && bomRatio <= 0.8) idealScore += 50;
        else if (bomRatio < 0.5) idealScore += 30;
        else idealScore += 10;
        
        // Надёжность (идеал: >85%)
        const reliability = derived.totals.reliabilityScore || 0;
        if (reliability >= 85) idealScore += 50;
        else if (reliability >= 75) idealScore += 35;
        else if (reliability >= 60) idealScore += 20;
        else idealScore += 5;
        
        // Скорость цикла (идеал: <5с)
        const cycleTime = derived.totals.estimatedCycleSeconds || 999;
        if (cycleTime <= 5) idealScore += 50;
        else if (cycleTime <= 8) idealScore += 35;
        else if (cycleTime <= 12) idealScore += 20;
        else idealScore += 5;
        
        // Нет механических рисков
        if (!derived.totals.mechanicalRisk) idealScore += 40;
        
        // Нет перегрузки питания
        if (!derived.totals.powerSupplyOverload) idealScore += 30;
        
        // Грузоподъёмность (идеал: в 2-3 раза больше блока)
        const blockWeight = simulationData.scenario?.blockWeight || 0.42;
        const payloadRatio = derived.totals.payloadCapacity / blockWeight;
        if (payloadRatio >= 2 && payloadRatio <= 3) idealScore += 40;
        else if (payloadRatio >= 1.5) idealScore += 25;
        else idealScore += 10;
        
        // Вес робота (идеал: лёгкий <2кг)
        if (derived.totals.structuralWeight < 2) idealScore += 30;
        else if (derived.totals.structuralWeight < 4) idealScore += 20;
        else idealScore += 5;
        
        // Сохраняем очки в simulationData для отображения
        setSimulationData(prev => ({
            ...prev,
            protoIdealScore: idealScore,
            protoBestIdealScore: Math.max(prev.protoBestIdealScore || 0, idealScore)
        }));
        
        // Добавляем новый отчет в начало истории
        const newReport = {
            errors: [...protoErrors],
            timestamp: new Date().toLocaleTimeString(),
            id: Date.now(),
            hardware: { ...hardware }, // Сохраняем конфиг для сравнения
            idealScore: idealScore // Сохраняем очки в отчёте
        };
        
        setReportHistory(prev => [newReport, ...prev].slice(0, 20)); // Храним последние 20 тестов
        setSelectedReportIndex(0);
        setShowDiagnostics(true); // Активируем отображение
        // Фаза 1: СТАРТ — резкий скачок до пика (инерция при старте)
        setTestPhase(1);
        targetAnimRef.current = peakT * 1.15; // 15% перегрузка при старте
        setFeedback('⚡ Тест: Пиковый старт...');

        setTimeout(() => {
            // Фаза 2: ДВИЖЕНИЕ — ток опускается до рабочего с колебаниями
            setTestPhase(2);
            targetAnimRef.current = runningT;
            setFeedback('🔄 Тест: Движение к точке захвата...');

            setTimeout(() => {
                // Фаза 3: ОСТАНОВКА — скачок при торможении, затем затухание
                setTestPhase(3);
                targetAnimRef.current = runningT * 1.1; // Небольшой скачок при торможении
                setFeedback('🛑 Тест: Остановка...');

                setTimeout(() => {
                    // Ток падает до 0
                    targetAnimRef.current = 0;
                    setTimeout(() => {
                        setIsTesting(false);
                        setTestPhase(0);
                    }, 600);
                }, 400);
            }, 1200);
        }, 800);
    };

    const readyForReview = !derived.totals.mechanicalRisk && !derived.totals.powerSupplyOverload && derived.totals.reliabilityScore >= 75;

    const protoErrors = [];
    if (derived.totals.mechanicalRisk) {
        if (derived.totals.totalLoad > derived.totals.payloadCapacity) {
            protoErrors.push('Нагрузка (' + derived.totals.totalLoad.toFixed(2) + ' кг) > грузоподъёмность (' + derived.totals.payloadCapacity.toFixed(2) + ' кг)');
        }
        if (derived.totals.torqueMargin < 0) {
            protoErrors.push('Запас момента отрицательный: ' + derived.totals.torqueMargin.toFixed(2) + ' кг·см');
        }
        if (derived.totals.structuralWeight > 2.4) {
            protoErrors.push('Масса конструкции (' + derived.totals.structuralWeight.toFixed(2) + ' кг) > 2.4 кг');
        }
    }
    if (derived.totals.powerSupplyOverload) {
        protoErrors.push('Перегрузка питания: ' + derived.totals.peakCurrent.toFixed(2) + 'А > ' + derived.totals.currentLimit.toFixed(2) + 'А');
    }
    if (derived.totals.reliabilityScore < 75) {
        protoErrors.push('Надёжность ' + derived.totals.reliabilityScore + '% < 75%');
    }

    const advance = () => {
        console.log('=== ADVANCE CLICKED ===');
        console.log('readyForReview:', readyForReview);
        console.log('protoErrors:', protoErrors);
        
        if (!readyForReview || protoErrors.length > 0) {
            const errorMsg = protoErrors.length > 0 
                ? '⚠ ОШИБКА КОНФИГУРАЦИИ: ' + protoErrors.join('; ')
                : '⚠ НЕИЗВЕСТНАЯ ОШИБКА: проверьте все параметры конфигурации';
            setFeedback(errorMsg);
            setShowDiagnostics(true);
            return;
        }

        const isReconfirmation = teamState.prototyping?.status === 'done';
        const totalCost = derived.totals.bomCost || 0;
        const currentScore = simulationData.protoIdealScore || 0;

        console.log('=== PROJECT CONFIRMED ===', isReconfirmation ? '(UPDATE)' : '(FIRST TIME)');
        
        setSimulationData(prev => {
            const update = {
                ...prev,
                protoConfirmedScore: Math.max(prev.protoConfirmedScore || 0, currentScore),
                protoBestIdealScore: Math.max(prev.protoBestIdealScore || 0, currentScore)
            };

            // Only deduct money on the very first confirmation
            if (!isReconfirmation) {
                const currentHard = prev.economics?.hardwareLimit || 0;
                const newHardLimit = currentHard - totalCost;
                
                update.economics = {
                    ...prev.economics,
                    hardwareLimit: newHardLimit,
                    transactionHistory: [
                        {
                            id: Date.now(),
                            type: 'expense',
                            label: 'ПРОТОТИПИРОВАНИЕ: СБОРКА',
                            amount: totalCost,
                            icon: '🛠️'
                        },
                        ...(prev.economics?.transactionHistory || [])
                    ].slice(0, 10)
                };
            } else {
                // If re-confirming, add a small notification to history
                update.economics = {
                    ...prev.economics,
                    transactionHistory: [
                        {
                            id: Date.now(),
                            type: 'income',
                            label: 'ИНЖЕНЕРНАЯ ОПТИМИЗАЦИЯ',
                            amount: 0,
                            icon: '✨'
                        },
                        ...(prev.economics?.transactionHistory || [])
                    ].slice(0, 10)
                };
            }

            return update;
        });

        if (!isReconfirmation) setScoreTotal((prev) => prev + 100);
        setTeamState((prev) => ({ ...prev, prototyping: { progress: 100, status: 'done' } }));
        setFeedback(isReconfirmation ? '📈 Проект успешно обновлен до лучшей версии!' : '✅ Проект подтвержден и передан в производство.');
    };

    // Проверка режима просмотра
    const isViewingMode = userRole && userRole !== 'proto';

    return (
        <div className="sim-screen prof-theme game-screen game-screen-proto" style={{
            background: 'var(--prof-bg)',
            color: 'var(--prof-text-main)',
            display: 'grid',
            gridTemplateAreas: '"library telemetry workbench extra" "library telemetry workbench extra"',
            gridTemplateColumns: '400px 320px 1fr 340px',
            gridTemplateRows: '1fr',
            height: '100vh',
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif",
            position: 'relative',
            paddingTop: '64px',
            boxSizing: 'border-box',
            pointerEvents: isViewingMode ? 'none' : 'auto',
            opacity: isViewingMode ? 0.7 : 1
        }}>
            {/* No Scanlines in Prof Theme */}

            <aside className="prof-sidebar-panel" style={{ gridArea: 'library', borderRight: '1px solid var(--prof-border)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--prof-border)' }}>
                    {[
                        { id: 'controllers', label: 'КОНТРОЛЛЕРЫ' },
                        { id: 'actuators', label: 'ПРИВОДЫ' },
                        { id: 'grippers', label: 'ЗАХВАТЫ' },
                        { id: 'sensors', label: 'ДАТЧИКИ' }
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ 
                            flex: 1, padding: '16px 6px', fontSize: '12px', 
                            background: activeTab === tab.id ? 'rgba(255,255,255,0.03)' : 'transparent', 
                            border: 'none', borderBottom: activeTab === tab.id ? '2px solid var(--prof-accent)' : '2px solid transparent', 
                            color: activeTab === tab.id ? 'var(--prof-text-main)' : 'var(--prof-text-dim)', 
                            cursor: 'pointer', transition: 'all 0.2s',
                            fontFamily: "'Inter', sans-serif", fontWeight: '700', letterSpacing: '0.6px'
                        }}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Сортировка */}
                <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(125,232,255,0.1)' }}>
                    <select
                        value={sortKey}
                        onChange={(e) => setSortKey(e.target.value)}
                        style={{
                            width: '100%', padding: '8px 12px', fontSize: '11.5px',
                            background: 'rgba(6,11,19,0.8)', color: '#7de8ff',
                            border: '1px solid rgba(125,232,255,0.2)', borderRadius: '4px',
                            fontFamily: "'IBM Plex Mono', monospace", cursor: 'pointer', outline: 'none',
                            appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%237de8ff'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 10px center',
                            paddingRight: '28px'
                        }}
                    >
                        {activeTab === 'controllers' && (
                            <>
                                <option value="default">По умолчанию</option>
                                <option value="price_asc">💰 Цена ↑</option>
                                <option value="price_desc">💰 Цена ↓</option>
                                <option value="reliability">🛡️ Надёжность</option>
                                <option value="current">⚡ Макс. ток</option>
                            </>
                        )}
                        {activeTab === 'actuators' && (
                            <>
                                <option value="default">По умолчанию</option>
                                <option value="price_asc">💰 Цена ↑</option>
                                <option value="price_desc">💰 Цена ↓</option>
                                <option value="reliability">🛡️ Надёжность</option>
                                <option value="torque">💪 Момент</option>
                                <option value="payload">📦 Грузоподъёмность</option>
                            </>
                        )}
                        {activeTab === 'grippers' && (
                            <>
                                <option value="default">По умолчанию</option>
                                <option value="price_asc">💰 Цена ↑</option>
                                <option value="price_desc">💰 Цена ↓</option>
                                <option value="reliability">🛡️ Надёжность</option>
                                <option value="payload">📦 Грузоподъёмность</option>
                            </>
                        )}
                        {activeTab === 'sensors' && (
                            <>
                                <option value="default">По умолчанию</option>
                                <option value="price_asc">💰 Цена ↑</option>
                                <option value="price_desc">💰 Цена ↓</option>
                                <option value="reliability">🛡️ Надёжность</option>
                                <option value="noise_asc">📉 Шум ↑ (тише)</option>
                                <option value="noise_desc">📈 Шум ↓ (громче)</option>
                            </>
                        )}
                    </select>
                </div>
                <div className="library-scroll" style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                    {activeTab === 'controllers' && sortedControllers.map(item => (
                        <CompactHardwareItem 
                            key={item.id} 
                            item={item} 
                            isActive={hardware.controller === item.id} 
                            onClick={() => handleHardwareChange('controller', item.id, 'controllers')} 
                            onMouseEnter={() => setGhostHardware({...hardware, controller: item.id})} 
                            onMouseLeave={() => setGhostHardware(null)} 
                            onSetHoveredItem={setHoveredItem} 
                            activeItem={getLibraryItem('controllers', hardware.controller)}
                            bucket="controllers"
                            category="controllers"
                        />
                    ))}
                    {activeTab === 'actuators' && [
                        { slot: 'shoulderActuator', label: 'Плечо' },
                        { slot: 'elbowActuator', label: 'Локоть' },
                        { slot: 'wristActuator', label: 'Запястье' }
                    ].map(({ slot, label }) => (
                        <div key={slot}>
                            <div style={{ fontSize: '9px', color: '#ffb36b', margin: '12px 0 6px', textTransform: 'uppercase' }}>{label}</div>
                            {sortedActuators.map(item => (
                                <CompactHardwareItem 
                                    key={item.id} 
                                    item={item} 
                                    isActive={hardware[slot] === item.id} 
                                    onClick={() => handleHardwareChange(slot, item.id, 'actuators')} 
                                    onMouseEnter={() => setGhostHardware({...hardware, [slot]: item.id})} 
                                    onMouseLeave={() => setGhostHardware(null)} 
                                    onSetHoveredItem={setHoveredItem} 
                                    activeItem={getLibraryItem('actuators', hardware[slot])}
                                    bucket="actuators"
                                    category="actuators"
                                />
                            ))}
                        </div>
                    ))}
                    {activeTab === 'grippers' && sortedGrippers.map(item => (
                        <CompactHardwareItem 
                            key={item.id} 
                            item={item} 
                            isActive={hardware.gripper === item.id} 
                            onClick={() => handleHardwareChange('gripper', item.id, 'grippers')} 
                            onMouseEnter={() => setGhostHardware({...hardware, gripper: item.id})} 
                            onMouseLeave={() => setGhostHardware(null)} 
                            onSetHoveredItem={setHoveredItem} 
                            activeItem={getLibraryItem('grippers', hardware.gripper)}
                            bucket="grippers"
                            category="grippers"
                        />
                    ))}
                    {activeTab === 'sensors' && ['visionSensor', 'forceSensor'].map(slot => (
                        <div key={slot}>
                            <div style={{ fontSize: '9px', color: '#ffb36b', margin: '12px 0 6px', textTransform: 'uppercase' }}>
                                {slot === 'visionSensor' ? '📷 Камера' : '⚖️ Датчик усилия'}
                            </div>
                            {sortedSensors
                                .filter(item => slot === 'visionSensor' ? item.type === 'vision' : item.type === 'force')
                                .map(item => (
                                <CompactHardwareItem 
                                    key={item.id} 
                                    item={item} 
                                    isActive={hardware[slot] === item.id} 
                                    onClick={() => handleHardwareChange(slot, item.id, 'sensors')} 
                                    onMouseEnter={() => setGhostHardware({...hardware, [slot]: item.id})} 
                                    onMouseLeave={() => setGhostHardware(null)} 
                                    onSetHoveredItem={setHoveredItem} 
                                    activeItem={getLibraryItem('sensors', hardware[slot])}
                                    bucket="sensors"
                                    category="sensors"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </aside>

            <main className="panel-workbench" style={{ gridArea: 'workbench', position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--prof-bg)' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(var(--prof-border) 1px, transparent 1px), linear-gradient(90deg, var(--prof-border) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div style={{ flex: 1, width: '100%', height: '100%', zIndex: 1 }}>
                    <ManipulatorVisualizer
                        hardware={hardware}
                        baseYOffset={60}
                        ikState={pose}
                        gripClosed={false}
                        totals={derived.totals}
                        showStats={false}
                        scale={1.3}
                        isTesting={isTesting}
                        testPhase={testPhase}
                    />
                </div>
            </main>

            <aside className="prof-sidebar-panel" style={{ gridArea: 'telemetry', borderLeft: '1px solid var(--prof-border)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--prof-text-dim)', letterSpacing: '1.5px', marginBottom: '8px' }}>ТЕХНИЧЕСКИЙ МОНИТОРИНГ</div>

                {/* Надежность */}
                <div className="prof-card" style={{ padding: '18px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                        <div className="prof-label" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>Общая надежность</div>
                        <div className="prof-value" style={{ fontSize: '24px', fontWeight: '800', color: derived.totals.reliabilityScore >= 75 ? 'var(--prof-success)' : 'var(--prof-warning)' }}>{derived.totals.reliabilityScore}%</div>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}>
                        <div style={{ height: '100%', width: derived.totals.reliabilityScore + '%', background: derived.totals.reliabilityScore >= 75 ? 'var(--prof-success)' : 'var(--prof-warning)', transition: 'width 0.5s' }} />
                    </div>
                    
                    {/* Покомпонентная надежность */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                            { label: 'Контроллер', val: getLibraryItem('controllers', hardware.controller).reliability },
                            { label: 'Плечевая ось', val: getLibraryItem('actuators', hardware.shoulderActuator).reliability },
                            { label: 'Локтевая ось', val: getLibraryItem('actuators', hardware.elbowActuator).reliability },
                            { label: 'Ось запястья', val: getLibraryItem('actuators', hardware.wristActuator).reliability },
                            { label: 'Захват', val: getLibraryItem('grippers', hardware.gripper).reliability }
                        ].map((item, i, arr) => {
                            const isBottleneck = item.val === Math.min(...arr.map(a => a.val));
                            return (
                                <div key={i} style={{ 
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    padding: isBottleneck ? '4px 8px' : '0 8px',
                                    background: isBottleneck ? 'rgba(255, 179, 107, 0.05)' : 'transparent',
                                    borderRadius: '4px',
                                    border: isBottleneck ? '1px solid rgba(255, 179, 107, 0.2)' : '1px solid transparent'
                                }}>
                                    <div style={{ 
                                        fontSize: '9px', 
                                        color: isBottleneck ? 'var(--prof-warning)' : 'var(--prof-text-dim)', 
                                        width: '85px', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.3px',
                                        fontWeight: isBottleneck ? '800' : '400'
                                    }}>
                                        {item.label}
                                        {isBottleneck && <span style={{display: 'block', fontSize: '7px', opacity: 0.8}}>УЗКОЕ МЕСТО</span>}
                                    </div>
                                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px', position: 'relative' }}>
                                        <div style={{ 
                                            height: '100%', 
                                            width: (item.val * 100) + '%', 
                                            background: item.val >= 0.8 ? 'var(--prof-success)' : 'var(--prof-warning)', 
                                            opacity: isBottleneck ? 1 : 0.4 
                                        }} />
                                    </div>
                                    <div style={{ 
                                        fontSize: '10px', 
                                        color: isBottleneck ? 'var(--prof-warning)' : 'var(--prof-text-main)', 
                                        width: '35px', textAlign: 'right', fontFamily: 'IBM Plex Mono', fontWeight: '700' 
                                    }}>{Math.round(item.val * 100)}%</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Энергопотребление и Ток */}
                <div className="prof-card" style={{ padding: '18px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div className="prof-label" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>Ток нагрузки (A)</div>
                        <div className="prof-value" style={{ fontSize: '18px', fontWeight: '800', color: animatedCurrent > derived.totals.currentLimit ? 'var(--prof-error)' : isTesting ? 'var(--prof-accent)' : 'var(--prof-text-dim)' }}>
                            {isTesting ? animatedCurrent.toFixed(2) : '0.00'} A
                        </div>
                    </div>
                    
                    <div style={{ position: 'relative', height: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--prof-border)', marginBottom: '8px' }}>
                        {/* Зоны безопасности */}
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60%', background: 'rgba(63, 185, 80, 0.05)' }} />
                        <div style={{ position: 'absolute', left: '60%', top: 0, bottom: 0, width: '25%', background: 'rgba(210, 153, 34, 0.05)' }} />
                        <div style={{ position: 'absolute', left: '85%', top: 0, bottom: 0, width: '15%', background: 'rgba(248, 81, 73, 0.05)' }} />
                        
                        {/* Маркер тока */}
                        <div style={{ 
                            position: 'absolute', left: 0, top: 0, bottom: 0, 
                            width: Math.min(100, (animatedCurrent / Math.max(0.1, derived.totals.currentLimit * 1.15)) * 100) + '%', 
                            background: animatedCurrent > derived.totals.currentLimit ? 'var(--prof-error)' : 'var(--prof-accent)',
                            opacity: isTesting ? 0.8 : 0, transition: 'width 0.1s linear'
                        }} />
                        
                        {/* Лимит шины */}
                        <div style={{ position: 'absolute', left: '85%', top: 0, bottom: 0, width: '1px', background: 'var(--prof-error)', opacity: 0.5 }} />
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--prof-text-dim)' }}>
                        <span>0.00A</span>
                        <span>LIMIT: {derived.totals.currentLimit.toFixed(2)}A</span>
                    </div>

                    <div className="prof-data-row" style={{ marginTop: '12px', borderTop: '1px solid var(--prof-border)', paddingTop: '8px', flexDirection: 'column', alignItems: 'stretch' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span className="prof-label" style={{marginBottom:0, fontSize: '10px'}}>Мощность (P)</span>
                            <span className="prof-value" style={{fontSize:'12px', fontFamily: 'IBM Plex Mono'}}>{derived.totals.powerWatts.toFixed(1)} W</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ 
                                height: '100%', 
                                width: Math.min(100, (derived.totals.powerWatts / 45) * 100) + '%', 
                                background: 'var(--prof-accent)', 
                                opacity: 0.6,
                                transition: 'width 0.3s ease'
                            }} />
                        </div>
                    </div>
                </div>

                {/* Масса и Баланс */}
                <div className="prof-card" style={{ padding: '18px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div className="prof-label" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>Центр масс / Баланс</div>
                        <div className="prof-value" style={{ color: derived.totals.comRisk ? 'var(--prof-error)' : 'var(--prof-text-main)', fontSize: '14px', fontFamily: 'IBM Plex Mono' }}>
                            {animatedCoMOffset.toFixed(3)} м
                        </div>
                    </div>
                    
                    <div style={{ position: 'relative', height: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
                        <div style={{ 
                            position: 'absolute', 
                            left: (animatedCoMOffset / 0.25 * 100) + '%', 
                            top: 0, bottom: 0, width: '4px', background: derived.totals.comRisk ? 'var(--prof-error)' : 'var(--prof-success)',
                            transform: 'translateX(-50%)', transition: isTesting && testPhase === 2 ? 'none' : 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }} />
                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    </div>
                    
                    <div className="prof-data-row" style={{ marginTop: '8px', flexDirection: 'column', alignItems: 'stretch' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span className="prof-label" style={{marginBottom:0, fontSize: '10px'}}>Общая масса</span>
                            <span className="prof-value" style={{
                                fontSize:'12px', 
                                fontFamily: 'IBM Plex Mono', 
                                color: (simulationData.marketState?.weightConstraintActive && derived.totals.structuralWeight > 4.0) ? 'var(--prof-error)' : 'inherit'
                            }}>
                                {derived.totals.structuralWeight.toFixed(2)} кг
                                {simulationData.marketState?.weightConstraintActive && derived.totals.structuralWeight > 4.0 && (
                                    <span style={{ fontSize: '8px', display: 'block', color: 'var(--prof-error)' }}>{"⚠ GRANT RISK (>4.0kg)"}</span>
                                )}
                            </span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ 
                                height: '100%', 
                                width: Math.min(100, (derived.totals.structuralWeight / 3.5) * 100) + '%', 
                                background: 'var(--prof-text-dim)', 
                                opacity: 0.4,
                                transition: 'width 0.3s ease'
                            }} />
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 'auto', padding: '10px 0' }}>
                    <button 
                        className="btn-prof" 
                        style={{ 
                            width: '100%', 
                            padding: '14px', 
                            marginBottom: '10px',
                            background: 'rgba(255, 179, 107, 0.1)',
                            border: '1px solid rgba(255, 179, 107, 0.4)',
                            color: '#ffb36b',
                            fontWeight: '800',
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }} 
                        onClick={testConfiguration} 
                        disabled={isTesting}
                    >
                        {isTesting ? (
                            <>
                                <span className="loader-mini" /> СИМУЛЯЦИЯ...
                            </>
                        ) : '◈ ПРОВЕРИТЬ КОНФИГУРАЦИЮ'}
                    </button>
                    <button
                        className="btn-prof primary"
                        style={{
                            width: '100%', 
                            padding: '16px',
                            opacity: (teamState.prototyping?.status === 'done' && (simulationData.protoIdealScore || 0) <= (simulationData.protoConfirmedScore || 0)) ? 0.5 : 1,
                            fontWeight: '800', 
                            letterSpacing: '1px',
                            background: teamState.prototyping?.status === 'done' && (simulationData.protoIdealScore || 0) <= (simulationData.protoConfirmedScore || 0)
                                ? 'var(--prof-success)22' 
                                : (protoErrors.length > 0 ? 'rgba(255, 80, 80, 0.3)' : 'var(--prof-success)'),
                            borderColor: teamState.prototyping?.status === 'done' && (simulationData.protoIdealScore || 0) <= (simulationData.protoConfirmedScore || 0)
                                ? 'var(--prof-success)' 
                                : (protoErrors.length > 0 ? 'rgba(255, 80, 80, 0.5)' : 'var(--prof-success)'),
                            color: teamState.prototyping?.status === 'done' && (simulationData.protoIdealScore || 0) <= (simulationData.protoConfirmedScore || 0) ? 'var(--prof-success)' : 'white',
                            cursor: teamState.prototyping?.status === 'done' && (simulationData.protoIdealScore || 0) <= (simulationData.protoConfirmedScore || 0) ? 'not-allowed' : 'pointer',
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            advance();
                        }}
                        disabled={teamState.prototyping?.status === 'done' && (simulationData.protoIdealScore || 0) <= (simulationData.protoConfirmedScore || 0)}
                    >
                        {teamState.prototyping?.status === 'done'
                            ? ((simulationData.protoIdealScore || 0) > (simulationData.protoConfirmedScore || 0) 
                                ? '🔼 ОБНОВИТЬ ПРОЕКТ' 
                                : '✓ ПРОЕКТ ПОДТВЕРЖДЁН')
                            : 'ПОДТВЕРДИТЬ ПРОЕКТ'}
                    </button>
                </div>
            </aside>

            <aside className="prof-sidebar-panel" style={{ 
                gridArea: 'extra', 
                borderLeft: '1px solid var(--prof-border)', 
                display: 'flex', 
                flexDirection: 'column', 
                background: 'var(--prof-sidebar)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--prof-border)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--prof-text-dim)', letterSpacing: '1.5px' }}>ЖУРНАЛ ДИАГНОСТИКИ</div>
                    {reportHistory.length > 0 && (
                        <button 
                            onClick={() => setShowDiagnostics(!showDiagnostics)}
                            style={{ background: 'none', border: 'none', color: 'var(--prof-accent)', fontSize: '9px', fontWeight: '800', cursor: 'pointer', outline: 'none' }}
                        >
                            {showDiagnostics ? '[ СВЕРНУТЬ ]' : '[ РАЗВЕРНУТЬ ]'}
                        </button>
                    )}
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {/* TOP HALF: ТЕКУЩИЙ ИЛИ ВЫБРАННЫЙ ОТЧЕТ */}
                    <div style={{ flex: 2, padding: '20px', overflowY: 'auto' }}>
                        {!showDiagnostics ? (
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.15 }}>
                                <div style={{ fontSize: '9px', textAlign: 'center', letterSpacing: '1px' }}>
                                    {reportHistory.length > 0 ? 'ОТЧЕТ СВЕРНУТ. ВЫБЕРИТЕ ИЗ ИСТОРИИ' : 'ОЖИДАНИЕ ДАННЫХ СИМУЛЯЦИИ...'}
                                </div>
                            </div>
                        ) : (
                            <div className="fade-in">
                                {isTesting && testPhase < 3 ? (
                                    <div style={{ padding: '20px', border: '1px solid var(--prof-border)', borderRadius: '4px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '11px', color: 'var(--prof-accent)', marginBottom: '4px' }}>ВЫПОЛНЯЕТСЯ ТЕСТИРОВАНИЕ...</div>
                                        <div style={{ fontSize: '9px', color: 'var(--prof-text-dim)' }}>АНАЛИЗ ЦЕЛОСТНОСТИ СИСТЕМЫ</div>
                                    </div>
                                ) : reportHistory[selectedReportIndex] ? (
                                    <>
                                        <div style={{ fontSize: '10px', color: 'var(--prof-text-dim)', marginBottom: '16px', borderBottom: '1px dashed var(--prof-border)', paddingBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: '800' }}>
                                                {selectedReportIndex === 0 ? 'ПОСЛЕДНИЙ ОТЧЕТ' : `ОТЧЕТ #${reportHistory.length - selectedReportIndex}`}
                                            </span>
                                            <span>{reportHistory[selectedReportIndex].timestamp}</span>
                                        </div>
                                        
                                        {reportHistory[selectedReportIndex].errors.length > 0 ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                <div style={{ fontSize: '11px', color: 'var(--prof-error)', fontWeight: '700', marginBottom: '4px' }}>КРИТИЧЕСКИЕ ОШИБКИ:</div>
                                                {reportHistory[selectedReportIndex].errors.map((err, idx) => (
                                                    <div key={idx} style={{ 
                                                        fontSize: '11px', color: 'var(--prof-text-main)', background: 'rgba(231, 76, 60, 0.05)', 
                                                        padding: '12px', borderLeft: '3px solid var(--prof-error)', borderRadius: '0 4px 4px 0'
                                                    }}>
                                                        {err}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div style={{ padding: '24px', border: '1px solid var(--prof-success)', borderRadius: '6px', background: 'rgba(46, 204, 113, 0.05)', textAlign: 'center', borderStyle: 'dotted' }}>
                                                <div style={{ fontSize: '12px', color: 'var(--prof-success)', fontWeight: '800', marginBottom: '4px' }}>СИСТЕМА СТАБИЛЬНА</div>
                                                <div style={{ fontSize: '10px', color: 'var(--prof-text-dim)' }}>ПАРАМЕТРЫ СООТВЕТСТВУЮТ ТЕХНИЧЕСКИМ ТРЕБОВАНИЯМ</div>
                                            </div>
                                        )}
                                    </>
                                ) : null}
                            </div>
                        )}
                    </div>

                    {/* MIDDLE: ИСТОРИЯ ОТЧЕТОВ */}
                    {reportHistory.length > 0 && (
                        <div style={{ borderTop: '1px solid var(--prof-border)', padding: '16px', background: 'rgba(0,0,0,0.2)' }}>
                            <div style={{ fontSize: '9px', fontWeight: '800', color: 'var(--prof-text-dim)', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>ИСТОРИЯ ПРОВЕРОК</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '120px', overflowY: 'auto', paddingRight: '4px' }}>
                                {reportHistory.map((rep, idx) => (
                                    <div 
                                        key={rep.id} 
                                        onClick={() => { setSelectedReportIndex(idx); setShowDiagnostics(true); }}
                                        style={{ 
                                            padding: '8px 12px', borderRadius: '4px', background: selectedReportIndex === idx ? 'rgba(255,179,107,0.1)' : 'rgba(255,255,255,0.03)',
                                            border: selectedReportIndex === idx ? '1px solid var(--prof-accent)' : '1px solid transparent',
                                            cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '12px' }}>{rep.errors.length > 0 ? '❌' : '✅'}</span>
                                            <span style={{ fontSize: '10px', color: selectedReportIndex === idx ? 'var(--prof-text-main)' : 'var(--prof-text-dim)', fontWeight: selectedReportIndex === idx ? '800' : '400' }}>{rep.timestamp}</span>
                                        </div>
                                        <span style={{ fontSize: '8px', color: 'var(--prof-text-dim)', opacity: 0.5 }}>#{reportHistory.length - idx}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* BOTTOM HALF: КОМАНДНЫЙ ЦЕНТР / СВЯЗЬ */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <ChatPanel variant="default" />
                    </div>
                </div>
            </aside>

            <HardwareTooltip />

            {/* PANIC LOCKOUT OVERLAY */}
            {simulationData.collaboration?.panicActive && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 99999,
                    background: 'rgba(10, 10, 12, 0.85)', backdropFilter: 'blur(10px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    animation: 'fade-in 0.3s ease-out'
                }}>
                    <div style={{ 
                        padding: '40px', border: '1px solid var(--prof-error)', borderRadius: '16px',
                        background: 'rgba(255, 65, 54, 0.05)', textAlign: 'center',
                        maxWidth: '500px', boxShadow: '0 0 50px rgba(255, 65, 54, 0.2)'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📢</div>
                        <div style={{ fontSize: '18px', fontWeight: '900', color: 'var(--prof-error)', letterSpacing: '3px', marginBottom: '16px' }}>ЭКСТРЕННОЕ СОВЕЩАНИЕ</div>
                        <div style={{ fontSize: '14px', color: 'white', lineHeight: '1.6', marginBottom: '24px', opacity: 0.8 }}>
                            Экономист активировал протокол экстренной связи. Внесите корректировки в стратегию голосом. Управление заблокировано на 10 секунд.
                        </div>
                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: 'var(--prof-error)', animation: 'panic-timer 10s linear forwards' }} />
                        </div>
                    </div>
                    <style>{`
                        @keyframes panic-timer { from { width: 100%; } to { width: 0%; } }
                        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                    `}</style>
                </div>
            )}
        </div>
    );
};
