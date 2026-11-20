# Sanctuary Quest — Firestore Security Specification

## Data Invariants
1. A `StudyProfile` at `/studyProfiles/{userId}` can only be read, created, updated, or deleted by the verified user whose `request.auth.uid == userId` and `request.auth.token.email_verified == true`.
2. A `MissionNote` at `/studyProfiles/{userId}/notes/{missionId}` requires an existing parent `/studyProfiles/{userId}` document (`exists(...)` on create) and matching ownership (`ownerId == request.auth.uid == userId`).
3. `ownerId` and `createdAt` are immutable across updates; `createdAt` and `updatedAt` must equal `request.time`.
4. All arrays (`completedMissions`, `quizBonusEarned`, `readVerses`) and strings (`content`, `missionId`, `ownerId`) enforce strict upper bounds.
5. No collection-wide `list` access is granted on `/studyProfiles`; each learner fetches only their own `/studyProfiles/{uid}` document and lists only `/studyProfiles/{uid}/notes`.

## Dirty Dozen Adversarial Payloads (Must All Return PERMISSION_DENIED)
1. Unauthenticated read of `/studyProfiles/user123`.
2. Authenticated user `userA` reading `/studyProfiles/userB`.
3. Authenticated user `userA` creating `/studyProfiles/userA` with `ownerId: "userB"` (identity spoofing).
4. Unverified email user (`email_verified: false`) writing `/studyProfiles/userA`.
5. Shadow field injection: creating `/studyProfiles/userA` with extra field `isAdmin: true`.
6. Oversized `xp` (`xp: 999999`) or negative `xp` (`xp: -10`).
7. Unbounded `completedMissions` list (`14` items exceeding max `13`) or non-integer element (`["bad"]`).
8. Client-forged `createdAt` timestamp (`"2020-01-01T00:00:00Z"` instead of `request.time`).
9. Updating immutable `ownerId` or `createdAt` on `/studyProfiles/userA`.
10. Creating `/studyProfiles/userA/notes/0` when parent `/studyProfiles/userA` does not exist (orphaned subcollection write).
11. Creating `/studyProfiles/userA/notes/invalid_id` failing `^[0-9]{1,2}$` ID pattern or injecting a 1.5KB path variable.
12. Value poisoning: updating `/studyProfiles/userA/notes/0` with `content` longer than `5000` characters or non-string type.
