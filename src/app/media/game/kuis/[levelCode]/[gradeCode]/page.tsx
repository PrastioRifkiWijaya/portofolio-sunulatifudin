import { Section } from "@/components/Section";
import { PPKnService } from "@/services/ppkn.service";
import { notFound } from "next/navigation";
import { InteractiveQuiz } from "@/components/InteractiveQuiz";
import { PublicQuiz } from "@/data/ppkn";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default async function KuisArenaPage(props: { params: Promise<{ levelCode: string, gradeCode: string }> }) {
  const params = await props.params;
  const { levelCode, gradeCode } = params;
  
  const level = await PPKnService.getLevelByCode(levelCode);
  if (!level) notFound();

  const grade = await PPKnService.getGradeByCode(gradeCode, level.id);
  if (!grade) notFound();

  const allQuizzes = await PPKnService.getActiveQuizzes(grade.id);

  // If no quizzes found for this grade, show empty state
  if (!allQuizzes || allQuizzes.length === 0) {
    return (
      <Section className="min-h-[80vh] py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="font-title text-3xl font-bold text-secondary dark:text-white">
            Kuis Belum Tersedia
          </h1>
          <div className="bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700 p-12 rounded-3xl">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Belum ada soal kuis untuk kelas ini.
            </p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
              Silakan pilih kelas lain.
            </p>
          </div>
          <Link 
            href={`/media/game/kuis/${levelCode}`}
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Daftar Kelas
          </Link>
        </div>
      </Section>
    );
  }

  // Shuffle and limit to 10 questions
  const shuffledQuizzes = shuffleArray(allQuizzes);
  const selectedQuizzes = shuffledQuizzes.slice(0, 10);

  // Map to PublicQuiz to hide correct_answer from client props
  const publicQuizzes: PublicQuiz[] = selectedQuizzes.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
    explanation: q.explanation // sending public explanation as fallback
  }));

  return (
    <Section className="min-h-screen py-16 bg-gray-50/30 dark:bg-[#0a1128]">
      <InteractiveQuiz 
        quizzes={publicQuizzes} 
        levelCode={level.code} 
        gradeCode={grade.code} 
        gradeName={grade.name}
        levelName={level.name}
      />
    </Section>
  );
}
