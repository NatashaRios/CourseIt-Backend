class ProductController{
  constructor(productService) {
    this.productService = productService;
  };

  //get de productos
  //Nuestra cantidad de productos esta escalando mucho por lo que queremos establecer paginas de a 3 productos. Para eso vamos a modificar nuestro endpoint [GET] /products para que este limitado a los primeros tres productos.
  //Para pasar de pagina vamos a usar el query param "page"
  async getProduct(req, res){
    const { page } = req.query;
    let offset = 0;
    let limit = 3;

    if(page){
      try{
        offset = 3 * (page - 1);
        const product = await this.productService.getProduct(offset, limit);
        res.status(200).json(product);
      }catch(e){
        console.log(e);
        res.status(500).send('Error receiving')
      };
    }else{
      try{
        const product = await this.productService.getProduct();
        res.status(200).json(product);
      }catch(e){
        console.log(e);
        res.status(500).send('Error receiving')
      };
    };
  };

  //post de productos
  async postProduct(req, res){
    const { name, price, description, category, stock, freeshipping } = req.body;
    
    if(name && price && description && category && stock && freeshipping && req.user){
      const product = {
        name: name,
        price: price,
        description: description,
        category: category,
        stock: stock,
        freeshipping: freeshipping
      };
      try{
        await this.productService.addProduct(product);
        res.status(200).send('The product was added successfully');
      }catch(e){
        console.log(e);
        res.status(500).send('Creation failed');
      };
    }else{
      res.status(400).send('Information is missing');
    };
  };

  //mostrar producto según el id
  async getProductId(req, res){
    const { id } = req.params; 
    
    try{
      const product = await this.productService.getProductId(id);
      res.status(200).json(product);
    }catch(e){
      console.log(e);
      res.status(500).send('Error receiving')
    };
  };

  //modificación de producto según el id
  async putProduct(req, res){
    const { name, price, description, category, stock, freeshipping } = req.body;
    const { id } = req.params;
    
    if(id && name && description && category && stock && freeshipping && req.user){
      const product = {
        name: name,
        price: price,
        description: description,
        category: category,
        stock: stock,
        freeshipping: freeshipping
      };
      try{
        await this.productService.modifyProduct(id, product);
        res.status(200).send('It was successfully modified');
      }catch(e){
        console.log(e);
        res.status(500).send('Modification error');
      };
    }else{
      res.status(400).send('Information is missing');
    };
  };

  //filtrar producto si tiene envío gratis
  async getProductFilter(req, res){
    try{
      const product = await this.productService.filterProduct();
      res.status(200).json(product);
    }catch(e){
      console.log(e);
      res.status(500).send('Error receiving')
    };
  };

  //agregar la propiedas discount: 0 a los que no tienen
  async putAddProperty(req, res){
    const { discount } = req.body;
    
    if(!discount && req.user){
      try{
        await this.productService.addProperty({...{}, discount: 0});
        res.status(200).send('Discount added successfully');
      }catch(e){
        res.status(500).send('Add error');
      };
    }else{
      res.status(400).send('Information is missing');
    };
  };

  async getProductByCategory(req, res){
    const { productId } = req.params;
    const product = await this.productService.getProductId(productId);
    const productCategory = await this.productService.getProductByCategory(product.category);

    const productRelated = {
      name: product.name,
      category: product.category,
      related: productCategory
    };
    res.json(productRelated);
  };
};

module.exports = ProductController;