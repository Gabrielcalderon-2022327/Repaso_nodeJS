import { Cliente } from "../models/cliente";
import { leerClientes, escribirClientes } from "../data/clienteRepository";
import { validarCliente } from "./validator";


export async function listarClientes(): Promise<Cliente[]> {
    const clientes: Cliente[] = await leerClientes();
    return clientes;
}

export async function agregarCliente(cliente: Cliente): Promise<void> {
    const clientes: Cliente[] = await leerClientes();
    validarCliente(cliente, clientes);
    cliente.id = clientes.length + 1;
    clientes.push(cliente);
    await escribirClientes(clientes);
}

export async function buscarCliente(id: number): Promise<Cliente | null> {
    const clientes: Cliente[] = await leerClientes();
    return clientes.find(c => c.id === id) || null;
}

export async function eliminarCliente(id: number): Promise<boolean> {
    const clientes: Cliente[] = await leerClientes();
    if (id <= 0) return false;
    const index = clientes.findIndex(c => c.id === id);
    
    if (index === -1) {
        return false;
    }
    clientes.splice(index, 1);
    await escribirClientes(clientes);
    return true;
}


export async function editarCliente(id: number, cliente: Cliente): Promise<boolean>{
    const clientes: Cliente[] = await leerClientes();
    validarCliente(cliente, clientes);
    if (id <= 0) return false;

    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) {
        return false;
    }

    clientes[index] = { ...clientes[index], ...cliente };
    await escribirClientes(clientes);
    return true;
}
