const deleteBook = () => {
  document.getElementById("bookDetail").addEventListener("click", async (event) => {
    if (event.target && event.target.matches("button.deleteBook")) {
      try {
        const bookId = event.target.id;
        const response = await fetch(`/api/books/${bookId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Error deleting book id: ${bookId}`);
        }

        const data = await response.text();
        const detailComments = document.getElementById("detailComments");
        detailComments.innerHTML = `<p style="color: red;">${data}<p><p>Refresh the page</p>`;
      } catch (err) {
        console.error(err);
      }
    }
  });
};