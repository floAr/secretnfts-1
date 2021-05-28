require("dotenv").config();
const cc = require("cryptocompare");

const fetchSCRTPrice = (callback) => {
    cc.setApiKey(process.env.CC_API_KEY);
    const currencies = ["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "RUB", "BRL", "CZK"];
    cc.price("SCRT", currencies).then((prices) => {
        callback(prices);
    }).catch(console.error);

    setInterval(() => {
        cc.price("SCRT", currencies).then((prices) => {
            callback(prices);
        }).catch(console.error);
    }, 1000 * 60 * 5); // 5min
};

module.exports = {
    fetchSCRTPrice,
};
