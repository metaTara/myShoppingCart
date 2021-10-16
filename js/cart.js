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

window.addEventListener("DOMContentLoaded", displayProducts);
