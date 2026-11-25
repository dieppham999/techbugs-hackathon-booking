# TechBugs Hackathon – Registration & Smart Booking

## Giới thiệu

Mini Project xây dựng Landing Page đăng ký và quản lý sự kiện Hackathon TechBugs bằng HTML, CSS và Git. Trang web giới thiệu sự kiện, hiển thị lịch trình 2 ngày và cung cấp biểu mẫu đăng ký đội thi có xác thực dữ liệu.

> **Lưu ý:** Tiêu đề đề bài có nhắc đến *Cinema POS & Smart Booking*, nhưng nội dung và các task thực tế tập trung vào hệ thống đăng ký Hackathon TechBugs.

## Mục tiêu

- Thiết kế flowchart tính phí và pseudo-code xác thực form trước khi lập trình giao diện.
- Xây dựng trang web với Semantic HTML, menu điều hướng và giao diện gọn gàng.
- Tạo bảng lịch trình 2 ngày sử dụng `rowspan` và `colspan`.
- Tạo form đăng ký đội thi với các trường và nhóm lựa chọn phù hợp.
- Quản lý mã nguồn bằng Git, làm việc trên hai nhánh tính năng và xử lý merge conflict.

## Product Backlog

| Task | Công việc | Yêu cầu chính |
| --- | --- | --- |
| TB-01 | Flowchart tính phí | Lặp theo số thành viên; xét Early Bird và mã khuyến mãi. |
| TB-02 | Pseudo-code validation | Kiểm tra độ dài mật khẩu, email hợp lệ; phân tích Big O. |
| TB-03 | Khởi tạo Git/GitHub | Tạo repository, `index.html`, commit khởi tạo và push. |
| TB-04 | Semantic HTML & Menu | Dùng `header`, `nav`, `main`, `section`, `footer`; menu `ul > li > a`. |
| TB-05 | Tạo nhánh | `feature/schedule-table` và `feature/register-form` từ `main`. |
| TB-06 | Bảng lịch trình | Lịch 2 ngày, sử dụng `rowspan` và `colspan`. |
| TB-07 | Form đăng ký | `fieldset`, `legend`, `label`; input text, email, radio và checkbox. |
| TB-08 | Merge & Conflict | Merge hai nhánh vào `main`; tái hiện, xử lý và chứng minh conflict. |

## Chức năng chính

1. **Tính phí đăng ký:** Dựa trên số lượng thành viên, xét điều kiện Early Bird hoặc mã khuyến mãi theo quy tắc sẽ được xác định trong TB-01.
2. **Landing Page:** Các khu vực Trang chủ, Lịch trình và Đăng ký, có liên kết điều hướng.
3. **Lịch trình Hackathon:** Bảng lịch 2 ngày, gộp ô đúng ngữ nghĩa.
4. **Đăng ký đội thi:** Thu thập thông tin đội, email, bảng thi đấu và kỹ năng; kiểm tra dữ liệu nhập.
5. **Git workflow:** Phát triển độc lập trên hai nhánh, hợp nhất và giải quyết xung đột.

## Cấu trúc thư mục dự kiến

```text
techbugs-hackathon-booking/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── docs/
│   ├── fee-flowchart.md
│   └── validation-pseudocode.md
└── README.md
```

Các file CSS, JavaScript và tài liệu được bổ sung trong quá trình thực hiện nếu cần.

## Quy trình Git

- `main`: Nhánh chính của dự án.
- `feature/schedule-table`: Phát triển bảng lịch trình.
- `feature/register-form`: Phát triển form đăng ký.
- Merge lần lượt hai nhánh vào `main`, giải quyết conflict khi phát sinh và lưu bằng chứng Git graph.

Ví dụ commit theo Conventional Commits:

```bash
git commit -m "init: setup project"
git commit -m "feat: add schedule table"
git commit -m "feat: add registration form"
```

## Tiêu chí hoàn thành (Definition of Done)

- [ ] Flowchart tính phí hoàn chỉnh, có cấu trúc lặp và điều kiện.
- [ ] Pseudo-code kiểm tra mật khẩu, email và phân tích Big O.
- [ ] Giao diện HTML/CSS hiển thị ổn định, không vỡ bố cục.
- [ ] Sử dụng đúng Semantic HTML và các thẻ form cần thiết.
- [ ] Bảng lịch trình 2 ngày có `rowspan` và `colspan`.
- [ ] Có hai nhánh tính năng và các commit rõ ràng.
- [ ] Merge thành công, giải thích và demo được cách xử lý conflict.
- [ ] Push mã nguồn và tài liệu lên GitHub.

## Ghi chú

Đề bài chưa quy định mức phí, công thức giảm giá, thời hạn Early Bird, danh sách mã khuyến mãi hoặc giới hạn thành viên. Các giá trị này cần được xác định khi thiết kế TB-01, không tự coi là yêu cầu đã có sẵn.
