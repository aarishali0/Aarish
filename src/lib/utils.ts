/**
 * Check if referer is from linkedin or any other work related site
 */
export const isWorkRelatedReferer = (referer: string | undefined): boolean => {
  if (!referer) return false;
  const sites = ["linkedin", "indeed", "angel.co", "glassdoor"];
  return sites.some((site) => referer.includes(site));
};
