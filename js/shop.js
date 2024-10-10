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
let cart = [];
let items = 0;
let total = 0;
const cartElement = document.getElementById("count_product");

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
    items++;
    cartElement.innerText = items.toString();
}
// 1. Loop for to the array products to get the item to add to cart
// 2. Add found product to the cart array

// Exercise 2
function cleanCart() {
    cart.length = 0;
	total = 0;
    items = 0;
    cartElement.innerText = items.toString();
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
// const discountRules = [
//     { id: 1, min: 3, discount: 0.8 },  // cooking oil
//     { id: 3, min: 10, discount: 0.7 }  // muffins
// ];

// function applyPromotionsCart() {
//     for (let product of cart) {
//         const originalPrice = products.find(p => p.id === product.id).price;
//         const discountRule = discountRules.find(rule => rule.id === product.id);

//         if (discountRule && product.quantity >= discountRule.min) {
//             product.price = originalPrice * discountRule.discount;
//         } else {
//             product.price = originalPrice;
//         }
//     }
// }

function applyPromotionsCart() {
    for (let product of cart) {
        // Initialize originalPrice if it doesn't exist
        if (!product.originalPrice) {
            product.originalPrice = product.price;
        }

        if (product.offer) {
            if (product.offer.number <= product.quantity) {
                product.price = product.originalPrice * (1 - product.offer.percent / 100);
            } else {
                // Reset to original price if the offer condition is not met
                product.price = product.originalPrice;
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
                <td><button class="remove-button btn btn-primary" onclick=removeFromCart(${item.id})>Remove</button><td> 
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
    items--;
    cartElement.innerText = items.toString();
    open_modal();
}

function open_modal() {
	calculateTotal();
	applyPromotionsCart();
    printCart();
}
