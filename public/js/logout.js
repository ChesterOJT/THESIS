document.getElementById("logoutButton").addEventListener("click", function () {
  var submenu = document.getElementById("logoutSubmenu");
  if (submenu.classList.contains("hidden")) {
    submenu.classList.remove("hidden");
  } else {
    submenu.classList.add("hidden");
  }
});
