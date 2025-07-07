import { Title } from "../../../../shared/components/atoms/Title";
import { ExpandableText } from "../../../../shared/components/molecules/ExpandableText";
import { CourseDetailTeacher } from "../molecules/CourseDetailTeacher";
import { CourseBanner } from "../organisms/CourseBanner";

export const CourseDetails = () => {
  return (
    <>
      <CourseBanner></CourseBanner>
      <div className="flex flex-col w-[80rem] max-w-[100%] m-auto py-10 gap-5 ">
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
      </div>
    </>
  );
};
