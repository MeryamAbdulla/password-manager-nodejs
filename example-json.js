var person = {
    name : "Meryem",
    lastName : "Abdulla"
}

console.log(person);
console.log(typeof person);

// JSON'a çevirmek...

var jsonObject = JSON.stringify(person);

console.log(jsonObject);
console.log(typeof jsonObject);

// Object'e çevirmek

var object = JSON.parse(jsonObject);

console.log(object);
console.log(typeof object);