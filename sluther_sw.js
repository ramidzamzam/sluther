/*****************************************************************************************************
 Rami D 19/10/19
 Sluther service worker (sluther_ws.js) that capture, filter and aggregate the HTTP application
 request and response, then post to back-end.
 The requests filter can be customized to fit business requirements.
 ****************************************************************************************************/
/****************************************************************************************************
 * Constants
 * @type {{NO_CROSS: string}}
 */
const cons = {
    NO_CROSS: 'no-cors'
}
/****************************************************************************************************
 * Configuration
 * @type {{debug: boolean, crossOrigin: boolean, maxBufferSize: number}}
 */
const config = {
    crossOrigin: false,
    debug: true,
    maxBufferSize: 200,
    apiEndpoint: '/collect'
}

let _buffer = []
self.addEventListener('install', (event) => {
    // Perform install steps
    console.log("Sluther WS Installing ...")
    console.log("Sluther WS Install done!")
})

self.addEventListener('activate', event => {
    console.log('Sluther now ready to handle fetches!')
})

self.addEventListener('fetch', (event) => {
    //Capture HTTP requests and responses
    if (event.request.mode !== cons.NO_CROSS || config.crossOrigin) {
        //Skip non-cross origin requests if not configured on
        let req = event.request.clone()
        fetch(event.request).then((response) => {
            //Get request and response
            let res = response.clone()
            //Parse request
            req.json().then((body) => {
                let url = new URL(req.url)
                let _req = {
                    route: url.pathname,
                    method: req.method,
                    body: body,
                    status: res.status
                }
                //Push request to buffer
                _buffer.push(_req)
                if (config.debug) console.log(_req)
                if (_buffer.length > config.maxBufferSize) {
                    //Buffer is full! Post to server
                    fetch(config.apiEndpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(_buffer)
                    }).then((res) => {
                        //Empty buffer
                        _buffer.length = 0
                    }).catch((err) => {
                        console.log('Sluther - Post aggregated data error!', err)
                    })
                }
            })

            return response
        })
    }
})