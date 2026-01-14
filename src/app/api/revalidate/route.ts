import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token to prevent unauthorized revalidation
    const secret = request.nextUrl.searchParams.get("secret");

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const body = await request.json();
    const { _type, slug, pathname } = body;

    // Revalidate based on content type
    if (_type === "episode" && slug?.current) {
      await revalidatePath(`/episodes/${slug.current}`);
      await revalidatePath("/"); // Revalidate homepage for latest episodes
      await revalidateTag("episodes"); // Revalidate all episode-related data
    } else if (_type === "person" && pathname) {
      await revalidatePath(pathname);
      await revalidateTag("persons");
    } else if (_type === "page" && pathname) {
      await revalidatePath(pathname);
      await revalidateTag("pages");
    } else if (pathname) {
      // Generic pathname revalidation
      await revalidatePath(pathname);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      _type,
      slug: slug?.current,
      pathname,
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error revalidating", error: errorMessage },
      { status: 500 }
    );
  }
}
