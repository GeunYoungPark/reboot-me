const blogList = document.getElementById("blogList");
const searchForm = document.getElementById("blogSearchForm");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const resultText = document.getElementById("resultText");
const noResults = document.getElementById("noResults");
const keywordList = document.getElementById("keywordList");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let currentSearch = "";
let currentSort = "newest";
let visibleCount = 5;

function getCategoryClass(category) {
  const name = category.toLowerCase();

  if (name === "body care") return "body-care"; /* 안쓰지만 일단 유지 */
  if (name === "resources") return "resources";
  if (name === "life") return "life";

  return "";
}

function sortPosts(posts, sortType) {
  const sortedPosts = [...posts];

  if (sortType === "newest") {
    sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (sortType === "oldest") {
    sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  if (sortType === "az") {
    sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
  }

  return sortedPosts;
}

function searchPosts(posts, keyword) {
  const cleanKeyword = keyword.trim().toLowerCase();

  if (!cleanKeyword) {
    return posts;
  }

  return posts.filter((post) => {
    const searchableText = [
      post.title,
      post.category,
      post.description,
      post.readTime,
      post.date,
      ...post.keywords
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(cleanKeyword);
  });
}

function renderPosts() {
  const searchedPosts = searchPosts(blogPosts, currentSearch);
  const sortedPosts = sortPosts(searchedPosts, currentSort);
  const postsToShow = sortedPosts.slice(0, visibleCount);

  blogList.innerHTML = "";

  if (sortedPosts.length === 0) {
    noResults.classList.add("show");
    loadMoreBtn.classList.add("hide");

    resultText.textContent = currentSearch
      ? `No articles found for “${currentSearch}”`
      : "No articles found";

    renderSuggestedKeywords();
    return;
  }

  noResults.classList.remove("show");

  resultText.textContent = currentSearch
    ? `Search results for “${currentSearch}” · ${sortedPosts.length} article${sortedPosts.length > 1 ? "s" : ""} found`
    : "Showing all articles";

  postsToShow.forEach((post, index) => {
    const article = document.createElement("article");
    article.className = "blog-item";

    const displayNumber = String(index + 1).padStart(2, "0");
    const categoryClass = getCategoryClass(post.category);

    article.innerHTML = `
      <div class="blog-number">${displayNumber}</div>

      <div class="blog-content">
        <div class="blog-meta">
          <span class="blog-category ${categoryClass}">${post.category}</span>
          <span>·</span>
          <span>${post.readTime}</span>
        </div>

        
          <h2 class="blog-title">
          <a href="${post.link}" class="blog-title-link" aria-label="Read article: ${post.title}">
            ${post.title}
          </a>
          </h2>
        
        <p class="blog-description">${post.description}</p>
      </div>

      <a href="${post.link}" class="blog-link" aria-label="Read article: ${post.title}">
        <i class="fa-solid fa-arrow-right"></i>
      </a>
    `;

    blogList.appendChild(article);
  });

  if (visibleCount >= sortedPosts.length) {
    loadMoreBtn.classList.add("hide");
  } else {
    loadMoreBtn.classList.remove("hide");
  }
}

function renderSuggestedKeywords() {
  keywordList.innerHTML = "";

  suggestedKeywords.forEach((keyword) => {
    const button = document.createElement("button");
    button.className = "keyword-btn";
    button.type = "button";
    button.textContent = keyword;

    button.addEventListener("click", () => {
      currentSearch = keyword;
      searchInput.value = keyword;
      visibleCount = 5;
      renderPosts();
    });

    keywordList.appendChild(button);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  currentSearch = searchInput.value.trim();
  visibleCount = 5;
  renderPosts();
});

searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value.trim();
  visibleCount = 5;
  renderPosts();
});

sortSelect.addEventListener("change", () => {
  currentSort = sortSelect.value;
  visibleCount = 5;
  renderPosts();
});

loadMoreBtn.addEventListener("click", () => {
  visibleCount += 5;
  renderPosts();
});

renderPosts();