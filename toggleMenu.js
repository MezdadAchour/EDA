function menutoggle() {
  const menuItems = document.getElementById('menuItems');

  if (menuItems) {
    if (menuItems.style.maxHeight == "0px") {
      menuItems.style.maxHeight = "200px";
      console.log("1111");
    } else {
      menuItems.style.maxHeight = "0px";
      console.log("2222");
    }
  } else {
    console.error("Élément 'menuItems' introuvable dans le document.");
  }
}
