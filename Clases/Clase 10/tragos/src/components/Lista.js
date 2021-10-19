import React, { useContext } from 'react';
import { CoctelesContext } from '../context/CoctelesContext';
import Trago from './Trago';

const Lista = () => {

    const { resultados } = useContext(CoctelesContext);

    return (
        <div className="row mt-5">
            {
                resultados.map(trag => <Trago key={trag.idDrink}>{trag}</Trago>)
            }
        </div>
    );
}

export default Lista;