// Function to toggle sidebar and adjust main content
function toggleSidebar() {
  var sidebar = document.querySelector(".navigation");
  var mainContent = document.querySelector(".main");
  sidebar.classList.toggle("active");
  if (window.innerWidth <= 500) {
    mainContent.classList.toggle("blur");
    content.classList;
  }
  mainContent.classList.toggle("active");
}

// Function to close the sidebar
function closeSidebar() {
  var sidebar = document.querySelector(".navigation");
  var mainContent = document.querySelector(".main");
  sidebar.classList.remove("active");
  mainContent.classList.remove("active");
  mainContent.classList.remove("blur");
}

// Event listener for opening/closing sidebar
document
  .getElementById("sidebarToggle")
  .addEventListener("click", toggleSidebar);

// Event listener for closing sidebar when close button is clicked
document.querySelector(".closebutton").addEventListener("click", closeSidebar);

// Event listener for removing blur and margin-left when resizing the window

window.addEventListener("resize", function () {
  var content = document.querySelector(".main");
  if (window.innerWidth > 500) {
    content.classList.remove("blur");
    content.classList.remove("margin-left");
    document.querySelector(".navigation").classList.remove("active");
  }
});
