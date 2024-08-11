import { useEffect, useState } from "react";
import "../css/style.css";
import Swal from "sweetalert2";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [table, setTable] = useState("Dine In");
  const [cart, setCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  const handleAddToCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
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

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "Product 1",
        price: 10000,
        stock: 10,
      },
      {
        id: 2,
        name: "Product 2",
        price: 20000,
        stock: 20,
      },
      {
        id: 3,
        name: "Product 3",
        price: 30000,
        stock: 30,
      },
      {
        id: 4,
        name: "Product 4",
        price: 40000,
        stock: 40,
      },
      {
        id: 5,
        name: "Product 5",
        price: 50000,
        stock: 50,
      },
      {
        id: 6,
        name: "Product 6",
        price: 60000,
        stock: 60,
      },
      {
        id: 7,
        name: "Product 7",
        price: 70000,
        stock: 70,
      },
      {
        id: 8,
        name: "Product 8",
        price: 80000,
        stock: 80,
      },
    ];

    setProducts(data);
    setLoading(false);
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
                          {product.name}
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
            >
              Charge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
