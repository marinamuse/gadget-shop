const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://admin-marina:marinochka90@cluster0.hr1hl.mongodb.net/shopDB", { useNewUrlParser: true }, { useUnifiedTopology: true });

//data schema, model and sample data for Products
const productsSchema = {
    title: String,
    description: String,
    price: Number,
    image: String
}

const Product = mongoose.model("Product", productsSchema)

//data schema, model and sample data for Cart
const cartSchema = {
    sequence: Number,
    image: String,
    title: String,
    price: Number
}

const Cart = mongoose.model("Cart", cartSchema)

const item1 = new Cart({
    sequence: 1,
    image: "/images/best-seller-one.png",
    title: "Monocular Telescope",
    price: 17.99
})

const item2 = new Cart({
    sequence: 2,
    image: "/images/best-seller-two.png",
    title: "Charging Station",
    price: 35.79
})

const item3 = new Cart({
    sequence: 3,
    image: "/images/best-seller-three.png",
    title: "Mini Projector",
    price: 119.99
})

// item1.save();
// item2.save();
// item3.save();

app.get("/", function(req, res) {
    res.render("index");
})

app.get("/cart", function(req, res) {
    let alert = "";
    Cart.find({}, function(err, foundItems) {
            if(!foundItems) {
                alert = "No Found Items"
            } else {
                let cartItems = foundItems;
                alert = "Your Basket Looks Nice"
                res.render("cart", {
                    products: cartItems,
                    alert: alert
                })
            }
    })
})

app.get("/products", function(req, res) {

    Product.find({}, function(err, foundProducts) {
        if(!err) {
            let productsList = foundProducts;
            res.render("products", {
                products: productsList
            })
        }
    });
})

app.listen(process.env.PORT || 3000, function() {
    console.log("express server is running");
})