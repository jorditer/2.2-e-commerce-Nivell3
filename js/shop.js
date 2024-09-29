// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    for (let product of products) {
        if (product.id === id) {
            let carProduct = cart.find(obj => obj.id == id);
            if (carProduct){
                carProduct.quantity++;
            } else {
                cart.push({...product, quantity : 1});
            }
            break;
        }
    }
}
// 1. Loop for to the array products to get the item to add to cart
// 2. Add found product to the cart array

// Exercise 2
function cleanCart() {
    cart.length = 0;
	total = 0;
    printCart();
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
	total = 0;
    for (let product of cart){
        total += (product.price * product.quantity);
    }
	total = total.toFixed(2);
}

// Exercise 4
// Si l'usuari/ària compra 3 o més ampolles d'oli, el preu del producte es rebaixa un 20%.
// Quan es compren 10 o més productes per a fer pastissos, el preu del producte es rebaixa un 30%.
function applyPromotionsCart() {
	for (let product of cart){
		if (product.id === 1){  //cooking oil
            if (product.quantity >= 3) {
                product.price = products.find(product => product.id == 1).price * 0.8;
            } else {
                product.price = products.find(product => product.id == 1).price;  // Si quito del carrito y ahora es < 3 quitar descuento
            }
		} else if (product.id === 3){ //muffins
            if (product.quantity >= 10){
                product.price = products.find(product => product.id == 3).price * 0.7;
            } else {
                product.price = products.find(product => product.id == 3).price; // Si quito del carrito y ahora es < 10 quitar descuento
            }
		}
	}
}

// Exercise 5
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    const totalPrice = document.querySelector('#total_price');
    totalPrice.innerText = `${total}`;
    const tbody = document.querySelector('#cart_list');
    tbody.innerHTML = '';
    let cartHTML = '';
    for (const item of cart){
        cartHTML += 
            `<tr>
                <th scope=row>${item.name}</th>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
                <td><button class="btn btn-primary" onclick=removeFromCart(${item.id})>Remove</button><td> 
            </tr>`;
    }
    tbody.insertAdjacentHTML('beforeend', cartHTML)
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
    for (const [index, item] of cart.entries()){
        if (item.id == id) {
            if (item.quantity > 1){
                item.quantity--;
            } else {
                cart.splice(index, 1);
            }
            break;
        }
    }
    open_modal();
}

function open_modal() {
	calculateTotal();
	applyPromotionsCart();
    printCart();
}