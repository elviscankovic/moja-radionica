import {
  RELEASE_API,
  RELEASE_FALLBACK,
  latestApkFromRelease,
  formatFileSize,
  formatCroatianDate
} from './release.js';

const downloadButton = document.querySelector('#downloadButton');
const downloadLabel = document.querySelector('#downloadLabel');
const releaseMeta = document.querySelector('#releaseMeta');

document.querySelector('#currentYear').textContent = new Date().getFullYear();

async function loadLatestRelease() {
  try {
    const response = await fetch(RELEASE_API, {
      headers: { Accept: 'application/vnd.github+json' }
    });

    if (!response.ok) throw new Error(`GitHub API: ${response.status}`);

    const apk = latestApkFromRelease(await response.json());
    if (!apk) throw new Error('U najnovijem izdanju nema APK datoteke.');

    downloadButton.href = apk.url;
    downloadLabel.textContent = apk.version ? `Preuzmi APK v${apk.version}` : 'Preuzmi najnoviji APK';

    const details = [formatFileSize(apk.size), formatCroatianDate(apk.publishedAt)].filter(Boolean);
    releaseMeta.textContent = details.length ? `Stabilno Android izdanje · ${details.join(' · ')}` : 'Stabilno Android izdanje · APK';
  } catch (error) {
    downloadButton.href = RELEASE_FALLBACK;
    downloadLabel.textContent = 'Otvori najnovije izdanje';
    releaseMeta.textContent = 'GitHub će prikazati aktualnu stabilnu verziju.';
  }
}

loadLatestRelease();
