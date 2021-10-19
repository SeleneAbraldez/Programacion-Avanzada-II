const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => {
    if(!validarDivisor(b)){
        return a/b;
    }else{
        return null;
    }
};

const validarDivisor = (a) => {
    return a ? 1 : a ;
}

exports.sumar = sumar;
exports.restar = restar;
exports.multiplicar = multiplicar;
exports.dividir = dividir;
