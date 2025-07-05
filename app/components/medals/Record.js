import React from "react";

const Record = ({ icon, duration, dict }) => {
  let record = 0;
  if (duration == 3) {
    record = 1;
  } else if (duration >= 7 && duration <= 14) {
    record = 2;
  } else if (duration >= 14 && duration < 21) {
    record = 3;
  } else if (duration >= 21 && duration < 28) {
    record = 4;
  } else if (duration >= 28 && duration < 35) {
    record = 5;
  } else if (duration >= 35) {
    record = 6;
  }
  return (
    <div className="">
      <div>Icon: {icon}</div>
      <div>{dict[record]}</div>
    </div>
  );
};

export default Record;
