const { NormalizerEs, TokenizerEs, StopwordsEs } = require("@nlpjs/lang-es");
const { Container } = require("@nlpjs/core");
const { SentimentAnalyzer } = require("@nlpjs/sentiment");
const { LangEs } = require("@nlpjs/lang-es");
const fs = require("fs");
const path = require("path");
const corpusPath = path.join(__dirname, "../helpers/entityPln.json");
const corpus = JSON.parse(fs.readFileSync(corpusPath, "utf-8"));

const normalizer = new NormalizerEs();
const token = new TokenizerEs();
const stopwords = new StopwordsEs();

async function analyzeSentiment(texto) {
  const container = new Container();
  container.use(LangEs);
  const sentiment = new SentimentAnalyzer({ container });
  const result = await sentiment.process({
    locale: "es",
    text: texto,
  });
  return result.sentiment;
}

exports.processText = async (req, res) => {
  const { text } = req.body;
  let found = 0;
  let noFound = 0;
  let wordNoFound = [];
  let wordFound = [];
  try {
    //normaliza osea pasa a minusculas borra puntos y comas
    const result = normalizer.normalize(text); //retorna vector con palabras a buscar

    //const result2 = await analyzeSentiment(text);
    //console.log(result2);

    //remueve los articulos
    const final = stopwords.removeStopwords(token.tokenize(result, true)); //elimina palabras vacias con,el,a y tokeniza

    final.forEach((evaluar) => {
      //guarda en varibale palabra eonctrada dentro del corpus
      //en los valores del corpus busca un elemento donde la palabra del corpues igual a la palabra del prompt
      let variable = corpus.values.find((element) => evaluar == element);
      //si encuentra palabra entonces suma el contador encontrada
      if (variable != undefined) {
        found += 1;
        //se agrega al vector de palabras encontradas
        wordFound.push(variable);
      } else {
        noFound += 1;
        wordNoFound.push(evaluar);
      }
    });
    //cuenta entre las palabras enocntradas por 100/el numero total de palabras en el prompt una vez hecho la normalizacion y la tokenizacion
    const holgura = (found * 100) / final.length;

    //validamos que respuesta devolvemos
    if (holgura < 65) {
      res.status(404).json({ state: false, data: wordNoFound });
    } else {
      res.status(200).json({ state: true, data: wordFound });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
