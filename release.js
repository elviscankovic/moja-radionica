export function releaseUrls(repository) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository || '')) {
    throw new Error('Naziv GitHub repozitorija nije valjan.');
  }

  return {
    api: `https://api.github.com/repos/${repository}/releases/latest`,
    fallback: `https://github.com/${repository}/releases/latest`
  };
}

export function latestApkFromRelease(release) {
  if (!release || release.draft || release.prerelease) return null;

  const asset = Array.isArray(release.assets)
    ? release.assets.find((item) => item?.name?.toLowerCase().endsWith('.apk') && item?.browser_download_url)
    : null;

  if (!asset) return null;

  return {
    version: String(release.tag_name || '').replace(/^[vV]/, ''),
    url: asset.browser_download_url,
    size: Number(asset.size) || 0,
    publishedAt: release.published_at || ''
  };
}

export function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`;
}

export function formatCroatianDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('hr-HR', { day: 'numeric', month: 'numeric', year: 'numeric' }).format(date);
}
