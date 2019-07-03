FROM node:10.15.3-alpine

# Define port argument variable
ARG port

# Copy client and server folders
COPY client /client
COPY server /server

# Install dependencies
RUN npm ci --prefix client
RUN npm ci --prefix server

# Build client
RUN REACT_APP_PORT=$port npm run build --prefix client

# Copy server and install
EXPOSE $port
CMD [ "npm", "run", "prod", "--prefix", "server" ]