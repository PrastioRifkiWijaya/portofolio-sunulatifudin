/* eslint-disable @typescript-eslint/no-explicit-any */
import { unstable_cache } from "next/cache";
import { createAdminClient, APPWRITE_CONFIG } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { EducationLevel, Grade, Topic, Material, Quiz } from "@/data/ppkn";

// Mappers (Appwrite Document -> DTO)
const mapLevel = (doc: any): EducationLevel => ({
  id: doc.$id,
  name: doc.name,
  code: doc.code,
  description: doc.description,
  order: doc.order,
  is_active: doc.is_active,
});

const mapGrade = (doc: any): Grade => ({
  id: doc.$id,
  level_id: doc.level_id,
  name: doc.name,
  code: doc.code,
  description: doc.description,
  order: doc.order,
  is_active: doc.is_active,
});

const mapTopic = (doc: any): Topic => ({
  id: doc.$id,
  grade_id: doc.grade_id,
  name: doc.name,
  slug: doc.slug,
  description: doc.description,
  order: doc.order,
  thumbnail_url: doc.thumbnail_url,
  is_active: doc.is_active,
});

const mapMaterial = (doc: any): Material => ({
  id: doc.$id,
  topic_id: doc.topic_id,
  title: doc.title,
  slug: doc.slug,
  description: doc.description,
  content_type: doc.content_type,
  drive_url: doc.drive_url,
  drive_file_id: doc.drive_file_id,
  thumbnail_url: doc.thumbnail_url,
  estimated_duration: doc.estimated_duration,
  order: doc.order,
  is_active: doc.is_active,
  published_at: doc.published_at,
});

const mapQuiz = (doc: any): Quiz => ({
  id: doc.$id,
  grade_id: doc.grade_id,
  question: doc.question,
  options: doc.options,
  correct_answer: doc.correct_answer,
  explanation: doc.explanation,
  is_active: doc.is_active,
});

export class PPKnService {
  static getActiveLevels = unstable_cache(
    async (): Promise<EducationLevel[]> => {
      const { dbId, colLevels } = APPWRITE_CONFIG;
      const response = await createAdminClient().databases.listDocuments(dbId, colLevels, [
        Query.equal("is_active", true),
        Query.orderAsc("order"),
      ]);
      return response.documents.map(mapLevel);
    },
    ['active-levels'],
    { revalidate: 3600, tags: ['levels'] }
  );

  static getLevelByCode = unstable_cache(
    async (levelCode: string): Promise<EducationLevel | null> => {
      const { dbId, colLevels } = APPWRITE_CONFIG;
      const response = await createAdminClient().databases.listDocuments(dbId, colLevels, [
        Query.equal("code", levelCode.toUpperCase()),
        Query.limit(1)
      ]);
      if (response.documents.length === 0) return null;
      return mapLevel(response.documents[0]);
    },
    ['level-by-code'],
    { revalidate: 3600, tags: ['levels'] }
  );

  static getActiveGrades = unstable_cache(
    async (levelId: string): Promise<Grade[]> => {
      const { dbId, colGrades } = APPWRITE_CONFIG;
      const response = await createAdminClient().databases.listDocuments(dbId, colGrades, [
        Query.equal("level_id", levelId),
        Query.equal("is_active", true),
        Query.orderAsc("order"),
      ]);
      return response.documents.map(mapGrade);
    },
    ['active-grades'],
    { revalidate: 3600, tags: ['grades'] }
  );

  static getGradeByCode = unstable_cache(
    async (gradeCode: string, levelId: string): Promise<Grade | null> => {
      const { dbId, colGrades } = APPWRITE_CONFIG;
      const response = await createAdminClient().databases.listDocuments(dbId, colGrades, [
        Query.equal("code", gradeCode.toUpperCase()),
        Query.equal("level_id", levelId),
        Query.limit(1)
      ]);
      if (response.documents.length === 0) return null;
      return mapGrade(response.documents[0]);
    },
    ['grade-by-code'],
    { revalidate: 3600, tags: ['grades'] }
  );

