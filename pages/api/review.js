import { postProductReview } from '../../lib/wc_api';

export default async function reviewHandler(req, res) {
  const { method, body } = req;
  if (method == 'POST') {
    try {
      const response = await postProductReview(body);
      // handle errrors
      if (response instanceof Error) throw new Error(response);

      // handle bad requests
      if (response.status != 201) {
        res.status(response.status).send({ message: response.data.message });
        return;
      }

      // handle sucecess
      res
        .status(response.status)
        .send({ message: 'Review successfully created' });
      return;
    } catch (error) {
      res.status(500).send({ message: 'Oops! Something went wrong' });
      return;
    }
  }
}
