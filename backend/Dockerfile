FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev \
    zip unzip git curl nginx

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Nginx Config: Ensure it is copied to the correct location for Debian/Ubuntu
COPY ./nginx.conf /etc/nginx/sites-available/default
# Create a symbolic link if it doesn't exist
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# IMPORTANT: Railway uses a dynamic PORT.
# We will use sed in the entrypoint or ensure nginx.conf uses 80
EXPOSE 80

CMD ["/entrypoint.sh"]
