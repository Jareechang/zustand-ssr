import * as Express from 'express'
import http from 'http'
// @ts-ignore
import httpProxy from 'http-proxy'
import express from 'express'
import path from 'path'
import ReactDOM from 'react-dom/server'
import React from 'react'
import { ServerStyleSheets } from '@material-ui/core/styles'

import Entry from 'client/src/entry'
import * as iso from 'client/src/iso'
import from 'client/src/stores'

const app : Express.Application = express()
const port : number = 3001

const clientServer = {
    socket: `ws://localhost:3000`,
    http: `http://localhost:3000`,
}

const server = http.createServer(app)

// Create-react-app dev server
const craDevServer : any = httpProxy.createServer({
    target: clientServer.socket,
    ws: true
})

// Proxy all /assets/* to create-react-app dev server
app.use([
    '/assets',
    /.+hot-update\.json/
], (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) => {
    craDevServer.web(req, res, {})
})

// upgrade the socket connection in create-react-app 
server.on('upgrade', (
    req: Express.Request,
    socket: any,
    head: any 
) => {
    craDevServer.ws(req, socket, head)
})

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../src/views'))

app.get('/', (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) => {
    const sheets = new ServerStyleSheets()

    const stores = iso.createStores()

    Entry.initStore(stores)

    const markup = (
        ReactDOM.renderToString(
            sheets.collect(
                <Entry stores={stores} />
            )
        )
    )

    const storeData = iso.getStoreStates(stores)

    const css = sheets.toString()

    res.render('index.pug', {
        publicUrl: clientServer.http,
        markup,
        css,
        storeKey: 'zustand-preload',
        storeData: iso.serialize(JSON.stringify(storeData))
    })
})

server.listen(port, () => console.log(`running api on port ${port}!`))
