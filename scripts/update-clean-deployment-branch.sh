#!/usr/bin/env bash
set -euo pipefail

deploy_branch="${DEPLOYMENT_BRANCH:-deployment}"
source_ref="${1:-HEAD}"
repo_root="$(git rev-parse --show-toplevel)"
temporary_index="$(mktemp -t mednote-deploy-index.XXXXXX)"

cleanup() {
    rm -f "$temporary_index"
}
trap cleanup EXIT

cd "$repo_root"

if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "Refusing to build the deployment branch from a dirty tracked worktree." >&2
    exit 1
fi

export GIT_INDEX_FILE="$temporary_index"
git read-tree "$source_ref"
git rm -r --cached --ignore-unmatch public/endo2026/media >/dev/null

deploy_tree="$(git write-tree)"
deploy_parent="$(git rev-parse -q --verify "refs/heads/$deploy_branch" || true)"
source_commit="$(git rev-parse "$source_ref")"
commit_message="Deploy ${source_commit} without ENDO slide binaries"

if [[ -n "$deploy_parent" ]]; then
    deploy_commit="$(printf '%s\n' "$commit_message" | git commit-tree "$deploy_tree" -p "$deploy_parent")"
else
    deploy_commit="$(printf '%s\n' "$commit_message" | git commit-tree "$deploy_tree")"
fi

git update-ref "refs/heads/$deploy_branch" "$deploy_commit" "$deploy_parent"

if git ls-tree -r --name-only "$deploy_commit" -- public/endo2026/media | grep -q .; then
    echo "Deployment branch still contains ENDO media; refusing to continue." >&2
    exit 1
fi

tracked_bytes="$(git ls-tree -r -l "$deploy_commit" | awk '{sum += $4} END {print sum + 0}')"
tracked_files="$(git ls-tree -r --name-only "$deploy_commit" | wc -l | tr -d ' ')"
echo "Updated $deploy_branch -> $deploy_commit"
echo "Source: $source_commit"
echo "Tracked files: $tracked_files"
echo "Tracked blob bytes: $tracked_bytes"
echo "Push only after R2 verification: git push origin $deploy_branch"
