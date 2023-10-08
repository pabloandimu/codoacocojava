// Función autoinvocada del botón flotante
(function () {
    //a partir de que punto del scroll vertical de la ventana mostrará el botón
    const ishow = 115
    const $divtop = document.getElementById("div-totop")
    window.addEventListener("scroll", function () {
      if (document.documentElement.scrollTop > ishow) {
        $divtop.style.display = "inherit"
      }
      else {
        $divtop.style.display = "none"
      }
    })
  })()