  static getActiveTopics = unstable_cache(
    async (gradeId: string): Promise<Topic[]> => {
      const { dbId, colTopics } = APPWRITE_CONFIG;
      const response = await createAdminClient().databases.listDocuments(dbId, colTopics, [
        Query.equal("grade_id", gradeId),
        Query.equal("is_active", true),
        Query.orderAsc("order"),
      ]);
      return response.documents.map(mapTopic);
    },
    ['active-topics'],
    { revalidate: 3600, tags: ['topics'] }
  );

  static getTopicBySlug = unstable_cache(
    async (topicSlug: string, gradeId: string): Promise<Topic | null> => {
      const { dbId, colTopics } = APPWRITE_CONFIG;
      const response = await createAdminClient().databases.listDocuments(dbId, colTopics, [
        Query.equal("slug", topicSlug.toLowerCase()),
        Query.equal("grade_id", gradeId),
        Query.limit(1)
      ]);
      if (response.documents.length === 0) return null;
      return mapTopic(response.documents[0]);
    },
    ['topic-by-slug'],
    { revalidate: 3600, tags: ['topics'] }
  );

  static getActiveMaterials = unstable_cache(
    async (topicId: string, contentType?: string): Promise<Material[]> => {
      const { dbId, colMaterials } = APPWRITE_CONFIG;
      const queries = [
        Query.equal("topic_id", topicId),
        Query.equal("is_active", true),
        Query.orderAsc("order"),
      ];
      
      if (contentType) {
        queries.push(Query.equal("content_type", contentType));
      }

      const response = await createAdminClient().databases.listDocuments(dbId, colMaterials, queries);
      return response.documents.map(mapMaterial);
    },
    ['active-materials'],
    { revalidate: 3600, tags: ['materials'] }
  );

  static getActiveMaterialsByTopicIds = unstable_cache(
    async (topicIds: string[], contentType?: string): Promise<Material[]> => {
      if (!topicIds || topicIds.length === 0) return [];
      
      const { dbId, colMaterials } = APPWRITE_CONFIG;
      
      // Note: Appwrite's Query.equal accepts arrays for 'IN' queries (up to 100 items)
      // Since a grade won't have 100+ topics, this is safe and prevents N+1
      const queries = [
        Query.equal("topic_id", topicIds),
        Query.equal("is_active", true),
        Query.orderAsc("order"),
      ];

      if (contentType) {
        queries.push(Query.equal("content_type", contentType));
      }

      // We might need to fetch a larger limit if there are many materials across topics
      queries.push(Query.limit(100));

      const response = await createAdminClient().databases.listDocuments(dbId, colMaterials, queries);
      return response.documents.map(mapMaterial);
    },
    ['active-materials-by-topics'],
    { revalidate: 3600, tags: ['materials'] }
  );

  static getActiveQuizzes = unstable_cache(
    async (gradeId: string): Promise<Quiz[]> => {
      const { dbId, colQuizzes } = APPWRITE_CONFIG;
      const response = await createAdminClient().databases.listDocuments(dbId, colQuizzes, [
        Query.equal("grade_id", gradeId),
        Query.equal("is_active", true),
        Query.limit(50), 
      ]);
      return response.documents.map(mapQuiz);
    },
    ['active-quizzes'],
    { revalidate: 3600, tags: ['quizzes'] }
  );

  static getQuizById = unstable_cache(
    async (quizId: string): Promise<Quiz | null> => {
      const { dbId, colQuizzes } = APPWRITE_CONFIG;
      try {
        const doc = await createAdminClient().databases.getDocument(dbId, colQuizzes, quizId);
        return mapQuiz(doc);
      } catch {
        return null;
      }
    },
    ['quiz-by-id'],
    { revalidate: 3600, tags: ['quizzes'] }
  );
}
