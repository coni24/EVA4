import { actualizarProducto, obtenerProducto } from "@/Firebase/Promesas";
import {Producto} from '@/Interfaces/IProducto';
import { useRouter } from "next/router";
import React, {useEffect,useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import styles from '../styles/Actualizar.module.css';

const initialState:Producto = {
    nombre:"",
    categoria:"",
    descripcion:"",
    precio:0,
    cantidad:0,
    ingredientes: "",
    disponible: false,
    tipoPiel: "",
    key:""
}

export const ActualizarProducto = () => {
    const router = useRouter()  
    const [producto, setProducto] = useState<Producto>(initialState)
      
    const handleProducto = (name:string,value:string | number | boolean)=>{
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
          router.push('/VisualizarProductos')
      })
    }
    return (
        <div className={styles.container}>
            <div className={`card ${styles.card}`}>
                <h1 className={styles.cardTitulo}>Actualizar Producto</h1>
          <Form>
          <Form.Group>
              <Form.Label className={styles.formLabel}>Nombre:</Form.Label>
              <Form.Control className={styles.formEstilo}  type='text' placeholder='Ingrese su nombre: '
              value={producto.nombre}
              name="nombre"
              onChange={(e)=>{handleProducto(e.currentTarget.name,e.currentTarget.value)}} />
              <Form.Text></Form.Text>
          </Form.Group>
          <Form.Group>
              <Form.Label className={styles.formLabel}>Categoría:</Form.Label>
              <Form.Control className={styles.formEstilo} type='text' placeholder='Ingrese su apellido: '
              value={producto.categoria}
               name="apellido"
               onChange={(e)=>{handleProducto(e.currentTarget.name,e.currentTarget.value)}} />
              
              <Form.Text></Form.Text>
          </Form.Group>
          <Form.Group>
              <Form.Label className={styles.formLabel}>Descripción:</Form.Label>
              <Form.Control className={styles.formEstilo}  type='email' placeholder='Ingrese su correo: ' 
              value={producto.descripcion}
               name="correo"
               onChange={(e)=>{handleProducto(e.currentTarget.name,e.currentTarget.value)}} />
               
              <Form.Text></Form.Text>
          </Form.Group>
          <Form.Group>
              <Form.Label className={styles.formLabel}>Precio:</Form.Label>
              <Form.Control className={styles.formEstilo} type='number' placeholder='Ingrese su fecha de nacimiento: ' 
              value={producto.precio}
               name="fechaNacimiento"
               onChange={(e)=>{handleProducto(e.currentTarget.name,e.currentTarget.value)}} />

              <Form.Text></Form.Text>
          </Form.Group>
          <Form.Group>
              <Form.Label className={styles.formLabel}>Cantidad:</Form.Label>
              <Form.Control className={styles.formEstilo} type='number' placeholder='Ingrese su edad: ' 
              value={producto.cantidad}
               name="edad"
               onChange={(e)=>{handleProducto(e.currentTarget.name,e.currentTarget.value)}} />
              <Form.Text></Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label className={styles.formLabel}>Ingredientes:</Form.Label>
            <Form.Control className={styles.formEstilo} as='textarea' placeholder='Ingrese los ingredientes del producto'
            name="ingredientes" value={producto.ingredientes}
            onChange={(e) => handleProducto(e.currentTarget.name, e.currentTarget.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label className={styles.formLabel}>Disponible:</Form.Label>
                <Form.Check type="checkbox" label="Producto disponible" name="disponible" checked={producto.disponible}
                onChange={(e) => handleProducto(e.currentTarget.name, e.currentTarget.checked)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label className={styles.formLabel}>Tipo de Piel:</Form.Label>
                <Form.Check type="radio" label="Seca" name="tipoPiel" value="Seca"checked={producto.tipoPiel === "Seca"}
                onChange={(e) => handleProducto(e.currentTarget.name, e.currentTarget.value)}/>
                <Form.Check type="radio" label="Grasa"name="tipoPiel"value="Grasa" checked={producto.tipoPiel === "Grasa"}
                onChange={(e) => handleProducto(e.currentTarget.name, e.currentTarget.value)}/>
                <Form.Check type="radio" label="Mixta"name="tipoPiel" value="Mixta"checked={producto.tipoPiel === "Mixta"}
                 onChange={(e) => handleProducto(e.currentTarget.name, e.currentTarget.value)}/>
            </Form.Group>
          <Button  className={styles.btn} type="button" variant='success'
              onClick={modificar}>ACTUALIZAR</Button>
      </Form>
      </div>
    </div>
    )
  }
  export default ActualizarProducto;