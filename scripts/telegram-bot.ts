
import { PrismaClient } from "@prisma/client";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import { fetchExternalContests, Contest } from "../lib/contest-fetcher";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN || process.env.envTELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("TELEGRAM_BOT_TOKEN is not defined in environment variables");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
const prisma = new PrismaClient();

// In-memory cache for sent notifications to avoid duplicates in current session
// Format: "contestId_type" (e.g., "leetcode-weekly-400_30m")
const sentNotifications = new Set<string>();

console.log("Telegram Bot started...");

// --- Event Listeners ---

// Listen for /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id.toString();
  const type = msg.chat.type;

  try {
    await prisma.telegramChat.upsert({
      where: { chatId },
      update: {
        title: msg.chat.title || msg.chat.first_name,
        username: msg.chat.username,
        type
      },
      create: {
        chatId,
        type,
        title: msg.chat.title || msg.chat.first_name,
        username: msg.chat.username
      }
    });
    bot.sendMessage(chatId, "Bot started! You will receive contest notifications.");
    console.log(`Registered chat: ${chatId} (${msg.chat.title || msg.chat.username})`);
  } catch (error) {
    console.error("Error registering chat:", error);
  }
});

// Listen for being added to a group
bot.on("message", async (msg) => {
  if (msg.new_chat_members) {
    const botUser = await bot.getMe();
    const isBotAdded = msg.new_chat_members.some(member => member.id === botUser.id);

    if (isBotAdded) {
      const chatId = msg.chat.id.toString();
      try {
        await prisma.telegramChat.upsert({
          where: { chatId },
          update: {
             title: msg.chat.title,
             type: msg.chat.type
          },
          create: {
            chatId,
            type: msg.chat.type,
            title: msg.chat.title
          }
        });
        bot.sendMessage(chatId, "Hello! I will notify this group about upcoming contests.");
        console.log(`Added to group: ${chatId} (${msg.chat.title})`);
      } catch (error) {
        console.error("Error registering group:", error);
      }
    }
  }

  // Also register on any message interaction if not exists?
  // Maybe safer to stick to explicit events to avoid spamming DB checks.
});

// --- Notification Logic ---

async function sendToAllChats(message: string) {
  const chats = await prisma.telegramChat.findMany();
  console.log(`Sending notification to ${chats.length} chats...`);

  for (const chat of chats) {
    try {
      await bot.sendMessage(chat.chatId, message, { parse_mode: "Markdown" });
    } catch (error: any) {
      console.error(`Failed to send to ${chat.chatId}:`, error.message);
      // Optional: Remove chat if blocked/kicked?
      // if (error.code === 403) ...
    }
  }
}

async function checkContests() {
  console.log("Checking for contests...");
  const now = new Date();

  // 1. Fetch External Contests
  const externalContests = await fetchExternalContests();

  // 2. Fetch Internal Contests
  // We need to map them to the same interface or handle them similarly
  const internalDbContests = await prisma.contest.findMany({
    where: {
      startTime: { gt: new Date(now.getTime() - 24 * 60 * 60 * 1000) }, // optimization
      visibility: "PUBLIC",
      hidden: false
    }
  });

  const internalContests: Contest[] = internalDbContests.map(c => ({
    id: `internal-${c.id}`,
    name: c.title,
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/contest/${c.slug}`,
    start_time: c.startTime.toISOString(),
    end_time: c.endTime.toISOString(),
    duration: ((c.endTime.getTime() - c.startTime.getTime()) / 1000).toString(),
    site: "AlgoFox", // Or "Internal"
    in_24_hours: "Yes", // logic simplified
    status: c.startTime > now ? "UPCOMING" : "ONGOING"
  }));

  const allContests = [...externalContests, ...internalContests];

  for (const contest of allContests) {
    const startTime = new Date(contest.start_time).getTime();
    const timeDiffMs = startTime - now.getTime();
    const timeDiffMinutes = timeDiffMs / (1000 * 60);

    let notificationType: string | null = null;
    let messagePrefix = "";

    // Check 30 minutes before (29-30 mins range to catch it once)
    // Actually, since we run every minute, we can check logical ranges.
    // To handle "exact" matches better with memory, we can check if we handled it.

    // Logic: If timeDiff is between 29.5 and 30.5, AND not sent "30m"
    if (timeDiffMinutes >= 29.5 && timeDiffMinutes <= 30.5) {
      notificationType = "30m";
      messagePrefix = " *Contest Alert: 30 Minutes Remaining!*";
    }
    // Check 10 minutes before
    else if (timeDiffMinutes >= 9.5 && timeDiffMinutes <= 10.5) {
      notificationType = "10m";
      messagePrefix = " *Contest Alert: 10 Minutes Remaining!*";
    }
    // Check Start time (approx 0)
    else if (timeDiffMinutes >= -0.5 && timeDiffMinutes <= 0.5) {
      notificationType = "start";
      messagePrefix = " *Contest Started!*";
    }

    if (notificationType) {
      const lockKey = `${contest.id}_${notificationType}`;
      if (!sentNotifications.has(lockKey)) {
        sentNotifications.add(lockKey);

        // Clean up old keys eventually?
        // simple optimization: set timeout to delete key after 1 hour
        setTimeout(() => sentNotifications.delete(lockKey), 60 * 60 * 1000);

        const message = `${messagePrefix}\n\n` +
          `🏆 *${contest.name}*\n` +
          `🌍 Platform: ${contest.site}\n` +
          `⏳ Duration: ${Math.round(parseInt(contest.duration) / 60)} mins\n` +
          `🔗 [Link to Contest](${contest.url})`;

        await sendToAllChats(message);
      }
    }
  }
}

// Schedule cron job to run every minute
cron.schedule("* * * * *", () => {
  checkContests().catch(err => console.error("Error in contest check:", err));
});

// Run immediately on start
checkContests();
