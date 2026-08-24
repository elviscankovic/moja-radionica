import {
  releaseUrls,
  latestApkFromRelease,
  formatFileSize,
  formatCroatianDate
} from './release.js';

document.querySelector('#currentYear').textContent = new Date().getFullYear();

async function loadLatestRelease(panel) {
  const repository = panel.dataset.repository;
  const downloadButton = panel.querySelector('[data-download-button]');
  const downloadLabel = panel.querySelector('[data-download-label]');
  const releaseMeta = panel.querySelector('[data-release-meta]');
  const { api, fallback } = releaseUrls(repository);

  try {
    const response = await fetch(api, {
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
    downloadButton.href = fallback;
    downloadLabel.textContent = 'Otvori najnovije izdanje';
    releaseMeta.textContent = 'GitHub će prikazati aktualnu stabilnu verziju.';
  }
}

document.querySelectorAll('.download-panel[data-repository]').forEach(loadLatestRelease);
