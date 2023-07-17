const { MongoClient, ObjectId } = require('mongodb');

export default async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', 'https://goiteens-platform-doc.vercel.app');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  console.log(req.body);
  console.log(req.method);

  if (req.method === 'POST') {
    const data = req.body;
    if (data.login === process.env.NEXT_PUBLIC_ADMIN && data.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      res.status(200).json([{ status: 1 }, { idRoom: undefined }]);
    } else {
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.NEXT_PUBLIC_DATABASE_USER}:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@${process.env.NEXT_PUBLIC_DATABASE}/?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      const coll = client.db('goit-platform').collection('users');
      const filter = { login: data.login };
      const cursor = coll.find(filter);
      const result = await cursor.toArray();
      await client.close();
      if (result[0] && result[0].password === data.password) {
        res.status(200).json([{ status: result[0].status }, { idRoom: result[0].idRoom }]);
      } else {
        res.status(403).json([{ status: 0 }, { idRoom: undefined }]);
      }
    }
  } else {
    res.status(405).json({ message: 'Це не для цього' });
  }
}
