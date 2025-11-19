# GYBWP Intro Video - Remotion

This directory contains the Remotion project for generating intro videos showcasing the "Growing Your Business With People" podcast website components.

## Structure

- `compositions/` - Main video compositions
- `scenes/` - Individual scene components
- `assets/` - Static assets (images, audio, etc.)

## Video Scenes

The intro video consists of 4 main scenes (45 seconds total at 30fps):

1. **HeroScene** (0-10s) - Brand introduction with hero section animation
2. **LatestEpisodeScene** (10-20s) - Latest episode showcase
3. **BrowseEpisodesScene** (20-35s) - Episode browsing interface
4. **CTAScene** (35-45s) - Newsletter signup and social media

## Usage

### Preview the video in Remotion Studio:
```bash
npm run video
```

### Render the final video:
```bash
npm run video:render
```

### Preview compositions:
```bash
npm run video:preview
```

## Customization

The video uses the same brand colors, fonts, and styling as the main website:
- Primary color: #CBA052
- Secondary color: #2A6B74
- Main background: #293243
- Gradient backgrounds matching the website

Each scene is fully animated with staggered entrances, smooth transitions, and branded elements that match the original website components.

## Output

The rendered video will be saved to `out/intro.mp4` as a 1920x1080 MP4 file suitable for social media, presentations, or embedding.