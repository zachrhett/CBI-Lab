# CBI-Lab — Coherent Integration of the Six Touch Points

This package rebuilds the work in the correct conceptual order and matches the existing structure, voice, and density of the site.

## Recommended order of reading / integration

1. **Frameworks page** — conceptual home of the six arching touch points  
2. **Mathematics page** — formal dimensional expression of those same six axes  
3. (Optional) light cross-references from Overview or Scoring if desired later

## Package contents

```
cbi-coherent/
├── README.md
├── mathematics.html                          ← full drop-in Mathematics page
├── images/
│   └── six-axis-state-space.png              ← diagram for the Mathematics page
└── docs/
    └── frameworks-section-six-touch-points.html   ← ready-to-paste section for Frameworks
```

## How to integrate

### 1. Frameworks page (start here)

Open `frameworks.html`.

Insert the contents of `docs/frameworks-section-six-touch-points.html` **after** the existing section  
“3. Cognitive load theory meets allostasis” and **before** the current “4. Key people”.

Then renumber the later headings:
- old 4 → new 5 (Key people)
- old 5 → new 6 (How CBI uses these ideas)

The new section is written in the same voice and density as the rest of the Frameworks page.

### 2. Mathematics page

Replace the existing `mathematics.html` with the version in this package.

It already:
- Contains the full six-axis dimensional formulation as §5
- Cross-references the Frameworks treatment of the six touch points
- Preserves every previous equation and ethical statement
- Embeds the diagram

Place the PNG in an `images/` folder at the site root.

## Conceptual summary of the six touch points

1. **Resource Allocation & Capacity Limits** — finite bandwidth  
2. **Cumulative vs. Acute Load** — moment versus trajectory  
3. **Intrinsic / Extraneous / Germane Load** — type of load and whether it builds or depletes capacity  
4. **Measurement & Feedback Loops** — observe → interpret → adjust  
5. **Individual Differences & Baseline Calibration** — people do not start from the same place  
6. **Intervention & Load Management** — the practical levers that keep burden adaptive  

These six concepts are the architecture. The process factors, the static score, the latent \(L\), and the zones are the observable projections of that architecture.

## Notes

- Tone, cautionary language, and ethical boundaries match the existing site.
- No changes to `styles.css` or `nav.js` are required.
- The mathematical formulation is fully backward-compatible with the previous scalar model.
