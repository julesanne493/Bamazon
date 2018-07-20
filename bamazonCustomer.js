var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table')

var connection = mysql.createConnection({
  host: "localhost",

  port: 8889,

  user: "root",

  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  listItems();
});

function listItems() {
  var table = new Table ({
    head: ["item_id", "product_name", "department_name", "price", "stock_quantity"],
  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
  , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
  , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
  , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
  })
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
    var choiceArray = [];
    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].item_id,
        results[i].product_name,
        results[i].department_name,
        results[i].price,
        results[i].stock_quantity
      ])
      choiceArray.push(results[i]);
    }
    console.log(table.toString());

    bidPrompt();

  });

}

function bidPrompt() {
    inquirer
    .prompt({
        name: "buyItem",
        type: "confirm",
        message: "Would you like to purchase an item?"
    })
    .then(function(){
      itemSelect();
    })
  
}

function itemSelect () {
    inquirer
    .prompt({
        name: "selectItem",
        type: "input",
        message: "Please enter the item_id of the item you would like to bid on."
    })
    .then(function(answer) {
      connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
       for (var i = 0; i < results.length; i++) {
          chosenItem = results[i].item_id;
          var stockQuantity = results[i].stock_quantity;
          var itemPrice = results[i].price;
          if(answer.selectItem == chosenItem) {
            inquirer
            .prompt({
              name:"confirmItem",
              type: "confirm",
              message: "You have selected: " + results[i].product_name + " for $" + results[i].price +  ". Is that correct?"
            })
            .then(function() {
             
              inquirer
              .prompt({
                name: "itemAmount",
                type: "input",
                message: "How many units would you like to purchase?"
              })
              .then(function(answer){
                var newQuantity = stockQuantity - answer.itemAmount;
                var totalPrice = (answer.itemAmount * itemPrice);
                connection.query("SELECT * FROM products", function(err, results) {
                  if (err) throw err;
                    if(answer.itemAmount <= stockQuantity){
                      console.log("Great! Your total is $" + totalPrice + ".")
                      connection.query (
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_quantity: newQuantity,
                          },
                          {
                            item_id: chosenItem
                          }
                        ]
                      )
                      listItems();
                    }
                    
                    else {
                      console.log("Sorry, insufficient quantity!");
                    }
              });
            });
          });
          
      };
      
    };
  });
});
}








