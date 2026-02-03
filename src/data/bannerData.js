import banner1 from '@/assets/images/banner/banner1.jpg';
import banner2 from '@/assets/images/banner/banner2.jpg';
import banner3 from '@/assets/images/banner/banner3.jpg';

export const HERO_SLIDES = [
  {
    id: 1,
    img: banner1,
    title: 'Bộ Sưu Tập Mùa Hè 2026',
    desc: 'Giảm đến 50% cho giày thể thao cao cấp',
    link: '/products?category=Giày',
    btnText: 'Mua Ngay',
    btnClass: 'btn-light',
  },
  {
    id: 2,
    img: banner2,
    title: 'Trang Phục Tập Luyện',
    desc: 'Thoải mái - Thoáng mát - Bền bỉ',
    link: '/products?category=Quần áo',
    btnText: 'Khám Phá',
    btnClass: 'btn-warning',
  },
  {
    id: 3,
    img: banner3,
    title: 'Phụ Kiện Đầy Đủ',
    desc: 'Túi, bình nước và nhiều hơn nữa',
    link: '/products?category=Phụ kiện',
    btnText: 'Xem Thêm',
    btnClass: 'btn-success',
  },
];
