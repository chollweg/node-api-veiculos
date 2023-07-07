const { MongoClient, ObjectId } = require("mongodb");
let singleton;

let connect = async () => {
  if (singleton) return singleton;

  const client = new MongoClient(process.env.DB_URL);

  await client.connect();

  singleton = client.db(process.env.DB_NAME);

  return singleton;
};

let findAll = async (collection) => {
  const db = await connect();
  return await db.collection(collection).find().toArray();
};

let findOne = async (collection, _id) => {
  const db = await connect();
  let obj = await db
    .collection(collection)
    .find({ _id: new ObjectId(_id) })
    .toArray();
  if (obj) return obj[0];
  return false;
};

let insertOne = async (collection, object) => {
  const db = await connect();
  return await db.collection(collection).insertOne(object);
};

let deleteOne = async (collection, _id) => {
  const db = await connect();
  return await db.collection(collection).deleteOne({ _id: new ObjectId(_id) });
};

let updateOne = async (param, object) => {
  const db = await connect();
  return await db
    .collection(process.env.DB_COLLECTION)
    .updateOne({ placa: param }, { $set: object });
};

module.exports = { findAll, findOne, insertOne, deleteOne, updateOne };
