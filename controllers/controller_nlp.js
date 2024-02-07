const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['es'] });


manager.addNamedEntityText('tamaño', 'grande', ['es'], 'tamaño');
manager.addNamedEntityText('tamaño', 'pequeña', ['es'], 'tamaño');
manager.addNamedEntityText('objeto', 'silla', ['es'], 'objeto');
manager.addNamedEntityText('objeto', 'mesa', ['es'], 'objeto');
manager.addNamedEntityText('color', 'rojo', ['es'], 'color');
manager.addNamedEntityText('color', 'azul', ['es'], 'color');
manager.addBetweenCondition('tamaño', 'entre', 'y');
manager.addAfterCondition('color', 'de');


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
