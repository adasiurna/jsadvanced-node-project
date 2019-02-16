const express = require('express');
const router = express.Router();
// const moment = require('moment');
const Car = require('../models/cars');

// moment.locale('lt');

router.get('/', (req, res) => {
  console.log('konsole: Grazinam visus automobilius');

  Car.find({}).exec((error, cars) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(cars);
      res.send(cars.map(car => mapToCar(car)));
    }
  })
});  // +++


router.get('/mechanic', (req, res) => {
  console.log('Grazinam visus mechaninius automobilius');
  Car.find({ isMechanic: true }).exec((error, cars) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(cars);
      res.send(cars.map(car => mapToCar(car)));
    }
  })
});  // +++


router.get('/:id', (req, res) => {
  Car.findOne({ "_id": req.params.id }).exec((error, car) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(car);
      res.send(mapToCar(car));
    }
  })
});  // +++




router.post('/', (req, res) => {
  console.log('sukuriam nauja automobilį', req.body);

  const newCar = new Car();

  newCar.manufacturer = req.body.manufacturer;
  newCar.model = req.body.model;
  newCar.year = req.body.year;
  newCar.fuelType = req.body.fuelType;
  newCar.isMechanic = req.body.isMechanic;
  newCar.doorsNumber = req.body.doorsNumber;
  newCar.seatsNumber = req.body.seatsNumber;
  newCar.additionalInfo = req.body.additionalInfo;

  newCar.save((error, car) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    } else {
      console.log(car);
      res.status(201).send(car);
    }
  })
}); // +++


router.put('/:id', (req, res) => {

  Car.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: Object.assign(req.body),
    },
    { new: true },
    (error, car) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        console.log(car);
        res.status(200).send(car);
      }
    }
  )
}); // +++


router.delete('/:id', (req, res) => {

  Car.findByIdAndRemove(
    { _id: req.params.id, },
    (error, success) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        console.log(success);
        res.status(200).send(success);
      }
    }
  )
});  // +++


const mapToCar = car => {
  return {
    id: car.id,
    automobilis: `${car.manufacturer} ${car.model}`,
    pagaminimo_metai: car.year,
    kuro_tipas: car.fuelType,
    pavaru_deze: car.isMechanic ? 'mechaninė' : 'automatinė',
  }
}


module.exports = router; // eksportuojam kad butu pasiekiama kituose failuose