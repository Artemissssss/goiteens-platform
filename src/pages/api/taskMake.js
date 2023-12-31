const { MongoClient } = require('mongodb');

export default async function handler(req, res) {
    if(req.method === "POST"){
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.NEXT_PUBLIC_DATABASE_USER}:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@${process.env.NEXT_PUBLIC_DATABASE}/?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );  
        const coll = client.db('goit-platform').collection('classrooms');
        const data = req.body;
        const material = data.material ? {"material": data.material} : {}
        await coll.updateOne(
        {idRoom: data.idRoom},
            {
                $set: { ...material},
                $currentDate: { lastModified: true }
            }
        )
        await client.close();
        res.status(200).json("")
    }else{
        res.status(405).json({message:"Це не для цього"})
    }
}