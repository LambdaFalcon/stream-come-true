FROM node:10.15.3-alpine

# Copy client and server folders
COPY client /client
COPY server /server

# Install dependencies
RUN npm ci --prefix client
RUN npm ci --prefix server

# Build client
RUN npm run build --prefix client

# Copy server and install
EXPOSE 9999
CMD [ "npm", "run", "prod", "--prefix", "server" ]