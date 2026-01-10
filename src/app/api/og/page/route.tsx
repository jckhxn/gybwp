import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { ImageResponse } = await import("@vercel/og");
  
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Growing Your Business With People";
    const description = searchParams.get("description") || "Leadership insights and business growth strategies";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0F172A",
            backgroundImage: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            padding: "80px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "1000px",
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: title.length > 60 ? 56 : 68,
                fontWeight: 800,
                color: "#FFFFFF",
                textAlign: "center",
                lineHeight: 1.2,
                marginBottom: 30,
                textShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
              }}
            >
              {title}
            </div>

            {/* Description */}
            {description && (
              <div
                style={{
                  fontSize: 28,
                  color: "#94A3B8",
                  textAlign: "center",
                  marginBottom: 60,
                  lineHeight: 1.4,
                }}
              >
                {description}
              </div>
            )}

            {/* Branding */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                marginTop: 40,
                paddingTop: 40,
                borderTop: "2px solid rgba(148, 163, 184, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#60A5FA",
                }}
              >
                GYBWP
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: "#94A3B8",
                }}
              >
                Growing Your Business With People
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
