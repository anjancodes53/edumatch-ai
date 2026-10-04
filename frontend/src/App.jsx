import { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "http://127.0.0.1:8000";

const interestOptions = [
  "Artificial Intelligence",
  "Machine Learning",
  "Web Development",
  "Data Science",
  "IoT",
  "Cybersecurity",
  "Cloud Computing",
  "App Development",
];

const skillOptions = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const courseTypes = [
  "Interactive",
  "Project Based",
  "Video Courses",
  "Theory Focused",
];

const durations = [
  "Short (< 4 weeks)",
  "Medium (1-3 months)",
  "Long (3+ months)",
];

const segmentInfo = [
  {
    name: "AI & Data Explorer",
    icon: "◈",
    description:
      "Learners driven by artificial intelligence, machine learning and data science.",
    accent: "cyan",
  },
  {
    name: "Digital Builder",
    icon: "⌘",
    description:
      "Practical learners focused on web, application and cloud development.",
    accent: "violet",
  },
  {
    name: "IoT & Cyber Explorer",
    icon: "◇",
    description:
      "Technology explorers interested in IoT, cybersecurity and cloud systems.",
    accent: "emerald",
  },
];

function AnalyticsCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-cyan-400/20 hover:bg-white/[0.06]">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        {title}
      </p>

      <p className="mt-3 break-words text-2xl font-bold text-white md:text-3xl">
        {value}
      </p>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function CourseCard({ course, index }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-bold text-cyan-300">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div>
            <h4 className="font-semibold leading-6 text-white">
              {course.title}
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              {course.category}
            </p>
          </div>
        </div>

        <div className="shrink-0 rounded-xl border border-yellow-400/10 bg-yellow-400/10 px-2.5 py-1.5 text-sm text-yellow-300">
          ★ {course.rating}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-blue-400/10 bg-blue-400/10 px-3 py-1 text-xs text-blue-300">
          {course.skill_level}
        </span>

        <span className="rounded-full border border-purple-400/10 bg-purple-400/10 px-3 py-1 text-xs text-purple-300">
          {course.course_type}
        </span>

        <span className="rounded-full border border-emerald-400/10 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
          {course.duration}
        </span>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">
            Recommendation Score
          </span>

          <span className="font-semibold text-cyan-300">
            {course.score}
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-900">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all"
            style={{
              width: `${Math.min(course.score, 100)}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/5 bg-black/20 p-4">
        <p className="text-xs leading-5 text-slate-300">
          <span className="font-semibold text-cyan-300">
            Why:
          </span>{" "}
          {course.reason}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-slate-600">
            Available on
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            {course.platform}
          </p>
        </div>

        <a
          href={course.platform_url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          Explore ↗
        </a>
      </div>
    </div>
  );
}

function ClusterVisualization({ analytics }) {
  if (!analytics) {
    return null;
  }

  const total = analytics.total_students || 1;

  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
          ML Segmentation
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Learner Segments
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          How the student population is distributed across
          the learner segments discovered by K-Means.
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(
          analytics.cluster_names || {}
        ).map(([name, count], index) => {
          const percentage = (
            (count / total) *
            100
          ).toFixed(1);

          return (
            <div key={name}>
              <div className="mb-2 flex items-end justify-between gap-4">
                <div>
                  <p className="font-medium text-white">
                    {name}
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    {count} students
                  </p>
                </div>

                <p className="text-sm font-semibold text-purple-300">
                  {percentage}%
                </p>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-900">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function App() {
  const [page, setPage] = useState("home");

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    skill_level: "",
    interests: [],
    course_type: "",
    duration: "",
  });

  const [result, setResult] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] =
    useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/api/analytics/summary`
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load analytics"
          );
        }

        const data = await response.json();

        setAnalytics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setAnalyticsLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleInterest = (interest) => {
    setFormData((previous) => {
      const exists =
        previous.interests.includes(interest);

      return {
        ...previous,
        interests: exists
          ? previous.interests.filter(
              (item) => item !== interest
            )
          : [
              ...previous.interests,
              interest,
            ],
      };
    });
  };

  const nextStep = () => {
    setError("");

    if (step === 1) {
      if (
        !formData.name.trim() ||
        !formData.age ||
        !formData.skill_level
      ) {
        setError(
          "Please complete all profile fields."
        );
        return;
      }
    }

    if (step === 2) {
      if (formData.interests.length === 0) {
        setError(
          "Please select at least one interest."
        );
        return;
      }
    }

    setStep((previous) =>
      Math.min(previous + 1, 3)
    );
  };

  const previousStep = () => {
    setError("");

    setStep((previous) =>
      Math.max(previous - 1, 1)
    );
  };

  const analyzeStudent = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/student/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            age: Number(formData.age),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Unable to analyze student."
        );
      }

      setResult(data);
      setPage("results");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setStep(1);
    setResult(null);
    setError("");

    setFormData({
      name: "",
      age: "",
      skill_level: "",
      interests: [],
      course_type: "",
      duration: "",
    });

    setPage("app");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const launchApp = () => {
    setPage("app");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (page === "home") {
    return (
      <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute left-1/2 top-[-300px] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
          <div className="absolute right-[-200px] top-[30%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[140px]" />
          <div className="absolute bottom-[-250px] left-[-150px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />
        </div>

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-500 font-black text-slate-950 shadow-lg shadow-cyan-500/20">
              E
            </div>

            <div className="text-left">
              <p className="font-bold tracking-tight">
                EduMatch
                <span className="text-cyan-400">
                  {" "}
                  AI
                </span>
              </p>

              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                Intelligent Learning
              </p>
            </div>
          </button>

          <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <a
              href="#how"
              className="transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="#segments"
              className="transition hover:text-white"
            >
              Segments
            </a>

            <a
              href="#technology"
              className="transition hover:text-white"
            >
              Technology
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white sm:block"
            >
              GitHub ↗
            </a>

            <button
              onClick={launchApp}
              className="rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-300"
            >
              Launch App
            </button>
          </div>
        </nav>

        {/* Hero */}
        <main className="relative z-10">
          <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400" />
                MACHINE LEARNING × PERSONALIZED EDUCATION
              </div>

              <h1 className="text-5xl font-black leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
                Learn
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  smarter.
                </span>
                <br />
                Not harder.
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
                EduMatch AI analyzes your interests,
                skill level and learning preferences,
                discovers your learner segment, and
                builds a personalized learning path.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  onClick={launchApp}
                  className="rounded-2xl bg-cyan-400 px-7 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:bg-cyan-300"
                >
                  Discover My Learning Path →
                </button>

                <a
                  href="#how"
                  className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Explore the System
                </a>
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="mx-auto mt-20 max-w-5xl">
              <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.035] p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
                <div className="rounded-[1.6rem] border border-white/5 bg-slate-900/80 p-5 md:p-7">
                  <div className="flex items-center justify-between border-b border-white/5 pb-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                        EduMatch Intelligence
                      </p>

                      <p className="mt-1 text-lg font-semibold">
                        Learning Analytics
                      </p>
                    </div>

                    <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 px-3 py-2 text-xs text-emerald-300">
                      ● System Online
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-4">
                    <AnalyticsCard
                      title="Students"
                      value={
                        analytics?.total_students ||
                        "200+"
                      }
                      subtitle="Dataset"
                    />

                    <AnalyticsCard
                      title="Segments"
                      value="03"
                      subtitle="K-Means"
                    />

                    <AnalyticsCard
                      title="Model"
                      value="0.481"
                      subtitle="Silhouette score"
                    />

                    <AnalyticsCard
                      title="Courses"
                      value="20"
                      subtitle="Recommendation pool"
                    />
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {segmentInfo.map(
                      (segment) => (
                        <div
                          key={segment.name}
                          className="rounded-2xl border border-white/5 bg-black/20 p-5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-2xl text-cyan-300">
                              {segment.icon}
                            </span>

                            <span className="text-[10px] uppercase tracking-widest text-slate-600">
                              Segment
                            </span>
                          </div>

                          <p className="mt-5 font-semibold text-white">
                            {segment.name}
                          </p>

                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            {segment.description}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section
            id="how"
            className="border-y border-white/5 bg-white/[0.015]"
          >
            <div className="mx-auto max-w-7xl px-6 py-24">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                  The Pipeline
                </p>

                <h2 className="mt-3 text-3xl font-bold md:text-5xl">
                  From student profile
                  <br />
                  to learning path.
                </h2>
              </div>

              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {[
                  {
                    number: "01",
                    title: "Build Your Profile",
                    text: "Tell the system about your skills, interests and preferred learning style.",
                  },
                  {
                    number: "02",
                    title: "ML Finds Your Segment",
                    text: "K-Means analyzes your profile and identifies the learner group that best matches you.",
                  },
                  {
                    number: "03",
                    title: "Get Your Path",
                    text: "The recommendation engine ranks courses using multiple personalization signals.",
                  },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="group rounded-3xl border border-white/10 bg-white/[0.035] p-7 transition hover:-translate-y-1 hover:border-cyan-400/20"
                  >
                    <p className="text-sm font-bold text-cyan-400">
                      {item.number}
                    </p>

                    <h3 className="mt-12 text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Segments */}
          <section
            id="segments"
            className="mx-auto max-w-7xl px-6 py-24"
          >
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
                Learner Intelligence
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-5xl">
                Three ways to learn.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500">
                The model discovers patterns in student
                behavior and groups learners into meaningful
                educational profiles.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {segmentInfo.map(
                (segment, index) => (
                  <div
                    key={segment.name}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7"
                  >
                    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl" />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/5 text-xl text-cyan-300">
                          {segment.icon}
                        </div>

                        <span className="text-xs font-bold text-slate-700">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="mt-12 text-xl font-bold">
                        {segment.name}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {segment.description}
                      </p>

                      <div className="mt-7 h-px bg-white/5" />

                      <p className="mt-5 text-xs text-slate-600">
                        DISCOVERED USING K-MEANS CLUSTERING
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Technology */}
          <section
            id="technology"
            className="border-y border-white/5 bg-white/[0.015]"
          >
            <div className="mx-auto max-w-7xl px-6 py-24">
              <div className="grid gap-14 md:grid-cols-2 md:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                    Built With
                  </p>

                  <h2 className="mt-3 text-3xl font-bold md:text-5xl">
                    Full-stack.
                    <br />
                    ML-powered.
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">
                    A complete machine-learning application
                    connecting a modern React interface to a
                    Python backend and a personalized
                    recommendation engine.
                  </p>

                  <button
                    onClick={launchApp}
                    className="mt-8 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
                  >
                    Try the System →
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["React", "Frontend"],
                    ["Vite", "Build Tool"],
                    ["FastAPI", "Backend"],
                    ["Python", "Core"],
                    ["Scikit-learn", "Machine Learning"],
                    ["K-Means", "Segmentation"],
                    ["SQLite", "Database"],
                    ["Pandas", "Data"],
                  ].map(([name, category]) => (
                    <div
                      key={name}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                    >
                      <p className="font-semibold text-white">
                        {name}
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        {category}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-purple-500/10 p-8 text-center md:p-16">
              <div className="absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Your learning journey starts here
                </p>

                <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black md:text-5xl">
                  Stop guessing what to learn next.
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-500">
                  Let the system analyze your profile and
                  build a personalized path around you.
                </p>

                <button
                  onClick={launchApp}
                  className="mt-8 rounded-2xl bg-cyan-400 px-7 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-500/10 transition hover:bg-cyan-300"
                >
                  Build My Learning Path →
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t border-white/5">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-center text-xs text-slate-600 md:flex-row md:items-center md:justify-between md:text-left">
            <p>
              © 2026 EduMatch AI. Built with React,
              FastAPI & Scikit-learn.
            </p>

            <p>
              Student Segmentation &
              Personalized Learning
            </p>
          </div>
        </footer>
      </div>
    );
  }

  if (page === "results" && result) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute left-1/2 top-[-300px] h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-8 md:py-10">
          <header className="flex flex-col justify-between gap-5 border-b border-white/5 pb-7 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPage("home")}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300 transition hover:bg-white/10"
              >
                E
              </button>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  EduMatch AI
                </p>

                <h1 className="mt-1 text-2xl font-bold md:text-3xl">
                  Your Learning Intelligence
                </h1>
              </div>
            </div>

            <button
              onClick={resetApp}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Analyze Another Student
            </button>
          </header>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <AnalyticsCard
              title="Student"
              value={result.student.name}
              subtitle="Current profile"
            />

            <AnalyticsCard
              title="Age"
              value={result.student.age}
              subtitle="Student age"
            />

            <AnalyticsCard
              title="Skill"
              value={result.student.skill_level}
              subtitle="Current proficiency"
            />

            <AnalyticsCard
              title="Courses"
              value={result.recommendations.length}
              subtitle="Personalized matches"
            />
          </div>

          <section className="mt-8 overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-purple-500/10 p-7 md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Your Learner Segment
            </p>

            <div className="mt-5 flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-black md:text-4xl">
                  {result.segment}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Your profile has been analyzed using
                  machine-learning based student
                  segmentation.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                  Your interests
                </p>

                <div className="mt-3 flex max-w-md flex-wrap gap-2">
                  {result.student.interests.map(
                    (interest) => (
                      <span
                        key={interest}
                        className="rounded-full border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5 text-xs text-cyan-300"
                      >
                        {interest}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          {!analyticsLoading && analytics && (
            <>
              <ClusterVisualization
                analytics={analytics}
              />

              <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                    Population Intelligence
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Student Dataset
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    A quick view of the dataset powering
                    the segmentation system.
                  </p>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  <AnalyticsCard
                    title="Students"
                    value={analytics.total_students}
                    subtitle="Training dataset"
                  />

                  <AnalyticsCard
                    title="Average Age"
                    value={analytics.average_age}
                    subtitle="Across dataset"
                  />

                  <AnalyticsCard
                    title="Segments"
                    value={
                      Object.keys(
                        analytics.cluster_names || {}
                      ).length
                    }
                    subtitle="Discovered by K-Means"
                  />
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-white">
                    Skill Distribution
                  </h3>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {Object.entries(
                      analytics.skill_distribution || {}
                    ).map(([skill, count]) => (
                      <div
                        key={skill}
                        className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/20 p-4"
                      >
                        <span className="text-sm text-slate-400">
                          {skill}
                        </span>

                        <span className="font-semibold text-white">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          <section className="mt-10">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Personalized Recommendations
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Your Learning Path
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Courses ranked using your interests,
                skill level, learning preferences and
                learner segment.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {result.recommendations.map(
                (course, index) => (
                  <CourseCard
                    key={course.course_id}
                    course={course}
                    index={index}
                  />
                )
              )}
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-7">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
                Continue Learning
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Trusted Learning Platforms
              </h2>
            </div>

            <div className="mt-7 grid gap-3 md:grid-cols-4">
              {[
                [
                  "NPTEL",
                  "IITs & IISc learning",
                  "https://www.nptel.ac.in/courses",
                ],
                [
                  "Coursera",
                  "Universities & companies",
                  "https://www.coursera.org/browse",
                ],
                [
                  "edX",
                  "University-backed learning",
                  "https://www.edx.org/",
                ],
                [
                  "AWS Skill Builder",
                  "Cloud & AWS skills",
                  "https://skillbuilder.aws/",
                ],
              ].map(([name, description, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/5"
                >
                  <p className="font-semibold text-white">
                    {name}
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    {description}
                  </p>
                </a>
              ))}
            </div>
          </section>

          <footer className="mt-12 border-t border-white/5 py-8 text-center text-xs text-slate-700">
            EduMatch AI • Personalized Learning Intelligence
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-250px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute right-[-200px] bottom-[-100px] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8 md:py-10">
        <header className="flex items-center justify-between">
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-black text-slate-950">
              E
            </div>

            <div className="text-left">
              <p className="font-bold">
                EduMatch
                <span className="text-cyan-400">
                  {" "}
                  AI
                </span>
              </p>

              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                Learning Intelligence
              </p>
            </div>
          </button>

          <button
            onClick={() => setPage("home")}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            ← Home
          </button>
        </header>

        <main className="flex flex-1 flex-col">
          <div className="mx-auto w-full max-w-3xl pb-12 pt-16">
            <div className="text-center">
              <div className="mb-5 inline-flex rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-300">
                PERSONALIZED LEARNING ENGINE
              </div>

              <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                Build your
                <span className="text-cyan-400">
                  {" "}
                  learning path.
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                Tell us about yourself. Our machine
                learning system will identify your learner
                segment and recommend courses matched to
                your profile.
              </p>
            </div>

            <div className="mt-10 flex items-center">
              {[1, 2, 3].map((number) => (
                <div
                  key={number}
                  className="flex flex-1 items-center"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      step >= number
                        ? "bg-cyan-400 text-slate-950"
                        : "bg-white/10 text-slate-600"
                    }`}
                  >
                    {step > number
                      ? "✓"
                      : number}
                  </div>

                  {number < 3 && (
                    <div
                      className={`mx-2 h-1 flex-1 rounded-full ${
                        step > number
                          ? "bg-cyan-400"
                          : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-9">
              {step === 1 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                    Step 01
                  </p>

                  <h2 className="mt-3 text-2xl font-bold">
                    Tell us about yourself
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Basic information helps establish
                    your learner profile.
                  </p>

                  <div className="mt-8 space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Name
                      </label>

                      <input
                        type="text"
                        value={formData.name}
                        onChange={(event) =>
                          updateField(
                            "name",
                            event.target.value
                          )
                        }
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/50"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Age
                      </label>

                      <input
                        type="number"
                        min="13"
                        max="100"
                        value={formData.age}
                        onChange={(event) =>
                          updateField(
                            "age",
                            event.target.value
                          )
                        }
                        placeholder="Enter your age"
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/50"
                      />
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-slate-300">
                        Skill Level
                      </label>

                      <div className="grid gap-3 md:grid-cols-3">
                        {skillOptions.map(
                          (skill) => (
                            <button
                              key={skill}
                              onClick={() =>
                                updateField(
                                  "skill_level",
                                  skill
                                )
                              }
                              className={`rounded-xl border p-4 text-sm font-medium transition ${
                                formData.skill_level ===
                                skill
                                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                  : "border-white/10 bg-black/20 text-slate-400 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              {skill}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                    Step 02
                  </p>

                  <h2 className="mt-3 text-2xl font-bold">
                    What are you interested in?
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Select the areas you want to explore.
                  </p>

                  <div className="mt-8 grid gap-3 md:grid-cols-2">
                    {interestOptions.map(
                      (interest) => {
                        const selected =
                          formData.interests.includes(
                            interest
                          );

                        return (
                          <button
                            key={interest}
                            onClick={() =>
                              toggleInterest(
                                interest
                              )
                            }
                            className={`rounded-xl border p-4 text-left transition ${
                              selected
                                ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                : "border-white/10 bg-black/20 text-slate-400 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {interest}
                              </span>

                              {selected && (
                                <span className="text-cyan-300">
                                  ✓
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>

                  <p className="mt-5 text-xs text-slate-600">
                    {formData.interests.length} interest
                    {formData.interests.length !== 1
                      ? "s"
                      : ""}{" "}
                    selected
                  </p>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                    Step 03
                  </p>

                  <h2 className="mt-3 text-2xl font-bold">
                    Choose your learning preferences
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    These preferences influence your
                    personalized recommendations.
                  </p>

                  <div className="mt-8 space-y-8">
                    <div>
                      <label className="mb-3 block text-sm font-medium text-slate-300">
                        Course Type
                      </label>

                      <div className="grid gap-3 md:grid-cols-2">
                        {courseTypes.map(
                          (type) => (
                            <button
                              key={type}
                              onClick={() =>
                                updateField(
                                  "course_type",
                                  type
                                )
                              }
                              className={`rounded-xl border p-4 text-left text-sm transition ${
                                formData.course_type ===
                                type
                                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                  : "border-white/10 bg-black/20 text-slate-400 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              {type}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-slate-300">
                        Preferred Duration
                      </label>

                      <div className="grid gap-3">
                        {durations.map(
                          (duration) => (
                            <button
                              key={duration}
                              onClick={() =>
                                updateField(
                                  "duration",
                                  duration
                                )
                              }
                              className={`rounded-xl border p-4 text-left text-sm transition ${
                                formData.duration ===
                                duration
                                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                  : "border-white/10 bg-black/20 text-slate-400 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              {duration}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-7 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="mt-9 flex justify-between gap-4">
                {step > 1 ? (
                  <button
                    onClick={previousStep}
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={nextStep}
                    className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    onClick={analyzeStudent}
                    disabled={loading}
                    className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading
                      ? "Analyzing..."
                      : "Analyze My Learning Path →"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className="py-8 text-center text-xs text-slate-700">
          React • FastAPI • Python • Scikit-learn
        </footer>
      </div>
    </div>
  );
}

export default App;