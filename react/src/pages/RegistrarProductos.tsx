import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Producto } from '../Interfaces/IProducto';
import { registrarProducto } from '../Firebase/Promesas';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Registro.module.css';

const initialState: Producto = {
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: 0,
    cantidad: 0
};

const RegistrarProducto: React.FC = () => {
    const [producto, setProducto] = useState<Producto>(initialState);
    const [error, setError] = useState<string | null>(null);

    const handleProducto = (name: string, value: string | number) => {
        setProducto({ ...producto, [name]: value });
    };

    const validarCampos = () => {
        if (
            !producto.nombre.trim() ||
            !producto.categoria.trim() ||
            !producto.descripcion.trim() ||
            producto.precio <= 0 ||
            producto.cantidad <= 0
        ) {
            return false;
        }
        return true;
    };

    const registrar = async () => {
        if (!validarCampos()) {
            setError("Todos los campos son obligatorios y deben ser válidos.");
            return;
        }

        try {
            await registrarProducto(producto);
            alert("Producto registrado con éxito");
            setProducto(initialState);
            setError(null);
        } catch (e) {
            console.error("Error al registrar:", e);
            setError("Algo ocurrió. Por favor, intenta nuevamente.");
        }
    };

    return (
        <div className={`d-flex justify-content-center align-items-center vh-100 ${styles.container}`}>
            <div className="card p-4" style={{ width: '400px' }}>
                <h1 className="card-title">Registrar Producto</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingrese el nombre del producto'
                            name="nombre"
                            value={producto.nombre}
                            onChange={(e) => handleProducto(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Categoría:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingrese la categoría del producto'
                            name="categoria"
                            value={producto.categoria}
                            onChange={(e) => handleProducto(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripción:</Form.Label>
                        <Form.Control
                            as='textarea'
                            placeholder='Ingrese la descripción del producto'
                            name="descripcion"
                            value={producto.descripcion}
                            onChange={(e) => handleProducto(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Precio:</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Ingrese el precio del producto'
                            name="precio"
                            value={producto.precio}
                            onChange={(e) => handleProducto(e.currentTarget.name, parseFloat(e.currentTarget.value))}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad:</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Ingrese la cantidad del producto'
                            name="cantidad"
                            value={producto.cantidad}
                            onChange={(e) => handleProducto(e.currentTarget.name, parseInt(e.currentTarget.value))}
                        />
                    </Form.Group>
                    <Button type="button" variant='success' className="mt-3 w-100" onClick={registrar}>
                        Registrar Producto
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default RegistrarProducto;