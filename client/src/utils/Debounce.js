export const Debounce=(fn, delay)=>{
let timer;
return function(...args){
    
    clearTimeout(timer);
    timer=setTimeout(()=>{
        fn(...args)
    },delay);
}
}