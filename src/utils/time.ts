export function getDate(unix_timestamp: number) {
  var date = new Date(unix_timestamp * 1000);

  let final = `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;

  return final;
}

export function getHours(unix_timestamp: number) {
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();

  return hours;
}
