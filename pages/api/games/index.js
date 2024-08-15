import connectMongoDb from "@/database";
import Game from "@/lib/models/Game";

export default async function handler(req, res) {
  try {
    await connectMongoDb();

    const games = await Game.find();

    res.status(200).json({
      status: "succes",
      results: games.length,
      data: { games },
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${e}`,
    });
  }
}
