# HAMR Runner

Phone-friendly pacer for the Air Force 20 m High Aerobic Multi-Shuttle Run (HAMR).

- **Intervals**: pick a level, shuttles per set, sets, rest. Beeps at that level's exact cadence.
- **Full test**: the whole 21-level protocol, triple beep at each level change, STOP to record your last completed shuttle.
- **Levels**: the cadence table.

Cadence was measured beep-to-beep from the official Air Force HAMR audio file (the copy hosted by Ellsworth AFB FSS), not taken from a generic beep-test chart. Level 1 is 8.0 km/h, level 2 is 9.0 km/h, then +0.5 km/h per level. Shuttle boundaries match the 375 FSS HAMR score sheet. `levels.json` holds the table.

Static page, no tracking, no accounts. Runs in Safari or Chrome. Ringer must be on for audio on an iPhone.
