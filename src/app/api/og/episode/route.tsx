import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { ImageResponse } = await import("@vercel/og");
  
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Growing Your Business With People";
    const guests = searchParams.get("guests") || "";
    const episode = searchParams.get("episode") || "";
    const thumbnail = searchParams.get("thumbnail");

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
            position: "relative",
          }}
        >
          {/* Thumbnail background if available */}
          {thumbnail && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.15,
                display: "flex",
              }}
            >
              <img
                src={thumbnail}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px",
              zIndex: 1,
              maxWidth: "1100px",
            }}
          >
            {/* Episode number */}
            {episode && (
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  color: "#60A5FA",
                  marginBottom: 20,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {episode}
              </div>
            )}

            {/* Title */}
            <div
              style={{
                fontSize: title.length > 80 ? 48 : 60,
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

            {/* Guests */}
            {guests && (
              <div
                style={{
                  fontSize: 28,
                  color: "#94A3B8",
                  textAlign: "center",
                  marginBottom: 40,
                }}
              >
                with {guests}
              </div>
            )}

            {/* Podcast branding */}
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
