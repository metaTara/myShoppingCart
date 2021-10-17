
# myShoppingCart
myShoppingCart is a simple shopping cart that can add and remove items from a shoping cart. The products are pre-populated form a file.
## Run Locally

Clone the project

```bash
  git clone https://github.com/metaTara/myShoppingCart.git
```

Go to the project directory

```bash
  cd myShoppingCart
```
Open the folder myShoppingCart in Visual Studio and run index.html on  Live Server to view the cart in action.

## Technologies used
- HTML
- Bootstrap 5
- JavaScript

## Documentaion

The code contains three main files:
- index.html : *HTML of the main page*
- products.js : *contains pre-populated array of products objects*
- cart.js : *Code for the cart*

#### Cart.js :
Contins the following functions -
- displayProducts 
- displayCart
- addToCart
- removeFromCart
- updateTotals

## Meeting requirements

1) products.js contains the list of products.
2) Products are displayed when the page loads.
FUNCTION: displayProducts().

3) Add to Cart buton adds products to the cart.
FUNCTION: addToCart()

4) Shopping cart lists all the products and the total price.
FUNCTION: displayCart()

5) User can delete an item from the cart.
FUNCTION: removeFromCart()

6) User can edit item quantities and the totals will update.
FUNCTION:  updateTotals

 The code is easy to modify as each cart functionality is clearly defined in the functions with corresponding name. 
 
 It can be reused by adding the cart.js and products.js files to any project and using : id="products" : and : id="cart" : in the HTML file where the product and cart are to be displayed.
