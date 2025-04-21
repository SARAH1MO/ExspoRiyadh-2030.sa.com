// العد التنازلي لموعد إكسبو الرياض 2030
document.addEventListener('DOMContentLoaded', function() {
    // تعيين التاريخ الذي نقوم بالعد التنازلي إليه (1 أكتوبر 2030)
    const countDownDate = new Date("Oct 1, 2030 00:00:00").getTime();
    
    // تحديث العد التنازلي كل ثانية
    function updateCountdown() {
        // الحصول على الوقت الحالي
        const now = new Date().getTime();
        
        // حساب الفرق بين الآن وتاريخ العد التنازلي
        const distance = countDownDate - now;
        
        // حساب الأيام، الساعات، الدقائق والثواني
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // تحديث عناصر العد التنازلي
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
    }
    
    // تنفيذ الدالة مرة في البداية
    if(document.getElementById("days")) {
        updateCountdown();
        
        // تحديث العد التنازلي كل ثانية
        setInterval(updateCountdown, 1000);
    }

    // إضافة السلوك السلس للتمرير عند النقر على روابط التنقل
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // التحقق من أن الرابط يشير إلى عنصر في الصفحة الحالية
            if(href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                
                const targetSection = document.querySelector(href);
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // التحقق من صحة نموذج الاتصال
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            contactForm.reset();
        });
    }

    // فلترة الأجنحة في صفحة الأجنحة
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // إزالة الكلاس النشط من جميع الأزرار
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // إضافة الكلاس النشط للزر المضغوط
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const pavilionCards = document.querySelectorAll('.pavilion-card').parentNode;

                document.querySelectorAll('.col-md-4').forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        const cardTag = card.getAttribute('data-category');
                        if (cardTag === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // فلترة الفعاليات في صفحة البرنامج
    const eventFilterButtons = document.querySelectorAll('.event-filter-btn');
    if (eventFilterButtons.length > 0) {
        eventFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // إزالة الكلاس النشط من جميع الأزرار
                eventFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // إضافة الكلاس النشط للزر المضغوط
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const programItems = document.querySelectorAll('.program-item');

                programItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        const itemTags = item.getAttribute('data-tags').split(' ');
                        if (itemTags.includes(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // تأثيرات التمرير للعناصر
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');

    function checkScroll() {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        // تأثير الظهور التدريجي
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top + scrollY;
            if (scrollY > elementPosition - windowHeight + 100) {
                element.classList.add('visible');
            }
        });

        // تأثير الانزلاق
        slideElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top + scrollY;
            if (scrollY > elementPosition - windowHeight + 100) {
                element.classList.add('visible');
            }
        });
    }

    // فحص موقع التمرير عند تحميل الصفحة
    if (fadeElements.length > 0 || slideElements.length > 0) {
        checkScroll();
        // فحص موقع التمرير عند تحريك الصفحة
        window.addEventListener('scroll', checkScroll);
    }

    // التبديل بين طرق العرض في صفحة الأجنحة
    const viewToggleButtons = document.querySelectorAll('.view-toggle-btn');
    if (viewToggleButtons.length > 0) {
        const pavilionsGrid = document.getElementById('pavilions-grid');
        const pavilionsTable = document.getElementById('pavilions-table');
        const pavilionsMap = document.getElementById('pavilions-map');

        viewToggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                viewToggleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const view = this.getAttribute('data-view');
                
                // إخفاء جميع العروض أولاً
                pavilionsGrid.style.display = 'none';
                pavilionsTable.style.display = 'none';
                pavilionsMap.style.display = 'none';
                
                // إظهار العرض المطلوب
                if (view === 'grid') {
                    pavilionsGrid.style.display = 'flex';
                } else if (view === 'table') {
                    pavilionsTable.style.display = 'block';
                } else if (view === 'map') {
                    pavilionsMap.style.display = 'block';
                }
            });
        });
    }

    // معرض الصور مع خاصية التكبير
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modalGallery = document.getElementById('modal-gallery');
    
    if (galleryItems.length > 0 && modalGallery) {
        const modalImage = document.getElementById('modal-image');
        const modalCaption = document.getElementById('modal-caption');
        const closeModal = document.querySelector('.close-modal');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentIndex = 0;
        
        // فتح المعرض وعرض الصورة المحددة
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentIndex = index;
                const imgSrc = this.querySelector('img').getAttribute('src');
                const caption = this.querySelector('.gallery-overlay h5').textContent;
                
                modalImage.setAttribute('src', imgSrc);
                modalCaption.textContent = caption;
                modalGallery.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // إغلاق المعرض
        closeModal.addEventListener('click', function() {
            modalGallery.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // الصورة السابقة
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateModalImage();
        });
        
        // الصورة التالية
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateModalImage();
        });
        
        // تحديث الصورة المعروضة في المعرض
        function updateModalImage() {
            const imgSrc = galleryItems[currentIndex].querySelector('img').getAttribute('src');
            const caption = galleryItems[currentIndex].querySelector('.gallery-overlay h5').textContent;
            
            modalImage.setAttribute('src', imgSrc);
            modalCaption.textContent = caption;
        }
        
        // إغلاق المعرض عند النقر خارج الصورة
        modalGallery.addEventListener('click', function(e) {
            if (e.target === modalGallery) {
                modalGallery.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // استخدام مفاتيح الأسهم للتنقل
        document.addEventListener('keydown', function(e) {
            if (modalGallery.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                    updateModalImage();
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % galleryItems.length;
                    updateModalImage();
                } else if (e.key === 'Escape') {
                    modalGallery.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        });
    }
});