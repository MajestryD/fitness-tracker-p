const router = require('express').Router();
let Exercise = require('../model/exercise.model');


//Find all the exercises in the database, Method:Get
router.route('/').get(async(req,res)=>{
  Exercise.find()
  .then(exercise=> res.json(exercise))
  .catch(err => res.status(400).json('Error: ' + err));
});

//Add an exercise, Method: Post
router.route('/add').post((req, res) => {

  const name = req.body.name;
  const description = req.body.description;

  const newExercise = new Exercise({
    name,
    description,
  });

  newExercise.save()
  .then(exercise => res.json('Exercise added! Exercise: ' + exercise.name))
  .catch(err => res.status(400).json('Error: ' + err));
});

//Get an exercise,
//Params: Exercise ID
router.route('/:id').get((req, res)=>{
  Exercise.findById(req.params.id)
  .then(exercise => res.json(exercise))
  .catch(err => res.status(400).json('Error: '+ err));
});

//Get an exercises
//Params: Exercise name
router.route('/name/:name').get((req, res)=>{
  Exercise.findOne({ 'name': req.params.name }, 'name description', function (err, exercise) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host".
  console.log('%s %s', exercise.name, exercise.description);
  })
  .then(exercise => res.json(exercise))
  .catch(err => res.status(400).json('Error: '+ err));
});

//Delete an exercises
//Params: Exercise Id
router.route('/:id').delete((req, res)=>{
  Exercise.findByIdAndDelete(req.params.id)
  .then(exercise => res.json(exercise.name + " has been deleted"))
  .catch(err => res.status(400).json('Error: '+ err));
});

//Update and exercise
//Params: Exericse id
//Body: Exercise attributes
router.route('/:id').post((req,res)=>{
  const name = req.body.name;
  const description = req.body.description;

  Exercise.findByIdAndUpdate(req.params.id, {name: req.body.name, description: req.body.description})
  .then(exercise => res.json(exercise.name + " has been updated"))
  .catch(err => res.status(400).json("Error: "+ err));
});

module.exports = router;
