const db = PouchDB('notas');

function guardarPuntuacion(puntuacion) {
    // console.log("Puntuacion a guardar: ", puntuacion);
    puntuacion._id = new Date().toISOString();
    return db.put(puntuacion).then(()=> {
        self.registration.sync.register('nuevo-post');
        const newResp = {ok:true,offline:true};
        return new Response(JSON.stringify(newResp));
    });
}

function postearPuntuacion(token) {
    const posteos = [];
    // console.log('entra a postear puntuación')
    return db.allDocs({include_docs:true}).then(docs => {
        // console.log('existen docs en indexDB');
        docs.rows.forEach(row => {
            const doc = row.doc;
            // console.log('doc: ', doc);
            const data = {
                uid: doc.uid,
                score: doc.score,
                nombre: doc.nombre,
                fecha: doc.fecha,
            }
            console.log(token);
            const fetchProm = fetch('https://us-central1-triviatrek-187ec.cloudfunctions.net/api/puntuacion/agregarPuntuacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }).then(resp => {
                // console.log('borra el doc de indexDB')
                console.log('Conexión recuperada, enviando notas al servidor... ');
                return db.remove(doc);
            });
            posteos.push(fetchProm);
        })
        return Promise.all(posteos);
    });
}