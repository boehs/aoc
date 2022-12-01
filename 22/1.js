// Largest
document.body.textContent
    .split('\n\n')
    .map(item => item
        .split('\n')
        .map(Number)
        .reduce((e,t) => e+t))
    .sort((a, b) => b - a)[0]

/// Golfed
document.body.textContent.split("\n\n").map(t=>t.split("\n").map(t=>+t).reduce((t,e)=>t+e)).sort((t,e)=>e-t)[0]

// Top Three
document.body.textContent
    .split('\n\n')
    .map(item => item
        .split('\n')
        .map(Number)
        .reduce((e,t) => e+t))
    .sort((a, b) => b - a)
    .slice(0,2)
    .reduce((e,t) => e+t)
    
/// Golfed
document.body.textContent.split("\n\n").map(e=>e.split("\n").map(e=>+e).reduce((e,t)=>e+t)).sort((e,t)=>t-e).slice(0,2).reduce((e,t)=>e+t);
