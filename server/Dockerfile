# Use an official Python 3.11 runtime as a base image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the container
COPY requirements.txt /app/

# Install the dependencies specified in requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the Django project code to the working directory
COPY . /app/

# Expose the port the Django server will run on (default: 8000)
EXPOSE 8000

# Run database migrations and collect static files (for production use)
RUN python manage.py migrate

# Command to run the Django development server (in production, use a proper WSGI server like gunicorn)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
