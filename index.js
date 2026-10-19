/**
 * ЗАДАНИЕ: билет в парк аттракционов
 *
 * Реализуйте calculateTicketPrice без циклов, forEach, map и reduce.
 * Используйте переменные, арифметику, if / else или switch.
 *
 * Входные данные:
 *   basePrice      — базовая стоимость билета в рублях;
 *   age            — возраст посетителя в полных годах;
 *   height         — рост посетителя в сантиметрах;
 *   attractionType — "детский", "семейный" или "экстремальный";
 *   isWeekend      — посещение в выходной день;
 *   isEvening      — посещение вечером;
 *   hasStudentCard — есть ли студенческий билет.
 *
 * 1. Проверьте допуск к аттракциону:
 *
 *    Тип              Минимальный возраст   Минимальный рост
 *    "детский"        0 лет                 80 см
 *    "семейный"       8 лет                 120 см
 *    "экстремальный"  16 лет                150 см
 *
 *    Должны выполняться ОБА ограничения. Ровно минимальное значение
 *    подходит. Если возраст ИЛИ рост недостаточен, верните null.
 *
 * 2. Рассчитайте стоимость для допущенного посетителя:
 *    — в выходной добавьте 20% ОТ БАЗОВОЙ стоимости;
 *    — вечером добавьте 10% ОТ БАЗОВОЙ стоимости;
 *    — если выполнены оба условия, добавьте обе наценки: всего 30%;
 *    — затем примените скидку 15% по студенческому билету;
 *    — затем примените скидку 50% для детей МЛАДШЕ 12 лет.
 *
 *    Скидки применяются последовательно. Если у ребёнка есть
 *    студенческий билет, применяются обе скидки.
 *
 * 3. Верните число. Округляйте только окончательный результат
 *    до двух знаков после запятой: Math.round(price * 100) / 100.
 *
 * Пример: ребёнку 10 лет, рост 125 см, семейный аттракцион,
 * базовая цена 500, выходной, вечер и студенческий билет:
 * (500 + 100 + 50) * 0.85 * 0.5 = 276.25 рубля.
 *
 * Все входные данные корректны: возраст — целое неотрицательное число,
 * рост и цена — неотрицательные числа, флаги — boolean,
 * тип аттракциона — одно из трёх перечисленных значений.
 * Проверка формата входных данных не требуется.
 *
 * Запуск: node index.js
 * Меняйте только функцию ниже. Изначально тесты падают — это ожидаемо.
 */

function calculateTicketPrice({
  basePrice,
  age,
  height,
  attractionType,
  isWeekend,
  isEvening,
  hasStudentCard,
}) {
  let minAge;
  let minHeight;

  if (attractionType == "детский") {
    minAge = 0;
    minHeight = 80
  } 
  else if (attractionType == "семейный") {
    minAge = 8;
    minHeight = 120
  } 
  else if (attractionType == "экстремальный") {
    minAge = 16;
    minHeight = 150
  }
  else {
    return null;
  }
  if (age < minAge || height < minHeight) {
  }

  let price = basePrice;

  if (isWeekend) {
    price = price + basePrice * 0.2;
  }
  if (isEvening) {
    price = price + basePrice * 0.1
  }
  if (isWeekend && isEvening){
    price = price + basePrice * 0.3
  }

  if (hasStudentCard) {
    price = price * 0.85;
  }
    if (age < 12){
      price = price * 0.5
    }
    return Math.round(price * 100) / 100;
  }

// ==================== ТЕСТЫ: НЕ ИЗМЕНЯТЬ ====================
// Тесты встроены в этот файл, внешние библиотеки не нужны.
// Циклов в тестах тоже нет.

let passed = 0;
let failed = 0;

function runTest(input, expected) {
  const name = `${input.attractionType}, возраст ${input.age}, рост ${input.height} см, `
    + `цена ${input.basePrice}, выходной=${input.isWeekend}, `
    + `вечер=${input.isEvening}, студент=${input.hasStudentCard}`;

  try {
    const actual = calculateTicketPrice(input);

    if (Object.is(actual, expected)) {
      passed += 1;
      //console.log(`✅ ${name}`);
    } else {
      failed += 1;
      console.error(`❌ ${name}`);
      console.error(`   Ожидалось: ${expected}; получено: ${String(actual)}`);
    }
  } catch (error) {
    failed += 1;
    console.error(`❌ ${name}`);
    console.error(`   Функция выбросила ошибку: ${String(error)}`);
  }
}
// Для каждого сочетания возраста и роста проверяем все 8 вариантов флагов.
// Порядок ожидаемых ответов:
// [будний день, будний день + студент,
//  будний вечер, будний вечер + студент,
//  выходной день, выходной день + студент,
//  выходной вечер, выходной вечер + студент].
function checkAllOptions(attractionType, age, height, expected, basePrice = 500) {
  const input = { basePrice, age, height, attractionType };

  runTest({ ...input, isWeekend: false, isEvening: false, hasStudentCard: false }, expected[0]);
  runTest({ ...input, isWeekend: false, isEvening: false, hasStudentCard: true }, expected[1]);
  runTest({ ...input, isWeekend: false, isEvening: true, hasStudentCard: false }, expected[2]);
  runTest({ ...input, isWeekend: false, isEvening: true, hasStudentCard: true }, expected[3]);
  runTest({ ...input, isWeekend: true, isEvening: false, hasStudentCard: false }, expected[4]);
  runTest({ ...input, isWeekend: true, isEvening: false, hasStudentCard: true }, expected[5]);
  runTest({ ...input, isWeekend: true, isEvening: true, hasStudentCard: false }, expected[6]);
  runTest({ ...input, isWeekend: true, isEvening: true, hasStudentCard: true }, expected[7]);
}

