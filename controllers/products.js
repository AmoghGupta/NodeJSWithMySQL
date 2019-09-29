const Product = require("../models/product");

getAddProduct = (req, res, next)=>{
    res.render('addProduct',
    {
        pageTitle: 'Add Product Page',
        addProductPage: true
    }
    );
    // res.sendFile(path.join(rootDir, "views", "addProduct.html"));
}



postAddProduct = (req, res, next)=>{
    const product = new Product(req.body);
    product.save().then((data)=>{
        res.redirect("/");
    }).catch((err)=>{
        console.log(err);
    });
}

getProducts = (req, res, next)=>{
    Product.fetchAll().then((products)=>{
        res.render('shop',
        {
            products:products[0],
            pageTitle: 'Shop Page',
            shopPage: true
        }
        );
        
    }).catch(()=>{
        res.status(500).send("Something went wrong file fetching data from database");
        console.log("Error while fetching data");
    })
}


getProductDetails = (req, res, next)=>{
    //reading from URL params
   const prodId = req.params.productId;
   Product.findById(prodId).then((product)=>{
        console.log(product[0][0]);
        res.render('product-details',
        {
            product:product[0][0],
            pageTitle: 'Product Details Page',
            detailsPage: true
        }
    );
}).catch((err)=>{
    console.log("ERROR FETCHING DATA: ",err);
})
}

exports.getProducts =getProducts;
exports.getAddProduct = getAddProduct;
exports.postAddProduct = postAddProduct;
exports.getProductDetails =getProductDetails;