// ============================================================
// VORONIA PREMIUM — ФАЙЛ ДАННЫХ КОДОВ (секретная часть поставки)
// НЕ входить в публичную сборку: игра без этого файла работает,
// премиум-коды отключены с вежливым сообщением.
// Продаваемая/серверная копия получает этот файл рядом с HTML.
// КУДА КЛАСТЬ: папка premium/ рядом с Voronia_v0.0.3.html (игра ищет сначала
// premium/codes.js, затем codes.js прямо рядом с HTML — оба варианта рабочие).
// ============================================================
window.VORONIA_PREMIUM = {
    version: 1,
    salt: ':v1:exocore',   // ⚠️ НЕ МЕНЯТЬ после первой выдачи кодов
    hashes: {
        '2461a12ff4a7107b2e486e422fac121021d238b24bc6504745a40fd39fe52e05': 'dispatcher:7',   // тестовый EXO-DEMO-DISP-0007
        '3d5b6a1a1194cce64eb96fc5b35feeebdb7cf70f18151c9924b3fd5d4ceca6ef': 'autoScan:30',
        'd3650164ea1a1ccd46ee9fd8449cb3a539cd8d327e37fffd50a36f3e83c584dd': 'autoScan:30',
        'fc0eede6a8e0c62510051d066308ba9e04b55a04d6ab22f1c9458b68c0c82ac4': 'autoScan:30',
        'a294aef41a92c54413450349c4d904e37787e485e55398cf41feecf417c311fe': 'autoUpgrade:30',
        '7292c5dab30db654c67afab55c54845e9be66bb055f5ff04c5d5cfb199e72353': 'autoUpgrade:30',
        'ea8ca301af3a445ed49861fb99d02c66e243064e4aa647f7bb9a5ae46e68f6db': 'autoTransport:30',
        '18b048674b8f18e553377165436f3939f1ad44e48b03372066fc3be9faf60ec8': 'autoTransport:30',
        '9c304e22de37d3edaf24695507c2f4a32f164fcacc8aeaddae4e437ee23a1d34': 'vip:30',
        '7749a76048f36bf189470213cb0bb4aa4b140b76c9f5815e3ce93eb30252d950': 'vip:30',
    },
    // feature: autoScan | autoUpgrade | autoTransport | dispatcher | vip(=всё, включая диспетчер)
    // ТЕСТОВЫЙ код для проверки подключения (диспетчер, 7 дней): EXO-DEMO-DISP-0007
    // Работает и по file:// (двойной клик), и через http://localhost — SHA-256 считается в игре.
    // V0.0.3-hotfix: hashesFnv больше не нужен — игра считает SHA-256 встроенной
    // реализацией даже по file://. FNV-32 оставлял дыру (подбор коллизий).
    hashesFnv: {},
    remote: null,     // URL json с актуальными хэшами (только http-режим): {'hashes':{...}}
    verifyUrl: null   // PRODUCTION: URL серверной верификации POST {code} → {ok,grant}
};
