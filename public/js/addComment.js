const addComment = () => {
  document.getElementById("bookDetail").addEventListener("click", async (event) => {
    if (event.target && event.target.matches("button.addComment")) {
      const newComment = document.getElementById("commentToAdd").value;
      const bookId = event.target.id;

      try {
        const response = await fetch(`/api/books/${bookId}`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `comment=${newComment}`,
        });

        if (!response.ok) {
          throw new Error(`Error adding a comment to book id: ${bookId}`);
        }

        await fetchDetails(bookId);
      } catch (err) {
        console.error(err);
      }
    }
  });
};