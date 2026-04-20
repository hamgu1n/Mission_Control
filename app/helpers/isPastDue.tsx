interface dateTimeObject {
  date?: string,
  time?: string
}

export default function isPastDue({ date, time }: dateTimeObject) {
  if (!date && !time) return false;

  const now = new Date();

    const due = new Date(
      `${date}T${time || "00:00"}`
    );

    return now > due;
 }
