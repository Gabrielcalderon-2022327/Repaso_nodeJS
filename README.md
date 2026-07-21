# REPASO_NODEJS

## Objetivo

Desarrollar una API REST utilizando Node.js y TypeScript para administrar clientes y productos mediante operaciones CRUD. El proyecto implementa una arquitectura modular, validaciones de datos, persistencia en archivos JSON y un servidor HTTP capaz de procesar solicitudes mediante un sistema de rutas.

## Tecnologías utilizadas

- Node.js
- TypeScript
- HTTP (módulo nativo de Node.js)
- JSON
- pnpm
- ts-node
- Git y GitHub

## Instalación

1. Clonar el repositorio.

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Ingresar al proyecto.

```bash
cd REPASO_NODEJS
```

3. Instalar las dependencias.

```bash
pnpm install
```

## Ejecución

Ejecutar el servidor con:

```bash
pnpm dev run
```

El servidor iniciará en el puerto configurado dentro del archivo `server.ts`, al que se podrán enviar peticiones http.

## Estructura del proyecto

```
src
│
├── api
│   ├── router.ts
│   └── server.ts
│
├── data
│   ├── clienteRepository.ts
│   ├── productoRepository.ts
│   ├── clientes.json
│   └── productos.json
│
├── models
│   ├── cliente.ts
│   └── producto.ts
│
├── service
│   ├── clienteService.ts
│   ├── productoService.ts
│   └── validator.ts
```

## Rutas disponibles

### Clientes


| Método | Ruta            | Descripción               |
| ------- | --------------- | -------------------------- |
| GET     | `/clientes`     | Obtiene todos los clientes |
| GET     | `/clientes/:id` | Obtiene un cliente por ID  |
| POST    | `/clientes`     | Agrega un nuevo cliente    |
| PUT     | `/clientes/:id` | Actualiza un cliente       |
| DELETE  | `/clientes/:id` | Elimina un cliente         |

### Productos


| Método | Ruta             | Descripción                |
| ------- | ---------------- | --------------------------- |
| GET     | `/productos`     | Obtiene todos los productos |
| GET     | `/productos/:id` | Obtiene un producto por ID  |
| POST    | `/productos`     | Agrega un nuevo producto    |
| PUT     | `/productos/:id` | Actualiza un producto       |
| DELETE  | `/productos/:id` | Elimina un producto         |

## Características

- API REST desarrollada con Node.js y TypeScript.
- Arquitectura modular basada en servicios y repositorios.
- Persistencia de datos mediante archivos JSON.
- Validaciones para clientes y productos.
- Procesamiento de solicitudes HTTP mediante Router.
- Respuestas en formato JSON.
- Código organizado y fácil de mantener.
