// app/api/games/route.ts
import type { RowDataPacket } from "mysql2";

import { NextResponse } from "next/server";

import logger from "@/lib/logs";
import { db } from "@/lib/db";

interface GameRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  category: string;
  image_url: string;
}

export async function GET() {
  try {
    // Fetch all games from the database
    const [rows] = await db.execute<GameRow[]>(
      `SELECT id, name, slug, category, image_url FROM games ORDER BY name ASC`
    );

    if (!rows.length) {
      return NextResponse.json({ games: [] });
    }

    // Map games to response format
    // Note: products no longer have game_id after migration,
    // so we just return games without product count
    const gamesData = rows.map((game) => ({
      id: game.id,
      name: game.name,
      slug: game.slug,
      category: game.category,
      imageUrl: game.image_url,
      planCount: 0, // Products no longer linked to games directly
    }));

    return NextResponse.json({ games: gamesData });
  } catch (err) {
    logger.error("Games API error:", err);

    return NextResponse.json(
      { error: "Failed to load games data" },
      { status: 500 }
    );
  }
}
