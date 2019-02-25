# NEMS, a Node+Express+MongoDB Starter kit

NEMS is a starter kit for developping and building an application with NodeJS, Express and MongoDB as backend.

## Getting started

Clone the repo

```bash
cd /Users/user/my_project # Replace with your own path
git clone https://gitlab.paris-digital-lab.com/lab/nems.git
```

### Use Docker as your dev environment

1. Get [Docker platform and Docker Compose](https://docs.docker.com/install/) (or use desktop app for [Mac OS](https://docs.docker.com/docker-for-mac/install/) or [Windows](https://docs.docker.com/docker-for-windows/install/))
2. Build the image with `docker-compose build`
3. Start the container with `docker-compose up` or alternatively use *package.json* scripts : `npm run docker-dev`
4. Open a web browser and navigate to <http://localhost>

Project also comes with a set of predefined scripts (see *package.json* file for more).

```bash
# Run in debug mode and attach a debugger for step by step debugging with breakpoints
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up
# or via package.json script
npm run docker-debug
```

### Other uesful commands

```bash
# Stop the container
docker-compose down
# or via package.json script
npm run docker-stop

# Connect to remote container
docker exec -i -t nems-web /bin/bash
```

## Test with jest

```bash
# Run tests suite
npm run test
```