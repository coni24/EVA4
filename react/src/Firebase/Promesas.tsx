import { addDoc, collection, doc, getDoc, getDocs, updateDoc, query, where, getDocs as getDocsByQuery, deleteDoc } from "firebase/firestore";
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
            password:doc.data().password,
            correo:doc.data().correo,
            nombreUsuario: doc.data().nombreUsuario,
            edad:doc.data().edad,
            fechaNacimiento:doc.data().fechaNacimiento,
            nombre:doc.data().nombre,
            key:doc.id
        }
        personas.push(persona)
    });
    return personas
}

export const obtenerUsuario = async(nombreUsuario:string)=>{
    const q = query(collection(db, "personas"), where("nombreUsuario","==" ,nombreUsuario));
    const querySnapshot = await getDocsByQuery(q);
    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        let persona: Persona = {
            password: doc.data().password,
            correo: doc.data().correo,
            nombreUsuario: doc.data().nombreUsuario,
            edad: doc.data().edad,
            fechaNacimiento: doc.data().fechaNacimiento,
            nombre: doc.data().nombre,
            key: doc.id
        }
        return persona;
    } else {
        return undefined;
    }
}




export const obtenerPersona = async(key:string)=>{
    const docRef = doc(db, "personas", key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let persona:Persona = {
            password:docSnap.data().password,
            correo:docSnap.data().correo,
            nombreUsuario:docSnap.data().nombreUsuario,
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
    const ref = doc(db,"personas",p.key!)
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

export const actualizarProducto = async(p:Producto)=>{
    const ref = doc(db,"productos",p.key!)
    await updateDoc(ref,{...p})
};


