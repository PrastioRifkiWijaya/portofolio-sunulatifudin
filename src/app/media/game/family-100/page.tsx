
import { Family100Game } from "@/components/game/family100/Family100Game";
import { family100DummyQuestions } from "@/data/family100/questions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Family 100 - Media Pembelajaran",
  description: "Game edukasi Family 100 untuk pembelajaran PPKn",
};

export default function Family100Page() {
  return (
    <div className="min-h-screen w-full bg-[#051033] flex flex-col pt-20">
      <div className="w-full h-full px-2 md:px-4 py-4 space-y-4 grow flex flex-col">
        {/* Navigation Breadcrumb */}
        <Link
          href="/media"
          className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors ml-4 md:ml-8 mt-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Media Pembelajaran
        </Link>

        {/* Game Container */}
        <div className="w-full grow flex">
          <Family100Game questions={family100DummyQuestions} />
        </div>

      </div>
    </div>
  );
}
