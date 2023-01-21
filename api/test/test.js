const myDB = require("../db/db");

myDB.create("akash", 100);
myDB.create("rasel", 100);
myDB.create("robi", 100);
myDB.create("hasan", 100);
myDB.create("ashik", 100);
myDB.create("manik", 100);
myDB.bulkCreate("nayem", 50, 2);

const get = myDB.draw(2);
console.log(get);
