const { getDatabase } = require('../database');
const COLLECTION_NAME = 'products';

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  save() {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME).findOne({ name: this.name })
        .then(existing => {
          if (existing) {
            return Promise.reject(new Error('Product already exists'));
          }
          return db.collection(COLLECTION_NAME).insertOne(this);
        });
  }

  static fetchAll() {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME).find().toArray();
  }
}

module.exports = Product;
