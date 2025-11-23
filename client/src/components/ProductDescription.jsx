import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { http } from "../lib/http";
import StarRating from "./StarRating";

export default function ProductDescription() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let canceled = false;

    setLoading(true);
    setError(null);

    async function loadProduct() {
      try {
        const res = await http.get(`/products/${id}`);

        if (!canceled) {
          setProduct(res.data.data);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (!canceled) {
          setLoading(false);
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Unable to load product"
          );
        }
      }
    }

    loadProduct();

    return () => {
      canceled = true;
    };
  }, [id]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          {/*================Single Product Area =================*/}
          <div className="product_image_area">
            <div className="container">
              <div className="row s_product_inner">
                <div className="col-lg-6">
                  {/* <ImageGallery images={product.Images} /> */}
                </div>
                <div className="col-lg-5 offset-lg-1">
                  <div className="s_product_text">
                    <h3>{product.name}</h3>
                    <h2>{product.price}</h2>
                    <ul className="list">
                      <li>
                        <a className="active" href="#">
                          <span>Category</span> : {product.Category.name}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>Availibility</span> : In Stock
                        </a>
                      </li>
                    </ul>
                    <p>{product.summary}</p>
                    <div className="product_count">
                      <label htmlFor="qty">Quantity:</label>
                      <input
                        type="text"
                        name="qty"
                        id="sst"
                        maxLength={12}
                        defaultValue={1}
                        title="Quantity:"
                        className="input-text qty"
                      />
                      <button
                        onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;"
                        className="increase items-count"
                        type="button"
                      >
                        <i className="lnr lnr-chevron-up" />
                      </button>
                      <button
                        onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) && sst > 0 ) result.value--;return false;"
                        className="reduced items-count"
                        type="button"
                      >
                        <i className="lnr lnr-chevron-down" />
                      </button>
                    </div>
                    <div className="card_area d-flex align-items-center">
                      <a className="primary-btn" href="#">
                        Add to Cart
                      </a>
                      <a className="icon_btn" href="#">
                        <i className="lnr lnr lnr-diamond" />
                      </a>
                      <a className="icon_btn" href="#">
                        <i className="lnr lnr lnr-heart" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*================End Single Product Area =================*/}
          {/*================Product Description Area =================*/}
          <section className="product_description_area">
            <div className="container">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Description
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Specification
                  </a>
                </li> */}
                {/* <li className="nav-item">
                  <a
                    className="nav-link"
                    id="contact-tab"
                    data-toggle="tab"
                    href="#contact"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                  >
                    Comments
                  </a>
                </li> */}
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="review-tab"
                    data-toggle="tab"
                    href="#review"
                    role="tab"
                    aria-controls="review"
                    aria-selected="false"
                  >
                    Reviews
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  {product.description}
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>
                            <h5>Width</h5>
                          </td>
                          <td>
                            <h5>128mm</h5>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5>Height</h5>
                          </td>
                          <td>
                            <h5>508mm</h5>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5>Depth</h5>
                          </td>
                          <td>
                            <h5>85mm</h5>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5>Weight</h5>
                          </td>
                          <td>
                            <h5>52gm</h5>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5>Quality checking</h5>
                          </td>
                          <td>
                            <h5>yes</h5>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5>Freshness Duration</h5>
                          </td>
                          <td>
                            <h5>03days</h5>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5>When packeting</h5>
                          </td>
                          <td>
                            <h5>Without touch of hand</h5>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5>Each Box contains</h5>
                          </td>
                          <td>
                            <h5>60pcs</h5>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="comment_list">
                        <div className="review_item">
                          <div className="media">
                            <div className="d-flex">
                              <img src="img/product/review-1.png" />
                            </div>
                            <div className="media-body">
                              <h4>Blake Ruiz</h4>
                              <h5>12th Feb, 2018 at 05:56 pm</h5>
                              <a className="reply_btn" href="#">
                                Reply
                              </a>
                            </div>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo
                          </p>
                        </div>
                        <div className="review_item reply">
                          <div className="media">
                            <div className="d-flex">
                              <img src="img/product/review-2.png" />
                            </div>
                            <div className="media-body">
                              <h4>Blake Ruiz</h4>
                              <h5>12th Feb, 2018 at 05:56 pm</h5>
                              <a className="reply_btn" href="#">
                                Reply
                              </a>
                            </div>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo
                          </p>
                        </div>
                        <div className="review_item">
                          <div className="media">
                            <div className="d-flex">
                              <img src="img/product/review-3.png" />
                            </div>
                            <div className="media-body">
                              <h4>Blake Ruiz</h4>
                              <h5>12th Feb, 2018 at 05:56 pm</h5>
                              <a className="reply_btn" href="#">
                                Reply
                              </a>
                            </div>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="review_box">
                        <h4>Post a comment</h4>
                        <form
                          className="row contact_form"
                          action="contact_process.php"
                          method="post"
                          id="contactForm"
                          noValidate="novalidate"
                        >
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Your Full name"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Email Address"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                id="number"
                                name="number"
                                placeholder="Phone Number"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <textarea
                                className="form-control"
                                name="message"
                                id="message"
                                rows={1}
                                placeholder="Message"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="col-md-12 text-right">
                            <button
                              type="submit"
                              value="submit"
                              className="btn primary-btn"
                            >
                              Submit Now
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade show active"
                  id="review"
                  role="tabpanel"
                  aria-labelledby="review-tab"
                >
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row total_rate">
                        <div className="col-6">
                          <div className="box_total">
                            <h5>Overall</h5>
                            <h4>{product.stars}</h4>
                            <h6>({product.Reviews.length} Reviews)</h6>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="rating_list">
                            <h3>Based on {product.Reviews.length} Reviews</h3>
                            <ul className="list">
                              <li>
                                <a href="#">
                                  5 Star <StarRating rating={5} />{" "}
                                  {
                                    product.Reviews.filter((r) => r.stars === 5)
                                      .length
                                  }
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  4 Star <StarRating rating={4} />{" "}
                                  {
                                    product.Reviews.filter((r) => r.stars === 4)
                                      .length
                                  }
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  3 Star <StarRating rating={3} />{" "}
                                  {
                                    product.Reviews.filter((r) => r.stars === 3)
                                      .length
                                  }
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  2 Star <StarRating rating={2} />{" "}
                                  {
                                    product.Reviews.filter((r) => r.stars === 2)
                                      .length
                                  }
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  1 Star <StarRating rating={1} />{" "}
                                  {
                                    product.Reviews.filter((r) => r.stars === 1)
                                      .length
                                  }
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="review_list">
                        {product.Reviews.map((r) => (
                          <div className="review_item" key={r.id}>
                            <div className="media">
                              {/* <div className="d-flex">
                                <img src="img/product/review-1.png" />
                              </div> */}
                              <div className="media-body">
                                <h4>
                                  {r.User.firstName} {r.User.lastName}
                                </h4>
                                <StarRating rating={r.stars} />
                              </div>
                            </div>
                            <p>{r.review}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="review_box">
                        <h4>Add a Review</h4>
                        <p>Your Rating:</p>
                        <ul className="list">
                          <li>
                            <a href="#">
                              <i className="fa fa-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-star" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-star" />
                            </a>
                          </li>
                        </ul>
                        <p>Outstanding</p>
                        <form
                          className="row contact_form"
                          action="contact_process.php"
                          method="post"
                          id="contactForm"
                          noValidate="novalidate"
                        >
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Your Full name"
                                onfocus="this.placeholder = ''"
                                onblur="this.placeholder = 'Your Full name'"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                onfocus="this.placeholder = ''"
                                onblur="this.placeholder = 'Email Address'"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                id="number"
                                name="number"
                                placeholder="Phone Number"
                                onfocus="this.placeholder = ''"
                                onblur="this.placeholder = 'Phone Number'"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <textarea
                                className="form-control"
                                name="message"
                                id="message"
                                rows={1}
                                placeholder="Review"
                                onfocus="this.placeholder = ''"
                                onblur="this.placeholder = 'Review'"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="col-md-12 text-right">
                            <button
                              type="submit"
                              value="submit"
                              className="primary-btn"
                            >
                              Submit Now
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
