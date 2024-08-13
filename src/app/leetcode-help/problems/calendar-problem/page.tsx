export default function QuestionTypePage() {
  let output = new Date("2023-06-19T00:00:00.000Z");
  let events: Timing[] = [
    ["2023-07-20T10:00:00.000Z", "2023-07-20T12:00:00.000Z"],
    ["2023-07-20T11:30:00.000Z", "2023-07-20T13:30:00.000Z"],
    ["2023-07-20T14:00:00.000Z", "2023-07-20T15:00:00.000Z"],
    ["2023-07-20T09:00:00.000Z", "2023-07-20T10:30:00.000Z"],
    ["2023-07-20T13:00:00.000Z", "2023-07-20T14:30:00.000Z"],
    ["2023-07-20T15:00:00.000Z", "2023-07-20T16:00:00.000Z"],
    ["2023-07-20T08:30:00.000Z", "2023-07-20T09:30:00.000Z"],
    ["2023-07-20T11:00:00.000Z", "2023-07-20T12:30:00.000Z"],
    ["2023-07-20T14:30:00.000Z", "2023-07-20T15:30:00.000Z"],
    ["2023-07-20T16:00:00.000Z", "2023-07-20T17:00:00.000Z"],
  ];
  type Timing = [string, string];

  type Interval = [number, number];
  function fetchAvailableSlots(
    duration: number,
    window: Timing,
    events: Timing[]
  ): Timing[] {
    const intervalTime = convertTimingToInterval(events);

    if (duration <= 0) return [];

    const INTERVAL = 15;
    const SLOTS_PER_DAY = (60 / INTERVAL) * 24;

    const mergedIntervals = mergeIntervals(intervalTime);
    const startTime = convertTimingToInterval([window])[0][0];
    const endTime = convertTimingToInterval([window])[0][1];

    let currentBlock: Interval = [startTime, startTime + minutesToMs(duration)];
    let freeTime: Interval[] = [];
    console.log(currentBlock);
    console.log(currentBlock[1] <= endTime);
    let i = 0;
    while (currentBlock[1] <= endTime && i < 1000000000) {
      i++;
      let collision = false;

      for (let [startTime, endTime] of mergedIntervals) {
        const collidesWithEnd =
          currentBlock[1] > startTime && currentBlock[1] <= endTime;
        const collidesWithStart =
          currentBlock[0] >= startTime && currentBlock[0] < endTime;
        const collidesOver =
          startTime >= currentBlock[0] && endTime <= currentBlock[1];
        const collidesWithin =
          currentBlock[0] >= startTime && currentBlock[1] <= endTime;
        if (
          collidesOver ||
          collidesWithEnd ||
          collidesWithStart ||
          collidesWithin
        ) {
          collision = true;
          break;
        }
      }
      if (!collision) {
        freeTime.push(currentBlock);
      }

      currentBlock = [
        currentBlock[0] + minutesToMs(INTERVAL),
        currentBlock[1] + minutesToMs(INTERVAL),
      ];
    }
    return convertIntervalToTiming(freeTime);
  }
  function isoToCustomFormat(isoString: string): string {
    const date = new Date(isoString);

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getUTCDate().toString().padStart(2, "0");

    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function mergeIntervals(intervals: Interval[]): Interval[] {
    intervals.sort((a, b) => a[0] - b[0]); //O(nlog(n))
    let currInterval = intervals[0];
    intervals.push([Infinity, Infinity]);
    const retArr: Interval[] = [];
    for (let i = 1; i < intervals.length; i++) {
      const startTime = intervals[i][0];
      const endTime = intervals[i][1];
      if (startTime <= currInterval[1]) {
        currInterval = [currInterval[0], Math.max(currInterval[1], endTime)];
      } else {
        retArr.push(currInterval);
        currInterval = intervals[i];
      }
    }
    intervals.pop();
    return retArr;
  }

  function minutesToMs(minutes: number): number {
    return minutes * 60000;
  }

  function convertTimingToInterval(timings: Timing[]): Interval[] {
    let retArr: Interval[] = [];
    for (let i = 0; i < timings.length; i++) {
      const intervalTime: Interval = [
        new Date(timings[i][0]).getTime(),
        new Date(timings[i][1]).getTime(),
      ];
      retArr.push(intervalTime);
    }
    return retArr;
  }

  function convertIntervalToTiming(intervals: Interval[]): Timing[] {
    let retArr: Timing[] = [];
    for (let i = 0; i < intervals.length; i++) {
      const timingTime: Timing = [
        isoToCustomFormat(new Date(intervals[i][0]).toISOString()),
        isoToCustomFormat(new Date(intervals[i][1]).toISOString()),
      ];
      retArr.push(timingTime);
    }
    return retArr;
  }
  return (
    <>
      <h1>Calendar Problem</h1>
      <br />
      <span>
        Stan is looking to provide access to creators&apos; calendars and enable
        fans to book meetings with them. Your assignment is to create an
        algorythm that will assess creator&apos;s calendar and return available
        slots for fans to book.
      </span>
      <br />
      <br />

      <div>
        <h2>Inputs: </h2>

        <span>
          Booked timeslots:
          {convertIntervalToTiming(
            mergeIntervals(convertTimingToInterval(events))
          ).map((slot) => (
            <div key={slot[0]}>
              {slot[0]} - {slot[1]}
            </div>
          ))}
        </span>
      </div>
      <br />
      <br />
      <br />
      <h2>Calling function here with inputs. Output is below.</h2>
      <h3>
        {fetchAvailableSlots(
          30,
          ["2023-07-20T00:00:00.000Z", "2023-07-21T00:00:00.000Z"],
          events
        ).map((slot) => (
          <div key={slot[0]}>
            {slot[0]} - {slot[1]}
          </div>
        ))}
      </h3>
    </>
  );
}

/*

Call with Pavi


Where to write code -> coder pad, google
Do I do brute force right away?

-> dont call out its a merge intervals



if stuck -> check online



Design:
- document about application thats already built
- taking over 
- contractor did weird things
- mono repo
- http vs https
- 
*/
