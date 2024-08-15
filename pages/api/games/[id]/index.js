import connectMongoDb from "@/database";
import Game from "@/lib/models/Game";

export default async function handler(req, res) {
  try {
    await connectMongoDb();

    const { id } = req.query;
    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({
        status: "error",
        message: "Game not found",
      });
    }

    const createRandomRTP = () => (Math.random() * (99 - 90) + 90).toFixed(2);

    if (!game.rtp) {
      game.rtp = parseFloat(createRandomRTP());
      await game.save();
    }

    if (new Date() - new Date(game.updatedAt) > 20 * 60 * 1000) {
      game.rtp = parseFloat(createRandomRTP());
      await game.save();
    }

    res.status(200).json({
      status: "success",
      data: { game },
    });
  } catch (e) {
    console.error(`Error: ${e.message}`);
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${e.message}`,
    });
  }
}
