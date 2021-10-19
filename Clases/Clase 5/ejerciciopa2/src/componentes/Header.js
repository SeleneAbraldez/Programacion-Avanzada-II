import { Component } from "react";
//representa las carreras y el numero de materias

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <h1>{this.props.titulo}</h1>
            </div>
        );
    }
}

export default Header;