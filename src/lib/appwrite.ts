import { Client, Databases } from "node-appwrite";

export const createAdminClient = () => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  return {
    get databases() {
      return new Databases(client);
    },
  };
};

export const APPWRITE_CONFIG = {
  dbId: process.env.APPWRITE_DATABASE_ID!,
  colLevels: process.env.APPWRITE_EDUCATION_LEVELS_COLLECTION_ID!,
  colGrades: process.env.APPWRITE_GRADES_COLLECTION_ID!,
  colTopics: process.env.APPWRITE_TOPICS_COLLECTION_ID!,
  colMaterials: process.env.APPWRITE_MATERIALS_COLLECTION_ID!,
  colQuizzes: process.env.APPWRITE_QUIZZES_COLLECTION_ID!,
};
