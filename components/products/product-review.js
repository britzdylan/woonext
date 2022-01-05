import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductReview({ product, reviews }) {
  const rating = [1, 2, 3, 4, 5];

  const [review, setReview] = useState({
    product_id: '',
    review: '',
    reviewer: '',
    reviewer_email: '',
    rating: null,
  });

  useEffect(() => {
    handleInputChange({ target: { name: 'product_id', value: product.id } });
  }, []);

  async function handleSubmitReview(e) {
    e.preventDefault();

    if (
      review.product_id == '' ||
      review.reviewer_email == '' ||
      review.rating == null ||
      review.review == '' ||
      review.reviewer == ''
    ) {
      alert('Please complete all required fields');
      return;
    }
    try {
      const res = await axios.post('/api/review', review);
      if (res instanceof Error) throw new Error(res);
      alert(res.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  }

  function resetRating(id) {
    for (let i = 5; i > id; i--) {
      const emptyStar = document.getElementById(`star-empty-${i}`);
      const fullStar = document.getElementById(`star-fill-${i}`);
      emptyStar.style.display = 'block';
      fullStar.style.display = 'none';
    }
  }

  function setRating(id) {
    for (let i = 1; i <= id; i++) {
      const emptyStar = document.getElementById(`star-empty-${i}`);
      const fullStar = document.getElementById(`star-fill-${i}`);
      emptyStar.style.display = 'none';
      fullStar.style.display = 'block';
    }
    resetRating(id);
    handleInputChange({ target: { name: 'rating', value: id } });
  }

  return (
    <div className='product-review-container'>
      <h2 className='text-4xl font-bold'>Reviews for {product.name}</h2>
      {reviews.length === 0 ? <p>There are no reviews yet</p> : null}
      {reviews.map((item) => (
        <div
          key={item.id + '_product_review'}
          className='product-single-review my-8  py-4 w-full'>
          <p className='font-bold'>{item.reviewer}</p>
          <div className='review-stars flex flex-row items-center my-2'>
            {rating.map((value) =>
              Number(item.rating) >= value ? (
                <img
                  key={item.id + '_star-rating_' + item.reviewer}
                  className='h-4 w-4 mr-2 cursor-pointer'
                  src='/star.svg'
                />
              ) : null
            )}
          </div>
          <small>{new Date(item.date_created).toDateString()}</small>
          <div
            dangerouslySetInnerHTML={{
              __html: item.review,
            }}
            className='mt-4 w-[650px]'></div>
        </div>
      ))}

      <form className='product-review-form'>
        <h3 className='text-xl font-bold'>Add Review for '{product.name}'</h3>
        <small>
          Your email address will not be published. Required fields are marked *
        </small>

        <label>Your Rating *</label>
        <div className='review-stars flex flex-row items-center'>
          {rating.map((item) => (
            <span key={item + '_star'}>
              <img
                onClick={() => setRating(item)}
                id={`star-empty-` + item}
                className='h-6 w-6 mr-2 cursor-pointer'
                src='/star-empty.svg'
              />
              <img
                onClick={() => setRating(item)}
                id={`star-fill-` + item}
                style={{ display: 'none' }}
                className='h-6 w-6 mr-2 cursor-pointer'
                src='/star.svg'
              />
            </span>
          ))}
        </div>

        <label htmlFor='review'>Your review *</label>
        <textarea
          placeholder='Leave your review here'
          value={review.review}
          className='input'
          rows='5'
          name='review'
          onChange={(e) => handleInputChange(e)}
        />

        <label htmlFor='reviewer'>Name *</label>
        <input
          placeholder='John Doe'
          value={review.reviewer}
          className='input'
          type='text'
          name='reviewer'
          onChange={(e) => handleInputChange(e)}
        />

        <label htmlFor='reviewer_email'>Email *</label>
        <input
          value={review.reviewer_email}
          placeholder='johndoe@example.com'
          className='input'
          type='text'
          name='reviewer_email'
          onChange={(e) => handleInputChange(e)}
        />

        <button
          onClick={(e) => handleSubmitReview(e)}
          className='btn-primary mt-8'>
          Submit
        </button>
      </form>
    </div>
  );
}
