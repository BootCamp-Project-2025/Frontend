import { useState } from "react";
import { useEffect } from "react";
import { CourseCard } from "../../../../shared/components/molecules/CourseCard";
import PropTypes from "prop-types";
import { Pagination } from "../../../../shared/components/molecules/Pagination";
import { getRequest } from "../../../../shared/api/getRequest";
import { useToastContext } from "../../../../shared/contexts/ToastContext";

export const CourseCardList = () => {
  const [courses, setCourses] = useState([]);
  const { showToast } = useToastContext();

  useEffect(() => {
    const getData = async () => {
      const response = await getRequest("/courses");

      if (response.success) {
        setCourses(response.data.data);
      } else {
        showToast(response.error.message, "error");
      }
    };

    getData();
  }, []);

  return (
    <div>
      {courses.length > 0 ? (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-x-4 gap-y-12">
            {courses.map((course, idx) => {
              return (
                <CourseCard
                  key={course.id ? course.id : idx}
                  author={course.author}
                  description={course.description}
                  imageURL={course.imgSrc}
                  name={course.name}
                  rating={course.rating}
                ></CourseCard>
              );
            })}
          </div>
          <Pagination
            backwardFn={() => {}}
            forwardFn={() => {}}
            selectedFn={() => {}}
            indexedDB={[1, 2, 3]}
          ></Pagination>
        </>
      ) : (
        <p>Courses not found</p>
      )}
    </div>
  );
};

CourseCardList.propTypes = {
  url: PropTypes.string,
};
