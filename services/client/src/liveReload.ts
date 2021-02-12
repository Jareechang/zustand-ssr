import url from 'url'

/*
 * The main usage of this code is to refresh the client side when
 * our server restarts and the webpack dev client socket connection drops.
 *
 * For better dev experience, we'll just wait a few seconds then refresh
 *
 * TODO: Probably add an UI overlay
 * 
 * **Details:**
 *
 * 1. During server restart, it'll attempt to reconect with server
 * 2. When the connect becomes live again, we'll reload to get latest SSR app shell
 *
 * ***/

const reloadPage = () => {
    if (window
        && window.location
        && typeof window.location.reload === 'function') {
        window.location.reload();
    } else {
        console.error(
            `Failed to automatically reload... please reload manually`
        )
    }
}

const DEBUG_MODE = process.env.LIVE_RELOAD_DEBUG || false;

const log = (...args: any) => {
    if (DEBUG_MODE) {
        console.log.apply(null, ['[WssConnect Debug] ', ...args])
    }
}

const connect = (
    retries : number = 3,
    retryTimeout : number = 1000,
    isRetrying: boolean = false 
) : any => {
    const CLOSED_STATE = 3;

    log(`retries: ${retries}, retryTimeout: ${retryTimeout}`)

    if (retries === 0) {
        log(`Max retries exceeded, bailing... Please reload manually`)
    }

    var connection = new WebSocket(
        url.format({
            protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',
            hostname: window.location.hostname,
            port: window.location.port,
            // Hardcoded in WebpackDevServer
            pathname: '/sockjs-node',
            slashes: true,
        })
    )

    connection.addEventListener('error', (event: any) => {
        log(`connection error received...`)
        // @ts-ignore
        if (event.target && event.target.readyState === CLOSED_STATE) {
            setTimeout(() => {
                connect(retries - 1, retryTimeout * 2, true)
            }, retryTimeout)
        }
    })

    connection.onopen = () => {
        if (isRetrying) {
            log(`Retry success; server is live, reloading page`)
            reloadPage()
        } else {
            log(`successfully connected to server`)
        }
    }

    retries -= 1;
    return connection
}

const connection = connect(5, 500)

connection.onclose = () => {
    log('connection closed...')
    connect()
}
