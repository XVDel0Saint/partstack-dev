#!/bin/sh
# Exit on any error
set -e

echo "Starting container..."

# 1. Fix Permissions (Crucial for Passport and Cache)
mkdir -p storage/oauth storage/framework/sessions storage/framework/views storage/framework/cache
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# 2. WAIT FOR DATABASE (The missing piece)
# This prevents the 500 error during the 'tinker' check
echo "Waiting for database to be ready..."
until php artisan db:monitor > /dev/null 2>&1; do
  echo "Database is unavailable - sleeping..."
  sleep 2
done

# 3. Your Seeder Logic (Improved)
# We use migrate:status to check if the migrations table even exists
echo "Checking if database needs seeding..."
TABLE_EXISTS=$(php artisan tinker --execute "echo Schema::hasTable('users') ? '1' : '0';")

if [ "$TABLE_EXISTS" = "0" ]; then
    echo "No users table found. Running migrations and seeders..."
    php artisan migrate --force
    php artisan db:seed --force
else
    echo "Database already has tables. Running any pending migrations..."
    php artisan migrate --force
fi

# 4. Your Passport Logic
if [ ! -f storage/oauth/private.key ] || [ ! -f storage/oauth/public.key ]; then
    echo "Installing Laravel Passport..."
    php artisan passport:install --force --no-interaction
else
    echo "Passport keys already present."
fi

# Ensure keys are readable by the web server
chmod 600 storage/oauth/*.key
chown www-data:www-data storage/oauth/*.key

# 5. Start Services
echo "Starting PHP-FPM and Nginx..."
php-fpm -D
nginx -g 'daemon off;'
