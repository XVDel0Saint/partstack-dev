#!/bin/sh

# checks if the users table exists
TABLE_CHECK=$(php artisan tinker --execute "echo Schema::hasTable('users') ? '1' : '0';")

if [ "$TABLE_CHECK" = "0" ]; then
    echo "Running migrations and seeding..."
    php artisan migrate --force
    php artisan db:seed --class=DatabaseSeeder
else
    echo "Migrations already applied, skipping."
fi

# Start PHP-FPM and Nginx
php-fpm -D
nginx -g 'daemon off;'
