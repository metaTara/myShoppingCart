// cartItems object
const cartItems = {};

//FUNCTION: displayProducts : iterates through 'products' object in products.js. Event-listner is added to each 'Add To Cart' button and appended to the html element.
function displayProducts() {
	let newElement, eachProduct, productsDiv;
	
    productsDiv = document.getElementById("products"); // Products HTML element
	for (i in products) {
		// each product Wrapper
		eachProductWrapper = document.createElement("div");
		eachProductWrapper.dataset.id = i;
		eachProductWrapper.className = "col mb-2";
		// each product card
		eachProduct = document.createElement("div");
		eachProduct.dataset.id = i;
		eachProduct.className = "card h-100";
		eachProduct.style = "max-width: 15rem;";
		eachProduct.innerHTML += `
                    <img id='product_image' src='${products[i].imgURL}'/>
                    <div class = "card-body">
                    <h5 class='card-title'> ${products[i].name}</h5>
                    <div id='product_description'> ${products[i].description}</div>
                    <h6> $${products[i].price}<h6></div>
                `;
		// creating Add to cart button and adding addEventListner event
		newElement = document.createElement("button");
		newElement.innerHTML = "Add to Cart";
		newElement.type = "button";
		newElement.dataset.id = i;
		newElement.className = "btn btn-success m-2";
		newElement.addEventListener("click", addToCart);
		eachProduct.appendChild(newElement);
		eachProductWrapper.appendChild(eachProduct);
		productsDiv.appendChild(eachProductWrapper);
	}
	displayCart();
}

// FUNCTION: called when 'Add to Cart' is clicked.
// checks if item exits in the cart. It it does, the quantity is incremented else it is set to 1.
const addToCart = (e) => {
	let key = e.target.dataset.id; // item to be added to cart
	if (key) {
		if (cartItems[key]) {
			console.log("existing item", cartItems);
			cartItems[key] += 1;
		} else {
			console.log("new item");
			cartItems[key] = 1;
		}

		displayCart();
	}
};

//FUNCTION: displayCart : displays the cart items. Eventlistner is added for Quantity and Remove-item button.
function displayCart() {
    // elements variables
	let newElement,
		c_tr,
		c_th,
		c_td,
        cartDiv,
        cartTable;
    // increament and total variables
    let count = 1,
        subTotal = 0,
        totalPrice = 0;

	cartDiv = document.getElementById("cart"); // Cart HTML element

	if (Object.entries(cartItems).length === 0) {
		cartDiv.innerHTML = "Cart is empty!";
	} else {
		// add cart items:
		cartDiv.innerHTML = "";
		cartTable = document.createElement("table");
		cartTable.className = "table table-sm";
		cartTable.innerHTML = `
                    <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead> `;

		cartTableBody = document.createElement("tbody");
        // iterating through cartItems to disply in the table body.
		for (let key in cartItems) {
            // calculating subTotal and totalPrice
			subTotal = products[key].price * cartItems[key];
			totalPrice += subTotal;

			c_tr = document.createElement("tr");
			c_th = document.createElement("th");
			c_th.scope = "row";
			c_th.innerHTML = count;
			c_tr.appendChild(c_th);

			c_td = document.createElement("td");
			c_td.innerHTML = products[key].name; // item name
			c_tr.appendChild(c_td);
			
			c_td = document.createElement("td");
			newElement = document.createElement("input"); // item quantity element
			newElement.id = "itemQuantity";
			newElement.type = "number";
			newElement.min = 1;
			newElement.dataset.id = key;
			newElement.value = cartItems[key];
			newElement.addEventListener("change", updateTotals); // updating cart if quantity changes
			newElement.innerHTML = cartItems[key];
			c_td.appendChild(newElement);
			c_tr.appendChild(c_td);

			c_td = document.createElement("td");
			c_td.innerHTML = `$${products[key].price}`; // item price
			c_tr.appendChild(c_td);

			c_td = document.createElement("td");
            c_td.id = `subTotal_${key}`;
			c_td.innerHTML = `$${subTotal}`; // item subTotal
			c_tr.appendChild(c_td);

			c_td = document.createElement("td");
			newElement = document.createElement("button");
			newElement.innerHTML = "X";
			newElement.type = "button";
			newElement.dataset.id = key;
			newElement.className = "btn btn-danger btn-sm";
			newElement.addEventListener("click", removeFromCart); // removing item from Cart if clicked
			c_td.appendChild(newElement);
			c_tr.appendChild(c_td);

			cartTableBody.appendChild(c_tr);
			count += 1; // items counter
		}

		cartTable.appendChild(cartTableBody);
		cartDiv.appendChild(cartTable);

		//displaying Total
		newElement = document.createElement("div");
        newElement.id = `total`;
		newElement.className = "container text-end";
		newElement.innerHTML = `<h5 class="me-5">Total : $${totalPrice}<h5>`;
		cartDiv.appendChild(newElement);
	}
}

//FUNCTION: removeFromCart : called when X button is clicked on an item.
const removeFromCart = (e) => {
	let key = e.target.dataset.id; // item to delete
	if (key) {
		delete cartItems[key];
		displayCart();
	}
};

//FUNCTION: updateTotals : called when Quantity changes for an item. Totals are recalcualted.
const updateTotals = (e) => {
    let totalsElement, subTotal=0, totalPrice=0;
	let newQuantity = e.target.value;
    let key = e.target.dataset.id;

    if (newQuantity > 0) {
        cartItems[key] = Number(newQuantity);
        subTotal = products[key].price * newQuantity;
        totalsElement = document.getElementById(`subTotal_${key}`); // redo subtotal
        totalsElement.innerHTML = `$${subTotal}`;
        for (key in cartItems) {
            totalPrice += products[key].price * cartItems[key];
        }
        document.getElementById(`total`).innerHTML = `<h5 class="me-5">Total : $${totalPrice}<h5>`; // redo total
    }
};

window.addEventListener("DOMContentLoaded", displayProducts);
