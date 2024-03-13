const eventSchema = {
    type: 'object',
    required: ['name', 'contactEmail', 'numberOfTicketsAvailable'],
    properties: {
        name: { type: 'string', minLength: 1, maxLength: 50 },
        contactEmail: { type: 'string', format: 'email', maxLength: 100 },
        numberOfTicketsAvailable: { type: 'integer', minimum: 0, maximum: 100000 },
    },
    additionalProperties: false,
}

const petAdoptionApplicationSchema = {
    type: 'object',
    required: ['name', 'petType', 'otherPets'],
    properties: {
        name: { type: 'string', minLength: 2, maxLength: 50 },
        petType: { type: 'string', enum: ['dog', 'cat', 'rat'] },
        otherPets: {
            type: 'array',
            items: {
                type: 'string',
                enum: ['dog', 'cat', 'rat', 'iguana', 'bird'],
            },
            uniqueItems: true,
        },
        preferredPetAge: { type: 'string', enum: ['puppy/kitten', 'adult', 'senior'] }
    }
}

module.exports = {
    eventSchema,
    petAdoptionApplicationSchema,
}

/*
    {
        name: "Shaun", // must be string 2 < length < 20
        pizzas: [{
            size: 'large', // small, medium, large
            toppings: ['pepperoni', 'olives'], // unique!
            crust: 'thick' // thick or thin
        }]
    }
*/

/*
    {
        totalCost: 40.10,
        estimatedWaitTime: 45
    }
*/