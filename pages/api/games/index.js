import connectMongoDb from "@/database";
import Game from "@/lib/models/Game";

export default async function handler(req, res) {
  try {
    await connectMongoDb();

    const games = await Game.aggregate([
      {
        $match: {
          rtp: { $exists: true, $ne: null },
        },
      },
      {
        $limit: 20,
      },
      {
        $sort: {
          rtp: -1,
        },
      },
    ]);

    for (const game of games) {
      if (new Date() - new Date(game.updatedAt) > 1 * 60 * 1000) {
        game.rtp = parseFloat((Math.random() * (99 - 90) + 90).toFixed(2));
        await Game.findByIdAndUpdate(game._id, { rtp: game.rtp });
      }
    }

    games.sort((a, b) => b.rtp - a.rtp);

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
