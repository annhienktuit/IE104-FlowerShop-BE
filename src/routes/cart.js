const express = require("express");
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const router = express.Router();
const CartController = require("../controllers/CartController");
//CREATE CART- OK
router.post("/", verifyToken, CartController.createCart);

//UPDATE CART - OK
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  //   console.log("Check>>here", req.params.id);
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    console.log(req.params.id);
    const delettedCart = await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json(delettedCart);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//GET CART
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  console.log(">>Check get cart", req.params.userId);
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//GET ALL CART
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
