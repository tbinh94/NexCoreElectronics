import { ScrollText, CheckCircle2, AlertCircle, Scale, HelpCircle } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="bg-gray-900 dark:bg-black px-8 py-12 text-center">
                    <div className="mx-auto bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                        <ScrollText className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Điều Khoản Sử Dụng</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Vui lòng đọc kỹ các điều khoản này trước khi sử dụng dịch vụ của NextGenShop.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">Cập nhật lần cuối: 24/01/2026</p>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-10 text-gray-600 dark:text-gray-300">
                    {/* Section 1 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <CheckCircle2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Chấp nhận điều khoản</h2>
                        </div>
                        <p className="leading-relaxed">
                            Bằng việc truy cập và sử dụng trang web này, bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản và Điều kiện này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, bạn không được phép truy cập trang web.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Tài khoản người dùng</h2>
                        </div>
                        <p className="leading-relaxed mb-3">
                            Khi bạn tạo tài khoản với chúng tôi, bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật. Việc không làm như vậy cấu thành vi phạm Điều khoản, có thể dẫn đến việc chấm dứt ngay lập tức tài khoản của bạn.
                        </p>
                        <p className="leading-relaxed">
                            Bạn chịu trách nhiệm bảo vệ mật khẩu mà bạn sử dụng để truy cập Dịch vụ và cho bất kỳ hoạt động hoặc hành động nào dưới mật khẩu của bạn.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <Scale className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. Sở hữu trí tuệ</h2>
                        </div>
                        <p className="leading-relaxed">
                            Dịch vụ và nội dung ban đầu của nó (không bao gồm Nội dung do người dùng cung cấp), các tính năng và chức năng là và sẽ vẫn là tài sản độc quyền của NextGenShop và các bên cấp phép. Dịch vụ được bảo vệ bởi bản quyền, thương hiệu và các luật khác của cả Việt Nam và nước ngoài.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Chính sách đổi trả</h2>
                        <p className="leading-relaxed">
                            Chúng tôi cam kết chất lượng sản phẩm. Nếu sản phẩm có lỗi từ nhà sản xuất, bạn được quyền đổi trả trong vòng 30 ngày kể từ ngày nhận hàng. Sản phẩm đổi trả phải còn nguyên vẹn, đầy đủ phụ kiện và bao bì.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Giới hạn trách nhiệm</h2>
                        <p className="leading-relaxed">
                            Trong mọi trường hợp, NextGenShop, cũng như các giám đốc, nhân viên, đối tác, đại lý, nhà cung cấp hoặc chi nhánh của chúng tôi, sẽ không chịu trách nhiệm pháp lý đối với bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, do hậu quả hoặc trừng phạt nào, bao gồm nhưng không giới hạn ở việc mất lợi nhuận, dữ liệu, sử dụng, thiện chí, hoặc các tổn thất vô hình khác.
                        </p>
                    </section>

                    {/* Contact */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mt-8 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5" /> Câu hỏi?
                        </h3>
                        <p className="text-sm">
                            Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản này, vui lòng liên hệ với chúng tôi tại: <a href="mailto:support@nextgenshop.com" className="text-blue-600 hover:underline">support@nextgenshop.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
