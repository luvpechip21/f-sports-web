# Make.com – Kịch bản nhận đơn hàng (Webhook → Google Sheet → Email Zoho)

## 1) Modules
1. **Webhooks → Custom webhook** (Trigger)
2. **Google Sheets → Add a Row**
3. **Email → Send an Email** (SMTP Zoho: cskh@tuns-fsports.com)

## 2) Google Sheet (thứ tự cột)
`Tên | SĐT | Địa chỉ | Sản phẩm | Giá | Thời gian`

## 3) Mapping Add a Row
- Tên → `{{1.name}}`
- SĐT → `{{1.phone}}`
- Địa chỉ → `{{1.address}}`
- Sản phẩm → `{{1.product}}`
- Giá → `{{1.price}}`  (số thuần VND)
- Thời gian → `{{ formatDate( now; "HH:mm dd/MM/yyyy"; "Asia/Ho_Chi_Minh") }}`

> Module index `1` là Webhook. Nếu khác, chọn đúng module trong popup Map.

## 4) Cấu hình Email (Zoho SMTP)
- Connection: Others (SMTP)
  - SMTP server: `smtp.zoho.com`
  - Port: `465` (SSL) hoặc `587` (TLS)
  - Username: `cskh@tuns-fsports.com`
  - Password: (mật khẩu Zoho của mailbox)
  - From: `cskh@tuns-fsports.com`
- To: email quản trị (ví dụ `luvpechip21@gmail.com`)
- Subject: `Đơn hàng mới từ Website`
- Content Type: `HTML`
- Content: dán nội dung trong file `email_template.html`

## 5) Form mẫu
Mở file `index.html`, thay `WEBHOOK_URL` bằng URL webhook của bạn (dạng `https://hook.us1.make.com/xxxx`). Upload lên site và submit để test.

## 6) Gợi ý mở rộng
- Thêm trường `discount`, `shipping` → tính tổng thanh toán:
  `toNumber(1.price)*toNumber(1.qty) - toNumber(1.discount) + toNumber(1.shipping)`
- Thêm module **Email → Send an Email** thứ hai để gửi **Xác nhận đơn hàng** cho khách (To = `{{1.email}}` nếu có).
