import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase, Project, BlogPost } from '../lib/supabase';
import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { Trash2, Edit2, Upload, X } from 'lucide-react';

export function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form state (Shared)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');

  // Form state (Projects)
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [additionalImageFiles, setAdditionalImageFiles] = useState<FileList | null>(null);
  const [existingAdditionalImages, setExistingAdditionalImages] = useState<string[]>([]);

  // Form state (Blog)
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/');
    } else if (isAdmin) {
      fetchProjects();
      fetchBlogPosts();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  };

  const fetchBlogPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setBlogPosts(data);
  };

  const uploadImage = async (file: File, bucket: string = 'project-images') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleAddOrUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let finalImageUrl = existingImageUrl;
      let finalAdditionalImages = [...existingAdditionalImages];

      if (mainImageFile) {
        finalImageUrl = await uploadImage(mainImageFile);
      } else if (!existingImageUrl && !editingId) {
        throw new Error('Please select a main image.');
      }

      if (additionalImageFiles && additionalImageFiles.length > 0) {
        const uploadPromises = Array.from(additionalImageFiles).map(file => uploadImage(file as File));
        const newImageUrls = await Promise.all(uploadPromises);
        finalAdditionalImages = [...finalAdditionalImages, ...newImageUrls];
      }

      const projectData = {
        title,
        description,
        category,
        image_url: finalImageUrl,
        live_url: liveUrl,
        github_url: githubUrl,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        additional_images: finalAdditionalImages,
      };

      if (editingId) {
        const { error } = await supabase.from('projects').update(projectData).eq('id', editingId);
        if (error) throw error;
        setMessage('Project updated successfully!');
      } else {
        const { error } = await supabase.from('projects').insert([projectData]);
        if (error) throw error;
        setMessage('Project added successfully!');
      }
      
      resetForm();
      fetchProjects();
    } catch (error: any) {
      setMessage(error.message || 'Error saving project.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let finalImageUrl = existingImageUrl;

      if (mainImageFile) {
        finalImageUrl = await uploadImage(mainImageFile, 'project-images'); // Reusing bucket for simplicity
      }

      const postData = {
        title,
        content,
        image_url: finalImageUrl,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      };

      if (editingId) {
        const { error } = await supabase.from('blog_posts').update(postData).eq('id', editingId);
        if (error) throw error;
        setMessage('Blog post updated successfully!');
      } else {
        const { error } = await supabase.from('blog_posts').insert([postData]);
        if (error) throw error;
        setMessage('Blog post added successfully!');
      }
      
      resetForm();
      fetchBlogPosts();
    } catch (error: any) {
      setMessage(error.message || 'Error saving blog post.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setCategory(project.category);
    setLiveUrl(project.live_url || '');
    setGithubUrl(project.github_url || '');
    setTags(project.tags ? project.tags.join(', ') : '');
    setExistingImageUrl(project.image_url);
    setExistingAdditionalImages(project.additional_images || []);
    setMainImageFile(null);
    setAdditionalImageFiles(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditBlogPost = (post: BlogPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setTags(post.tags ? post.tags.join(', ') : '');
    setExistingImageUrl(post.image_url || '');
    setMainImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      fetchProjects();
    } catch (error: any) {
      setMessage(error.message || 'Error deleting project.');
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      fetchBlogPosts();
    } catch (error: any) {
      setMessage(error.message || 'Error deleting blog post.');
    }
  };

  const handleSeedBlogPosts = async () => {
    setLoading(true);
    setMessage('Generating high-quality SEO markdown blog posts...');
    try {
      // First, delete existing fake posts to avoid duplicates (optional, we'll just insert for now)
      
      const posts = [
        {
          title: 'The Reality of "Vibe Coding": Why Flow State Beats Rigid Planning',
          content: '## Introduction to Vibe Coding\n\nWhen I first started coding, I thought everything had to be meticulously planned. UML diagrams, strict agile sprints, and endless documentation were presented to me as the absolute truth of software engineering. But over the past few years, especially balancing my demanding computer science curriculum at Khwaja Fareed University of Engineering and Information Technology (KFUEIT) with active freelance work across the globe, I discovered a very different paradigm: **Vibe Coding**.\n\nVibe coding isn\'t about being sloppy or ignoring architecture. Rather, it\'s about getting into a flow state where the code just pours out of you natively. It\'s that distinct feeling when you put on your headphones, load up your favorite focus playlist, and suddenly three hours have passed and you\'ve built an entire Minimum Viable Product (MVP) from scratch.\n\n### Why Rigid Planning Sometimes Fails\n\nI\'ve found that over-planning often acts as an artificial barrier to creativity. When you spend weeks planning a database schema, you often lock yourself into assumptions that break as soon as you write the first API endpoint. \n\nWhen I\'m building a new React component or setting up a Supabase backend for a client, I increasingly prefer to start with a rough sketch and just start typing. The architecture reveals itself dynamically as I solve problems in real-time. This methodology has drastically improved my delivery speed for freelance clients without sacrificing the actual robustness of the application.\n\n### Maintaining Best Practices in a Flow State\n\nOf course, this doesn\'t mean ignoring best practices. You must internalize the fundamentals so deeply that they become second nature. When I "vibe code", I am still strictly adhering to:\n\n*   **Clean Code Principles:** Using descriptive variable names and single-responsibility functions.\n*   **Modularity:** Breaking down React components into reusable, pure functions.\n*   **Scalability:** Writing PostgreSQL row-level security policies correctly the first time.\n*   **Performance:** Memoizing expensive calculations instinctively.\n\nAllowing yourself to code by "feel" and intuition—trusting the thousands of hours of experience you have accumulated—can lead to some of the most innovative and elegant solutions. Have you ever experienced vibe coding? It\'s incredibly common among high-performing indie hackers and generative AI developers today.',
          image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
          tags: ['Vibe Coding', 'Productivity', 'Development']
        },
        {
          title: 'Deep Dive: Supabase vs Firebase in 2026',
          content: '## The Evolution of Backend-as-a-Service (BaaS)\n\nFor the longest time, Google\'s Firebase was the undisputed king of the Backend-as-a-Service market. It was easy to set up, had incredible real-time subscription features out of the box, and integrated perfectly with modern frontend frameworks like React and Angular. But recently, I\'ve made a complete and permanent switch to **Supabase**, and I genuinely haven\'t looked back. \n\n### The PostgreSQL Advantage\n\nThe main reason for my switch? **PostgreSQL**. \n\nFirebase\'s NoSQL database (Firestore) is fantastic for simple, document-based data. If you are building a simple chat app, it works beautifully. But the moment you need complex data relationships—like linking users to multiple projects, calculating dynamic pricing based on historical transactions, tracking detailed relational analytics, and running complex aggregation queries—NoSQL becomes a massive, expensive headache.\n\nSupabase gives you the raw, unadulterated power of a full PostgreSQL database, but wraps it in the developer-friendly ease of use that made Firebase famous. \n\n### Key Benefits of Supabase for Freelance Developers\n\n1.  **Auto-generated APIs:** As soon as you define a table in Supabase, you instantly get a secure, fully documented RESTful and GraphQL API.\n2.  **Real-time Subscriptions:** You can subscribe to database changes easily, just like Firebase.\n3.  **Built-in Authentication:** It natively hooks into Postgres\' Row Level Security (RLS), making authorization incredibly powerful.\n4.  **Open Source:** You can self-host it if you need to, preventing vendor lock-in.\n\nWriting raw SQL queries or utilizing the powerful Supabase JS client feels significantly more powerful and flexible than chaining together complex Firestore document map queries. Knowing that I\'m not entirely locked into a proprietary NoSQL ecosystem gives me profound peace of mind, especially when building highly scalable, enterprise-grade applications for my freelance clients.\n\nIf you haven\'t tried Supabase yet, I highly recommend spinning up a test project to see the difference for yourself.',
          image_url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80',
          tags: ['Supabase', 'Database', 'Backend', 'SQL']
        },
        {
          title: 'The Intersection of Professional Graphic Design and Frontend Engineering',
          content: '## Designing with Code in Mind\n\nA lot of people treat graphic design and web development as two completely isolated disciplines. You have the designers who live exclusively in Figma and Adobe Illustrator, and the developers who live exclusively in VS Code and terminal windows. But as someone who actively practices both, I can confidently tell you that the real magic happens when these two worlds collide.\n\n### How Design Knowledge Improves Engineering\n\nUnderstanding core design principles—such as typography pairing, color theory, gestalt principles, and visual hierarchy—makes you a significantly better frontend developer. \n\nYou stop viewing UI implementations as just "translating" a static Figma file into CSS boxes. Instead, you start understanding the *intent* behind the layout:\n*   **Why** a certain padding rhythm (e.g., 8px, 16px, 32px) is necessary to create breathing room.\n*   **Why** a specific shade of cyan draws the user\'s eye directly to a critical call-to-action button.\n*   **How** to implement fluid typography that scales beautifully from a 320px mobile screen to a 4K desktop monitor.\n\n### How Engineering Knowledge Improves Design\n\nConversely, deeply understanding how CSS, the HTML DOM, and browser rendering engines work makes you a significantly better designer. You naturally start designing with responsiveness and accessibility in mind. You understand the physical constraints of the web, which prevents you from designing incredibly beautiful but mechanically impossible-to-build interfaces.\n\nFor my freelance career, offering both expert-level design and robust technical development has been a massive game-changer. Clients absolutely love working with a singular expert who can take their abstract vision from a rough wireframe sketch all the way to a deployed, interactive, pixel-perfect React application. If you\'re a frontend developer, spend a weekend learning fundamental graphic design theory—it will instantly elevate the professionalism of your work.',
          image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80',
          tags: ['Design', 'Frontend', 'UI/UX', 'CSS']
        },
        {
          title: 'YouTube Automation Systems: Navigating the 2026 Landscape',
          content: '## The Evolution of Faceless Channels\n\n"YouTube Automation" has been a volatile buzzword for years. The core concept of running a "faceless" channel—outsourcing the scriptwriting, voiceover work, and video editing, and simply collecting the incoming AdSense revenue—sounds like an absolute dream for digital entrepreneurs. But the landscape has evolved drastically. What worked easily in 2022 is almost guaranteed to fail today.\n\nSo, is YouTube automation still profitable? **Yes, absolutely.** However, the barrier to entry is astronomically higher than it used to be. \n\n### The Quality Content Mandate\n\nYou cannot simply scrape Wikipedia, slap together generic stock footage, use a cheap robotic text-to-speech voice, and expect to go viral anymore. The YouTube recommendation algorithm, and considerably more importantly, human viewers, now demand high-quality storytelling, unique perspectives, and highly engaging visuals.\n\nIn my experience setting up and managing complex automation pipelines, the actual key to success right now is leveraging Artificial Intelligence *correctly and seamlessly*.\n\n### Building the Modern Pipeline\n\n1.  **Ideation & Scripting:** Using Advanced LLMs (like Gemini Pro) to brainstorm unique video angles, write comprehensive outlines, and generate scripts that have actual narrative arcs and emotional hooks.\n2.  **Voice Generation:** Utilizing cutting-edge, highly trained AI voice models that understand inflection, pauses, and tone to sound indistinguishable from a professional human narrator.\n3.  **Visuals & Editing:** Standardizing video editing workflows with dynamic motion graphics, not just static stock clips. \n\nThe final product absolutely needs a human touch. The visual pacing, the comedic timing, the precision of the emotional hook in the first 10 seconds—these are nuanced elements that raw AI pipelines still struggle to perfect on their own.\n\nIf you\'re establishing a new YouTube automation channel, focus relentlessly on a hyper-specific niche. Spend 80% of your creative capital on developing an irresistible thumbnail and crafting the perfect hook for the first 30 seconds of the video—because that is the exact battlefield where viewer attention is won or lost.',
          image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
          tags: ['YouTube', 'Automation', 'Content Strategy']
        },
        {
          title: 'Balancing Rigorous University Studies with a Freelance Career',
          content: '## The Double Life of a Student Freelancer\n\nBeing a 4th-semester computer science student at KFUEIT while aggressively taking on freelance full-stack engineering and graphic design contracts is... chaotic, to put it incredibly mildly. My daily schedule is often a blur of attending lectures, finishing intense academic assignments, joining client discovery calls, and pushing code during late-night development sessions. It is exhausting, but the real-world experience I am gaining is invaluable.\n\n### Systems Over Motivation\n\nThe most important lesson I\'ve extracted from this grueling schedule is the absolute necessity of ruthless time management. I used to rely entirely on "motivation" to get things done, but motivation is a fleeting emotion. Now, I rely strictly on systems.\n\n*   **Time Blocking:** I segment my day meticulously. Specific hours are heavily guarded for university coursework, and other specific hours are dedicated solely to client work.\n*   **Deep Work Focus:** When I am in "client execution mode," my phone is thrown into Do Not Disturb, all social media blockers are active, and I am fully locked into the terminal.\n*   **Asynchronous Communication:** Managing client expectations is critical. I explicitly inform my clients about my university schedule during the onboarding phase. I let them know that while I might not be able to join an ad-hoc Zoom call at 2:00 PM on a Tuesday, I guarantee their code will be delivered flawlessly by the agreed-upon deadline.\n\n### Starting Small and Scaling Up\n\nIf you are a student attempting to build a freelance career concurrently, my core advice is to start incredibly small. Do not eagerly take on massive, sprawling enterprise projects that will inevitably overwhelm your schedule and jeopardize your grades. Build a strong, tight portfolio of highly impressive, smaller scoped projects.\n\nLearn to manage your calendar defensively, and always remember that securing your fundamental education is still a massive priority. Ironically, the raw, real-world bug-fixing experience you gain from commercial freelancing will immediately make your theoretical university studies infinitely more comprehensible and meaningful.',
          image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
          tags: ['Freelance', 'Student Life', 'Time Management', 'Career']
        },
        {
          title: 'Why Tailwind CSS Officially Won the Structural Styling Wars',
          content: '## The Dark Ages of Custom CSS\n\nI vividly remember the dark days of writing thousands upon thousands of lines of custom, cascading CSS. Trying to maintain strict BEM (Block Element Modifier) methodology across a massive team, juggling sprawling SASS variable files, and engaging in terrifying specificity wars... it was an exhausting struggle. \n\nThen the industry shifted toward CSS-in-JS solutions like Styled Components or Emotion. These were a massive step in the right modular direction, but they unfortunately added heavy JavaScript runtime overhead and complicated the render pipeline.\n\n### The Utility-First Revolution\n\nAnd then, I finally gave **Tailwind CSS** a fair chance. \n\nI admit it: at first glance, looking at a basic HTML `<div>` bloated with 15 utility classes felt structurally wrong. It felt messy and chaotic. But after forcing myself to build an entire production dashboard with it, I was completely and permanently hooked. Tailwind CSS didn\'t just optimize how I style my React applications; it fundamentally changed how I think about scalable design systems.\n\n### The Power of Design Constraints\n\nThe true, underlying genius of Tailwind is its constraint-based design philosophy. Instead of picking any random, arbitrary hex code (`#3a8df2`) or throwing pixel values at a wall (`margin: 17px`), you are heavily encouraged to choose from a carefully curated, mathematically sound typographic and color scale.\n\nThis naturally, almost automatically, leads to highly consistent, rhythmically harmonious, and professional-looking user interfaces. Furthermore, the sheer velocity of development is practically unmatched. I rarely, if ever, have to leave my JSX file or context-switch to write styling rules.\n\nYes, the raw DOM markup can occasionally appear slightly cluttered, but in modern component-based frameworks like React, Vue, or Next.js, that is a non-issue. You abstract the messy utility strings inside perfectly encapsulated, reusable structural components. Tailwind has undeniably won the styling wars, and it remains my absolute default choice for all modern frontend architecture.',
          image_url: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80',
          tags: ['CSS', 'Tailwind', 'Frontend', 'Web Development']
        },
        {
          title: 'The Unseen Power of Micro-Interactions in UI/UX Design',
          content: '## Beyond Static Pixels\n\nThink about the last time you used a beautifully engineered digital product. Have you ever clicked a primary action button on a SaaS dashboard and felt a strange, satisfying sense of completion? Perhaps it was a subtle color transition, a smooth ripple effect radiating from the click, or a tiny, playful bounce animation as a modal opened.\n\nThese seemingly invisible details are called **micro-interactions**, and they are the undisputed secret sauce of world-class, premium user experiences.\n\n### Designing for "Feel"\n\nAs a hybrid developer and designer, I spend an inordinate amount of time actively thinking about how an application *feels*, not solely how it visually looks in a static mockup. A completely static webpage is fundamentally boring to the human brain. But an interface that organically reacts to your mouse cursor, actively acknowledges your keyboard inputs, and safely guides your visual attention through subtle motion feels alive and highly polished.\n\nI heavily rely on advanced animation libraries like **Framer Motion** natively within my React projects to quickly bring these intricate interactions to life. It truly does not require a massive budget to implement:\n\n*   A slight `scale: 1.05` on a hover event.\n*   A smooth, staggered fade-in transition when scrolling down a landing page.\n*   A satisfying, custom SVG path loading spinner.\n\n### The Balance of Animation\n\nThese granular details might seem completely mathematically insignificant, but they collectively build immense psychological trust and subtly delight the end-user. \n\nHowever, it is crucial to remember there is an incredibly fine line between an interface being "engaging" and it becoming aggressively "annoying." The key principle here is subtlety. UI animations should be extremely fast (typically resolving in under 200ms to 300ms) and functionally purposeful. They should absolutely never distract the user from reading the core content; they exist solely to enhance spatial awareness. Next time you are engineering a new interface component, pause and ask yourself: "What micro-interaction would make this feel significantly more premium?"',
          image_url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80',
          tags: ['Design', 'UX', 'Animation', 'Frontend']
        },
        {
          title: 'My Definite Full-Stack Technology Stack for Modern Applications',
          content: '## Choosing Tools in a Fast-Moving Ecosystem\n\nThe web development landscape moves at a notoriously incredible pace. The "industry standard" architecture from merely two years ago is frequently considered obsolete legacy code today. After rigorously experimenting with dozens of different JavaScript frameworks, managed databases, styling paradigms, and cloud deployment platforms, I have meticulously curated a strict technology stack that provides me with the absolute perfect balance of rapid development speed, infinite scaling capability, and pristine developer experience.\n\n### The Frontend Engine\n\nFor the frontend execution layer, my choice is definitively **React powered by Vite**. Create React App (CRA) is officially dead, and Vite\'s instant development server start times and lightning-fast Hot Module Replacement (HMR) make UI development an absolute joy. I strictly pair this runtime environment with **Tailwind CSS** for comprehensive utility-based styling, and **Framer Motion** for orchestrating complex layout animations.\n\n### The Backend Powerhouse\n\nFor the backend and database architecture, I have completely and heavily migrated to **Supabase**. Having access to a raw, incredibly powerful PostgreSQL database—outfitted with instantly generated REST APIs, native real-time WebSockets, and flawlessly integrated user authentication—saves me literally weeks of tedious backend boilerplate setup per project. It is architecturally robust enough to run Fortune 500 enterprise applications, yet frictionless enough to configure for weekend hackathon side projects.\n\n### The Deployment Network\n\nFinally, for global hosting and deployment, **Vercel** is my undisputed platform of choice. Their incredibly seamless GitHub webhook integration, automatic staging branch preview deployments, and incredibly low-latency global CDN edge network performance are completely unmatched in the industry.\n\nThis specific combination of technologies allows me to safely and rapidly go from an abstract napkin idea to a fully deployed, highly secure, production-ready full-stack application in absolute record time. It is a massive competitive advantage.',
          image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
          tags: ['Tech Stack', 'React', 'Supabase', 'Vercel']
        },
        {
          title: 'Overcoming Imposter Syndrome as a Young Software Engineer',
          content: '## The Reality of Tech Social Media\n\nLet\'s be brutally honest for a moment: browsing software engineering Twitter (X) and highly curated LinkedIn feeds can be an incredibly toxic and intimidating experience. Every single day, you are bombarded with posts of people your age launching multi-million dollar AI startups, making massive core contributions to huge open-source frameworks, or successfully landing L5 engineering roles at elite FAANG companies. \n\nAs a young developer, it is incredibly easy to consume that content and immediately think, *"I am absolutely not good enough. I am completely falling behind. I do not belong in this industry."*\n\n### Acknowledging the Struggle\n\nI have personally battled with severe imposter syndrome repeatedly. There have been countless days when I have stared blankly at a cryptic webpack compilation bug or a mysterious database race condition for six unbroken hours, feeling like a complete and utter fraud. \n\nBut over time, and through honest conversations with mentors, I have realized a comforting truth: literally *everyone* feels this way. Even the highly compensated senior staff developers I deeply look up to spend at least 40% of their workday furiously Googling highly specific error messages and thoroughly re-reading fundamental documentation matrices.\n\n### Redefining Your Value\n\nThe ultimate turning point for my mental health in this career was fully accepting that I absolutely do not need to memorize everything. The modern technology industry is vastly too large and complex for any single human brain to master it all. \n\nMy intrinsic value as an engineer does not lie in having the exact syntax of the entire React Router v6 API memorized perfectly. My value lies entirely in my raw ability to quickly conceptualize problems, efficiently read and interpret documentation, dynamically adapt to new paradigms, and persistently execute solutions.\n\nIf you are actively dealing with imposter syndrome right now, my direct advice is to forcibly disconnect from comparing yourself to social media influencers. Focus entirely on your personal delta—look closely at the code you wrote six months ago. You will almost undoubtedly cringe at how poorly it was structured, and that is a massive victory! It mathematically proves you have grown and elevated your skills. Keep building, keep breaking things, keep learning, and deeply internalize that you absolutely objectively deserve your place in this industry.',
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
          tags: ['Mental Health', 'Career', 'Advice', 'Developer Life']
        },
        {
          title: 'Why Fundamental Office Software Skills Remain Vital for Tech Freelancers',
          content: '## The Business Side of Code\n\nWhen most people conceptualize the life of an independent tech freelancer, they usually exclusively picture someone writing complex algorithms in a dark terminal, designing vibrant user interfaces, or launching viral marketing campaigns. But there is a massive set of completely "boring," unglamorous skills that are absolutely essential for successfully running a sustainable freelance software business: profound proficiency in fundamental office software.\n\nYou might be an absolute wizard at architecting complex serverless Node.js microservices, but if you cannot quickly assemble a highly professional business proposal, strictly track your quarterly finances, or present your complex technical ideas clearly to non-technical stakeholders, your freelance business is going to severely struggle.\n\n### Spreadsheets Are Not Obsolete\n\nMicrosoft Excel (or Google Sheets) remains arguably the most deeply critical mechanical tool in my entire administrative arsenal. I rely on it aggressively for securely tracking billable project hours, calculating variable invoices, forecasting my monthly freelance revenue stream, and managing complex tax deductibles. Accurately knowing how to rapidly utilize pivot tables, construct reliable VLOOKUP or XLOOKUP arrays, and write basic data formatting macros routinely saves me dozens of hours of brutal manual data entry every single month.\n\n### Communication Through Documentation\n\nBeyond spreadsheets, mastery of word processing and presentation tools is equally critical. A beautifully formatted, perfectly spell-checked, structurally sound project proposal document can frequently be the definitive deciding factor between successfully closing a high-ticket enterprise client and getting entirely ghosted post-meeting. \n\nFurthermore, when it comes to actively pitching a complex database architecture integration or presenting the findings of a massive UX audit to a corporate board, a clean, concise, visually balanced presentation deck is practically invaluable. Do not ignore or look down upon these fundamental administrative tools—they form the structural business backbone that allows you the actual freedom to write code for a living.',
          image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
          tags: ['Freelance', 'Business', 'MS Office', 'Entrepreneurship']
        }
      ];

      const { error } = await supabase.from('blog_posts').insert(posts);
      if (error) throw error;
      
      setMessage('Successfully generated 10 massive SEO markdown blog posts!');
      fetchBlogPosts();
    } catch (error: any) {
      setMessage(error.message || 'Error generating blog posts.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setContent('');
    setCategory('Web Development');
    setLiveUrl('');
    setGithubUrl('');
    setTags('');
    setMainImageFile(null);
    setAdditionalImageFiles(null);
    setExistingImageUrl('');
    setExistingAdditionalImages([]);
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <>
      <SEO title="Admin Dashboard" description="Admin only area" />
      <Section id="admin" className="pt-32">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-slate-400">Welcome back, Hanan. Manage your portfolio and blog here.</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-800 pb-4 justify-between items-center">
          <div className="flex gap-4">
            <button 
              onClick={() => { setActiveTab('projects'); resetForm(); }}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'projects' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              Manage Projects
            </button>
            <button 
              onClick={() => { setActiveTab('blog'); resetForm(); }}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'blog' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              Manage Blog
            </button>
          </div>
          {activeTab === 'blog' && (
            <button 
              onClick={handleSeedBlogPosts}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600/30 transition-colors text-sm font-medium"
            >
              Generate 10 SEO Blog Posts
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1 glass-card p-6 h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? `Edit ${activeTab === 'projects' ? 'Project' : 'Post'}` : `Add New ${activeTab === 'projects' ? 'Project' : 'Post'}`}
              </h2>
              {editingId && (
                <button onClick={resetForm} className="text-slate-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              )}
            </div>
            
            {message && (
              <div className="p-4 mb-6 rounded-lg bg-slate-800/50 border border-cyan-500/30 text-cyan-300 text-sm">
                {message}
              </div>
            )}

            <form onSubmit={activeTab === 'projects' ? handleAddOrUpdateProject : handleAddOrUpdateBlogPost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none" />
              </div>

              {activeTab === 'projects' && (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none">
                    <option>Web Development</option>
                    <option>Graphic Design</option>
                    <option>AI/ML</option>
                    <option>Other</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Tags (comma separated)</label>
                <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="React, Node.js, Tailwind" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none" />
              </div>

              {activeTab === 'projects' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none resize-none" />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Content</label>
                  <textarea value={content} onChange={e => setContent(e.target.value)} required rows={10} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none resize-none" />
                </div>
              )}
              
              <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/30">
                <label className="block text-sm font-medium text-slate-400 mb-2">Main Image {activeTab === 'blog' && '(Optional)'}</label>
                {existingImageUrl && !mainImageFile && (
                  <img src={existingImageUrl} alt="Current main" className="w-full h-32 object-cover rounded-lg mb-2 opacity-70" />
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setMainImageFile(e.target.files ? e.target.files[0] : null)} 
                  className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30" 
                />
              </div>

              {activeTab === 'projects' && (
                <>
                  <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/30">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Additional Gallery Images</label>
                    {existingAdditionalImages.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto mb-2 pb-2">
                        {existingAdditionalImages.map((img, i) => (
                          <img key={i} src={img} alt={`Gallery ${i}`} className="w-16 h-16 object-cover rounded-lg opacity-70 shrink-0" />
                        ))}
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={e => setAdditionalImageFiles(e.target.files)} 
                      className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-400 hover:file:bg-blue-500/30" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Live URL (Optional)</label>
                    <input type="url" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">GitHub URL (Optional)</label>
                    <input type="url" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none" />
                  </div>
                </>
              )}
              
              <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-500 transition-colors flex items-center justify-center gap-2">
                {loading ? 'Saving...' : editingId ? `Update ${activeTab === 'projects' ? 'Project' : 'Post'}` : `Add ${activeTab === 'projects' ? 'Project' : 'Post'}`}
              </button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Manage {activeTab === 'projects' ? 'Projects' : 'Blog Posts'}</h2>
            <div className="space-y-4">
              {activeTab === 'projects' ? (
                projects.length === 0 ? (
                  <div className="glass-card p-8 text-center text-slate-400">No projects found.</div>
                ) : (
                  projects.map(project => (
                    <div key={project.id} className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={project.image_url} alt={project.title} className="w-20 h-20 object-cover rounded-lg" />
                        <div>
                          <h3 className="text-white font-bold text-lg">{project.title}</h3>
                          <p className="text-sm text-cyan-400 mb-1">{project.category}</p>
                          <div className="flex gap-2">
                            {project.tags?.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">{tag}</span>
                            ))}
                            {project.tags && project.tags.length > 3 && <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">+{project.tags.length - 3}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button onClick={() => handleEditProject(project)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                          <Edit2 size={20} />
                        </button>
                        <button onClick={() => handleDeleteProject(project.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                )
              ) : (
                blogPosts.length === 0 ? (
                  <div className="glass-card p-8 text-center text-slate-400">No blog posts found.</div>
                ) : (
                  blogPosts.map(post => (
                    <div key={post.id} className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {post.image_url && <img src={post.image_url} alt={post.title} className="w-20 h-20 object-cover rounded-lg" />}
                        <div>
                          <h3 className="text-white font-bold text-lg">{post.title}</h3>
                          <p className="text-sm text-slate-400 mb-1">{new Date(post.created_at).toLocaleDateString()}</p>
                          <div className="flex gap-2">
                            {post.tags?.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button onClick={() => handleEditBlogPost(post)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                          <Edit2 size={20} />
                        </button>
                        <button onClick={() => handleDeleteBlogPost(post.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
