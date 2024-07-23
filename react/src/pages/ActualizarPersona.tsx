import { actualizarPersona, obtenerPersona } from "@/Firebase/Promesas";
import {Persona} from '@/Interfaces/IPersona';
import { useRouter } from "next/router";
import React, {useEffect,useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import styles from '../styles/Actualizar.module.css';

const initialState:Persona = {
    nombre:"",
    password:"",
    nombreUsuario: "",
    correo:"",
    edad:0,
    fechaNacimiento:""
}

export const ActualizarPersona = () => {
    const router = useRouter()  
    const [persona, setPersona] = useState<Persona>(initialState)
      
    const handlePersona = (name:string,value:string)=>{
        setPersona({...persona,[name]:value})
    }
  
  
    useEffect(()=>{
      const key = router.query.key;
      if(key!=undefined && typeof(key)=="string"){
          obtenerPersona(key).then((p)=>{
              if(p!=undefined){
                  setPersona(p)
              }
              else{
                  //persona no existe
              }
          })
      }else{
          //clave invalida
      }
      
    },[])
  
    const modificar = ()=>{
      actualizarPersona(persona).then(()=>{
          alert("Se actualiza con exito")
          router.push('/Visualizar')
      }).catch((e)=>{
        console.log(e);
        alert("Error al actualizar")
      })
    }
    return (
        <div className={styles.container}>
        <div className={`card ${styles.card}`}>
            <h1 className={styles.cardTitulo}>Actualizar Persona</h1>
            <Form>
                <Form.Group>
                    <Form.Label className={styles.formLabel}>Nombre:</Form.Label>
                    <Form.Control className={styles.formEstilo}
                        type='text'
                        placeholder='Ingrese su nombre'
                        value={persona.nombre}
                        name="nombre"
                        onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className={styles.formLabel}>Contraseña:</Form.Label>
                    <Form.Control className={styles.formEstilo}
                        type='text'
                        placeholder='Ingrese su contraseña'
                        value={persona.password}
                        name="password"
                        onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className={styles.formLabel}>Nombre de Usuario:</Form.Label>
                    <Form.Control className={styles.formEstilo}
                        type='text'
                        placeholder='Ingrese su nombre de usuario'
                        value={persona.nombreUsuario}
                        name="nombreUsuario"
                        onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className={styles.formLabel}>Correo:</Form.Label>
                    <Form.Control className={styles.formEstilo}
                        type='email'
                        placeholder='Ingrese su correo'
                        value={persona.correo}
                        name="correo"
                        onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className={styles.formLabel}>Fecha Nacimiento:</Form.Label>
                    <Form.Control className={styles.formEstilo}
                        type='date'
                        placeholder='Ingrese su fecha de nacimiento'
                        value={persona.fechaNacimiento}
                        name="fechaNacimiento"
                        onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className={styles.formLabel}>Edad:</Form.Label>
                    <Form.Control className={styles.formEstilo}
                        type='number'
                        placeholder='Ingrese su edad'
                        value={persona.edad}
                        name="edad"
                        onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                    />
                </Form.Group>
                <Button type="button" variant='success' className={styles.btn} onClick={modificar}>
                    MODIFICAR
                </Button>
            </Form>
        </div>
    </div>
);
}
  
  export default ActualizarPersona