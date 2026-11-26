'use strict';

// Phí đăng ký cho mỗi thành viên.
const MEMBER_FEE = 100000;

// Tỷ lệ giảm giá khi đăng ký sớm.
const EARLY_BIRD_DISCOUNT = 10;

// Mã khuyến mãi hợp lệ.
const VALID_PROMO_CODE = 'TECHBUGS20';

// Tỷ lệ giảm giá của mã khuyến mãi.
const PROMO_DISCOUNT = 20;

// Giới hạn kỹ thuật để tránh vòng lặp quá lớn.
const MAX_MEMBERS = 10000;


/**
 * Kiểm tra số lượng thành viên hợp lệ.
 */
function isValidMemberCount(memberCount) {
    return Number.isInteger(memberCount)
        && memberCount > 0
        && memberCount <= MAX_MEMBERS;
}


/**
 * Tính phí đăng ký theo Flowchart TB-01.
 *
 * Độ phức tạp thời gian: O(n).
 * Độ phức tạp bộ nhớ phụ: O(1).
 */
function calculateRegistrationFee(memberCount, isEarlyBird, promoCode) {

    // Kiểm tra số lượng thành viên.
    if (!isValidMemberCount(memberCount)) {
        return null;
    }

    let originalFee = 0;
    let discountRate = 0;

    // Sử dụng vòng lặp theo đúng yêu cầu TB-01.
    // Mỗi lần lặp cộng phí của một thành viên.
    for (let i = 0; i < memberCount; i++) {
        originalFee += MEMBER_FEE;
    }

    // Loại bỏ khoảng trắng đầu và cuối mã.
    promoCode = promoCode.trim();

    // Kiểm tra mã khuyến mãi.
    const isPromoValid = promoCode === VALID_PROMO_CODE;

    // Ưu tiên mã khuyến mãi hợp lệ.
    if (isPromoValid) {
        discountRate = PROMO_DISCOUNT;
    } else if (isEarlyBird) {

        // Nếu không có mã hợp lệ, kiểm tra Early Bird.
        discountRate = EARLY_BIRD_DISCOUNT;
    }

    // Tính số tiền được giảm.
    const discountFee = originalFee * discountRate / 100;

    // Tính tổng phí cuối cùng.
    const totalFee = originalFee - discountFee;

    // Trả về kết quả dưới dạng Object.
    return {
        originalFee,
        discountRate,
        discountFee,
        totalFee,
        isPromoValid
    };
}


/**
 * Định dạng số tiền theo định dạng Việt Nam.
 */
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + ' VNĐ';
}


// Chờ trình duyệt phân tích xong HTML.
document.addEventListener('DOMContentLoaded', function () {

    // Lấy các phần tử cần sử dụng trong DOM.
    const memberInput = document.getElementById('member-count');
    const earlyBirdInput = document.getElementById('early-bird');
    const promoInput = document.getElementById('promo-code');

    const memberError = document.getElementById('member-count-error');
    const promoMessage = document.getElementById('promo-message');

    const originalFeeElement = document.getElementById('original-fee');
    const discountFeeElement = document.getElementById('discount-fee');
    const totalFeeElement = document.getElementById('total-fee');

    // Dừng xử lý nếu chưa có giao diện tính phí.
    if (!memberInput) {
        return;
    }

    /**
     * Cập nhật kết quả tính phí trên giao diện.
     */
    function updateFee() {

        // Chuyển giá trị input từ String sang Number.
        const memberCount = memberInput.valueAsNumber;

        // Lấy trạng thái checkbox Early Bird.
        const isEarlyBird = earlyBirdInput.checked;

        // Lấy mã khuyến mãi.
        const promoCode = promoInput.value.trim();

        // Gọi hàm tính phí.
        const result = calculateRegistrationFee(
            memberCount,
            isEarlyBird,
            promoCode
        );

        // Kiểm tra số lượng thành viên không hợp lệ.
        if (result === null) {

            memberError.textContent =
                'Vui lòng nhập số nguyên từ 1 đến 10.000.';

            memberError.hidden = false;

            memberInput.setAttribute('aria-invalid', 'true');

            // Xóa kết quả cũ để tránh hiển thị sai.
            originalFeeElement.textContent = '—';
            discountFeeElement.textContent = '—';
            totalFeeElement.textContent = '—';

            promoMessage.textContent = '';
            promoMessage.className = '';

            return false;
        }

        // Xóa thông báo lỗi khi dữ liệu hợp lệ.
        memberError.textContent = '';
        memberError.hidden = true;

        memberInput.removeAttribute('aria-invalid');

        // Hiển thị trạng thái mã khuyến mãi.
        if (promoCode === '') {

            promoMessage.textContent = '';
            promoMessage.className = '';

        } else if (result.isPromoValid) {

            promoMessage.textContent =
                'Mã khuyến mãi hợp lệ! Giảm 20%.';

            promoMessage.className = 'success';

        } else {

            promoMessage.textContent =
                'Mã khuyến mãi không hợp lệ.';

            promoMessage.className = 'field-error';
        }

        // Hiển thị kết quả tính phí.
        originalFeeElement.textContent =
            formatCurrency(result.originalFee);

        discountFeeElement.textContent =
            formatCurrency(result.discountFee);

        totalFeeElement.textContent =
            formatCurrency(result.totalFee);

        return true;
    }

    // Tự động tính lại khi thay đổi số thành viên.
    memberInput.addEventListener('input', updateFee);

    // Tự động tính lại khi chọn Early Bird.
    earlyBirdInput.addEventListener('change', updateFee);

    // Tự động tính lại khi nhập mã khuyến mãi.
    promoInput.addEventListener('input', updateFee);

    // Tính phí ngay khi trang web được tải.
    updateFee();
});