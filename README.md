# Resto Waves APP

### Проєкт був створений з використанням таких технологій:

- Nest.js - вибрав його, бо він економить час на написанні рутинного коду + його модульна архітектура дуже спрощує розробку
- Postgres + TypeOrm - практично однаковий з Sequelize, але я просто більше звик до TypeOrm і документація як на мене, більш зручна (наприклад більш очевидно працювати з relations)
- [Google Spreadsheet](https://www.npmjs.com/package/google-spreadsheet)
- Swagger для документації - [Nest OpenAPI](https://docs.nestjs.com/openapi/introduction)

## Допоміжні концепції

- Фільтри (filters/exception.filter) - для фільтрування помилок валідації від усіх інших
- Хелпери (helpers) - для консистетних response
- Pipes (pipes/validation.pipe) - створив зручну для себе структуру об'єкта з помилками валідації

## Модулі

- brands i models працюють абсолютно однаково, можна створити як по відповідним ендпоінтам так і автоматично під час створення продукту
- categories треба створювати окремо від продукту, існують відповідні ендпоінти для мінімального керування категоріями
- products - є відповідні ендпоінти для оновлення моделей, брендів і категорій і такж для мінімального керування продуктами, такі як створення, оновлення, видалення
- google-sheets - модуль який раз на годину читає гугл таблицю і оновлює базу згідно з вмістом цієї таблиці, для автоматичних запитів використав [Task Scheduling](https://docs.nestjs.com/techniques/task-scheduling), який заснований на cron.
- 
## .env файл

```bash
PORT=

POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USERNAME=
POSTGRES_PASSWORD=
POSTGRES_DB=

GOOGLE_PRIVATE_KEY=
GOOGLE_SERVICE_EMAIL=
```

## Інсталяція проєкту

```bash
$ npm install
```

## Запуск проєкту

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### [Посилання на документації для перевірки ендпоінтів](http://localhost:5001/docs)
