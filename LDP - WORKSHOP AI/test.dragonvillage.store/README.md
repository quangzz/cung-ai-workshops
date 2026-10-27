# Sống Cùng AI - Landing Page

Landing page cho khoá học **"Sống Cùng AI"** – Chuỗi workshop thực chiến làm chủ AI.

Được xây dựng bằng **Next.js 16** + **React 19** + **TailwindCSS 4** + **Framer Motion**.

---

## Mục lục

- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt nhanh](#-cài-đặt-nhanh)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Tuỳ chỉnh nội dung](#-tuỳ-chỉnh-nội-dung)
- [Deploy lên VPS](#-deploy-lên-vps-ubuntucentosdebianalmalinux)
- [Deploy lên Shared Hosting](#-deploy-lên-shared-hosting)
- [Deploy lên Vercel](#-deploy-lên-vercel-đơn-giản-nhất)
- [Cấu hình tên miền](#-cấu-hình-tên-miền-domain)
- [SSL / HTTPS](#-ssl--https)
- [Xử lý lỗi thường gặp](#-xử-lý-lỗi-thường-gặp)
- [Tech Stack](#-tech-stack)

---

## 🛠 Yêu cầu hệ thống

| Yêu cầu | Phiên bản tối thiểu |
|---|---|
| **Node.js** | >= 18.18.0 (khuyến nghị **v20 LTS**) |
| **npm** | >= 9 (đi kèm Node.js) |
| **RAM** | >= 512MB (khuyến nghị 1GB+) |
| **Disk** | >= 500MB trống |

> **Kiểm tra version đã cài:**
> ```bash
> node -v   # Ví dụ: v20.18.0
> npm -v    # Ví dụ: 10.8.2
> ```

> **Chưa có Node.js?** Xem phần [Cài đặt Node.js](#cài-node.js-trên-vps) bên dưới.

---

## 🚀 Cài đặt nhanh

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/songcungai-landing.git
cd songcungai-landing

# 2. Cài đặt dependencies
npm install

# 3. Chạy development (xem trước)
npm run dev
# → Mở trình duyệt: http://localhost:3000

# 4. Build production
npm run build

# 5. Chạy production
npm run start
# → Web chạy tại: http://localhost:3000
```

---

## 📁 Cấu trúc thư mục

```
songcungai-landing/
│
├── public/                      # Tài nguyên tĩnh (ảnh, logo, icon)
│   ├── images/
│   │   ├── qa/                  # Ảnh hỏi đáp học viên (qa-1.jpg → qa-4.jpg)
│   │   └── workshop-real.jpg    # Ảnh workshop thật
│   ├── mentors/                 # Ảnh chân dung mentor (7 file .jpg)
│   ├── logo-spiderum-*.png/svg  # Logo Spiderum (color, white, icon)
│   ├── logo-unikon-*.png/svg    # Logo Unikon (color, black, white)
│   ├── qr-code.png              # QR code đăng ký
│   ├── og-image-placeholder.png # Ảnh Open Graph (hiển thị khi share link)
│   └── workshop-placeholder.jpg # Ảnh placeholder
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── register/
│   │   │       └── route.ts     # ⚡ API đăng ký (POST /api/register)
│   │   ├── globals.css          # CSS chung (TailwindCSS + custom tokens)
│   │   ├── layout.tsx           # Root layout (meta SEO, fonts, lang)
│   │   ├── page.tsx             # 🏠 Trang chủ - ghép các section
│   │   └── favicon.ico          # Icon tab trình duyệt
│   │
│   ├── components/
│   │   ├── layout/              # Component bố cục
│   │   │   ├── Header.tsx       #   Menu header + logo
│   │   │   ├── Footer.tsx       #   Footer
│   │   │   └── StickyCTA.tsx    #   Nút CTA nổi (sticky bottom)
│   │   │
│   │   ├── sections/            # Các section trên trang
│   │   │   ├── Hero.tsx         #   Banner chính
│   │   │   ├── PainPoints.tsx   #   Nỗi đau khách hàng
│   │   │   ├── TargetAudience.tsx  # Đối tượng tham gia
│   │   │   ├── Philosophy.tsx   #   Triết lý đào tạo
│   │   │   ├── CoreSkills.tsx   #   Kỹ năng cốt lõi
│   │   │   ├── WorkshopProgram.tsx # Chương trình 8 buổi
│   │   │   ├── SpecialFeatures.tsx # Điểm đặc biệt
│   │   │   ├── Mentors.tsx      #   Đội ngũ mentor
│   │   │   ├── ClubPrivileges.tsx  # Đặc quyền CLB
│   │   │   ├── Testimonials.tsx #   Cảm nhận học viên
│   │   │   ├── Pricing.tsx      #   Bảng giá
│   │   │   ├── FAQ.tsx          #   Câu hỏi thường gặp
│   │   │   ├── Commitment.tsx   #   Cam kết
│   │   │   ├── SupportGroup.tsx #   Nhóm hỗ trợ
│   │   │   └── RegisterForm.tsx #   Form đăng ký
│   │   │
│   │   └── ui/                  # Component UI dùng lại
│   │       ├── Button.tsx       #   Nút bấm
│   │       ├── Card.tsx         #   Thẻ card
│   │       ├── Badge.tsx        #   Badge/tag
│   │       └── SectionTitle.tsx #   Tiêu đề section
│   │
│   └── lib/
│       └── utils.ts             # Hàm tiện ích (cn - merge classNames)
│
├── package.json                 # Dependencies & scripts
├── package-lock.json            # Lock file (đảm bảo cùng version)
├── next.config.ts               # Cấu hình Next.js
├── tsconfig.json                # Cấu hình TypeScript
├── postcss.config.mjs           # Cấu hình PostCSS (TailwindCSS)
├── eslint.config.mjs            # Cấu hình ESLint
└── .gitignore                   # File/thư mục bỏ qua khi commit
```

---

## ✏️ Tuỳ chỉnh nội dung

### Thay đổi text/nội dung
Mỗi section là 1 file riêng trong `src/components/sections/`. Mở file tương ứng và sửa text trực tiếp.

**Ví dụ:** Muốn sửa tiêu đề Hero → mở `src/components/sections/Hero.tsx`.

### Thay logo
- Logo Spiderum: thay file `public/logo-spiderum-*.png`
- Logo Unikon: thay file `public/logo-unikon-*.png`
- **Giữ nguyên tên file** hoặc cập nhật đường dẫn trong code

### Thay ảnh mentor
- Thay file trong `public/mentors/` (giữ nguyên tên file)
- Hoặc thêm mentor mới → sửa danh sách trong `src/components/sections/Mentors.tsx`

### Thay QR Code
- Thay file `public/qr-code.png`

### Thay ảnh Open Graph (ảnh hiển thị khi share link Facebook/Zalo)
- Thay file `public/og-image-placeholder.png`
- Kích thước khuyến nghị: **1200×630px**

### Thay đổi domain cho SEO
- Mở `src/app/layout.tsx`
- Sửa dòng: `new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://songcungai.vn")`
- Hoặc tạo file `.env.local` với nội dung:
  ```
  NEXT_PUBLIC_BASE_URL=https://yourdomain.com
  ```

### API Đăng ký (`/api/register`)
- Hiện tại API chỉ **log ra console** (chưa lưu vào database)
- File: `src/app/api/register/route.ts`
- Để kết nối database, thêm logic lưu dữ liệu vào phần `TODO` trong file

---

## 🖥 Deploy lên VPS (Ubuntu/CentOS/Debian/AlmaLinux)

### Cài Node.js trên VPS

**Ubuntu / Debian:**
```bash
# Cập nhật hệ thống
sudo apt update && sudo apt upgrade -y

# Cài Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Kiểm tra
node -v  # v20.x.x
npm -v   # 10.x.x
```

**CentOS / AlmaLinux / Rocky Linux:**
```bash
# Cập nhật hệ thống
sudo dnf update -y

# Cài Node.js 20 LTS
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs

# Kiểm tra
node -v
npm -v
```

### Cài Git (nếu chưa có)

```bash
# Ubuntu/Debian
sudo apt install -y git

# CentOS/AlmaLinux
sudo dnf install -y git
```

---

### 🅰️ Cách 1: Deploy với PM2 (Khuyến nghị nhất)

PM2 là process manager giúp app chạy liên tục, tự khởi động lại khi crash hoặc reboot.

#### Bước 1: Cài PM2

```bash
sudo npm install -g pm2
```

#### Bước 2: Clone và build

```bash
# Chọn thư mục đặt code (ví dụ /var/www)
cd /var/www

# Clone repo
git clone https://github.com/YOUR_USERNAME/songcungai-landing.git
cd songcungai-landing

# Cài dependencies
npm install

# Build production
npm run build
```

#### Bước 3: Chạy với PM2

```bash
# Chạy app trên port 3000
pm2 start npm --name "songcungai" -- start

# Kiểm tra app đang chạy
pm2 status

# Xem logs
pm2 logs songcungai
```

#### Bước 4: Tự khởi động khi reboot

```bash
pm2 startup
# → PM2 sẽ in ra 1 lệnh, COPY và CHẠY lệnh đó

pm2 save
```

#### Các lệnh PM2 hay dùng

```bash
pm2 status              # Xem trạng thái tất cả app
pm2 restart songcungai  # Khởi động lại
pm2 stop songcungai     # Dừng
pm2 delete songcungai   # Xoá khỏi PM2
pm2 logs songcungai     # Xem log real-time
pm2 monit               # Giám sát CPU/RAM
```

#### Cập nhật code mới

```bash
cd /var/www/songcungai-landing
git pull                # Lấy code mới
npm install             # Cài thêm package mới (nếu có)
npm run build           # Build lại
pm2 restart songcungai  # Khởi động lại
```

---

### 🅱️ Cách 2: Deploy với systemd (Không cần PM2)

Tạo service file:

```bash
sudo nano /etc/systemd/system/songcungai.service
```

Dán nội dung sau (sửa đường dẫn nếu khác):

```ini
[Unit]
Description=Song Cung AI Landing Page
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/songcungai-landing
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

Kích hoạt và chạy:

```bash
sudo systemctl daemon-reload
sudo systemctl enable songcungai   # Tự chạy khi boot
sudo systemctl start songcungai    # Bắt đầu chạy

# Kiểm tra
sudo systemctl status songcungai

# Xem log
sudo journalctl -u songcungai -f
```

---

### 🅲️ Cách 3: Deploy với Docker

#### Bước 1: Cài Docker

```bash
# Ubuntu/Debian
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker

# CentOS/AlmaLinux
sudo dnf install -y docker docker-compose
sudo systemctl enable docker
sudo systemctl start docker
```

#### Bước 2: Tạo Dockerfile

Tạo file `Dockerfile` trong thư mục gốc dự án:

```dockerfile
# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Cài dependencies trước (tận dụng cache)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source và build
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Chỉ copy những gì cần chạy
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
```

Tạo file `.dockerignore`:

```
node_modules
.next
.git
*.md
```

#### Bước 3: Build và chạy

```bash
# Build image
docker build -t songcungai .

# Chạy container
docker run -d \
  --name songcungai \
  --restart unless-stopped \
  -p 3000:3000 \
  songcungai

# Kiểm tra
docker ps
docker logs songcungai
```

#### Docker Compose (tuỳ chọn)

Tạo file `docker-compose.yml`:

```yaml
services:
  web:
    build: .
    container_name: songcungai
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

```bash
docker compose up -d       # Chạy
docker compose down        # Dừng
docker compose up -d --build  # Build lại và chạy
```

---

### 🔧 Cấu hình Nginx (Reverse Proxy)

App Next.js chạy trên port `3000`. Nginx sẽ đứng trước, nhận request từ port `80/443` và chuyển đến app.

#### Cài Nginx

```bash
# Ubuntu/Debian
sudo apt install -y nginx

# CentOS/AlmaLinux
sudo dnf install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

#### Tạo cấu hình

```bash
sudo nano /etc/nginx/sites-available/songcungai
```

Dán nội dung:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Giới hạn kích thước upload (nếu có form upload)
    client_max_body_size 10M;

    # Nén response để tải nhanh hơn
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;

    # Cache ảnh và file tĩnh
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /images/ {
        alias /var/www/songcungai-landing/public/images/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Proxy tất cả request đến Next.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeout
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

#### Kích hoạt

```bash
# Tạo symlink (Ubuntu/Debian)
sudo ln -s /etc/nginx/sites-available/songcungai /etc/nginx/sites-enabled/

# Xoá default site (nếu muốn)
sudo rm /etc/nginx/sites-enabled/default

# Kiểm tra cú pháp
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

> **CentOS/AlmaLinux:** Không có `sites-available`. Tạo file trong `/etc/nginx/conf.d/songcungai.conf` thay thế.

---

## 🌍 Deploy lên Shared Hosting

> **⚠️ Quan trọng:** Dự án này cần **Node.js runtime** để chạy (vì có API route). Không phải hosting nào cũng hỗ trợ.

### Hosting có hỗ trợ Node.js

Các nhà cung cấp hosting hỗ trợ Node.js:

| Hosting | Ghi chú |
|---|---|
| **Vercel** | Miễn phí, dễ nhất (xem phần dưới) |
| **Railway** | Miễn phí $5/tháng credit |
| **Render** | Free tier có sẵn |
| **DigitalOcean App Platform** | Từ $5/tháng |
| **Netlify** | Hỗ trợ Next.js |
| **Tinohost / AZDIGI / Vietnix** | Chọn gói có Node.js hoặc VPS |

### Deploy lên cPanel (có Node.js)

Nếu hosting cPanel có **Setup Node.js App**:

#### Bước 1: Upload code

```bash
# Nén thư mục (không bao gồm node_modules)
# Trên máy local:
cd songcungai-landing
tar --exclude='node_modules' --exclude='.next' --exclude='.git' -czf songcungai.tar.gz .
```

Upload file `songcungai.tar.gz` lên hosting qua **File Manager** hoặc **FTP**.

#### Bước 2: Giải nén trên hosting

Vào **File Manager**, giải nén `songcungai.tar.gz` vào thư mục website (ví dụ: `public_html/songcungai` hoặc thư mục riêng).

#### Bước 3: Cấu hình Node.js App trên cPanel

1. Vào cPanel → **Setup Node.js App**
2. Nhấn **Create Application**
3. Cấu hình:
   - **Node.js version:** 20.x
   - **Application mode:** Production
   - **Application root:** `songcungai` (thư mục chứa code)
   - **Application URL:** chọn domain/subdomain
   - **Application startup file:** `node_modules/next/dist/bin/next` (hoặc dùng custom script)
4. Nhấn **Create**

#### Bước 4: Build và start

Vào terminal trên cPanel (hoặc SSH):

```bash
cd ~/songcungai
source /home/YOUR_CPANEL_USER/nodevenv/songcungai/20/bin/activate
npm install
npm run build
```

Restart ứng dụng trong giao diện cPanel Node.js.

### Deploy lên hosting qua aaPanel/CyberPanel

Nếu dùng panel quản trị như **aaPanel** hoặc **CyberPanel**:

1. Tạo website trong panel
2. SSH vào server
3. Cài Node.js (nếu chưa có)
4. Clone code vào thư mục website
5. Làm theo hướng dẫn VPS ở trên (PM2 hoặc systemd)
6. Cấu hình Reverse Proxy trong panel (thường có sẵn trong giao diện)

---

## ☁️ Deploy lên Vercel (Đơn giản nhất)

Vercel là nền tảng do đội ngũ Next.js tạo ra — hoàn hảo cho Next.js app.

#### Bước 1: Push code lên GitHub
(Nếu chưa làm)

```bash
cd /path/to/songcungai-landing
git remote add origin https://github.com/YOUR_USERNAME/songcungai-landing.git
git push -u origin main
```

#### Bước 2: Import vào Vercel

1. Truy cập [vercel.com](https://vercel.com) → **Sign up** bằng GitHub
2. Nhấn **Add New** → **Project**
3. Chọn repository `songcungai-landing`
4. **Framework Preset**: tự nhận diện là `Next.js`
5. Nhấn **Deploy**
6. Đợi 1-2 phút → Xong! Bạn nhận được URL dạng `songcungai-landing.vercel.app`

#### Bước 3: Gắn tên miền (tuỳ chọn)

1. Vào **Project Settings** → **Domains**
2. Nhập tên miền (ví dụ: `songcungai.vn`)
3. Vercel sẽ hướng dẫn bạn cấu hình DNS

#### Tự động deploy khi push code

Mỗi khi bạn `git push`, Vercel tự động build và deploy phiên bản mới.

---

## 🌐 Cấu hình tên miền (Domain)

### Nếu deploy trên VPS

Bạn cần trỏ domain về IP của VPS:

1. Đăng nhập vào nhà cung cấp domain (GoDaddy, Namecheap, Tenten, Mắt Bão, v.v.)
2. Vào quản lý DNS
3. Thêm/sửa bản ghi:

| Loại | Host | Giá trị | TTL |
|---|---|---|---|
| **A** | `@` | `IP_VPS_CỦA_BẠN` | 3600 |
| **A** | `www` | `IP_VPS_CỦA_BẠN` | 3600 |

4. Đợi 5-30 phút để DNS cập nhật
5. Sửa `server_name` trong cấu hình Nginx thành domain thật

### Nếu deploy trên Vercel

Thêm bản ghi CNAME:

| Loại | Host | Giá trị |
|---|---|---|
| **CNAME** | `@` | `cname.vercel-dns.com` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

---

## 🔒 SSL / HTTPS

### Trên VPS: Let's Encrypt (Miễn phí)

```bash
# Cài Certbot
sudo apt install -y certbot python3-certbot-nginx    # Ubuntu/Debian
# hoặc
sudo dnf install -y certbot python3-certbot-nginx    # CentOS/AlmaLinux

# Cài SSL tự động (thay yourdomain.com)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Tự gia hạn (cron tự động)
sudo certbot renew --dry-run
```

Certbot sẽ tự sửa cấu hình Nginx để redirect HTTP → HTTPS.

### Trên Vercel

SSL tự động, không cần làm gì.

### Trên cPanel

Bật **AutoSSL** trong cPanel → SSL/TLS Status → Run AutoSSL.

---

## ❓ Xử lý lỗi thường gặp

### Lỗi: `npm install` thất bại

```bash
# Xoá cache và cài lại
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Lỗi: `npm run build` hết RAM

```bash
# Tăng bộ nhớ cho Node.js
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build
```

Hoặc thêm swap trên VPS:
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile swap swap defaults 0 0' | sudo tee -a /etc/fstab
```

### Lỗi: Truy cập web chỉ thấy "502 Bad Gateway"

- App Next.js chưa chạy → kiểm tra `pm2 status` hoặc `systemctl status songcungai`
- Port sai → đảm bảo Nginx proxy đúng port (`3000`)

### Lỗi: Ảnh không hiển thị sau deploy

- Kiểm tra file ảnh có trong thư mục `public/`
- Đường dẫn phân biệt hoa/thường (Linux case-sensitive)

### Lỗi: Permission denied

```bash
# Đổi quyền sở hữu thư mục
sudo chown -R $USER:$USER /var/www/songcungai-landing

# Hoặc nếu dùng user www-data
sudo chown -R www-data:www-data /var/www/songcungai-landing
```

### Muốn chạy trên port khác (không phải 3000)

```bash
# PM2
PORT=8080 pm2 start npm --name "songcungai" -- start

# Hoặc thêm vào file .env.local
echo "PORT=8080" > .env.local
```

Nhớ sửa port trong cấu hình Nginx tương ứng.

---

## 📦 Tech Stack

| Công nghệ | Version | Mô tả |
|---|---|---|
| **Next.js** | 16.2.9 | React framework (App Router) |
| **React** | 19.2.4 | UI library |
| **TailwindCSS** | 4.x | CSS framework (utility-first) |
| **Framer Motion** | 12.x | Animation library |
| **Lucide React** | 1.x | Icon library |
| **TypeScript** | 5.x | Type safety |
| **Be Vietnam Pro** | Google Font | Font chữ tiếng Việt |

---

## 📞 Liên hệ hỗ trợ

Nếu gặp vấn đề khi cài đặt, vui lòng liên hệ người bàn giao hoặc tạo Issue trên GitHub repository.
