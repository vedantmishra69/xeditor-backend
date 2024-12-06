git pull origin main

docker stop xeditor-backend
docker rm xeditor-backend
docker image rm xeditor-backend
docker build -t xeditor-backend .
docker run --name xeditor-backend -d -p 8000:8000 xeditor-backend

