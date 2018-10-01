FROM node:9

COPY package*.json ./
COPY assets ./assets/
COPY modules ./modules/
COPY routes ./routes/
COPY services ./services/
COPY views ./views/
COPY README.md ./

COPY *.js ./

RUN npm install

EXPOSE 8000
CMD npm start
