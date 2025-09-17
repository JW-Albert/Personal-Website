// 等待DOM載入完成
document.addEventListener('DOMContentLoaded', function () {

    // 語言切換功能
    let currentLanguage = localStorage.getItem('language') || 'zh';

    // 初始化語言
    function initLanguage() {
        updateLanguage(currentLanguage);
        updateLanguageButtons();
    }

    // 更新語言按鈕狀態
    function updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === currentLanguage) {
                btn.classList.add('active');
            }
        });
    }

    // 更新頁面語言
    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-zh][data-en]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });

        // 更新placeholder
        const inputs = document.querySelectorAll('[data-placeholder-zh][data-placeholder-en]');
        inputs.forEach(input => {
            const placeholder = input.getAttribute(`data-placeholder-${lang}`);
            if (placeholder) {
                input.placeholder = placeholder;
            }
        });

        // 更新HTML lang屬性
        document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';

        // 更新頁面標題
        const title = document.querySelector('title');
        if (title) {
            title.textContent = lang === 'zh' ? '我的個人網站' : 'My Personal Website';
        }

        currentLanguage = lang;
        localStorage.setItem('language', lang);
    }

    // 動畫類型配置
    const animationTypes = {
        'page-flip': 'page-flip',
        'slide': 'slide-transition',
        'fade': 'fade-transition',
        'scale': 'scale-transition',
        'shimmer': 'language-transition'
    };
    
    let currentAnimationType = 'page-flip'; // 預設使用翻頁動畫
    
    // 語言切換動畫函數
    function animateLanguageSwitch(lang, animationType = 'page-flip') {
        const body = document.body;
        
        // 添加動畫類別
        body.classList.add(animationType);
        
        // 根據動畫類型執行不同的動畫
        switch(animationType) {
            case 'page-flip':
                body.classList.add('flipping');
                setTimeout(() => {
                    updateLanguage(lang);
                    updateLanguageButtons();
                    body.classList.remove('flipping');
                }, 400);
                setTimeout(() => {
                    body.classList.remove(animationType);
                }, 800);
                break;
                
            case 'slide-transition':
                const direction = lang === 'en' ? 'sliding-left' : 'sliding-right';
                body.classList.add(direction);
                setTimeout(() => {
                    updateLanguage(lang);
                    updateLanguageButtons();
                    body.classList.remove(direction);
                }, 300);
                setTimeout(() => {
                    body.classList.remove(animationType);
                }, 600);
                break;
                
            case 'fade-transition':
                body.classList.add('fading');
                setTimeout(() => {
                    updateLanguage(lang);
                    updateLanguageButtons();
                    body.classList.remove('fading');
                }, 200);
                setTimeout(() => {
                    body.classList.remove(animationType);
                }, 400);
                break;
                
            case 'scale-transition':
                body.classList.add('scaling');
                setTimeout(() => {
                    updateLanguage(lang);
                    updateLanguageButtons();
                    body.classList.remove('scaling');
                }, 250);
                setTimeout(() => {
                    body.classList.remove(animationType);
                }, 500);
                break;
                
            case 'language-transition':
                body.classList.add('animating');
                setTimeout(() => {
                    updateLanguage(lang);
                    updateLanguageButtons();
                }, 300);
                setTimeout(() => {
                    body.classList.remove('animating', animationType);
                }, 600);
                break;
        }
    }
    
    // 語言切換按鈕事件
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            
            // 防止重複點擊
            if (this.classList.contains('active')) return;
            
            // 執行動畫
            animateLanguageSwitch(lang, currentAnimationType);
        });
    });
    
    // 動畫類型切換（可選功能）
    function setAnimationType(type) {
        if (animationTypes[type]) {
            currentAnimationType = type;
        }
    }

    // 初始化語言
    initLanguage();

    // 導航欄功能
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 滾動時導航欄效果
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // 手機版選單切換
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // 動畫效果
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // 點擊導航連結時關閉選單
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // 平滑滾動到指定區域
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 考慮導航欄高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滾動動畫觀察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 為需要動畫的元素添加觀察
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .contact-item, .stat-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // 技能進度條動畫
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // 打字機效果
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // 為標題添加打字機效果
    const heroTitle = document.querySelector('.hero-title .animate-text:last-child');
    if (heroTitle) {
        setTimeout(() => {
            const nameText = currentLanguage === 'zh' ? '您的名字' : 'Your Name';
            typeWriter(heroTitle, nameText, 150);
        }, 1000);
    }

    // 聯絡表單處理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // 獲取表單數據
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;

            // 簡單驗證
            if (!name || !email || !message) {
                const errorMsg = currentLanguage === 'zh' ? '請填寫所有必填欄位' : 'Please fill in all required fields';
                showNotification(errorMsg, 'error');
                return;
            }

            if (!isValidEmail(email)) {
                const errorMsg = currentLanguage === 'zh' ? '請輸入有效的電子郵件地址' : 'Please enter a valid email address';
                showNotification(errorMsg, 'error');
                return;
            }

            // 模擬發送（實際應用中需要後端處理）
            const successMsg = currentLanguage === 'zh' ? '訊息已發送！我會盡快回覆您。' : 'Message sent! I will reply to you soon.';
            showNotification(successMsg, 'success');
            this.reset();
        });
    }

    // 電子郵件驗證
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 通知系統
    function showNotification(message, type = 'info') {
        // 移除現有通知
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // 創建新通知
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // 添加樣式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // 動畫顯示
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 關閉按鈕功能
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });

        // 自動關閉
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // 平滑滾動到頂部
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // 創建回到頂部按鈕
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    document.body.appendChild(backToTopBtn);

    // 顯示/隱藏回到頂部按鈕
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // 點擊回到頂部
    backToTopBtn.addEventListener('click', scrollToTop);

    // 滑鼠懸停效果
    backToTopBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.6)';
    });

    backToTopBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(99, 102, 241, 0.4)';
    });

    // 載入動畫
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');

        // 為首頁元素添加延遲動畫
        const heroElements = document.querySelectorAll('.hero .animate-text, .hero .animate-btn');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // 視差滾動效果
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // 動態背景粒子效果
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
            `;

            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';

            hero.appendChild(particle);
        }
    }

    // 創建粒子效果
    createParticles();

    // 添加粒子動畫CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .particle {
            animation: particleFloat linear infinite !important;
        }
    `;
    document.head.appendChild(style);

    // 鍵盤導航支持
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            // 關閉任何打開的選單或模態框
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });

    // 性能優化：節流滾動事件
    let ticking = false;

    function updateOnScroll() {
        // 滾動相關的更新邏輯
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    console.log('個人網站已載入完成！');
});
