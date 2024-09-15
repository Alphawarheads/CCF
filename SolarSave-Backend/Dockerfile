# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r docs/requirements.txt

# Expose port if necessary (e.g., for an API)
EXPOSE 5000

# Run the application
CMD ["python", "app/device_simulation.py"]
