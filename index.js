import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: secretKey,
});

async function getAssistantId() {
  const data = fs.readFileSync("assistantConfig.json");
  return JSON.parse(data).assistantId;
}

async function saveFileAssistance(fileIdToAdd) {
    console.log("Intentando guardar el fileId:", fileIdToAdd);
    try {
      const data = fs.readFileSync("assistantConfig.json");
      const config = JSON.parse(data);

      if (!config.filesId) {
        config.filesId = [];
      }

      config.filesId.push(fileIdToAdd);
  
      await fs.writeFileSync("assistantConfig.json", JSON.stringify(config, null, 2));
      console.log("Archivo actualizado exitosamente con el nuevo fileId.");
    } catch (err) {
      console.error("Error al procesar el archivo:", err);
    }
}

async function crearAsistance() {
  console.log("\nCrear nuevo Assistance\n");
  const assistantConfig = {
    name: "CashFlow Assistant",
    instructions:
      "Eres un asistente financiero que me ayuda a gestionar mis finanzas personales, analizando mis gastos y ganancias, y proporcionando recomendaciones e insights para mejorar mi situación financiera.",
    tools: [{ type: "file_search" }],
    model: "gpt-4o-mini",
  };
  const assistant = await openai.beta.assistants.create(assistantConfig);
  const assistantId = assistant.id.toString();
  console.log(assistantId);
  const dataToSave = JSON.stringify({ assistantConfig, assistantId }, null, 2);
  fs.writeFileSync("assistantConfig.json", dataToSave);
  console.log("\nConfiguración guardada en assistantConfig.json\n");
}

async function subirArchivoAssistance() {
  const assistantId = await getAssistantId();
  console.log(assistantId);
  const thread = await openai.beta.threads.create();
  const fileName = "data.txt"
  const fileStream = await fs.createReadStream(fileName);
  let vectorStore = await openai.beta.vectorStores.create({
    name: "DataInfo",
  });
  await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
    files: [fileStream],
  });
  await openai.beta.assistants.update(assistantId, {
    tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
  });
  await saveFileAssistance(vectorStore.id);
  console.log("\nFile uploaded successfully!\n");
}

async function preguntarAssistance(question) {
  const assistantId = await getAssistantId();
  const thread = await openai.beta.threads.create();
  const userQuestion = question;

  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: userQuestion,
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistantId,
  });

  let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  while (runStatus.status !== "completed") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
      console.log(
        `Run status is '${runStatus.status}'. Unable to complete the request.`
      );
      break;
    }
  }

  const messages = await openai.beta.threads.messages.list(thread.id);

  const lastMessageForRun = messages.data
    .filter(
      (message) => message.run_id === run.id && message.role === "assistant"
    )
    .pop();

  if (lastMessageForRun) {
    console.log(`${lastMessageForRun.content[0].text.value} \n`);

  } else if (!["failed", "cancelled", "expired"].includes(runStatus.status)) {
    console.log("No response received from the assistant.");
  }
}

//crearAsistance();
//subirArchivoAssistance();
preguntarAssistance("¿Qué análisis financiero puedes hacer con el archivo que te di?");