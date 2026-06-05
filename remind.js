import twilio from "twilio";
import { readFileSync } from "fs";

const matches = JSON.parse(readFileSync("./matches.json", "utf-8"));

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const TO   = process.env.WHATSAPP_TO;
const FROM = "whatsapp:+14155238886";

const REMIND_AT_MINS = [12 * 60, 3 * 60, 60];
const WINDOW_MINS = 30;

const TEAMS = (process.env.WATCH_TEAMS || "Portugal").split(",").map(t => t.trim());

function parseIST(str) {
  return new Date(str.replace(" ", "T") + ":00+05:30");
}

function formatLabel(mins) {
  const h = mins / 60;
  return h === 1 ? "1 hour" : `${h} hours`;
}

const now = Date.now();

for (const match of matches) {
  const kickoff = parseIST(match.kickoff_ist);
  const minsToGo = (kickoff - now) / 60_000;

  for (const window of REMIND_AT_MINS) {
    if (minsToGo >= window - WINDOW_MINS && minsToGo <= window + WINDOW_MINS) {
      const label = formatLabel(window);
      const body = [
        `⚽ ${match.team} vs ${match.opponent} — ${label} to go!`,
        `🏆 ${match.round}`,
        `⏰ Kickoff: ${match.kickoff_ist} IST`,
        `📍 ${match.venue}`,
      ].join("\n");

      await client.messages.create({ body, from: FROM, to: TO });
      console.log(`✅ Sent: ${label} reminder for ${match.team} vs ${match.opponent}`);
    }
  }
}