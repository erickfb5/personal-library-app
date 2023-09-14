const displayBooks = (itemsRaw) => {
  document.getElementById("display").addEventListener("click", async (event) => {
    if (event.target && event.target.matches("li.bookItem")) {
      try {
        const itemId = event.target.id;
        await fetchDetails(itemsRaw[itemId]._id);
      } catch (err) {
        console.error(err);
      }
    }
  });
};