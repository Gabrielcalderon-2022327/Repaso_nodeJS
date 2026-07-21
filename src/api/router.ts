import * as http from "http";
import { exception } from "../service/validator";
import * as clientesServices from "../service/clienteService";
import * as productosServices from "../service/productoService";

function sendJSON(res: http.ServerResponse, statusCode: number, data: any): void {
    const body = data !== undefined ? JSON.stringify(data, null, 2) : '';
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(body);
}

async function readBody(req: http.IncomingMessage): Promise<unknown> {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
        chunks.push(chunk);
    }
    if (chunks.length === 0) return null;
    return JSON.parse(Buffer.concat(chunks).toString('utf-8'));
}

function handleException(res: http.ServerResponse, error: unknown): void {
    if (error instanceof exception) {
        sendJSON(res, 400, { error: error.message });
    } else if (error instanceof SyntaxError) {
        sendJSON(res, 400, { error: 'El body no es JSON válido' });
    } else {
        throw error;
    }
}

export async function router(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    const init = performance.now();
    const method = req.method ?? '';
    const url = new URL(req.url ?? '/', 'http://localhost').pathname;

    try {
        //----------------CLIENTES SIN ID
        if (url === "/clientes") {
            if (method == "GET") {
                sendJSON(res, 200, await clientesServices.listarClientes());
                return;
            }
            if (method == "POST") {
                const body = await readBody(req);
                const createdCliente = await clientesServices.agregarCliente(body as any);
                sendJSON(res, 201, { message: "Cliente agregado correctamente", cliente: body });
                return;
            }
        }
        //---------------------------CLIENTES CON ID
        const matchCliente = url.match(/^\/clientes\/(\d+)$/);
        if (matchCliente) {
            const id = Number(matchCliente[1]);

            if (method === 'GET') {
                const cliente = await clientesServices.buscarCliente(id);
                if (!cliente) {
                    sendJSON(res, 404, { error: `Cliente con id ${id} no encontrado` });
                    return;
                }
                sendJSON(res, 200, cliente);
                return;
            }
            if (method === 'PUT') {
                const body = await readBody(req);
                const actualizado = await clientesServices.editarCliente(id, body as any);
                if (!actualizado) {
                    sendJSON(res, 404, { error: `Cliente con id ${id} no encontrado` });
                    return;
                }
                sendJSON(res, 200, {message: `Cliente con id ${id} actualizado`, cliente: body });
                return;
            }
            if (method === 'DELETE') {
                const eliminado = await clientesServices.eliminarCliente(id); 
                if (!eliminado) {
                    sendJSON(res, 404, { error: `Cliente con id ${id} no encontrado` });
                    return;
                }
                sendJSON(res, 200, { mensaje: `Cliente con id ${id} eliminado` });
                return;
            }
        }

        //----------------Productos SIN ID
        if (url === "/productos") {
            if (method == "GET") {
                sendJSON(res, 200, await productosServices.listarProductos());
                return;
            }
            if (method == "POST") {
                const body = await readBody(req);
                const createdProducto = await productosServices.agregarProducto(body as any);
                sendJSON(res, 201, { message: "Producto agregado correctamente", producto: body });
                return;
            }
        }
        //---------------------------PRODUCTOS CON ID
        const matchProducto = url.match(/^\/productos\/(\d+)$/);
        if (matchProducto) {
            const id = Number(matchProducto[1]);

            if (method === 'GET') {
                const producto = await productosServices.buscarProducto(id);
                if (!producto) {
                    sendJSON(res, 404, { error: `Producto con id ${id} no encontrado` });
                    return;
                }
                sendJSON(res, 200, producto);
                return;
            }
            if (method === 'PUT') {
                const body = await readBody(req);
                const actualizado = await productosServices.editarProducto(id, body as any);
                if (!actualizado) {
                    sendJSON(res, 404, { error: `Producto con id ${id} no encontrado` });
                    return;
                }
                sendJSON(res, 200, {message: `Producto con id ${id} actualizado`, producto: body });
                return;
            }
            if (method === 'DELETE') {
                const eliminado = await productosServices.eliminarProducto(id); 
                if (!eliminado) {
                    sendJSON(res, 404, { error: `Producto con id ${id} no encontrado` });
                    return;
                }
                sendJSON(res, 200, { mensaje: `Producto con id ${id} eliminado` });
                return;
            }
        }
        sendJSON(res, 404, { error: 'Ruta no encontrada', url, method })
    } catch (error) {
        handleException(res, error);
    } finally {
        const ms = Math.round(performance.now() - init);
        console.log(`${method} ${url} TIEMPO: ${res.statusCode} (${ms} ms)`);
    }
}