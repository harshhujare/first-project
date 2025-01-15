
document.getElementById('img1').addEventListener('click', () => {
   console.log('clicked');
});
document.getElementById('img1').addEventListener('click', function() {
  console.log('clicked');
  document.querySelector('.image-gallery img').src = 'images/room-1.jpg'; });
