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

    // Close any modals/overlays by pressing Escape
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 500));

    // Take viewport screenshot
    await page.screenshot({
      path: '/tmp/landing-page-viewport.png'
    });

    // Scroll and take more screenshots
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: '/tmp/landing-page-scroll1.png'
    });

    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: '/tmp/landing-page-scroll2.png'
    });

    console.log('Screenshots saved');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
