
## Тестовое

NestJS + GraphQL + TypeORM + MySQL + Docker

### Описание

- Реализовано получение всех цветов с возможностью пагинации и поиск по всем цветам сразу
- Реализован поиск по конкретному имени цвета (который нужен для задания) и возвращает только 1 цвет
- Реализовано создание цвета
- Реализовано обновление цвета
- Реализовано удаление цвета

Потыкать можно через Postman
- https://gxgp-wo94-chsd.gw-1a.dockhost.net/graphql

### Локальный запуск

- Установить зависимости
- Создать `.env` файл
- Запустить `docker-compose up -d --build`
- Запустить `yarn run start:dev` или `yarn run dev`
- Локально доступно по адресу http://localhost:3000/graphql

### Тесты

- `yarn run test`
- `yarn run test:e2e`