const blogContainer = document.getElementById('blogContainer');

fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@akkalam305')
  .then(res => res.json())
  .then(data => {
    data.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      const thumbnail = item.thumbnail;
      const hasImage = thumbnail && !thumbnail.includes("default") && !thumbnail.includes("undefined");
      const imageHTML = hasImage ? `<img src="${thumbnail}" alt="${item.title}">` : '';

      card.innerHTML = `
        <h2>${item.title}</h2>
        <p>${new Date(item.pubDate).toDateString()}</p>
        ${imageHTML}
        <p><a href="${item.link}" target="_blank">Read more →</a></p>
      `;

      blogContainer.appendChild(card);
    });
  })
  .catch(err => {
    blogContainer.innerHTML = '<p style="color: red;">Failed to load blog posts. Please try again later.</p>';
    console.error('Error fetching blog data:', err);
  });
