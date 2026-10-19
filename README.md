# Ming-3.0-tts project page

Source of the project page for [Ming-3.0-tts](https://github.com/inclusionAI/Ming-3.0-tts), served by GitHub Pages from `main` (`.github/workflows/pages.yml`). It is plain HTML, CSS and JavaScript with no build step. Fonts are self-hosted under `static/fonts/` (SIL OFL, see `OFL.txt`), so the page loads nothing from third-party hosts.

## Samples

Sample text, controls and audio paths live in `static/js/examples.js`, one section per task. Put the audio (mp3 keeps the page light) under `static/audio/<section id>/` and point the row's audio column at it.

The All samples tabs list every section in full. `index.html` decides which samples the story sections above them show. A grid such as `<div class="samples" data-samples="freeform:0,1 emotion:2">` takes rows 0 and 1 of `freeform` and row 2 of `emotion`, one card each, and `<p data-note="freeform">` prints that section's `note`. `<div data-matrix="cross-lingual">` renders a section with several audio columns as a matrix, followed by its `note`. Each card in a story grid links to `#<section id>`, which opens that section's tab and scrolls to it, so page section ids must not reuse a section id from `examples.js`. Rows without audio render without a player.

After adding or replacing audio, regenerate the waveforms (needs `ffmpeg`):

```bash
python3 scripts/peaks.py
```

This rewrites `static/js/peaks.js`. A clip missing from it still plays, with a placeholder waveform.

The demo video is `static/videos/tts11.mp4` (Git LFS), with poster `static/images/posters/tts11.jpg`.

## Preview

Serve the folder locally, for example `npx http-server -c-1`. Python's `python3 -m http.server` also works, but it ignores range requests, so seeking inside a clip does not work there.

When you change `static/css/index.css` or anything in `static/js/`, bump the `?v=` query on their tags in `index.html`, so returning visitors never pair new HTML with a cached old script.
