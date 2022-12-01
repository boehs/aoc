// Largest
document.body.textContent
    .split('\n\n')
    .map(item => item.split('\n'))
    .reduce((a, b) => Math.max(a, b.reduce((p, c) => p + Number(c), 0)), 0);

/// Golfed
document.body.textContent.split("\n\n").map((e=>e.split("\n"))).reduce(((e,t)=>Math.max(e,t.reduce(((e,t)=>e+ +t),0))),0)

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
