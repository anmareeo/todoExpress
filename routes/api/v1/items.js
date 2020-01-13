const express = require ('express')
const router = express.Router()
const ObjectId = require ('mongodb').ObjectId   
//get all items
router.get('/', function(req,res,next){

    try { 

        req.app.locals.collectionItems.find({}).toArray(function(err,result){

            if(err){

                throw err
            }
            res.json(result)
        })
    }
    catch(error){
        console.log(error)
        res.status(400).send("Bad request")
    }
})

router.post('/', function(req,res,next){

    console.log (req.body)  
   
           req.app.locals.collectionItems.insertOne(req.body)
   .then(result =>{
       res.send('added')
   })
      .catch(error =>{
           console.log(error)
           res.status(400).send("Bad request")
       })
   })


router.put('/:id', function(req,res,next){

 console.log (req.body)  

        req.app.locals.collectionItems.replaceOne({_id: ObjectId(req.params.id)}, req.body)
.then(result =>{
    res.send('updated')
})
   .catch(error =>{
        console.log(error)
        res.status(400).send("Bad request")
    })
})

router.delete('/:id', function(req,res,next){
//don't put body on a delete.


        req.app.locals.collectionItems.deleteOne({_id: ObjectId(req.params.id)})
.then(result =>{
    res.send('deleted')
})
   .catch(error =>{
        console.log(error)
        res.status(400).send("Bad request")
    })
})

module.exports = router