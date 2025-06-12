import { useEffect, useState } from "react";
import { getCourseList } from "../api/CourseAPI";

export function useGetCourseList() {
  const [courseList, setCourseList] = useState([]);

  async function loadData() {
    const data = await getCourseList();
    setCourseList(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return courseList;
}
