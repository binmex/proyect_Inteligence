const sdk = require("api")("@prodia/v1.3.0#1jrnd16lrb6b1qn");
//e8af311f-0994-4f2e-b310-f20a6251a065
//cff4ace1-210f-4528-a878-5aa21cef9f05
sdk.auth("e8af311f-0994-4f2e-b310-f20a6251a065");

exports.generateImage = async (req, res) => {
  const {prompUser} =  req.body
  try {
    const { data } = await sdk.generate({
      style_preset: '3d-model',
      prompt: prompUser,
      model: 'Realistic_Vision_V5.0.safetensors [614d1063]',
      //sampler: 'scacsacsacsca'
      //upscale: true, aspect_ratio: 'landscape'
    });
    const img = await retrieveGeneration(data.job);
    res.status(200).json({ state: true, data: img });
  } catch (err) {
    console.error(err);
    res.status(500).json({ state: false, error: err.message });
  }
};

const retrieveGeneration = (job) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { data } = await sdk.getJob({ jobId: job });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    }, 8000);
  });
};