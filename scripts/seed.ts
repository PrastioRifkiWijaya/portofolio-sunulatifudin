/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client, Databases } from "node-appwrite";
// Define mock data for seeding
const dummyLevels = [
  { id: "level_sd", name: "Sekolah Dasar", code: "SD", description: "Materi PPKn untuk tingkat Sekolah Dasar", order: 1, is_active: true },
  { id: "level_smp", name: "Sekolah Menengah Pertama", code: "SMP", description: "Materi PPKn untuk tingkat Sekolah Menengah Pertama", order: 2, is_active: true },
  { id: "level_sma", name: "Sekolah Menengah Atas", code: "SMA", description: "Materi PPKn untuk tingkat Sekolah Menengah Atas", order: 3, is_active: true },
  { id: "level_smk", name: "Sekolah Menengah Kejuruan", code: "SMK", description: "Materi PPKn untuk tingkat Sekolah Menengah Kejuruan", order: 4, is_active: true },
];

const dummyGrades = [
  ...Array.from({ length: 6 }).map((_, i) => ({ id: `grade_sd_${i + 1}`, level_id: "level_sd", name: `Kelas ${i + 1}`, code: `SD-${i + 1}`, description: `Materi PPKn untuk kelas ${i + 1} SD`, order: i + 1, is_active: true })),
  ...Array.from({ length: 3 }).map((_, i) => ({ id: `grade_smp_${i + 7}`, level_id: "level_smp", name: `Kelas ${i + 7}`, code: `SMP-${i + 7}`, description: `Materi PPKn untuk kelas ${i + 7} SMP`, order: i + 1, is_active: true })),
  ...Array.from({ length: 3 }).map((_, i) => ({ id: `grade_sma_${i + 10}`, level_id: "level_sma", name: `Kelas ${i + 10}`, code: `SMA-${i + 10}`, description: `Materi PPKn untuk kelas ${i + 10} SMA`, order: i + 1, is_active: true })),
  ...Array.from({ length: 3 }).map((_, i) => ({ id: `grade_smk_${i + 10}`, level_id: "level_smk", name: `Kelas ${i + 10}`, code: `SMK-${i + 10}`, description: `Materi PPKn untuk kelas ${i + 10} SMK`, order: i + 1, is_active: true })),
];

const dummyTopics = [
  { id: "topic_sd_1_1", grade_id: "grade_sd_1", name: "Pancasila", slug: "pancasila", description: "Pengenalan lambang negara", order: 1, is_active: true },
  { id: "topic_sd_1_2", grade_id: "grade_sd_1", name: "Aturan di Rumah", slug: "aturan-di-rumah", description: "Aturan-aturan yang ada di lingkungan rumah", order: 2, is_active: true },
  { id: "topic_smp_8_1", grade_id: "grade_smp_8", name: "Kedudukan Pancasila sebagai Dasar Negara", slug: "pancasila", description: "Mempelajari kedudukan dan fungsi Pancasila sebagai dasar negara", order: 1, is_active: true },
  { id: "topic_smp_8_2", grade_id: "grade_smp_8", name: "UUD Negara Republik Indonesia Tahun 1945", slug: "uud-1945", description: "Pemahaman tentang UUD 1945", order: 2, is_active: true },
  { id: "topic_sma_10_1", grade_id: "grade_sma_10", name: "Pancasila", slug: "pancasila", description: "Implementasi Pancasila", order: 1, is_active: true },
];

