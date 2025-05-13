const { getDatabase } = require('../database');
const COLLECTION_NAME = 'carts';

class Cart {
  constructor(userId) {
    this.userId = userId;
  }

  addItem(product) {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME).findOne({ userId: this.userId })
        .then(cart => {
          if (!cart) {
            return db.collection(COLLECTION_NAME).insertOne({
              userId: this.userId,
              items: [product]
            });
          } else {
            cart.items.push(product);
            return db.collection(COLLECTION_NAME).updateOne(
                { userId: this.userId },
                { $set: { items: cart.items } }
            );
          }
        });
  }

  static getCart(userId) {
    const db = getDatabase();
    return db.collection(COLLECTION_NAME).findOne({ userId });
  }
}

module.exports = Cart;
