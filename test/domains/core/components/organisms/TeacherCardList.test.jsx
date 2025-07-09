/* eslint-disable react/prop-types */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { TeacherCardList } from "../../../../../src/domains/core/componentes/organism/TeacherCardList";

vi.mock("../../../../../src/shared/components/atoms/TeacherCard", () => ({
  TeacherCard: ({ name, imageURL, description, rating, skills, className }) => (
    <div data-testid="teacher-card" className={className}>
      <img src={imageURL} alt="User image" />
      <p>{name}</p>
      <p>{description}</p>
      <p>{rating}</p>
      <div>
        {skills?.map((skill, i) => (
          <span key={i}>{skill}</span>
        ))}
      </div>
    </div>
  ),
}));

describe("TeacherCardList component", () => {
  const mockTeachers = [
    {
      id: "1",
      imageURL: "/teacher1.jpg",
      name: "Alice",
      description: "Expert in React",
      rating: "4.9",
      skills: ["React", "JavaScript"],
    },
    {
      id: "2",
      imageURL: "/teacher2.jpg",
      name: "Bob",
      description: "Node.js Specialist",
      rating: "4.7",
      skills: ["Node.js", "Express"],
    },
  ];

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTeachers),
      })
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches and renders teacher cards", async () => {
    render(<TeacherCardList />);

    await waitFor(() => {
      expect(screen.getAllByTestId("teacher-card")).toHaveLength(
        mockTeachers.length
      );
    });

    mockTeachers.forEach(({ name, description, rating, skills }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
      expect(screen.getByText(rating)).toBeInTheDocument();
      skills.forEach((skill) => {
        expect(screen.getByText(skill)).toBeInTheDocument();
      });
    });
  });
});
