"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ChatDemo from "./components/ChatDemo";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [scrolled, setScrolled] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "AI Engineer",
    "Generative AI Researcher",
    "System Architect",
    "Open Source Contributor",
  ];
  const galleryImages = [
    "/images/profile.jpeg",
    "/images/profile_2.jpeg",
    "/images/profile_3.jpeg",
    "/images/profile_4.jpeg",
    "/images/profile_5.jpeg",
  ];

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(roleInterval);
    };
  }, [roles.length]);

  return (
    <main className="bg-[#050A14] text-white overflow-hidden antialiased selection:bg-cyan-500/30 relative">
      <CinematicLoader />
      <MagneticCursor />
      <ClickBurstLayer />
      {/* Cinematic Noise Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Dynamic Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" 
        />
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[8%] w-64 h-64 rounded-full bg-cyan-400/10 blur-[90px]"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 70, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[18%] right-[10%] w-72 h-72 rounded-full bg-indigo-500/10 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 45, 0], y: [0, -35, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[36%] right-[18%] w-64 h-64 rounded-full bg-rose-500/10 blur-[110px]"
        />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        style={{ scaleX: progressX }}
      />

      {/* Mouse Follower Glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px] z-0 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{ x: smoothX, y: smoothY }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "top-2 left-3 right-3 md:top-4 md:left-0 md:right-0 md:w-fit md:mx-auto bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full px-4 md:px-8 py-2 md:py-3 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            : "w-full bg-transparent py-6 px-6 md:px-12"
        }`}
      >
        <div className="flex justify-between items-center gap-3 md:gap-8">
          <div
            className="text-base md:text-lg font-black tracking-[0.2em] text-cyan-300 font-orbitron drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]"
          >
            N
            <span className="text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.5)]">A</span>
            D
            <span className="ml-1 text-rose-400 animate-cursor-blink drop-shadow-[0_0_12px_rgba(251,113,133,0.5)]">_</span>
          </div>

          <div className="flex gap-1 md:gap-6 overflow-x-auto max-w-[62vw] md:max-w-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              "Home",
              "About",
              "Projects",
              "Research",
              "Skills",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative shrink-0 px-2 md:px-3 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors group font-mono"
              >
                {item}
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16"
      >
        <NeuralNetworkBackground />
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[22%] right-[22%] w-64 h-64 bg-rose-500/15 rounded-full blur-[110px]"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-[100px] -z-10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            Available for AI & ML Roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black tracking-[0.02em] leading-[0.9] font-orbitron uppercase"
          >
            <GlitchText 
              text="NAVANEETH A D" 
              className="bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent"
            />
          </motion.h1>

          <div className="h-12 mt-6 mb-8 flex justify-center items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-base sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-orbitron tracking-[0.12em] uppercase"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Architecting intelligent systems that bridge the gap between{" "}
            <span className="text-gray-200 font-semibold">Research</span> and{" "}
            <span className="text-gray-200 font-semibold">Production</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
          >
            <MagneticWrapper>
              <a
                href="#projects"
                data-cursor="VIEW"
                className="inline-block text-center w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                View Work
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a
                href="#contact"
                data-cursor="OPEN"
                className="inline-block text-center w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Contact Me
              </a>
            </MagneticWrapper>
          </motion.div>
        </div>
      </section>

      <SkillsMarquee />

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, rotateY: -30 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative group perspective-1000"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-[2rem] blur opacity-30 group-hover:opacity-70 transition duration-500" />
            <ThreeDCardCarousel images={galleryImages} />
          </motion.div>

          <div className="space-y-8">
            <KineticHeading
              text="Beyond the Code"
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"
            />
            <TerminalAbout />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 md:py-32 px-6 relative bg-[#080E1A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1),_transparent_50%)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <KineticHeading
            text="Professional Journey"
            className="text-4xl md:text-5xl font-bold mb-24 text-center"
          />

          <div className="hidden md:block absolute left-1/2 top-28 bottom-12 -translate-x-1/2 pointer-events-none">
            <motion.div
              className="h-full w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/70 to-cyan-300/0"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {Array.from({ length: 8 }).map((_, idx) => (
              <motion.div
                key={idx}
                className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                style={{ top: `${idx * 12}%` }}
                animate={{ y: [0, 22, 0], opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: idx * 0.12 }}
              />
            ))}
          </div>

          <div className="space-y-12">
            <ExperienceItem
              role="Python and AI Developer Intern"
              org="Innovitegra Solutions"
              duration="Dec 2025"
              points={[
                "Designed and implemented scalable backend systems using Python and Flask.",
                "Built and integrated RESTful APIs for seamless enterprise service communication.",
                "Engineered structured data pipelines ensuring clean architecture and optimized data flow.",
                "Applied modular architecture principles to improve system maintainability and reliability.",
                "Contributed to production-grade service orchestration with emphasis on performance optimization.",
              ]}
            />
            <ExperienceItem
              role="AI and ML Intern"
              org="Revino Technologies"
              duration="Oct 2025"
              points={[
                "Developed an end-to-end AI Caller System using Google Cloud Platform (GCP) and Vertex AI.",
                "Integrated Speech-to-Text (STT) and Text-to-Speech (TTS) APIs for real-time voice processing.",
                "Designed and deployed RAG (Retrieval-Augmented Generation) pipelines using FAISS.",
                "Built Flask-based microservices for call orchestration and conversation management.",
                "Optimized latency, response accuracy, and voice modulation, improving system responsiveness.",
                "Implemented cloud-based AI deployment ensuring scalable and low-latency inference.",
              ]}
            />
            <ExperienceItem
              role="Machine Learning Intern"
              org="Bharat Electronics Limited"
              duration="June 2025"
              points={[
                "Developed predictive analytics models for system performance optimization.",
                "Built robust data preprocessing pipelines for structured and unstructured data.",
                "Implemented anomaly detection algorithms for performance monitoring.",
                "Designed real-time dashboards for tracking model accuracy and diagnostics.",
                "Applied signal processing + ML techniques for industrial analytics use cases.",
              ]}
            />
            <ExperienceItem
              role="Summer Research Intern"
              org="IIT Kanpur"
              duration="May 2025"
              points={[
                "Conducted research in Generative AI and Transformer architectures.",
                "Fine-tuned large language models (LLMs) for cognitive computing applications.",
                "Evaluated model robustness using structured benchmarking strategies.",
                "Designed curated datasets to improve model generalization and output reliability.",
                "Contributed to research-grade experimentation pipelines.",
              ]}
            />
            <ExperienceItem
              role="President"
              org="HARVEST Club, Presidency University"
              duration="Aug 2024"
              points={[
                "Leading the university's AI & AgriTech innovation community.",
                "Managing a core team of organizers, technical leads, and volunteers.",
                "Organized AI workshops, research sessions, and hackathons.",
                "Mentored students on Machine Learning, Generative AI, and research paper development.",
                "Initiated collaborations to promote innovation-driven ecosystem building.",
                "Oversaw event strategy, sponsorship coordination, and execution planning.",
                "Strengthened student engagement in AI research and applied projects.",
              ]}
            />
            <ExperienceItem
              role="Head Organizer"
              org="NEXOVATE'25 National Hackathon"
              duration="Oct 2025"
              points={[
                "Directed end-to-end execution of a 24-hour National-Level Hackathon.",
                "Coordinated industry mentors, judging panels, and evaluation workflows.",
                "Managed event logistics, sponsorship communication, and participant engagement.",
                "Designed structured problem statements aligned with AI & emerging technologies.",
                "Supervised real-time event operations ensuring seamless execution.",
                "Led cross-functional coordination between technical, operations, and outreach team.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <KineticHeading
            text="Featured Projects"
            className="text-4xl md:text-5xl font-bold mb-24 text-center"
          />

          <ProjectDomain
            title="Generative AI & Intelligent Systems"
            projects={[
              {
                name: "AI Caller: Voice-Based Intelligent Calling System (Oct 2025)",
                desc: "Built a fully automated AI-powered voice assistant.",
                impact: [
                  "Integrated GCP STT/TTS + Vertex AI LLMs.",
                  "Designed RAG-based conversational intelligence.",
                  "Implemented low-latency Flask APIs.",
                  "Optimized conversational flow for natural Indian-accent voice delivery.",
                  "Reduced inference delay through cloud-based AI optimization.",
                ],
                tags: ["GCP", "Vertex AI", "RAG", "Flask"],
              },
              {
                name: "Multilingual Railway Announcement System (AI/ML) (Nov 2025)",
                desc: "Built AI-powered speech synthesis system.",
                impact: [
                  "Implemented Language Detection + NLP preprocessing.",
                  "Supported multiple Indian regional languages.",
                  "Automated real-time announcement generation.",
                ],
                tags: ["Speech", "NLP", "Language AI", "Real-Time"],
              },
              {
                name: "NeuroNova: Generative AI for Adaptive Cognitive Learning (June 2025)",
                desc: "Developed a Flask-based AI smart portal.",
                impact: [
                  "Integrated Facial Emotion Recognition (OpenCV + CNN models).",
                  "Connected Cohere API-powered AI chatbot.",
                  "Implemented real-time mood-based personalization engine.",
                  "Designed session-based backend with scalable architecture.",
                  "Deployed intelligent learning recommendations using AI-driven insights.",
                ],
                tags: ["Flask", "OpenCV", "CNN", "Cohere API"],
              },
              {
                name: "MoodSync: AI-Powered Emotion and Chat System (Feb 2025)",
                desc: "Built facial emotion detection model using CNN + OpenCV.",
                impact: [
                  "Integrated LLM API for empathetic conversational response.",
                  "Designed a real-time AI-human interaction pipeline.",
                  "Enabled dynamic emotional state-based chatbot responses.",
                ],
                tags: ["CNN", "OpenCV", "LLM API", "Emotion AI"],
              },
            ]}
          />

          <ProjectDomain
            title="Enterprise & Systems Engineering"
            projects={[
              {
                name: "Enterprise Service Bus (ESB) - Backend Integration Platform (Jan 2026)",
                desc: "Architected a Flask-based Enterprise Service Bus (ESB) for enterprise system integration.",
                impact: [
                  "Implemented message routing, transformation, and validation layers.",
                  "Supported JSON, XML, ISO 8583, ISO20020 financial message formats.",
                  "Designed canonical data modelling architecture.",
                  "Built protocol adapters and HEX encoding/decoding modules.",
                  "Enabled scalable microservice communication across distributed systems.",
                ],
                tags: ["Flask", "ESB", "ISO 8583", "Microservices"],
              },
            ]}
          />

          <ProjectDomain
            title="Applied Machine Learning & Research"
            projects={[
              {
                name: "Data-Driven Rotor Blade Count Prediction - BEL (June 2025)",
                desc: "Developed MATLAB-based ML model.",
                impact: [
                  "Applied signal processing + vibration pattern analysis.",
                  "Built classification models for rotor blade diagnostics.",
                  "Improved predictive accuracy for hardware monitoring systems.",
                ],
                tags: ["MATLAB", "Signal Processing", "ML"],
              },
              {
                name: "Heart Disease Risk Prediction and Visualization (Nov 2024)",
                desc: "Developed a Supervised Machine Learning pipeline using the Framingham Heart Study dataset.",
                impact: [
                  "Performed feature engineering, data preprocessing, and outlier handling.",
                  "Trained and compared multiple ML classifiers (Logistic Regression, Random Forest, SVM).",
                  "Evaluated performance using Accuracy, Precision, Recall, F1-Score, ROC-AUC.",
                  "Built interactive data visualization dashboards for risk factor interpretation.",
                  "Improved model interpretability using structured analysis of medical predictors.",
                ],
                tags: ["Supervised ML", "Framingham", "ROC-AUC", "Visualization"],
              },
              {
                name: "IoT-Enabled Wearable Sensing Device for Miner Safety (May 2024)",
                desc: "Designed an IoT-based real-time health and environmental monitoring system.",
                impact: [
                  "Integrated multi-sensor modules (gas detection, temperature, pulse monitoring).",
                  "Implemented real-time data transmission and alert mechanisms.",
                  "Built safety threshold detection using embedded systems + data analytics.",
                  "Developed a prototype for industrial hazard prevention.",
                  "Presented at an International Springer Conference.",
                ],
                tags: ["IoT", "Embedded Systems", "Safety Analytics"],
              },
              {
                name: "Analyzing Clustering Algorithms for Non-Linear Data (Dec 2024)",
                desc: "Conducted comparative analysis of K-Means, DBSCAN, and Hierarchical Clustering.",
                impact: [
                  "Evaluated robustness on non-linear synthetic and real-world datasets.",
                  "Used performance metrics: Silhouette Score, Adjusted Rand Index (ARI), Calinski-Harabasz Index.",
                  "Analyzed algorithm scalability and noise handling capability.",
                  "Published findings at an International SCITE Conference (SCOPUS Indexed).",
                ],
                tags: ["K-Means", "DBSCAN", "Hierarchical", "SCITE"],
              },
            ]}
          />
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-24 md:py-32 px-6 bg-[#080E1A] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <KineticHeading
            text="Research & Publications"
            className="text-4xl md:text-5xl font-bold mb-20 text-center"
          />

          <div className="grid gap-8">
            {[
              {
                title: "Analyzing Clustering Algorithms for Non-Linear Data",
                venue: "SCITE Press - Indexed Conference",
                desc: "Evaluated robustness and scalability of K-Means, DBSCAN, and Hierarchical clustering using synthetic and non-linear datasets.",
              },
              {
                title: "IoT-Enabled Wearable Sensing Device for Miner Safety",
                venue: "Springer Conference Publication",
                desc: "Designed an IoT-based wearable monitoring system for real-time miner health and environmental safety tracking.",
              },
              {
                title:
                  "A Real-Time Multilingual Translation System for Railway Stations: Integrating Speech Recognition, Neural Translation, and Generative AI",
                venue: "ICRAI 2025 - International Conference on Robotics & Artificial Intelligence",
                desc: "Proposed and implemented a real-time multilingual translation architecture for railway stations integrating speech recognition, neural machine translation, and generative AI refinement. Survey analysis related to system deployment and public infrastructure adaptation published in JIMS Journal.",
              },
            ].map((paper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
              <SpotlightCard className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-gray-100">
                    {paper.title}
                  </h3>
                  <span className="px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium whitespace-nowrap">
                    {paper.venue}
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">{paper.desc}</p>
              </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.a
              href="https://scholar.google.com/citations?hl=en&user=6wfvTSUAAAAJ"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white font-semibold"
            >
              <span>View Google Scholar</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <KineticHeading
            text="Certifications"
            className="text-4xl md:text-5xl font-bold mb-20 text-center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
            {[
              "LLM - IIT Madras",
              "Generative AI - IIT Kanpur",
              "Deep Learning - IIT Ropar",
              "Data Analytics - NPTEL",
              "NLP - NPTEL",
              "Machine Learning - NPTEL",
              "AI Search Methods - NPTEL",
              "Python Data Science - NPTEL",
              "Ethical Hacking - INBOX",
              "AI for India 2.0 - GUVI",
            ].map((cert, index) => (
              <ThreeDTiltCard key={index} className="h-full">
                 <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 h-full flex items-center gap-4 group hover:border-cyan-500/50 transition-colors shadow-xl relative overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
                   <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div
                     className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.2)] relative z-10"
                     style={{ transform: "translateZ(20px)" }}
                   >
                     <span className="w-2.5 h-2.5 rounded-full bg-cyan-300/90 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
                   </div>
                   <div className="flex flex-col relative z-10" style={{ transform: "translateZ(10px)" }}>
                     <span className="text-gray-200 font-semibold text-base tracking-wide group-hover:text-cyan-300 transition-colors">
                       {cert.split(" - ")[0]}
                     </span>
                     <span className="text-gray-500 text-sm font-mono">
                       {cert.split(" - ")[1]}
                     </span>
                   </div>
                 </div>
              </ThreeDTiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 md:py-32 bg-[#0B1120]">
        <div className="max-w-6xl mx-auto px-6">
          <KineticHeading
            text="Achievements & Recognition"
            className="text-4xl md:text-5xl font-bold mb-20 text-center"
          />

          <div className="grid md:grid-cols-3 gap-16 mb-28">
            <StatItem number="4+" label="International Publications" />
            <StatItem number="3+" label="AI Internships" />
            <StatItem number="10+" label="AI Certifications" />
          </div>

          <div className="space-y-12 md:space-y-16 border-l border-blue-500/20 pl-6 md:pl-10">
            <AchievementLine
              title="Springer Conference Publication"
              desc="IoT-Enabled Wearable Sensing Device for Miner Safety presented and published at international conference."
            />
            <AchievementLine
              title="ICRAI 2025 - Railway AI System"
              desc="Presented 'A Real-Time Multilingual Translation System for Railway Stations' integrating speech recognition and generative AI. Survey findings published in JIMS Journal."
            />
            <AchievementLine
              title="NPTEL Domain Scholar - IIT Madras"
              desc="Recognized for excellence in AI, ML, and Deep Learning certification tracks."
            />
            <AchievementLine
              title="2nd Place - Smart India Hackathon (Internal)"
              desc="Developed AI-driven system solution under national innovation challenge."
            />
            <AchievementLine
              title="Top 100 - Innovation Expo"
              desc="Air Quality Monitoring project selected among top innovation entries."
            />
            <AchievementLine
              title="NCC 'C' Certificate"
              desc="Certified under National Cadet Corps demonstrating leadership and discipline."
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050A14] to-[#050A14] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <KineticHeading
            text="Technical Arsenal"
            className="text-4xl md:text-5xl font-bold mb-20 text-center bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
          />

          <div className="mb-14">
            <ThreeDGraphCard />
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                title: "Generative AI",
                skills: ["LLMs", "RAG", "FAISS", "Prompt Eng.", "OpenRouter API", "Model Guardrails"],
                color: "from-purple-500 to-indigo-500",
                icon: "AI",
                desc: "Architecting next-gen AI systems with state-of-the-art language models."
              },
              {
                title: "Machine Learning",
                skills: ["Deep Learning", "NLP", "Computer Vision", "Evaluation", "Transformers", "Feature Engineering"],
                color: "from-blue-500 to-cyan-500",
                icon: "ML",
                desc: "Building predictive models and intelligent agents for complex data patterns."
              },
              {
                title: "Backend Systems",
                skills: ["Flask", "REST APIs", "PostgreSQL", "System Design", "API Routing", "Service Orchestration"],
                color: "from-emerald-500 to-teal-500",
                icon: "SYS",
                desc: "Engineering robust, scalable, and high-performance server-side architectures."
              },
              {
                title: "Cloud, Frontend & DevOps",
                skills: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GCP", "Vertex AI", "Vercel", "GitHub"],
                color: "from-orange-500 to-red-500",
                icon: "CLD",
                desc: "Building polished AI-first interfaces and deploying production-ready systems on modern cloud tooling."
              },
            ].map((domain, index) => (
              <HoloSkillCard key={index} domain={domain} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1),_transparent_70%)]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
            Let&apos;s Collaborate
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            I&apos;m currently open to opportunities in AI Engineering and Research. 
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>

          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=navaneeth.ad04@gmail.com"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-5 rounded-full bg-white text-black font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-shadow"
          >
            Say Hello
          </motion.a>
        </motion.div>
      </section>

      <footer className="py-8 border-t border-white/5 bg-[#050A14]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Navaneeth A D. Built with Next.js & Framer Motion.
          </div>

          <div className="flex gap-8">
            {[
              {
                name: "LinkedIn",
                url: "https://linkedin.com/in/navaneethad",
                icon: Linkedin,
              },
              {
                name: "Mail",
                url: "https://mail.google.com/mail/?view=cm&fs=1&to=navaneeth.ad04@gmail.com",
                icon: Mail,
              },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <link.icon className="w-4 h-4" aria-hidden="true" />
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </footer>
      <ChatDemo />
    </main>
  );
}

// --- Components ---

function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let scrambleTimer: ReturnType<typeof setInterval> | null = null;

    const runGlitch = () => {
      let step = 0;
      scrambleTimer = setInterval(() => {
        step += 1;
        setDisplayText(
          text
            .split("")
            .map((ch, idx) => {
              if (ch === " ") return " ";
              if (idx < step) return ch;
              return glyphs[Math.floor(Math.random() * glyphs.length)];
            })
            .join(""),
        );

        if (step >= text.length) {
          if (scrambleTimer) clearInterval(scrambleTimer);
          setDisplayText(text);
        }
      }, 36);
    };

    runGlitch();
    const cycleTimer = setInterval(runGlitch, 4500);

    return () => {
      clearInterval(cycleTimer);
      if (scrambleTimer) clearInterval(scrambleTimer);
    };
  }, [text]);

  return (
    <div className="relative inline-block group cursor-default">
      <span className={`relative z-10 inline-block ${className}`}>{displayText}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all duration-100 select-none pointer-events-none mix-blend-screen">
        {displayText}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[3px] group-hover:-translate-y-[3px] transition-all duration-100 select-none pointer-events-none mix-blend-screen">
        {displayText}
      </span>
    </div>
  );
}

function KineticHeading({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.02,
          },
        },
      }}
      className={className}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={{
            hidden: { y: 26, opacity: 0, rotateX: -45 },
            visible: { y: 0, opacity: 1, rotateX: 0 },
          }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>
  );
}

function TerminalAbout() {
  const lines = [
    "$ whoami",
    "Navaneeth A D | AI & ML Engineer",
    "$ education",
    "B.Tech CSE (AI & ML), Presidency University Bengaluru | Graduating 2026",
    "$ focus --current",
    "Generative AI, RAG systems, and production-grade backend orchestration.",
    "$ mission",
    "Turning research ideas into reliable, deployable intelligent systems.",
  ];
  const [visible, setVisible] = useState(0);
  const [started, setStarted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    if (terminalRef.current) observer.observe(terminalRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (visible === 0) {
      const kick = setTimeout(() => setVisible(1), 180);
      return () => clearTimeout(kick);
    }
    if (visible >= lines.length) return;
    const timer = setTimeout(() => setVisible((prev) => prev + 1), 420);
    return () => clearTimeout(timer);
  }, [started, visible, lines.length]);

  return (
    <motion.div
      ref={terminalRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-2xl border border-emerald-500/25 bg-[#050B12] shadow-[0_0_20px_rgba(16,185,129,0.18)] overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-emerald-500/10 border-b border-emerald-500/20">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
        <span className="ml-3 text-emerald-200/80 text-xs font-mono">terminal://navaneeth.ai</span>
      </div>
      <div className="p-6 space-y-2 font-mono text-sm md:text-base">
        {lines.slice(0, visible).map((line, idx) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className={idx % 2 === 0 ? "text-emerald-300" : "text-gray-300"}
          >
            {line}
          </motion.p>
        ))}
        {started && visible < lines.length && (
          <span className="inline-block w-2 h-4 bg-emerald-300 animate-pulse align-middle" />
        )}
      </div>
    </motion.div>
  );
}

function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const pointer = { x: -9999, y: -9999 };
    const nodes = Array.from({ length: 34 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0018,
      vy: (Math.random() - 0.5) * 0.0018,
    }));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const ax = nodes[i].x * w;
          const ay = nodes[i].y * h;
          const bx = nodes[j].x * w;
          const by = nodes[j].y * h;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < 160) {
            ctx.strokeStyle = `rgba(34,211,238,${0.12 - d / 1800})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const x = n.x * w;
        const y = n.y * h;
        const near = Math.hypot(pointer.x - x, pointer.y - y) < 110;
        ctx.fillStyle = near ? "rgba(59,130,246,0.95)" : "rgba(34,211,238,0.75)";
        ctx.beginPath();
        ctx.arc(x, y, near ? 2.8 : 2, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-45 pointer-events-none" />;
}

function MagneticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 280, damping: 24 });
  const ry = useSpring(y, { stiffness: 280, damping: 24 });
  const [locked, setLocked] = useState(false);
  const [label, setLabel] = useState("SCAN");
  const accent = "#98FF98";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer:fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest<HTMLElement>(
        "[data-cursor],a,button,[role='button'],input,textarea,select",
      );
      if (interactive) {
        setLocked(true);
        setLabel(interactive.getAttribute("data-cursor") || "LOCK");
      } else {
        setLocked(false);
        setLabel("SCAN");
      }
    };
    const onLeaveWindow = () => {
      setLocked(false);
      setLabel("SCAN");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onLeaveWindow);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onLeaveWindow);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="magnetic-cursor fixed top-0 left-0 z-[150] pointer-events-none w-2.5 h-2.5 rounded-full mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{ x, y, backgroundColor: accent, boxShadow: `0 0 14px ${accent}` }}
        animate={{ scale: locked ? 1.15 : 1, opacity: locked ? 1 : 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      <motion.div
        className="magnetic-cursor fixed top-0 left-0 z-[149] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ x: rx, y: ry }}
        animate={{ scale: locked ? 0.9 : 1, opacity: locked ? 1 : 0.85 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="relative w-16 h-16">
          <motion.span
            className="absolute w-4 h-4 border-t border-l"
            style={{ borderColor: accent }}
            animate={{ top: locked ? 9 : 0, left: locked ? 9 : 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          />
          <motion.span
            className="absolute w-4 h-4 border-t border-r"
            style={{ borderColor: accent }}
            animate={{ top: locked ? 9 : 0, right: locked ? 9 : 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          />
          <motion.span
            className="absolute w-4 h-4 border-b border-l"
            style={{ borderColor: accent }}
            animate={{ bottom: locked ? 9 : 0, left: locked ? 9 : 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          />
          <motion.span
            className="absolute w-4 h-4 border-b border-r"
            style={{ borderColor: accent }}
            animate={{ bottom: locked ? 9 : 0, right: locked ? 9 : 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          />

          <motion.span
            className="absolute left-2 right-2 h-px"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 10px ${accent}`,
            }}
            animate={{ y: locked ? [8, 40, 8] : [28, 28] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />

          <motion.span
            className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full border -translate-x-1/2 -translate-y-1/2"
            style={{ borderColor: `${accent}66` }}
            animate={{ scale: locked ? [1, 1.12, 1] : [1, 1.06, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.18em] font-mono whitespace-nowrap"
            style={{ color: accent }}
          >
            {label}
          </div>
        </div>
      </motion.div>
    </>
  );
}

function HoloSkillCard({
  domain,
  index,
}: {
  domain: {
    title: string;
    skills: string[];
    color: string;
    icon: string;
    desc: string;
  };
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const previewSkills = domain.skills.slice(0, 3);
  const moreCount = Math.max(domain.skills.length - previewSkills.length, 0);
  const useCasesByDomain: Record<string, string[]> = {
    "Generative AI": [
      "RAG pipeline design and retrieval optimization",
      "LLM prompt workflows for production assistants",
      "Knowledge-grounded response architecture",
    ],
    "Machine Learning": [
      "Model experimentation and evaluation pipelines",
      "Computer vision and NLP feature engineering",
      "Metrics-driven deployment readiness checks",
    ],
    "Backend Systems": [
      "Flask microservices and API orchestration",
      "Scalable message routing and service contracts",
      "Performance-focused data and request flows",
    ],
    "Cloud & DevOps": [
      "GCP-native AI service integration",
      "Deployment workflows and CI/CD automation",
      "Runtime monitoring and reliability controls",
    ],
  };
  const useCases = useCasesByDomain[domain.title] ?? [
    "Production-focused engineering execution",
    "Pragmatic architecture and deployment",
    "Reliable and scalable delivery",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="h-72 [perspective:1200px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((prev) => !prev)}
      data-cursor="VIEW"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 rounded-3xl border border-white/10 bg-[#0B1120] p-6 overflow-hidden [backface-visibility:hidden]">
          <div className="absolute inset-0 opacity-20 bg-[conic-gradient(from_110deg,rgba(34,211,238,0.35),rgba(59,130,246,0.15),rgba(167,139,250,0.3),rgba(34,211,238,0.35))] animate-[spin_8s_linear_infinite]" />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-5">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${domain.color} p-0.5`}>
                <div className="w-full h-full rounded-[14px] bg-[#0B1120] flex items-center justify-center text-xs md:text-sm font-bold tracking-[0.08em]">
                  {domain.icon}
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-rose-400/80 mb-1 drop-shadow-[0_0_8px_rgba(251,113,133,0.35)]">Domain</p>
                <h3 className="text-xl md:text-2xl font-bold text-rose-300 drop-shadow-[0_0_10px_rgba(251,113,133,0.25)]">{domain.title}</h3>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-4 min-h-[64px]">{domain.desc}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {previewSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md text-[11px] bg-white/5 border border-white/10 text-gray-200"
                >
                  {skill}
                </span>
              ))}
              {moreCount > 0 && (
                <span className="px-2.5 py-1 rounded-md text-[11px] bg-cyan-400/10 border border-cyan-300/20 text-cyan-200">
                  +{moreCount} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-white/10 pt-3">
              <span>{domain.skills.length} tools</span>
              <span className="text-cyan-300">Tap to flip</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-3xl border border-cyan-300/25 bg-[#081022] p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <h4 className="text-rose-400 font-semibold mb-3 tracking-wide drop-shadow-[0_0_8px_rgba(251,113,133,0.35)]">Where I use this</h4>
          <ul className="space-y-2 mb-4">
            {useCases.map((item) => (
              <li key={item} className="text-xs text-gray-300 leading-relaxed flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-300 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <h5 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-2">Core Stack</h5>
          <div className="flex flex-wrap gap-2">
            {domain.skills.map((skill) => (
              <span key={skill} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-gray-200">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MagneticWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ThreeDTiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-12deg", "12deg"]);
  const lift = useTransform(y, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        y: lift,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.015 }}
      className={`relative transition-all duration-200 ease-out will-change-transform ${className}`}
    >
      <div style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}

function ThreeDCardCarousel({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[28rem] w-full perspective-1000">
      {images.map((img, index) => {
        const stackIndex = (index - active + images.length) % images.length;
        const isFront = stackIndex === 0;
        const depth = Math.min(stackIndex, 3);
        const isVisible = stackIndex <= 3;
        
        return (
          <motion.div
            key={img}
            className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden border border-white/10 bg-[#0B1120] shadow-2xl origin-bottom"
            initial={false}
            animate={{
              scale: isFront ? 1 : 1 - depth * 0.06,
              y: isFront ? 0 : depth * 22,
              x: isFront ? 0 : depth * 2,
              z: isFront ? 0 : -depth * 40,
              rotateX: isFront ? 0 : -6,
              opacity: isVisible ? (isFront ? 1 : 1 - depth * 0.08) : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            style={{
              zIndex: isFront ? images.length + 5 : images.length - depth,
              transformOrigin: "center",
              pointerEvents: isFront ? "auto" : "none",
            }}
          >
             {!imgErrors[img] ? (
               <Image
                 src={img}
                 alt="Gallery Image"
                 fill
                 className={`object-cover transition-[filter] duration-500 ${
                   isFront ? "brightness-100 saturate-110" : "brightness-90 saturate-95"
                 }`}
                 onError={() => setImgErrors((prev) => ({ ...prev, [img]: true }))}
                 priority={index === 0}
               />
             ) : (
               <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-400 p-4 text-center border border-white/10">
                 <span className="text-2xl mb-2 font-semibold tracking-wide">IMG</span>
                 <span className="text-xs font-mono break-all">Missing: public{img}</span>
               </div>
             )}
             <div
               className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent transition-opacity duration-500"
               style={{ opacity: isFront ? 0 : 0.12 + depth * 0.06 }}
             />
          </motion.div>
        );
      })}
    </div>
  );
}

function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative rounded-2xl border border-white/10 bg-[#0B1120] overflow-hidden group ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59,130,246,0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}

function ProjectDomain({
  title,
  projects,
}: {
  title: string;
  projects: {
    name: string;
    desc: string;
    publication?: string;
    impact?: string[];
    tags?: string[];
  }[];
}) {
  return (
    <div className="mb-24 last:mb-0">
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-semibold mb-10 text-rose-400 flex items-center gap-4 drop-shadow-[0_0_10px_rgba(251,113,133,0.3)]"
      >
        <span className="w-8 h-px bg-rose-400/60 shadow-[0_0_8px_rgba(251,113,133,0.45)]" />
        {title}
      </motion.h3>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            data-cursor="VIEW"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <ThreeDTiltCard className="h-full">
              <SpotlightCard className="p-8 hover:border-blue-500/30 transition-colors h-full">
                <div className="absolute -top-24 -right-20 w-44 h-44 bg-gradient-to-br from-white/15 to-transparent rotate-12 opacity-20 group-hover:opacity-45 transition-opacity pointer-events-none" />
                <h4 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-rose-400 group-hover:drop-shadow-[0_0_8px_rgba(251,113,133,0.35)] transition-all">
                  {project.name}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>
                {project.publication && (
                  <p className="text-rose-400/90 text-xs leading-relaxed mb-4 drop-shadow-[0_0_6px_rgba(251,113,133,0.25)]">
                    <span className="font-semibold text-rose-300">Publication:</span>{" "}
                    {project.publication}
                  </p>
                )}
                {project.impact && project.impact.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {project.impact.map((item) => (
                      <li key={item} className="text-gray-400 text-xs leading-relaxed flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan-300 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {project.tags && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            </ThreeDTiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ExperienceItem({
  role,
  org,
  duration,
  points,
  current = false,
}: {
  role: string;
  org: string;
  duration: string;
  points: string[];
  current?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative pl-8 md:pl-0"
    >
      <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
      
      <div className="md:flex justify-between items-start group">
        <div className="md:w-[45%] md:text-right md:pr-12 mb-2 md:mb-0">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {role}
          </h3>
          <p className="text-blue-300 font-medium mb-1">{org}</p>
          <p className="text-sm text-gray-500 font-mono">{duration}</p>
        </div>

        <div
          className={`hidden md:block absolute left-[50%] top-2 w-7 h-4 -translate-x-1/2 z-10 border-2 transition-all duration-300 ${
            current
              ? "rounded-full border-cyan-300 bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.8)]"
              : "rounded-full border-blue-500 bg-[#0B1120] group-hover:scale-110 group-hover:bg-blue-500"
          }`}
        />

        <div className="md:w-[45%] md:pl-12">
          <ul className="space-y-2">
            {points.map((point, index) => (
              <motion.li 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-400 text-sm leading-relaxed flex items-start gap-2"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                {point}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  const target = parseInt(number.replace(/\D/g, ""), 10) || 0;
  const suffix = number.replace(/[0-9]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let rafId = 0;
    const startTime = performance.now();
    const duration = 1300;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.max(1, Math.round(target * eased)));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(target);
        setFinished(true);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.08, rotate: 2 }}
      className="text-center relative"
    >
      {finished && (
        <motion.div
          className="absolute left-1/2 top-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/40"
          initial={{ scale: 0.3, opacity: 0.9 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      )}
      <motion.h3 
        className="text-5xl font-bold text-blue-400 mb-4"
        whileHover={{ scale: 1.2 }}
      >
        {count}
        {suffix}
      </motion.h3>
      <p className="text-gray-400 text-lg">{label}</p>
    </motion.div>
  );
}

function AchievementLine({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ x: 10 }}
      className="relative group cursor-default"
    >
      <motion.div 
        className="absolute -left-[46px] top-2 w-4 h-4 bg-blue-500 rounded-full"
        whileHover={{ scale: 1.5, boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)" }}
      />
      <h3 className="text-xl font-semibold mb-3 text-blue-300 group-hover:text-cyan-300 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{desc}</p>
    </motion.div>
  );
}

function CinematicLoader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + Math.max(1, Math.floor(Math.random() * 8)));
        if (next === 100) {
          clearInterval(timer);
          frame = window.setTimeout(() => setHidden(true), 420);
        }
        return next;
      });
    }, 70);

    return () => {
      clearInterval(timer);
      if (frame) clearTimeout(frame);
    };
  }, []);

  if (hidden) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.65 }}
      className="fixed inset-0 z-[200] bg-[#050A14] flex flex-col items-center justify-center gap-6"
    >
      <p className="text-5xl font-bold text-white tracking-tight">{progress}%</p>
      <div className="w-72 h-1 bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-cyan-300 to-pink-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs tracking-[0.3em] text-cyan-300/80 font-mono">INITIALIZING PORTFOLIO</p>
    </motion.div>
  );
}

function SkillsMarquee() {
  const items = [
    "GENERATIVE AI",
    "RAG PIPELINES",
    "LLM SYSTEMS",
    "FAISS SEARCH",
    "GCP + VERTEX AI",
    "ENTERPRISE BACKEND",
    "PUBLICATIONS x4",
  ];
  const repeated = [...items, ...items];

  return (
    <section className="relative z-10 -mt-10 md:-mt-14 border-y border-cyan-300/10 bg-gradient-to-r from-cyan-300/5 via-rose-400/5 to-cyan-300/5 py-6 md:py-7 overflow-hidden">
      <motion.div
        className="flex gap-14 whitespace-nowrap min-w-[260%]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, idx) => (
          <div key={`${item}-${idx}`} className="text-xs font-mono tracking-[0.25em] text-gray-300 flex items-center gap-3">
            <span>{item}</span>
            <span className={idx % 4 === 0 ? "text-rose-300/80" : "text-cyan-300/70"}>✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function ClickBurstLayer() {
  const [bursts, setBursts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    let id = 0;
    const onClick = (e: MouseEvent) => {
      const burstId = id++;
      setBursts((prev) => [...prev, { id: burstId, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== burstId));
      }, 700);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="fixed inset-0 z-[130] pointer-events-none">
      {bursts.map((burst) =>
        Array.from({ length: 14 }).map((_, idx) => {
          const angle = (Math.PI * 2 * idx) / 14;
          const distance = 35 + (idx % 4) * 14;
          return (
            <motion.span
              key={`${burst.id}-${idx}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300"
              initial={{ x: burst.x, y: burst.y, opacity: 1, scale: 1 }}
              animate={{
                x: burst.x + Math.cos(angle) * distance,
                y: burst.y + Math.sin(angle) * distance + 12,
                opacity: 0,
                scale: 0.2,
              }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />
          );
        }),
      )}
    </div>
  );
}

function ThreeDGraphCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    type SkillNode = {
      label: string;
      value: number;
      color: string;
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      r: number;
      sx: number;
      sy: number;
      sr: number;
    };

    type Packet = {
      a: number;
      b: number;
      t: number;
      speed: number;
    };

    const nodes: SkillNode[] = [
      { label: "GENERATIVE", value: 95, color: "#2fffe5", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
      { label: "RESEARCH", value: 92, color: "#38bdf8", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
      { label: "RAG", value: 90, color: "#a78bfa", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
      { label: "NLP", value: 88, color: "#f472b6", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
      { label: "BACKEND", value: 85, color: "#10b981", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
      { label: "CLOUD", value: 80, color: "#fde047", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
      { label: "CV", value: 82, color: "#fb923c", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
    ];

    const packets: Packet[] = [];
    const activeLinks: Array<{ a: number; b: number; strength: number }> = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    let lastTs = 0;
    let running = false;
    let tabVisible = typeof document === "undefined" ? true : document.visibilityState === "visible";
    let inView = true;
    let backgroundFill: CanvasGradient | null = null;
    const isMobileViewport =
      typeof window !== "undefined" &&
      (window.matchMedia("(max-width: 768px)").matches ||
        window.matchMedia("(pointer: coarse)").matches);
    const frameBudgetMs = 1000 / (isMobileViewport ? 30 : 45);
    const maxPackets = isMobileViewport ? 10 : 16;
    const glowBlurNode = isMobileViewport ? 7 : 10;
    const glowBlurPacket = isMobileViewport ? 4 : 6;
    const linkDistance = isMobileViewport ? 0.95 : 1.05;
    const packetSpawnChance = isMobileViewport ? 0.16 : 0.22;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bounds = { x: 1, y: 0.8, z: 1 };

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      backgroundFill = ctx.createRadialGradient(
        width * 0.55,
        height * 0.5,
        20,
        width * 0.55,
        height * 0.5,
        width * 0.75,
      );
      backgroundFill.addColorStop(0, "rgba(16,185,129,0.05)");
      backgroundFill.addColorStop(1, "rgba(2,6,23,0)");
    };

    const seedNodes = () => {
      nodes.forEach((n, idx) => {
        const ring = idx % 2 === 0 ? 0.65 : 0.42;
        const a = (idx / nodes.length) * Math.PI * 2;
        n.x = Math.cos(a) * ring + (Math.random() - 0.5) * 0.2;
        n.y = Math.sin(a) * ring * 0.65 + (Math.random() - 0.5) * 0.18;
        n.z = (Math.random() - 0.5) * 1.4;
        n.vx = (Math.random() - 0.5) * 0.18;
        n.vy = (Math.random() - 0.5) * 0.14;
        n.vz = (Math.random() - 0.5) * 0.16;
        n.r = 5 + (n.value - 75) * 0.22;
      });
    };

    const projectNode = (n: SkillNode) => {
      const fov = 1.9;
      const depth = (n.z + 2.2) / 3.2;
      const scale = fov / (fov + n.z + 1.2);
      n.sx = width * 0.5 + n.x * width * 0.32 * scale;
      n.sy = height * 0.53 + n.y * height * 0.55 * scale;
      n.sr = n.r * (0.72 + depth * 0.65) * scale;
      return depth;
    };

    const draw = (ts: number) => {
      if (!running) return;
      if (!tabVisible || !inView) {
        raf = requestAnimationFrame(draw);
        return;
      }
      if (!lastTs) lastTs = ts;
      if (ts - lastTs < frameBudgetMs) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const dt = Math.min(0.04, lastTs ? (ts - lastTs) / 1000 : 0.016);
      lastTs = ts;
      ctx.clearRect(0, 0, width, height);

      if (backgroundFill) ctx.fillStyle = backgroundFill;
      ctx.fillRect(0, 0, width, height);

      activeLinks.length = 0;

      nodes.forEach((n) => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.z += n.vz * dt;

        if (Math.abs(n.x) > bounds.x) {
          n.x = Math.sign(n.x) * bounds.x;
          n.vx *= -1;
        }
        if (Math.abs(n.y) > bounds.y) {
          n.y = Math.sign(n.y) * bounds.y;
          n.vy *= -1;
        }
        if (Math.abs(n.z) > bounds.z) {
          n.z = Math.sign(n.z) * bounds.z;
          n.vz *= -1;
        }

        projectNode(n);
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const d3 = Math.hypot(dx, dy, dz);
          if (d3 > linkDistance) continue;

          const strength = 1 - d3 / linkDistance;
          activeLinks.push({ a: i, b: j, strength });

          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = `rgba(45,255,229,${0.08 + strength * 0.35})`;
          ctx.lineWidth = 0.8 + strength * 1.2;
          ctx.stroke();
        }
      }

      if (!prefersReducedMotion && activeLinks.length > 0 && packets.length < maxPackets && Math.random() < packetSpawnChance) {
        const link = activeLinks[Math.floor(Math.random() * activeLinks.length)];
        packets.push({
          a: link.a,
          b: link.b,
          t: Math.random() * 0.4,
          speed: 0.35 + Math.random() * 0.55,
        });
      }

      for (let i = packets.length - 1; i >= 0; i -= 1) {
        const p = packets[i];
        const from = nodes[p.a];
        const to = nodes[p.b];
        p.t += p.speed * dt;
        if (p.t >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const x = from.sx + (to.sx - from.sx) * p.t;
        const y = from.sy + (to.sy - from.sy) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(152,255,152,0.95)";
        ctx.shadowColor = "rgba(152,255,152,0.8)";
        ctx.shadowBlur = glowBlurPacket;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      const sorted = [...nodes].sort((a, b) => a.z - b.z);
      sorted.forEach((n) => {
        const g = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, n.sr * 2.5);
        g.addColorStop(0, `${n.color}F0`);
        g.addColorStop(0.38, `${n.color}99`);
        g.addColorStop(1, `${n.color}00`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, n.sr * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.sx, n.sy, n.sr, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = glowBlurNode;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "rgba(236,253,245,0.95)";
        ctx.font = "700 11px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${n.value}%`, n.sx, n.sy - n.sr - 8);

        ctx.fillStyle = "rgba(226,232,240,0.88)";
        ctx.font = "700 10px JetBrains Mono, monospace";
        ctx.fillText(n.label, n.sx, n.sy + n.sr + 14);
      });

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => {
      tabVisible = document.visibilityState === "visible";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        inView = Boolean(entries[0]?.isIntersecting);
      },
      { threshold: 0.1 },
    );

    resize();
    seedNodes();
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    start();
    window.addEventListener("resize", resize);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-[#0A1020]/80 p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm md:text-base font-semibold text-cyan-200">Skill Constellation Map</p>
        <p className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-gray-400">3D LIVE</p>
      </div>
      <canvas ref={canvasRef} className="w-full h-[220px] md:h-[260px] rounded-xl bg-[#060B16]" />
    </div>
  );
}
