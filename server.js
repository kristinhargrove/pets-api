var express = require('express');
var bodyParser = require('body-parser');

let primaryId = 1;
let petPrimaryId = 1;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            // {
            //     id: 1,
            //     name: "Vera",
            //     type: "Dog"
            // },
            // {
            //     id: 2,
            //     name: "Felix",
            //     type: "Cat"
            // }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// GET /api/owners

app.get('/owners', (req, res, next) => {
    if (!owners.length) {
        next();
    }
    res.send(owners);
});
// GET /api/owners/:id

app.get('/owners/:id', (req, res) => {
    const id = req.params.id;
    let owner = owners.find((owner) => {
        return owner.id === Number(id);
    });
    res.status(200).send(owner);
})

// POST /api/owners

app.post('/owners', (req, res) => {
    owners.push({
        id: primaryId,
        name: req.body.name,
        pets: []
    })
    primaryId++;

    res.status(200).json({
        message: "The pet's owner has been added!"
    })
})

// PUT /api/owners/:id

// DELETE /api/owners/:id

app.delete('/owners/:id', (req, res) => {
    const id = req.params.id;

    let owner = owners.find((owner) => {
        return owner.id === Number(id);
    });

    let ownerIndex = owners.findIndex((o) => {
        return o === owner;
    })

    if (ownerIndex > -1) {
        owners.splice(ownerIndex, 1);
    }
    res.status(200).send("This owner is gone forever!!");
})

// GET /api/owners/:id/pets

app.get('/owners/:id/pets', (req, res) => {
    const id = req.params.id;

    let owner = owners.find((owner) => {
        return owner.id === Number(id);
    });

    res.status(200).send(owner.pets);
}) //response

// GET /api/owners/:id/pets/:petId

app.get('/owners/:id/pets/:petID', (req, res) => {
    const id = req.params.id;

    let owner = owners.find((owner) => {
        return owner.id === Number(id);
    });

    let pets = owner.pets;
    const petID = req.params.petID;

    let pet = pets.find((pet) => {
        return pet.id === Number(petID);
    });

    res.status(200).send(pet);
})


// POST /api/owners/:id/pets

app.post('/owners/:id/pets', (req, res) => {
    const id = req.params.id;

    let owner = owners.find((owner) => {
        return owner.id === Number(id);
    });
    
    // owner.pets = [];

    owner.pets.push({
        petID: petPrimaryId,
        name: req.body.name,
        type: req.body.type
    })

    petPrimaryId++;

    res.status(200).json({
        message: "Your pet is added"
    })
})

// PUT /api/owners/:id/pets/:petId

// DELETE /api/owners/:id/pets/:petId


app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})