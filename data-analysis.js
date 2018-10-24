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

for (var i = 0; i < data.length; i++) {

  var transaction = data[i];

  var transactionRevenue = 0;

  october = false;
  if (transaction.date.substring(0, 2) == "10") {
    october = true;
  }


  for (var j = 0; j < transaction.order.length; j++) {
    var order = transaction.order[j];

    //hat check
    if (order.item === "hat") {
      hatCount += order.quantity;
    }

    //ice check
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


  totalRevenue += transactionRevenue;

}

console.log(vendors);
var bestIceCustomer = iceCustomers[findBiggestNumber(iceCustomerCount)]
var bestVendor = vendors[findBiggestNumber(vendorRevenue)]
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

function findMatch(array, match) {
  for (var x = 0; x < array.length; x++) {
    if (array[x] === match) {
      return x;
    }
  }
  return -1;
}