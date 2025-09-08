//Quote API Start
const fetchQuoteBy = () => {
    fetch('https://api.adviceslip.com/advice')
    .then((response) => response.json())
    .then((data)=>{
        document.getElementById("quote-return")!.innerText = data.slip.advice;
        console.log(data);
    })
    .catch((error)=>{
        console.error('Error fetching advice: , error');
    });
}

document.getElementById("quote")?.addEventListener("click",fetchQuoteBy);
