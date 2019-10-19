/*****************************************************************************************************
 Rami D 19/10/19
 Register and load sluther service worker (ws.js) that capture, filter and aggregate the HTTP application
 request and response, then post chunks to server side.
 The requests filter can be customized to fit business requirements.
 ****************************************************************************************************/
(function () {
    //Register the WS and load
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((registration) => {
                // Registration was successful
                console.log('Sluther ServiceWorker registration successful with scope: ', registration.scope)
            }, (err) => {
                // registration failed :(
                console.log('Sluther ServiceWorker registration failed: ', err)
            })
        })
    } else {
        console.log('Sluther ServiceWorker registration failed: No navigator!', navigator.toString())
    }
})()