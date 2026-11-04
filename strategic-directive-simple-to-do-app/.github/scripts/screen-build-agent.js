#!/usr/bin/env node

/**
 * Genesis Screen Build Agent
 * Cloud-based LLM agent for Phase 2 screen generation
 * 
 * Runs in GitHub Actions, uses Claude to analyze Strategic Directive
 * and generate comprehensive screen specifications and questions
 */

const fs = require('fs');
const path = require('path');

// Configuration from environment
const WORKSPACE_ID = process.env.WORKSPACE_ID;
const FOUNDER_NAME = process.env.FOUNDER_NAME || 'Founder';
const STRATEGIC_DIRECTIVE_PATH = process.env.STRATEGIC_DIRECTIVE_PATH;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Paths
const WORKSPACE_ROOT = process.cwd();
const SPECS_OUTPUT_PATH = path.join(WORKSPACE_ROOT, 'Genesis Execution', 'specs', 'UX Specs');
const MANIFEST_PATH = path.join(WORKSPACE_ROOT, '.screen-generation-manifest.json');
const ERROR_MANIFEST_PATH = path.join(WORKSPACE_ROOT, '.screen-generation-error.json');

// Timing
const START_TIME = Date.now();

// Logging helpers
function log(message) {
  console.log(`[ScreenAgent] ${message}`);
}

function logError(message) {
  console.error(`[ScreenAgent] ERROR: ${message}`);
}

/**
 * Validate environment
 */
function validateEnvironment() {
  const required = ['WORKSPACE_ID', 'STRATEGIC_DIRECTIVE_PATH', 'GITHUB_TOKEN'];
  const missing = required.filter(v => !process.env[v]);

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }

  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is empty or not set');
  }

  log(`Environment validated`);
  log(`Workspace: ${WORKSPACE_ID}`);
  log(`Directive path: ${STRATEGIC_DIRECTIVE_PATH}`);
}

/**
 * Load Strategic Directive from project
 */
function loadStrategicDirective() {
  const directivePath = path.join(WORKSPACE_ROOT, STRATEGIC_DIRECTIVE_PATH);

  if (!fs.existsSync(directivePath)) {
    throw new Error(
      `Strategic Directive not found at: ${directivePath}\n` +
      `Checked relative to: ${WORKSPACE_ROOT}`
    );
  }

  const content = fs.readFileSync(directivePath, 'utf-8');
  log(`Loaded Strategic Directive (${content.length} chars)`);

  return content;
}

/**
 * Load governance templates
 */
function loadGovernanceTemplates() {
  const baseDirs = [];

  const activeGovernancePath = path.join(WORKSPACE_ROOT, '.genesis', 'governance', 'active.json');
  if (fs.existsSync(activeGovernancePath)) {
    try {
      const activeGovernance = JSON.parse(fs.readFileSync(activeGovernancePath, 'utf8'));
      if (activeGovernance.governance_root) {
        baseDirs.push(path.join(WORKSPACE_ROOT, activeGovernance.governance_root, '02_PHASE_2_SPECIFICATION'));
      }
      if (activeGovernance.governance_version) {
        baseDirs.push(path.join(WORKSPACE_ROOT, '.genesis', 'governance', 'versions', activeGovernance.governance_version, '02_PHASE_2_SPECIFICATION'));
      }
    } catch (error) {
      logError(`Failed to read active governance metadata: ${error.message}`);
    }
  }

  baseDirs.push(
    path.join(WORKSPACE_ROOT, 'Genesis Extension v0.9.9', '02_PHASE_2_SPECIFICATION'),
    path.join(WORKSPACE_ROOT, 'Genesis-v0.94-extracted', 'Genesis v0.9.4', '02_PHASE_2_SPECIFICATION')
  );

  let templateDir = null;
  for (const dir of baseDirs) {
    if (fs.existsSync(dir)) {
      templateDir = dir;
      break;
    }
  }

  if (!templateDir) {
    throw new Error(
      `Governance templates not found. Tried:\n` +
      baseDirs.map(d => `  - ${d}`).join('\n')
    );
  }

  const specFormatPath = path.join(templateDir, 'SPECIFICATION_FORMAT.md');
  const questionsFormatPath = path.join(templateDir, 'QUESTIONS_FORMAT.md');

  if (!fs.existsSync(specFormatPath)) {
    throw new Error(`Missing: ${specFormatPath}`);
  }
  if (!fs.existsSync(questionsFormatPath)) {
    throw new Error(`Missing: ${questionsFormatPath}`);
  }

  const specFormat = fs.readFileSync(specFormatPath, 'utf-8');
  const questionsFormat = fs.readFileSync(questionsFormatPath, 'utf-8');

  log(`Loaded governance templates (spec: ${specFormat.length} chars, questions: ${questionsFormat.length} chars)`);

  return { specFormat, questionsFormat };
}

