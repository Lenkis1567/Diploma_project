import { Link } from 'react-router-dom';

function News() {
  return (
    <main id="content">
      <div className="stickcontent">
        <div className="description" style={{ margin: 'auto' }}>
          <h4>Welcome back!</h4>
          <h4>The rules of the webservice are quite simple:</h4>
          <h4>
            If you want to borrow a book, you just write a message to its owner and wait for their answer.
          </h4>
          <h4>
            If you want to propose your books, you search for them in the form on the{' '}
            <Link to="/add" style={{ textDecoration: 'underline', color: 'black' }}>Add page</Link>, and add yours providing the appropriate age range for the book's
            reader and your comments.
          </h4>
          <h4>
            The only condition: you should be registered and logged in.
          </h4>
        </div>
      </div>
    </main>
  );
}

export default News;