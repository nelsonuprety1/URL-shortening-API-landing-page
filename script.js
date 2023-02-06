const shortUrl = document.querySelector('input');
const submitButton = document.querySelector('.btn-submit');

submitButton.addEventListener('click', getValue);

function getValue() {
  const url = shortUrl.value;
  //   console.log(url);

  async function fetchData() {
    const response = await fetch(
      `https://api.shrtco.de/v2/shorten?url=https://api.shrtco.de/v2/shorten?url=${url}`
    );
    const data = await response.json();
    const html = `<h2>Shortened url</h2>
    <p>The shortened URL is ${data.result.full_short_link}</p>
    `;
    document.body.innerHTML = html;

    console.log(data.result.full_short_link);
  }
  fetchData();
}
