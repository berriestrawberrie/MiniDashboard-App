
const quoteReturn = document.getElementById("quote-return")!;
//TYPE THE RESPONSE & QUOTE FUNCTION
type AdviceResponse = {
    slip:{
        id:number;
        advice:string;
    }
}
type QuoteFunction = ()=>void;

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

const delayAPI = (callback: QuoteFunction) =>{
    //DISPLAY WAIT MESSAGE
    quoteReturn.innerText = "loading..."
    //WAIT 2SEC THEN DO API CALL
    setTimeout(()=>{
       callback(); 
    },2000);
}

document.getElementById("quote")?.addEventListener("click",()=>{
  delayAPI(fetchQuoteBy);
});
//fetchQuoteBy();

// --- Weather API ---
async function fetchWeather(city: string = 'Stockholm'): Promise<string> {
  try {
    const res = await fetch(`https://wttr.in/${city}?format=3`);
    return await res.text();
  } catch {
    return '⚠️ Weather unavailable';
  }
}

// --- Initialize ---
async function init() {
  const cityInput = document.getElementById('cityInput') as HTMLInputElement;
  const weatherText = document.getElementById('weather')!;
  const getWeatherBtn = document.getElementById('getWeather')!;

  const defaultCity = cityInput.value.trim() || 'Stockholm';
  weatherText.textContent = '📍 ' + (await fetchWeather(defaultCity));

  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return alert('Please enter a city!');
    weatherText.textContent = '📍 ' + (await fetchWeather(city));
  });
}

// --- DOM Events ---
document.addEventListener('DOMContentLoaded', () => {
  init();
});

