export const possibilities: ((type: string, number: string | number) => string)[] = [
    (a,b) => `{${a}=>${b}}`,
    (a,b) => `<${a.charAt(0)}>${b}</${a.charAt(0)}>`,
    (a,b) => `${a}//${b}`,
    (a,b) => `//${b}`,
    (a,b) => `sub ${a.charAt(0)}{${b}}`,
    (a,b) => `$${a}=${b};`,
    (a,b) => `/*${b}*/`,
    (a,b) => `{:${a} ${b}}`,
    (a,b) => `int ${a.charAt(0)}=${b};`,
    (a,b) => `var ${a.charAt(0)}=${b};`,
    (a,b) => `${a.charAt(0)}(${b})`,
    (a,b) => `0x0000|${b}`,
    (a,b) => `0xffff&${b}`,
    (a,b) => `0.0.0.0:${b}`,
    (a,b) => `/^${b}$/`,
    (a,b) => `λ${a.charAt(0)}.${b}`,
    (a,b) => `${b}`,
    (a,b) => `{'${a}': ${b}}`
]