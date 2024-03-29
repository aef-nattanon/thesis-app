FROM node:18-alpine as builder
# Set the working directory to /app inside the container

WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
# RUN npm ci 
# Build the app
RUN npm install
RUN npm install react-scripts -g
RUN npm install serve -g

RUN npm run build

# Bundle static assets with nginx
# FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
ARG THESIS_API_URL
ENV THESIS_API_URL=${THESIS_API_URL}

# Expose port
EXPOSE 8080
EXPOSE 80
# Start nginx


ENTRYPOINT ["npm", "run", "start-sw"]