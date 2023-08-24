var argv = require("yargs")
.command("hello", "Kullanıcıları Selamlar...", function(yargs){
    yargs.options({
        name: {
            demand: true,
            description: "Adınızı gireceğiniz argümandır!",
            alias: "n",
            type: string
        },
        lastname: {
            demand: true,
            description: "Soyisminizi gireceğiniz argümandır!",
            alias: "l",
            type: string
        }
    })
    .command("command", "uygulama açıklaması..", function(yargs){

    })
    .help("help");
}).help("help")
.argv;
var command = argv._[0];

if (command === "hello" && typeof argv.name !== 'undefined' && typeof argv.lastname !== 'undefined') {
    console.log("Hello " + argv.name + " " + argv.lastname + "!");
} else if (command === "hello" && typeof argv.name !== 'undefined') {
    console.log("Hello " + argv.name + "!");
} else if (command === "hello") {
    console.log("Hello World!");
}

// console.log(argv._);
// console.log(argv.name);
// console.log(argv.surname);