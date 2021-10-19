import React from 'react';

const Formulario = () => {
    return (
        <form>
            <label htmlFor="origen"> Origen: </label>
            <select id="origen" name="origen">
                <option value="">-- Ingrese origen -- </option>
                <option value="americano">Americano</option>
                <option value="asiatico">Asiatico</option>
                <option value="europeo">Europeo</option>
            </select>


            <label htmlFor="modelo"> Año Modelo: </label>
            <select id="modelo" name="modelo">
                <option value="">-- Ingrese Año -- </option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="europeo">Europeo</option>
            </select>

            <input type="radio" value="basico" name="plan" /> Basico <br />
            <input type="radio" value="completo" name="plan" /> Completo <br />

            <input type="submit" value="cotizar" />
        </form>
    );
}

export default Formulario;