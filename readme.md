# Integración con OpenAI usando Assisteance

Este proyecto implementa una integración con la API de OpenAI para gestionar asistentes virtuales, subir archivos y realizar consultas. Utiliza configuraciones almacenadas en archivos JSON y realiza operaciones asincrónicas para interactuar con los servicios de OpenAI.

## Tabla de Contenidos

- [Integración con OpenAI usando Assisteance](#integración-con-openai-usando-assisteance)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
  - [Uso](#uso)
  - [Descripción de las Funciones](#descripción-de-las-funciones)
    - [`getAssistantId()`](#getassistantid)
    - [`saveFileAssistance(fileIdToAdd)`](#savefileassistancefileidtoadd)
    - [`crearAsistance()`](#crearasistance)
    - [`subirArchivoAssistance()`](#subirarchivoassistance)
    - [`preguntarAssistance(question)`](#preguntarassistancequestion)
  - [Ejecución del Script](#ejecución-del-script)
- [Elminación del storage de un proyecto](#elminación-del-storage-de-un-proyecto)
  - [deleteStorage.js](#deletestoragejs)
  - [Ejecución del Script](#ejecución-del-script-1)
  - [Descripción de la Función](#descripción-de-la-función)
    - [`deleteFiles()`](#deletefiles)
      - [Detalles del Proceso:](#detalles-del-proceso)
- [Elminación de los vectorStores de un proyecto](#elminación-de-los-vectorstores-de-un-proyecto)
  - [deleteVectorStores.js](#deletevectorstoresjs)
  - [Ejecución del Script](#ejecución-del-script-2)
  - [Descripción de la Función](#descripción-de-la-función-1)
  - [`deleteVectorStores()`](#deletevectorstores)
  - [Detalles de la Función](#detalles-de-la-función)
  - [Ejemplo de Salida](#ejemplo-de-salida)
  - [Notas](#notas)

## Requisitos

- Node.js
- Paquetes necesarios: `openai`, `fs`, `dotenv`

## Instalación

1. Clona el repositorio:

    ```bash
    https://github.com/jpgelmi/assistance-demo.git
    ```

2. Instala los paquetes necesarios:

    ```bash
    npm install openai fs dotenv
    ```

3. Crea un archivo `.env` y agrega tu clave API de OpenAI:

    ```plaintext
    OPENAI_API_KEY=tu_clave_api_aqui
    ```

## Uso

1. **Crear un nuevo asistente:**

    Descomenta la llamada a `crearAsistance()` en el script principal para crear un nuevo asistente.

2. **Subir un archivo al asistente:**

    Descomenta la llamada a `subirArchivoAssistance()` en el script principal para subir un archivo y asociarlo con el asistente.

3. **Realizar una consulta al asistente:**

    Modifica la llamada a `preguntarAssistance()` con tu pregunta y ejecuta el script para realizar una consulta al asistente.

## Descripción de las Funciones

### `getAssistantId()`

- **Descripción:** Lee el archivo de configuración (`assistantConfig.json`) para obtener el ID del asistente.
- **Entrada:** Ninguna.
- **Salida:** Retorna el `assistantId` del archivo JSON.

### `saveFileAssistance(fileIdToAdd)`

- **Descripción:** Guarda el ID de un archivo en la configuración del asistente.
- **Entrada:** `fileIdToAdd` - ID del archivo a agregar.
- **Salida:** Actualiza `assistantConfig.json` con el nuevo ID del archivo.

### `crearAsistance()`

- **Descripción:** Crea un nuevo asistente en la plataforma de OpenAI con una configuración específica y guarda la configuración en un archivo JSON.
- **Entrada:** Ninguna.
- **Salida:** Crea un asistente y guarda su configuración en `assistantConfig.json`.

### `subirArchivoAssistance()`

- **Descripción:** Sube un archivo (`data.txt`) al asistente, crea un vector store para el archivo y actualiza la configuración del asistente con el ID del vector store.
- **Entrada:** Ninguna.
- **Salida:** Sube un archivo y actualiza `assistantConfig.json` con el ID del vector store.

### `preguntarAssistance(question)`

- **Descripción:** Envía una pregunta al asistente y espera una respuesta. Maneja el estado del hilo de la conversación y muestra la respuesta final.
- **Entrada:** `question` - La pregunta que se le hará al asistente.
- **Salida:** Imprime la respuesta del asistente en la consola.

## Ejecución del Script

Para ejecutar el script, descomenta las funciones que deseas utilizar en el archivo principal y ejecuta el script:

```bash
node index.js
```

# Elminación del storage de un proyecto
## deleteStorage.js

## Ejecución del Script

Para ejecutar la función de eliminación de archivos, simplemente ejecuta el script principal:

```bash
    node deleteStorage.js
```

## Descripción de la Función

### `deleteFiles()`

- **Descripción:** Esta función lista todos los archivos almacenados en la plataforma de OpenAI y los elimina uno por uno.
- **Entrada:** Ninguna.
- **Salida:** Elimina todos los archivos listados y muestra mensajes de confirmación en la consola.

#### Detalles del Proceso:

1. **Listar Archivos:**
    - La función comienza obteniendo una lista de archivos almacenados en la cuenta de OpenAI utilizando `openai.files.list()`.
    
2. **Eliminar Archivos:**
    - Itera sobre cada archivo en la lista y lo elimina utilizando `openai.files.del(file.id)`.
    - Imprime un mensaje en la consola confirmando la eliminación de cada archivo.

3. **Manejo de Errores:**
    - Si ocurre un error durante el proceso, se captura y se imprime un mensaje de error en la consola.

# Elminación de los vectorStores de un proyecto
## deleteVectorStores.js

La función `deleteVectorStores` se encarga de eliminar todas las VectorStores disponibles en la API de OpenAI. Utiliza el SDK de OpenAI para listar y eliminar cada VectorStore de manera secuencial. La función maneja errores tanto en la obtención como en la eliminación de las VectorStores, proporcionando retroalimentación a través de la consola.

## Ejecución del Script

Para ejecutar la función de eliminación de archivos, simplemente ejecuta el script principal:

```bash
    node deleteVectorStores.js
```

## Descripción de la Función
## `deleteVectorStores()`

1. Importa las dependencias necesarias y configura el SDK de OpenAI con tu clave API.
2. Define la función `deleteVectorStores` para listar y eliminar las VectorStores.
3. Llama a la función `deleteVectorStores` para ejecutar el proceso.

## Detalles de la Función

- **Listar VectorStores**: La función obtiene una lista de todas las VectorStores disponibles mediante la API de OpenAI.
- **Eliminar VectorStores**: Itera sobre cada VectorStore obtenida y la elimina utilizando su `id`.
- **Manejo de Errores**: Se manejan errores tanto en la obtención como en la eliminación de las VectorStores, registrando mensajes de error en la consola.

## Ejemplo de Salida

- Mensaje de éxito al eliminar una VectorStore:
  ```
  VectorStore eliminado: id_de_la_vector_store
  ```

- Mensaje de error al listar las VectorStores:
  ```
  Error listando VectorStores: mensaje_de_error
  ```

- Mensaje de error al eliminar una VectorStore:
  ```
  Error eliminando VectorStore id_de_la_vector_store: mensaje_de_error
  ```

- Mensaje al completar el proceso:
  ```
  Proceso de eliminación de VectorStores completado.
  ```

## Notas

- Asegúrate de tener permisos adecuados para listar y eliminar VectorStores en tu cuenta de OpenAI.
- Maneja con cuidado la eliminación de recursos para evitar la pérdida de datos importantes.
