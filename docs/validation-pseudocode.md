# TB-02 — Pseudo-code xác thực form đăng ký TechBugs

## 1. Mục tiêu

Thiết kế thuật toán kiểm tra độ dài mật khẩu và tính hợp lệ của email trước khi gửi form đăng ký; phân tích độ phức tạp thời gian và không gian.

## 2. Quy tắc xác thực

Đề bài không nêu độ dài mật khẩu tối thiểu hoặc quy tắc email cụ thể. Bài thực hành giả định:

- Mật khẩu có tối thiểu 8 ký tự; không tự động cắt khoảng trắng mật khẩu.
- Email không rỗng, không chứa khoảng trắng, có đúng một ký tự `@`.
- Phần trước và sau `@` không rỗng.
- Phần tên miền có ít nhất một dấu chấm, không bắt đầu hoặc kết thúc bằng dấu chấm và không có hai dấu chấm liên tiếp.
- Đây là kiểm tra định dạng đơn giản phục vụ bài tập, không phải kiểm tra đầy đủ chuẩn email hay xác minh hộp thư tồn tại.

## 3. Pseudo-code kiểm tra mật khẩu

```text
FUNCTION isValidPassword(password)
    IF LENGTH(password) < 8 THEN
        RETURN FALSE
    END IF
    RETURN TRUE
END FUNCTION
```

## 4. Pseudo-code kiểm tra email

```text
FUNCTION isValidEmail(email)
    n = LENGTH(email)
    IF n == 0 THEN
        RETURN FALSE
    END IF

    atIndex = -1
    hasDomainDot = FALSE

    FOR i = 0 TO n - 1 DO
        ch = email[i]

        IF IS_WHITESPACE(ch) THEN
            RETURN FALSE
        END IF

        IF ch == '@' THEN
            IF atIndex != -1 OR i == 0 OR i == n - 1 THEN
                RETURN FALSE
            END IF
            atIndex = i
        ELSE IF atIndex != -1 AND ch == '.' THEN
            IF i == atIndex + 1 OR i == n - 1 THEN
                RETURN FALSE
            END IF
            IF email[i - 1] == '.' THEN
                RETURN FALSE
            END IF
            hasDomainDot = TRUE
        END IF
    END FOR

    RETURN atIndex != -1 AND hasDomainDot
END FUNCTION
```

## 5. Pseudo-code xử lý form

```text
BEGIN
    INPUT email, password

    emailValid = isValidEmail(email)
    passwordValid = isValidPassword(password)

    IF NOT emailValid THEN
        DISPLAY "Email không hợp lệ"
    END IF

    IF NOT passwordValid THEN
        DISPLAY "Mật khẩu phải có ít nhất 8 ký tự"
    END IF

    IF emailValid AND passwordValid THEN
        DISPLAY "Email và mật khẩu hợp lệ"
        CONTINUE kiểm tra các trường bắt buộc khác
        IF tất cả trường khác hợp lệ THEN
            ALLOW_SUBMIT
        ELSE
            PREVENT_SUBMIT
        END IF
    ELSE
        PREVENT_SUBMIT
    END IF
END
```

Các trường khác như tên đội, bảng thi đấu và kỹ năng thuộc phạm vi form TB-07. Đề bài không quy định chi tiết trường nào bắt buộc ngoài nội dung xác thực của TB-02; bước trên chỉ biểu thị điểm tích hợp, không phải thuật toán hoàn chỉnh cho TB-07.

## 6. Phân tích Big O

Gọi n là độ dài email, m là độ dài mật khẩu.

| Thuật toán | Thời gian (xấu nhất) | Bộ nhớ phụ |
|---|---|---|
| isValidPassword | O(1) nếu LENGTH được lưu sẵn; O(m) nếu phải duyệt chuỗi | O(1) |
| isValidEmail | O(n) | O(1) |
| Kiểm tra email và mật khẩu | O(n) nếu LENGTH là O(1); O(n + m) nếu phải duyệt mật khẩu | O(1) |

Thuật toán email duyệt chuỗi tối đa một lần, không tạo chuỗi con và chỉ dùng một số biến cố định. Bộ nhớ đầu vào không tính vào bộ nhớ phụ. Phân tích giả định truy cập ký tự theo chỉ số là O(1).

## 7. Ca kiểm thử dự kiến

| Email | Mật khẩu mẫu | Kết quả |
|---|---|---|
| team@techbugs.vn | abc12345 | Hợp lệ |
| team@techbugs.vn | abc123 | Lỗi mật khẩu |
| teamtechbugs.vn | abc12345 | Lỗi email |
| team@@techbugs.vn | abc12345 | Lỗi email |
| @techbugs.vn | abc12345 | Lỗi email |
| team@techbugs | abc12345 | Lỗi email |
| team@.vn | abc12345 | Lỗi email |
| team@techbugs..vn | abc12345 | Lỗi email |
| team@techbugs.vn. | abc12345 | Lỗi email |
| team name@techbugs.vn | abc12345 | Lỗi email |
| Rỗng | Rỗng | Lỗi cả hai |

## 8. Áp dụng khi xây dựng HTML

Sử dụng `type="email"`, `type="password"`, `required` và `minlength="8"` cho hai trường tương ứng. Có thể bổ sung JavaScript để thực hiện quy tắc trên và hiển thị thông báo cụ thể. Nếu triển khai hệ thống thực tế, cần xác thực lại ở backend; kiểm tra phía frontend không thay thế xác thực phía server.
