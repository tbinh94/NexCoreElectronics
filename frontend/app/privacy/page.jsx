import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 dark:bg-blue-900/50 px-8 py-12 text-center">
                    <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Chính Sách Bảo Mật</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto">
                        Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và minh bạch về cách chúng tôi sử dụng nó.
                    </p>
                    <p className="text-sm text-blue-200 mt-4">Cập nhật lần cuối: 24/01/2026</p>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-10 text-gray-600 dark:text-gray-300">
                    {/* Section 1 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Thu thập thông tin</h2>
                        </div>
                        <p className="leading-relaxed">
                            Chúng tôi thu thập thông tin bạn cung cấp trực tiếp cho chúng tôi khi bạn tạo tài khoản, mua hàng, hoặc liên hệ với chúng tôi. Các loại thông tin chúng tôi có thể thu thập bao gồm:
                        </p>
                        <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                            <li>Họ tên, địa chỉ email, số điện thoại.</li>
                            <li>Địa chỉ giao hàng và địa chỉ thanh toán.</li>
                            <li>Thông tin đăng nhập tài khoản (tên đăng nhập, mật khẩu đã mã hóa).</li>
                            <li>Lịch sử mua hàng và thông tin giao dịch.</li>
                        </ul>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Sử dụng thông tin</h2>
                        </div>
                        <p className="leading-relaxed">
                            Chúng tôi sử dụng thông tin thu thập được để:
                        </p>
                        <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                            <li>Xử lý đơn hàng và giao sản phẩm cho bạn.</li>
                            <li>Gửi thông báo về trạng thái đơn hàng và các cập nhật liên quan.</li>
                            <li>Cải thiện dịch vụ khách hàng và trải nghiệm mua sắm.</li>
                            <li>Phát hiện và ngăn chặn các hành vi gian lận hoặc lạm dụng.</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. Bảo mật dữ liệu</h2>
                        </div>
                        <p className="leading-relaxed">
                            Chúng tôi thực hiện các biện pháp an ninh thích hợp để bảo vệ chống lại việc truy cập trái phép, thay đổi, tiết lộ hoặc phá hủy dữ liệu cá nhân của bạn.
                            Mọi thông tin thanh toán đều được mã hóa và xử lý qua các cổng thanh toán an toàn. Chúng tôi không lưu trữ thông tin thẻ tín dụng của bạn trên máy chủ của chúng tôi.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Chia sẻ thông tin</h2>
                        <p className="leading-relaxed">
                            Chúng tôi không bán, trao đổi, hoặc chuyển giao thông tin cá nhân của bạn cho bên thứ ba, ngoại trừ các đối tác tin cậy hỗ trợ chúng tôi trong việc vận hành trang web, tiến hành kinh doanh, hoặc phục vụ bạn (ví dụ: đơn vị vận chuyển), miễn là các bên này đồng ý giữ bí mật thông tin này.
                        </p>
                    </section>

                    {/* Contact */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mt-8 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            <Mail className="w-5 h-5" /> Liên hệ
                        </h3>
                        <p className="text-sm">
                            Nếu bạn có bất kỳ câu hỏi nào về Chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua email: <a href="mailto:privacy@nextgenshop.com" className="text-blue-600 hover:underline">privacy@nextgenshop.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
