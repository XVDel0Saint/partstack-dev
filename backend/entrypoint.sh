#!/bin/sh

echo "Starting container..."

# ----------------------------
# Ensure storage directories exist and have correct permissions
# ----------------------------
mkdir -p storage/oauth
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

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
    echo "Installing Laravel Passport (keys + clients)..."
    php artisan passport:install --force --no-interaction
else
    echo "Passport already initialized."
fi

# Ensure keys are readable
chmod 644 storage/oauth/*.key

# Start PHP-FPM + Nginx
echo "Starting PHP-FPM and Nginx..."
php-fpm -D
nginx -g 'daemon off;'
