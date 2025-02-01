import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const min = parseInt(searchParams.get("min") || "0");
  const max = parseInt(searchParams.get("max") || "100");

  if (isNaN(min) || isNaN(max) || min >= max) {
    return NextResponse.json(
      { error: "Intervalo inválido. Certifique-se de que 'min < max'." },
      { status: 400 }
    );
  }

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return NextResponse.json({ result: randomNumber });
}
