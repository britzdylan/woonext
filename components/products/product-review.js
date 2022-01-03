export default function ProductReview() {
  return (
    <div className='product-review-container'>
      <h2 className='text-4xl font-bold'>Reviews</h2>
      <p>There are no reviews yet</p>
      <div className='product-single-review my-8 border-t border-b border-gray-200 py-4'>
        <p className='font-bold'>Dylan Britz</p>
        <small>April 30th 2021</small>
        <p className='mt-4'>This is a review of the product, kapish</p>
      </div>
      <form className='product-review-form'>
        <h3 className='text-xl font-bold'>Review 'Product Name'</h3>
        <small>
          Your email address will not be published. Required fields are marked *
        </small>
        <label>Your Rating *</label>
        <div className='review-stars'></div>
        <label htmlFor='review'>Your review *</label>
        <textarea className='input' rows='5' />
        <label htmlFor=''>Name *</label>
        <input className='input' type='text' />
        <label htmlFor=''>Email *</label>
        <input className='input' type='text' />
        <button className='btn-primary mt-8'>Submit</button>
      </form>
    </div>
  );
}
