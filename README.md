## Zustand state management ssr

A basic proof-of-concept with [zustand](https://github.com/pmndrs/zustand/) with ssr by implementing a basic todo list.

- [x] Investigate Isomorphic (client & server) data hydration
- [ ] Integrate immer for immutable data 

#### Sections

1. [Getting started](#getting-started)
2. [Data Loading](#data-loading)
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

### Data Loading

The application initializes the data loading through `App.getSeverProps()`.

**On the server:**

The server starts the interaction by creating a new zustand store instance each request.
Using the created store instance it calls the `Entry.initStore()` which loads up the data into the store instances.

Then using the `iso.getStoreStates()`, it gathers all the data from the store states which gets stringified then serialized into the html rendered markup.

**On the client:**

On the client, It uses the default import stores being created which are singletons.

These store instances are called with `Entry.initStore()`, however this time it uses the data in the markup (parsed and deserialized) to hydrate the store state.


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
