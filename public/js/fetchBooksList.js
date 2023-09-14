const fetchBooksList = async (items, itemsRaw) => {
  const display = document.getElementById("display");
  display.innerHTML = "";

  try {
    const response = await fetch("/api/books");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    itemsRaw = data;
     items = data
      .slice(0, 15)
      .map((book, index) => `<li class="bookItem" id="${index}">${book.title} - ${book.commentcount} comments</li>`);

    if (data.length >= 15) {
      items.push(`<p>...and ${data.length - 15} more!</p>`);
    }

    const ul = document.createElement("ul");
    ul.className = "listWrapper";
    ul.innerHTML = items.join("");
    display.appendChild(ul);
  } catch (err) {
    console.error("Error fetching books:", err);
  }
};
