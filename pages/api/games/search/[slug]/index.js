import connectMongoDb from "@/database";
import Game from "@/lib/models/Game";

export default async function handler(req, res) {
  try {
    await connectMongoDb();

    const { slug } = req.query;

    const games = await Game.find({
      $or: [
        { name: { $regex: slug, $options: "i" } },
        { slug: { $regex: slug, $options: "i" } },
      ],
    });

    res.status(200).json({
      status: "success",
      results: games.length,
      data: { games },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${e}`,
    });
  }
}
