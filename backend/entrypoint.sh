#!/bin/sh
set -e # Exit immediately if a command fails

echo "Starting container setup..."

# 1. Ensure storage permissions
mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/oauth
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# 2. Wait for Database (Important for Railway)
# This prevents the 500 error caused by the app starting before the DB is ready
echo "Waiting for database connection..."
until php artisan db:monitor; do
  echo "Database not ready - waiting..."
  sleep 2
done

# 3. Run Migrations & Seeders
# We check if migrations have ever run by looking at the migrations table
echo "Checking migration status..."
if ! php artisan migrate:status > /dev/null 2>&1; then
    echo "First time setup: Running migrations and seeders..."
    php artisan migrate --force
    php artisan db:seed --force
else
    echo "Database already exists. Running pending migrations..."
    php artisan migrate --force
fi

# 4. Laravel Passport Setup
if [ ! -f storage/oauth/private.key ]; then
    echo "Generating Passport keys..."
    php artisan passport:keys --force
    # Only run install if you need the DB clients created too
    php artisan passport:install --force
fi
chmod 644 storage/oauth/*.key
chown www-data:www-data storage/oauth/*.key

# 5. Start Services
echo "Starting PHP-FPM..."
php-fpm -D

echo "Starting Nginx..."
# We use 'daemon off' so the container stays alive
nginx -g 'daemon off;'
