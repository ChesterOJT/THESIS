// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJnBJDnb4F6yfRUAZecsX-GPiXmrO6K3o",
  authDomain: "working-ba4f3.firebaseapp.com",
  databaseURL:
    "https://working-ba4f3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "working-ba4f3",
  storageBucket: "working-ba4f3.appspot.com",
  messagingSenderId: "170127063382",
  appId: "1:170127063382:web:d90e7415f30a11bb00bef7",
  measurementId: "G-TTHR04NDRL",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to your database
const dataRef1 = database.ref("voltage");

// Fetch the data and update battery level and chart
dataRef1.on(
  "value",
  function (snapshot) {
    const volt = snapshot.val();
    document.getElementById("voltage1").textContent = volt + "v";

    // Update battery level and percentage based on voltage
    updateBatteryLevel(volt);

    // Update chart with new data
    updateChart(volt);

    blinkIcons(volt);
  },
  function (error) {
    // Error handler that logs any issues to the console
    console.error("Error fetching data:", error);
  }
);

function updateBatteryLevel(voltage) {
  const batteryLevel = document.getElementById("battery-level");
  const batteryPercentage = document.getElementById("battery-percentage");

  // Define the voltage range for 0% to 100%
  const minVoltage = 11.8; // 0%
  const maxVoltage = 12.7; // 100%

  // Calculate the battery percentage based on the voltage
  let percentage = ((voltage - minVoltage) / (maxVoltage - minVoltage)) * 100;

  // Clamp the percentage between 0 and 100
  percentage = Math.min(Math.max(percentage, 0), 100);

  // Update the battery level width and text content
  batteryLevel.style.width = percentage + "%";
  batteryPercentage.textContent = percentage.toFixed(2) + "%";
}
setInterval(() => {
  const volt = window.currentVoltage || 0; // Use the current voltage if available
  const currentTime = new Date().toLocaleTimeString();
  window.myLineChart.data.labels.push(currentTime);
  window.myLineChart.data.datasets.forEach((dataset) => {
    dataset.data.push(volt);
  });
  window.myLineChart.update();
}, 1000); // Update every second

// Update the global current voltage whenever a new value comes in
dataRef1.on("value", function (snapshot) {
  window.currentVoltage = snapshot.val();
});
// Update chart with new data function
// Update chart with new data function
function updateChart(voltage) {
  // Initialize chart if it does not exist
  const ctx = document.getElementById("myChart").getContext("2d");
  if (!window.myLineChart) {
    window.myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Voltage",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            data: [],
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                parser: "HH:mm:ss",
                tooltipFormat: "ll HH:mm",
                unit: "second",
                displayFormats: {
                  second: "HH:mm:ss",
                  minute: "HH:mm",
                  hour: "HH:mm",
                },
              },
              scaleLabel: {
                display: true,
                labelString: "Time",
              },
              distribution: "linear",
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  if (Number.isInteger(value)) {
                    return value;
                  }
                },
              },
              scaleLabel: {
                display: true,
                labelString: "Voltage (V)",
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          intersect: false,
          mode: "index",
        },
        elements: {
          point: {
            radius: 0, // Remove points
          },
        },
      },
    });
  }

  // Add new data
  const currentTime = new Date().toLocaleTimeString();
  window.myLineChart.data.labels.push(currentTime);
  window.myLineChart.data.datasets.forEach((dataset) => {
    dataset.data.push(voltage);
  });

  // Check if more than 10 data points are present and remove the oldest one
  if (window.myLineChart.data.labels.length > 10) {
    window.myLineChart.data.labels.shift(); // Remove the oldest label
    window.myLineChart.data.datasets.forEach((dataset) => {
      dataset.data.shift(); // Remove the oldest data point
    });
  }

  window.myLineChart.update();
}

function updateBarChart(voltage) {
  const ctx = document.getElementById("barChart").getContext("2d");
  if (!window.myBarChart) {
    window.myBarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Voltage",
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Time",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: "Voltage (V)",
              },
            },
          ],
        },
      },
    });
  }

  const currentTime = new Date().toLocaleTimeString();
  window.myBarChart.data.labels.push(currentTime);
  window.myBarChart.data.datasets.forEach((dataset) => {
    dataset.data.push(voltage);
  });

  if (window.myBarChart.data.labels.length > 10) {
    window.myBarChart.data.labels.shift();
    window.myBarChart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
  }

  window.myBarChart.update();
}

// Update bar chart with new data
dataRef1.on("value", function (snapshot) {
  const volt = snapshot.val();
  updateBarChart(volt);
});
function updateTable(email) {
  var table = document.getElementById("userTable");
  if (!table) {
    console.log("Table element not found!");
    return;
  }
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = `<div class="imgBx"><img src="assets/customer02.jpg" alt="" /></div>`;
  cell2.innerHTML = `<h4>${email}<br /><span>Location unknown</span></h4>`;
}
