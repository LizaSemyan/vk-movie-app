# Movie App

SPA приложение для просмотра информации о фильмах, использующее открытое API [ПоискКино API](https://poiskkino.dev).

## Ссылки на проект

**Live-demo:** [https://vk-movie-app-omega.vercel.app](https://vk-movie-app-omega.vercel.app)

**GitHub repository:** [https://github.com/LizaSemyan/vk-movie-app](https://github.com/LizaSemyan/vk-movie-app)

## Технологический стек

Используемые технологии:

- React
- TypeScript
- Vite
- React Router
- Axios
- TanStack Query
- Material UI Kit

## Функционал

В приложении реализованы следующие возможности:

- Просмотр списка фильмов с возможностью фильтрации и бесконечным скроллом
- Просмотр информации о фильме
- Добавление фильмов в избранное (с сохранением в localStorage)
- Сравнение двух фильмов

## Запуск проекта

### 1. Клонировать репозиторий

```bash
git clone https://github.com/LizaSemyan/vk-movie-app.git
cd vk-movie-app
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Запустить проект

```bash
npm run dev
```

После запуска приложение будет доступно по адресу:

```
http://localhost:5173
```

## Переменные окружения

Для работы с API необходимо создать файл `.env` в корне проекта. Пример есть в файле .env.default

Пример содержимого:

```
VITE_API_URL=https://api.poiskkino.dev
VITE_API_KEY=YOUR_API_KEY
```

Для получения ключа перейдите на сайт [ПоискКино API](https://poiskkino.dev) и следуйте инструкции
