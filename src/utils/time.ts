export function calcTime(city: string, offset: number) {
  // create Date object for current location
  var d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc + 3600000 * offset);

  // return time as a string
  return "The local time for city" + city + " is " + nd.toLocaleString();
}

export function getDate(unix_timestamp: number) {
  var date = new Date(unix_timestamp * 1000);

  let final = `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;
  //   // Hours part from the timestamp
  //   var hours = date.getHours();

  //   // Minutes part from the timestamp
  //   var minutes = "0" + date.getMinutes();

  //   // Seconds part from the timestamp
  //   var seconds = "0" + date.getSeconds();

  //   // Will display time in 10:30:23 format
  //   var formattedTime =
  //     hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  return final;
}
export function getHours(unix_timestamp: number) {
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();

  return hours;
}
