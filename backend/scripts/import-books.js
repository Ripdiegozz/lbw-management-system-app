require("dotenv").config();
const xlsx = require("xlsx");
const axios = require("axios");

// Configuración
const STRAPI_URL = "http://localhost:1337/api";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
const EXCEL_FILE_PATH = "./data.xlsx";

// Lee el archivo Excel
function readExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
    defval: "",
  });
  return jsonData;
}

// Formatea la fecha en yyyy-mm-dd
function formatDate(dateString) {
  const date = dateString ? new Date(dateString) : new Date();
  return date.toISOString().split("T")[0];
}

function generateSlug(title) {
  return title
    .normalize("NFD") // Descompone caracteres especiales, como á -> a + ́
    .replace(/[\u0300-\u036f]/g, "") // Remueve los diacríticos (acentos)
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Remueve caracteres no permitidos (excepto espacios y guiones)
    .trim() // Elimina espacios al inicio y al final
    .replace(/\s+/g, "-") // Reemplaza espacios por guiones
    .toLowerCase(); // Convierte a minúsculas
}

// Verifica o crea un autor
async function getOrCreateAuthor(authorName) {
  // Dejar un solo espacio entre palabras para evitar (por ejemplo) "Juan   Perez"
  authorName = authorName.replace(/\s+/g, " ").trim();

  try {
    const response = await axios.get(`${STRAPI_URL}/autors`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      params: {
        "filters[nombre][$eq]": authorName,
      },
    });

    const existingAuthor = response.data?.data?.[0];
    if (existingAuthor) {
      console.log(`Autor encontrado: ${existingAuthor.nombre}`);
      return existingAuthor.id;
    }

    console.log(`Creando nuevo autor: ${authorName}`);
    const createResponse = await axios.post(
      `${STRAPI_URL}/autors`,
      {
        data: {
          nombre: authorName,
          slug: generateSlug(authorName),
        },
      },
      {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      }
    );
    return createResponse.data.data.id;
  } catch (error) {
    console.error(
      "Error al manejar el autor:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Verifica o crea una colección
async function getOrCreateCollection(collectionName) {
  // Dejar un solo espacio entre palabras para evitar (por ejemplo) "Colección   1"
  collectionName = collectionName.replace(/\s+/g, " ").trim();

  try {
    const response = await axios.get(`${STRAPI_URL}/collections`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      params: {
        "filters[nombre][$eq]": collectionName,
      },
    });

    const existingCollection = response.data?.data?.[0];
    if (existingCollection) {
      console.log(`Colección encontrada: ${existingCollection.nombre}`);
      return existingCollection.id;
    }

    console.log(`Creando nueva colección: ${collectionName}`);
    const createResponse = await axios.post(
      `${STRAPI_URL}/collections`,
      {
        data: {
          nombre: collectionName,
          slug: generateSlug(collectionName),
        },
      },
      {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      }
    );
    return createResponse.data.data.id;
  } catch (error) {
    console.error(
      "Error al manejar la colección:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Verifica o crea un publisher
async function getOrCreatePublisher(publisherName) {
  // Dejar un solo espacio entre palabras para evitar (por ejemplo) "Editorial   1"
  publisherName = publisherName.replace(/\s+/g, " ").trim();

  try {
    const response = await axios.get(`${STRAPI_URL}/publishers`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      params: {
        "filters[nombre][$eq]": publisherName,
      },
    });

    const existingPublisher = response.data?.data?.[0];
    if (existingPublisher) {
      console.log(`Publisher encontrado: ${existingPublisher.nombre}`);
      return existingPublisher.id;
    }

    console.log(`Creando nuevo publisher: ${publisherName}`);
    const createResponse = await axios.post(
      `${STRAPI_URL}/publishers`,
      {
        data: {
          nombre: publisherName,
          slug: generateSlug(publisherName),
        },
      },
      {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      }
    );
    return createResponse.data.data.id;
  } catch (error) {
    console.error(
      "Error al manejar el publisher:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Verifica o crea un tipo
async function getOrCreateType(typeName) {
  // Dejar un solo espacio entre palabras para evitar (por ejemplo) "Tipo   1"
  typeName = typeName.replace(/\s+/g, " ").trim();

  try {
    const response = await axios.get(`${STRAPI_URL}/book-types`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      params: {
        "filters[nombre][$eq]": typeName,
      },
    });

    const existingType = response.data?.data?.[0];

    if (existingType) {
      console.log(`Tipo encontrado: ${existingType.nombre}`);
      return existingType.id;
    }

    console.log(`Creando nuevo tipo: ${typeName}`);
    const createResponse = await axios.post(
      `${STRAPI_URL}/book-types`,
      {
        data: {
          nombre: typeName,
          slug: generateSlug(typeName),
        },
      },
      {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      }
    );
    return createResponse.data.data.id;
  } catch (error) {
    console.error(
      "Error al manejar el tipo:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Envía los libros al backend
async function sendBooksToStrapi(data) {
  try {
    for (const entry of data) {
      // Verifica o crea el autor
      const authorId = await getOrCreateAuthor(entry["AUTOR"]);

      // Verifica o crea la colección
      const collectionId = await getOrCreateCollection(entry["COLECCION"]);

      // Verifica o crea el publisher
      const publisherId = await getOrCreatePublisher(entry["EDITORIAL"]);

      // Verifica o crea el tipo
      const typeId = await getOrCreateType(entry["TIPO"]);

      // Dejar solo un espacio entre palabras para evitar (por ejemplo) "Padre   Rico"
      const titulo = (entry["TITULO"] = entry["TITULO"]
        .replace(/\s+/g, " ")
        .trim());

      if (titulo.length === 0) {
        console.log("Título vacío. No se enviará el libro");
        continue;
      }

      // Construye el payload del libro
      const payload = {
        titulo,
        author: authorId, // ID del autor
        fecha_de_publicacion: formatDate(entry["AÑO"]),
        ejemplares: Number(entry["EJEMPLARES"]) || 1,
        publisher: publisherId, // ID del publisher
        collection: collectionId, // ID de la colección
        tipo: typeId, // ID del tipo
      };

      // Realiza la request para crear el libro
      const response = await axios.post(
        `${STRAPI_URL}/books`,
        { data: payload },
        {
          headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
        }
      );
      console.log(`Libro creado: ${response.data.data.titulo}`);
    }
    console.log("¡Todos los libros se han enviado con éxito!");
  } catch (error) {
    console.error(
      "Error al enviar libros a Strapi:",
      error.response?.data || error.message
    );
  }
}

// Ejecuta el proceso
(async () => {
  try {
    console.log("Leyendo el archivo Excel...");
    const data = readExcel(EXCEL_FILE_PATH);

    console.log(
      `Se encontraron ${data.length} entradas. Enviando datos a Strapi...`
    );
    await sendBooksToStrapi(data);
  } catch (error) {
    console.error("Error durante el proceso:", error.message);
  }
})();
