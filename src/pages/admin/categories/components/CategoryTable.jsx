const CategoryTable = ({ categories }) => {
  console.log(categories);
  return (
    <>
      <div className="m-2 bg-white rounded-3 mb-3">
        <table className="table table-bordered">
          <thead>
            <tr className="text-center text-white">
              <th className="bg-primary text-white">ID</th>
              <th className="bg-primary text-white">Tên loại sản phẩm</th>
              <th className="bg-primary text-white">Thứ tự hiện thị</th>
              <th className="bg-primary text-white">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td className="text-center">{category.id}</td>
                <td>{category.name}</td>
                <td className="text-center">{category.displayOrder}</td>
                <td className="text-center">
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-warning mx-1" title="Sửa">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger mx-1" title="Xóa">
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryTable;
