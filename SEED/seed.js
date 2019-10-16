//kies het aantal telefoons
var chooseSeedAmount = 16

//in de terminal -> node seed.js
//in de terminal -> mongoimport --db=smartphoneshop --collection=phones --type=json --file=phones.json --jsonArray

var fs = require('fs');

var phones = []

const brands = ["Apple", "Samsung", "Nokia", "Alcatel", "Sony", "Huawei", "Xiaomi", "Honor", "ASUS", "Lenovo"]
const models = ["X", " Galaxy S10", "3310", "P90", "Gorilla 5", "Redmi", "Switch 3", "Pro 2", "Gova", "Reyo"]
const colors = ["black", "white", "pink", "orange", "yellow", "green", "blue", "silver", "red", "purple"]
const prices = [99, 199, 299, 399, 499, 599, 699, 799, 899, 999]
const images = ["apple.jpg", "samsung.jpg", "nokia.jpg", "alcatel.jpg", "sony.jpg", "huawei.jpg", "xiaomi.jpg", "honor.jpg", "asus.jpg", "lenovo.jpg"]

for (i = 0; i < chooseSeedAmount; i++) {
    var randomBrand = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    var randomModel = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    var randomColor = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    var randomPrice = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    var randomImage = Math.floor(Math.random() * (9 - 0 + 1)) + 0;

    var phone = {
        brand: brands[randomBrand],
        model: models[randomModel],
        color: colors[randomColor],
        price: prices[randomPrice],
        image: images[randomImage],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }

    phones.push(phone)

}

var json = JSON.stringify(phones);

fs.writeFile('phones.json', json, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
});

console.log(phones)

