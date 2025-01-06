import moment from "moment";

moment.updateLocale("km", {
  relativeTime: {
    future: "នៅ %s",
    past: "%sមុន",
    s: "បន្ដិច",
    m: "1 នាទី",
    mm: "%d នាទី",
    h: "1 ម៉ោង",
    hh: "%d ម៉ោង",
    d: "1 ថ្ងៃ",
    dd: "%d ថ្ងៃ",
    w: "1 សប្តាហ៍",
    ww: "%d សប្តាហ៍",
    M: "1 ខែ",
    MM: "%d ខែ",
    y: "1 ឆ្នាំ",
    yy: "%d ឆ្នាំ",
  },
  weekdays: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
  months:
    "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split(
      "_"
    ),
});
moment.locale("km");

function dateKhmerFormat(dateTime, format = "DD-MM-YYYY HH:mm:ss") {
  if (dateTime && dateTime !== "0000-00-00 00:00:00") {
    // // Parse the date-time string as UTC
    const utcMoment = moment.utc(dateTime);
    // // Convert to Asia/Phnom_Penh timezone
    const phnomPenhMoment = utcMoment.tz("Asia/Phnom_Penh");
    // Format the date-time
    return utcMoment.fromNow();
  } else {
    return "";
  }
}

export default dateKhmerFormat;
