# 🌍 World Cup Match Reminder

This is a personal project to get WhatsApp reminders at **12 hours, 3 hours, and 1 hour** before World Cup matches — automated via GitHub Actions.

## Stack
- Node.js + Twilio WhatsApp Sandbox
- GitHub Actions (runs every hour, free)

## Setup

1. **Clone the repo** and run `npm install`
2. **Add your matches** in `matches.json`
3. **Add GitHub secrets:**
   - `TWILIO_SID` — from Twilio console
   - `TWILIO_TOKEN` — from Twilio console
   - `WHATSAPP_TO` — your number as `whatsapp:+91XXXXXXXXXX`
4. **Push to GitHub** — the workflow runs automatically every hour

## Adding matches

Just edit `matches.json` and commit. As teams advance, append their next match:

```json
{
  "team": "Portugal",
  "round": "Round of 16",
  "opponent": "TBD",
  "kickoff_ist": "2026-07-03 00:30",
  "venue": "Dallas"
}
```

## Notes
- Uses Twilio WhatsApp Sandbox (free, personal use only)
- All times in `matches.json` are in IST
