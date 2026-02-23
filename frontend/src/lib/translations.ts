export type Locale = "en" | "da";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navbar
    "nav.about": "About",
    "nav.aiTool": "AI Tool",
    "nav.contact": "Contact",
    "nav.toggleMenu": "Toggle menu",

    // Hero
    "hero.tagline": "Software Developer",
    "hero.tryAiTool": "Try the AI Tool",
    "hero.getInTouch": "Get in Touch",

    // About
    "about.heading": "About Me",
    "about.bio":
      "I'm a solution-oriented developer with a strong interest in system design, automation, and architecture. My professional background spans client applications and system integration, with a focus on designing scalable and maintainable solutions. My education has given me a foundation in large-scale systems, databases, security, and data analysis, supplemented with knowledge of machine learning and cryptography. Outside of software, I'm interested in urban architecture, politics, and fitness.",

    // Gallery
    "gallery.heading": "Gallery",

    // Experience
    "experience.heading": "Experience",
    "experience.turnpikes.title": "Internship, Turnpikes \u2013 Aalborg",
    "experience.turnpikes.bullet1": "Developed an Electron app as a migration tool",
    "experience.turnpikes.bullet2": "Implemented Clean Architecture for maintainable and scalable structure",
    "experience.turnpikes.bullet3": "Improved internal test platform with focus on frontend and user flows",
    "experience.turnpikes.bullet4": "Developed and tested new functionalities",

    // Education
    "education.heading": "Education",
    "education.pb.title": "Bachelor\u2019s in Software Development",
    "education.ap.title": "AP in Computer Science",

    // Projects
    "projects.heading": "Selected Projects",
    "projects.sideProject": "Side Project",
    "projects.bachelorProject": "Bachelor Project",
    "projects.ai.title": "AI Recommendations Webcrawler",
    "projects.ai.bullet1": "Full-stack web app with React frontend and Django backend",
    "projects.ai.bullet2": "API integrations for web data collection and structured data processing",
    "projects.ai.bullet3": "AI-powered recommendations with PDF report delivery via email",
    "projects.migration.title": "Turnpikes: Migration Tool",
    "projects.migration.bullet1": "Modular data migration tool using Clean Architecture with layered separation",
    "projects.migration.bullet2": "Automated configuration based on customer data",
    "projects.migration.bullet3": "CI/CD workflows for testing and deployment with GitHub Actions",

    // Skills
    "skills.heading": "Tech Stack",

    // Links
    "links.heading": "Find Me Online",
    "links.github": "GitHub",
    "links.linkedin": "LinkedIn",
    "links.email": "Email",

    // AI Tool
    "aiTool.heading": "AI recommendation tool",
    "aiTool.analyzeCompany": "Analyze Company",
    "aiTool.description":
      "Simply put in the url of your website and get recommendations for AI implementation!",
    "aiTool.placeholder": "Enter company website URL",
    "aiTool.ariaLabel": "Company URL",
    "aiTool.analyzing": "Analyzing...",
    "aiTool.analyze": "Analyze",
    "aiTool.fetchError":
      "Failed to fetch analysis. Please check the URL and try again.",
    "aiTool.unknownError": "An unknown error occurred.",

    // Report
    "report.heading": "Send report to my email",
    "report.placeholder": "Enter your email",
    "report.ariaLabel": "Report Email",
    "report.sending": "Sending...",
    "report.sendReport": "Send Report",
    "report.noAnalysis":
      "Please analyze a company first to generate a report.",
    "report.sendError": "Failed to send report. Please try again.",
    "report.success": "Report successfully sent to your email",
    "report.unknownError":
      "An unknown error occurred while sending the report.",

    // Analysis Display
    "analysis.resultsFor": "Analysis Results for",
    "analysis.companyDescription": "Company Description",
    "analysis.recommendations": "Recommendations",
    "analysis.feasibility": "Feasibility:",
    "analysis.duration": "Duration:",
    "analysis.actionPlan": "Action Plan:",
    "analysis.steps": "Steps:",
    "analysis.showMore": "Show details",
    "analysis.showLess": "Hide details",
    "analysis.close": "Close",

    // Contact
    "contact.heading": "Get in Touch",
    "contact.subtitle":
      "Feel free to reach out for collaborations, questions, or just to say hello.",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
  },
  da: {
    // Navbar
    "nav.about": "Om mig",
    "nav.aiTool": "AI-v\u00e6rkt\u00f8j",
    "nav.contact": "Kontakt",
    "nav.toggleMenu": "Skift menu",

    // Hero
    "hero.tagline": "Softwareudvikler",
    "hero.tryAiTool": "Pr\u00f8v AI-v\u00e6rkt\u00f8jet",
    "hero.getInTouch": "Kontakt mig",

    // About
    "about.heading": "Om mig",
    "about.bio":
      "Jeg er en l\u00f8sningsorienteret udvikler med s\u00e6rlig interesse for systemdesign, automatisering og arkitektur. Min faglige baggrund omfatter arbejde med b\u00e5de klientapplikationer og systemintegration, med fokus p\u00e5 at designe skalerbare og vedligeholdelsesvenlige l\u00f8sninger. Min uddannelsen har givet mig et fundament for udvikling af st\u00f8rre systemer, databaser, sikkerhed, og dataanalyse, suppleret med viden om machine learning og kryptografi. Ved siden af software interesserer jeg mig for byarkitektur, politik og fitness.",

    // Gallery
    "gallery.heading": "Galleri",

    // Experience
    "experience.heading": "Erfaring",
    "experience.turnpikes.title": "Praktik, Turnpikes \u2013 Aalborg",
    "experience.turnpikes.bullet1": "Udviklede en Electron-app til migrationsv\u00e6rkt\u00f8j",
    "experience.turnpikes.bullet2": "Implementerede Clean Architecture for vedligeholdelsesvenlig og skalerbar struktur",
    "experience.turnpikes.bullet3": "Forbedrede intern testplatform med fokus p\u00e5 frontend og brugerflow",
    "experience.turnpikes.bullet4": "Udviklede og testede nye funktionaliteter",

    // Education
    "education.heading": "Uddannelse",
    "education.pb.title": "Professionsbachelor i Softwareudvikling",
    "education.ap.title": "Erhvervsakademiuddannelse i Datamatiker",

    // Projects
    "projects.heading": "Udvalgte Projekter",
    "projects.sideProject": "Sideprojekt",
    "projects.bachelorProject": "Bachelorprojekt",
    "projects.ai.title": "AI Recommendations Webcrawler",
    "projects.ai.bullet1": "Full-stack webapplikation med React frontend og Django backend",
    "projects.ai.bullet2": "API-integrationer til dataindsamling og struktureret databehandling",
    "projects.ai.bullet3": "AI-drevne anbefalinger med PDF-rapportlevering via e-mail",
    "projects.migration.title": "Turnpikes: Migration Tool",
    "projects.migration.bullet1": "Modul\u00e6rt datamigreringsv\u00e6rkt\u00f8j med Clean Architecture og lagdeling",
    "projects.migration.bullet2": "Automatiseret konfigurering baseret p\u00e5 kundedata",
    "projects.migration.bullet3": "CI/CD-workflow til test og deployment med GitHub Actions",

    // Skills
    "skills.heading": "Teknologier",

    // Links
    "links.heading": "Find mig online",
    "links.github": "GitHub",
    "links.linkedin": "LinkedIn",
    "links.email": "E-mail",

    // AI Tool
    "aiTool.heading": "AI-anbefalingsv\u00e6rkt\u00f8j",
    "aiTool.analyzeCompany": "Analys\u00e9r virksomhed",
    "aiTool.description":
      "Indtast blot URL\u2019en til din hjemmeside og f\u00e5 anbefalinger til AI-implementering!",
    "aiTool.placeholder": "Indtast virksomhedens hjemmeside-URL",
    "aiTool.ariaLabel": "Virksomhedens URL",
    "aiTool.analyzing": "Analyserer...",
    "aiTool.analyze": "Analys\u00e9r",
    "aiTool.fetchError":
      "Kunne ikke hente analyse. Tjek venligst URL\u2019en og pr\u00f8v igen.",
    "aiTool.unknownError": "Der opstod en ukendt fejl.",

    // Report
    "report.heading": "Send rapport til min e-mail",
    "report.placeholder": "Indtast din e-mail",
    "report.ariaLabel": "Rapport e-mail",
    "report.sending": "Sender...",
    "report.sendReport": "Send rapport",
    "report.noAnalysis":
      "Analys\u00e9r venligst en virksomhed f\u00f8rst for at generere en rapport.",
    "report.sendError": "Kunne ikke sende rapport. Pr\u00f8v venligst igen.",
    "report.success": "Rapport sendt til din e-mail",
    "report.unknownError":
      "Der opstod en ukendt fejl under afsendelse af rapporten.",

    // Analysis Display
    "analysis.resultsFor": "Analyseresultater for",
    "analysis.companyDescription": "Virksomhedsbeskrivelse",
    "analysis.recommendations": "Anbefalinger",
    "analysis.feasibility": "Gennemf\u00f8rlighed:",
    "analysis.duration": "Varighed:",
    "analysis.actionPlan": "Handlingsplan:",
    "analysis.steps": "Trin:",
    "analysis.showMore": "Vis detaljer",
    "analysis.showLess": "Skjul detaljer",
    "analysis.close": "Luk",

    // Contact
    "contact.heading": "Kontakt mig",
    "contact.subtitle":
      "Du er velkommen til at kontakte mig ang\u00e5ende samarbejde, sp\u00f8rgsm\u00e5l eller bare for at sige hej.",
    "contact.email": "E-mail",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
  },
};

export default translations;
