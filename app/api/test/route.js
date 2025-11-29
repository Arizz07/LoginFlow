import { connectDB } from "@/app/lib/connectDB";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ ok: true, message: "MongoDB Connected ✅" });
  } catch (err) {
    return Response.json(
      { ok: false, message: "Failed to connect", error: err.message },
      { status: 500 }
    );
  }
}
