const { NlpManager } = require('node-nlp');
const fs = require('fs');

const manager = new NlpManager({ languages: ['es'] });

const newEntities = JSON.parse(fs.readFileSync('helpers/entityPln.json', 'utf-8'));

newEntities.forEach(entidad => {
    const { nombreEntidad, categorias } = entidad;
    categorias.forEach((elemento) => {
        let nameType = elemento.nombreTipo;
        elemento.subcategorias.forEach(ele => {
            let name = ele.nombre;
            ele.valores.forEach(valor => {
                manager.addNamedEntityText(nombreEntidad, valor, ['es'],name);
            });
        });
    });
});

(async () => {
    await manager.train();
    manager.save();
})();

exports.processText = async (req, res) => {
    const { text } = req.body;
    try {
        const response = await manager.process('es', text);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error en el procesamiento NLP' });
    }
};
