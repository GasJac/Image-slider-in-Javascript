/*****************************************************************************
 * utility functions
 * ***************************************************************************/
 
//--- image slide ---
function slide (idContent, idContainer, time) {
 
  // recursive function to implement image slide
  function go() {
    position-- ;
    if (position+hContent < min) {
      position = max ;
      page = 0 ;
    }
    content.style.top = position + "px" ;
    if (position+(max-min)*page <= min) {
      page++ ;
      timer = setTimeout(go, time*100) ;
    }else{
      timer = setTimeout(go, time) ;
    }
  } 
 
  // local variables
  var content = document.getElementById(idContent) ;   
  var container = document.getElementById(idContainer) ;  
  var hContent = content.offsetHeight ;
  var min = content.offsetTop ;
  var max = container.offsetHeight ;
  var position = max ; 
  var page = 0 ;
  var timer ;
 
  // first call to the go function to start the slide
  go () ;
  
} 
 
//--- horizontal scrolling of an array of images ---
function animationImages (idImage1, idImage2, arrayImages) {
 
  // recursive function for the image scrolling
  function goAnimation() {
    img[imgActive].style.width = width + "px" ;
    width -=  5 ;
    if (width <= 0) {
      // changing image
      numImage = (numImage + 1) % maxImages ;
      img[imgActive].style.backgroundImage = "url("+arrayImages[numImage].src+")" ;
      //  reversal of the images plane
      img[imgActive].style.zIndex = 1 ;
      img[imgActive].style.width = maxSize + "px" ;
      imgActive = (imgActive + 1) % 2 ;
      img[imgActive].style.zIndex = 2 ;
      // restart at the maximum size
      width = maxSize ;
      // break before decreasing the image width
      setTimeout(goAnimation, breakTime) ;
    }else{
      // proceed with the animation
      setTimeout(goAnimation, time) ;
    }
  }
  
  // declaration 
  var numImage = 0 ;
  var maxImages = arrayImages.length ;
  var img = new Array() ;
  img[0] = document.getElementById(idImage1) ;
  img[1] = document.getElementById(idImage2) ;
  img[1].style.backgroundImage = "url("+arrayImages[0].src+")" ;
  var maxSize = arrayImages[0].width ;
  var width = 0 ;
  var imgActive = 0 ;
  var time = 1 ;
  var breakTime = time * 2000 ;
  
  // animation start
  goAnimation() ;
    
}

//--- load an array of images into memory ---
function loadImages (arrayName) {
  var images = new Array(arrayName.length) ;
  for (k=0 ; k<arrayName.length ; k++) {
    images[k] = new Image() ;
    images[k].src = arrayName[k] ;
  }
  return images ;
}


/*****************************************************************************
 * Loading of the main page
 * ***************************************************************************/ 
window.onload = function() {

  //--- preparation for the image scroll into the slider ---
  function imageSlider () {
    var imagePath = "images/" ;
    var nbImages = 4 ;
    var arrayImageName = new Array(nbImages) ;
    for (k=0 ; k<nbImages ; k++) {
      arrayImageName[k] = imagePath+"img"+k+".jpg" ;
    }
    var images = loadImages(arrayImageName) ;
    images[images.length-1].onload = function() {
      animationImages("divImg0", "divImg1", images) ;
    }
  }
  imageSlider () ;
  
}
