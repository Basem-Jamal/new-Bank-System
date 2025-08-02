/* شكل القسم الجديد ( صورة وقسم متحرك ) بنفس ديور */
if (window.location.href.includes("/ar/VqNwjEp")) {
  const target =
   document.querySelector('.s-slider-wrapper.s-slider-vertical');

  if (target) {
    const section = document.createElement("section");
    section.className = "custom-dior-carousel-section";
    section.innerHTML = `
      <div class="carousel-background"></div>
      <div class="carousel-content">
        <h2 class="carousel-title">مختاراتنا المميزة</h2>
        <div class="carousel-products">

          <!-- منتج 1 -->
          <div class="carousel-item">
            <img src="https://cdn.salla.sa/djWaA/85b073b9-187e-4b95-ab4f-1d7467e12314-500x500-f5QR7MOSK57C4DpnHDkIMNZG09uLC6u2090AdSHe.jpg" alt="ترات VIP" />
            <h3>ترات VIP</h3>
            <p>نكهة كمبودية فاخرة</p>
            <span class="price">329 ر.س</span>
            <salla-add-product-button
              product-id="698111802"
              product-status="sale"
              product-type="product"
              fill="outline"
              size="medium"
              width="normal"
              class="custom-cart-btn hydrated"
            ></salla-add-product-button>
          </div>

          <!-- منتج 2 -->
          <div class="carousel-item">
            <img src="https://cdn.salla.sa/example.jpg" alt="منتج ثاني" />
            <h3>اسم المنتج الثاني</h3>
            <p>وصف قصير</p>
            <span class="price">220 ر.س</span>
            <salla-add-product-button
              product-id="123456789"
              product-status="sale"
              product-type="product"
              fill="outline"
              size="medium"
              width="normal"
              class="custom-cart-btn hydrated"
            ></salla-add-product-button>
          </div>

        </div>
      </div>
    `;
    target.querySelectorAll
    target.parentNode.insertBefore(section, target.nextSibling);
  }
}

/* ينتهي هنا تعديل القسم */





if (window.location.href.includes("/ar/VqNwjEp")) {
  const target = document.getElementById("details_table");
  
  if (target) {
    const productCard = document.createElement("div");
    productCard.innerHTML = `
      <div class="dior-inspired-card">
        <h3 class="dior-title">منتج مقترح</h3>
        <div class="dior-product-container">
          <a href="https://oudorchid.com/ar/wWKmOee" class="dior-image-link">
            <img src="https://cdn.salla.sa/djWaA/85b073b9-187e-4b95-ab4f-1d7467e12314-500x500-f5QR7MOSK57C4DpnHDkIMNZG09uLC6u2090AdSHe.jpg" 
                 alt="قشور ترات VIP" class="dior-product-image">
          </a>
          <div class="dior-product-details">
            <h4 class="dior-product-name">قشور ترات VIP</h4>
            <p class="dior-product-description"></p>
            <div class="dior-price-container">
              <span class="dior-current-price">329 ر.س</span>
              <span class="dior-original-price">450 ر.س</span>
            </div>
            <div id="cart-button-container" class="dior-button-container"></div>
          </div>
        </div>
      </div>
    `;

    target.parentNode.insertBefore(productCard, target.nextSibling);

    // إنشاء زر "إضافة للسلة" باستخدام مكتبة سلة
    const btnWrapper = productCard.querySelector("#cart-button-container");
    const addBtn = document.createElement("salla-add-product-button");
    addBtn.setAttribute("product-id", "698111802");
    addBtn.setAttribute("product-status", "sale");
    addBtn.setAttribute("product-type", "product");
    addBtn.setAttribute("fill", "outline");
    addBtn.setAttribute("size", "medium");
    addBtn.setAttribute("width", "normal");
    addBtn.className = "hydrated dior-cart-button";

    btnWrapper.appendChild(addBtn);
  }
}

// إضافة التنسيقات في رأس الصفحة
const style = document.createElement('style');
style.innerHTML = `
  .dior-inspired-card {
    border-top: 1px solid #e8e8e8;
    padding: 40px 0;
    margin-top: 50px;
    position: relative;
  }

  .dior-title {
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 1px;
    color: #333;
    margin-bottom: 40px;
    position: relative;
    padding-bottom: 20px;
  }

  .dior-title:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 1px;
    background: #000;
  }

  .dior-product-container {
    display: flex;
    max-width: 800px;
    margin: 0 auto;
    align-items: center;
    gap: 50px;
  }

  .dior-image-link {
    display: block;
    flex: 0 0 40%;
    transition: transform 0.3s ease;
  }

  .dior-image-link:hover {
    transform: translateY(-5px);
  }

  .dior-product-image {
    width: 100%;
    max-width:100%;
    display: block;
    margin: 0 auto;
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }

  .dior-product-details {
    flex: 1;
    text-align: center;
  }

  .dior-product-name {
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 15px;
    letter-spacing: 0.5px;
    color: #000;
  }

  .dior-product-description {
    color: #666;
    font-size: 16px;
    line-height: 1.6;
    margin: 0 0 25px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .dior-price-container {
    margin-bottom: 30px;
  }

  .dior-current-price {
    font-size: 20px;
    font-weight: 500;
    color: #000;
    display: block;
    margin-bottom: 5px;
  }

  .dior-original-price {
    color: #999;
    text-decoration: line-through;
    font-size: 16px;
  }

  .dior-button-container {
    max-width: 300px;
    margin: 0 auto;
  }


  @media (max-width: 768px) {
    .dior-product-container {
      flex-direction: column;
      gap: 30px;
    }
    
    .dior-title {
      font-size: 20px;
      margin-bottom: 30px;
    }
  }
`;

document.head.appendChild(style);