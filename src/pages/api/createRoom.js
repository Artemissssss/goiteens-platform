const { MongoClient, ObjectId } = require('mongodb');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.method === "POST"){
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.NEXT_PUBLIC_DATABASE_USER}:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@${process.env.NEXT_PUBLIC_DATABASE}/?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );  
        const coll = client.db('goit-platform').collection('classrooms');
        const result = await coll.insertOne(req.body)
        await client.close();
        res.status(200)
    }else{
        res.status(405).json({message:"Це не для цього"})
    }
}
