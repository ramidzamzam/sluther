/*****************************************************************************************************
 Rami D 19/10/19
 Register and load a worker service (ws.js) that capture, filter and aggregate the HTTP application
 request and post to back-end.
 The requests filter can be customized to fit business requirements.
 ****************************************************************************************************/
const sluther = function () {
    //Register the WS and load
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope)
            }, function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err)
            });
        });
    } else {
        console.log('ServiceWorker registration failed: No navigator!', navigator.toString())
    }
}