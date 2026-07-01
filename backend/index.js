const express = require('express');
require("dotenv").config();
require('./db/config');


const User = require('./db/user');
const Product = require('./db/product');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_KEY;

const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign(
                { user },
                jwtKey,
                { expiresIn: "2h" },
                (err, token) => {
                    if (err) {
                        return resp.send({ result: "No User found" });
                    }

                    resp.send({
                        user,
                        auth: token,
                    });
                }
            );

});


app.post('/login', async (req, resp) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign(
                { user },
                jwtKey,
                { expiresIn: "2h" },
                (err, token) => {
                    if (err) {
                        return resp.send({ result: "No User found" });
                    }

                    resp.send({
                        user,
                        auth: token,
                    });
                }
            );
        } else {
            resp.send({ result: "No user found" });
        }
    }
    else {
        resp.send({ result: "No user found" });
    }

});

app.post('/add-product',verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products",verifyToken, async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No Products found" });
    }
});

app.delete("/product/:id",verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result);
});

app.get("/product/:id",verifyToken, async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: "No Record Found." })
    }
});

app.put("/product/:id",verifyToken, async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        })
    resp.send(result)
});

app.get("/search/:key",verifyToken, async (req, resp) => {
    const result = await Product.find({
        $or: [
            { name: { $regex: req.params.key, $options: "i" } },
            { company: { $regex: req.params.key, $options: "i" } },
            { category: { $regex: req.params.key, $options: "i" } }
        ]
    });

    resp.send(result);
});

function verifyToken(req,res,next)
{
    let token = req.headers.authorization;
    if (token) {
        token = token.split(' ')[1];

        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                return res.status(401).send({ result: "Please provide a valid token" });
            } else {
                next();
            }
        });
    } else {
        res.status(403).send({ result: "Please add token with header" });
    }
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});