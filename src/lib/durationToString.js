import { intervalToDuration, formatDuration, isAfter } from "date-fns";
import frLocale from "date-fns/locale/fr";

const durationToString = ({
  start = new Date(),
  end = new Date(),
  format = ["days", "hours", "minutes"],
}) => {
  if (isAfter(start, end)) return "dans le futur";
  const str = formatDuration(
    intervalToDuration({
      start,
      end,
    }),
    { locale: frLocale, delimiter: ", ", format }
  );
  return str !== "" ? str : "peu";
};

export default durationToString;
