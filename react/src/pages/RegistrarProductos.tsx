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
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.cardTitulo}>Registrar Producto</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Nombre:</Form.Label>
                        <Form.Control className={styles.formEstilo}
                            type='text'
                            placeholder='Ingrese el nombre del producto'
                            name="nombre"
                            value={producto.nombre}
                            onChange={(e) => handleProducto(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Categoría:</Form.Label>
                        <Form.Control className={styles.formEstilo}
                            type='text'
                            placeholder='Ingrese la categoría del producto'
                            name="categoria"
                            value={producto.categoria}
                            onChange={(e) => handleProducto(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Descripción:</Form.Label>
                        <Form.Control className={styles.formEstilo}
                            as='textarea'
                            placeholder='Ingrese la descripción del producto'
                            name="descripcion"
                            value={producto.descripcion}
                            onChange={(e) => handleProducto(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Precio:</Form.Label>
                        <Form.Control className={styles.formEstilo}
                            type='number'
                            placeholder='Ingrese el precio del producto'
                            name="precio"
                            value={producto.precio}
                            onChange={(e) => handleProducto(e.currentTarget.name, parseFloat(e.currentTarget.value))}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Cantidad:</Form.Label>
                        <Form.Control className={styles.formEstilo}
                            type='number'
                            placeholder='Ingrese la cantidad del producto'
                            name="cantidad"
                            value={producto.cantidad}
                            onChange={(e) => handleProducto(e.currentTarget.name, parseInt(e.currentTarget.value))}
                        />
                    </Form.Group>
                    <Button type="button" variant='success' className={styles.btn} onClick={registrar}>
                        Registrar Producto
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default RegistrarProducto;