import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: secretKey,
});

const deleteFiles = async () => {
  try {
    const list = await openai.files.list();
    for await (const file of list) {
      await openai.files.del(file.id);
      console.log("Archivo eliminado:", file.id);
    }
    console.log("Archivos eliminados exitosamente.");
  } catch (error) {
    console.error("Error al procesar el archivo:", error);
  }
};

deleteFiles();
