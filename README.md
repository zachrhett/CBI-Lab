# Cognitive Burden Index (CBI Lab)

An interactive educational tool for exploring **mental ergonomics**, **allostatic cognitive load**, and a transparent **Cognitive Burden Index**.

## Structure

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Landing page |
| Table of Contents | `contents.html` | Full site map |
| Overview | `overview.html` | Core concepts |
| Calculator | `calculator.html` | Live interactive index |
| Mathematics | `mathematics.html` | Equations and model design |
| Frameworks | `frameworks.html` | Theoretical foundations |
| Scenarios | `scenarios.html` | Pre-built profiles |

## Running

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8000
```

For GitHub Pages: push this folder and enable Pages on the root.

## Model summary

**Static index**

$$
CBI_{static} = 100 \times (w_{TS}TS + w_{WM}WM + w_{TP}TP + w_{ID}ID + w_{EL}EL + w_{RD}RD)
$$

where $RD = 1 - RO$.

**Dynamic allostatic component** (optional)

$$
L_{t+1} = L_t + \Delta t\,(\alpha \cdot CBI_{static}/100 - \beta \cdot RO)
$$

$$
CBI_{dynamic} = 100 \times \frac{L}{L + k}
$$

See **Mathematics** for full detail and default weights.

## License

Use and modify freely for research, education, and demonstration.
