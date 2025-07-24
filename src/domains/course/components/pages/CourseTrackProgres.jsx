import CourseContentTrackBar from "../templates/CourseContentTrackBar";
import CourseContentVisualizer from "../templates/CourseContentVisualizer";

export default function CourseTrackProgres() {
  const course = {
    id: "course-1",
    name: "Web Development Basics",
    field: "Software Engineering",
    requirements: "Basic computer skills",
    time: 40,
    description:
      "Learn the foundations of building websites using HTML, CSS and JavaScript.",
    language: "English",
    category: "Development",
    subCategory: "Web",
    imgSrc: "https://example.com/web-dev.png",
    published: true,
    userId: "user-1",
    modules: [
      {
        id: "module-1",
        position: 1,
        title: "HTML Fundamentals",
        courseId: "course-1",
        lessons: [
          {
            id: "lesson-1",
            position: 1,
            moduleId: "module-1",
            title: "What is HTML?",
            description: "Introduction to HTML and its structure.",
            videoUrls: ["https://videos.example.com/html-intro"],
            resources: [
              {
                id: "resource-1",
                lessonId: "lesson-1",
                name: "HTML Cheat Sheet",
                url: "https://resources.example.com/html-cheatsheet.pdf",
              },
            ],
          },
        ],
        quizzes: [],
      },
    ],
  };

  const studentTrackProgress = {
    progress: 50,
    trackProgres: [
      {
        id: "track-lesson-1",
        enrollmentId: "enrollment-1",
        lessonId: "lesson-1",
        videoProgress: [
          {
            url: "https://videos.example.com/html-intro",
            // watchedSeconds: 120,
            completed: true,
          },
        ],
        resourcesCompleted: ["resource-1"],
        completed: true,
        completedAt: "2025-07-23T10:00:00Z",
      },
    ],
  };

  return (
    <div className="flex flex-row">
      <CourseContentVisualizer />
      <CourseContentTrackBar />
    </div>
  );
}
