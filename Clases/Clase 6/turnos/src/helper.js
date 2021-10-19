export function crearCondiciones(diabetes, obesidad, asma){
    let rta = "";
    rta += diabetes?"diabetes ":"";
    rta += obesidad?"obesidad ":"";
    rta += asma?"asma ":"";

    return rta;
}