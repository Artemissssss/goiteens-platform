const { MongoClient } = require('mongodb');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.NEXT_PUBLIC_DATABASE_USER}:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@${process.env.NEXT_PUBLIC_DATABASE}/?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );  
        const coll = client.db('goit-platform').collection('classrooms');
        const cursor = coll.find({});
        const result = await cursor.toArray();
        await client.close();
        res.status(200).json(result)
}