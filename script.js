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

// Api calls and local storage

const shortItButton = document.querySelector('.short-it');
const urlCopy = document.querySelector('.hide-url');
const linkBox = document.getElementById('linkBox');
const errorMessage = document.querySelector('.error-msg');

// Retrieve the array of shortened URLs from localStorage
/*
This line of code retrieves the value of the "shortenedUrls" key from localStorage using localStorage.getItem('shortenedUrls'). It then uses JSON.parse() to parse the retrieved value as JSON, if it is not null. If the retrieved value is null, then an empty array is used as the default value.

The || [] at the end is known as the nullish coalescing operator,
 and it returns the first truthy value from left to right. 
 In this case, if JSON.parse(localStorage.getItem('shortenedUrls')) returns null, 
 it will evaluate to false and return the empty array as the default value. 
 This ensures that shortenedUrls is always an array, whether it is populated with data or empty.
*/
const shortenedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];

// Insert the shortened URLs into the document
shortenedUrls.forEach(url => {
  urlCopy.insertAdjacentHTML('beforeend', url);
});
if (shortenedUrls.length > 0) {
  urlCopy.style.display = 'block';
}

shortItButton.addEventListener('click', function () {
  const linkValue = linkBox.value;

  const regexUrl =
    /^(?:[a-z]+:)?\/\/(?:(?:[\w$\-_.+!*'(),]|(?:%[0-9a-f]{2}))+:@)?(?:(?:[a-z0-9\-_]+\.)*[a-z0-9\-_]+|\[(?:(?:[0-9a-f]{1,4}:)*(?:[0-9a-f]{1,4})\])|\[v[a-f0-9]\.[\w$\-_.+!*'(),]*\])(?::[0-9]+)?(?:[\/|\?](?:[\w$\-_.+!*'(),;\/?:@&=+$\|#]|(?:%[0-9a-f]{2}))*)?(?:#[\w\-_.]*)?$/;

  const testingUrl = regexUrl.test(linkValue);

  if (testingUrl === true && linkValue !== '') {
    try {
      async function fetchData() {
        const response = await fetch(
          `https://api.shrtco.de/v2/shorten?url=${linkValue}`
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

        // Add the shortened URL to the array in localStorage
        shortenedUrls.push(html);
        localStorage.setItem('shortenedUrls', JSON.stringify(shortenedUrls));

        // Insert the HTML into the document
        urlCopy.insertAdjacentHTML('beforeend', html);
        urlCopy.style.display = 'block';
        errorMessage.style.display = 'none';
        linkBox.style.border = 'none';
      }
      fetchData();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  } else {
    errorMessage.style.display = 'block';
    linkBox.style.border = '2px solid red';
  }
});
