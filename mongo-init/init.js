conn = new Mongo();
db = conn.getDB("mongo");
db.createCollection('transactions');
db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: 'readWrite',
      db: 'mongo'
    }
  ]
});
