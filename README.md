# Map Comment

Application pour placer des lieux sur une carte puis les commenter, les noter, etc.

## Installation

Créer le .env

```bash
touch config/.env
```

Dans le .env
```bash
PORT=5000
TOKEN_SECRET=test
```

Installation des dépendances JavaScript avec [npm](https://www.npmjs.com/)

```bash
npm i
```

Base de données

```bash
knex migrate:latest
```

Pour démarrer:
```bash
npm start
```

## Base de données

Juste pour rappel, à ne pas faire pour installation

```bash
knex init
```

```bash
knex migrate:make migration_name 
```

```bash
knex migrate:latest
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
Voir dans package.json
[MIT](https://choosealicense.com/licenses/mit/)