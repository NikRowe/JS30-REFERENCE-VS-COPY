# JS30 References Vs Copying
Exercise 13 in WesBos' JavaScript30 tutorials. 

This seems simple but is absolutely key to remember and practice during your projects! 
Most array methods are considered "copies" not references, [...], Array.from(), .slice() will all create new copies of the array that do not mutate the original.
    
    const myArr = [ 'item1', 'item2', 'item3' ]
    let clone = [...myArr]
    clone[1] = 'newItem'

    clone[1] === myArr[1] 
    ? (console.log('this is reference not a clone'),
      console.table(myArr),
      console.table(clone)
     )
    : (console.log('this is a clone not a reference'),
      console.table(myArr),
      console.table(clone)
     )

When it comes to objects however, it goes another level deeper; you have 3 sort of levels if you will: 
 <ul>
    <li> Reference: that will mutate the original object at all levels. 
    <li> Shallow Copy: that will not mutate the first level of the original object but will mutate outside objects (references still exist). 
    <li> Deep Copy: that is completely independent from the original object. The nested levels of the new object will not mutate based on references of the original. 
 </ul>

Using a "poor mans" deep clone as demonstrated in the tutorial is not best practice because you will lost any JS property that doesn't have a JSON equivalent (Function, Infinity) causing them to be missed on the clone. 

<code>
const cloned = JSON.parse(JSON.stringify(original))
</code>
<br>
<br>
To better understand the differences I created my own function whatAmI(original, copy) that takes in 2 arguments and will compare the copy to the original on multiple levels and advise the user if the object is a reference, shallow copy, or deep copy. I then displayed it on a web page with selectors so that someone else attempting to understand the difference would be able to visualize it. 

    const whatAmI = (original, copy) => {
        console.clear()
        const logg = () => {
        console.log(`Original: `, original);
        console.log(`Copy: `, copy);
    };
    if (original.name === copy.name) {
        console.log("This is a reference");
        logg();
    } else if (original.info.rank === copy.info.rank) {
        console.log("This is a shallow copy");
        logg();
    } else {
        console.log("This is a deep copy");
        logg();
    }
};

<a href="">Demo</a>

Resources: <a href="https://flaviocopes.com/how-to-clone-javascript-object/">FlavioScopes</a> - <a href="https://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript/34624648">S.O.</a>
