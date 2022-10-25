const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    // attributes: ['id', 'category_name'],
    // include: [{
    //   model: Product,
    //   attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    // }]
  })
  .then(dbCategory => res.json(dbCategory)) 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'category_name'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then(dbCategory => res.json(dbCategory)) 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Category.create(req.body).then(data => res.json(data));
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {where: {id: req.params.id}}).then(data => res.json(data));
});

router.delete('/:id', (req, res) => {
  Category.destroy({where: {id: req.params.id}}).then(data => res.json(data));
});

module.exports = router;
