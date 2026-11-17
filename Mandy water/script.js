const WHATSAPP_NUMBER = "2349130542003";
const ORDER_MESSAGE = "Hello Mandy Water, I would like to place an order and would appreciate details on the available products.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ORDER_MESSAGE)}`;

const products = {
  bottled:{kicker:"01 / HYDRATION",title:"Mandy Bottled Water",image:"images/bottle-water.png",description:"Carefully prepared bottled water designed to provide a clean, refreshing option for everyday hydration, homes, offices, events and on-the-go moments.",points:["Pure & refreshing","Convenient format","Everyday hydration"]},
  sachet:{kicker:"02 / EVERYDAY",title:"Mandy Sachet Water",image:"images/Sachet-water.png",description:"A convenient, carefully packaged water option made for everyday use, gatherings and situations where easy access to refreshing water matters.",points:["Convenient","Carefully packaged","Refreshing"]},
  zobo:{kicker:"03 / REFRESHMENT",title:"Mandy Roselle Zobo",image:"images/zobo.png",description:"A rich hibiscus-based drink with a distinctive colour and full flavour, presented as a refreshing choice for everyday enjoyment and occasions.",points:["Hibiscus inspired","Rich flavour","Refreshing"]},
  tigernut:{kicker:"04 / NATURAL",title:"Mandy Tigernut Drink",image:"images/tigernut-drink.png",description:"A smooth, creamy tigernut beverage inspired by a familiar Nigerian favourite and crafted for a satisfying refreshment experience.",points:["Smooth texture","Naturally inspired","Refreshing"]},
  dispenser:{kicker:"05 / DISPENSER",title:"Mandy 19L Dispenser Water",image:"images/Mandy%2019L%20Dispenser%20Water.png",description:"A larger-format water solution for homes, offices, workplaces and other settings where dependable access to drinking water is needed.",points:["19-litre format","Home & office","Convenient supply"]},
  ice:{kicker:"06 / COOLING",title:"Mandy Ice",image:"images/mandy-ice.png",description:"Clean, crystal-clear ice designed for drinks, gatherings, hospitality, events and everyday cooling needs.",points:["Pure & clean","Keeps drinks cold","Event friendly"]},
  richcream:{kicker:"07 / VELVETY",title:"Mandy Deluxe Dry Gin",image:"images/Mandy%20Deluxe%20Dry%20Gin.png",description:"A premium gin with a unique blend of botanicals for a sophisticated taste.",points:["Crisp botanicals","Velvety finish","Cocktail canvas"]} 
};

window.addEventListener("load",()=>setTimeout(()=>document.getElementById("splash")?.classList.add("hide"),2700));
document.querySelectorAll("[data-order]").forEach(link=>link.href=WHATSAPP_URL);

const header=document.querySelector(".site-header");
window.addEventListener("scroll",()=>header?.classList.toggle("scrolled",window.scrollY>40),{passive:true});

const menuToggle=document.getElementById("menuToggle"),mainNav=document.getElementById("mainNav");
menuToggle?.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",open)});
mainNav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false")}));

const navLinks=[...document.querySelectorAll(".main-nav a")],sections=[...document.querySelectorAll("main section[id]")];
const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")===`#${entry.target.id}`))}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(section=>navObserver.observe(section));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}}),{threshold:.08});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const modal=document.getElementById("productModal"),modalImage=document.getElementById("modalImage"),modalTitle=document.getElementById("modalTitle"),modalKicker=document.getElementById("modalKicker"),modalDescription=document.getElementById("modalDescription"),modalPoints=document.getElementById("modalPoints"),modalMedia=document.getElementById("modalMedia");

function openProduct(key){
  const product=products[key]; if(!product)return;
  modalKicker.textContent=product.kicker;modalTitle.textContent=product.title;modalDescription.textContent=product.description;
  modalImage.src=product.image;modalImage.alt=product.title;modalPoints.innerHTML=product.points.map(point=>`<div>${point}</div>`).join("");
  modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");
}
document.querySelectorAll(".product-card").forEach(card=>{
  card.querySelector(".view-product")?.addEventListener("click",()=>openProduct(card.dataset.product));
  card.querySelector(".product-image")?.addEventListener("click",()=>openProduct(card.dataset.product));
});
function closeProduct(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
  }
  document.getElementById("modalClose")?.addEventListener("click",closeProduct);

document.getElementById("modalClose")?.addEventListener("click",closeProduct);
modalMedia?.addEventListener("pointermove",e=>{
  if(!modal?.classList.contains("open"))return;
  const r=modalMedia.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  modalImage.style.transform=`perspective(900px) rotateX(${(-y*12).toFixed(2)}deg) rotateY(${(x*16).toFixed(2)}deg) scale(1.04)`;
});
modalMedia?.addEventListener("pointerleave",()=>modalImage.style.transform="perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)");

/* Static sites cannot securely send notification emails by themselves.
   Connect this form to Formspree, Web3Forms, Netlify Forms, or your own backend
   when you are ready for real email delivery. */
document.getElementById("newsletterForm")?.addEventListener("submit",e=>{
  e.preventDefault();
  const email=document.getElementById("signupEmail").value.trim();
  if(!email)return;
  localStorage.setItem("mandyWaterSignup",email);
  document.getElementById("formMessage").textContent="Thank you. Your email has been registered on this device.";
  e.target.reset();
});

document.getElementById("year").textContent=new Date().getFullYear()