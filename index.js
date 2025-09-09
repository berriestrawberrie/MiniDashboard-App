var _a;
var quoteReturn = document.getElementById("quote-return");
//Quote API Start
var fetchQuoteBy = function () {
    fetch('https://api.adviceslip.com/advice')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        quoteReturn.innerText = data.slip.advice;
        console.log(data);
    })
        .catch(function (error) {
        console.error('Error fetching advice: , error');
    });
};
(_a = document.getElementById("quote")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    //DISPLAY WAIT MESSAGE
    quoteReturn.innerText = "loading...";
    //WAIT 2SEC THEN DO API CALL
    setTimeout(function () {
        fetchQuoteBy();
    }, 2000);
});
//fetchQuoteBy();
