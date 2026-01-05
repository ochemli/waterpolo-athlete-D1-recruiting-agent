# Recruiting Coach AI - D1 Water Polo Recruiting Agent

An AI-powered recruiting assistant for NCAA Division I women's water polo athletes. Generate personalized coach emails, analyze coach replies, and manage your recruiting communications with intelligent insights.

## 🌟 Features

### 📧 Email Generation
- **Draft Coach Emails** - Initial outreach emails
- **Update Emails** - Share recent achievements and highlights
- **Your Style Mode** - AI learns and mimics your personal writing style

### 🔍 Coach Reply Analysis
- **Interest Classification** (A-E grading system)
- **Detailed Analysis** - Why they're interested (or not)
- **Action Plan** - Specific next steps and follow-up timing
- **Response Intelligence** - Read between the lines

### 👤 Athlete Profile & Knowledge Base
- **Profile Scanner** - Import data from your recruiting website
- **Achievements Tracking** - Awards, stats, tournament results
- **Highlights Management** - Recent accomplishments and updates
- **Writing Style Learning** - Paste your writing samples so AI matches your voice
- **Coach Communications Log** - Track all coach replies
- **Event Calendar** - Upcoming tournaments and camps

### 🎨 Modern UI
- Beautiful glassmorphic design
- Responsive on all devices
- Dynamic forms that adapt to your needs
- Real-time updates with smooth animations

## 🚀 Tech Stack

- **Frontend**: React + Vite
- **Backend**: Vercel Serverless Functions
- **AI**: OpenAI GPT-4o-mini
- **Deployment**: Vercel
- **Storage**: LocalStorage (client-side)

## 📁 Project Structure

```
recruiting-agent-web/
├── src/
│   ├── App.jsx              # Main application
│   ├── ProfilePage.jsx      # Profile & updates management
│   ├── App.css              # Main styles
│   └── ProfilePage.css      # Profile page styles
├── api/
│   └── coach.js             # AI backend endpoint
├── server.js                # Local development API server
├── yasmine-profile-data.json # Sample profile data
└── README.md
```

## 🛠️ Setup & Development

### Prerequisites
- Node.js 18+
- OpenAI API key

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/ochemli/waterpolo-athlete-D1-recruiting-agent.git
cd recruiting-agent-web
```

2. **Install dependencies**
```bash
npm install
```

3. **Add your OpenAI API key**
Create `.env.local`:
```bash
OPENAI_API_KEY=sk-proj-your-key-here
```

4. **Run both frontend and API**
```bash
npm run dev:all
```

5. **Open in browser**
```
http://localhost:5173
```

### Deploy to Vercel

1. Push code to GitHub
2. Import repository to Vercel
3. Add environment variable: `OPENAI_API_KEY`
4. Deploy!

## 💡 How to Use

### Setting Up Your Profile

1. Click **"Profile & Updates"** tab
2. Add your information:
   - Personal details and achievements
   - Recent highlights
   - Video links
   - Upcoming events
3. **Paste writing samples** (2-3 emails you've written) in "Writing Style"
4. All data saves automatically to your browser

### Generating Emails

1. Fill in basic info (name, grad year, position, school)
2. Choose mode:
   - **Draft email**: First contact
   - **Update email**: Share news
   - **Your style**: Uses your personal voice
3. Add highlights and your "ask"
4. Click **Generate**

### Analyzing Coach Replies

1. Select "Analyze a coach reply"
2. Paste the coach's email
3. Get instant analysis:
   - Interest level (A-E)
   - Why they're interested
   - What to do next
   - When to follow up

## 🔒 Privacy & Data

- All profile data stored locally in your browser
- No data sent to external servers except OpenAI API
- API key secured in Vercel environment variables
- No tracking or analytics

## 📝 Cost Estimate

- ~$0.002 per email generation
- ~$0.005 per coach reply analysis
- Generating 100 emails ≈ $0.20

## 🎯 Built For

Yasmine Sowka - 2027 Goalkeeper  
Canadian Youth National Team  
Capital Wave Water Polo Club

## 📄 License

ISC

## 🤝 Contributing

This is a personal recruiting tool. Feel free to fork and adapt for your own use!

