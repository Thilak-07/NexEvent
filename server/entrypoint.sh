#!/bin/sh

# Wait for the database to be available (optional, useful if DB is in another container)
# /wait-for-it.sh db:5432 -- 

# Apply database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start the Gunicorn server
exec gunicorn --bind 0.0.0.0:8000 root.wsgi:application
