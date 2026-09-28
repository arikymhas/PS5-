# Быстрая настройка

### 1. Firebase
- Firebase Console → Add project → Web app.
- Authentication → Sign-in method → Email/Password.
- Firestore Database → Create database.
- Project Settings → Your apps → Config → скопируйте объект в `js/firebase.js`.

### 2. Правила
В Firestore Rules вставьте содержимое `firestore.rules`.

### 3. Индексы
Можно импортировать `firestore.indexes.json` через Firebase CLI:
`firebase deploy --only firestore:indexes`

### 4. Admin
Зарегистрируйтесь в приложении. В Firestore откройте `users/<UID>` и поменяйте `role` на `admin`.

### 5. GitHub Pages
Загрузите репозиторий и включите Settings → Pages → Source: GitHub Actions.
