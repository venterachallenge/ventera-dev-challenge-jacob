//This is the file that will reformat the data of data.json and put it in a new file
//called data-transformed-jacob.json


//change these two variable to change what to read and write to
var readFile = "./data.json"
var writeFile = "./data-transformed-jacob.json"
var original = require(readFile);
var fs = require('fs');



var newFormat = [];
for (var i = 0; i < original.length; i++) {
  var transaction = original[i];
  var customer = transaction.customer;
  var order = transaction.order;

  var stringOrder = JSON.stringify(order);
  var arrayOrder = stringOrder.split(':');
  stringOrder = arrayOrder.toString();
  arrayOrder = stringOrder.split(',');

  for (var x = 0; x < arrayOrder.length; x++) {
    if (~arrayOrder[x].indexOf("{")) {
      arrayOrder[x] = arrayOrder[x].substring(1, arrayOrder[x].length);
    }
    if (~arrayOrder[x].indexOf("}")) {
      arrayOrder[x] = arrayOrder[x].substring(0, arrayOrder[x].length - 1);
    }
  }

  //remove the last '}' that for some reason wasnt getting removed
  arrayOrder[arrayOrder.length - 1] = arrayOrder[arrayOrder.length - 1].substring(0, 1);


  var orders = [];
  for (var x = 0; x < arrayOrder.length; x = x + 5) {

    var item = arrayOrder[x].replace("\"", "");
    var quantity = Number(arrayOrder[x + 2]);
    var price = Number(arrayOrder[x + 4]);
    var revenue = quantity * price;

    var reformattedOrder = {
      "item": item.replace("\"", ""),
      "quantity": quantity,
      "price": price,
      "revenue": revenue
    };
    orders.push(reformattedOrder);
  }

  var reformat = {
    "id": transaction.id,
    "vendor": transaction.vendor,
    "date": transaction.date,
    "customerId": customer.id,
    "order": orders
  }

  newFormat.push(reformat);
}

fs.writeFile(writeFile, JSON.stringify(newFormat, null, ' '),
  function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved to " + writeFile);
  });