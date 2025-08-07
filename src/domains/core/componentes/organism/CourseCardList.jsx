/*import { useState } from "react";
import { useEffect } from "react";*/
import { CourseCard } from "../../../../shared/components/molecules/CourseCard";
import PropTypes from "prop-types";
import { Pagination } from "../../../../shared/components/molecules/Pagination";
/*import { getRequest } from "../../../../shared/api/getRequest";
import { useToastContext } from "../../../../shared/contexts/ToastContext";*/

export const CourseCardList = ({
  data = [],
  page = 1,
  size = 12,
  total = 0,
  backwardFn,
  forwardFn,
  selectedFn,
}) => {
  /*const [courses, setCourses] = useState([]);
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
  }, []);*/

  return (
    <div>
      {data.length > 0 ? (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-x-4 gap-y-12">
            {data.map((course, idx) => {
              return (
                <CourseCard
                  key={course.id ? course.id : idx}
                  id={course.id}
                  description={course.description}
                  imageURL={course.imgSrc}
                  name={course.name}
                  showRating={false}
                ></CourseCard>
              );
            })}
          </div>
          <Pagination
            backwardFn={backwardFn}
            forwardFn={forwardFn}
            selectedFn={selectedFn}
            currentPage={page}
            size={size}
            total={total}
          ></Pagination>
        </>
      ) : (
        <p>Courses not found</p>
      )}
    </div>
  );
};

CourseCardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      imgSrc: PropTypes.string,
    })
  ),
  page: PropTypes.number,
  size: PropTypes.number,
  total: PropTypes.number,
  backwardFn: PropTypes.func,
  forwardFn: PropTypes.func,
  selectedFn: PropTypes.func,
  url: PropTypes.string,
};
