====================
Quick Start (Docker)
====================
Steps
-----
1. Ensure Docker Desktop is running.

2. From the root directory, run:
   docker-compose up --build -d

3. Setup the database:
   Primarily run the sql file; or
   docker exec -it partstack_backend php artisan migrate --seed (You may not need to execute the --seed but for data population wise.)

4. Access the project:
   - frontend: http://localhost:3000
   - backend API: http://localhost:8000/api