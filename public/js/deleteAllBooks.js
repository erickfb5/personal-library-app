const deleteAllBooks = (items, itemsRaw) => {
    document.getElementById("deleteAllBooks").addEventListener("click", async () => {
      try {
        const response = await fetch("/api/books", {
          method: "DELETE",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
  
        if (!response.ok) {
          throw new Error("Error deleting all books");
        }
  
        await fetchBooksList(items, itemsRaw);
      } catch (err) {
        console.error(err);
      }
    });
  };