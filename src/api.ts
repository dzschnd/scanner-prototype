export async function fetchData(id: string) {
  const res = await fetch(
    `https://scanner-prototype-backend.onrender.com/api/data/${id}`,
    {
      headers: {
        Authorization: "Bearer my-secret-token",
      },
    }
  );

  if (res.ok) {
    return res.json();
  }

  let errorMessage = "Неизвестная ошибка";

  try {
    const errorData = await res.json();
    errorMessage = errorData.message || errorMessage;
  } catch {
    // Если не удалось прочитать тело, оставляем пустое сообщение
  }

  switch (res.status) {
    case 400:
      throw new Error(`400 Неверный запрос: ${errorMessage}`);

    case 401:
      throw new Error(`401 Нет авторизации: ${errorMessage}`);

    case 403:
      throw new Error(`403 Доступ запрещён: ${errorMessage}`);

    case 404:
      throw new Error(`404 Данные не найдены: ${errorMessage}`);

    case 500:
      throw new Error(`500 Ошибка сервера: ${errorMessage}`);

    default:
      throw new Error(`Ошибка ${res.status}: ${errorMessage}`);
  }
}