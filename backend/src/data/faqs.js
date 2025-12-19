const faqs = [
    // --- CHỦ ĐỀ: TÀI KHOẢN ---
    {
        question: "Tôi quên mật khẩu thì phải làm sao?",
        answer: "Bạn vui lòng chọn 'Đăng nhập' sau đó nhấn vào dòng 'Quên mật khẩu'. Nhập email đã đăng ký để nhận đường dẫn khôi phục mật khẩu.",
        isActive: true
    },
    {
        question: "Làm thế nào để thay đổi thông tin cá nhân?",
        answer: "Đăng nhập vào tài khoản, chọn mục 'Hồ sơ của tôi'. Tại đây bạn có thể chỉnh sửa tên, số điện thoại và địa chỉ giao hàng.",
        isActive: true
    },
    {
        question: "Tôi có thể xóa tài khoản vĩnh viễn không?",
        answer: "Có. Vui lòng gửi yêu cầu xóa tài khoản đến email support@domain.com, chúng tôi sẽ xử lý trong vòng 48h làm việc.",
        isActive: true
    },

    // --- CHỦ ĐỀ: ĐẶT HÀNG ---
    {
        question: "Tôi có cần tài khoản để đặt hàng không?",
        answer: "Không bắt buộc. Bạn có thể đặt hàng dưới dạng 'Khách' (Guest). Tuy nhiên, đăng ký tài khoản sẽ giúp bạn theo dõi đơn hàng dễ dàng hơn và tích điểm.",
        isActive: true
    },
    {
        question: "Làm sao để biết đơn hàng đã đặt thành công?",
        answer: "Sau khi hoàn tất thanh toán, màn hình sẽ hiển thị thông báo thành công kèm mã đơn hàng. Đồng thời, một email xác nhận sẽ được gửi đến hộp thư của bạn.",
        isActive: true
    },
    {
        question: "Tôi muốn thay đổi địa chỉ giao hàng sau khi đã đặt?",
        answer: "Nếu đơn hàng ở trạng thái 'Đang xử lý', bạn có thể liên hệ hotline để đổi. Nếu đã chuyển sang 'Đang giao', chúng tôi không thể thay đổi địa chỉ.",
        isActive: true
    },
    {
        question: "Quy định mua hàng số lượng lớn (B2B)?",
        answer: "Với đơn hàng số lượng lớn, vui lòng liên hệ bộ phận kinh doanh để nhận báo giá chiết khấu riêng.",
        isActive: true
    },

    // --- CHỦ ĐỀ: THANH TOÁN ---
    {
        question: "Cửa hàng có hỗ trợ trả góp không?",
        answer: "Có, chúng tôi hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng cho đơn hàng từ 3.000.000 VNĐ trở lên.",
        isActive: true
    },
    {
        question: "Tôi có thể xuất hóa đơn VAT (hóa đơn đỏ) không?",
        answer: "Có. Tại bước thanh toán, vui lòng tích chọn 'Xuất hóa đơn công ty' và điền đầy đủ Mã số thuế, Tên công ty, Địa chỉ.",
        isActive: true
    },
    {
        question: "Tại sao thẻ của tôi bị từ chối?",
        answer: "Vui lòng kiểm tra lại số dư, hạn mức thanh toán online hoặc thời hạn của thẻ. Nếu vẫn lỗi, hãy liên hệ ngân hàng phát hành thẻ.",
        isActive: true
    },
    {
        question: "Ví điện tử nào được chấp nhận?",
        answer: "Chúng tôi hiện chấp nhận thanh toán qua MoMo, ZaloPay, ShopeePay và VNPAY-QR.",
        isActive: true
    },

    // --- CHỦ ĐỀ: VẬN CHUYỂN ---
    {
        question: "Phí vận chuyển đi tỉnh là bao nhiêu?",
        answer: "Phí vận chuyển đồng giá 30.000 VNĐ cho đơn đi tỉnh. Miễn phí cho đơn hàng trên 1.000.000 VNĐ.",
        isActive: true
    },
    {
        question: "Tôi có được kiểm tra hàng trước khi nhận không?",
        answer: "Chính sách của chúng tôi cho phép đồng kiểm (xem hàng nhưng không thử) trước khi thanh toán cho nhân viên giao hàng.",
        isActive: true
    },
    {
        question: "Thời gian giao hàng tiêu chuẩn là bao lâu?",
        answer: "Nội thành: 1-2 ngày. Ngoại thành và các tỉnh khác: 3-5 ngày làm việc (không tính Chủ Nhật và ngày lễ).",
        isActive: true
    },
    {
        question: "Dịch vụ giao hàng hỏa tốc 2h áp dụng ở đâu?",
        answer: "Dịch vụ này hiện chỉ áp dụng tại các quận nội thành Hà Nội và TP.HCM.",
        isActive: true
    },

    // --- CHỦ ĐỀ: ĐỔI TRẢ & BẢO HÀNH ---
    {
        question: "Sản phẩm được bảo hành bao lâu?",
        answer: "Tùy loại sản phẩm, thời gian bảo hành dao động từ 6 tháng đến 24 tháng. Thông tin chi tiết có trong trang mô tả sản phẩm.",
        isActive: true
    },
    {
        question: "Điều kiện để được đổi trả hàng?",
        answer: "Sản phẩm còn nguyên tem mác, chưa qua sử dụng, và còn đầy đủ phụ kiện/quà tặng kèm theo.",
        isActive: true
    },
    {
        question: "Bao lâu tôi sẽ nhận được tiền hoàn lại?",
        answer: "Sau khi kho nhận được hàng trả về và kiểm tra hợp lệ, tiền sẽ được hoàn vào tài khoản của bạn trong 5-7 ngày làm việc.",
        isActive: true
    },

    // --- CHỦ ĐỀ: KHÁC (Dữ liệu ẩn/Cũ để test isActive) ---
    {
        question: "Chương trình khuyến mãi Tết 2023 còn hiệu lực không?",
        answer: "Chương trình đã kết thúc vào ngày 30/01/2023.",
        isActive: false
    },
    {
        question: "Cửa hàng cũ ở địa chỉ X còn hoạt động không?",
        answer: "Chúng tôi đã chuyển sang địa chỉ mới, địa chỉ cũ không còn hoạt động.",
        isActive: false
    },
    {
        question: "Tuyển dụng nhân viên bán hàng thời vụ?",
        answer: "Hiện tại đã đủ số lượng nhân sự.",
        isActive: false
    }
];

export default faqs;