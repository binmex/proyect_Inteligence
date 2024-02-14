const { NormalizerEs, TokenizerEs, StopwordsEs } = require("@nlpjs/lang-es");
const { Container } = require("@nlpjs/core");
const { SentimentAnalyzer } = require("@nlpjs/sentiment");
const { LangEs } = require("@nlpjs/lang-es");
const fs = require("fs");

const normalizer = new NormalizerEs();
const token = new TokenizerEs();
const stopwords = new StopwordsEs();

const corpus = JSON.parse(fs.readFileSync("helpers/entityPln.json", "utf-8"));

async function analyzeSentiment(texto) {
  const container = new Container();
  container.use(LangEs);
  const sentiment = new SentimentAnalyzer({ container });
  const result = await sentiment.process({
    locale: "es",
    text: texto,
  });
  return result.sentiment
}

exports.processText = async (req, res) => {

  const { text } = req.body;
  let found = 0;
  let noFound = 0;
  let wordNoFound = [];
  let wordFound = [];
  try {
    const result = normalizer.normalize(text); //retorna vector con palabras a buscar


    //const result2 = await analyzeSentiment(text);
    //console.log(result2);


    const final = stopwords.removeStopwords(token.tokenize(result, true)); //elimina palabras vacias con,el,a y tokeniza

    final.forEach((evaluar) => {
      let variable = corpus.values.find((element) => evaluar == element);
      if (variable != undefined) {
        found += 1;
        wordFound.push(variable);
      } else {
        noFound += 1;
        wordNoFound.push(evaluar);
      }
    });

    const holgura = (found * 100) / final.length;

    //validamos que respuesta devolvemos
    if (holgura < 100) {
      res.status(404).json({ state: false, data: wordNoFound });
    } else {
      res.status(200).json({ state: true, data: wordFound });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
