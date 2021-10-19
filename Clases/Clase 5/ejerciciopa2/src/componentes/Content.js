import { Component } from "react";
import Carrera from "../componentes/Carrera" ;
//representa las carreras y el numero de materias
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        // podemos descontructuurasr de esta amnera en vez de usar el this.state y el this.props.carrProg
        // let {carrProg, materiasProg, carrSist, materiasSist, carrLic, materiasLic} = this.props;
    }

    render() {
        return (
            <>
                {
                    this.props.carreras.map((c, index) => <Carrera key={index} carrera={c} />)
                }
            </>
        );
    }
}

export default Content;

