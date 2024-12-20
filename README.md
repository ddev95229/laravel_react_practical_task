Please follow the instructions for setting up this project:

### SYSTEM_SPECS:
> node version: v18.17.0

> apache version: Apache httpd-2.4.62

> posgressql version: 17.2.3

> php version: 8.2.25

BACKEND SETUP:

make sure to update these env in the laravel .env file
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=react_laravel
DB_USERNAME=postgres
DB_PASSWORD=

APP_URL=http://localhost <--- YOUR BACKEND SERVICE URL
FRONTEND_URL=http://localhost:5173 <--- YOUR FRONTEND SERVICE URL

```

```
cd my-laravel-app
```

```
composer install
```

```
php artisan migrate --seed
```

```
php artisan key:generate
```

```
php artisan serve --host=localhost --port=8000
```

FRONTEND SETUP:

make sure to add the below env in the react .env file 
VITE_API_BASE_URL=http://localhost:8000

```
cd react
```

```
npm install
```

```
npm run dev
```