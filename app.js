var storage = require("node-persist");
var crypto = require("crypto-js");
storage.initSync();
var argv = require("yargs")
    .command("create", "Yeni bir hesap oluşturur..", function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                typeof: 'string',
                description: 'Hesap adı girilicek (Twitter, Facebook)..'
            },
            username: {
                demand: true,
                alias: 'u',
                typeof: 'string',
                description: 'Hesabın kullanıcı adı ya da email adresi..'
            },
            password: {
                demand: true,
                alias: 'p',
                typeof: 'string',
                description: 'Hesabınıza ait parola..'
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                typeof: 'string',
                description: 'İşlem yapabilmek için gerekli olan şifredir!'
            }
        }).help('help');
    })
    .command("get", "Var olan hesabı getirir..", function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: "n",
                typeof: 'string',
                description: "Hesap adı girilicek (Twitter, Facebook).."
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                typeof: 'string',
                description: 'İşlem yapabilmek için gerekli olan şifredir!'
            }
        }).help("help")
    }).help("help")
    .argv;

var command = argv._[0];


function getAccounts(masterPassword) {

    var encryptedAccounts = storage.getItemSync("accounts");
    var accounts = [];

    if (typeof encryptedAccounts !== "undefined") {
        var bytes = crypto.AES.decrypt(encryptedAccounts, masterPassword);
        accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
    }

    return accounts;
}

function saveAccounts(accounts, masterPassword) {

    var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);

    storage.setItemSync('accounts', encryptedAccounts.toString());

    return accounts;

}

function createAccount(account, masterPassword) {

    var accounts = getAccounts(masterPassword);

    accounts.push(account);

    saveAccounts(accounts, masterPassword);

    return account;
}

function getAccount(accountName, masterPassword) {

    var accounts = getAccounts(masterPassword);

    var matchedAccount;

    accounts.forEach(function (account) {
        if (account.name === accountName) {
            matchedAccount = account;
        }
    })

    return matchedAccount;

}

if (command === "create" && typeof argv.name !== "undefined" && argv.name.length > 0 && typeof argv.username !== "undefined" && argv.username.length > 0 && typeof argv.password !== "undefined" && typeof argv.masterPassword !== "undefined" && argv.masterPassword.length > 0) {

    try {
        var createdAccount = createAccount({
            name: argv.name,
            username: argv.username,
            password: argv.password
        }, argv.masterPassword);

        console.log("Hesap oluşturuldu..." + createdAccount);

    } catch (error) {
        console.log("Hesap oluşturulamadı!");
    }


} else if (command === "get" && typeof argv.name !== "undefined" && argv.name.length > 0 && typeof argv.masterPassword !== "undefined" && argv.masterPassword.length > 0) {

    try {

        var account = getAccount(argv.name, argv.masterPassword);

        if (typeof account !== "undefined") {
            console.log(account);
        } else {
            console.log("Aradığınız kayıt bulunamamıştır!");
        }

    } catch (error) {
        console.log("Hesap getirilemedi!");
    }

} else {
    console.log("Lütfen komut giriniz!");
}


// create 
//      --name
//      --username
//      --password

// get
//      --name

/*
    account.name : Twitter,
    account.userName : user123!,
    account.password : password123!
*/


