#!/usr/bin/env node
'use strict';
/*
 * Genesis commit-time secret scan. Dependency-free; installed by Genesis bootstrap at
 * .githooks/genesis-secret-scan.js and run by .githooks/pre-commit.
 * It refuses a commit that stages a file matching the Genesis .gitignore secret patterns or content
 * matching common key formats.
 */
const { execFileSync } = require('child_process');

const SECRET_PATH_RULES = [
  { id: 'env-file', test: (p) => /(^|\/)\.env$/.test(p) || (/(^|\/)\.env\.[^/]+$/.test(p) && !/(^|\/)\.env\.example$/.test(p)) },
  { id: 'genesis-local-state', test: (p) => /(^|\/)\.genesis\//.test(p) },
  { id: 'gh-local-state', test: (p) => /(^|\/)\.gh\//.test(p) },
  { id: 'vscode-local-settings', test: (p) => /(^|\/)\.vscode\/[^/]*\.local[^/]*$/.test(p) },
  { id: 'pem-file', test: (p) => /\.pem$/i.test(p) },
  { id: 'key-file', test: (p) => /\.key$/i.test(p) },
];

// Patterns are assembled from parts so this file never matches its own rules.
const SECRET_CONTENT_RULES = [
  { id: 'private-key', pattern: new RegExp('-----BEGIN ' + '[A-Z0-9 ]*' + 'PRIVATE KEY' + '-----') },
  { id: 'aws-access-key-id', pattern: new RegExp('\\b' + 'AKIA' + '[0-9A-Z]{16}\\b') },
  { id: 'github-token', pattern: new RegExp('\\b' + 'gh[pousr]_' + '[A-Za-z0-9]{36,}') },
  { id: 'github-fine-grained-token', pattern: new RegExp('\\b' + 'github_pat_' + '[A-Za-z0-9_]{60,}') },
  { id: 'slack-token', pattern: new RegExp('\\b' + 'xox[abprs]-' + '[A-Za-z0-9-]{10,}') },
  { id: 'google-api-key', pattern: new RegExp('\\b' + 'AIza' + '[0-9A-Za-z_-]{35}') },
  { id: 'stripe-live-key', pattern: new RegExp('\\b' + '[sr]k_live_' + '[0-9A-Za-z]{20,}') },
];

function git(args) {
  return execFileSync('git', args, { encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 });
}

function stagedPaths() {
  const output = git(['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z']).toString('utf8');
  return output.split('\0').filter(Boolean);
}

function scanPath(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  return SECRET_PATH_RULES.filter((rule) => rule.test(normalized)).map((rule) => rule.id);
}

function scanContent(buffer) {
  if (buffer.includes(0)) {
    return [];
  }
  const text = buffer.toString('utf8');
  return SECRET_CONTENT_RULES.filter((rule) => rule.pattern.test(text)).map((rule) => rule.id);
}

function main() {
  const findings = [];
  for (const filePath of stagedPaths()) {
    for (const ruleId of scanPath(filePath)) {
      findings.push({ filePath, ruleId, kind: 'path' });
    }
    let content;
    try {
      content = git(['show', `:${filePath}`]);
    } catch {
      continue;
    }
    for (const ruleId of scanContent(content)) {
      findings.push({ filePath, ruleId, kind: 'content' });
    }
  }

  if (findings.length === 0) {
    return 0;
  }

  process.stderr.write('Genesis secret scan refused this commit. Staged files that look like secrets:\n');
  for (const finding of findings) {
    process.stderr.write(`  - ${finding.filePath} (${finding.kind}: ${finding.ruleId})\n`);
  }
  process.stderr.write('Unstage them (git restore --staged <file>) and keep secrets out of the repository.\n');
  process.stderr.write('Only for a reviewed false positive: commit once with git commit --no-verify.\n');
  return 1;
}

if (require.main === module) {
  process.exitCode = main();
}

module.exports = { scanPath, scanContent };
