// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJnBJDnb4F6yfRUAZecsX-GPiXmrO6K3o",
  authDomain: "working-ba4f3.firebaseapp.com",
  projectId: "working-ba4f3",
  storageBucket: "working-ba4f3.appspot.com",
  databaseURL:
    "https://working-ba4f3-default-rtdb.asia-southeast1.firebasedatabase.app/",
  messagingSenderId: "170127063382",
  appId: "1:170127063382:web:d90e7415f30a11bb00bef7",
  measurementId: "G-TTHR04NDRL",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to your database
const dataRef1 = database.ref("voltage");

// Fetch the data and update battery level and chart
dataRef1.on("value", function (snapshot) {
  const volt = snapshot.val();
  document.getElementById("voltage1").textContent = volt + "v";

  // Update battery level and percentage based on voltage
  updateBatteryLevel(volt);

  // Update chart with new data
  updateChart(volt);

  blinkIcons(volt);
});

function blinkIcons(voltage) {
  const solarPanelIcon = document.getElementById("solar-panel-icon");
  const loadIcon = document.getElementById("load-icon");

  if (voltage > 0) {
    solarPanelIcon.classList.add("blink");
    loadIcon.classList.add("blink");
  } else {
    solarPanelIcon.classList.remove("blink");
    loadIcon.classList.remove("blink");
  }
}

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
function updateChart(newData) {
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

  // Check if more than 25 data points are present and remove the oldest one
  if (window.myLineChart.data.labels.length > 25) {
    window.myLineChart.data.labels.shift(); // Remove the oldest label
    window.myLineChart.data.datasets.forEach((dataset) => {
      dataset.data.shift(); // Remove the oldest data point
    });
  }
  window.myLineChart.update();
}

// Event listener for opening sidebar