/**
 * Call Claude to generate screens
 */
async function generateScreensWithClaude(strategicDirective, govTemplates) {
  const systemPrompt = `You are the Genesis Screen Build Agent, operating under Genesis governance v0.9.9.

AUTHORITY: You are authorized to analyze Strategic Directives and generate comprehensive screen specifications.

GOVERNANCE CONSTRAINTS:
- All screen specifications MUST follow the 12-section format exactly (headers, sections, structure)
- All questions documents MUST follow the 4-category format exactly
- You MUST classify each screen as one of: primary | secondary | admin | settings | onboarding | error
- Do NOT include TBD, TK, or placeholder content anywhere
- If information is unclear or missing, document as QUESTION with context and options
- Document all assumptions made during generation

OUTPUT REQUIREMENT:
Return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:

{
  "status": "success" | "error",
  "screens": [
    {
      "id": "Screen-001-Name",
      "classification": "primary",
      "specification": "## Screen Purpose\\n\\n... (full 12-section specification markdown) ...",
      "questions": "## UX/Design Questions\\n\\n... (full 4-category questions markdown) ..."
    }
  ],
  "summary": {
    "screensIdentified": 5,
    "assumptions": ["Assumption 1", "Assumption 2"],
    "clarificationsNeeded": []
  }
}

If any critical issue is encountered:
- Set status to "error"
- Include issue description in summary.clarificationsNeeded
- Return immediately (do NOT continue)`;

  const userPrompt = `Analyze this Strategic Directive and generate comprehensive screen specifications for all screens required.

STRATEGIC DIRECTIVE:
==================
${strategicDirective}

SPECIFICATION FORMAT REFERENCE (follow this structure exactly):
===============================================================
${govTemplates.specFormat}

QUESTIONS FORMAT REFERENCE (follow this structure exactly):
===========================================================
${govTemplates.questionsFormat}

TASK INSTRUCTIONS:
==================

1. SCREEN IDENTIFICATION:
   - Identify ALL screens required to fully implement the Strategic Directive
   - Include: authentication flows, main application screens, secondary features, admin screens, settings
   - Classify each screen as: primary | secondary | admin | settings | onboarding | error
   - Order screens logically: authentication first, main flows, secondary flows, admin/settings last

2. SCREEN ID FORMAT:
   - Format: Screen-NNN-Name (zero-padded 3 digits, hyphens as separators, Pascal-Case)
   - Examples: Screen-001-Login, Screen-002-User-Dashboard, Screen-003-Note-Editor
   - Start numbering at 001

3. FOR EACH SCREEN, GENERATE:

   A. SPECIFICATION.MD (exactly 12 sections, no more, no less):
      1. Screen Purpose (one-sentence summary)
      2. User Goals (bulleted list)
      3. Layout & Hierarchy (visual structure)
      4. Components & Elements (detailed list with specs)
      5. Interactions & Behaviors (user actions → outcomes)
      6. Data Requirements (input/output, APIs, state)
      7. Validation & Error Handling (rules and error messages)
      8. Loading & Empty States (what to show during these states)
      9. Responsive Behavior (mobile, tablet, desktop)
      10. Accessibility (a11y, keyboard nav, screen readers)
      11. Success Criteria (how to verify implementation)
      12. Related Screens (links to other screens)

      Requirements:
      - Use proper Markdown headers (##, ###)
      - Comprehensive detail, not summaries
      - NO "TBD", "TK", or placeholders
      - Specific labels, validation messages, field names
      - Include ALL components and interactions
      - Assume the reader has no prior knowledge

   B. QUESTIONS.MD (exactly 4 categories):
      1. UX/Design Questions (visual/UX decisions not in directive)
      2. Technical Questions (technical decisions, architecture)
      3. Business Logic Questions (business rule decisions)
      4. Edge Cases & Error Handling (unusual scenarios)

      Format for each question:
      - **[Component/Area] - [Specific Question]**
        - Context: [Why this is uncertain]
        - Options: [2-3 options if applicable]
        - Impact: [What depends on this answer]

      Requirements:
      - Include BOTH obvious questions AND deep ambiguities
      - For each gap in the Strategic Directive, create a question
      - Be specific and actionable (not vague)
      - Mark high-level vs deep with [HIGH-LEVEL] or [DEEP] tags
      - Typically 15-30 questions per screen

4. QUALITY STANDARDS:
   - NO placeholders anywhere
   - Every assumption documented as a question
   - Every component detailed completely
   - Every interaction documented
   - Screen names clear and descriptive
   - Classifications accurate and useful

5. ERROR HANDLING:
   If Strategic Directive is unclear or incomplete:
   - DO generate screens with reasonable defaults
   - DO document all assumptions in summary.assumptions
   - DO create questions for all uncertainties
   - DO NOT stop or fail on incomplete information

6. RETURN FORMAT:
   Return ONLY valid JSON (no markdown wrapping, no code blocks).
   Do not include \`\`\`json markers.
   Ensure the JSON is valid and parseable.`;

  log('Invoking Claude 4.5 via GitHub Models...');

  try {
    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        model: 'claude-4-5',
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ],
        system: systemPrompt,
        max_tokens: 16000,
        temperature: 0
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub Models API error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    log('Claude response received');

    const content = data.choices[0].message.content;
    if (!content) {
      throw new Error('No content in Claude response');
    }

    // Parse JSON from response
    let generationResult;
    try {
      const responseText = content.trim();

      // Remove markdown code blocks if present
      let jsonText = responseText;
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '');
      }

      generationResult = JSON.parse(jsonText);
    } catch (parseError) {
      logError(`Failed to parse Claude response as JSON`);
      logError(`Response (first 500 chars): ${content.slice(0, 500)}`);
      throw parseError;
    }

    if (generationResult.screens) {
      log(`Screens identified: ${generationResult.screens.length}`);
    }

    return generationResult;
  } catch (error) {
    logError(`Claude invocation failed: ${error.message}`);
    throw error;
  }
}

