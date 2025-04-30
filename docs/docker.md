---
id: docker
title: FlexIt Docker Deployment
hide_title: true
sidebar_label: Docker (Linux)
---

# Deploy FlexIt

[This repository](https://github.com/flexanalytics/flexit-docker-linux) provides everything needed to deploy FlexIt using Docker.

**For Windows Installation see [this guide](docker-windows.md)**

## Prerequisites

Ensure you have `sudo` access and the following are installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Deployment Options

This repository allows for the following deployment options:

- **With all containers**: FlexIt Frontend, PostgreSQL backend, and Nginx for reverse proxy management.
- **Without PostgreSQL**: Use an external content database while deploying the FlexIt Frontend (and optionally Nginx).
- **Without Nginx**: Directly expose the FlexIt Frontend without a reverse proxy (with or without a content database).

### Required Containers

The **FlexIt Analytics** (`flexit-analytics`) container is the only mandatory container. All other containers are optional based on your setup.

## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/flexanalytics/flexit-docker-linux.git
cd flexit-docker-linux
```

### 2. Configure Environment Variables

Rename the `.env.template` file to `.env` and update the following:

backend database credentials:

```
## --backend database credentials-- ##
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=5432
```

frontend app configuration (optional, defaults are provided):

```
## --frontend app port number-- ##
FLEXIT_PORT=3030
FLEXIT_VERSION=latest
```

webserver setup (optional if using Nginx and ssl for external access):

```
## -- nginx setup -- ##
USE_NGINX=true
# domain where your site will be available
PUBLIC_DNS='<your_public_dns>'
# should certs be managed automatically?
AUTO_MANAGE_CERTS=false
# path where .crt and .key files are stored
CERT_PATH=/etc/nginx/ssl
# email for certificate authority
CERT_EMAIL='<your_email>''
# https port (443 is default and standard)
NGINX_HTTPS_PORT=443
# http port (80 is default and standard)
NGINX_HTTP_PORT=80
```

> **Note**:
>
> - If you are using an external content database, you will be prompted to set up the database credentials upon creating your account.

## Installation and Setup

### Installing for the first time

Run the following command in an Administrator PowerShell:

```bash
./install.sh
```

This command will prompt you to configure your content database, build the images, and start the container(s).

### Access FlexIt

Visit the application at:

- **Without Nginx**: `http://localhost:<FLEXIT_PORT>`
- **With Nginx**: `http://<PUBLIC_DNS>`

  See here for how to [ensure your DNS is correctly configured](administration#https).

## Managing the Docker Containers

### Stopping the Application

To stop the application:

```bash
./scripts/stop_server.sh
```

### Starting the Application

To start the application:

```bash
./scripts/start_server.sh
```

### Restarting the Application

To pull the latest changes from an upstream repo and restart the application:

```bash
./scripts/restart_server.sh
```

### Deploying the Application

To deploy the application with custom files in the `volumes` directory, including pulling changes and restarting, run:

```bash
./scripts/deploy_server.sh
```

## Cleaning up artifacts to free up space

This section provides commands to clean up Docker artifacts, including containers and images.

### stop all containers

```bash
sudo docker stop $(sudo docker ps -aq)
```

This command will stop all running containers in your local Docker environment. Be cautious, as this will stop all containers, including those not related to this project.

### delete all containers

```bash
sudo docker rm $(sudo docker ps -aq)
```

This command will remove all containers from your local Docker environment. Be cautious, as this will delete all containers, including those not related to this project.

### delete all images

```bash
sudo docker rmi $(sudo docker images -q)
```

This command will remove all images from your local Docker environment. Be cautious, as this will delete all images, including those not related to this project.

### prune to clear up space

```bash
sudo docker system prune -af
```

This command will remove all stopped containers, unused networks, dangling images, and build cache.

To remove only unused images:

```bash
sudo docker image prune -a
```

To remove unused containers:

```bash
sudo docker container prune
```

To remove unused networks:

```bash
sudo docker network prune
```

To remove unused build cache:

```bash
sudo docker builder prune
```

## Working with Volumes

The `docker-compose.yml` file uses named volumes to persist data. These volumes are created automatically when you run the application and will persist between container restarts.

For example:

```yaml
volumes:
  - flexit_webcontent:/opt/flexit/webcontent
```

This creates a named volume called `flexit_webcontent` that is used by the `flexit-analytics` service and is mapped to the `/opt/flexit/webcontent` directory in the container. This volume is owned by root and is not accessible by the user running the container. If you need to access or modify the data in this volume, you can use the `docker cp` command to copy files to the container from your local machine (or vice/versa). [Further documentation from Docker here](https://docs.docker.com/reference/cli/docker/container/cp/)

For example, to copy a file.txt file from your local machine to the `flexit_webcontent` volume in the `flexit-analytics` container:

```bash
sudo docker cp file.txt flexit-analytics:/opt/flexit/webcontent/file.txt
```

You can also get into the container's shell directly to move around the filesystem if needed:

run bash from within the container (linux):

```bash
sudo docker exec -it flexit-analytics /bin/bash
```

<!-- run cmd from within the container (windows):
```bash
sudo docker exec -it flexit-analytics cmd
``` -->

To view the volumes:

```bash
sudo docker volume ls
```

To inspect a specific volume:

```bash
sudo docker volume inspect <volume_name>
```

## Additional Notes

### Viewing Logs

To view logs for the FlexIt Frontend:

```bash
sudo docker logs <container_name>
```

## Troubleshooting

### 1. PostgreSQL Connection Issues

- Ensure the `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in `.env` match the values expected by the PostgreSQL server.

### 2. Nginx Not Forwarding Requests

- Check that the `PUBLIC_DNS` in `.env` matches your actual DNS or hostname.
- Ensure no other service is using the Nginx port (default: `80` or `NGINX_PORT`).

### 3. FlexIt Frontend Not Starting

- Review logs:

  ```bash
  docker logs flexit-frontend
  ```
