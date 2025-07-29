import { useEffect, useRef, useState } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { Dropdown } from "../../../../shared/components/atoms/Dropdown";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { CourseCard } from "../../../../shared/components/molecules/CourseCard";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { useEnrollments } from "../../customHooks/useEnrollments";
import { Loading } from "../../../../shared/components/molecules/Loading";
import { Alert } from "../../../../shared/components/molecules/Alert";
import usePopup from "../../../../shared/hooks/usePopup";
import DeleteCardPopup from "../../../teacher/components/atoms/DeleteCardPopup";
import { baseAPI } from "../../../../shared/api/axios/AxiosConnection";
import { useToastContext } from "../../../../shared/contexts/ToastContext";

export const MyCoursesListStudent = () => {
  const { user } = useAuth();
  const { enrollments, loading, error, setEnrollments } = useEnrollments(
    user?.id
  );
  const { showToast } = useToastContext();

  const SORT = [
    { label: "Name (A–Z)", value: "asc" },
    { label: "Name (Z–A)", value: "des" },
    { label: "Newest Enrollment", value: "newest" },
    { label: "Oldest Enrollment", value: "oldest" },
  ];

  const search = useRef(null);
  const [sort, setSort] = useState(SORT[2].value);
  const [courses, setCourses] = useState([]);
  const { openPopup, closePopup } = usePopup();

  useEffect(() => {
    if (enrollments && !loading && !error) {
      setCourses(enrollments);
    }
  }, [enrollments, loading, error]);

  const searchCourses = ({ search = "", sort = "newest" }) => {
    let filtered = [...enrollments];

    if (search.trim() !== "") {
      filtered = filtered.filter((course) =>
        course.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case "asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "des":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.enrollmentDate) - new Date(a.enrollmentDate)
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) => new Date(a.enrollmentDate) - new Date(b.enrollmentDate)
        );
        break;
    }

    setCourses(filtered);
  };

  const handleSearchInput = () => {
    searchCourses({ search: search.current.value, sort });
  };

  const handleSortInput = (option) => {
    const newSort = option.value;
    setSort(newSort);
    searchCourses({ search: search.current.value, sort: newSort });
  };

  const dropCourse = async (enrollmentId) => {
    try {
      const response = await baseAPI.put(`/enrollments/${enrollmentId}`);

      if (response.status === 200 || response.status === 204) {
        setCourses((prev) =>
          prev.filter((c) => c.enrollmentId !== enrollmentId)
        );
        setEnrollments((prev) =>
          prev.filter((c) => c.enrollmentId !== enrollmentId)
        );

        showToast("Course successfully dropped", "success");
        closePopup();
      } else {
        console.warn("Unexpected response:", response);
        showToast("Something went wrong. Please try again later.", "error");
      }
    } catch (err) {
      console.error("Error to drop course:", err);
      showToast(
        "There was a problem canceling your enrollment. Please try again.",
        "error"
      );
    }
  };

  const handleOpenDeletePopup = (enrollmentId) => {
    openPopup(
      DeleteCardPopup,
      {
        deleteAction: dropCourse,
        id: enrollmentId,
        closePopup,
        title: "Drop Course",
        msg: "This action is irreversible. Please confirm you want to drop this course.",
      },
      true
    );
  };

  return (
    <main className="flex flex-col h-full w-full gap-5 max-w-[90rem] px-8 py-4 mx-auto">
      <Title className="border-b-1" color="default">
        My Courses
      </Title>

      {!loading && !error && enrollments?.length > 0 && (
        <div className="grid gap-4 lg:flex">
          <div className="flex gap-4 items-center w-full lg:w-[25rem]">
            <TextInput
              placeholder="Search your courses"
              ref={search}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchInput();
              }}
            />
            <Button
              variant="bordered"
              radius="medium"
              size="sm"
              onClick={handleSearchInput}
            >
              <span className="material-symbols-outlined">search</span>
            </Button>
          </div>
          <div className="flex gap-4 justify-start w-full">
            <Dropdown
              label={SORT.find((s) => s.value === sort)?.label || SORT[2].label}
              variant="bordered"
              options={SORT}
              className="w-50"
              onSelect={handleSortInput}
            />
          </div>
        </div>
      )}

      {loading && <Loading text="Loading courses..." />}

      {!loading && error && (
        <Alert
          type="error"
          title="Error loading courses"
          description="An error occurred while loading your enrollments. Please try again later."
        />
      )}

      {!loading && !error && enrollments.length === 0 && (
        <Alert
          type="info"
          title="No courses found"
          description="You are not enrolled in any courses yet."
        />
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-x-4 gap-y-12">
          {courses.map((course) => (
            <CourseCard
              key={course.courseId}
              author={course.author}
              description={course.description}
              imageURL={course.imageURL}
              name={course.name}
              rating={course.rating}
              showAuthor={false}
              redirecTo={`/courses/${course.courseId}/content`}
              showDropOption
              onDropCourse={() => {
                handleOpenDeletePopup(course.enrollmentId);
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
};

MyCoursesListStudent.propTypes = {
  searchCourses: PropTypes.func,
  onNewCourse: PropTypes.func,
};
