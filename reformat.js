//This is the file that will reformat the data of data.json and put it in a new file
//called data-transformed-jacob.json


//change these two variable to change what to read and write to
var readFile = "./data.json"
var writeFile = "./data-transformed-jacob.json"

//require statements
var original = require(readFile);
var fs = require('fs');


//the new format variable for each transaction to be pushed onto
var newFormat = [];

//loop over each transaction
for (var i = 0; i < original.length; i++) {
  var transaction = original[i];
  var customer = transaction.customer;
  var order = transaction.order;

  //trying to clean up the funky json data. Ends up in an array with each fields
  //an array entry
  var stringOrder = JSON.stringify(order);
  var arrayOrder = stringOrder.split(':');
  stringOrder = arrayOrder.toString();
  arrayOrder = stringOrder.split(',');

  //remove uneccesary brackets
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


  //the orders varibale where each order will be pushed onto
  var orders = [];

  //loop over the cleaned json data 5 entries ata time (each order has 5 fields)
  for (var x = 0; x < arrayOrder.length; x = x + 5) {

    //the item name is the first field but it contains unecessary quotations
    var item = arrayOrder[x].replace("\"", "");
    //quantity is the third field
    var quantity = Number(arrayOrder[x + 2]);
    //price is the 5th
    var price = Number(arrayOrder[x + 4]);
    //revenue is just the two multiplied together
    var revenue = quantity * price;

    //push new order onto orders variable
    var reformattedOrder = {
      "item": item.replace("\"", ""),
      "quantity": quantity,
      "price": price,
      "revenue": revenue
    };
    orders.push(reformattedOrder);
  }

  //push reformatted transaction onto newFormat
  var reformat = {
    "id": transaction.id,
    "vendor": transaction.vendor,
    "date": transaction.date,
    "customerId": customer.id,
    "order": orders
  }

  newFormat.push(reformat);
}

//write to the file with one space as the offset. Output the error on error
//output file was saved on succes
fs.writeFile(writeFile, JSON.stringify(newFormat, null, ' '),
  function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved to " + writeFile);
  });