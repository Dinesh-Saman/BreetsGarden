const express = require('express');
const Cart = require("../models/cart.mode.js");
const Driver = require("../models/driver.model.js");
const Items = require("../models/items.model.js");
const route = express.Router();
const router = express.Router();

// Add new item
router.post('/Icreate', async (req, res, next) => {
  const { ItemsN, price, image, size } = req.body;
  const newItems = new Items({ ItemsN, price, image, size });

  try {
    const savedItems = await newItems.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
  }
});

// Get all items
router.get('/IgetAll', async (req, res, next) => {
  try {
    const items = await Items.find();
    res.json({ message: "Items details retrieved successfully", items });
  } catch (error) {
    next(error);
  }
});

// Update item
router.put('/Update/:itemId', async (req, res, next) => {
  try {
    const updatedItem = await Items.findByIdAndUpdate(req.params.itemId, { $set: req.body }, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
});

// Delete item
router.delete('/delete/:ItemmId', async (req, res, next) => {
  try {
    await Items.findByIdAndDelete(req.params.ItemmId);
    res.status(200).json("The item has been deleted");
  } catch (error) {
    next(error);
  }
});

// Cart related routes
router.post('/Ccreate', async (req, res, next) => {
  const { ItemsN, price, image, size } = req.body;
  const newCartItem = new Cart({ ItemsN, price, image, size });

  try {
    const savedItems = await newCartItem.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
  }
});

router.get('/CgetAll', async (req, res, next) => {
  try {
    const items = await Cart.find();
    res.json({ message: "Cart items retrieved successfully", items });
  } catch (error) {
    next(error);
  }
});

// Driver related routes
router.post('/Dcreate', async (req, res, next) => {
  const { Dname, Daddress, Dcontactnumber, dnic, Gender, GAge, languagesSpeak, Exprince } = req.body;
  const newDriver = new Driver({ Dname, Daddress, Dcontactnumber, dnic, Gender, GAge, languagesSpeak, Exprince });

  try {
    const savedDriver = await newDriver.save();
    res.status(201).json(savedDriver);
  } catch (error) {
    next(error);
  }
});

router.get('/DgetAll', async (req, res, next) => {
  try {
    const drivers = await Driver.find();
    res.json({ message: "Drivers retrieved successfully", drivers });
  } catch (error) {
    next(error);
  }
});

router.put('/DUpdate/:itemddd', async (req, res, next) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(req.params.itemddd, { $set: req.body }, { new: true });
    res.status(200).json(updatedDriver);
  } catch (error) {
    next(error);
  }
});

router.delete('/deletedd/:IteddId', async (req, res, next) => {
  try {
    await Driver.findByIdAndDelete(req.params.IteddId);
    res.status(200).json("The driver has been deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = route;
