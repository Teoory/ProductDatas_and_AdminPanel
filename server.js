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


app.put('/updateData/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body.updatedProduct;

  fs.readFile('productDatas.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    const products = JSON.parse(data);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
      products[productIndex] = updatedProduct;

      fs.writeFile('productDatas.json', JSON.stringify(products, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        res.send('Ürün başarıyla güncellendi!');
      });
    } else {
      res.status(404).send('Ürün bulunamadı');
    }
  });
});



app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});