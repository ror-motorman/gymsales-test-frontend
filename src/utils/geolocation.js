export function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve);
    } else {
      reject({ error: "Geolocation is not supported by this browser." });
    }
  });
}
