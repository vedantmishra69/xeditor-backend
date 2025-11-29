git pull origin main

cp ../.env .env

docker stop xeditor-backend
docker rm xeditor-backend
docker image rm xeditor-backend
docker build -t xeditor-backend .
docker run --name xeditor-backend -d --restart=always -p 8000:8000 xeditor-backend

