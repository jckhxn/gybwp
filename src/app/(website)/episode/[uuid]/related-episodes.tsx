import Image from "next/image";
import Button from "@/src/app/(website)/components/ui/button";

export default function RelatedEpisodes() {
  const episodes = [
    {
      id: 1,
      title: "Building a Culture of Innovation",
      season: 8,
      episode: 6,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      title: "Remote Work Strategies for 2025",
      season: 8,
      episode: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      title: "Leadership in the Digital Age",
      season: 8,
      episode: 4,
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  return (
    <div className="space-y-4">
      {episodes.map((ep) => (
        <div key={ep.id} className="flex gap-3">
          <Image
            src={ep.image || "/placeholder.svg"}
            alt={ep.title}
            width={80}
            height={80}
            className="rounded-md object-cover"
          />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">
              S{ep.season}E{ep.episode}
            </span>
            <h4 className="text-sm font-medium line-clamp-2">{ep.title}</h4>
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto mt-1 justify-start"
            >
              Listen Now
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full">
        View All Episodes
      </Button>
    </div>
  );
}
