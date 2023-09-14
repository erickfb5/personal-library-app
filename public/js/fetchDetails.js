const fetchDetails = async (bookId) => {
  try {
    const response = await fetch(`/api/books/${bookId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const data = await response.json();
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
  } catch (err) {
    console.error("Error fetching book details:", err);
  }
};