import { useEffect, useState } from "react";
import { Title } from "../../../shared/components/atoms/Title";
import { Alert } from "../../../shared/components/molecules/Alert";
import { P2pCourseCard } from "../../../shared/components/molecules/P2pCourseCard";
import { Loading } from "../../../shared/components/molecules/Loading";
import { ApiGet } from "../../course/api/ApiGet";

export const P2PCourseList = () => {
  const [dataResponse, setDataResponse] = useState({ data: [], loading: true });

  useEffect(() => {
    const loadData = async () => {
      const { data, error, status } = await ApiGet("p2pCourses/teacherCourse");
      setDataResponse({ data: data.data ?? [], loading: false, error, status });
    };
    loadData();
  }, []);

  return (
    <main className="wrapper flex flex-col gap-5">
      <Title className="border-b-1" color="default">
        P2P Courses
      </Title>

      {dataResponse.loading && <Loading text="Loading courses..." />}

      {dataResponse.error && !dataResponse.loading && (
        <Alert
          type="error"
          title="Error loading courses"
          description="An error occurred while loading your P2P courses. Please try again later."
        />
      )}

      {dataResponse.data.length === 0 &&
        !dataResponse.error &&
        !dataResponse.loading && (
          <Alert
            type="info"
            title="No courses found"
            description="You are not enrolled in any courses yet."
          />
        )}

      {dataResponse.data.length > 0 &&
        !dataResponse.error &&
        !dataResponse.loading && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-x-4 gap-y-12">
            {dataResponse.data.map((p2pcourse) => {
              return (
                <P2pCourseCard
                  key={p2pcourse.id}
                  id={p2pcourse.id}
                  name={p2pcourse.name}
                  status={p2pcourse.status}
                  remainingSession={p2pcourse.remainingSession}
                  author={p2pcourse.studentName}
                  redirecTo={""}
                  chatId={p2pcourse.chatId}
                  student={false}
                />
              );
            })}
          </div>
        )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-x-4 gap-y-12"></div>
    </main>
  );
};