/**
 * Write screens to disk
 */
function writeScreensToDisk(generationResult) {
  const screens = generationResult.screens || [];

  if (screens.length === 0) {
    throw new Error('No screens returned from Claude');
  }

  // Ensure output directory exists
  if (!fs.existsSync(SPECS_OUTPUT_PATH)) {
    fs.mkdirSync(SPECS_OUTPUT_PATH, { recursive: true });
    log(`Created output directory: ${SPECS_OUTPUT_PATH}`);
  }

  const screenIndex = [];

  for (const screen of screens) {
    // Validate screen object
    if (!screen.id || !screen.specification || !screen.questions) {
      logError(`Invalid screen object: missing required fields`);
      logError(`Screen: ${JSON.stringify(screen).substring(0, 200)}`);
      throw new Error(`Screen missing required fields: id, specification, questions`);
    }

    // Create screen folder
    const screenFolder = path.join(SPECS_OUTPUT_PATH, screen.id);
    if (!fs.existsSync(screenFolder)) {
      fs.mkdirSync(screenFolder, { recursive: true });
    }

    // Write Specification.md
    const specPath = path.join(screenFolder, 'Specification.md');
    fs.writeFileSync(specPath, screen.specification);
    log(`Created: ${screen.id}/Specification.md`);

    // Write Questions.md
    const questionsPath = path.join(screenFolder, 'Questions.md');
    fs.writeFileSync(questionsPath, screen.questions);
    log(`Created: ${screen.id}/Questions.md`);

    // Track for Screen-Index
    screenIndex.push({
      id: screen.id,
      classification: screen.classification || 'primary',
      status: 'Pending'
    });
  }

  // Write Screen-Index.md (canonical format)
  const indexContent = formatScreenIndex(screenIndex);
  const indexPath = path.join(SPECS_OUTPUT_PATH, 'Screen-Index.md');
  fs.writeFileSync(indexPath, indexContent);
  log(`Created: Screen-Index.md with ${screens.length} screens`);

  return screens.length;
}

