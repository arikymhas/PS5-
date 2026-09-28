# PlayStation Club — бронирование игровых зон

Веб-приложение на Vanilla JS + Firebase Authentication + Cloud Firestore.

## Структура
- `index.html` — каталог игровых зон, поиск, фильтры, сортировка, pagination и realtime.
- `zone.html` — детали зоны и бронирование.
- `login.html` — регистрация, вход, восстановление пароля.
- `bookings.html` — активные бронирования и история.
- `profile.html` — профиль пользователя.
- `admin.html` — CRUD зон, просмотр/изменение статусов бронирований, role guard.
- `firestore.rules` — правила доступа user/admin.
- `firestore.indexes.json` — индексы.

## Firebase
1. Создайте Firebase Web App.
2. Включите Authentication → Email/Password.
3. Создайте Cloud Firestore.
4. Вставьте Web config в `js/firebase.js`.
5. Создайте первого пользователя через `login.html` и вручную задайте ему `role: "admin"` в документе `users/{uid}`.
6. Загрузите правила и индексы.

## Deploy GitHub Pages
Репозиторий содержит GitHub Actions workflow `.github/workflows/pages.yml`. В Settings → Pages выберите GitHub Actions как Source. После push в `main` сайт публикуется автоматически.

## Demo fallback
Без Firebase каталог использует встроенные демонстрационные данные, чтобы интерфейс можно было открыть даже до настройки облачного проекта. Все реальные операции Auth/Firestore активируются после вставки Web config.
