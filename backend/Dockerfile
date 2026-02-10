# base image: PHP-FPM
FROM php:8.2-fpm

# installs system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev \
    zip unzip git curl nginx supervisor

# installs PHP extensions for Laravel
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# installs Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# set working directory
WORKDIR /var/www/html

# copy project files
COPY . .

# install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# set some permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# copy Nginx configuration
COPY ./nginx.conf /etc/nginx/sites-available/default

# copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# expose HTTP port
EXPOSE 80

# uses the entrypoint script to start the container
CMD ["/entrypoint.sh"]
