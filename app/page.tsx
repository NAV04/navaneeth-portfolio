"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
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
      <MagneticCursor />
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
            ? "top-4 w-fit mx-auto bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            : "w-full bg-transparent py-6 px-6 md:px-12"
        }`}
      >
        <div className="flex justify-between items-center gap-8">
          <div
            className="text-lg font-bold tracking-wider text-white"
          >
            <GlitchText text="NAVANEETH" />
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
                className="relative shrink-0 px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors group"
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
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
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
            className="text-6xl md:text-8xl font-bold tracking-tight leading-tight"
          >
            <GlitchText 
              text="NAVANEETH A D" 
              className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent"
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
                className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-medium"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Architecting intelligent systems that bridge the gap between{" "}
            <span className="text-gray-200 font-semibold">Research</span> and{" "}
            <span className="text-gray-200 font-semibold">Production</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex gap-6 justify-center"
          >
            <MagneticWrapper>
              <a
                href="#projects"
                data-cursor="VIEW"
                className="inline-block px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                View Work
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a
                href="#contact"
                data-cursor="OPEN"
                className="inline-block px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Contact Me
              </a>
            </MagneticWrapper>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
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
      <section id="experience" className="py-32 px-6 relative bg-[#080E1A]">
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
              role="Python Developer Intern"
              org="Innovitegra Solutions"
              duration="Dec 2025 - Present"
              current
              points={[
                "Designed backend services using Flask.",
                "Built structured API workflows.",
                "Implemented scalable architecture patterns.",
              ]}
            />
            <ExperienceItem
              role="AI & ML Intern"
              org="Revino Technologies"
              duration="Oct 2025"
              points={[
                "Architected an AI voice calling system using GCP STT/TTS & Vertex AI.",
                "Engineered RAG pipelines with FAISS for sub-second context retrieval.",
                "Deployed scalable Flask APIs handling concurrent real-time requests.",
              ]}
            />
            <ExperienceItem
              role="Machine Learning Intern"
              org="Bharat Electronics Limited"
              duration="June 2025"
              points={[
                "Developed predictive maintenance models for defense radar systems.",
                "Implemented anomaly detection algorithms reducing false positives by 40%.",
                "Designed real-time dashboards for model inference monitoring.",
              ]}
            />
            <ExperienceItem
              role="Summer Research Intern"
              org="IIT Kanpur"
              duration="May 2025"
              points={[
                "Researched transformer attention mechanisms for low-resource languages.",
                "Fine-tuned LLMs achieving state-of-the-art results on internal benchmarks.",
                "Published findings on efficient model quantization techniques.",
              ]}
            />
            <ExperienceItem
              role="President"
              org="HARVEST Club"
              duration="2024 - Present"
              points={[
                "Led AI & AgriTech innovation initiatives.",
                "Organized national-level hackathons.",
                "Mentored AI/ML student teams.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <KineticHeading
            text="Featured Projects"
            className="text-4xl md:text-5xl font-bold mb-24 text-center"
          />

          <ProjectDomain
            title="Generative AI & Intelligent Systems"
            projects={[
              {
                name: "AI Caller System",
                desc: "Built an end-to-end AI-driven automated calling system integrating GCP Speech-to-Text, Text-to-Speech, and Vertex AI. Implemented Retrieval-Augmented Generation (RAG) using FAISS vector search for stronger contextual responses, and designed scalable Flask APIs for real-time orchestration with optimized latency for production readiness.",
                tags: ["GCP", "Vertex AI", "FAISS", "Python"],
              },
              {
                name: "NeuroNova",
                desc: "Developed a Flask-based intelligent learning platform integrating facial mood detection and generative AI conversational modules. Implemented adaptive UI behavior based on predicted emotional state and built modular backend pipelines for secure sessions and real-time inference.",
                tags: ["NLP", "React", "TensorFlow"],
              },
              {
                name: "MoodSync",
                desc: "Designed a real-time facial emotion recognition system using deep learning and OpenCV. Integrated generative AI APIs to deliver context-aware empathetic responses based on detected mood and optimized preprocessing/inference flow for prediction consistency.",
                tags: ["Computer Vision", "OpenCV", "Flask"],
              },
              {
                name: "Multilingual Railway Announcement System",
                desc: "Designed and implemented a real-time multilingual announcement system for railway stations integrating speech recognition, neural machine translation, and generative AI-based contextual refinement. The system processes live audio inputs, performs language detection, and generates accurate region-specific announcements across multiple Indian languages with focus on low latency and intelligibility.",
                publication:
                  "Presented at ICRAI 2025 (International Conference on Robotics & Artificial Intelligence). Related deployment survey findings were published in JIMS Journal.",
                impact: [
                  "Improved railway passenger accessibility through multi-language announcement support.",
                  "Validated architecture for real-time public transport infrastructure usage.",
                  "Connected research-grade language AI methods to operational engineering constraints.",
                ],
                tags: ["TTS", "ASR", "Language AI", "Public Transport"],
              },
            ]}
          />

          <ProjectDomain
            title="Enterprise & Systems Engineering"
            projects={[
              {
                name: "Enterprise Service Bus (ESB)",
                desc: "Architected a backend integration platform for routing, validation, and transformation of enterprise messages. Implemented canonical data modeling across JSON, XML, and ISO 8583 with modular protocol adapters and HEX encoding pipelines for scalable financial-grade service orchestration.",
                tags: ["Flask", "PostgreSQL", "ISO 8583", "System Design"],
              },
            ]}
          />

          <ProjectDomain
            title="Applied Machine Learning & Research"
            projects={[
              {
                name: "Rotor Blade Count Prediction",
                desc: "Developed a vibration signal-based classification system for helicopter rotor diagnostics using MATLAB and machine learning models. Applied feature extraction and comparative classifier evaluation to improve prediction reliability in defense-oriented scenarios.",
                tags: ["Signal Processing", "Scikit-learn"],
              },
              {
                name: "Heart Disease Risk Prediction",
                desc: "Built a supervised machine learning system on the Framingham dataset to predict coronary heart disease risk. Implemented feature engineering, visualization, and model evaluation workflows to improve predictive performance.",
                tags: ["Classification", "Pandas", "Seaborn"],
              },
              {
                name: "Miner Safety Wearable",
                desc: "Designed an IoT-enabled wearable monitoring system integrating environmental sensors and physiological tracking for hazardous mining environments. Implemented real-time monitoring and alert flow; work was presented and published via a Springer conference venue.",
                tags: ["IoT", "Embedded C", "Sensors"],
              },
              {
                name: "Clustering Analysis",
                desc: "Conducted comparative evaluation of K-Means, DBSCAN, and Hierarchical clustering on synthetic and non-linear datasets. Assessed robustness, scalability, and cluster validation metrics including Silhouette Score and Adjusted Rand Index.",
                tags: ["Unsupervised Learning", "Research"],
              },
            ]}
          />
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-32 px-6 bg-[#080E1A] relative overflow-hidden">
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
      <section id="certifications" className="py-32 px-6">
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
      <section id="achievements" className="py-32 bg-[#0B1120]">
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

          <div className="space-y-16 border-l border-blue-500/20 pl-10">
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
      <section id="skills" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050A14] to-[#050A14] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <KineticHeading
            text="Technical Arsenal"
            className="text-4xl md:text-5xl font-bold mb-20 text-center bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
          />

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                title: "Generative AI",
                skills: ["LLMs", "RAG", "FAISS", "Prompt Eng.", "Fine-tuning"],
                color: "from-purple-500 to-indigo-500",
                icon: "AI",
                desc: "Architecting next-gen AI systems with state-of-the-art language models."
              },
              {
                title: "Machine Learning",
                skills: ["Deep Learning", "NLP", "Computer Vision", "Evaluation"],
                color: "from-blue-500 to-cyan-500",
                icon: "ML",
                desc: "Building predictive models and intelligent agents for complex data patterns."
              },
              {
                title: "Backend Systems",
                skills: ["Flask", "REST APIs", "PostgreSQL", "System Design"],
                color: "from-emerald-500 to-teal-500",
                icon: "SYS",
                desc: "Engineering robust, scalable, and high-performance server-side architectures."
              },
              {
                title: "Cloud & DevOps",
                skills: ["GCP", "Vertex AI", "Git", "Docker", "CI/CD"],
                color: "from-orange-500 to-red-500",
                icon: "CLD",
                desc: "Deploying and orchestrating AI solutions on enterprise-grade cloud infrastructure."
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
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
            Let&apos;s Collaborate
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            I&apos;m currently open to opportunities in AI Engineering and Research. 
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>

          <motion.a
            href="mailto:navaneeth.ad04@gmail.com"
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
              { name: "LinkedIn", url: "https://linkedin.com/in/navaneethad" },
              { name: "Email", url: "mailto:navaneeth.ad04@gmail.com" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {link.name}
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
    "$ focus --current",
    "Generative AI, RAG systems, and production-grade backend orchestration.",
    "$ mission",
    "Turning research ideas into reliable, deployable intelligent systems.",
  ];
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    if (visible >= lines.length) return;
    const timer = setTimeout(() => setVisible((prev) => prev + 1), 420);
    return () => clearTimeout(timer);
  }, [visible, lines.length]);

  return (
    <div className="rounded-2xl border border-emerald-500/25 bg-[#050B12] shadow-[0_0_20px_rgba(16,185,129,0.18)] overflow-hidden">
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
        {visible < lines.length && (
          <span className="inline-block w-2 h-4 bg-emerald-300 animate-pulse align-middle" />
        )}
      </div>
    </div>
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
  const [mode, setMode] = useState("VIEW");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 240, damping: 22 });
  const ry = useSpring(y, { stiffness: 240, damping: 22 });

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
      const cursorHint =
        target.closest("[data-cursor]")?.getAttribute("data-cursor") ??
        (target.closest("a,button") ? "OPEN" : "VIEW");
      setMode(cursorHint);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="magnetic-cursor fixed top-0 left-0 z-[150] pointer-events-none w-3 h-3 rounded-full bg-cyan-300 mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{ x, y }}
      />
      <motion.div
        className="magnetic-cursor fixed top-0 left-0 z-[149] pointer-events-none w-16 h-16 rounded-full border border-cyan-300/60 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[10px] font-semibold tracking-[0.12em] text-cyan-200/90"
        style={{ x: rx, y: ry }}
      >
        {mode}
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="h-72 [perspective:1200px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      data-cursor="VIEW"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 rounded-3xl border border-white/10 bg-[#0B1120] p-8 overflow-hidden [backface-visibility:hidden]">
          <div className="absolute inset-0 opacity-20 bg-[conic-gradient(from_110deg,rgba(34,211,238,0.35),rgba(59,130,246,0.15),rgba(167,139,250,0.3),rgba(34,211,238,0.35))] animate-[spin_8s_linear_infinite]" />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${domain.color} p-0.5`}>
                <div className="w-full h-full rounded-[14px] bg-[#0B1120] flex items-center justify-center text-xs md:text-sm font-bold tracking-[0.08em]">
                  {domain.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-right">{domain.title}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{domain.desc}</p>
          </div>
        </div>

        <div className="absolute inset-0 rounded-3xl border border-cyan-300/25 bg-[#081022] p-8 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <h4 className="text-cyan-300 font-semibold mb-4 tracking-wide">Core Stack</h4>
          <div className="flex flex-wrap gap-2">
            {domain.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-gray-200"
              >
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
        className="text-2xl font-semibold mb-10 text-blue-300 flex items-center gap-4"
      >
        <span className="w-8 h-px bg-blue-300/50" />
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
                <h4 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>
                {project.publication && (
                  <p className="text-blue-300/90 text-xs leading-relaxed mb-4">
                    <span className="font-semibold text-blue-200">Publication:</span>{" "}
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
      whileHover={{ scale: 1.08, rotate: [0, -4, 4, 0] }}
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
