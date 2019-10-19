/*****************************************************************************************************
 Rami D 19/10/19
 Sluther service worker (ws.js) that capture, filter and aggregate the HTTP application
 request and response, then post to back-end.
 The requests filter can be customized to fit business requirements.
 ****************************************************************************************************/
import config from 'config.js'

let chunck = []
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
    if (config.debug) console.log("Event: ", event)
    if (event.request.mode !== 'no-cors' || config.crossOrigin) {
        //Skip non-cross origin requests if not configured on
        //Parse request
        event.request.body
        event.request.url
        event.request.method

        let request = {
            method: 'POST',
            date: '12-02-2019 04:08:33',
            duration: '1243',
            status: '200',
            mimeType: 'application/json',
            url: '',
            requestBody: {},
            responseBody: {}

        }

    }

})