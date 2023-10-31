const checkTimeMeeting = (startWorkingDay, endWorkingDay, startMeeting,
  durationMeeting) => {
  //нужно проверить, что начало встречи находится в промежутке
  //потом проверить, что время начала + продолжительность < конца дня
  const startWorkHour = Number(startWorkingDay.split(':')[0]);
  const startWorkMin = Number(startWorkingDay.split(':')[1]);
  const endWorkHour = Number(endWorkingDay.split(':')[0]);
  const endWorkMin = Number(endWorkingDay.split(':')[1]);
  const startMeetHour = Number(startMeeting.split(':')[0]);
  const startMeetMin = Number(startMeeting.split(':')[1]);
  const meetingHour = durationMeeting / 60;
  const meetingMin = durationMeeting % 60;
  const endMeetingHour = startMeetHour + meetingHour;
  const endMeetingMin = startMeetMin + meetingMin;
  if ((startWorkHour < startMeetHour) ||
  (startWorkHour === startMeetHour && startWorkMin <= startMeetMin)){
    if ((endWorkHour > startMeetHour) ||
    (endWorkHour === startMeetHour && endWorkMin >= startMeetMin)){
      if ((endWorkHour > endMeetingHour) || (endWorkHour === endMeetingHour && endWorkMin >= endMeetingMin)){
        return true;
      }
    }
  }
  return false;
};
