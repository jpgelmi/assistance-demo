import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: secretKey,
});

async function deleteVectorStores() {
  try {
    let vectorStores = await openai.beta.vectorStores.list();
    //console.log("VectorStores encontrados:", vectorStores.body.data);
    vectorStores = vectorStores.body.data;
    for (const vectorStore of vectorStores) {
      try {
        await openai.beta.vectorStores.del(vectorStore.id);
        console.log("VectorStore eliminado:", vectorStore.id);
      } catch (deleteError) {
        console.error(`Error eliminando VectorStore ${vectorStore.id}:`, deleteError);
      }
    }
    console.log("Proceso de eliminación de VectorStores completado.");
  } catch (listError) {
    console.error("Error listando VectorStores:", listError);
  }
}

deleteVectorStores();
