'use strict';

// get the images to update with new products
var firstImage = document.getElementById('firstImage');
var secondImage = document.getElementById('secondImage');
var thirdImage = document.getElementById('thirdImage');

// make a place to store potential products to show
var productList=[];

// constructor for our Product
function Product(picture){
  this.picture=picture;
  this.timesDisplayed=0;
  this.timesSelected=0;
  productList.push(this);
}

// List of products from our images
new Product('img/bag.jpg');
new Product('img/banana.jpg');
new Product('img/bathroom.jpg');
new Product('img/boots.jpg');
new Product('img/breakfast.jpg');
new Product('img/bubblegum.jpg');
new Product('img/chair.jpg');
new Product('img/cthulhu.jpg');
new Product('img/dog-duck.jpg');
new Product('img/dragon.jpg');
new Product('img/pen.jpg');
new Product('img/pet-sweep.jpg');
new Product('img/scissors.jpg');
new Product('img/shark.jpg');
new Product('img/sweep.png');
new Product('img/tauntaun.jpg');
new Product('img/unicorn.jpg');
new Product('img/usb.gif');
new Product('img/water-can.jpg');
new Product('img/wine-glass.jpg');


// Setup variables so showNewProducts can use them and the click events can too
var lastProducts = [];
var firstProduct;
var secondProduct;
var thirdProduct;
var showCount = 0;

function showNewProducts() {
  // see if the user has voted enough
  if(showCount === 25) {
    // re-populate the product list so we can show all the products
    for(var i=0; i < lastProducts.length; i++) {
      productList.push(lastProducts.shift());
    }
    renderResults();
    return;
  }

  // If the user is on their 2nd vote, we need to add the 1st products displayed back into the list of available products
  if(lastProducts.length > 3) {
    productList.push(lastProducts.shift());
    productList.push(lastProducts.shift());
    productList.push(lastProducts.shift());
  }

  // Randomly choose three products and remove them from the list of potential products to show
  var firstSlot = Math.floor(Math.random()*productList.length);
  firstProduct = productList[firstSlot];
  productList.splice(firstSlot,1);

  var secondSlot = Math.floor(Math.random()*productList.length);
  secondProduct = productList[secondSlot];
  productList.splice(secondSlot,1);

  var thirdSlot = Math.floor(Math.random()*productList.length);
  thirdProduct = productList[thirdSlot];
  productList.splice(thirdSlot,1);

  // display our three products on the page
  firstImage.src=firstProduct.picture;
  firstProduct.timesDisplayed++;

  secondImage.src=secondProduct.picture;
  secondProduct.timesDisplayed++;

  thirdImage.src=thirdProduct.picture;
  thirdProduct.timesDisplayed++;  

  // store the shown products so we can add them back in later
  lastProducts.push(firstProduct);
  lastProducts.push(secondProduct);
  lastProducts.push(thirdProduct);

  showCount++;
}

// Make our images clickable and register the correct vote for each product shown
firstImage.addEventListener('click', function() {
  firstProduct.timesSelected++;
  showNewProducts();
});

secondImage.addEventListener('click', function() {
  secondProduct.timesSelected++;
  showNewProducts();
});

thirdImage.addEventListener('click', function() {
  thirdProduct.timesSelected++;
  showNewProducts();
});


function renderResults() {
  // clear the images being shown
  document.getElementById('images').innerHTML = '';

  // log the amount of votes for each product
  for(var i = 0; i < productList.length; i++) {
    console.log(productList[i].picture + ' was voted on ' + productList[i].timesSelected);
  }
}

showNewProducts();