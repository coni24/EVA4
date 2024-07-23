import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Modal} from 'react-bootstrap';
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { obtenerPersonas} from '@/Firebase/Promesas';
import { Persona } from '@/Interfaces/IPersona';
import styles from '../styles/Visualizar.module.css';

export const Visualizar = () => {
    const [personas, setPersonas] = useState<Persona[]>([])
    
    useEffect(()=>{
        //Traer listado de personas desde las promesas
        obtenerPersonas().then((personas)=>{
            //Meter el listado dentro del estado
            setPersonas(personas)
        }).catch((e)=>{
            console.log(e)
            alert("Algo ocurrio")
        });



    },[])

    return (
        <div className={styles.contenedor}>
            <div className={styles.Box}>
                <div className={styles.tabla}>
                    <h2>Personas Registradas</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Contraseña</th>
                                <th>Correo</th>
                                <th>Fecha Nacimiento</th>
                                <th>Edad</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personas.map((p) => (
                                <tr key={p.key}>
                                    <td>{p.nombre}</td>
                                    <td>{p.password}</td>
                                    <td>{p.correo}</td>
                                    <td>{p.fechaNacimiento}</td>
                                    <td>{p.edad}</td>
                                    <td>
                                        <Link href={{ pathname: 'ActualizarPersona', query: { key: p.key } }}>
                                            <Button variant='warning' className={styles.btnEdit}><FaEdit /></Button>
                                        </Link>
                                        <Button variant='danger' className={styles.btnDelete}><MdDelete /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Visualizar;