import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { releaseUrls, latestApkFromRelease, formatFileSize, formatCroatianDate } from './release.js';

const apk = latestApkFromRelease({
  tag_name: 'v1.1.1',
  draft: false,
  prerelease: false,
  published_at: '2026-08-24T04:58:30Z',
  assets: [
    { name: 'source.zip', browser_download_url: 'https://example.com/source.zip', size: 100 },
    { name: 'Moja_potrosnja_struje-v1.1.1.apk', browser_download_url: 'https://github.com/example/app.apk', size: 4325883 }
  ]
});

assert.equal(apk.version, '1.1.1');
assert.equal(apk.url, 'https://github.com/example/app.apk');
assert.equal(formatFileSize(apk.size), '4,1 MB');
assert.match(formatCroatianDate(apk.publishedAt), /24\.\s?0?8\.\s?2026/);
assert.equal(latestApkFromRelease({ draft: true, assets: [] }), null);
assert.equal(latestApkFromRelease({ prerelease: true, assets: [] }), null);
assert.equal(latestApkFromRelease({ assets: [] }), null);
assert.deepEqual(releaseUrls('elviscankovic/moje-radno-vrijeme'), {
  api: 'https://api.github.com/repos/elviscankovic/moje-radno-vrijeme/releases/latest',
  fallback: 'https://github.com/elviscankovic/moje-radno-vrijeme/releases/latest'
});
assert.throws(() => releaseUrls('neispravno'), /nije valjan/);

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
assert.equal((html.match(/<article class="app-card/g) || []).length, 3);
assert.match(html, /elvis\.cankovic@gmail\.com/);
assert.equal((html.match(/data-download-button/g) || []).length, 2);
assert.match(html, /data-repository="elviscankovic\/moja-potrosnja-struje"/);
assert.match(html, /data-repository="elviscankovic\/moje-radno-vrijeme"/);
assert.match(html, /Zlatne ruke/);
assert.match(html, /Moje radno vrijeme/);

console.log('Test je prošao: sadržaj stranice i automatski najnoviji stabilni APK rade.');