/**
 * Format Screen-Index.md in canonical format
 */
function formatScreenIndex(screenIndex) {
  let content = '# UX Screens\n\n';
  content += '## Active Screens\n\n';

  for (const screen of screenIndex) {
    content += `- [ ] ${screen.id}\n`;
    content += `  Location: Genesis Execution/specs/UX Specs/${screen.id}/\n`;
    content += `  Status: ${screen.status}\n`;
    content += `  Classification: ${screen.classification}\n\n`;
  }

  content += '## Archived Screens\n\n';
  content += '(None)\n';

  return content;
}

/**
 * Create completion manifest
 */
function createManifest(screensGenerated, summary) {
  const elapsedMs = Date.now() - START_TIME;

  const manifest = {
    generationId: `sgn-${new Date().toISOString().split('T')[0]}-${Math.random().toString(36).substring(7)}`,
    status: 'complete',
    timestamp: new Date().toISOString(),
    screensGenerated: screensGenerated,
    summary: summary,
    workspaceId: WORKSPACE_ID,
    founderName: FOUNDER_NAME,
    elapsedMs: elapsedMs,
    manifestPath: MANIFEST_PATH
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  log(`Manifest created: ${MANIFEST_PATH}`);

  return manifest;
}

/**
 * Create error manifest on failure
 */
function createErrorManifest(error) {
  const elapsedMs = Date.now() - START_TIME;

  const errorManifest = {
    generationId: `sgn-error-${new Date().toISOString().split('T')[0]}-${Math.random().toString(36).substring(7)}`,
    status: 'error',
    timestamp: new Date().toISOString(),
    error: error.message,
    workspaceId: WORKSPACE_ID,
    founderName: FOUNDER_NAME,
    elapsedMs: elapsedMs,
    errorPath: ERROR_MANIFEST_PATH
  };

  fs.writeFileSync(ERROR_MANIFEST_PATH, JSON.stringify(errorManifest, null, 2));
  logError(`Manifest created: ${ERROR_MANIFEST_PATH}`);
  logError(`Error: ${error.message}`);

  return errorManifest;
}

/**
 * Main execution
 */
async function main() {
  try {
    log('================================');
    log('Genesis Screen Build Agent v1.0');
    log('================================');
    log(`Start time: ${new Date().toISOString()}`);

    // Validate environment
    validateEnvironment();

    // Load inputs
    const strategicDirective = loadStrategicDirective();
    const govTemplates = loadGovernanceTemplates();

    // Generate screens with Claude
    const generationResult = await generateScreensWithClaude(strategicDirective, govTemplates);

    // Check for errors from Claude
    if (generationResult.status === 'error') {
      const issues = generationResult.summary?.clarificationsNeeded || ['Unknown error'];
      const issueText = issues.join('\n  - ');
      throw new Error(`Cloud agent reported error:\n  - ${issueText}`);
    }

    // Write to disk
    const screensGenerated = writeScreensToDisk(generationResult);

    // Create manifest
    const manifest = createManifest(screensGenerated, generationResult.summary);

    log('================================');
    log('✅ SUCCESS');
    log(`Screens generated: ${screensGenerated}`);
    log(`Elapsed time: ${manifest.elapsedMs}ms`);
    log('================================');

    process.exit(0);
  } catch (error) {
    logError('================================');
    logError('❌ FAILED');
    logError(error.message);
    logError('================================');

    createErrorManifest(error);
    process.exit(1);
  }
}

// Execute
main();
