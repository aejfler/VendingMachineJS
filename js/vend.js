class Product {
    constructor() {
        this.products = []
    }
    addProduct = (key_id, name, price) => {this.products.push({
        key_id: key_id,
        name: name,
        price: price,
        amount: 20
        })
    }
}

class VendingMachine extends Product{
    ifProductExists;
    insertedCoins;
    moneyChange;
    constructor(addProduct) {
        super(addProduct);
        this.moneyForChange = 150;
        this.moneyPaid = 0;
    }
    showProducts() {
        console.log(this.products);
    }

    order() {
        let orderNum = prompt("Enter a product's number?");
        let orderNumber = parseInt(orderNum)
        this.ifProductExists = this.products.find(function(product) {
            if(product.key_id === orderNumber) {
                return product
            }
        })
        if (!this.ifProductExists) {
            throw new Error('Enter a correct product number!');
        }
            console.log(`You've selected ${this.ifProductExists.name}. Please pay ${this.ifProductExists.price} PLN`);
            this.moneyPayment()
    }
    orderValidation(){
        try{
            this.order();
        }
        catch (e){
            alert(e)
            console.log(e);
            return this.order()
        }
    }

    paymentMethods(){
        // for future development
    }

    messageInsert(){
        let message = prompt(`Insert ${this.ifProductExists.price}`)
        this.insertedCoins = parseFloat(message)
        this.errorCoinsValidation()
    }
    coinsValidation() {
        const allowedCoins = [0.10, 0.20, 0.50, 1, 2, 5];
        if (allowedCoins.includes(this.insertedCoins)) {
            return true
        }else if (!allowedCoins.includes((this.insertedCoins))){
            alert('This coin is not allowed, please enter a correct one!')
            this.order();
        }
    }
    errorCoinsValidation(){
        try {
            this.coinsValidation()
        } catch (err) {
            alert(err)
            }
        }
    
    change() {
        if (this.insertedCoins > this.ifProductExists.price) {
            this.moneyPaid = this.moneyPaid + this.insertedCoins;
            this.moneyChange = (this.moneyPaid - this.ifProductExists.price).toFixed(2);
            console.log(`Thanks for purchasing ${this.ifProductExists.name}! Your change: ${this.moneyChange} PLN`);
        }
    }

    moneyPayment(){
        this.messageInsert()
        if(this.insertedCoins < this.ifProductExists.price) {
            while (this.insertedCoins < this.ifProductExists.price) {
                let result = this.ifProductExists.price - this.insertedCoins
                let putNewCoin = prompt(`for purchase left ${result} to insert`);
                this.insertedCoins += parseFloat(putNewCoin)//.toPrecision(2);

                if (this.insertedCoins >= this.ifProductExists.price) {
                    this.change()
                    break
                }
            }
        }else if (this.insertedCoins > this.ifProductExists.price) {
            this.change()
        }else if (this.insertedCoins === this.ifProductExists.price) {
             console.log(`Thanks for purchasing ${this.ifProductExists.name}!`)
        }
    }

    updateAmount(){
        let updated =  this.ifProductExists.amount -= 1
        console.log("product's amount after purchase:", updated)
        return this.ifProductExists.amount
    }

    updateMoneyForChange() {
        let updatedMoney = this.moneyForChange + this.ifProductExists.price
        console.log('Money for change: ' + updatedMoney)
        return this.moneyForChange
        }
    }


const vend1 = new VendingMachine();
vend1.addProduct(1, "mars", 3.50)
vend1.addProduct(2, "7days", 4.50);
vend1.addProduct(3, "Pepsi", 8.00);
vend1.addProduct(4, "DZIK energy drink", 4)
vend1.addProduct(5, "Lay's", 5.50)
vend1.addProduct(6, "sparkling water 0.5l", 2)

vend1.showProducts();
vend1.orderValidation();
vend1.updateMoneyForChange();
vend1.updateAmount()
