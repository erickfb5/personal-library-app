document.addEventListener("DOMContentLoaded", async () => {
  let items = [];
  let itemsRaw = [];

  const response = await fetch("/api/books");
  itemsRaw = await response.json();

  fetchBooksList(items, itemsRaw);

  addComment();
  deleteBook();

  addNewTitle(items, itemsRaw);

  deleteAllBooks(items, itemsRaw);

  displayBooks(fetchDetails, itemsRaw);
});
