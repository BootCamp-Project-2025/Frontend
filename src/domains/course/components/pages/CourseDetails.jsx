import { Button } from "../../../../shared/components/atoms/Button";
import { Title } from "../../../../shared/components/atoms/Title";
import { ExpandableText } from "../../../../shared/components/molecules/ExpandableText";
import { CourseDetailTeacher } from "../molecules/CourseDetailTeacher";
import { CourseModule } from "../molecules/CourseModule";
import { CourseReview } from "../molecules/CourseReview";
import { CourseBanner } from "../organisms/CourseBanner";

export const CourseDetails = () => {
  return (
    <>
      <CourseBanner></CourseBanner>
      <div className="flex flex-col w-[80rem] max-w-[100%] m-auto py-10 gap-9 ">
        <Title size="lg" color="secondary">
          Description
        </Title>
        <ExpandableText
          maxLines={4}
          text={`In 2024, React is still the #1 skill to learn if you want to become a successful front-end developer!
 But it can be hard. There are so many moving parts, so many different libraries, so many tutorials out there.
That's why you came here... And you came to the right place! This is THE ultimate React course for 2024 and beyond.
A practice-heavy approach to master React by building polished apps, backed up by diagrams, theory, and looks under the hood of React.
The all-in-one package that takes you from zero to truly In 2024, React is still the #1 skill to learn if you want to become a successful front-end developer!
 But it can be hard. There are so many moving parts, so many different libraries, so many tutorials out there.
That's why you came here... And you came to the right place! This is THE ultimate React course for 2024 and beyond.
A practice-heavy approach to master React by building polished apps, backed up by diagrams, theory, and looks under the hood of React.
The all-in-one package that takes you from zero to truly`}
        ></ExpandableText>
        <Title size="lg" color="secondary">
          Course Content
        </Title>

        <div className="flex flex-col border border-gray-400 border-b-0">
          <CourseModule
            titleModule="Welcome to the course – Introduction"
            lessons={[
              "Course overview",
              "How to get the most out of this course",
              "Setting up your environment",
              "Running your first program",
            ]}
          />

          <CourseModule
            titleModule="Module 1 – Variables and Data Types"
            lessons={[
              "What are variables?",
              "Primitive data types",
              "Declaring variables with let, const, and var",
              "Type conversion and coercion",
            ]}
          />

          <CourseModule
            titleModule="Module 2 – Control Structures"
            lessons={[
              "Conditional statements (if, else, switch)",
              "Loops (for, while, do...while)",
              "Logical operators",
              "Practical examples",
            ]}
          />

          <CourseModule
            titleModule="Module 3 – Functions"
            lessons={[
              "Defining and calling functions",
              "Function parameters and return values",
              "Arrow functions",
              "Scope and closures",
            ]}
          />
        </div>

        <Title size="lg" color="secondary">
          Instructor
        </Title>
        <CourseDetailTeacher
          name={"Jonas Schmedtmann"}
          aboutMe={
            "I’m passionate about programming in multiple languages. I’ve worked as a Premium Tutor for CódigoFacilito (the most subscribed Spanish-language programming channel in the world – 630k subscribers). I’ve also been an active member of the Platzi community and have experience as a writer for Cristalab (the largest Spanish-language tech article portal in the world). Additionally, I’ve taught courses as a tutor on various."
          }
          courses={10}
          rating={5.0}
          students={8628}
          avatarURL={
            "https://wallpapers.com/images/featured-full/fotos-de-perfil-xj8jigxkai9jag4g.jpg"
          }
        ></CourseDetailTeacher>
        <Title size="lg" color="secondary">
          Reviews
        </Title>
        <div className="flex flex-col gap-4">
          <CourseReview
            avatarURL="https://wallpapers.com/images/featured-full/fotos-de-perfil-xj8jigxkai9jag4g.jpg"
            dateReview="07/07/2025"
            name="Andre Carpio Rocha"
            rating="4"
            comment="In 2024, React is still the #1 skill to learn if you want to become a successful front-end developer!
 But it can be hard. There are so many moving parts, so many different libraries, so many tutorials out there.
That's why you came here... And you came to the right place! This is THE ultimate React course for 2024 and beyond.
A practice-heavy approach to master React by building polished apps, backed up by diagrams, theory, and looks under the hood of React.
The all-in-one package that takes you from zero to truly In 2024, React is still the #1 skill to learn if you want to become a successful front-end developer!
 But it can be hard. There are so many moving parts, so many different libraries, so many tutorials out there.
That's why you came here... And you came to the right place! This is THE ultimate React course for 2024 and beyond.
A practice-heavy approach to master React by building polished apps, backed up by diagrams, theory, and looks under the hood of React.
The all-in-one package that takes you from zero to truly"
          ></CourseReview>
          <CourseReview
            avatarURL="https://wallpapers.com/images/featured-full/fotos-de-perfil-xj8jigxkai9jag4g.jpg"
            dateReview="07/07/2025"
            name="Andre Carpio Rocha"
            rating="4"
            comment="In 2024, React is still the #1 skill to learn if you want to become a successful front-end developer!
 But it can be hard. There are so many moving parts, so many different libraries, so many tutorials out there.
That's why you came here... And you came to the right place! This is THE ultimate React course for 2024 and beyond.
A practice-heavy approach to master React by building polished apps, backed up by diagrams, theory, and looks under the hood of React.
The all-in-one package that takes you from zero to truly In 2024, React is still the #1 skill to learn if you want to become a successful front-end developer!
 But it can be hard. There are so many moving parts, so many different libraries, so many tutorials out there.
That's why you came here... And you came to the right place! This is THE ultimate React course for 2024 and beyond.
A practice-heavy approach to master React by building polished apps, backed up by diagrams, theory, and looks under the hood of React.
The all-in-one package that takes you from zero to truly"
          ></CourseReview>
          <div>
            <Button variant="ghost" className="flex items-center">
              <span className="font-bold">Show more</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
