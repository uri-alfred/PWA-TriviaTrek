const db = PouchDB('records');

function guardarPuntuacion(puntuacion) {
    puntuacion._id = new Date().toISOString();
    return db.put(puntuacion).then(()=> {
        self.registration.sync.register('nuevo-post');
        const newResp = {ok:true,offline:true};
        return new Response(JSON.stringify(newResp));
    });
}

function postearPuntuacion(token) {
    const posteos = [];
    return db.allDocs({include_docs:true}).then(docs => {
        docs.rows.forEach(row => {
            const doc = row.doc;
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
                console.log('Conexión recuperada, enviando notas al servidor... ');
                return db.remove(doc);
            });
            posteos.push(fetchProm);
        })
        return Promise.all(posteos);
    });
}