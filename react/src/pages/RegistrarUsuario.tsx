import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Persona } from '../Interfaces/IPersona';
import { registrarPersona } from '../Firebase/Promesas';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Registro.module.css';

const initialState: Persona = {
    password: "",
    correo: "",
    edad: 0,
    fechaNacimiento: "",
    nombre: ""
};

const RegistrarUsuario: React.FC = () => {
    const [persona, setPersona] = useState<Persona>(initialState);
    const [error, setError] = useState<string | null>(null);

    const handlePersona = (name: string, value: string | number) => {
        setPersona({ ...persona, [name]: value });
    };

    const validarCampos = () => {
        if (
            !persona.nombre.trim() ||
            !persona.password.trim() ||
            !persona.correo.trim() ||
            !persona.fechaNacimiento.trim() ||
            persona.edad <= 0
        ) {
            return false;
        }
        return true;
    };

    const registrar = async () => {
        if (!validarCampos()) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            await registrarPersona(persona);
            alert("Se logró registrar");
            setPersona(initialState);
            setError(null);
        } catch (e) {
            console.error("Error al registrar:", e);
            setError("Algo ocurrió. Por favor, intenta nuevamente.");
        }
    };

    return (
        <div className={`d-flex justify-content-center align-items-center vh-100 ${styles.container}`}>
            <div className="card p-4" style={{ width: '400px' }}>
                <h1 className="card-title">Registrar Usuario</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre de Usuario:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingrese su nombre de usuario'
                            name="nombre"
                            value={persona.nombre}
                            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Ingrese su contraseña'
                            name="password"
                            value={persona.password}
                            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Correo:</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Ingrese su correo'
                            name="correo"
                            value={persona.correo}
                            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fecha Nacimiento:</Form.Label>
                        <Form.Control
                            type='date'
                            placeholder='Ingrese su fecha de nacimiento'
                            name="fechaNacimiento"
                            value={persona.fechaNacimiento}
                            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Edad:</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Ingrese su edad'
                            name="edad"
                            value={persona.edad}
                            onChange={(e) => handlePersona(e.currentTarget.name, parseInt(e.currentTarget.value))}
                        />
                    </Form.Group>
                    <Button type="button" variant='success' className="mt-3 w-100" onClick={registrar}>
                        Registrar
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default RegistrarUsuario;
