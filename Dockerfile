FROM node:16-alpine as builder
# Set the working directory to /app inside the container

WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
# RUN npm ci 
# Build the app
RUN npm install -g typescript
RUN npm link typescript
RUN npm install react-scripts -g

RUN npm run build

# Bundle static assets with nginx
# FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
ARG THESIS_API_URL
ENV THESIS_API_URL=${THESIS_API_URL}

# Expose port
EXPOSE 8080
# Start nginx

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=builder /app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]