import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://agnjjlzuzihuqorpcfan.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmpqbHp1emlodXFvcnBjZmFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTE0MTQsImV4cCI6MjA5MDk4NzQxNH0.TwqtX8O1VnwgoG4DE08ydVC4UkQCEq-cW1Lun7i4uAA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const posts = [
  {
    title: 'The Reality of "Vibe Coding": Why Flow State Beats Rigid Planning',
    content: 'When I first started coding, I thought everything had to be meticulously planned. UML diagrams, strict agile sprints, and endless documentation. But over the past few years, especially balancing my studies at KFUEIT with freelance work, I discovered something different: Vibe Coding.\n\nVibe coding isn\'t about being sloppy. It\'s about getting into a flow state where the code just pours out of you. It\'s that feeling when you put on your headphones, load up your favorite playlist, and suddenly three hours have passed and you\'ve built an entire MVP.\n\nI\'ve found that over-planning often kills creativity. When I\'m building a new React component or setting up a Supabase backend, I prefer to start with a rough sketch and just start typing. The architecture reveals itself as I solve problems in real-time. This approach has drastically improved my delivery speed for clients.\n\nOf course, this doesn\'t mean ignoring best practices. Clean code, modularity, and scalability are still the foundation. But allowing yourself to code by "feel" and intuition—trusting your experience—can lead to some of the most innovative solutions. Have you ever tried vibe coding? Let me know your thoughts.',
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
    tags: ['Vibe Coding', 'Productivity', 'Development']
  },
  {
    title: 'Why I Chose Supabase over Firebase for My Latest Projects',
    content: 'For the longest time, Firebase was the undisputed king of Backend-as-a-Service (BaaS). It was easy to set up, had great real-time features, and integrated perfectly with modern frontend frameworks. But recently, I\'ve made a complete switch to Supabase, and I haven\'t looked back.\n\nThe main reason? PostgreSQL. Firebase\'s NoSQL database (Firestore) is fantastic for simple, document-based data. But the moment you need complex relationships—like linking users to multiple projects, tracking detailed analytics, and running complex queries—NoSQL becomes a massive headache.\n\nSupabase gives you the power of a full PostgreSQL database, but with the ease of use of Firebase. You get an auto-generated API, real-time subscriptions, and built-in authentication. Plus, writing SQL queries feels so much more powerful and flexible than chaining together Firestore methods.\n\nAnother huge factor for me is the open-source nature of Supabase. Knowing that I\'m not entirely locked into a proprietary ecosystem gives me peace of mind, especially when building scalable applications for my clients. If you haven\'t tried Supabase yet, I highly recommend spinning up a test project. It might just change your entire workflow.',
    image_url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80',
    tags: ['Supabase', 'Database', 'Backend']
  },
  {
    title: 'The Intersection of Graphic Design and Frontend Development',
    content: 'A lot of people treat graphic design and web development as two completely separate fields. You have the designers who live in Figma and Illustrator, and the developers who live in VS Code. But as someone who does both, I can tell you that the magic happens when these two worlds collide.\n\nUnderstanding design principles—like typography, color theory, and visual hierarchy—makes you a significantly better frontend developer. You stop just "translating" a Figma file into CSS and start understanding *why* a certain padding is necessary, or *why* a specific shade of blue draws the user\'s eye to a call-to-action button.\n\nConversely, knowing how CSS and the DOM work makes you a better designer. You start designing with responsiveness in mind. You understand the constraints of the web, which prevents you from designing beautiful but impossible-to-build interfaces.\n\nFor my freelance projects, offering both design and development has been a game-changer. Clients love working with one person who can take their vision from a rough sketch all the way to a deployed, pixel-perfect React application. If you\'re a developer, spend a weekend learning basic design theory. It will elevate your work instantly.',
    image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80',
    tags: ['Design', 'Frontend', 'UI/UX']
  },
  {
    title: 'YouTube Automation: Is it still profitable in 2026?',
    content: 'YouTube automation has been a buzzword for years. The idea of running a "faceless" channel, outsourcing the scriptwriting, voiceover, and editing, and just collecting ad revenue sounds like a dream. But the landscape has changed drastically, and what worked in 2022 definitely doesn\'t work today.\n\nSo, is it still profitable? Yes, but the barrier to entry is much higher. You can\'t just slap together stock footage and a robotic text-to-speech voice anymore. The YouTube algorithm, and more importantly, the viewers, demand high-quality storytelling and engaging visuals.\n\nIn my experience managing automation pipelines, the key to success now is leveraging AI *correctly*. Using AI to brainstorm ideas, outline scripts, and even generate specific visual assets is incredibly powerful. But the final product needs a human touch. The pacing, the humor, the emotional hook—these are things AI still struggles with.\n\nIf you\'re looking to start a YouTube automation channel, focus on a hyper-specific niche. Invest in a good voiceover artist (or a highly advanced, trained AI voice model), and spend 80% of your effort on the thumbnail and the first 30 seconds of the video. That\'s where the battle for attention is won or lost.',
    image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
    tags: ['YouTube', 'Automation', 'Content Creation']
  },
  {
    title: 'Balancing University Life with Freelance Development',
    content: 'Being a 4th-semester student at KFUEIT while actively taking on freelance full-stack and design projects is... chaotic, to say the least. My days are a blur of lectures, assignments, client meetings, and late-night coding sessions. It\'s exhausting, but I wouldn\'t trade it for anything.\n\nThe biggest lesson I\'ve learned is the importance of ruthless time management. I used to rely on motivation to get things done, but motivation is fleeting. Now, I rely on systems. I block out specific hours for university work and specific hours for client work. When I\'m in "client mode," my phone is on Do Not Disturb, and I\'m fully locked in.\n\nAnother crucial aspect is setting expectations. I\'m very upfront with my clients about my schedule. I let them know that I might not be able to respond to an email immediately during the day, but I will always deliver the work on time. Surprisingly, most clients are incredibly understanding and respect the hustle.\n\nIf you\'re a student trying to build a freelance career, my advice is to start small. Don\'t take on massive projects that will overwhelm you. Build a portfolio, learn to manage your time, and remember that your education is still a priority. The real-world experience you gain from freelancing will make your university studies much more meaningful.',
    image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    tags: ['Freelance', 'Student Life', 'Time Management']
  },
  {
    title: 'Why Tailwind CSS Won the Styling Wars',
    content: 'I remember the days of writing thousands of lines of custom CSS. BEM methodology, SASS variables, dealing with specificity nightmares... it was a struggle. Then came CSS-in-JS solutions like Styled Components, which were a step in the right direction but added JavaScript overhead.\n\nAnd then, I discovered Tailwind CSS. At first, looking at a div with 15 utility classes felt wrong. It felt messy. But after building one project with it, I was completely hooked. Tailwind CSS didn\'t just change how I style my apps; it changed how I think about design systems.\n\nThe beauty of Tailwind is its constraint-based design. Instead of picking any random hex code or pixel value, you\'re forced to choose from a carefully curated scale. This naturally leads to more consistent and professional-looking interfaces. Plus, the development speed is unmatched. I never have to leave my HTML/JSX file to write styles.\n\nYes, the markup can get a bit cluttered, but with component-based frameworks like React, that\'s rarely an issue since you\'re abstracting the messy parts into reusable components. Tailwind has officially won the styling wars in my book, and it\'s my default choice for every new project.',
    image_url: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80',
    tags: ['CSS', 'Tailwind', 'Frontend']
  },
  {
    title: 'The Power of Micro-Interactions in Web Design',
    content: 'Have you ever clicked a button on a website and felt a strange sense of satisfaction? Maybe it was a subtle color change, a smooth ripple effect, or a tiny bounce animation. These are micro-interactions, and they are the secret sauce of great user experiences.\n\nAs a developer and designer, I spend a lot of time thinking about how a website *feels*, not just how it looks. A static page is boring. But a page that reacts to your cursor, acknowledges your clicks, and guides your eye through subtle motion feels alive.\n\nI heavily rely on libraries like Framer Motion in my React projects to bring these interactions to life. It doesn\'t take much—a slight scale-up on hover, a smooth fade-in when scrolling down, or a satisfying loading spinner. These details might seem insignificant, but they collectively build trust and delight the user.\n\nHowever, there\'s a fine line between engaging and annoying. The key is subtlety. Animations should be fast (usually under 300ms) and purposeful. They shouldn\'t distract from the content; they should enhance it. Next time you\'re building a UI, ask yourself: "How can I make this interaction feel just a little bit better?"',
    image_url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80',
    tags: ['Design', 'UX', 'Animation']
  },
  {
    title: 'My Go-To Tech Stack for 2026',
    content: 'The web development landscape moves incredibly fast. What was industry standard two years ago is often considered legacy today. After experimenting with dozens of frameworks, databases, and deployment platforms, I\'ve finally settled on a tech stack that gives me the perfect balance of speed, scalability, and developer experience.\n\nFor the frontend, it\'s React with Vite. Create React App is dead, and Vite\'s instant server start and lightning-fast HMR make development an absolute joy. I pair this with Tailwind CSS for styling and Framer Motion for animations.\n\nFor the backend, I\'ve completely moved to Supabase. Having a full PostgreSQL database with instant APIs, real-time capabilities, and built-in auth saves me weeks of backend setup. It\'s robust enough for enterprise apps but easy enough for weekend side projects.\n\nFor deployment, Vercel is my platform of choice. The seamless GitHub integration, automatic preview deployments, and edge network performance are unmatched. This stack allows me to go from an idea to a deployed, production-ready application in record time. What\'s your go-to stack right now?',
    image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
    tags: ['Tech Stack', 'React', 'Supabase']
  },
  {
    title: 'Overcoming Imposter Syndrome as a Young Developer',
    content: 'Let\'s be honest: tech Twitter and LinkedIn can be incredibly intimidating. Every day, you see people launching successful startups, contributing to massive open-source projects, or landing jobs at FAANG companies. As an 18-year-old developer, it\'s easy to look at all that and think, "I\'m not good enough. I don\'t belong here."\n\nI\'ve struggled with imposter syndrome a lot. There are days when I stare at a bug for hours, feeling like a complete fraud. But over time, I\'ve realized that *everyone* feels this way. Even the senior developers I look up to spend half their day Googling error messages and reading documentation.\n\nThe turning point for me was accepting that I don\'t need to know everything. The tech industry is too vast for any one person to master it all. My value isn\'t in having every API memorized; it\'s in my ability to learn, adapt, and solve problems.\n\nIf you\'re dealing with imposter syndrome, my advice is to focus on your own progress. Look back at the code you wrote six months ago. You\'ll probably cringe at it, and that\'s a good thing! It means you\'ve grown. Keep building, keep learning, and remember that you deserve to be here just as much as anyone else.',
    image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
    tags: ['Mental Health', 'Career', 'Advice']
  },
  {
    title: 'Essential MS Office Skills Every Freelancer Needs',
    content: 'When people think of freelancing in tech, they usually think of coding, design, or marketing. But there\'s a set of "boring" skills that are absolutely crucial for running a successful freelance business: MS Office proficiency.\n\nYou might be a wizard at React, but if you can\'t put together a professional proposal, track your finances, or present your ideas clearly, you\'re going to struggle. \n\nExcel is arguably the most important tool in my administrative arsenal. I use it for tracking project hours, managing invoices, and forecasting my freelance income. Knowing how to use pivot tables, VLOOKUP, and basic macros saves me hours of manual data entry every month.\n\nWord and PowerPoint are equally important. A well-formatted, visually appealing project proposal in Word can be the difference between landing a client and getting ghosted. And when it comes to pitching a complex architecture or a new design system, a clean, concise PowerPoint deck is invaluable. Don\'t sleep on these fundamental tools—they are the backbone of the business side of freelancing.',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
    tags: ['Freelance', 'Business', 'MS Office']
  }
];

async function seed() {
  const { data, error } = await supabase.from('blog_posts').insert(posts);
  if (error) {
    console.error('Error seeding:', error);
  } else {
    console.log('Successfully seeded 10 blog posts!');
  }
}

seed();
