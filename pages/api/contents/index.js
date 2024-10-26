import connectMongoDb from "@/database";
import Content from "@/lib/models/Content";

export default async function handler(req, res) {
  try {
    await connectMongoDb();

    if (req.method === "GET") {
      try {
        const contents = await Content.aggregate([
          {
            $sample: { size: 10 },
          },
        ]);

        return res.status(200).json({
          status: "success",
          data: { contents },
        });
      } catch (e) {
        console.error(e);
        return res.status(500).json({
          status: "fail",
          message: e,
        });
      }
    }

    if (req.method === "POST") {
      try {
        const { content_title, content_description, content_headings } =
          req.body;

        const content = await Content.create({
          content_title,
          content_description,
          content_headings,
        });

        return res.status(201).json({
          status: "success",
          message: "Content created successfully.",
          data: { content },
        });
      } catch (e) {
        console.error(e);
        return res.status(500).json({
          status: "fail",
          message: e,
        });
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "fail",
      message: e,
    });
  }
}
