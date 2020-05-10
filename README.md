# Vuewer

View pdfs on any machine using Vue and Node

![Vuewer](https://i.ibb.co/xDJmVHT/git1.png)

## Setup locally

Clone the repo

```bash
git clone https://github.com/Hapa1/Vuewer.git
cd vuewer
```

Install dependencies for Vue client

```bash
cd client
npm install 
```

Install dependencies for Node app

```bash
cd server
npm install
```

## Configure your environment

Server: open Vuewer/server/config/config-example.js and specify:

- A port number e.g. 8081
- The root directory e.g. '/Desktop/pdfs'

Rename config-example.js to config.js and save

Client: open Vuewer/client/config/config-example.js and specify:

- The URI at which the server is running e.g. 'http://localhost:8081/file' or 'ec2-xx-xxx-xxx-xxx.region.compute.amazonaws.com'

Rename config-example.js to config.js and save

## Boot up the server

```bash
cd client
npm run start
```

## Boot up the client

```bash
cd client
npm run serve
```

Access the vue client at [http://localhost:8080/](http://localhost:8080/)
