const { MongoClient } = require('mongodb');

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).end();
    } else {
    if(req.method === "POST"){
        
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.NEXT_PUBLIC_DATABASE_USER}:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@${process.env.NEXT_PUBLIC_DATABASE}/?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );  
        const coll = client.db('goit-platform').collection('classrooms');
        const data = req.body;
        const filter = {"idRoom": data.idRoom};
        const cursor = coll.find(filter);
        const result = await cursor.toArray();
        const data2 = [data.task, ...result[0].tasks];
        const tasks = data2 ? {"tasks": data2} : {}
        await coll.updateOne(
        {idRoom: data.idRoom},
            {
                $set: { ...tasks},
                $currentDate: { lastModified: true }
            }
        )
        await client.close();
        res.status(200).json("")
    }else{
        res.status(405).json({message:"Це не для цього"})
    }
}
}