import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Modal} from 'react-bootstrap';
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {eliminarProducto, obtenerProductos} from '@/Firebase/Promesas';
import { Producto } from '@/Interfaces/IProducto';
import styles from '../styles/Visualizar.module.css';

export const Visualizar = () => {
    const [productos,setProductos] = useState<Producto[]>([])
    
    useEffect(()=>{
        obtenerProductos().then((productos)=>{
            //Meter el listado dentro del estado
            setProductos(productos)
        }).catch((e)=>{
            console.log(e)
            alert("Algo ocurrio")
        })
    },[])

    const handleEliminar = async (key: string) => {
        try {
            await eliminarProducto(key);
            setProductos(productos.filter(p=>p.key !== key));
        }catch(e){
            console.error(e);
            alert("Error al eliminar producto")
        }
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.Box}>
                <div className={styles.tabla}>
                    <h2>Productos Registrados</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Ingredientes</th>
                                <th>Disponible</th>
                                <th>Tipo de Piel</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((pr) => (
                                <tr key={pr.key}>
                                    <td>{pr.nombre}</td>
                                    <td>{pr.categoria}</td>
                                    <td>{pr.descripcion}</td>
                                    <td>{pr.precio}</td>
                                    <td>{pr.cantidad}</td>
                                    <td>{pr.ingredientes}</td>
                                    <td>{pr.disponible ? 'Sí' : 'No'}</td>
                                    <td>{pr.tipoPiel}</td>
                                    <td>
                                        <Link href={{ pathname: 'ActualizarProducto', query: { key: pr.key } }}>
                                            <Button variant='warning' className={styles.btnEdit}><FaEdit /></Button>
                                        </Link>
                                        <Button variant='danger' className={styles.btnDelete} onClick={()=>
                                            handleEliminar(pr.key!)}><MdDelete /></Button>
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