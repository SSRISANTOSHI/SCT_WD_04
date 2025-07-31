import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../CalendarCustom.css';

function TaskCalendar({ tasks }) {
  const taskDates = tasks.map((t) =>
    new Date(t.time).toDateString()
  );

  const tileClassName = ({ date, view }) => {
    if (view === "month" && taskDates.includes(date.toDateString())) {
      return "has-task";
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>📅 Task Calendar</h3>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
}

export default TaskCalendar;
