import * as xlsx from "xlsx";
import axios from "axios";
import "dotenv/config";

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
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

// Verifica o crea un autor
async function getOrCreateAuthor(authorName) {
  try {
    const response = await axios.get(`${STRAPI_URL}/autors`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      params: {
        "filters[nombre][$eq]": authorName,
      },
    });

    const existingAuthor = response.data?.data?.[0];
    if (existingAuthor) {
      console.log(`Autor encontrado: ${existingAuthor.attributes.nombre}`);
      return existingAuthor.id;
    }

    console.log(`Creando nuevo autor: ${authorName}`);
    const createResponse = await axios.post(
      `${STRAPI_URL}/autors`,
      {
        data: { nombre: authorName },
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
  try {
    const response = await axios.get(`${STRAPI_URL}/collections`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      params: {
        "filters[nombre][$eq]": collectionName,
      },
    });

    const existingCollection = response.data?.data?.[0];
    if (existingCollection) {
      console.log(
        `Colección encontrada: ${existingCollection.attributes.nombre}`
      );
      return existingCollection.id;
    }

    console.log(`Creando nueva colección: ${collectionName}`);
    const createResponse = await axios.post(
      `${STRAPI_URL}/collections`,
      {
        data: { nombre: collectionName },
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
  try {
    const response = await axios.get(`${STRAPI_URL}/publishers`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      params: {
        "filters[nombre][$eq]": publisherName,
      },
    });

    const existingPublisher = response.data?.data?.[0];
    if (existingPublisher) {
      console.log(
        `Publisher encontrado: ${existingPublisher.attributes.nombre}`
      );
      return existingPublisher.id;
    }

    console.log(`Creando nuevo publisher: ${publisherName}`);
    const createResponse = await axios.post(
      `${STRAPI_URL}/publishers`,
      {
        data: { nombre: publisherName },
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

// Envía los libros al backend
async function sendBooksToStrapi(data) {
  try {
    for (const entry of data) {
      // Verifica o crea el autor
      const authorId = await getOrCreateAuthor(entry["AUTOR"]);

      // Verifica o crea la colección
      const collectionId = await getOrCreateCollection("Default Collection");

      // Verifica o crea el publisher
      const publisherId = await getOrCreatePublisher(entry["EDITORIAL"]);

      // Construye el payload del libro
      const payload = {
        titulo: entry["TITULO"],
        author: authorId, // ID del autor
        fecha_de_publicacion: formatDate(entry["AÑO"]),
        ejemplares: Number(entry["EJEMPLARES"]),
        publisher: publisherId, // ID del publisher
        collection: collectionId, // ID de la colección
      };

      // Realiza la request para crear el libro
      const response = await axios.post(
        `${STRAPI_URL}/books`,
        { data: payload },
        {
          headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
        }
      );
      console.log(`Libro creado: ${response.data.data.attributes.titulo}`);
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
