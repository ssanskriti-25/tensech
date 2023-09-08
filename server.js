// const express= require("express");
// const mongoose = require("mongoose");
// const bodyParser= require("body-parser")
// const app = express();

// app.use(bodyParser.urlencoded({extended:false}));
// app.use(express.json)

// const productSchema=  new mongoose.Schema({
//     name: String,
//     description: String,
//     price: Number,
// })

// const Product= new mongoose.model("Product",productSchema)

// //create product
// app.post("/api/v1/product/new",async(req,res)=>{

//    const product= await Product.create(req.body)
//    res.status(200).json({
//     success:true,
//     product
//    })
// })

// app.listen(4500, ()=>{
//     console.log("server is working https://localhost:4500");
// });





const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Define your Pantry ID (replace 'YOUR_PANTRY_ID' with the actual ID)
const pantryId = '2a49a3f0-c8f7-40e8-bb9f-6b7fccea1fe9';

// Define your API endpoints
app.post('/add-item', async (req, res) => {
  // Implement logic to add key-value pairs to the Pantry
  try {
    const response = await axios.post(createEndpoint, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/get-item', async (req, res) => {
  // Implement logic to retrieve a value from the Pantry
  try {
    const response = await axios.get(readEndpoint);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/list-baskets', async (req, res) => {
  // Implement logic to list baskets and filter by name
  try {
    const response = await axios.get(listBasketsEndpoint);
    // Implement filtering by name here
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/update-item', async (req, res) => {
  // Implement logic to update a value in the Pantry
  try {
    const response = await axios.put(updateEndpoint, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/delete-item', async (req, res) => {
  // Implement logic to delete a basket from the Pantry
  try {
    const response = await axios.delete(deleteEndpoint);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const pantryId= '2a49a3f0-c8f7-40e8-bb9f-6b7fccea1fe9'
const pantryBaseUrl = `https://getpantry.cloud/api/pantry/${pantryId}/baskets`;

const createEndpoint = `${pantryBaseUrl}/${'YOUR_BASKET_KEY'}`;
const readEndpoint = `${pantryBaseUrl}/${'YOUR_BASKET_KEY'}`;
const listBasketsEndpoint = `${pantryBaseUrl}`;
const updateEndpoint = `${pantryBaseUrl}/${'YOUR_BASKET_KEY'}`;
const deleteEndpoint = `${pantryBaseUrl}/${'YOUR_BASKET_KEY'}`;


// app.post('/add-item', async (req, res) => {
//     try {
//       const response = await axios.post(createEndpoint, req.body);
//       res.json(response.data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  
//   app.get('/get-item', async (req, res) => {
//     try {
//       const response = await axios.get(readEndpoint);
//       res.json(response.data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  
//   app.get('/list-baskets', async (req, res) => {
//     try {
//       const response = await axios.get(listBasketsEndpoint);
//       // Implement filtering by name here
//       res.json(response.data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  
//   app.put('/update-item', async (req, res) => {
//     try {
//       const response = await axios.put(updateEndpoint, req.body);
//       res.json(response.data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  
//   app.delete('/delete-item', async (req, res) => {
//     try {
//       const response = await axios.delete(deleteEndpoint);
//       res.json(response.data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

  
  app.get('/list-baskets', async (req, res) => {
    try {
      const response = await axios.get(listBasketsEndpoint);
      const { nameFilter } = req.query;
      const filteredBaskets = response.data.filter((basket) =>
        basket.name.includes(nameFilter)
      );
      res.json(filteredBaskets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });