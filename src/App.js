import React from "react";
import background from "./image/backGMap.jpg";
import logo from './logo.svg'; 
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";

const data = [
    { id: 1, cantidad: "1", producto: "Harina de Maiz" , precio: "4,500" },
    { id: 2, cantidad: "1", producto: "Harina de Trigo" , precio: "3,800" },
    { id: 3, cantidad: "1", producto: "Azucar" , precio: "4,800" },
    { id: 4, cantidad: "1", producto: "Mantequilla" , precio: "3,200" },
    { id: 5, cantidad: "1", producto: "Pastas" , precio: "6,200" },
    { id: 6, cantidad: "1", producto: "Arroz" , precio: "3,200" },
];

class App extends React.Component {
    state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
        id: "",
        cantidad: "",
        producto: "",
        precio: "",
    },
};

    mostrarModalActualizar = (dato) => {
    this.setState({
        form: dato,
        modalActualizar: true,
    });
};

    cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
};

    mostrarModalInsertar = () => {
    this.setState({
        modalInsertar: true,
    });
};

    cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
};

    editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
        if (dato.id == registro.id) {
            arreglo[contador].cantidad = dato.cantidad;
            arreglo[contador].producto = dato.producto;
            arreglo[contador].precio = dato.precio;
        }
        contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
};

    eliminar = (dato) => {
    var opcion = window.confirm("Seguro de eliminar el registro "+dato.id);
        if (opcion == true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
            if (dato.id == registro.id) {
            arreglo.splice(contador, 1);
        }
        contador++;
});
    this.setState({ data: arreglo, modalActualizar: false });
    }
};

    insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
}

    handleChange = (e) => {
    this.setState({
        form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
    },
    });
};

    render() {
    
    return (
        <>
        <Container>
        <br />
            <Button color="info" onClick={()=>this.mostrarModalInsertar()}>Crear nuevo registro</Button>
            <center><Button color="light"><h2>Lista para controlar mercado</h2></Button></center>
            <br />
            <br />
            <table class="table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Cantidad</th>
                <th>Producto</th>
                <th>Precio Unitario</th>
                <th>Acción</th>
                </tr>
            </thead>

            <tbody>
                {this.state.data.map((dato) => (
                <tr key={dato.id}>
                    <td>{dato.id}</td>
                    <td>{dato.cantidad}</td>
                    <td>{dato.producto}</td>
                    <td>{dato.precio}</td>
                    <td>                    
                    <Button color="success" onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button>
                    {"     "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
            <ModalHeader>
            <div><h3>Editar Registro</h3></div>
        </ModalHeader>

        <ModalBody>
            <FormGroup>
            <label>
                Id:
            </label>
            
            <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
            />
            </FormGroup>
            
            <FormGroup>
            <label>
                Cantidad: 
            </label>
            <input
                className="form-control"
                name="cantidad"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.cantidad}
            />
            </FormGroup>
            
            <FormGroup>
                <label>
                    Producto: 
                </label>
                <input
                className="form-control"
                name="producto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.producto}
            />
            </FormGroup>

            <FormGroup>
                <label>
                    Precio: 
                </label>
                <input
                className="form-control"
                name="precio"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.precio}
            />
            </FormGroup>
            </ModalBody>

            <ModalFooter>
            <Button
                color="primary"
                onClick={() => this.editar(this.state.form)}
            >
                Editar
            </Button>
            <Button
                color="danger"
                onClick={() => this.cerrarModalActualizar()}
            >
                Cancelar
            </Button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader>
            <div><h3>Insertar Item</h3></div>
            </ModalHeader>

            <ModalBody>
            <FormGroup>
                <label>
                Id: 
                </label>
            
                <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
            />
            </FormGroup>
            
            <FormGroup>
                <label>
                Cantidad: 
                </label>
                <input
                className="form-control"
                name="cantidad"
                type="text"
                onChange={this.handleChange}
            />
            </FormGroup>
            
            <FormGroup>
                <label>
                    Producto: 
                </label>
                <input
                className="form-control"
                name="producto"
                type="text"
                onChange={this.handleChange}
            />
            </FormGroup>

            <FormGroup>
                <label>
                    Precio: 
                </label>
                <input
                className="form-control"
                name="precio"
                type="text"
                onChange={this.handleChange}
            />
            </FormGroup>
            </ModalBody>

            <ModalFooter>
            <Button
                color="primary"
                onClick={() => this.insertar()}
            >
                Insertar
            </Button>
            <Button
                className="btn btn-danger"
                onClick={() => this.cerrarModalInsertar()}
            >
                Cancelar
            </Button>
            </ModalFooter>
        </Modal>
        </>
    );
    }
}
export default App;
