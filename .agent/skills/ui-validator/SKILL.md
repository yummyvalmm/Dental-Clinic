---
name: ui-validator
description: Verify components and pages against the project's visual and ergonomic standards (Glassmorphism, Thumb Zone, etc.).
---

# UI Validator Skill

This skill automates the verification of the Dental Clinic project's user interface against the defined [Standard Checklist](file:///Users/macbookair/Documents/Dental/.ui-standards.md).

## Core Responsibilities

- **Glassmorphism Audit**: Use the browser subagent to verify backdrop-blur, background opacity, and tint layers.
- **Ergonomics Check**: Ensure primary buttons are in the "Thumb Zone" (bottom 33% of the viewport).
- **Touch Target Verification**: Check that interactive elements have a minimum 44px dimension.
- **Accessibility Verification**: Audit contrast ratios and reduced motion support.

## Verification Procedures

### 1. Visual Verification (via Browser)
When asked to verify a page:
1.  Open the page in the browser.
2.  Inspect CSS properties of `.glass-surface` components.
3.  Check for `backdrop-filter: blur(xpx)` and `background: rgba(255, 255, 255, 0.15)`.
4.  Verify the presence of the `::before` tint layer for legibility.

### 2. Ergonomic Scrutiny
1.  Analyze the placement of the "Book Now" or "Submit" buttons.
2.  Confirm they are reachable via a one-handed thumb grip on mobile viewports.

### 3. State & Feedback Audit
1.  Simulate interactions (hover, active/click) using the browser subagent.
2.  Verify the `scale(0.95)` effect on active states.
3.  Ensure shimmering skeleton states are visible during simulated network delays.

## Reporting Criteria

Report errors using the following format:
- **Rule Violated**: [e.g., The "Golden" Glass Ratio]
- **Component/Page**: [e.g., BookingWizard / Step 2]
- **Requested Fix**: [e.g., Change background to rgba(255,255,255, 0.15) and set blur to 12px]
