# TB-08 — Merge Conflict Resolution

## 1. Mục tiêu

Tái hiện, phân tích và xử lý Merge Conflict khi hai nhánh cùng thay đổi một vị trí trong mã nguồn; hoàn tất Pull Request mà không ảnh hưởng đến `develop` và `main`.

Repository: [techbugs-hackathon-booking](https://github.com/dieppham999/techbugs-hackathon-booking).

## 2. Tình huống xung đột

Demo được thực hiện trên hai nhánh `demo/title-a` và `demo/title-b`. Hai nhánh có thay đổi khác nhau đối với thẻ `h1` trong `index.html`.

Tiêu đề ban đầu:

```html
<h1>Hackathon TechBugs 2026</h1>
```

Nhánh A:

```html
<h1>TechBugs Challenge 2026</h1>
```

Nhánh B:

```html
<h1>TechBugs Innovation 2026</h1>
```

Khi các thay đổi tại cùng vị trí không tương thích, Git không thể tự quyết định nội dung cần giữ lại. Lập trình viên phải lựa chọn hoặc kết hợp nội dung theo yêu cầu nghiệp vụ.

## 3. Pull Request thực tế

| Thông tin | Giá trị |
| --- | --- |
| Pull Request | [#16 — Demo merge conflict between developer A and B](https://github.com/dieppham999/techbugs-hackathon-booking/pull/16) |
| Base | `demo/title-a` |
| Compare | `demo/title-b` |
| Trạng thái | Merged |
| Thời điểm merge | 11:25:19 ngày 26/11/2026 (UTC+7) |

## 4. Quy trình xử lý

1. Tạo Pull Request từ `demo/title-b` vào `demo/title-a`.
2. Khi GitHub báo conflict, mở **Resolve conflicts** để kiểm tra nội dung xung đột.
3. Xác định nội dung của từng nhánh và lựa chọn tiêu đề của nhánh A.
4. Loại bỏ các dấu phân cách `<<<<<<<`, `=======`, `>>>>>>>` nếu xuất hiện trong trình chỉnh sửa.
5. Chọn **Mark as resolved**, sau đó **Commit merge**.
6. Kiểm tra lại thay đổi và chọn **Merge pull request** để hoàn tất.

Đây là quy trình xử lý conflict trên GitHub; lịch sử commit xác nhận kết quả hợp nhất và nội dung cuối cùng, nhưng không tự xác nhận từng thao tác trên giao diện.

Kết quả cuối cùng được ghi nhận trong commit xử lý:

```html
<h1>TechBugs Challenge 2026</h1>
```

## 5. Bằng chứng lịch sử Git

| Sự kiện | Commit thực tế |
| --- | --- |
| Thay đổi tiêu đề trên nhánh A | [`a4c1ea6`](https://github.com/dieppham999/techbugs-hackathon-booking/commit/a4c1ea63b9514cfdfcadce1cb0eda1fa29da678b) |
| Thay đổi tiêu đề trên nhánh B | [`ffe6450`](https://github.com/dieppham999/techbugs-hackathon-booking/commit/ffe64506e5ba81694d63510b3ecbd5f2c5087db8) |
| Hợp nhất A vào B, giữ tiêu đề của A | [`7299e35`](https://github.com/dieppham999/techbugs-hackathon-booking/commit/7299e35a0669e6c3f424a46a4c9fd1bd2a7a55d0) |
| Merge PR #16 vào nhánh A | [`34b2f1a`](https://github.com/dieppham999/techbugs-hackathon-booking/commit/34b2f1aab402c51337c3e61fa4cfad5ee0935c0a) |

Commit `7299e35` có hai commit cha là `ffe6450` và `a4c1ea6`, xác nhận việc hợp nhất hai nhánh. PR #16 đã được merge thành công.

Kiểm tra lịch sử trên máy local:

```bash
git fetch origin
git log --oneline --graph --decorate origin/demo/title-a origin/demo/title-b
```

## 6. Kiến thức vấn đáp

| Câu hỏi | Trả lời |
| --- | --- |
| Merge Conflict là gì? | Xung đột xảy ra khi Git không thể tự động hợp nhất các thay đổi. |
| Sửa cùng một file có luôn gây conflict không? | Không. Các thay đổi tương thích vẫn có thể được hợp nhất tự động. |
| Current Change và Incoming Change là gì? | Khi merge thông thường ở local, Current là nội dung nhánh đang checkout, Incoming là nội dung nhánh được merge vào. |
| Xử lý conflict ở local như thế nào? | Kiểm tra `git status`, sửa file, lưu, dùng `git add` rồi `git commit` để hoàn tất merge. |
| Hủy merge đang diễn ra thế nào? | Dùng `git merge --abort` khi quá trình merge chưa hoàn tất. |

## 8. Kết luận và phạm vi demo

Các nhánh tính năng chính được tích hợp vào `develop` theo Git Flow mở rộng. Demo TB-08 được thực hiện riêng trên các nhánh `demo/*`, không đưa thay đổi tiêu đề thử nghiệm vào mã nguồn chính.

PR #16 và các commit trên chứng minh việc hợp nhất thành công và nội dung sau xử lý. Ảnh chụp trạng thái conflict thực tế là bằng chứng bổ sung cần có nếu muốn chứng minh GitHub từng báo xung đột. Demo này không khẳng định conflict xảy ra trực tiếp giữa `feature/schedule-table` và `feature/register-form` như tình huống trong đề bài.
