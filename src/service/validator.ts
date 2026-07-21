import { leerClientes } from "../data/clienteRepository";
import { leerProductos } from "../data/productoRepository";
import { Cliente } from "../models/cliente";
import { Producto } from "../models/producto";

export class exception extends Error{
    constructor(message: string) {
        super(message);
        this.name = "exception";
    }
}

export async function validarCliente(cliente: Cliente){
    if (cliente.correo){
        throw new exception("El correo es obligatorio");
    }

    if (!cliente.nombre.trim()) {
        throw new exception("El nombre es obligatorio");
    }

    if (!cliente.apellido.trim()) {
        throw new exception("El apellido es obligatorio");
    }

    if (!cliente.correo.trim()) {
        throw new exception("El correo es obligatorio");
    }

    if (!cliente.telefono) {
        throw new exception("El teléfono es obligatorio");
    }


    const clientes: Cliente[] = await leerClientes();
    const correoExiste = clientes.some(
        c => c.correo.toLowerCase() === cliente.correo.toLowerCase()
    );

    if (correoExiste) {
        throw new exception("El correo ya está registrado");
    }
}

export async function validarProducto(producto: Producto){
    if (!producto.nombre.trim()) {
        throw new exception("El nombre es obligatorio");
    }
    if (!producto.categoria) {
        throw new exception("La categoría es obligatoria");
    }

    if (producto.precio < 0) {
        throw new exception("El precio no puede ser negativo");
    }

    if (producto.stock < 0) {
        throw new exception("El stock no puede ser negativo");
    }

    const productos: Producto[] = await leerProductos();
    const idExiste = productos.some(
        p => p.id === producto.id
    );

    if (idExiste) {
        throw new exception("El ID ya está registrado");
    }
}