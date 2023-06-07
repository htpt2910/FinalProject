# Final Project

## Backend

### Build

```bash
docker buildx build --platform=linux/amd64 --push -t registry.heroku.com/thanh-final-project/web -f backend/Dockerfile backend
```

### Release

```bash
heroku container:release web -a thanh-final-project
```

## Frontend 

### Build

```bash
docker buildx build --platform=linux/amd64 --push -t registry.heroku.com/thanh-final-project-frontend/web --build-arg NEXT_PUBLIC_BACKEND_URL=https://thanh-final-project.herokuapp.com --target runner -f frontend/Dockerfile frontend
```

### Release

```bash
heroku container:release web -a thanh-final-project-frontend
```
