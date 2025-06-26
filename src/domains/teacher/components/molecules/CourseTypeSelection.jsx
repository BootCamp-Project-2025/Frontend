import PropTypes from "prop-types";
import { Title } from "../../../../shared/components/atoms/Title";
import { Button } from "../../../../shared/components/atoms/Button";

CourseTypeSelection.propTypes = {
  setCourseType: PropTypes.func.isRequired,
};

export default function CourseTypeSelection({ setCourseType }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <section className="flex flex-col md:flex-row gap-6">
        <article className="w-full md:w-1/2 min-h-[200px] border border-gray-300 rounded-xl flex items-center justify-center p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <Button variant="bordered">
            <div className="flex flex-col content-center">
              <span className="material-symbols-outlined min-w-xl">
                smart_display
              </span>
              <span className="text-lg md:text-xl font-semibold">
                Static Course
              </span>
            </div>
          </Button>
        </article>

        <article className="w-full md:w-1/2 min-h-[200px] border border-gray-300 rounded-xl flex items-center justify-center p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <Button variant="bordered">
            <div className="flex flex-col content-center">
              <span className="material-symbols-outlined min-w-xl">people</span>
              <span className="text-lg md:text-xl font-semibold">
                P2P Course
              </span>
            </div>
          </Button>
        </article>
      </section>
    </div>
  );
}
