# Ventera Developer Challenge

I decided to use javascript for my language because I hadn't parsed files with it before

To reformat the data I created a file called reformat.js.
The tricky part of the program was reformatting the order field because it
was not classic json data, each order had different fields. To solve this problem
I stringified the json, split it, transformed the array back into a string, then
split it again and removed some brackets. After doing all this I finally had the
individual fields and was able to format the information. Then I wrote to a
file called data-transformed-jacob.

On assumption I made was on the confusion sorrounding the wording of the order
field. In the spec it says to name the field "details" but in the data-transformed
file its called "order" I thought it made more sense to keep it the same as
before and even with the data-transformed file and called it "order".

To run it I used my already downloaded node and in the command prompt wrote

  node reformat.js

I already have some libraries installed but I think both fs and require come with
basic node and those are the only ones you need.


I wrote the data analysis in the data-analysis file

assumptions: No two vendors have the same revenue. If they do the first vendor
is outputed

No two customers bought the same amount of ice in october, if they do the first
customer who bought ice in october is outputed.
