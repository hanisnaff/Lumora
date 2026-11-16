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

/**
 * Distinguish an empty/default cloud row from an account that already has
 * learning activity. Anonymous demo progress may fill an empty account, but
 * must never overwrite an account that already contains learner work.
 */
export function hasLearningActivity(state) {
  if (!state || typeof state !== "object" || Array.isArray(state)) return false;
  if (state.assessmentResult && typeof state.assessmentResult === "object"
    && !Array.isArray(state.assessmentResult)
    && Object.keys(state.assessmentResult).length > 0) return true;
  if (state.assessmentAnswers && typeof state.assessmentAnswers === "object"
    && !Array.isArray(state.assessmentAnswers)
    && Object.keys(state.assessmentAnswers).length > 0) return true;
  if (Array.isArray(state.practiceAttempts) && state.practiceAttempts.length > 0) return true;
  if (Array.isArray(state.completedLessons) && state.completedLessons.length > 0) return true;

  if (state.conceptMasteries && typeof state.conceptMasteries === "object") {
    return Object.values(state.conceptMasteries).some((mastery) => {
      if (!mastery || typeof mastery !== "object") return false;
      return Number(mastery.questionsTested) > 0
        || Number(mastery.correctAnswers) > 0
        || Number(mastery.score) > 0;
    });
  }
  return false;
}
