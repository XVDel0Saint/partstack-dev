#!/bin/sh

echo "Starting container..."

# ----------------------------
# Ensure storage directories exist and have correct permissions
# ----------------------------
mkdir -p storage/oauth
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "Forcing Environment Sync..."

# 1. Physically delete the config cache file if it exists
# This is the most reliable way to stop the SQLite fallback
rm -f bootstrap/cache/config.php
rm -f bootstrap/cache/routes.php
rm -f bootstrap/cache/services.php

# 2. Hard-set the connection for the shell session
export DB_CONNECTION=mysql

# Run migrations + seeders if DB is empty
TABLE_CHECK=$(php artisan tinker --execute "echo Schema::hasTable('users') ? '1' : '0';")

if [ "$TABLE_CHECK" = "0" ]; then
    echo "Running migrations..."
    php artisan migrate --force
    echo "Running seeders..."
    php artisan db:seed
else
    echo "Migrations already applied, skipping."
fi

# Generate Passport keys if missing
CLIENT_COUNT=$(php artisan tinker --execute "
echo DB::table('oauth_clients')->count();
")

if [ "$CLIENT_COUNT" = "0" ]; then
    echo "Installing Passport clients..."
    php artisan passport:keys --force
    php artisan passport:install --force
    php artisan passport:client --personal --no-interaction || true
    chmod 644 storage/oauth/*.key

else
    echo "Passport clients already exist."
fi

# clears
    php artisan config:clear
    php artisan cache:clear
    php artisan route:clear
    php artisan redis:flushall

# start PHP-FPM + Nginx
    echo "Starting PHP-FPM and Nginx..."
    php-fpm -D
    nginx -g 'daemon off;'
