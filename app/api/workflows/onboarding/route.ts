import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/workflow";

type InitialData = {
  email: string;
  fullName: string;
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to Bookwise!",
      message: `<p>Hi ${fullName},</p><p>Thanks for signing up for Bookwise! 📚</p>`,
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState();
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "We miss you at Bookwise",
          message: `<p>Still haven't explored our collection? Come back soon!</p>`,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Bookwise Monthly Newsletter",
          message: `<p>Thanks for being an active reader. Here’s what’s new!</p>`,
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});

type UserState = "non-active" | "active";

const getUserState = async (): Promise<UserState> => {
  // Replace with real logic later
  return "non-active";
};
