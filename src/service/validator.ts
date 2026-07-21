import { Cliente } from "../models/cliente";
import { Producto } from "../models/producto";

export class ValidacionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidacionError';
    }
}

export function validarCliente(cliente: Cliente, clientes: Cliente[]): void {

    if (!cliente.nombre.trim()) {
        throw new ValidacionError("El nombre es obligatorio");
    }

    if (!cliente.apellido.trim()) {
        throw new ValidacionError("El apellido es obligatorio");
    }

    if (!cliente.correo.trim()) {
        throw new ValidacionError("El correo es obligatorio");
    }

    if (!cliente.telefono) {
        throw new ValidacionError("El teléfono es obligatorio");
    }

    const correoExiste = clientes.some(
        c => c.correo.toLowerCase() === cliente.correo.toLowerCase()
    );

    if (correoExiste) {
        throw new ValidacionError("El correo ya está registrado");
    }
}

export function validarProducto(producto: Producto, productos: Producto[]): void{
    if (!producto.nombre.trim()) {
        throw new ValidacionError("El nombre es obligatorio");
    }
    if (!producto.categoria) {
        throw new ValidacionError("La categoría es obligatoria");
    }

    if (producto.precio < 0) {
        throw new ValidacionError("El precio no puede ser negativo");
    }

    if (producto.stock < 0) {
        throw new ValidacionError("El stock no puede ser negativo");
    }

    const idExiste = productos.some(
        p => p.id === producto.id
    );

    if (idExiste) {
        throw new ValidacionError("El ID ya está registrado");
    }
}