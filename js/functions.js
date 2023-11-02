const checkTimeMeeting = (startWorkingDay, endWorkingDay, startMeeting,
  durationMeeting) => {
  //нужно проверить, что начало встречи находится в промежутке
  //потом проверить, что время начала + продолжительность < конца дня
  const START_WORK_HOUR = Number(startWorkingDay.split(':')[0]);
  const STERT_WORK_MIN = Number(startWorkingDay.split(':')[1]);
  const END_WORK_HOUR = Number(endWorkingDay.split(':')[0]);
  const END_WORK_MIN = Number(endWorkingDay.split(':')[1]);
  const START_MEET_HOUR = Number(startMeeting.split(':')[0]);
  const STERT_MEET_MIN = Number(startMeeting.split(':')[1]);
  const MEETING_HOUR = durationMeeting / 60;
  const MEETING_MIN = durationMeeting % 60;
  const END_MEETING_HOUR = START_MEET_HOUR + MEETING_HOUR;
  const END_MEETING_MIN = STERT_MEET_MIN + MEETING_MIN;
  if ((START_WORK_HOUR < START_MEET_HOUR) ||
  (START_WORK_HOUR === START_MEET_HOUR && STERT_WORK_MIN <= STERT_MEET_MIN)){
    if ((END_WORK_HOUR > START_MEET_HOUR) ||
    (END_WORK_HOUR === START_MEET_HOUR && END_WORK_MIN >= STERT_MEET_MIN)){
      if ((END_WORK_HOUR > END_MEETING_HOUR) || (END_WORK_HOUR === END_MEETING_HOUR && END_WORK_MIN >= END_MEETING_MIN)){
        return true;
      }
    }
  }
  return false;
};
