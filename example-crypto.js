var crypto = require("crypto-js");

var message = "Şifrelenecek olan mesaj...";
var key = "1q2w3e";

//Encrypt

var sifreliMesaj = crypto.AES.encrypt(message, key);
console.log("Şifreli Metin: " + sifreliMesaj);

//Decrypt

var bytes = crypto.AES.decrypt(sifreliMesaj, key);
var decryptedMessage = bytes.toString(crypto.enc.Utf8);

console.log("Deşifrelenmiş Metin: " + decryptedMessage);