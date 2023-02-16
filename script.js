'use strict';
// for hero section margin
const heroSectionContent = document.querySelector('.hero-section-content');
// Get the hamburger icon
const hamburger = document.querySelector('.fa-bars');
// Get the navigation links
const navLinks = document.querySelector('.nav-links');

// Add an event listener to the hamburger icon
hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
  heroSectionContent.classList.toggle('menu-open');
});

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
// function showHideMenu() {
//   let navLinks = document.getElementsByClassName('nav-links ul');
//   if (navLinks.style.visibility === 'visible') {
//     navLinks.style.visibility = 'hidden';
//     // firstSectionContent.classList.remove('menu-open');
//   } else {
//     navLinks.style.visibility = 'visible';
//     // firstSectionContent.classList.add('menu-open');
//   }
// }

// const bars = document.getElementsByClassName('fa-bars');
// const navbarLinks = document.getElementsByClassName('nav-links');

// bars.addEventListener('click', () => {
//   navbarLinks.classList.toggle('active');
// });

// Api calls
const shortItButton = document.querySelector('.short-it');

shortItButton.addEventListener('click', function () {
  const urlCopy = document.querySelector('.hide-url');
  const linkBox = document.getElementById('linkBox');
  const linkValue = linkBox.value;
  const errorMessage = document.querySelector('.error-msg');

  const regexUrl =
    /^(?:[a-z]+:)?\/\/(?:(?:[\w$\-_.+!*'(),]|(?:%[0-9a-f]{2}))+:@)?(?:(?:[a-z0-9\-_]+\.)*[a-z0-9\-_]+|\[(?:(?:[0-9a-f]{1,4}:)*(?:[0-9a-f]{1,4})\])|\[v[a-f0-9]\.[\w$\-_.+!*'(),]*\])(?::[0-9]+)?(?:[\/|\?](?:[\w$\-_.+!*'(),;\/?:@&=+$\|#]|(?:%[0-9a-f]{2}))*)?(?:#[\w\-_.]*)?$/;

  const testingUrl = regexUrl.test(linkValue);

  if (testingUrl === true && linkValue !== '') {
    try {
      async function fetchData() {
        const response = await fetch(
          `https://api.shrtco.de/v2/shorten?url=https://api.shrtco.de/v2/shorten?url=${linkValue}`
        );
        const data = await response.json();

        const html = `
    <section class="copying-url">
        <p class="given-link">${linkValue}</p>
        <hr>
        <div class="return-links">
          <p class="small-link"><a href="${data.result.full_short_link}" target="_blank">${data.result.full_short_link}</a></p>
          <button class="copy">Copy</button>
        </div>
    </section>
        `;

        urlCopy.insertAdjacentHTML('beforeend', html);
        urlCopy.style.display = 'block';
        // console.log(data.result.full_short_link);
        errorMessage.style.display = 'none';
        linkBox.style.border = 'none';
      }
      fetchData();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  } else {
    // console.log('Not valid');
    errorMessage.style.display = 'block';
    linkBox.style.border = '2px solid red';
  }
});
