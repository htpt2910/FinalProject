## user chọn item -> tạo order, trước lúc tạo order -> lựa chọn hình thức thanh toán (trực tiếp / thông qua vnpay)
## chọn thông qua vnpay

# gửi total price qua cái payment api -> xử lý bên vnpay (chọn ngân hàng, nhập mã thẻ otp vv ở trong mail)
# sau khi bấm hoàn thành sẽ chuyển đến trang xác nhận hoàn thành thanh toán, trả về cho người dùng một url để lưu thông tin thanh toán
# Sau đó thông báo hoàn thành đặt hàng với người dùng
# ở thông tin mỗi order, nếu đã thanh toán thì sẽ có thêm mục "Xem thông tin thanh toán tại "đây" "