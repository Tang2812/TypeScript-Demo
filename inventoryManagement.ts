
class Item {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public quantity: number
    ) { }

    getTotalValue(): number {
        return this.price * this.quantity;
    }
}


// PerishableItem extend Item
class PerishableItem extends Item {
    constructor(
        id: number,
        name: string,
        price: number,
        quantity: number,
        public expirationDate: Date
    ) {
        super(id, name, price, quantity);
    }

    override getTotalValue(): number {
        const currentDate = new Date();
        if (currentDate > this.expirationDate) {
            return 0;
        }
        return super.getTotalValue();
    }
}

// DigitalItem extend Item
class DigitalItem extends Item {
    constructor(
        id: number,
        name: string,
        price: number,
        quantity: number,
        public fileSize: number,
        public licenseKey: string
    ) {
        super(id, name, price, quantity);
    }

   override getTotalValue(): number {
        return this.price * this.quantity;
    }
}

// Inventory
class Inventory {
    private items: Item[] = [];

    addItem(item: Item): void {
        this.items.push(item);
    }

    getInventoryValue(): number {
        let inventoryValue: number = 0;

        this.items.forEach(item => {
            inventoryValue = inventoryValue + item.getTotalValue();
        });
        return inventoryValue
    }

    getItemById(id: number): Item | undefined {
        return this.items.find(item => item.id === id);
    }
}


// Example
const inventory = new Inventory();

const item = new Item(1, "TV Sony", 20, 5);
const perishableItem = new PerishableItem(2, "LG fridge", 10, 2, new Date("2024-12-12"));
const digitalItem = new DigitalItem(3, "Iphone 13 promax", 15, 2, 50, "IP291234");

inventory.addItem(item);
inventory.addItem(perishableItem);
inventory.addItem(digitalItem);

// Calculating total inventory value
console.log("Total Inventory Value:", inventory.getInventoryValue());

// Finding an item by ID
console.log("Item with ID 2:", inventory.getItemById(2));
