'use strict';

// constructor for our Product
function Product(picture, name){
  this.picture=picture;
  this.name=name;
  this.timesDisplayed=0;
  this.timesSelected=0;
  productList.push(this);
}

// get the images to update with new products
var firstImage = document.getElementById('firstImage');
var secondImage = document.getElementById('secondImage');
var thirdImage = document.getElementById('thirdImage');

var firstImageLabel = document.getElementById('firstImageLabel');
var secondImageLabel = document.getElementById('secondImageLabel');
var thirdImageLabel = document.getElementById('thirdImageLabel');
// make a place to store potential products to show
var productList=JSON.parse(window.localStorage.getItem('productList'));

if(productList === null) {
  productList = [];

  // List of products from our images
  new Product('img/bag.jpg', 'bag');
  new Product('img/banana.jpg', 'banana');
  new Product('img/bathroom.jpg', 'bathroom');
  new Product('img/boots.jpg', 'boots');
  new Product('img/breakfast.jpg', 'breakfast');
  new Product('img/bubblegum.jpg', 'bubblegum');
  new Product('img/chair.jpg', 'chair');
  new Product('img/cthulhu.jpg', 'cthulhu');
  new Product('img/dog-duck.jpg', 'dog duck');
  new Product('img/dragon.jpg', 'dragon');
  new Product('img/pen.jpg', 'pen');
  new Product('img/pet-sweep.jpg', 'pet-s');
  new Product('img/scissors.jpg', 'scissors');
  new Product('img/shark.jpg', 'shark');
  new Product('img/sweep.png', 'sweep');
  new Product('img/tauntaun.jpg', 'tauntaun');
  new Product('img/unicorn.jpg', 'unicorn');
  new Product('img/usb.gif', 'usb');
  new Product('img/water-can.jpg', 'water');
  new Product('img/wine-glass.jpg', 'wine-g');
}


// Setup variables so showNewProducts can use them and the click events can too
var lastProducts = [];
var firstProduct;
var secondProduct;
var thirdProduct;
var showCount = 0;
var votesUntilShowResults = 2;

function showNewProducts() {
  window.localStorage.setItem('productList', JSON.stringify(productList));
  // see if the user has voted enough
  if(showCount === votesUntilShowResults) {
    // re-populate the product list so we can show all the products
    for(var i=0; i < lastProducts.length; i++) {
      productList.push(lastProducts[i]);
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
  firstImageLabel.innerHTML=firstProduct.name;
  firstProduct.timesDisplayed++;

  secondImage.src=secondProduct.picture;
  secondImageLabel.innerHTML=secondProduct.name;
  secondProduct.timesDisplayed++;

  thirdImage.src=thirdProduct.picture;
  thirdImageLabel.innerHTML=thirdProduct.name;
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
  window.localStorage.setItem('productList', JSON.stringify(productList));
  document.getElementById('images').innerHTML = '';
  var results = document.getElementById('results');

  // log the amount of votes for each product
  for(var i = 0; i < productList.length; i++) {
    var li = document.createElement('li');
    li.innerHTML = productList[i].timesSelected + ' votes for the ' + productList[i].name;
    results.appendChild(li);
  }

  renderChart();
}

function renderChart() {
  var resultsGraph = document.getElementById('resultsGraph').getContext('2d');
  var chartLabels = [];
  var chartData = [];

  for(var i = 0; i < productList.length; i++) {
    chartLabels.push(productList[i].name);
    chartData.push(productList[i].timesSelected);
  }

  new Chart(resultsGraph, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Product vote totals',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: chartData,
      }]
    },
  });
}
showNewProducts();