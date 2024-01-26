exports.generateColor = async (req, res) => {
  var url = "http://colormind.io/api/";
  const { color } = req.body;
  var data = {
    model: "default",
    input: [color, "N", "N", "N", "N"],
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      var palette = data.result;

      res.status(200).json({ state: true, data: JSON.stringify(palette) });
    })
    .catch((err) => {
      res.status(500).json({ state: false, error: err.message });
    });
};

/**Generar lista de modos disponibles */
exports.listModels = async (req, res) => {
  fetch("http://colormind.io/list/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("response is not ok");
      }
      return response.json();
    })
    .then((data) => {
      res.status(200).json({ state: true, data: data.result });
    })
    .catch((error) => {
      res.status(500).json({ state: false, error: error.message });
    });
};
