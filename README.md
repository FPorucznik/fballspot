# FballSpot - social media for football fans

FballSpot is a social media web application done for the purpose of my engineering thesis. The target users of the app are football fans. The project allows users to create accounts, posts, chat with each other and create watchrooms that enable watching youtube content together. All of this is football oriented.


# Core functionalities

- account creation
- profile edit
- user search
- post creation (standard post, game score post and squad rating post)
- post browsing (public posts, posts only visible for friends)
- post commenting
- chats with other users
- watchrooms
- notifications

## Tech stack

- Python 3.10.5 (Django, Django REST framework)
- Javascript (React)
- Jwt auth (SimpleJWT)
- Websockets (Django Channels)
- PostgreSQL
- Bootstrap
- Youtube API (ReactPlayer)

## Local setup guide
**Database**
For simplicity use docker and run the following command to create container with postgres db 
```
docker run --name fballspot -e POSTGRES_USER=fballspot -e POSTGRES_PASSWORD=fballspot -p 5432:5432 -v fballspot-db:/var/lib/postgresql/data -d postgres
```

**Backend**
Head to backend folder and install necessary packages and apply migrations then run server
```
cd backend
pip install -r requirements.txt
python ./manage.py migrate
python ./manage.py runserver
```
**Frontend**
Head to frontend folder and install necessary dependencies then run app
```
cd frontend
yarn install
yarn start
```
Head to http://localhost:3000 to view the app
