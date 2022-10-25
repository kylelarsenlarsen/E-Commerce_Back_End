const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [{
      through: ProductTag,
      model: Product
    }]
  })
  .then(dbCategory => res.json(dbCategory)) 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      through: ProductTag,
      model: Product
    }]
  })
  .then(dbCategory => res.json(dbCategory)) 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Tag.create(req.body).then(data => res.json(data));
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {where: {id: req.params.id}}).then(data => res.json(data));
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({where: {id: req.params.id}}).then(data => res.json(data));
  // delete on tag by its `id` value
});

module.exports = router;
