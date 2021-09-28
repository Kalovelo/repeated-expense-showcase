conn = new Mongo();
db = conn.getDB(process.env.MONGO_INITDB_DATABASE);
db.createCollection('transactions');
db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [
    {
      role: 'readWrite',
      db: 'mongo'
    }
  ]
});
