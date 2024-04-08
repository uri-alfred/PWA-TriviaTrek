importScripts('https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js')
importScripts('js/sw-db.js')
importScripts('js/sw-utils.js')
importScripts('firebase-messaging-sw.js')

//Crear las variables de cache
const CACHE_DYNAMIC = 'dynamic-V2' //Para los archivos que se van a descargar
const CACHE_STATIC = 'static-v3'    //App shell
const CACHE_INMUTABLE = 'inmutable-v1'// CDN de terceros. LIBRERIAS

const CACHE_DYNAMIC_LIMIT = 50
let token = null;

//Funcion para limpiar el cache
const limpiarCache = (cacheName, numberItem) => {
    caches.open(cacheName)
        .then(cache => {
            cache.keys()
                .then(keys => {
                    if (keys.length > numberItem) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numberItem))
                    }
                })
        })

}
self.addEventListener('install', event => {

    const cahePromise = caches.open(CACHE_STATIC).then(cache => {

        return cache.addAll([
            '/',
            '/index.html',
            '/js/app.js',
            '/js/sw-db.js',
            '/js/sw-utils.js',
            '/sw.js',
            '/favico.ico',
            '/img/offline.gif',
            '/pages/page-offline.html',
            '/img/not-found.jpg',
            '/manifest.json',
        ])
    })
    const caheInmutable = caches.open(CACHE_INMUTABLE).then(cache => {

        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js',
            'https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js',
            'https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js',
            'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth-compat.js'
        ])
    })

    const instalacion = new Promise((resolve, reject) => {
        // Simular la instalación de caches
        setTimeout(() => {
            //console.log('Instalación terminada')
            // para que se actualice y recargue por si sola
            self.skipWaiting()
            resolve()
        }, 1000)
    });

    event.waitUntil(Promise.all([cahePromise, caheInmutable, instalacion]))
});

//Proceso de activacion
self.addEventListener('activate', event => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== CACHE_STATIC && key.includes('static')) {
                return caches.delete(key)
            }
            if (key !== CACHE_DYNAMIC && key.includes('dynamic')) {
                return caches.delete(key)
            }
        })
    })
    event.waitUntil(respuesta)
})

self.addEventListener('fetch', event => {

    let respuesta;
    if (event.request.url.includes('https://identitytoolkit.googleapis.com/') || event.request.url.includes('https://fcmregistrations.googleapis.com/') || event.request.url.includes('https://www.google-analytics.com/')) {
        // post de firebase para el user
        return fetch(event.request);
    } else if (event.request.url.includes('https://us-central1-triviatrek-187ec.cloudfunctions.net/api/puntuacion/agregarPuntuacion')) {
        respuesta = manejoApiPuntuaciones(CACHE_DYNAMIC, event.request);
    } else {
        //Cache with network fallback optimizado
        respuesta = caches.match(event.request).then(res => {
            //si existe en cache lo regresa
            if (res) {
                actualizaCacheStatico(CACHE_STATIC, event.request, CACHE_INMUTABLE);
                return res;
            } else {
                //No existen archivos
                return fetch(event.request).then(newRes => {
                    // Guardar en cache dinamico
                    return actualizaCacheDinamico(CACHE_DYNAMIC, event.request, newRes);
                }).catch(() => {
                    // valida si la imagen que no encuentra esta en cache
                    if (event.request.url.includes('/static/media/')) {
                        // regresa en su lugar la imagen por default de sin conexión
                        return caches.match('/img/not-found.jpg');
                    }
                    // valida si la solicitud es de algún recurso html
                    if (event.request.headers.get('accept').includes('text/html')) {
                        // si no encuentra la pagina devuelve la de offline
                        return caches.match('/pages/page-offline.html');
                    }
                });
            }
        });
    }

    event.respondWith(respuesta)
})

//Tareas asincronas
self.addEventListener('sync', e => {
    console.log('SW: sync');
    if (e.tag === 'nuevo-post') {
        console.log('detecta nuevo-post');
        const respuesta = postearPuntuacion(token);
        e.waitUntil(respuesta);
    }
})

self.addEventListener('message', (event) => {
    const dataFromApp = event.data.data;
    if (dataFromApp) {
        token = dataFromApp;
    }
    // console.log("message",dataFromApp);
});