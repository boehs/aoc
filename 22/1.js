// Largest
document.body.textContent
    .split('\n\n')
    .map(item => item.split('\n'))
    .reduce((a, b) => Math.max(a, b.reduce((p, c) => p + Number(c), 0)), -Infinity);

/// Golfed
document.body.textContent.split("\n\n").map((e=>e.split("\n"))).reduce(((e,t)=>Math.max(e,t.reduce(((e,t)=>e+ +t),0))),0)
