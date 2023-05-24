// 1. SAVE THE DATA
/*
const products = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090 //JS has problem calculating precise float numbers. so, we use cents for dollars.
}, {
  image: 'images/products/intermediate-composite-basketball.jpg',
  name: 'Intermediate Size Basketball',
  rating: {
    stars: 4,
    count: 127
  },
  priceCents: 2095
}, {
  image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name: 'Adults Plain Cotton T-Shirt - 2 Pack',
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799
}, {
  image: 'images/products/black-2-slot-toaster.jpg',
  name: '2 Slot Toaster - Black',
  rating: {
    stars: 5,
    count: 2197
  },
  priceCents: 1899
}];
*/

// 2. GENERATE THE HTML - (using Javascript for all the products in the html)

let productsHTML = '';  // Combine all the HTML together
// And then put it on the webpage(using DOM)

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents / 100).toFixed(2)} 
    </div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>`;

});

// console.log(productsHTML);

document.querySelector('.js-products-grid').innerHTML = productsHTML;

// 3.MAKE IT INTERACTIVE

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    // dataset gives us all the data attributes that are attached to this button element.
    // console.log(button.dataset.productName);
    // Notice that the data attribute's name gets converted from kebab-case to camelCase in the dataset
    // const productName = button.dataset.productName;
    const productId = button.dataset.productId;
    let matchingItem;

    cart.forEach((item) => {
      // if(productName === item.productName) {
      if(productId === item.productId) {  
        matchingItem = item;
      }
    });

    if(matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        // productName: productName,
        productId: productId,
        quantity: 1
      });
    }

    

    console.log(cart);
  });
});