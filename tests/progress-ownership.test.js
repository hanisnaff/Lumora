import test from "node:test";
import assert from "node:assert/strict";
import {
  isSameProgressOwner,
  canMigrateAnonymousProgress,
  canReuseLocalProgress,
  canUseOfflineLocalProgress,
  hasLearningActivity,
  shouldMigrateAnonymousProgress,
  canStartAnonymousSession,
} from "../src/services/progressOwnership.js";

test("creates anonymous sessions only when no signed-in owner is stranded", () => {
  assert.equal(canStartAnonymousSession(null), true);
  assert.equal(canStartAnonymousSession({ userId: "anon-a", isAnonymous: true }), true);
  assert.equal(canStartAnonymousSession({ userId: "user-a", isAnonymous: false }), false);
});

test("reuses a cache for the same authenticated user", () => {
  const owner = { userId: "user-a", isAnonymous: false };
  assert.equal(isSameProgressOwner(owner, { ...owner }), true);
  assert.equal(canReuseLocalProgress(owner, { ...owner }), true);
});

test("never reuses one signed-in user's cache for a different account", () => {
  const previous = { userId: "user-a", isAnonymous: false };
  const current = { userId: "user-b", isAnonymous: false };
  assert.equal(isSameProgressOwner(previous, current), false);
  assert.equal(canReuseLocalProgress(previous, current), false);
  assert.equal(canReuseLocalProgress(previous, { userId: "anon-new", isAnonymous: true }), false);
  assert.equal(canUseOfflineLocalProgress(previous, true), false);
});

test("allows anonymous demo progress to be claimed during sign-in", () => {
  const anonymousOwner = { userId: "anon-a", isAnonymous: true };
  const signedInOwner = { userId: "user-b", isAnonymous: false };
  assert.equal(canMigrateAnonymousProgress(anonymousOwner), true);
  assert.equal(canReuseLocalProgress(anonymousOwner, signedInOwner), true);
});

test("does not auto-claim unowned legacy progress in a remote-enabled app", () => {
  const newAnonymousOwner = { userId: "anon-new", isAnonymous: true };
  assert.equal(canReuseLocalProgress(null, newAnonymousOwner), false);
});

test("does not treat an unowned local cache as anonymous when the current user is signed in", () => {
  const signedInOwner = { userId: "user-b", isAnonymous: false };
  assert.equal(canReuseLocalProgress(null, signedInOwner), false);
});

test("keeps anonymous progress available offline but protects signed-in caches", () => {
  assert.equal(canUseOfflineLocalProgress({ userId: "anon-a", isAnonymous: true }, true), true);
  assert.equal(canUseOfflineLocalProgress({ userId: "user-a", isAnonymous: false }, true), false);
  assert.equal(canUseOfflineLocalProgress(null, true), false);
  assert.equal(canUseOfflineLocalProgress(null, false), true);
});

test("migrates anonymous progress only when the destination account has no activity", () => {
  const anonymousOwner = { userId: "anon-a", isAnonymous: true };
  assert.equal(shouldMigrateAnonymousProgress(anonymousOwner, null), true);
  assert.equal(shouldMigrateAnonymousProgress(anonymousOwner, {}), true);
  assert.equal(shouldMigrateAnonymousProgress(anonymousOwner, { assessmentAnswers: { 1: 0 } }), false);
  assert.equal(shouldMigrateAnonymousProgress({ userId: "user-a", isAnonymous: false }, null), false);
});

test("distinguishes an empty cloud row from existing account progress", () => {
  assert.equal(hasLearningActivity(null), false);
  assert.equal(hasLearningActivity({}), false);
  assert.equal(hasLearningActivity({ assessmentResult: {} }), false);
  assert.equal(hasLearningActivity({ assessmentAnswers: [] }), false);
  assert.equal(hasLearningActivity({ conceptMasteries: { pointers: { score: 0, questionsTested: 0 } } }), false);
  assert.equal(hasLearningActivity({ assessmentAnswers: { 1: 0 } }), true);
  assert.equal(hasLearningActivity({ practiceAttempts: [{ timestamp: 1 }] }), true);
  assert.equal(hasLearningActivity({ completedLessons: ["dereferencing"] }), true);
  assert.equal(hasLearningActivity({ conceptMasteries: { pointers: { score: 50, questionsTested: 2 } } }), true);
});
