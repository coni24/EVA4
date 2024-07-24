export interface Producto {
    nombre: string;
    categoria: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    ingredientes: string,
    disponible: boolean,
    tipoPiel: string,
    key?:string
}