#!/bin/sh

echo "Starting container..."

# Run migrations + seeders if DB is empty
TABLE_CHECK=$(php artisan tinker --execute "echo Schema::hasTable('users') ? '1' : '0';")

if [ "$TABLE_CHECK" = "0" ]; then
    echo "Running migrations..."
    php artisan migrate --force
    echo "Running seeders..."
    php artisan db:seed --class=DatabaseSeeder
else
    echo "Migrations already applied, skipping."
fi

# Generate Passport keys if missing
if [ ! -f storage/oauth/private.key ] || [ ! -f storage/oauth/public.key ]; then
    echo "Generating Laravel Passport keys..."
    php artisan passport:install --force
else
    echo "Passport keys already exist."
fi


# Starts PHP-FPM + Nginx
echo "Starting PHP-FPM and Nginx..."
php-fpm -D
nginx -g 'daemon off;'