const dummyMaterials = [
  { id: "mat_smp_8_1_1", topic_id: "topic_smp_8_1", title: "Pengertian Pancasila", slug: "pengertian-pancasila", description: "Materi ini membahas pengertian dan sejarah perumusan Pancasila secara singkat.", content_type: "pdf", drive_url: "https://drive.google.com/file/d/PPKN_DUMMY_SMP_8_001/view", estimated_duration: 15, order: 1, is_active: true },
  { id: "mat_smp_8_1_2", topic_id: "topic_smp_8_1", title: "Kedudukan Pancasila sebagai Dasar Negara", slug: "kedudukan-pancasila", description: "Penjelasan rinci mengenai fungsi Pancasila sebagai dasar negara.", content_type: "presentation", drive_url: "https://drive.google.com/file/d/PPKN_DUMMY_SMP_8_002/view", estimated_duration: 30, order: 2, is_active: true },
  { id: "mat_smp_8_1_3", topic_id: "topic_smp_8_1", title: "Implementasi Nilai Pancasila", slug: "implementasi-nilai", description: "Contoh implementasi nilai-nilai Pancasila dalam kehidupan sehari-hari.", content_type: "video", drive_url: "https://drive.google.com/file/d/PPKN_DUMMY_SMP_8_003/view", estimated_duration: 10, order: 3, is_active: true }
];

