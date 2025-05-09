---
id: docker-windows
title: FlexIt Docker Deployment
hide_title: true
sidebar_label: Docker (Windows Containers)
---

# Deploy FlexIt

[This repository](https://github.com/flexanalytics/flexit-docker-windows) provides everything needed to deploy FlexIt using Docker.

**For Linux Installation see [this guide](docker.md)**

## System Requirements

Ensure you are able to run PowerShell as Administrator, as Docker needs elevated privileges to run Windows containers.
Windows containers only run on Windows 10 or Windows Server 2022 and later.

> **Note** FlexIt via Docker does not support SQL Server database connections using Windows Domain authentication. If you need to connect to SQL Server, you must use SQL authentication.
> If you need to connect to SQL Server using Windows authentication, please follow the [on-premise installation instructions](on-prem.mdx).

## Prerequisites
[Git](https://git-scm.com/downloads) or [GitHub Desktop](https://desktop.github.com/) in order to clone the repository and install FlexIt.
Docker and Docker Compose will be automatically installed via the install script if not already on your system.

## Deployment Options

This repository allows for the following deployment options:

- **With all containers**: FlexIt Frontend and PostgreSQL backend.
- **Without PostgreSQL**: Use an external content database while deploying the FlexIt Frontend.

### Required Containers

The **FlexIt Analytics** (`flexit-analytics`) container is the only mandatory container. All other containers are optional based on your setup.

## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/flexanalytics/flexit-docker-windows.git
cd flexit-docker-windows
```

### 2. Configure Environment Variables

Rename the `.env.template` file to `.env` and update the following:

frontend app configuration (modification in optional, the below defaults are provided):

```env
## --frontend app port number-- ##
FLEXIT_PORT=3030
FLEXIT_VERSION=latest
```

backend database configuration (add credentials for the containerized PostgreSQL database):

> If you are using an external content database, set the `USE_CONTENT_DB_CONTAINER` variable to `false`.

```env
## --backend database credentials-- ##
USE_CONTENT_DB_CONTAINER=true
CONTENT_DB_VERSION=latest
DB_USER=''
DB_PASSWORD=''
DB_NAME=''
DB_PORT=5432
```

Ensure the image tag in the `Dockerfile` matches the version of Windows you are using. The default is `windows-ltsc2022`.

> **Note**:
>
> - If you are using an external content database, you will be prompted to set up the database credentials upon creating your account in FlexIt.

## Installation and Setup

### Installing for the first time

Run the following command in an Administrator PowerShell:

```bash
.\install.ps1
```

This command will install docker and docker-compose if not already installed, build the images, and start the container(s).

> Due to the inherent nature and size of Windows containers, the installation process may take a while to complete. Please be patient.

### Access FlexIt

Visit the application at:

`http://localhost:<FLEXIT_PORT>`

See here for how to [configure your DNS](administration#https).

## Managing the Docker Containers

### Stopping the Application

To stop the application:

```bash
.\scripts\stop_server.bat
```

### Starting the Application

To start the application:

```bash
.\scripts\start_server.bat
```

### Restarting the Application

To pull the latest changes from an upstream repo and restart the application:

```bash
.\scripts\restart_server.ps1
```

## Cleaning up artifacts to free up space

This section provides commands to clean up Docker artifacts, including containers and images.

### stop all containers (PowerShell)

```bash
docker stop (docker ps -aq)
```

This command will stop all running containers in your local Docker environment. Be cautious, as this will stop all containers, including those not related to this project.

### delete all containers (PowerShell)

```bash
docker rm (docker ps -aq)
```

This command will remove all containers from your local Docker environment. Be cautious, as this will delete all containers, including those not related to this project.

### delete all images (PowerShell)

```bash
docker rmi (docker images -q)
```

This command will remove all images from your local Docker environment. Be cautious, as this will delete all images, including those not related to this project.

### prune to clear up space

```bash
docker system prune -af
```

This command will remove all stopped containers, unused networks, dangling images, and build cache.

To remove only unused images:

```bash
docker image prune -a
```

To remove unused containers:

```bash
docker container prune
```

To remove unused networks:

```bash
docker network prune
```

To remove unused build cache:

```bash
docker builder prune
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
docker cp file.txt flexit-analytics:/opt/flexit/webcontent/file.txt
```

You can also get into the container's shell directly to move around the filesystem if needed:

run bash from within the container (linux):

```bash
docker exec -it flexit-analytics /bin/bash
```

<!-- run cmd from within the container (windows):
```bash
docker exec -it flexit-analytics cmd
``` -->

To view the volumes:

```bash
docker volume ls
```

To inspect a specific volume:

```bash
docker volume inspect <volume_name>
```

## Additional Notes

### Viewing Logs

To view logs for the a container:

```bash
docker logs <container_name>
```

## Troubleshooting

### 1. PostgreSQL Connection Issues

- Ensure the `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in `.env` match the values expected by the PostgreSQL server.

### 2. FlexIt Frontend Not Starting

- Review logs:

  ```bash
  docker logs flexit-frontend
  ```
