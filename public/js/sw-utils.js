﻿//Guardar en el cache dinamico
const actualizaCacheDinamico = (dynamicCache, req, res) => {

    if (res.ok) {
        return caches.open(dynamicCache).then(cache => {
            cache.put(req, res.clone())
            return res.clone();
        });
    } else {
        //Si no logra obtener nada, retorna la respuesta original
        return res;
    }
}

function actualizaCacheStatico(estaticoCache, req, APP_SHELL_INMUTABLE) {
    if(APP_SHELL_INMUTABLE.includes(req.url)) {
        // No hace falta actualizar el inmutable
    } else {
        return fetch(req).then(res => {
            return actualizaCacheDinamico(estaticoCache, req, res);
        }).catch(() => {
            return;
        });
    }
}

function manejoApiPuntuaciones(cacheName, req) {

    if (req.clone().method === 'POST') {
        //ejecutar post
        console.log('Detecta solicitud POST de Puntuaciones')
        if(self.registration.sync) {
            console.log('Guarda en indexDB')
            return req.clone().text().then(body => {
                const bodyObj = JSON.parse(body);
                return guardarPuntuacion(bodyObj);
            });
        } else {
            return fetch(req);
        }

    } else {
        return fetch(req).then(resp => {
            if (resp.ok) {
                actualizaCacheDinamico(cacheName, req, resp.clone());
                return resp.clone();
            } else {
                return caches.match(req);
            }
        }).catch(err => {
            return caches.match(req);
        });

    }
}