import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedProjectTypes = new Set([
  "tutoring",
  "web_development",
  "ai/ml",
  "marketing",
  "other",
]);
const allowedBudgetRanges = new Set([
  "",
  "under-1000",
  "1000-5000",
  "5000-10000",
  "over-10000",
]);

export async function POST(request: Request) {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    console.error("SANITY_API_TOKEN is not configured");
    return NextResponse.json({ error: "Form unavailable" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const projectType = typeof body.projectType === "string" ? body.projectType : "";
  const budgetRange = typeof body.budgetRange === "string" ? body.budgetRange : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (
    name.length < 2 || name.length > 100 ||
    !emailPattern.test(email) || email.length > 254 ||
    !allowedProjectTypes.has(projectType) ||
    !allowedBudgetRanges.has(budgetRange) ||
    message.length < 10 || message.length > 2000
  ) {
    return NextResponse.json({ error: "Please check the form fields" }, { status: 400 });
  }

  const sanity = createClient({
    projectId: "kx25p8c1",
    dataset: "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });

  try {
    await sanity.create({
      _type: "contactMe",
      name,
      email,
      projectType,
      budgetRange: budgetRange || undefined,
      message,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json({ error: "Unable to send message" }, { status: 500 });
  }
}
