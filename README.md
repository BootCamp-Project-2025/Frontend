# Frontend project

## Development tools

1. **Styles:** tailwind
2. **Routing:** react-router-dom
3. **Api communication:** axios
4. **Testing:** vitest

## Setup

1. Clone the repository
2. Run the following commands

```
cd frontend
npm install
```

## Commands

```
# deploy development
npm run dev
# build project
npm run build
# deploy built project
npm run preview
```

## Docker deploy

```
docker build -t <image_name>:<image_version> --no-cache -f ./Dockerfile
docker run -d -p <external_port>:80 --name <container_name> <image_name>:<image_version>
```
