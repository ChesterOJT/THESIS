function toggleSidebar() {
  var sidebar = document.querySelector(".sidebar");
  var content = document.querySelector(".main-content");
  sidebar.classList.toggle("open");
  if (window.innerWidth <= 500) {
    content.classList.toggle("blur");
  } else {
    content.classList.toggle("margin-left");
  }
  console.log(toggleSidebar);
}
document
  .getElementById("sidebarToggle")
  .addEventListener("click", toggleSidebar);
// Event listener for closing sidebar
document
  .getElementById("closeSidebar")
  .addEventListener("click", toggleSidebar);
// Remove blur when resizing the window to wider than 500px
window.addEventListener("resize", function () {
  var content = document.querySelector(".main-content");
  if (window.innerWidth > 500) {
    content.classList.remove("blur");
    content.classList.remove("margin-left");
    document.querySelector(".sidebar").classList.remove("open");
  }
});
