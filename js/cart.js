// cartItems object
const cartItems = {};

//FUNCTION: displayProducts : iterates through 'products' object in products.js. Event-listner is added to each 'Add To Cart' button and appended to the html element.
function displayProducts() {
	let temp, eachProduct;
	let productsDiv = document.getElementById("products"); // Products HTML element
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
                    <div id='product_name'><h5 class='card-title card-body'> ${products[i].name}</h5></div>
                    <div id='product_description' class='card-body'> ${products[i].description}</div>
                    <div id='product_price' class='card-body'> $${products[i].price}</div>
                `;
		// creating Add to cart button and adding addEventListner event
		temp = document.createElement("button");
		temp.innerHTML = "Add to cart";
		temp.type = "button";
		temp.dataset.id = i;
		temp.className = "btn btn-primary m-2";
		temp.addEventListener("click", addToCart);
		eachProduct.appendChild(temp);
		eachProductWrapper.appendChild(eachProduct);
		productsDiv.appendChild(eachProductWrapper);
	}
	displayCart();
}

// FUNCTION: called when 'Add to Cart' is clicked.
// checks if item exits in the cart. It it does, the quantity is incremented else it is set to 1.
const addToCart = (e) => {
	let temp;
	temp = e.target.dataset.id; // element to be added to cart
	if (temp) {
		if (cartItems[temp]) {
			console.log("existing item", cartItems);
			cartItems[temp] += 1;
		} else {
			console.log("new item");
			cartItems[temp] = 1;
		}

		displayCart();
	}
};

//FUNCTION: displayCart : displays the cart items. Eventlistner is added for Quantity and Remove-item button.
function displayCart() {
	let temp,
		c_tr,
		c_th,
		c_td,
		count = 1,
		subTotal = 0,
		totalPrice = 0;
	let cartDiv, cartTable;

	cartDiv = document.getElementById("cart"); // Cart HTML element

	if (Object.entries(cartItems).length === 0) {
		cartDiv.innerHTML = "Cart is empty!";
	} else {
		// add cart items:
		cartDiv.innerHTML = "";
		cartTable = document.createElement("table");
		cartTable.className = "table";
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
			temp = document.createElement("input"); // item quantity element
			temp.id = "itemQuantity";
			temp.type = "number";
			temp.min = 1;
			temp.dataset.id = key;
			temp.value = cartItems[key];
			temp.addEventListener("change", updateCart); // updating cart if quantity changes
			temp.innerHTML = cartItems[key];
			c_td.appendChild(temp);
			c_tr.appendChild(c_td);

			c_td = document.createElement("td");
			c_td.innerHTML = `$${products[key].price}`; // item price
			c_tr.appendChild(c_td);

			c_td = document.createElement("td");
			c_td.innerHTML = `$${subTotal}`; // item subTotal
			c_tr.appendChild(c_td);

			c_td = document.createElement("td");
			temp = document.createElement("button");
			temp.innerHTML = "X";
			temp.type = "button";
			temp.dataset.id = key;
			temp.className = "btn btn-primary";
			temp.addEventListener("click", removeFromCart); // removing item from Cart if clicked
			c_td.appendChild(temp);
			c_tr.appendChild(c_td);

			cartTableBody.appendChild(c_tr);
			count += 1; // items counter
		}

		cartTable.appendChild(cartTableBody);
		cartDiv.appendChild(cartTable);

		//displaying Total
		temp = document.createElement("div");
		temp.className = "container d-flex justify-content-end";
		temp.innerHTML = `<h5>Total : $${totalPrice}<h5>`;
		cartDiv.appendChild(temp);
	}
}

//FUNCTION: removeFromCart : called when X button is clicked on an item.
const removeFromCart = (e) => {
	let temp;

	temp = e.target.dataset.id; // item to delete
	if (temp) {
		delete cartItems[temp];
		displayCart();
	}
};

//FUNCTION: updateCart : called when Quantity changes for an item
const updateCart = (e) => {
	let temp;

	temp = e.target.value;
    if (temp) {
        cartItems[e.target.dataset.id] = Number(temp);
        displayCart();
    }
};

window.addEventListener("DOMContentLoaded", displayProducts);