const dummyQuizzes = [
  // SD Kelas 1
  { id: "quiz_sd_1_1", grade_id: "grade_sd_1", question: "Apa lambang negara Indonesia?", options: ["Pohon Beringin", "Burung Garuda", "Bintang", "Padi dan Kapas"], correct_answer: 1, explanation: "Lambang negara Republik Indonesia adalah Garuda Pancasila.", is_active: true },
  { id: "quiz_sd_1_2", grade_id: "grade_sd_1", question: "Warna bendera negara Indonesia adalah...", options: ["Merah dan Hitam", "Putih dan Merah", "Merah dan Putih", "Merah dan Biru"], correct_answer: 2, explanation: "Bendera Negara Kesatuan Republik Indonesia adalah Sang Merah Putih.", is_active: true },
  { id: "quiz_sd_1_3", grade_id: "grade_sd_1", question: "Lagu kebangsaan Indonesia adalah...", options: ["Indonesia Raya", "Bagimu Negeri", "Garuda Pancasila", "Hari Merdeka"], correct_answer: 0, explanation: "Lagu kebangsaan Indonesia adalah Indonesia Raya ciptaan W.R. Supratman.", is_active: true },
  { id: "quiz_sd_1_4", grade_id: "grade_sd_1", question: "Sila pertama Pancasila dilambangkan dengan...", options: ["Bintang", "Rantai", "Pohon Beringin", "Kepala Banteng"], correct_answer: 0, explanation: "Bintang emas merupakan lambang dari sila pertama Pancasila, Ketuhanan Yang Maha Esa.", is_active: true },
  { id: "quiz_sd_1_5", grade_id: "grade_sd_1", question: "Dimana kita biasa melaksanakan upacara bendera?", options: ["Di pasar", "Di rumah", "Di sekolah", "Di jalan"], correct_answer: 2, explanation: "Upacara bendera secara rutin dilaksanakan di sekolah setiap hari Senin.", is_active: true },

  // SMP Kelas 8
  { id: "quiz_smp_8_1", grade_id: "grade_smp_8", question: "Pancasila disahkan sebagai dasar negara pada tanggal...", options: ["1 Juni 1945", "17 Agustus 1945", "18 Agustus 1945", "22 Juni 1945"], correct_answer: 2, explanation: "Pancasila secara resmi disahkan bersamaan dengan UUD 1945 oleh PPKI pada 18 Agustus 1945.", is_active: true },
  { id: "quiz_smp_8_2", grade_id: "grade_smp_8", question: "Siapa yang mengetik naskah proklamasi kemerdekaan Indonesia?", options: ["Sayuti Melik", "Soekarno", "Moh. Hatta", "Ahmad Soebardjo"], correct_answer: 0, explanation: "Naskah proklamasi hasil rumusan diketik oleh Sayuti Melik.", is_active: true },
  { id: "quiz_smp_8_3", grade_id: "grade_smp_8", question: "BPUPKI dibentuk pada tanggal...", options: ["1 Maret 1945", "29 April 1945", "29 Mei 1945", "18 Agustus 1945"], correct_answer: 0, explanation: "BPUPKI dibentuk pada 1 Maret 1945.", is_active: true },
  { id: "quiz_smp_8_4", grade_id: "grade_smp_8", question: "Berapa jumlah anggota PPKI pada awal pembentukannya?", options: ["9 orang", "15 orang", "21 orang", "27 orang"], correct_answer: 2, explanation: "PPKI awalnya beranggotakan 21 orang.", is_active: true },
  { id: "quiz_smp_8_5", grade_id: "grade_smp_8", question: "UUD 1945 sebelum diamandemen terdiri dari berapa bab?", options: ["16 Bab", "20 Bab", "37 Bab", "4 Bab"], correct_answer: 0, explanation: "Sebelum amandemen, UUD 1945 terdiri atas Pembukaan, Batang Tubuh (16 Bab).", is_active: true },

  // SMA Kelas 10
  { id: "quiz_sma_10_1", grade_id: "grade_sma_10", question: "Hak asasi manusia dijamin di dalam UUD 1945 khususnya pada pasal...", options: ["Pasal 27", "Pasal 28A-28J", "Pasal 29", "Pasal 30"], correct_answer: 1, explanation: "Amandemen kedua UUD 1945 memasukkan ketentuan HAM secara rinci pada Bab XA, dari Pasal 28A hingga 28J.", is_active: true },
  { id: "quiz_sma_10_2", grade_id: "grade_sma_10", question: "Asas kewarganegaraan berdasarkan pertalian darah atau keturunan disebut...", options: ["Ius Soli", "Ius Sanguinis", "Bipatride", "Apatride"], correct_answer: 1, explanation: "Ius sanguinis adalah asas kewarganegaraan yang ditentukan berdasarkan keturunan darah orang tuanya.", is_active: true },
  { id: "quiz_sma_10_3", grade_id: "grade_sma_10", question: "Lembaga negara yang memiliki wewenang untuk memberhentikan Presiden adalah...", options: ["DPR", "Mahkamah Agung", "Mahkamah Konstitusi", "MPR"], correct_answer: 3, explanation: "Menurut UUD 1945, MPR berwenang memberhentikan Presiden dan/atau Wakil Presiden dalam masa jabatannya.", is_active: true },
  { id: "quiz_sma_10_4", grade_id: "grade_sma_10", question: "Sistem demokrasi yang diterapkan di Indonesia saat ini adalah...", options: ["Demokrasi Liberal", "Demokrasi Terpimpin", "Demokrasi Pancasila", "Demokrasi Rakyat"], correct_answer: 2, explanation: "Indonesia menganut sistem Demokrasi Pancasila yang bersumber dari tata nilai sosial budaya bangsa.", is_active: true },
  { id: "quiz_sma_10_5", grade_id: "grade_sma_10", question: "Batas laut teritorial Indonesia sejauh...", options: ["12 mil", "24 mil", "200 mil", "350 mil"], correct_answer: 0, explanation: "Laut teritorial Indonesia adalah jalur laut selebar 12 mil laut yang diukur dari garis pangkal kepulauan.", is_active: true },

  // SMK Kelas 10
  { id: "quiz_smk_10_1", grade_id: "grade_smk_10", question: "Nilai keadilan sosial yang sangat penting bagi lulusan SMK di dunia kerja adalah wujud sila ke...", options: ["Dua", "Tiga", "Empat", "Lima"], correct_answer: 3, explanation: "Keadilan sosial (Sila Kelima) menjamin hak pekerja, kesejahteraan, dan perlakuan yang adil di tempat kerja.", is_active: true },
  { id: "quiz_smk_10_2", grade_id: "grade_smk_10", question: "Sikap disiplin dan mematuhi SOP kerja selaras dengan nilai konstitusi yaitu...", options: ["Pasal 27 ayat 2", "Kesadaran Hukum", "Wawasan Nusantara", "HAM"], correct_answer: 1, explanation: "Kesadaran hukum berarti mematuhi semua regulasi, baik hukum negara maupun tata tertib kerja/SOP industri.", is_active: true },
  { id: "quiz_smk_10_3", grade_id: "grade_smk_10", question: "Kerja sama antar rekan kerja dari berbagai latar belakang mencerminkan semangat...", options: ["Gotong Royong", "Individualisme", "Primordialisme", "Etnosentrisme"], correct_answer: 0, explanation: "Gotong royong adalah budaya bangsa yang mengutamakan kerjasama untuk mencapai tujuan bersama tanpa memandang latar belakang.", is_active: true },
  { id: "quiz_smk_10_4", grade_id: "grade_smk_10", question: "Kewajiban utama warga negara muda dalam mengisi kemerdekaan melalui jalur pendidikan vokasi adalah...", options: ["Mencari kerja di luar negeri", "Meningkatkan kompetensi memajukan industri", "Berhenti belajar setelah lulus", "Hanya menuntut hak upah"], correct_answer: 1, explanation: "Meningkatkan keterampilan vokasi berguna untuk kemandirian ekonomi dan kemajuan industri bangsa (bela negara).", is_active: true },
  { id: "quiz_smk_10_5", grade_id: "grade_smk_10", question: "Jika ada perselisihan kerja, penyelesaian terbaik sesuai Pancasila adalah melalui...", options: ["Pemogokan massal", "Musyawarah Mufakat", "Pengadilan langsung", "Arbitrase internasional"], correct_answer: 1, explanation: "Musyawarah mufakat (Sila Keempat) adalah cara utama bangsa Indonesia dalam menyelesaikan masalah.", is_active: true }
];
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const endpoint = process.env.APPWRITE_ENDPOINT!;
const projectId = process.env.APPWRITE_PROJECT_ID!;
const apiKey = process.env.APPWRITE_API_KEY!;
const dbId = process.env.APPWRITE_DATABASE_ID!;