// Готовые ожидаемые ответы. Здесь нет вычисления по алгоритму студента.
const denied = [null, null, null, null, null, null, null, null];
const child = [250, 212.5, 275, 233.75, 300, 255, 325, 276.25];
const regular = [500, 425, 550, 467.5, 600, 510, 650, 552.5];

console.log("\nПроверка билетов в парк аттракционов\n");

// Детский: минимальный возраст 0, рост ниже / ровно / выше 80 см.
checkAllOptions("детский", 0, 79, denied);
checkAllOptions("детский", 0, 80, child);
checkAllOptions("детский", 0, 81, child);
checkAllOptions("детский", 1, 79, denied);
checkAllOptions("детский", 1, 80, child);
checkAllOptions("детский", 1, 81, child);

// Семейный: все 9 сочетаний возраста и роста около границ 8 лет / 120 см.
checkAllOptions("семейный", 7, 119, denied);
checkAllOptions("семейный", 7, 120, denied);
checkAllOptions("семейный", 7, 121, denied);
checkAllOptions("семейный", 8, 119, denied);
checkAllOptions("семейный", 8, 120, child);
checkAllOptions("семейный", 8, 121, child);
checkAllOptions("семейный", 9, 119, denied);
checkAllOptions("семейный", 9, 120, child);
checkAllOptions("семейный", 9, 121, child);

// Экстремальный: все 9 сочетаний около границ 16 лет / 150 см.
checkAllOptions("экстремальный", 15, 149, denied);
checkAllOptions("экстремальный", 15, 150, denied);
checkAllOptions("экстремальный", 15, 151, denied);
checkAllOptions("экстремальный", 16, 149, denied);
checkAllOptions("экстремальный", 16, 150, regular);
checkAllOptions("экстремальный", 16, 151, regular);
checkAllOptions("экстремальный", 17, 149, denied);
checkAllOptions("экстремальный", 17, 150, regular);
checkAllOptions("экстремальный", 17, 151, regular);

// Граница детской скидки: в 11 лет действует, в 12 лет уже нет.
checkAllOptions("детский", 11, 200, child);
checkAllOptions("детский", 12, 200, regular);
checkAllOptions("семейный", 11, 200, child);
checkAllOptions("семейный", 12, 200, regular);

// Нулевой рост не даёт допуска даже взрослому.
checkAllOptions("детский", 18, 0, denied);
checkAllOptions("семейный", 18, 0, denied);
checkAllOptions("экстремальный", 18, 0, denied);

// Верхнего ограничения роста и возраста в задании нет.
checkAllOptions("детский", 65, 250, regular);
checkAllOptions("семейный", 65, 250, regular);
checkAllOptions("экстремальный", 65, 250, regular);

// Рост может быть дробным: почти достаточно всё ещё означает отказ.
checkAllOptions("детский", 18, 79.9, denied);
checkAllOptions("семейный", 18, 119.9, denied);
checkAllOptions("экстремальный", 18, 149.9, denied);

// Другие базовые цены: нельзя подставлять 500 прямо в решение.
checkAllOptions("экстремальный", 18, 180,
  [1000, 850, 1100, 935, 1200, 1020, 1300, 1105], 1000);
checkAllOptions("семейный", 10, 125,
  [500, 425, 550, 467.5, 600, 510, 650, 552.5], 1000);

// Округление после всех наценок и скидок.
checkAllOptions("семейный", 10, 125,
  [166.5, 141.53, 183.15, 155.68, 199.8, 169.83, 216.45, 183.98], 333);
checkAllOptions("экстремальный", 18, 180,
  [333, 283.05, 366.3, 311.36, 399.6, 339.66, 432.9, 367.97], 333);

// Бесплатный билет: результат 0, если допуск есть, иначе null.
checkAllOptions("детский", 10, 100, [0, 0, 0, 0, 0, 0, 0, 0], 0);
checkAllOptions("семейный", 7, 180, denied, 0);
checkAllOptions("экстремальный", 18, 149, denied, 0);

console.log(`\nВсего: ${passed + failed}. Пройдено: ${passed}. Провалено: ${failed}.`);

if (failed > 0) {
  console.log("Исправьте calculateTicketPrice и снова запустите: node index.js\n");
  process.exitCode = 1;
} else {
  console.log("Все тесты пройдены!\n");
}
