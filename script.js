
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');
    // Add any future JavaScript functionality here
});


//  motorcycle tours 
const viewDetailsButtons = document.querySelectorAll('.view-details');

viewDetailsButtons.forEach(button => {
  button.addEventListener('click', () => {
    const details = button.nextElementSibling;
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
    button.textContent = button.textContent === 'View Details' ? 'Hide Details' : 'View Details';

    // Replace this with actual customer experience data
    if (details.style.display === 'block') {
      details.innerHTML = '<h2>Customer Experience</h2><p>The land of Monpa’s and mountains Tawang- is the blessed valley of North East. And of course, you can’t reach easily to a place where happiness is hidden in sacred spaces. Anything beautiful that the name suggests could not possible to attain so easily and only the people with a thirsty mind and adventurous zeal can attain it.</p>';
    }
  });
});
