export const formatDate = (
  value?: string | null,
  locale: string = "ru-RU",
): string => {
  if (!value) {
    return "Дата неизвестна";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(locale);
};
