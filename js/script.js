'use strict';

// TB-02: Kiểm tra mật khẩu, không cắt khoảng trắng của mật khẩu.
function isValidPassword(password) {
    return password.length >= 8;
}

// TB-02: Duyệt email đúng một lần theo pseudo-code.
// Thời gian O(n), bộ nhớ phụ O(1).
function isValidEmail(email) {
    const n = email.length;
    if (n === 0) return false;

    let atIndex = -1; // -1 nghĩa là chưa tìm thấy ký tự @.
    let hasDomainDot = false; // Đã tìm thấy dấu chấm trong tên miền chưa?

    for (let i = 0; i < n; i++) {
        const ch = email[i];

        // Không cho phép khoảng trắng trong email.
        if (/\s/.test(ch)) return false;

        if (ch === '@') {
            // Không được có hai @, hoặc @ ở đầu/cuối email.
            if (atIndex !== -1 || i === 0 || i === n - 1) {
                return false;
            }
            atIndex = i;
        } else if (atIndex !== -1 && ch === '.') {
            // Tên miền không bắt đầu/kết thúc bằng dấu chấm.
            // Không cho phép hai dấu chấm liên tiếp trong tên miền.
            if (i === atIndex + 1 || i === n - 1 || email[i - 1] === '.') {
                return false;
            }
            hasDomainDot = true;
        }
    }

    // Email phải có @ và ít nhất một dấu chấm trong tên miền.
    return atIndex !== -1 && hasDomainDot;
}

// TB-07: Xác thực từng trường và hiển thị lỗi ngay bên dưới.
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    if (!form) return;
    const team = document.getElementById('team-name');
    const leader = document.getElementById('leader-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const tracks = Array.from(form.querySelectorAll('input[name="track"]'));
    const skills = Array.from(form.querySelectorAll('input[name="skills"]'));

    // Tắt popup mặc định để dùng thông báo inline của JavaScript.
    form.noValidate = true;

    // Giữ vùng thông báo chung chỉ để hiển thị kết quả hợp lệ.
    let message = document.getElementById('form-message');
    if (!message) {
        message = document.createElement('p');
        message.id = 'form-message';
        form.querySelector('button[type="submit"]').before(message);
    }
    message.setAttribute('role', 'status');

    // Mỗi trường hoặc nhóm có hàm kiểm tra và vị trí hiển thị riêng.
    const fields = [
        { inputs: [team], anchor: team, check: () => team.value.trim() ? '' : 'Tên đội thi không được để trống.' },
        { inputs: [leader], anchor: leader, check: () => leader.value.trim() ? '' : 'Tên đội trưởng không được để trống.' },
        { inputs: [email], anchor: email, check: () => !email.value ? 'Vui lòng nhập email.' : (!isValidEmail(email.value) || email.validity.typeMismatch ? 'Email không hợp lệ (ví dụ: team@techbugs.vn).' : '') },
        { inputs: [password], anchor: password, check: () => isValidPassword(password.value) ? '' : 'Mật khẩu phải có ít nhất 8 ký tự.' },
        { inputs: tracks, anchor: tracks[0].closest('.form-options'), check: () => tracks.some(input => input.checked) ? '' : 'Vui lòng chọn bảng thi đấu.' },
        { inputs: skills, anchor: skills[0].closest('.form-options'), check: () => skills.some(input => input.checked) ? '' : 'Vui lòng chọn ít nhất một kỹ năng.' }
    ];

    // Tạo phần tử thông báo ngay sau input hoặc nhóm radio/checkbox.
    fields.forEach(function (field) {
        const error = document.createElement('span');
        error.id = field.inputs[0].id + '-error';
        error.className = 'field-error';
        error.setAttribute('aria-live', 'polite');
        error.hidden = true;
        field.anchor.after(error);
        field.error = error;
        field.touched = false;

        // Liên kết thông báo với input, giữ lại mô tả có sẵn nếu có.
        field.inputs.forEach(function (input) {
            const ids = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
            if (!ids.includes(error.id)) ids.push(error.id);
            input.setAttribute('aria-describedby', ids.join(' '));
        });
    });

    // Hiển thị hoặc xóa lỗi của đúng trường đang kiểm tra.
    function validate(field) {
        const error = field.check();
        field.error.textContent = error;
        field.error.hidden = !error;
        field.inputs.forEach(function (input) {
            if (error) input.setAttribute('aria-invalid', 'true');
            else input.removeAttribute('aria-invalid');
        });
        return !error;
    }

    // Kiểm tra khi rời ô nhập; sau khi đã kiểm tra, cập nhật khi gõ.
    fields.forEach(function (field) {
        field.inputs.forEach(function (input) {
            const isChoice = input.type === 'radio' || input.type === 'checkbox';
            input.addEventListener(isChoice ? 'change' : 'input', function () {
                message.textContent = '';
                message.className = '';
                if (isChoice) field.touched = true;
                if (field.touched) validate(field);
            });
            if (!isChoice) input.addEventListener('blur', function () {
                field.touched = true;
                validate(field);
            });
        });
    });

    // Khi submit, kiểm tra toàn bộ trường, không dừng ở lỗi đầu tiên.
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Chưa có backend nên không gửi dữ liệu.
        message.textContent = '';
        message.className = '';
        let firstInvalid = null;
        fields.forEach(function (field) {
            field.touched = true;
            if (!validate(field) && !firstInvalid) firstInvalid = field.inputs[0];
        });
        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }
        message.className = 'success';
        message.textContent = 'Dữ liệu hợp lệ! Bản demo chưa gửi thông tin đến máy chủ.';
    });
});
