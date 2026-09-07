import { NextRequest, NextResponse } from "next/server";
import { PPKnService } from "@/services/ppkn.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ levelCode: string; gradeCode: string; topicSlug: string }> }
) {
  try {
    const { levelCode, gradeCode, topicSlug } = await params;
    
    // 1. Get level to validate
    const level = await PPKnService.getLevelByCode(levelCode);
    if (!level || !level.is_active) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Jenjang pendidikan tidak ditemukan atau tidak aktif" } },
        { status: 404 }
      );
    }

    // 2. Get grade to validate and ensure it belongs to the level
    const grade = await PPKnService.getGradeByCode(gradeCode, level.id);
    if (!grade || !grade.is_active) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Kelas tidak ditemukan pada jenjang ini" } },
        { status: 404 }
      );
    }

    // 3. Get topic to validate and ensure it belongs to the grade
    const topic = await PPKnService.getTopicBySlug(topicSlug, grade.id);
    if (!topic || !topic.is_active) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Topik tidak ditemukan pada kelas ini" } },
        { status: 404 }
      );
    }

    // 4. Get materials by topic ID
    const materials = await PPKnService.getActiveMaterials(topic.id);
    
    return NextResponse.json({
      data: materials,
      meta: { total: materials.length }
    });
  } catch (error: unknown) {
    console.error(`GET /api/levels/[levelCode]/grades/[gradeCode]/topics/[topicSlug]/materials error:`, error);
    return NextResponse.json(
      { error: { code: "INTERNAL_SERVER_ERROR", message: "Gagal mengambil data materi" } },
      { status: 500 }
    );
  }
}
