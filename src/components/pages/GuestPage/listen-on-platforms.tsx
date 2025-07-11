"use client";

import { useState } from "react";
import { Headphones, ChevronDown, Music, Music2 } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { toast } from "@/src/lib/use-toast";

export default function ListenOnPlatforms() {
  const [isOpen, setIsOpen] = useState(false);

  const platforms = [
    {
      name: "Spotify",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      ),
      url: "#spotify",
    },
    {
      name: "Apple Podcasts",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c2.336 0 4.448 1.843 4.448 4.795 0 1.752-.784 2.88-1.96 3.84.868.784 2.24 1.68 2.24 3.864 0 2.784-2.24 4.776-4.728 4.776-2.336 0-4.392-1.6-4.392-4.216 0-2.52 1.792-3.864 3.808-4.112-1.12-.952-1.792-2.072-1.792-3.536 0-2.952 2.056-4.411 4.376-4.411zm0 1.232c-1.624 0-3.064 1.12-3.064 3.152 0 2.24 1.736 3.208 3.04 3.208 1.568 0 3.128-1.12 3.128-3.152 0-2.128-1.456-3.208-3.104-3.208zm-.112 7.84c-1.4 0-3.064 1.12-3.064 3.04 0 1.904 1.624 2.784 3.04 2.784 1.596 0 3.208-1.008 3.208-2.952 0-1.792-1.512-2.872-3.184-2.872z" />
        </svg>
      ),
      url: "#apple",
    },
    {
      name: "Google Podcasts",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.988v4.151c0 .479.063.863.141.863s.141-.384.141-.863v-4.151c0-.479-.063-.863-.141-.863s-.141.384-.141.863zm0-16.127v4.151c0 .479.063.863.141.863s.141-.384.141-.863V1.861c0-.479-.063-.863-.141-.863s-.141.384-.141.863zm7.52 8.351h4.151c.479 0 .863-.063.863-.141s-.384-.141-.863-.141H19.52c-.479 0-.863.063-.863.141s.384.141.863.141zM0 10.212h4.151c.479 0 .863-.063.863-.141s-.384-.141-.863-.141H0c-.479 0-.863.063-.863.141s.384.141.863.141zm16.835 6.62l2.935 2.935c.339.339.679.437.76.218s-.098-.421-.437-.76l-2.935-2.935c-.339-.339-.679-.437-.76-.218s.098.421.437.76zm-9.67-9.67l2.935 2.935c.339.339.679.437.76.218s-.098-.421-.437-.76L7.488 6.62c-.339-.339-.679-.437-.76-.218s.098.421.437.76zm-.76 9.67c.339-.339.437-.679.218-.76s-.421.098-.76.437l-2.935 2.935c-.339.339-.437.679-.218.76s.421-.098.76-.437zm9.67-9.67c.339-.339.437-.679.218-.76s-.421.098-.76.437L12.598 9.804c-.339.339-.437.679-.218.76s.421-.098.76-.437zM12 6.761v10.478c0 .479.063.863.141.863s.141-.384.141-.863V6.761c0-.479-.063-.863-.141-.863s-.141.384-.141.863z" />
        </svg>
      ),
      url: "#google",
    },
    {
      name: "Amazon Music",
      icon: <Music2 className="w-4 h-4" />,
      url: "#amazon",
    },
    {
      name: "Overcast",
      icon: <Music className="w-4 h-4" />,
      url: "#overcast",
    },
  ];

  const handlePlatformClick = (platform: string, url: string) => {
    // In a real implementation, this would navigate to the platform
    toast({
      title: `Opening ${platform}`,
      description: `Navigating to ${platform} to listen to this episode`,
    });
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="gap-2">
          <Headphones className="w-4 h-4" />
          Listen on Platforms
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {platforms.map((platform) => (
          <DropdownMenuItem
            key={platform.name}
            onClick={() => handlePlatformClick(platform.name, platform.url)}
            className="gap-2"
          >
            {platform.icon}
            {platform.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
