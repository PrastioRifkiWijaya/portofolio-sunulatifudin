import { Client, Databases } from "node-appwrite";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const createAdminClient = () => {
  const endpoint = getRequiredEnv("APPWRITE_ENDPOINT");
  const projectId = getRequiredEnv("APPWRITE_PROJECT_ID");
  const apiKey = getRequiredEnv("APPWRITE_API_KEY");

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  return {
    get databases() {
      return new Databases(client);
    },
  };
};

export const APPWRITE_CONFIG = {
  get dbId() {
    return getRequiredEnv("APPWRITE_DATABASE_ID");
  },
  get colLevels() {
    return getRequiredEnv("APPWRITE_EDUCATION_LEVELS_COLLECTION_ID");
  },
  get colGrades() {
    return getRequiredEnv("APPWRITE_GRADES_COLLECTION_ID");
  },
  get colTopics() {
    return getRequiredEnv("APPWRITE_TOPICS_COLLECTION_ID");
  },
  get colMaterials() {
    return getRequiredEnv("APPWRITE_MATERIALS_COLLECTION_ID");
  },
  get colQuizzes() {
    return getRequiredEnv("APPWRITE_QUIZZES_COLLECTION_ID");
  },
};

