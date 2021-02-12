## Zustand state management ssr

A basic proof-of-concept with [zustand](https://github.com/pmndrs/zustand/) with ssr by implementing a basic todo list.

- [] Investigate Isomorphic (client & server) data hydration

#### Sections

1. [Getting started](#getting-strated)
3. [Technologies](#technologies)


#### Getting Started 

```sh
// Start CRA client
cd ./services/client
yarn start

// Start server 
cd ./services/server
yarn server:watch

visit http://localhost:3001
```

### Technologies

#### Client
- create-react-app 
- react / react-dom 
- typescript
- zustand
- material-ui

#### Server 
- express
- http-proxy
- webpack
- react / react-dom 
- nodemon
- pug (templating)
- typescript
- zustand
- material-ui
