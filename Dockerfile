# Use the official Bun.js image
FROM oven/bun:slim

# Set the working directory
WORKDIR /app

# Copy the package.json and bun.lockb files
COPY package.json bun.lock ./

# Install the dependencies
RUN bun install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]
