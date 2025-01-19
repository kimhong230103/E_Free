import moment from "moment-timezone";

function dateTimeZoneFormat(dateTime, format = "DD-MM-YYYY HH:mm:ss") {
  if (dateTime && dateTime !== "0000-00-00 00:00:00") {
    // Parse the date-time string as UTC
    const utcMoment = moment.utc(dateTime);
    // Convert to Asia/Phnom_Penh timezone
    const phnomPenhMoment = utcMoment.tz("Asia/Phnom_Penh");
    // Format the date-time
    return phnomPenhMoment.format(format);
  } else {
    return '';
  }
}

export default dateTimeZoneFormat;
