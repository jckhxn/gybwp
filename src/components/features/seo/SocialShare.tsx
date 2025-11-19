"use client";

import { useState } from "react";
import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { toast } from "@/src/lib/use-toast";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
  via?: string;
  className?: string;
}

export default function SocialShare({
  url,
  title,
  description,
  hashtags = [],
  via = "gybwp_podcast",
  className = "",
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : "";
  const hashtagString = hashtags.length > 0 ? hashtags.join(",") : "business,leadership,podcast";

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=${via}&hashtags=${hashtagString}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link to clipboard.",
        variant: "destructive",
      });
    }
  };

  const openShareWindow = (url: string) => {
    window.open(
      url,
      "share",
      "width=600,height=400,scrollbars=yes,resizable=yes"
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => openShareWindow(shareLinks.twitter)}
          className="cursor-pointer"
        >
          <Twitter className="h-4 w-4 mr-2 text-blue-400" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openShareWindow(shareLinks.facebook)}
          className="cursor-pointer"
        >
          <Facebook className="h-4 w-4 mr-2 text-blue-600" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openShareWindow(shareLinks.linkedin)}
          className="cursor-pointer"
        >
          <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
          {copied ? (
            <Check className="h-4 w-4 mr-2 text-green-600" />
          ) : (
            <LinkIcon className="h-4 w-4 mr-2" />
          )}
          {copied ? "Copied!" : "Copy Link"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Specialized component for episodes
export function EpisodeSocialShare({
  episode,
  className,
}: {
  episode: {
    title: string;
    pathname?: { current: string };
    slug?: string;
    category?: string;
    guests?: Array<{ name: string }>;
  };
  className?: string;
}) {
  const url = `https://gybwp.com${episode.pathname?.current || `/episodes/${episode.slug}`}`;
  const guestNames = episode.guests?.map(g => g.name).join(", ");
  const description = guestNames 
    ? `Listen to ${episode.title} featuring ${guestNames} on Growing Your Business With People podcast.`
    : `Listen to ${episode.title} on Growing Your Business With People podcast.`;

  const hashtags = ["business", "leadership", "podcast"];
  if (episode.category) {
    hashtags.push(episode.category.toLowerCase());
  }

  return (
    <SocialShare
      url={url}
      title={episode.title}
      description={description}
      hashtags={hashtags}
      className={className}
    />
  );
}

// Specialized component for persons
export function PersonSocialShare({
  person,
  className,
}: {
  person: {
    name: string;
    slug?: { current: string };
    guestProfile?: {
      title?: string;
      company?: string;
    };
    role?: string;
  };
  className?: string;
}) {
  const url = `https://gybwp.com/guest/${person.slug?.current || person.name.toLowerCase().replace(/\s+/g, "-")}`;
  const title = `${person.name} - Growing Your Business With People`;
  const jobTitle = person.guestProfile?.title;
  const company = person.guestProfile?.company;
  
  let description = `Learn from ${person.name}`;
  if (jobTitle && company) {
    description += `, ${jobTitle} at ${company},`;
  } else if (jobTitle) {
    description += `, ${jobTitle},`;
  }
  description += " on Growing Your Business With People podcast.";

  const hashtags = ["business", "leadership", "expert"];
  if (person.role === "host-consultant") {
    hashtags.push("consultant");
  }

  return (
    <SocialShare
      url={url}
      title={title}
      description={description}
      hashtags={hashtags}
      className={className}
    />
  );
}