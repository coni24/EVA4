import { actualizarProducto, obtenerProducto } from "@/Firebase/Promesas";
import {Producto} from '@/Interfaces/IProducto';
import { useRouter } from "next/router";
import React, {useEffect,useState} from 'react';
import {Button, Form} from 'react-bootstrap';

const initialState:Producto = {
    nombre:"",
    categoria:"",
    descripcion:"",
    precio:0,
    cantidad:0
}

export const ActualizarProducto = () => {
    const router = useRouter()  
    const [producto, setProducto] = useState<Producto>(initialState)
      
    const handleProducto = (name:string,value:string)=>{
        setProducto({...producto,[name]:value})
    }
  
  
    useEffect(()=>{
      const key = router.query.key;
      if(key!=undefined && typeof(key)=="string"){
          obtenerProducto(key).then((p)=>{
              if(p!=undefined){
                  setProducto(p)
              }
              else{
                  
              }
          })
      }else{
          
      }
      
    },[])
  
    const modificar = ()=>{
      actualizarProducto(producto).then(()=>{
          alert("Se actualiza con exito")
      })
    }
    return (
      <>
          <Form>
          <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control  type='text' placeholder='Ingrese su nombre: '
              value={producto.nombre}
              name="nombre"
              onChange={(e)=>{handleProducto(e.currentTarget.name,e.currentTarget.value)}} />
              <Form.Text></Form.Text>
          </Form.Group>
          <Form.Group>
              <Form.Label>Apellido:</Form.Label>
              <Form.Control  type='text' placeholder='Ingrese su apellido: '
              value={producto.categoria}
               name="apellido"
               onChange={(e)=>{handleProducto(e.currentTarget.name,e.currentTarget.value)}} />
              
              <Form.Text></Form.Text>
          </Form.Group>
          <Form.Group>
              <Form.Label>Correo:</Form.Label>
              <Form.Control  type='email' placeholder='Ingrese su correo: ' 
              value={producto.descripcion}
               name="correo"
               onChange={(e)=>{handleProducto(e.currentTarget.name,e.currentTarget.value)}} />
               
              <Form.Text></Form.Text>
          </Form.Group>
          <Form.Group>
              <Form.Label>Fecha Nacimiento:</Form.Label>
              <Form.Control  type='date' placeholder='Ingrese su fecha de nacimiento: ' 
              value={producto.precio}
               name="fechaNacimiento"
               onChange={(e)=>{handleProducto(e.currentTarget.name,e.currentTarget.value)}} />
               
              <Form.Text></Form.Text>
          </Form.Group>
          <Form.Group>
              <Form.Label>Edad:</Form.Label>
              <Form.Control  type='number' placeholder='Ingrese su edad: ' 
              value={producto.cantidad}
               name="edad"
               onChange={(e)=>{handleProducto(e.currentTarget.name,e.currentTarget.value)}} />
               
              <Form.Text></Form.Text>
          </Form.Group>
          <Button type="button" variant='success'
              onClick={modificar}>Modificar</Button>
      </Form>
      </>
    )
  }
  export default ActualizarProducto