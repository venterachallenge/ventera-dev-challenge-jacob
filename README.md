# Ventera Developer Challenge

This is the work of Jacob Heuman

I decided to use javascript to code in because I hadn't parsed files with it before.

You can run both scripts by running the shell script called "runBoth.sh". To be able to run the script you need execute permissions on the file.

I ran the shell in git bash like this:

```
./runBoth.sh
```

To reformat the data I created a file called reformat.js.
The tricky part of the program was reformatting the order field because it
was not classic json data, each order had different fields. To solve this problem
I stringified the json, split it, transformed the array back into a string, then
split it again and removed some brackets. After doing all this I finally had the
individual fields and was able to format the information. Then I wrote to a
file called data-transformed-jacob.

One assumption I made was on the confusion sorrounding the wording of the order
field. In the spec it says to name the field "details" but in the data-transformed
file its called "order" I thought it made more sense to keep it the same as
before and the same as data-transformed file and called it "order".

To run it I used my already downloaded Node.js and in the command prompt wrote

```
node reformat.js
```


I already have some libraries installed but I think both fs and require come with
basic node package and those are the only ones you need.


I wrote the data analysis in the data-analysis file. This one was a bit more straightforward than reformatting. To be able to keep track of all the output I first had to initialize some variables. Finding the hat count is the easiest, just add the quantity of hats bought to the count every time an order includes "hat"

Total Revenue is just as simple add up the revenue for each order, and then add up each transactions revenue to total revenue.

The vendor with the most revenue and the best ice customer are both equally tricky. I created two matched arrays for each one (kind of like a hash) and stored the revenue for each store in the corresponding index location. When I was looping though each transaction I would either push a new vendor/customer to the array or add the correct amount to the correct index with use of a helper function to find the index.

After the transaction loop was done I checked what index had the highest value and found the correct identifier.

assumptions: No two vendors have the same revenue. If they do the first vendor
is outputed

No two customers bought the same amount of ice in october, if they do the first
customer who bought ice in october is outputed.

The program can be run with:

```
node data-analysis.js
```

and requires the same libraries as the other program. It currently outputs to output.json
