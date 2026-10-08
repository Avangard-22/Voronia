/* Voronia · js/balance.js — НЕОБЯЗАТЕЛЬНЫЙ файл переопределения баланса.
 *
 * Грузится ДО основного бандла (см. <script src=js/balance.js> в HTML), поэтому
 * всё, что вы здесь измените, игра подхватит как эталон. Если файла нет рядом
 * с HTML — ничего не происходит (window.__VORONIA_BALANCE_OVERRIDE_MISS=1).
 *
 * Зачем: A/B-тесты баланса без пересборки игры. Пример — сделать Хранителя
 * вдвое быстрее и снизить цену Ядра грани:
 *
 *   window.VORONIA_BALANCE.boss.timeLimitMs = 15000;
 *   window.VORONIA_BALANCE.core.buildCost = { crystals: 120, energy: 25000 };
 *
 * Правила:
 *  1. Меняйте только существующие пути (список: __ccDebug.balanceExport()
 *     в режиме разработчика, либо страница справки «БАЛАНС» в игре).
 *  2. Объекты задавайте целиком — они клонируются при инициализации.
 *  3. После старта игры реестр замораживается: правки в консоли не сработают.
 *  4. Значения должны оставаться числами: NaN уедет прямо в экономику.
 */
(function () {
  var B = window.VORONIA_BALANCE;
  if (!B) return;
  /* Пример (раскомментируйте, чтобы проверить механизм):
  B.boss.timeLimitMs = 20000;
  B.charge.config = {
    1: { basePct: .04, baseDur: 22, cd: 40, label: 'Богатая', science: 6, sciencePct: .06 },
    2: { basePct: .10, baseDur: 28, cd: 80, label: 'Редкая', science: 18, sciencePct: .18 }
  };
  */
  window.__VORONIA_BALANCE_OVERRIDE_OK = 1;
})();
