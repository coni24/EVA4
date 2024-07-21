import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { Persona } from "@/Interfaces/IPersona";
import { Producto } from "@/Interfaces/IProducto";

export const registrarPersona = async(persona:Persona)=>{
    const docRef = await addDoc(collection(db, "personas"), persona);
}

export const registrarProducto = async(producto:Producto)=>{
    const docRef = await addDoc(collection(db, "productos"), producto);
}

export const obtenerPersonas = async()=>{
    let personas:Persona[] = []
    const querySnapshot = await getDocs(collection(db, "personas"));
    querySnapshot.forEach((doc) => {
        let persona:Persona = {
            apellido:doc.data().apellido,
            correo:doc.data().correo,
            edad:doc.data().edad,
            fechaNacimiento:doc.data().fechaNacimiento,
            nombre:doc.data().nombre,
            key:doc.id
        }
        personas.push(persona)
    });
    return personas
}
export const obtenerPersona = async(key:string)=>{
    const docRef = doc(db, "personas", key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let persona:Persona = {
            apellido:docSnap.data().apellido,
            correo:docSnap.data().correo,
            edad:docSnap.data().edad,
            fechaNacimiento:docSnap.data().fechaNacimiento,
            nombre:docSnap.data().nombre,
            key:docSnap.id
        }
        return persona
    } else {
      return undefined
    }
}
export const actualizarPersona = async(p:Persona)=>{
    const ref = doc(collection(db,"personas",p.key!))
    await updateDoc(ref,{...p})
};


export const obtenerProductos = async()=>{
    let productos:Producto[] = []
    const querySnapshot = await getDocs(collection(db, "productos"));
    querySnapshot.forEach((doc) => {
        let producto:Producto = {
            nombre:doc.data().nombre,
            categoria:doc.data().categoria,
            descripcion:doc.data().descripcion,
            precio:doc.data().precio,
            cantidad:doc.data().cantidad,
            key:doc.id
        }
        productos.push(producto)
    });
    return productos
}
export const obtenerProducto = async(key:string)=>{
    const docRef = doc(db, "productos", key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let producto:Producto = {
            nombre:docSnap.data().nombre,
            categoria:docSnap.data().categoria,
            descripcion:docSnap.data().descripcion,
            precio:docSnap.data().precio,
            cantidad:docSnap.data().cantidad,
            key:docSnap.id
        }
        return producto
    } else {
      return undefined
    }
};