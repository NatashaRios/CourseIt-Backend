class SaleController{
  constructor(saleService){
    this.saleService = saleService;
  };

  //get de sales
  async getSale(req, res){
    const { page } = req.query;
    let offset = 0;
    const limit = 3;

    if(page){
      try{
        offset = 3 * (page - 1);
        const sale = await this.saleService.getSale(offset, limit);
        res.status(200).json(sale);
      }catch(e){
        console.log(e);
        res.status(500).send('Error in receiving')
      };
    }else{
      try{
        const sale = await this.saleService.getSale();
        res.status(200).json(sale);
      }catch(e){
        console.log(e);
        res.status(500).send('Error in receiving')
      };
    }
  };

  //post de sales
  async postSale(req, res){
    const { product, user, date, sales } = req.body;
    const sale = {
      product: product,
      user: user,
      date: date,
      sales: sales
    };

    if(sale){
      try{
        await this.saleService.addSale(sale);
        res.status(200).send('Sale added successfully');
      }catch(e){
        console.log(e);
        res.status(500).send('Creation error');
      };
    }else{
      res.status(400).send('Information is missing');
    };
  };

  //get de sales por id
  async getSaleId(req, res){
    const { id } = req.params;

      try{
        const sale = await this.saleService.getSaleId(id);
        res.status(200).json(sale);
      }catch(e){
        console.log(e);
        res.status(500).send('Error receiving')
      };
  };

  //get de sales por user
  async getSaleUser(req, res){
    const { user } = req.params;
    
    try{
      const sale = await this.saleService.getSaleUser(user);
      res.status(200).json(sale);
    }catch(e){
      console.log(e);
      res.status(500).send('Error receiving')
    };
  };

  //get productos ordenados por mas vendidos
  async getTopProducts(req, res){
   const sale = await this.saleService.getTopProducts();
   res.json(sale);
  };

  async getTopUsers(req, res){
    const sale = await this.saleService.getTopUser();
    res.json(sale);
  }

}

module.exports = SaleController;