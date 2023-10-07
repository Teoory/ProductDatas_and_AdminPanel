const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/addProduct', (req, res) => {
  const product = req.body.product;

  fs.readFile('productDatas.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    const products = JSON.parse(data);
    products.push(product);

    fs.writeFile('productDatas.json', JSON.stringify(products, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      res.send('Ürün başarıyla eklendi!');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
