import { useEffect, useState } from 'react';
import CategoryTable from '../components/CategoryTable';
import categoryService from '../services/categoryService';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm!');
        console.error(err);
      }
    };
    fetchCategories();
  }, []);
  return (
    <>
      <CategoryTable categories={categories} />
    </>
  );
};

export default Category;
