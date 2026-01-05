export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  try {
    const input = req.body || {};
    const profile = input.profile || {};

    // Build context from profile
    let profileContext = '';
    if (profile.athleteName) {
      profileContext += `\nATHLETE PROFILE:\n`;
      profileContext += `Name: ${profile.athleteName}\n`;
      if (profile.achievements) {
        profileContext += `Key Achievements: ${profile.achievements}\n`;
      }
      if (profile.recentHighlights) {
        profileContext += `Recent Highlights: ${profile.recentHighlights}\n`;
      }
      if (profile.upcomingEvents) {
        profileContext += `Upcoming Events: ${profile.upcomingEvents}\n`;
      }
      if (profile.videoLinks) {
        profileContext += `Video Links: ${profile.videoLinks}\n`;
      }
    }

    // Add writing style for "your_style" mode
    let styleInstructions = '';
    if (input.mode === 'your_style' && profile.writingStyle) {
      styleInstructions = `\n\nWRITING STYLE INSTRUCTIONS:
The athlete has provided writing samples. Match their tone, vocabulary, and personality:
${profile.writingStyle}

Mimic their style: same level of formality, sentence structure, and energy. Make it sound like THEY wrote it.`;
    }

    const system = `
You are a Recruiting Coach Comms Agent for NCAA Division I women's water polo.
Be blunt, neutral, and precise. No hype.

You must do ONLY what the user selected in "mode":
- draft_email: write a concise coach email.
- update_email: write an update email with 1–3 bullets and a clear ask.
- analyze_reply: classify the coach reply into A/B/C/D/E and give next action.
- your_style: draft an email in the athlete's PERSONAL writing style (use their voice, tone, and personality).

Email constraints:
- Default 120–180 words unless length specifies short/long.
- Never apologize. Never say "just checking in."
- Include athlete name, grad year, position, and one clear ask.
- If a video link exists, include it once.
- Use profile information when available to add specific, relevant details.

Response analysis buckets:
A) Strong interest (clear next step) - Coach explicitly mentions roster needs, invites to campus, asks for specific dates, or requests immediate follow-up
B) Warm interest (asks info / keeps door open) - Coach asks questions, requests more info, says to stay in touch, or shows genuine engagement
C) Neutral courtesy - Generic acknowledgment, "good luck," or minimal engagement without clear interest signals
D) Soft no - "Roster is full," "not recruiting your position," "limited spots," or timeline mismatches
E) No signal / unclear - Vague response, confusing message, or impossible to categorize

When analyzing a coach reply (mode: analyze_reply), you MUST return:

1) INTEREST CLASSIFICATION: [A/B/C/D/E]

2) WHY THIS CLASSIFICATION:
   - Specific phrases or signals from the coach's email
   - Context clues (timing, specificity, tone)
   - Red flags or green flags

3) RECOMMENDED NEXT ACTION:
   - Concrete, specific action to take
   - What to say or send
   - Timing guidance

4) FOLLOW-UP PLAN:
   - Should you follow up? YES or NO
   - If YES: When to follow up (e.g., "in 2 weeks," "after tournament," "immediately")
   - If NO: Why not (e.g., "Coach asked you to initiate," "Soft rejection," "Wait for their response")

Format your analysis clearly with headers and be direct.
${profileContext}${styleInstructions}
`;

    const user = `User request JSON:\n${JSON.stringify(input, null, 2)}`;

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ]
      })
    });

    const data = await resp.json();
    if (!resp.ok) return res.status(resp.status).json(data);

    const text = data.choices?.[0]?.message?.content || "No text returned.";
    return res.status(200).json({ text });

  } catch (e) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
}

