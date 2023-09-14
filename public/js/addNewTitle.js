const addNewTitle = (items, itemsRaw) => {
  document.getElementById("newBookForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    let newBookTitle = document.getElementById("newBookTitle").value;
    const title = JSON.stringify({ title: newBookTitle });

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: title,
      });

      if (!response.ok) {
        throw new Error("Error submitting new book title");
      }

      newBookTitle = "";
      await fetchBooksList(items, itemsRaw);
    } catch (err) {
      console.error(err);
    }
  });
};