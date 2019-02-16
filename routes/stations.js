const express = require('express');
const router = express.Router();
const Station = require('../models/stations');

router.get('/', (req, res) => {

  Station.find({}).exec((error, stations) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(stations);
      res.send(stations.map(station => mapToStation(station)));
    }
  })
})  // +++

router.get('/:id', (req, res) => {
  Station.findOne({ "_id": req.params.id }).exec((error, station) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log(station);
      res.send(mapToStation(station));
    }
  })
});  // +++

router.post('/', (req, res) => {
  const newStation = new Station();

  newStation.name = req.body.name;
  newStation.city = req.body.city;
  newStation.adress = req.body.adress;
  newStation.phone = req.body.phone;
  newStation.workingTime = req.body.workingTime;

  newStation.save((error, station) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    } else {
      console.log(station);
      res.status(201).send(station);
    }
  })
}); // +++

router.put('/:id', (req, res) => {

  Station.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: Object.assign(req.body),
    },
    { new: true },
    (error, station) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        console.log(station);
        res.status(200).send(station);
      }
    }
  )

}); // ++



router.delete('/:id', (req, res) => {

  Stations.findByIdAndRemove(
    { _id: req.params.id },
    (error, success) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        console.log(success);
        res.status(200).send(success);
      }
    }
  )
}); // +++



const mapToStation = (station) => {
  return {
    pavadinimas: station.name,
    miestas: station.city,
    kontaktai: `${station.adress}, ${station.phone}`,
    darbo_laikas: station.workingTime
  }
};

module.exports = router;