docker build -t hasratsabit/skill-stream-webapp:latest -t hasratsabit/skill-stream-webapp:$SHA -f ./webapp/Dockerfile ./webapp
docker build -t hasratsabit/skill-stream-server:latest -t hasratsabit/skill-stream-server:$SHA -f ./server/Dockerfile ./server

docker push hasratsabit/skill-stream-webapp:latest
docker push hasratsabit/skill-stream-server:latest

docker push hasratsabit/skill-stream-webapp:$SHA
docker push hasratsabit/skill-stream-server:$SHA

kubectl apply -f k8s
kubectl set image deployments/webapp-deployment webapp=hasratsabit/skill-stream-webapp:$SHA

