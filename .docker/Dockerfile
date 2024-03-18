FROM node:20-slim
WORKDIR /app

RUN apt-get update
RUN apt-get install -y ffmpeg \
    build-essential \
    libtool-bin

RUN npm install -g nodemon typescript

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV PS1A="🐳\[\e[33m\]\u\[\e[m\]@node\[\e[36m\][\[\e[m\]\[\e[36m\]\w\[\e[m\]\[\e[36m\]]\[\e[m\]: "

RUN echo 'PS1=$PS1A' >> ~/.bashrc
CMD [ "node", "dist/app.js" ]