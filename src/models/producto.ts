export interface Producto{
    id:number,
    nombre: string,
    descripcion:string,
    precio: number,
    stock:number,
    categoria: categoria,
    estado: estado
}

export enum categoria{
    ELECTRONICA = "ELECTRONICA",
    MUEBLES = "MUEBLES",
    ROPA = "ROPA"
}

export enum estado{
    ACTIVO = "ACTIVO",
    INACTIVO = "INACTIVO"
}