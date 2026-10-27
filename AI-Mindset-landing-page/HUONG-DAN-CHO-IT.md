# Landing page: AI Mindset for SME Leaders & Solopreneurs

## Trong gói này
- `index.html`: toàn bộ trang (HTML + CSS + JS thuần trong một file, không cần build, không phụ thuộc framework)
- `images/`: 15 ảnh JPG mà trang dùng (đường dẫn tương đối `images/...`)
- `preview/`: ảnh chụp toàn trang bản desktop và mobile để đối chiếu khi dựng

## Cách đưa lên domain
1. Upload nguyên thư mục (giữ cấu trúc `index.html` + `images/`) lên hosting tĩnh hoặc web server bất kỳ (Nginx, Apache, Netlify, Vercel, Cloudflare Pages, S3…).
2. Trỏ domain/subdomain về thư mục đó. Không cần backend, database hay cài đặt gì thêm.
3. Nếu muốn dựng lại trên LadiPage/WordPress: dùng `index.html` và ảnh trong `preview/` làm bản mẫu; màu, font, khoảng cách đều nằm trong thuộc tính `style` của từng phần tử.

## Thông số thiết kế
- Font: Inter (Google Fonts, trọng lượng 400–800), tải qua thẻ `<link>` trong `<head>`.
- Màu chính: navy `#1E3A5F`, vàng `#E3BB6B`, teal `#0F6E6B`, nền sáng `#F5F6F2`.
- Responsive: tự co giãn từ điện thoại (~360px) tới desktop; nội dung tối đa rộng 1200px.
- 2 slider ảnh (Cách học, Hỏi đáp cùng mentor) chạy bằng đoạn JS ngắn cuối file; trên điện thoại vuốt ngang được.

## Việc IT cần làm / kiểm tra
- [ ] **Link chính sách ở footer** (Chính sách bảo mật, giao nhận, thanh toán, Điều khoản dịch vụ chung) đang để `href="#"` → thay bằng đường dẫn thật.
- [ ] **Ảnh chia sẻ mạng xã hội (og:image)** đang là đường dẫn tương đối `images/og-cover.jpg` → đổi thành URL đầy đủ sau khi có domain (vd. `https://tenmien.vn/images/og-cover.jpg`) để Facebook/Zalo hiển thị ảnh khi share link.
- [ ] Gắn mã theo dõi nếu cần (Facebook Pixel, Google Analytics/GTM) vào `<head>`.
- [ ] Các nút "Đăng ký ngay" đang dẫn tới form Tally: `https://tally.so/r/aONGoy`. Nút trên thanh menu và nút giữa trang dẫn thẳng tới form; nếu muốn theo dõi chuyển đổi, gắn sự kiện click vào các nút này.
- [ ] Thêm favicon của CLB/công ty nếu có.
- [ ] Bật HTTPS cho domain.