if (!endpoint || !projectId || !apiKey) {
  console.error("Missing Appwrite credentials in .env.local");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const databases = new Databases(client);

const colLevels = process.env.APPWRITE_EDUCATION_LEVELS_COLLECTION_ID!;
const colGrades = process.env.APPWRITE_GRADES_COLLECTION_ID!;
const colTopics = process.env.APPWRITE_TOPICS_COLLECTION_ID!;
const colMaterials = process.env.APPWRITE_MATERIALS_COLLECTION_ID!;
const colQuizzes = process.env.APPWRITE_QUIZZES_COLLECTION_ID!;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function ensureDatabase() {
  try {
    await databases.get(dbId);
    console.log(`✅ Database ${dbId} already exists`);
  } catch (err: any) {
    if (err.code === 404) {
      console.log(`Database not found. Creating database: ${dbId}...`);
      await databases.create(dbId, "PPKn Database");
      console.log(`✅ Database ${dbId} created`);
    } else {
      throw err;
    }
  }
}

async function ensureCollection(colId: string, name: string) {
  try {
    await databases.getCollection(dbId, colId);
    console.log(`✅ Collection ${colId} already exists`);
  } catch (err: any) {
    if (err.code === 404) {
      console.log(`Collection not found. Creating: ${colId}...`);
      await databases.createCollection(dbId, colId, name);
      console.log(`✅ Collection ${colId} created`);
    } else {
      throw err;
    }
  }
}

async function checkAttributeReady(colId: string, key: string, maxRetries = 10) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const attr = await databases.getAttribute(dbId, colId, key);
      if (attr.status === 'available') {
        return true;
      }
    } catch (e) {
      // Ignore
    }
    await sleep(2000);
  }
  return false;
}

async function createAttribute(colId: string, type: string, key: string, size?: number, required: boolean = false, isArray: boolean = false) {
  try {
    await databases.getAttribute(dbId, colId, key);
  } catch (err: any) {
    if (err.code === 404) {
      console.log(`Creating attribute ${key} in ${colId}...`);
      if (type === "string") {
        await databases.createStringAttribute(dbId, colId, key, size || 255, required, undefined, isArray);
      } else if (type === "integer") {
        await databases.createIntegerAttribute(dbId, colId, key, required, undefined, undefined, undefined, isArray);
      } else if (type === "boolean") {
        await databases.createBooleanAttribute(dbId, colId, key, required, undefined, isArray);
      } else if (type === "datetime") {
        await databases.createDatetimeAttribute(dbId, colId, key, required, undefined, isArray);
      }
      await checkAttributeReady(colId, key);
    }
  }
}

