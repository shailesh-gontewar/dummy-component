import React, { useContext, useState } from "react";
import { AttendanceContext } from "../../../context/attendanceContext";
import StudentStatsCard from "./StudentStatsCard";

const HeaderPopup = () => {
  const { studentList } = useContext(AttendanceContext);

  return (
    <>
      <StudentStatsCard
        title="Total"
        count={studentList?.total_student}
        list={studentList?.payload}
      />
      <StudentStatsCard
        title="Present"
        count={studentList?.present_student}
        list={studentList?.present_list}
      />
      <StudentStatsCard
        title="Absent"
        count={studentList?.absent_student}
        list={studentList?.absent_list}
      />
    </>
  );
};

export default HeaderPopup;
