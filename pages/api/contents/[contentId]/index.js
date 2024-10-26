import connectMongoDb from "@/database";
import Content from "@/lib/models/Content";

export default async function handler(req, res) {
  try {
    await connectMongoDb();

    const { contentId } = req.query;

    const content = await Content.findById(contentId);

    res.status(200).json({
      status: "success",
      data: { content },
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e,
    });
  }
}
