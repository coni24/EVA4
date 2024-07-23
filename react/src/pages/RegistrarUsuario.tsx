import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Persona } from '../Interfaces/IPersona';
import { registrarPersona } from '../Firebase/Promesas';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Registro.module.css';

const initialState: Persona = {
    nombre: "",
    password: "",
    nombreUsuario: "",
    correo: "",
    edad: 0,
    fechaNacimiento: ""
};

function RegistrarUsuario() {
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
        <div className={styles.container}>
            <div className={`card ${styles.card}`}>
                <h1 className={styles.cardTitulo}>Registrar Usuario</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Nombre:</Form.Label>
                        <Form.Control className={styles.formEstilo}
                            type='text'
                            placeholder='Ingrese su nombre'
                            name="nombre"
                            value={persona.nombre}
                            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Contraseña:</Form.Label>
                        <Form.Control className={styles.formEstilo}
                            type='password'
                            placeholder='Ingrese su contraseña'
                            name="password"
                            value={persona.password}
                            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Nombre de Usuario:</Form.Label>
                        <Form.Control className={styles.formEstilo}
                            type='text'
                            placeholder='Ingrese su nombre de usuario'
                            name="nombreUsuario"
                            value={persona.nombreUsuario}
                            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group> 
                        <Form.Label className={styles.formLabel}>Correo:</Form.Label>
                        <Form.Control className={styles.formEstilo}
                            type='email'
                            placeholder='Ingrese su correo'
                            name="correo"
                            value={persona.correo}
                            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Fecha Nacimiento:</Form.Label>
                        <Form.Control className={styles.formEstilo}
                            type='date'
                            placeholder='Ingrese su fecha de nacimiento'
                            name="fechaNacimiento"
                            value={persona.fechaNacimiento}
                            onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Edad:</Form.Label>
                        <Form.Control className={styles.formEstilo}
                            type='number'
                            placeholder='Ingrese su edad'
                            name="edad"
                            value={persona.edad}
                            onChange={(e) => handlePersona(e.currentTarget.name, parseInt(e.currentTarget.value))}
                        />
                    </Form.Group>
                    <Button type="button" variant='success' className={styles.btn} onClick={registrar}>
                        REGISTRAR
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default RegistrarUsuario;
