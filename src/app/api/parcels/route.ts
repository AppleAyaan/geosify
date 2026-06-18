import { NextResponse } from "next/server";
import { parcelRepository } from "@/lib/data/parcel-repository";

export async function GET() {
  return NextResponse.json(parcelRepository.getAll());
}
