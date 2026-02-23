"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/locale-context";

const skills = [
  "C#", "JavaScript", "Python", "TypeScript",
  "React", "Next.js", "Electron",
  "SQL", "PostgreSQL", "MSSQL",
  "Django", "REST APIs",
  "Docker", "CI/CD", "GitHub Actions",
  "Clean Architecture", "Agile / Scrum",
  "GCP", "AI/ML",
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="page-container">
      <section className="hero">
        <h1 className="hero-title">Mathias H&oslash;egh Bj&oslash;rkmann</h1>
        <p className="hero-tagline">{t("hero.tagline")}</p>
        <div className="hero-cta">
          <Link href="/ai-tool" className="btn-primary">
            {t("hero.tryAiTool")}
          </Link>
          <Link href="/contact" className="btn-secondary">
            {t("hero.getInTouch")}
          </Link>
        </div>
      </section>

      <section className="bio-section">
        <h2>{t("about.heading")}</h2>
        <p>{t("about.bio")}</p>
      </section>

      <section className="gallery-section">
        <h2>{t("gallery.heading")}</h2>
        <div className="gallery-layout">
          <div className="gallery-featured">
            <Image
              src="/Mathias/mathias_faceapp.jpg"
              alt="Mathias Høegh Bjørkmann"
              width={600}
              height={800}
              className="gallery-featured-img"
              priority
            />
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <Image
                src="/Mathias/IMG_20250722_210528_173.jpg"
                alt="Hiking in the wheat fields"
                width={400}
                height={400}
                className="gallery-img"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/Mathias/IMG_3094.jpg"
                alt="Casual portrait in modern space"
                width={400}
                height={400}
                className="gallery-img"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/Mathias/IMG_2904.jpg"
                alt="Overlooking snowy city"
                width={400}
                height={400}
                className="gallery-img"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/Mathias/received_1832509100786188.jpeg"
                alt="Winter outdoors portrait"
                width={400}
                height={400}
                className="gallery-img"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/Mathias/Messenger_creation_6AB2BCB1-ADB9-4BBC-82C3-57491131AAEF.jpeg"
                alt="Fun snow photo with friends"
                width={400}
                height={400}
                className="gallery-img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="experience-section">
        <h2>{t("experience.heading")}</h2>
        <div className="experience-card">
          <div className="experience-header">
            <h3>{t("experience.turnpikes.title")}</h3>
            <span className="experience-date">2024 – 2025</span>
          </div>
          <ul className="experience-list">
            <li>{t("experience.turnpikes.bullet1")}</li>
            <li>{t("experience.turnpikes.bullet2")}</li>
            <li>{t("experience.turnpikes.bullet3")}</li>
            <li>{t("experience.turnpikes.bullet4")}</li>
          </ul>
        </div>
      </section>

      <section className="education-section">
        <h2>{t("education.heading")}</h2>
        <div className="education-grid">
          <div className="education-card">
            <h3>{t("education.pb.title")}</h3>
            <p className="education-institution">UCN – Aalborg</p>
            <span className="education-date">2025</span>
          </div>
          <div className="education-card">
            <h3>{t("education.ap.title")}</h3>
            <p className="education-institution">UCN – Aalborg</p>
            <span className="education-date">2024</span>
          </div>
        </div>
      </section>

      <section className="projects-section">
        <h2>{t("projects.heading")}</h2>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-card-label">{t("projects.sideProject")}</div>
            <h3>{t("projects.ai.title")}</h3>
            <ul className="project-list">
              <li>{t("projects.ai.bullet1")}</li>
              <li>{t("projects.ai.bullet2")}</li>
              <li>{t("projects.ai.bullet3")}</li>
            </ul>
          </div>
          <div className="project-card">
            <div className="project-card-label">{t("projects.bachelorProject")}</div>
            <h3>{t("projects.migration.title")}</h3>
            <ul className="project-list">
              <li>{t("projects.migration.bullet1")}</li>
              <li>{t("projects.migration.bullet2")}</li>
              <li>{t("projects.migration.bullet3")}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="skills-section">
        <h2>{t("skills.heading")}</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="links-section">
        <h2>{t("links.heading")}</h2>
        <div className="links-grid">
          <a
            href="https://github.com/MBjoerkmann"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            {t("links.github")}
          </a>
          <a
            href="https://linkedin.com/in/mathias-bj%C3%B8rkmann"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            {t("links.linkedin")}
          </a>
          <a href="mailto:mbjoerkmann@proton.me" className="link-card">
            {t("links.email")}
          </a>
        </div>
      </section>
    </main>
  );
}
