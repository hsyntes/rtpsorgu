import connectMongoDb from "@/database";

export default async function handler(req, res) {
  try {
    await connectMongoDb();

    res.status(200).json({
      status: "success",
      message: "OK!",
    });
  } catch (e) {
    console.error(`Something went wrong.`);
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${e}`,
    });
  }
}
