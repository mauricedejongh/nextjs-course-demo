// These api routes are only run on the server, never on the client. So the code will never be exposed to the client.
// If a request is send to the URL with the named segment of the route, the function in the file will trigger.

import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;

        // Below connect method returns a promise, so we can await it
        const client = await MongoClient.connect('mongodb+srv://maurice:QSM8GOuq0JNawvXR@cluster1.bk5yuje.mongodb.net/?retryWrites=true&w=majority');
        const db = client.db();

        // With collection we can create like a table, if you are used to SQL
        const meetupsCollection = db.collection('meetups');
        // With insertOne we can insert one document (or entry) into the connection. It's a query command.
        const result = await meetupsCollection.insertOne({data});

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;