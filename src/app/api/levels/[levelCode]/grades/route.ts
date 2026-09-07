import { NextRequest, NextResponse } from "next/server";
import { PPKnService } from "@/services/ppkn.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ levelCode: string }> }
) {
  try {
    const { levelCode } = await params;
    
    // 1. Get level by code to validate and get its ID
    const level = await PPKnService.getLevelByCode(levelCode);
    
    if (!level || !level.is_active) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Jenjang pendidikan tidak ditemukan atau tidak aktif" } },
        { status: 404 }
      );
    }

    // 2. Get grades by level ID
    const grades = await PPKnService.getActiveGrades(level.id);
    
    return NextResponse.json({
      data: grades,
      meta: { total: grades.length }
    });
  } catch (error: unknown) {
    console.error(`GET /api/levels/[levelCode]/grades error:`, error);
    return NextResponse.json(
      { error: { code: "INTERNAL_SERVER_ERROR", message: "Gagal mengambil data kelas" } },
      { status: 500 }
    );
  }
}
