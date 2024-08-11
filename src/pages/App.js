import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "../css/style.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const App = () => {
  const [products, setProducts] = useState([]);
  const [table, setTable] = useState("Dine In");
  const [cart, setCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [cash, setCash] = useState(0);
  const [customer, setCustomer] = useState("");

  const [loading, setLoading] = useState(true);
  const [onSubmit, setOnSubmit] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddToCart = (product) => {
    const newCart = cart.filter((item) => item.productId !== product.productId);
    if (newCart.length === cart.length) {
      setCart([...cart, { ...product, qty: 1 }]);
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, qty: item.qty + 1, price: item.price + item.price };
        }
        return item;
      });

      setCart(updatedCart);
    }

    const total = cart.map((item) => item.price).reduce((a, b) => a + b, 0);
    setTotalCart(total + product.price);
  };

  const handleChangeTable = (table) => {
    setTable(table);
  };

  const handleSaveBill = () => {
    Swal.fire({
      title: "Success",
      text: "Bill saved",
      icon: "success",
    });
  };

  const handleCharge = async (e) => {
    e.preventDefault();

    setOnSubmit(true);

    const data = {
      total: totalCart,
      cash: cash,
      customer: customer,
      table: table,
      carts: cart,
    };

    axios
      .post("http://localhost:5000/api/v1/orders/", data)
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
        });
        setOnSubmit(false);
        setShow(false);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
        setOnSubmit(false);
      });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/products"
        );

        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            {loading ? (
              <div>Loading...</div>
            ) : (
              products.map((product) => (
                <div className="col-md-3 mb-3">
                  <button
                    style={{ textDecoration: "none", border: "none" }}
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                  >
                    <div className="card">
                      <img
                        src="https://picsum.photos/seed/food/500/500"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="container my-1 mt-2">
                        <h5 className="card-title text-center">
                          {product.name + " - " + product.price}
                        </h5>
                      </div>
                    </div>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="col-md-4">
          {/* customer */}
          <div className="row my-3">
            <p className="text-center">New Customer</p>
          </div>
          {/* end customer */}

          {/* table */}
          <div
            className="row text-center p-2"
            style={{ background: "#ffffff" }}
          >
            <div className="dropdown">
              {table}
              <button
                className="dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ border: "none", background: "#ffffff" }}
              ></button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    onClick={() => {
                      handleChangeTable("Take Away");
                    }}
                    className="dropdown-item"
                  >
                    Take Away
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleChangeTable("Dine In");
                    }}
                    className="dropdown-item"
                  >
                    Dine In
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* end table */}

          {/* Purchase */}
          <div className="row p-2 my-2" style={{ background: "#ffffff" }}>
            <div className="col-md-4 col-sm-4">
              <p>Product</p>
            </div>
            <div className="col-md-4 col-sm-4">
              <p>Qty</p>
            </div>
            <div className="col-md-4 col-sm-4">
              <p>Price</p>
            </div>
            {cart.map((product) => (
              <div className="row">
                <div className="col-md-4">
                  <p>{product.name}</p>
                </div>
                <div className="col-md-4">
                  <p>x {product.qty}</p>
                </div>
                <div className="col-md-4">
                  <p>{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          {/* End Purchase */}

          {/* total */}
          <div className="row" style={{ background: "#ffffff" }}>
            <div className="col-md-8">
              <p>Total</p>
            </div>
            <div className="col-md-4">
              <p>{totalCart}</p>
            </div>
          </div>
          {/* end total */}

          <div className="row mt-3">
            <div className="d-block">
              <button
                className="btn btn-secondary me-3"
                style={{ padding: "10px 51px 10px 51px" }}
                onClick={() => {
                  handleSaveBill();
                }}
              >
                Save Bill
              </button>
              <button
                className="btn btn-primary"
                style={{ padding: "10px 51px 10px 51px" }}
              >
                Print Bill
              </button>
            </div>
          </div>

          {/* charge */}
          <div className="row mt-3">
            <button
              className="btn btn-secondary me-3"
              style={{
                padding: "10px 51px 10px 51px",
                backgroundColor: "#485ca1",
              }}
              onClick={handleShow}
            >
              Charge Rp. {totalCart}
            </button>
          </div>
        </div>
      </div>
      {/* modal charge */}
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleCharge}>
          <Modal.Header closeButton>
            <Modal.Title>Charge Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Total Charge
              </label>
              <input
                type="email"
                className="form-control"
                value={totalCart}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Total Cash
              </label>
              <input
                type="number"
                className="form-control"
                value={cash}
                onChange={(e) => {
                  setCash(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Nama Customer
              </label>
              <input
                type="text"
                className="form-control"
                value={customer}
                onChange={(e) => {
                  setCustomer(e.target.value);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button className="btn btn-primary" type="submit">
              {onSubmit ? "Loading..." : "Save"}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      ;
    </div>
  );
};

export default App;
