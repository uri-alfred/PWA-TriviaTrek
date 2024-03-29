importScripts('https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js')
importScripts('js/sw-db.js')
importScripts('js/sw-utils.js')
//Crear las variables de cache
const CACHE_DYNAMIC = 'dynamic-v1' //Para los archivos que se van a descargar
const CACHE_STATIC = 'static-v1'    //App shell
const CACHE_INMUTABLE = 'inmutable-v1'// CDN de terceros. LIBRERIAS


const CACHE_DYNAMIC_LIMIT = 50
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
            '/manifest.json',
        ])
    })
    const caheInmutable = caches.open(CACHE_INMUTABLE).then(cache => {

        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js',
        ])
    })

    const instalacion = new Promise((resolve, reject)=> {
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
    // console.log(event.request.url);
    // Nota:                              cambiar url a firebase
    if ( event.request.url.includes('http://localhost:3001/api/note') ) {
        // console.log('incluye http://localhost:3001/api/note')
        respuesta = manejoApiNotas(CACHE_DYNAMIC, event.request);
    } else {
        //Cache with network fallback optimizado
        respuesta = caches.match(event.request).then(res => {
            //si existe en cache lo regresa
            if (res) {
                actualizaCacheStatico(CACHE_STATIC, event.request, CACHE_INMUTABLE);
                return res;
            } else {
                //No existen archivos
                // console.log(event.request.url)
                return fetch(event.request).then(newRes => {
                    // Guardar en cache dinamico
                    return actualizaCacheDinamico(CACHE_DYNAMIC, event.request, newRes);
                });
            }
        });
    }

    event.respondWith(respuesta)
})

//Tareas asincronas
self.addEventListener('sync', e => {
    console.log('SW: sync');
    if ( e.tag === 'nuevo-post' ) {
        const respuesta = postearNotas();
        e.waitUntil(respuesta);
    }
})