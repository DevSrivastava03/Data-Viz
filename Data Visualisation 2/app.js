document.addEventListener('DOMContentLoaded', function () {
    const homeSection = document.getElementById('home');
    const infoSection = document.getElementById('info');
    const navbarLinks = document.querySelectorAll('#navbar a');
  
    navbarLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const target = event.target.getAttribute('href').substring(1); // Get the section id (home/info)
  
        if (target === 'home') {
          homeSection.style.display = 'block';
          infoSection.style.display = 'none';
        } else if (target === 'info') {
          homeSection.style.display = 'none';
          infoSection.style.display = 'block';
        }
      });
    });
  });
  