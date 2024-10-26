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
