const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token('body', (req, res) => {
    if (req.method === "POST")
    {
        return JSON.stringify(req.body)
    }

    return ""
})
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
}))

let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(data)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = data.find(p => p.id == id)

    if (person)
    {
        response.json(person)
    }
    else
    {
        response.status(404).json({ 
            error: "A person with that id was unable to be found" 
        })
    }
})

app.get("/api/info", (request, response) => {
    response.send(`Phonebook has info for ${data.length} people<br/>${Date()}`)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    data = data.filter(p => p.id != id)

    response.status(204).end
})

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body) {
        return response.status(400).json({ 
            error: 'body missing' 
        })
    }

    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }

    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }

    if (data.filter(p => p.name.toLowerCase() === body.name.toLowerCase()).length > 0)
    {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    // Generate a new id
    let newId = 0
    do {
        newId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    } while (data.filter(p => p.id == newId).length != 0)

    const newPerson = {
        id: newId,
        name: body.name,
        number: body.number
    }

    data.push(newPerson)
    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})