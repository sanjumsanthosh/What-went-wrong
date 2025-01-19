import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env.AZURE_AI_KEY;
const endpoint = process.env.AZURE_ENDPOINT || "https://models.inference.ai.azure.com";
const modelName = process.env.AZURE_MODEL_NAME || "gpt-4o";

export const getAzureClient = (token: string) => {
  if (!token) throw new Error("Azure AI key not found");
  return ModelClient(endpoint, new AzureKeyCredential(token));
};

export const generateAzureQuestion = async (token: string, previousAnswers: any[], customPrompt?: string) => {
  const client = getAzureClient(token);
  
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        {
          role: "system",
          content: "You are an AI analyst helping to understand what went wrong in a situation. Generate specific, focused questions based on previous answers."
        },
        {
          role: "user",
          content: customPrompt || `Based on these previous answers: ${JSON.stringify(previousAnswers)}, what should be the next question to ask? Generate a single question.`
        }
      ],
      model: modelName,
    }
  });

  if (response.status !== "200") {
    throw (response.body as any).error;
  }

  return (response.body as any).choices[0].message.content;
};
