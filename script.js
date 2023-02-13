// const shortUrl = document.querySelector('input');
// const submitButton = document.querySelector('.btn-submit');
const firstSectionContent = document.querySelector('.first-section-content');
{
  /* <i class="fa fa-bars" onclick="showHideMenu()"></i>; */
}
// submitButton.addEventListener('click', getValue);

// function getValue() {
//   const url = shortUrl.value;
//   //   console.log(url);

//   async function fetchData() {
//     const response = await fetch(
//       `https://api.shrtco.de/v2/shorten?url=https://api.shrtco.de/v2/shorten?url=${url}`
//     );
//     const data = await response.json();
//     const html = `<h2>Shortened url</h2>
//     <p>The shortened URL is ${data.result.full_short_link}</p>
//     `;
//     document.body.innerHTML = html;

//     console.log(data.result.full_short_link);
//   }
//   fetchData();
// }

// Nav menu open and close
function showHideMenu() {
  let navLinks = document.getElementById('navLinks');
  if (navLinks.style.visibility === 'visible') {
    navLinks.style.visibility = 'hidden';
    firstSectionContent.classList.remove('menu-open');
  } else {
    navLinks.style.visibility = 'visible';
    firstSectionContent.classList.add('menu-open');
  }
}
