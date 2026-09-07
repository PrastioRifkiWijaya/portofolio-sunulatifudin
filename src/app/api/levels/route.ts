import { NextResponse } from "next/server";
import { PPKnService } from "@/services/ppkn.service";

export async function GET() {
  try {
    const levels = await PPKnService.getActiveLevels();
    return NextResponse.json({
      data: levels,
      meta: { total: levels.length }
    });
  } catch (error: unknown) {
    console.error("GET /api/levels error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_SERVER_ERROR", message: "Gagal mengambil data jenjang pendidikan" } },
      { status: 500 }
    );
  }
}
