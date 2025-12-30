
import { CareerContext } from './types';

export const INITIAL_CAREER_DATA: CareerContext = {
  name: "Liam Carter",
  title: "AI Engineer & Quality Manager",
  bio: "Quality Manager and AI Champion at Danfoss Power Solutions. I bridge the gap between industrial excellence and Generative AI. Beyond engineering, I'm an electronic music producer, DJ, and a connoisseur of Italian and Chinese cuisine.",
  profileImageUrl: "", // Empty defaults to placeholder logic
  adminPassword: "liam2025",
  detailedResumeContext: `PROFESSIONAL DEVELOPMENT & COMPETENCY REPORT - LIAM CARTER
Focus: AI Engineering, Data Science, and Full-Stack Python Development

1. EXECUTIVE SUMMARY
This report outlines the technical competencies and certifications acquired through an intensive, multi-disciplinary curriculum focused on Artificial Intelligence, Software Engineering, and Data Science. The combined coursework represents over 200+ hours of hands-on training, transitioning from advanced Python programming to the deployment of autonomous AI Agents, Large Language Models (LLMs), and interactive web applications.

2. TECHNICAL SKILLS MATRIX
- Languages: Python (Advanced), SQL, HTML5, CSS3, JavaScript (Basic)
- AI & LLMs: OpenAI API, LangChain, Hugging Face, RAG, QLoRA, Fine-Tuning, Vector Databases (Pinecone/Chroma)
- Data Science: Pandas, NumPy, Scikit-Learn, Matplotlib, Seaborn, Plotly, Dash
- Machine Learning: Regression, Classification, Clustering, Neural Networks, Predictive Analytics
- Web & Automation: Flask, Django, Bootstrap 5, WordPress, Elementor, n8n (Workflow Automation), REST APIs
- Tools: Git/GitHub, Jupyter Notebooks, VS Code, Postman, Google Colab

3. DETAILED COMPETENCY BREAKDOWN
DOMAIN A: AI ENGINEERING & GENERATIVE AI
- RAG: Building systems that connect LLMs to private data sources to reduce hallucinations.
- Fine-Tuning: Using QLoRA to fine-tune open-source models (Llama 3, Mistral).
- Agent Orchestration: Designing autonomous AI agents capable of planning and multi-step reasoning.
- Vector Databases: Implementing vector storage for semantic search.

DOMAIN B: DATA SCIENCE & MACHINE LEARNING
- Statistical Foundations: Probability, distributions, A/B Testing.
- Supervised Learning: Linear/Polynomial Regression, Decision Trees, Random Forests, SVM.
- Unsupervised Learning: K-Means Clustering, PCA.
- Deep Learning: Neural Networks and scaling ML models.
- Data Visualization: Interactive charts (Plotly) and Dashboard Engineering (Dash).

DOMAIN C: CORE PROGRAMMING & SOFTWARE ARCHITECTURE
- Advanced Python: Decorators, Generators, Error Handling.
- OOP: Class inheritance, polymorphism, encapsulation.
- Web Development: Server-side applications using Flask and Django.
- Automation: Selenium/BeautifulSoup for web scraping and API consumption.

DOMAIN D: FRONTEND DESIGN & UI/UX
- Responsive Design: Bootstrap Grid system for Mobile/Desktop.
- Component Library: Modals, Navbars, Cards for rapid development.
- Rapid Prototyping: Landing pages via WordPress & Elementor.

4. PROJECT CAPABILITIES
- Custom Knowledge Chatbot (RAG/Python)
- Automated Lead Qualifier (n8n/LLM)
- Financial Analytics Dashboard (Plotly/Dash)
- Predictive Sales Model (Scikit-learn/NumPy)
- Responsive AI Web App (Flask/Bootstrap 5)`,
  projectDeepDiveContext: `PROJECT CAPABILITIES:
1. AI-Powered PFMEA Generator: Generates Process Failure Mode Effects and Analysis documents from vision maps.
2. AI Root Cause Analysis Application: Streamlines RCA for manufacturing issues.
3. n8n Agent with RAG Chatbot: Answers detailed questions from a knowledge base using Retrieval-Augmented Generation.
4. Website Chatbot with RAG: Context-aware responses for site visitors with lead storage.
5. AI Voice Agent: Uses GPT-4o for emails and communication summaries.
6. Web Scraping Application: Curates tech news for trend analysis.`,
  socials: {
    linkedIn: "https://www.linkedin.com/in/liam-carter-82391325",
    github: "https://github.com/liamcarter"
  },
  coreCompetencies: [
    "LLM Engineering",
    "RAG Systems",
    "Process Automation",
    "Six Sigma Quality",
    "Python Dashboards",
    "Electronic Music Production"
  ],
  skills: [
    { id: 's1', name: 'Python (Advanced)', level: 95, category: 'backend' },
    { id: 's2', name: 'AI & LLM (RAG)', level: 92, category: 'ai' },
    { id: 's3', name: 'ML / Data Science', level: 88, category: 'ai' },
    { id: 's4', name: 'n8n Automation', level: 90, category: 'devops' },
    { id: 's5', name: 'Music Tech / DSP', level: 82, category: 'creative' },
    { id: 's6', name: 'SQL / Databases', level: 85, category: 'backend' },
  ],
  experience: [
    {
      id: 'exp1',
      company: 'Danfoss Power Solutions',
      role: 'Quality Manager & AI Lead',
      period: '2021 - Present',
      description: [
        'Built Sales Feasibility Assistant checking SAP data via Teams chat.',
        'Developed business-wide training courses for Generative AI adoption.',
        'Integrating AI-powered tools to enhance quality management systems.'
      ],
      technologies: ['Python', 'SAP', 'n8n', 'LLMs']
    },
    {
      id: 'exp2',
      company: 'Eaton Corporation',
      role: 'Quality Manager ACQI SSGB',
      period: '2011 - 2021',
      description: [
        'Executed multiple Six Sigma projects significantly reducing variation.',
        'Achieved 50% improvement in Customer DPPM within two quarters.',
        'Lead Assessor for Operations Assessments across multiple business units.'
      ],
      technologies: ['Six Sigma', '8D', 'PFMEA', 'ISO9001']
    }
  ],
  projects: [
    {
      id: 'p1',
      title: 'AI PFMEA Generator',
      description: 'Generates complex Failure Mode documents from process maps using Computer Vision and LLMs.',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      tags: ['Vision', 'Python', 'Quality']
    },
    {
      id: 'p2',
      title: 'n8n RAG Chatbot',
      description: 'Enterprise-grade RAG implementation using n8n workflows for deep knowledge base retrieval.',
      imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=800',
      tags: ['n8n', 'RAG', 'No-Code']
    },
    {
      id: 'p3',
      title: 'AI Root Cause Analysis',
      description: 'Application streamlining RCA for manufacturing issues, integrating direct feedback loops.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800',
      tags: ['LLMs', 'Manufacturing', 'Python']
    }
  ]
};
