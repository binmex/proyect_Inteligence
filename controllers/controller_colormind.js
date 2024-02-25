const fetch = require('node-fetch');

exports.generateColor = async (req, res) => {
  var url = "http://colormind.io/api/";
  const { color } = req.body;
  var data = {
    model: "default",
    input: [color, "N", "N", "N", "N"],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    const palette = responseData.result;

    
    const colorsObject = {
      color1: `rgb(${palette[0].join(',')})`,
      color2: `rgb(${palette[1].join(',')})`,
      color3: `rgb(${palette[2].join(',')})`,
      color4: `rgb(${palette[3].join(',')})`,
      color5: `rgb(${palette[4].join(',')})`,
    };

    res.status(200).json({ state: true, data: colorsObject });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
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
