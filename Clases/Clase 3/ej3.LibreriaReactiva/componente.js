export default class Componente {
    //reutilizar el estado, recibir el template y el selector 
    constructor(options) {
        this.selector = options.selector;
        this.state = options.state;
        this.template = options.template;
    }

    render() {
        //elemento del dom para que sea general
        const $elDOM = document.querySelector(this.selector);
        $elDOM.innerHTML = "";
        $elDOM.appendChild(this.template(this.state));
    }

    setState(nuevoEstado) {
        for (const key in nuevoEstado) {
            if (Object.hasOwnProperty.call(this.state, key)) {
                this.state[key] = nuevoEstado[key];
            }
        }
        this.render();
    }

    getState() {
        return JSON.parse(JSON.stringify(this.state));
    }

}

