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
let page = document.body.id;

switch(page){
  case 'js-amazon':
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
          <select class="js-quantity-selector-${product.id}">
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


    // let cartHTML = ``;


    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
      button.addEventListener('click', () => {
        // dataset gives us all the data attributes that are attached to this button element.
        // console.log(button.dataset.productName);
        // Notice that the data attribute's name gets converted from kebab-case to camelCase in the dataset
        // const productName = button.dataset.productName;
        const productId = button.dataset.productId;
        let matchingItem;

        const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

        cart.forEach((item) => {
          // if(productName === item.productName) {
          if(productId === item.productId) {  
            matchingItem = item;
          }
        });

        if(matchingItem) {
          matchingItem.quantity += selectedQuantity;
        } else {
          cart.push({
            // productName: productName,
            productId: productId,
            quantity: selectedQuantity
          });
        }

        let cartQuantity = 0;

        cart.forEach((item) => {
          cartQuantity += item.quantity;
        });

      // console.log(cartQuantity);
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
      

      let cartHTML = ``;
      let totalCost = 0;
      cart.forEach((item, itemIndex) => {
        const index = products.findIndex(obj => obj['id'] === item.productId);

        cartHTML += `
        <div class="cart-item-container">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>
  
          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${products[index].image}">
  
            <div class="cart-item-details">
              <div class="product-name">
              ${products[index].name}
              </div>
              <div class="product-price">
                $${products[index].priceCents / 100}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${item.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary">
                  Delete
                </span>
              </div>
            </div>
  
            <div class="delivery-options">
              <div class="delivery-options-title"> 
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked
                  class="delivery-option-input"
                  name="delivery-option-${itemIndex}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${itemIndex}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${itemIndex}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

        totalCost += (products[index].priceCents / 100) * (cart[itemIndex].quantity);
        
      });
      console.log(totalCost);
      console.log(cartHTML);
      localStorage.setItem('cartHTML',cartHTML);
      localStorage.setItem('totalCost',totalCost);
    });
      // console.log(cartHTML); //Out of Scope
    });


    break;

  case 'js-checkout':
    const checkoutHTML = localStorage.getItem('cartHTML');
    const totalCost = localStorage.getItem('totalCost');
    // console.log(cartHTML);
    document.querySelector('.js-order-summary').innerHTML = checkoutHTML;

    const orderTotal = Number(totalCost) + Number((totalCost * 0.1).toFixed(2));

    document.querySelector('.payment-summary').innerHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${totalCost}</div>
      </div>

      <!--<div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$4.99</div>
      </div>-->

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${totalCost}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${(totalCost * 0.1).toFixed(2)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${orderTotal}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>`;
    break;
}

