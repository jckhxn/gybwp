const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 500));

    // Get full page height
    const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);

    // Set viewport to full page height
    await page.setViewport({ width: 1920, height: fullHeight });

    // Take full page screenshot
    await page.screenshot({
      path: '/tmp/landing-page-full-new.png'
    });

    console.log(`Full page height: ${fullHeight}px`);
    console.log('Screenshot saved to /tmp/landing-page-full-new.png');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
