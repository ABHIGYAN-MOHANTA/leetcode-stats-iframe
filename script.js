function getRequest() {
  fetch("https://leetcode-stats-api.herokuapp.com/ABHIGYAN_MOHANTA")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      displayData(data); // Call a function to display data received
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayData(data) {
  const statsDiv = document.createElement("div");
  statsDiv.classList.add("stats-container");

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const statDiv = document.createElement("div");
      statDiv.classList.add("stat");

      const keySpan = document.createElement("span");
      keySpan.textContent = `${key}:`;

      const valueSpan = document.createElement("span");

      // Check if the value is an object (submissionCalendar) to handle differently
      if (typeof data[key] === "object") {
        const subCalendarDiv = document.createElement("div");
        subCalendarDiv.classList.add("sub-calendar");

        for (const subKey in data[key]) {
          if (data[key].hasOwnProperty(subKey)) {
            const subKeySpan = document.createElement("span");
            subKeySpan.textContent = `${subKey}:`;

            const subValueSpan = document.createElement("span");
            subValueSpan.textContent = `${data[key][subKey]}`;

            const subStatDiv = document.createElement("div");
            subStatDiv.classList.add("sub-stat");
            subStatDiv.appendChild(subKeySpan);
            subStatDiv.appendChild(subValueSpan);

            subCalendarDiv.appendChild(subStatDiv);
          }
        }

        valueSpan.appendChild(subCalendarDiv);
      } else {
        valueSpan.textContent = `${data[key]}`;
      }

      statDiv.appendChild(keySpan);
      statDiv.appendChild(valueSpan);
      statsDiv.appendChild(statDiv);
    }
  }

  document.body.appendChild(statsDiv);
}

getRequest();