async function createIndex(colId: string, key: string, attributes: string[]) {
  try {
    const col = await databases.getCollection(dbId, colId);
    const hasIndex = col.indexes.some((idx: any) => idx.key === key);
    if (!hasIndex) {
      console.log(`Creating index ${key} in ${colId}...`);
      await databases.createIndex(dbId, colId, key, "key" as any, attributes);
      await sleep(1000);
    }
  } catch (e: any) {
    console.log(`Error checking/creating index ${key}: ${e.message}`);
  }
}

async function seedData(colId: string, data: any[]) {
  for (const item of data) {
    try {
      await databases.getDocument(dbId, colId, item.id);
      console.log(`Document ${item.id} already exists in ${colId}`);
    } catch (err: any) {
      if (err.code === 404) {
        console.log(`Seeding document ${item.id} to ${colId}...`);
        
        // Remove 'id' from data as it's passed as documentId
        const { id, ...documentData } = item;
        
        // Add timestamps
        const now = new Date().toISOString();
        const finalData = {
          ...documentData,
          created_at: now,
          updated_at: now
        };

        if (colId === colMaterials) {
          finalData.published_at = now;
        }

        await databases.createDocument(dbId, colId, id, finalData);
      }
    }
  }
}

async function main() {
  console.log("Starting Appwrite Seed...");
  await ensureDatabase();

  // 1. Education Levels
  await ensureCollection(colLevels, "Education Levels");
  await createAttribute(colLevels, "string", "name", 255, true);
  await createAttribute(colLevels, "string", "code", 50, true);
  await createAttribute(colLevels, "string", "description", 1000, false);
  await createAttribute(colLevels, "integer", "order", undefined, true);
  await createAttribute(colLevels, "boolean", "is_active", undefined, true);
  await createAttribute(colLevels, "datetime", "created_at", undefined, true);
  await createAttribute(colLevels, "datetime", "updated_at", undefined, true);
  await createIndex(colLevels, "idx_code", ["code"]);
  await createIndex(colLevels, "idx_is_active", ["is_active"]);
  await createIndex(colLevels, "idx_order", ["order"]);

  // 2. Grades
  await ensureCollection(colGrades, "Grades");
  await createAttribute(colGrades, "string", "level_id", 50, true);
  await createAttribute(colGrades, "string", "name", 255, true);
  await createAttribute(colGrades, "string", "code", 50, true);
  await createAttribute(colGrades, "string", "description", 1000, false);
  await createAttribute(colGrades, "integer", "order", undefined, true);
  await createAttribute(colGrades, "boolean", "is_active", undefined, true);
  await createAttribute(colGrades, "datetime", "created_at", undefined, true);
  await createAttribute(colGrades, "datetime", "updated_at", undefined, true);
  await createIndex(colGrades, "idx_level_id", ["level_id"]);
  await createIndex(colGrades, "idx_code", ["code"]);
  await createIndex(colGrades, "idx_is_active", ["is_active"]);
  await createIndex(colGrades, "idx_order", ["order"]);

  // 3. Topics
  await ensureCollection(colTopics, "Topics");
  await createAttribute(colTopics, "string", "grade_id", 50, true);
  await createAttribute(colTopics, "string", "name", 255, true);
  await createAttribute(colTopics, "string", "slug", 100, true);
  await createAttribute(colTopics, "string", "description", 1000, false);
  await createAttribute(colTopics, "integer", "order", undefined, true);
  await createAttribute(colTopics, "string", "thumbnail_url", 1000, false);
  await createAttribute(colTopics, "boolean", "is_active", undefined, true);
  await createAttribute(colTopics, "datetime", "created_at", undefined, true);
  await createAttribute(colTopics, "datetime", "updated_at", undefined, true);
  await createIndex(colTopics, "idx_grade_id", ["grade_id"]);
  await createIndex(colTopics, "idx_slug", ["slug"]);
  await createIndex(colTopics, "idx_is_active", ["is_active"]);
  await createIndex(colTopics, "idx_order", ["order"]);

  // 4. Materials
  await ensureCollection(colMaterials, "Materials");
  await createAttribute(colMaterials, "string", "topic_id", 50, true);
  await createAttribute(colMaterials, "string", "title", 255, true);
  await createAttribute(colMaterials, "string", "slug", 100, true);
  await createAttribute(colMaterials, "string", "description", 1000, false);
  await createAttribute(colMaterials, "string", "content_type", 50, true);
  await createAttribute(colMaterials, "string", "drive_url", 1000, true);
  await createAttribute(colMaterials, "string", "drive_file_id", 255, false);
  await createAttribute(colMaterials, "string", "thumbnail_url", 1000, false);
  await createAttribute(colMaterials, "integer", "estimated_duration", undefined, false);
  await createAttribute(colMaterials, "integer", "order", undefined, true);
  await createAttribute(colMaterials, "boolean", "is_active", undefined, true);
  await createAttribute(colMaterials, "datetime", "published_at", undefined, false);
  await createAttribute(colMaterials, "datetime", "created_at", undefined, true);
  await createAttribute(colMaterials, "datetime", "updated_at", undefined, true);
  await createIndex(colMaterials, "idx_topic_id", ["topic_id"]);
  await createIndex(colMaterials, "idx_slug", ["slug"]);
  await createIndex(colMaterials, "idx_content_type", ["content_type"]);
  await createIndex(colMaterials, "idx_is_active", ["is_active"]);
  await createIndex(colMaterials, "idx_order", ["order"]);

  // 5. Quizzes
  await ensureCollection(colQuizzes, "Quizzes");
  await createAttribute(colQuizzes, "string", "grade_id", 50, true);
  await createAttribute(colQuizzes, "string", "question", 1000, true);
  await createAttribute(colQuizzes, "string", "options", 255, true, true); // array = true
  await createAttribute(colQuizzes, "integer", "correct_answer", undefined, true);
  await createAttribute(colQuizzes, "string", "explanation", 1000, true);
  await createAttribute(colQuizzes, "boolean", "is_active", undefined, true);
  await createAttribute(colQuizzes, "datetime", "created_at", undefined, true);
  await createAttribute(colQuizzes, "datetime", "updated_at", undefined, true);
  await createIndex(colQuizzes, "idx_grade_id", ["grade_id"]);
  await createIndex(colQuizzes, "idx_is_active", ["is_active"]);
  
  // Wait a moment for all attributes to be fully initialized before creating indexes / seeding data
  console.log("Waiting for indexes to propagate...");
  await sleep(3000);

  // Set Permissions to Public Read for the collections
  // This is required for frontend access without auth
  console.log("Updating permissions to public read...");
  const publicRead = ["read(\"any\")"];
  await databases.updateCollection(dbId, colLevels, "Education Levels", publicRead);
  await databases.updateCollection(dbId, colGrades, "Grades", publicRead);
  await databases.updateCollection(dbId, colTopics, "Topics", publicRead);
  await databases.updateCollection(dbId, colMaterials, "Materials", publicRead);
  await databases.updateCollection(dbId, colQuizzes, "Quizzes", publicRead);

  // SEED DATA
  console.log("\nSeeding Education Levels...");
  await seedData(colLevels, dummyLevels);

  console.log("\nSeeding Grades...");
  await seedData(colGrades, dummyGrades);

  console.log("\nSeeding Topics...");
  await seedData(colTopics, dummyTopics);

  console.log("\nSeeding Materials...");
  await seedData(colMaterials, dummyMaterials);

  console.log("\nSeeding Quizzes...");
  await seedData(colQuizzes, dummyQuizzes);

  console.log("\n✅ Seed completed successfully!");
}

main().catch(console.error);
