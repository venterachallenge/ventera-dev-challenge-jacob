//this is the file that will analyze the reformated data

//change these two variable to change what to read and write to
var readFile = "./data-transformed.json"
var writeFile = "./output.json"

var data = require(readFile);
var fs = require('fs');

//initializing variables
var hatCount = 0;
var totalRevenue = 0;
var vendors = [];
var vendorRevenue = []
var iceCustomers = [];
var iceCustomerCount = [];
var october = false;

//loop through all transactions
for (var i = 0; i < data.length; i++) {

  var transaction = data[i];

  //total revenue for this transaction.
  var transactionRevenue = 0;

  //if the date has a 10 at the beginning it is october
  october = false;
  if (transaction.date.substring(0, 2) == "10") {
    october = true;
  }

  //loop through all the orders in the transaction
  for (var j = 0; j < transaction.order.length; j++) {
    var order = transaction.order[j];

    //hat check
    if (order.item === "hat") {
      hatCount += order.quantity;
    }

    //check if its october and the item is ice then add quantity to correct customer
    if (order.item = "ice" && october) {
      var index = findMatch(iceCustomers, transaction.customerId)
      if (index == -1) {
        iceCustomers.push(transaction.customerId);
        iceCustomerCount.push(order.quantity);
      } else {
        iceCustomerCount[index] += order.quantity;
      }
    }


    //revenue addition
    transactionRevenue += order.revenue;

  }

  //add the transactions revenue to the correct vendor
  var vendorIndex = findMatch(vendors, transaction.vendor)
  if (vendorIndex == -1) {
    vendors.push(transaction.vendor);
    vendorRevenue.push(transactionRevenue);
  } else {
    vendorRevenue[vendorIndex] += transactionRevenue;
  }

  //add to total revenue
  totalRevenue += transactionRevenue;

}

//find the best ice customer of october
var bestIceCustomer = iceCustomers[findBiggestNumber(iceCustomerCount)]
//find the vendor with the most revenue
var bestVendor = vendors[findBiggestNumber(vendorRevenue)]
//the output
var output = {
  "TotalRevenue": totalRevenue,
  "BestVendor": bestVendor,
  "HatsSold": hatCount,
  "CustomerIceOctober": bestIceCustomer
}

//write to the file with one space as the offset. Output the error on error
//output file was saved on succes
fs.writeFile(writeFile, JSON.stringify(output, null, ' '),
  function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved to " + writeFile);
  });


//helper functinos

//find the biggest number in the array and return its index
function findBiggestNumber(array) {
  var index = 0;
  var max = 0
  for (var x = 0; x < array.length; x++) {
    if (array[x] > max) {
      max = array[x];
    }
    index = x;
  }

  return index;
}

//if a match is found return the index if not return -1
function findMatch(array, match) {
  for (var x = 0; x < array.length; x++) {
    if (array[x] === match) {
      return x;
    }
  }
  return -1;
}