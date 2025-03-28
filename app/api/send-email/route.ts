import { NextResponse } from "next/server";
import mailjet from "node-mailjet";
import config from "@/lib/config";

const mj = mailjet.apiConnect(
  config.env.mailjetToken,
  config.env.mailjetPrivateKey
);

export async function POST(req: Request) {
  try {
    const { to, subject, html } = await req.json();

    await mj.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "ameer.hasan.dev@gmail.com",
            Name: "Bookwise",
          },
          To: to.map((email: string) => ({ Email: email })),
          Subject: subject,
          HTMLPart: html,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mailjet error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
