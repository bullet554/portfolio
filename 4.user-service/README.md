# User Service — Backend API

## О проекте
Backend-сервис для управления пользователями.

Реализована регистрация и авторизация пользователей, получение данных, управление ролями и блокировка пользователей. Взаимодействие с PostgreSQL (Supabase) на уровне backend.

Проект выполнен как отдельный backend-сервис с акцентом на архитектуру, работу с базой данных и реализацию логики доступа.

---

## Технологический стек
* **Node.js**
* **Express.js**
* **TypeScript**
* **REST API**
* **PostgreSQL (Supabase)**
* **JWT-аутентификация**
* **bcrypt (хеширование паролей)**
* **zod (валидация)**

---

## Реализованный функционал
* **Аутентификация:**
    * Регистрация пользователя
    * Авторизация по email и password
    * Генерация JWT-токена
    * Проверка авторизации через middleware
* **Пользователи:**
    * Получение пользователя по ID
    * Получение списка пользователей (только для admin)
    * Блокировка пользователя
    * Проверка активности пользователя при входе
* **Доступ и роли:**
    * Роли `admin` и `user`
    * Ограничение доступа к данным
    * Проверка прав на уровне backend
* **Обработка данных:**
    * Валидация входных данных через zod
    * Централизованная обработка ошибок на сервере
    * Хеширование паролей (bcrypt)

---

## Архитектурные решения
* Выделение middleware (auth, validation, error handling)
* Централизованная обработка ошибок через error middleware
* Работа с БД через SQL-запросы (pg)
* Использование JWT для авторизации
* Разделение логики доступа на уровне сервисов

---

## Структура проекта
```
src/
├── app.ts
├── server.ts
├── config/
├── controllers/
├── lib/
├── middlewares/
├── routes/
├── services/
├── types/
├── utils/
└── validators/
```

---

## API

* **Auth**
    * POST `/api/auth/register`
    * POST `/api/auth/login`

* **Users**
    * GET `/api/users/:id`
    * GET `/api/users` (только admin)
    * PATCH `/api/users/:id/block`

---

## Структура базы данных
* **User**
    * id (UUID)
    * fullName
    * birthDate
    * email (unique)
    * password
    * role (admin / user)
    * isActive
    * createdAt
    * updatedAt

---

## Установка и запуск
```
npm install
npm run dev
```

Сервер:<br>
http://localhost:5001

---

## Возможные улучшения
* Реализация refresh-токенов
* Добавление логирования
* Docker-конфигурация
* Расширение системы ролей и прав доступа

---

## Автор
Илья Карпов<br>
Junior Fullstack Developer (React, Node.js)

## Контакты
Email: ilya.karpov.93@mail.ru<br>
GitHub: https://github.com/bullet554<br>
Phone: +79372382299 (WhatsApp, Telegram, Max)