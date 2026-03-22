export const mockAnkf = {
  id: "ankf:v1:G7F9J2KM",
  type: "Цифровой контроль АНКФ",
  productName: "Задвижка клиновая литая ЗКЛ-2",
  manufacturer: "ООО «УЗСА»",
  gost: "ГОСТ 5762-2002",
  guarantee: "24 месяца",
  status: "Подтверждено / Оригинал",
  documents: ["Сертификат соответствия.pdf", "Паспорт изделия.pdf"],
} as const;

export const mockLahta = {
  id: "LHT-SKLAD-9982",
  type: "Лахта Склад - Система МТО",
  productName: "Задвижка клиновая (учетная единица)",
  location: "Стеллаж B, Полка 4, Ячейка 12",
  stockCount: 15,
  unit: "шт.",
  warehouseStatus: "В наличии / Доступно к выдаче",
  responsible: "Иванов И.И.",
} as const;