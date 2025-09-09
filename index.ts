const quoteReturn = document.getElementById("quote-return")!;
type AdviceResponse = {
    slip:{
        id:number;
        advice:string;
    }
}
//Quote API Start
const fetchQuoteBy = ():void => {
    fetch('https://api.adviceslip.com/advice')
    .then((response: Response) => response.json() as Promise<AdviceResponse>)
    .then((data: AdviceResponse)=>{
       quoteReturn.innerText = data.slip.advice;
        console.log(data);
    })
    .catch((error:unknown)=>{
        console.error('Error fetching advice: , error');
    });
}


document.getElementById("quote")?.addEventListener("click",()=>{
    //DISPLAY WAIT MESSAGE
    quoteReturn.innerText = "loading..."
    //WAIT 2SEC THEN DO API CALL
    setTimeout(()=>{
       fetchQuoteBy(); 
    },2000);
});
//fetchQuoteBy();