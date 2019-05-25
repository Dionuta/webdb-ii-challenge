const express = require('express');

const Zoos = require('./zoos-model.js');

const router = express.Router();


router.get('/', async (req,res)=>{
    try{
        const AllZoos = await Zoos.find(req.params);
        res.status(200).json(AllZoos)
    }catch (err) {
        res.status(500).json({ message: 'Failed to process request'});
      }
})


router.get('/:id', async (req,res) =>{
    try{
        const Zoo = await Zoos.findById(req.params.id);
        if(!Zoo){
            res.status(404).json({ message: 'The Zoo could not be found' });
        } else {
          res.status(200).json(Zoo)
        }
    }catch (err) {
        res.status(500).json({ message: 'Failed to process request'});
      }
})

router.post('/', async (req, res) => {
    try {
      const zoo = await Zoos.add(req.body);
      res.status(201).json(zoo);
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error adding the zoo',
      });
    }
  });


  router.put('/:id',  async (req, res) => {
    try {
      const zoo = await Zoos.update(req.params.id, req.body);
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: 'The zoo could not be found' });
      }
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the zoo',
      });
    }
  });
  

router.delete('/:id', async (req, res) => {
    try {
      const count = await Zoos.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The Zoo has been nuked' });
      } else {
        res.status(404).json({ message: 'The Zoo could not be found' });
      }
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the Zoo',
      });
    }
  });
  

module.exports = router;