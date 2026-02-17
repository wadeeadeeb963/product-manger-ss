import { useState, useEffect } from "react";

export default function ProductManager() {
  // ✅ قراءة البيانات من localStorage عند التحميل
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // ✅ حفظ البيانات في localStorage عند أي تغيير
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // CREATE + UPDATE
  function handleAddOrUpdateProduct() {

    if (editId === null) {
      // CREATE
      const newProduct = {
        id: Date.now(),
        name,
        price: Number(price),
        stock: Number(stock),
      };
      setProducts([...products, newProduct]);
    } else {
      // UPDATE
      const updatedProducts = products.map((product) =>
        product.id === editId
          ? { ...product, name, price: Number(price), stock: Number(stock) }
          : product
      );
      setProducts(updatedProducts);
      setEditId(null);
    }

    setName("");
    setPrice("");
    setStock("");
  }

  // DELETE
  function handleDeleteProduct(idToDelete) {
    setProducts(products.filter((product) => product.id !== idToDelete));
  }

  // EDIT
  function handleEditProduct(product) {
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
    setEditId(product.id);
  }

  // SEARCH
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // CLEAR ALL (اختياري)
  function handleClearAll() {
    localStorage.removeItem("products");
    setProducts([]);
  }

  return (
    <div className="container">
      <h2>Product Manager</h2>

      {/* Form */}
      <div className="form">
        <input
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="الكمية"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button onClick={handleAddOrUpdateProduct}>
          {editId === null ? "إضافة" : "حفظ"}
        </button>
      </div>

      {/* Search */}
      <input
        className="search"
        placeholder="🔍 ابحث عن منتج..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>اسم المنتج</th>
            <th>السعر</th>
            <th>الكمية</th>
            <th>الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty">
                لا توجد نتائج
              </td>
            </tr>
          ) : (
            filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td className="actions">
                  <button
                    className="edit"
                    onClick={() => handleEditProduct(product)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

Wadeea Deeb, [09/02/2026 07:26 م]
{/* زر مسح كل البيانات */}
      {products.length > 0 && (
        <button
          onClick={handleClearAll}
          style={{
            marginTop: "15px",
            backgroundColor: "#ef4444",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          مسح جميع المنتجات
        </button>
      )}
    </div>
  );
}