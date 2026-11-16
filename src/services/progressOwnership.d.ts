export interface ProgressOwner {
  userId?: string | null;
  isAnonymous?: boolean;
}

export function isSameProgressOwner(
  previousOwner: ProgressOwner | null,
  currentOwner: ProgressOwner | null
): boolean;

export function canMigrateAnonymousProgress(owner: ProgressOwner | null): boolean;

export function canReuseLocalProgress(
  previousOwner: ProgressOwner | null,
  currentOwner: ProgressOwner | null
): boolean;

export function canUseOfflineLocalProgress(
  previousOwner: ProgressOwner | null,
  hasLocalState: boolean
): boolean;

export function hasLearningActivity(state: unknown): boolean;

export function shouldMigrateAnonymousProgress(
  owner: ProgressOwner | null,
  cloudState: unknown
): boolean;
