class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let amount = 0;
    for (const transaction of this.transactions) {
      amount += transaction.value;
    }
    return amount;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return false;
    };
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction {
  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }

}

class Withdrawal extends Transaction {
  isAllowed() {
    if (this.amount > this.account.balance) return false;
    return true;
  }

  get value() {
    return -this.amount;
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

console.log('Balance:', myAccount.balance);

t2 = new Withdrawal(70.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

console.log('Balance:', myAccount.balance);
