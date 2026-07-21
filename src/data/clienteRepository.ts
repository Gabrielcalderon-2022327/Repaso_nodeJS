import { readFile, writeFile } from "fs/promises";
import { Cliente } from "../routes/cliente";

export async function leerClientes() {
    try {
        const data = await readFile("./src/data/Clientes.json", "utf8");
        return JSON.parse(data);
    } catch (error: any) {
        if (error.code === "ENOENT") {
            await writeFile("./src/data/Clientes.json", "[]", "utf8");
            return "El archivo no existe, creando uno nuevo...";
        }

        if (error instanceof SyntaxError) {
            console.error("El archivo contiene un JSON inválido.");
            return "";
        }
        console.error(error.message);
        return "";
    }
}

export async function escribirClientes(clientes: Cliente[]) {
    try {
        await writeFile("./src/data/Clientes.json", JSON.stringify(clientes, null, 2));
    } catch (error) {
        console.error("Error al escribir el archivo de clientes:", error);
    }
}