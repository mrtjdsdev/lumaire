const UPSTREAM = process.env.LUMAIRE_WAITLIST_URL ?? "https://ir.lumaire.io/api/waitlist";

const MODELS = new Set(['Wall Hub (10.0")', 'Kitchen Display (7.5")', 'Gallery Frame (13.3")']);

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!raw || typeof raw !== "object") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const body = raw as { name?: unknown; email?: unknown; selectedProducts?: unknown };
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 160) : "";
  const selectedProducts = Array.isArray(body.selectedProducts)
    ? body.selectedProducts.filter((item): item is string => typeof item === "string" && MODELS.has(item))
    : [];

  if (!name || !email) {
    return Response.json({ error: "Name and email are required to join the waitlist." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, selectedProducts }),
      cache: "no-store",
    });
    const text = await upstream.text();
    let data: { message?: string; error?: string };
    try {
      data = JSON.parse(text) as { message?: string; error?: string };
    } catch {
      return Response.json(
        { error: "The waitlist service returned an unexpected response. Email founders@lumaire.io." },
        { status: 502 },
      );
    }

    if (!upstream.ok) {
      return Response.json(
        { error: typeof data.error === "string" && data.error ? data.error : "Could not join the waitlist. Please try again." },
        { status: upstream.status },
      );
    }

    return Response.json({
      message: typeof data.message === "string" && data.message ? data.message : "The waitlist accepted this submission.",
    });
  } catch {
    return Response.json(
      { error: "The waitlist service is unreachable. Email founders@lumaire.io." },
      { status: 502 },
    );
  }
}
