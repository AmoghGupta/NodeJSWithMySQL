const fs = require("fs");
const path = require("path");
const db = require("../utils/database");

const rootPath = require('../utils/path');

class Product {
    constructor(body){
        this.title = body.title;
        this.description = body.description;
        this.price = body.price.toString();
    }

    save(){
        console.log(this.title, this.price, this.description);
         /** CONNECT TO DB */
         return db.execute(
        "INSERT INTO products (title, price,description) VALUES (?, ?, ?)", 
         [this.title, this.price, this.description]
         );
    }

    static fetchAll(cb){
        /** CONNECT TO DB */
        return db.execute('SELECT * FROM products');
    }

    static findById(productId,){
        /** CONNECT TO DB */
        return db.execute(`SELECT * FROM products WHERE id=${productId}`)
    }
}


module.exports = Product;