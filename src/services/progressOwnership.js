/**
 * Decide whether browser-cached progress can be reused for the current
 * Supabase identity. Anonymous demo data may be claimed once by a signed-in
 * account; one signed-in account's cache must never cross into another.
 */
export function isSameProgressOwner(previousOwner, currentOwner) {
  return Boolean(
    previousOwner
    && currentOwner
    && previousOwner.userId
    && previousOwner.userId === currentOwner.userId
    && previousOwner.isAnonymous === currentOwner.isAnonymous
  );
}

export function canMigrateAnonymousProgress(owner) {
  return owner?.isAnonymous === true;
}

export function canReuseLocalProgress(previousOwner, currentOwner) {
  return isSameProgressOwner(previousOwner, currentOwner)
    || canMigrateAnonymousProgress(previousOwner)
    || (!previousOwner && currentOwner?.isAnonymous === true);
}

export function canUseOfflineLocalProgress(previousOwner, hasLocalState) {
  return !hasLocalState || canMigrateAnonymousProgress(previousOwner);
}
