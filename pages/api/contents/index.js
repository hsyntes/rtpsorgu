import connectMongoDb from "@/database";
import Content from "@/lib/models/Content";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  origin: [
    "https://rtpsorgu.com",
    "https://www.rtpsorgu.com",
    "https://kokleyum.com",
    "https://www.kokleyum.com",
    "https://kokleyum.vercel.app",
    "https://rtpsorgu.vercel.app",
  ],
});

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export default async function handler(req, res) {
  initMiddleware(cors)(req, res);

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
