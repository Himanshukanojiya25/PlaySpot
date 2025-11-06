Project Overview PPTX - regenerate instructions

This document explains how to regenerate `docs/ProjectOverview.pptx` and render the flow diagram.

Prerequisites
- Python 3.8+ installed and on PATH
- System Graphviz (`dot` executable) for diagram rendering (optional but recommended)

Install Graphviz on Windows (one of):
- Chocolatey (requires running PowerShell as Administrator):
  choco install graphviz
- Official installer: https://graphviz.org/download/ (download and run installer)

Install Python packages (recommended virtualenv):
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install python-pptx graphviz
```

Generate PPTX
```powershell
python scripts\generate_pptx.py
```

Notes
- If system Graphviz is not installed, the script will still create the PPTX but the flow diagram image will be omitted. Install Graphviz and re-run to include the diagram.
- `docs/flow.dot` contains the DOT source used for the flow diagram.

Files created by script
- `docs/ProjectOverview.pptx` - PowerPoint file
- `docs/flow_diagram.png` - generated diagram (if Graphviz available)

If you'd like, I can (choose):
- Install system Graphviz and re-run the generator to embed the diagram.
- Improve the diagram layout and styling.
- Export the PPTX to PDF and add `docs/ProjectOverview.pdf`.
