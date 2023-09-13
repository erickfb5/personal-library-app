document.addEventListener("DOMContentLoaded", () => {
  // Define arrays to store book data
  let items = [];
  let itemsRaw = [];

  const getBooksList = () => {
    // Clear the existing list
    const display = document.getElementById("display");
    display.innerHTML = "";

    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => {
        itemsRaw = data;
        items = data
          .slice(0, 15)
          .map(
            (book, index) =>
              `<li class="bookItem" id="${index}">${book.title} - ${book.commentcount} comments</li>`
          );

        if (data.length >= 15)
          items.push(`<p>...and ${data.length - 15} more!</p>`);

        const ul = document.createElement("ul");
        ul.className = "listWrapper";
        ul.innerHTML = items.join("");
        display.appendChild(ul);
      })
      .catch((err) => console.error("Error fetching books:", err));
  };

  // Function to fetch book details and comments
  const fetchBookDetails = (bookId) => {
    fetch(`/api/books/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        const comments = data.comments.map((comment) => `<li>${comment}</li>`);
        comments.push(
          `<br><form id="newCommentForm"><input style="width:300px" type="text" class="form-control" id="commentToAdd" name="comment" placeholder="New Comment"></form>`,
          `<br><button class="btn btn-info addComment" id="${data._id}">Add Comment</button>`,
          `<button class="btn btn-danger deleteBook" id="${data._id}">Delete Book</button>`
        );

        const detailTitle = document.getElementById("detailTitle");
        detailTitle.innerHTML = `<b>${data.title}</b> (id: ${data._id})`;

        const detailComments = document.getElementById("detailComments");
        detailComments.innerHTML = comments.join("");
      })
      .catch((err) => console.error("Error fetching book details:", err));
  };

  // Event listener for clicking on book items
  document.getElementById("display").addEventListener("click", (event) => {
    if (event.target && event.target.matches("li.bookItem")) {
      const itemId = event.target.id;
      fetchBookDetails(itemsRaw[itemId]._id);
    }
  });

  // Event listener for deleting a book
  document.getElementById("bookDetail").addEventListener("click", (event) => {
    if (event.target && event.target.matches("button.deleteBook")) {
      const bookId = event.target.id;
      fetch(`/api/books/${bookId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.text(); // Read the response body as text
        })
        .then((data) => {
          const detailComments = document.getElementById("detailComments");
          detailComments.innerHTML = `<p style="color: red;">${data}<p><p>Refresh the page</p>`;
        })
        .catch((err) => console.error(`Error deleting book id: ${bookId}`, err));
    } else if (event.target && event.target.matches("button.addComment")) {
      const newComment = document.getElementById("commentToAdd").value;
      const bookId = event.target.id;
      fetch(`/api/books/${bookId}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `comment=${newComment}`,
      })
        .then((response) => response.json())
        .then(() => fetchBookDetails(bookId))
        .catch((err) =>
          console.error(`Error adding a comment to book id: ${bookId}`, err)
        );
    }
  });

  // Event listener for submitting a new book
  document.getElementById("newBookForm").addEventListener("submit", (event) => {
    event.preventDefault();
    let newBookTitle = document.getElementById("newBookTitle").value;
    const title = JSON.stringify({ title: newBookTitle }); 

    fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: title,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(() => {
        newBookTitle = "";
        getBooksList();
      })
      .catch((err) => console.error("Error submitting new book title", err));
  });

  // Event listener for deleting all books
  document.getElementById("deleteAllBooks").addEventListener("click", () => {
    fetch("/api/books", {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then(() => getBooksList())
      .catch((err) => console.error("Error deleting all books:", err));
  });

  // Initial load of books
  getBooksList();
});
