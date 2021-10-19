import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

// https://material-ui.com/es/components/modal/
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Trago = ({ children }) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { idDrink, strDrink, strDrinkThumb } = children;
    const { setId, receta, setFlagReceta } = useContext(ModalContext);

    const handlerClick = () => {
        setId(idDrink);
        setFlagReceta(true);
        handleOpen();
    }

    return (<>
        <div className="col-md-4 mb-3">
            <div className="card ">
                <h2 className="card-header">{strDrink}</h2>
                <img src={strDrinkThumb} alt={`img de ${strDrink}`} className="card-img-top" />
                <div className="card-body">
                    <button className="btn btn-primary w-100" onClick={handlerClick}>Traer Receta</button>
                    <Modal
                        open={open}
                        onClose={handleClose}>
                            <div style={modalStyle} className={classes.paper}>
                                <h2>{receta.strDrink}</h2>
                            </div>
                    </Modal>
                </div>
            </div>
        </div>
    </>
    );
}

export default Trago;