const express = require('express');
const { getData, writeData } = require('./db')
const { find, findIndex } = require('./utils/utils')

async function run() {
    const app = express();
    app.use(express.json());

    let people = await getData();

    console.log('The initial data', people);

    app.get('/', (req, res) => {
        return res.send('Wellcome');
    });

    app.get('/person', (req, res) => {
        return res.send(people);
    });

    app.get('/person/:id', (req, res) => {
        const id = req.params.id;

        const p = find(id, people);

        if (!p) {
            return res.status(404).send('Person not found!');
        }

        return res.send(p);
    });

    app.put('/person/:id', async (req, res) => {
        console.log('body', req.body);
        console.log('people', people)

        // find the person
        const id = Number(req.params.id);
        const index = findIndex(id, people);

        // error if not found
        if (!people[index]) {
            return res.status(404).send('Person not found!');
        }

        // update the data
        people[index] = {
            id,
            ...req.body
        }
        try {
            await writeData(people);
        } catch (err) {
            return res.status(500).send(`Something bad happend!, ${err.message}`)
        }

        // return the person
        return res.send(people[index]);
    })

    app.post('/person', async (req, res) => {
        // id
        console.log(people.map(item => item.id));
        const id = Math.max(...people.map(item => item.id)) + 1;
        const person = {
            id,
            ...req.body
        };

        console.log('person', person);

        if (!id) {
            return res.status(500);
        }

        console.log('..........')

        // push to array
        people.push(person)

        console.log('..........', people)

        await writeData(people);

        // return the inserted person
        return res.send(person);
    });

    app.delete('/person/:id', async (req, res) => {
        // if not found error
        const id = req.params.id;
        const p = find(id, people)

        if (!p) {
            return res.status(404);
        }
        // delete from people

        people = people.filter(item => item.id !== Number(id));

        await writeData(people);

        //return deleted object
        return res.send(p);

    })

    app.listen(3000, () => {
        console.log('Start listening on 3000');
    })
}

run();