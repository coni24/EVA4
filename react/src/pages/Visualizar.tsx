import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Modal} from 'react-bootstrap';
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { obtenerPersonas, obtenerProductos} from '@/Firebase/Promesas';
import { Persona } from '@/Interfaces/IPersona';
import { Producto } from '@/Interfaces/IProducto';

export const Visualizar = () => {
    const [personas, setPersonas] = useState<Persona[]>([])
    const [productos,setProductos] = useState<Producto[]>([])
    
    useEffect(()=>{
        //Traer listado de personas desde las promesas
        obtenerPersonas().then((personas)=>{
            //Meter el listado dentro del estado
            setPersonas(personas)
        }).catch((e)=>{
            console.log(e)
            alert("Algo ocurrio")
        });

        obtenerProductos().then((productos)=>{
            //Meter el listado dentro del estado
            setProductos(productos)
        }).catch((e)=>{
            console.log(e)
            alert("Algo ocurrio")
        })


    },[])

    return (
        <>
            <h2>Personas Registradas</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Contraseña</th>
                        <th>Correo</th>
                        <th>Fecha Nacimiento</th>
                        <th>Edad</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        personas.map((p)=>{
                            return(
                                <tr>
                                    <td>{p.nombre}</td> 
                                    <td>{p.password}</td>
                                    <td>{p.correo}</td>
                                    <td>{p.fechaNacimiento}</td>
                                    <td>{p.edad}</td>
                                    <td>
                                        <Link href={{pathname:'ActualizarPersona',query:{key:p.key}}}>
                                        <Button variant='warning'><FaEdit /></Button>
                                        </Link>
                                        <Button variant='danger'><MdDelete /></Button>    
                                    </td>   
                                </tr>
                            )
                            
                        })
                    }
                </tbody>
            </Table>

            <h2>Productos Registrados</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((pr) => (
                        <tr>
                            <td>{pr.nombre}</td>
                            <td>{pr.categoria}</td>
                            <td>{pr.descripcion}</td>
                            <td>{pr.precio}</td>
                            <td>{pr.cantidad}</td>
                            <td>
                                <Link href={{ pathname: 'ActualizarProducto', query: { key: pr.key } }}>
                                    <Button variant='warning'><FaEdit /></Button>
                                </Link>
                                <Button variant='danger'><MdDelete /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Visualizar;        

