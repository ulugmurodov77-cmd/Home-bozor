const demo=[
{id:1,title:"Zamonaviy hashamatli villa",city:"Toshkent",type:"Kottej",price:1850000000,rooms:5,area:320,image:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"},
{id:2,title:"Premium 3 xonali kvartira",city:"Toshkent",type:"Kvartira",price:850000000,rooms:3,area:115,image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800"},
{id:3,title:"Keng va shinam hovli",city:"Samarqand",type:"Hovli",price:1200000000,rooms:6,area:280,image:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"},
{id:4,title:"Minimalistik yangi uy",city:"Buxoro",type:"Kvartira",price:490000000,rooms:2,area:75,image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800"},
{id:5,title:"Luxury zamonaviy kottej",city:"Toshkent",type:"Kottej",price:2300000000,rooms:7,area:400,image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"},
{id:6,title:"Yorug' 2 xonali uy",city:"Farg'ona",type:"Kvartira",price:380000000,rooms:2,area:68,image:"https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800"}
];
let homes=JSON.parse(localStorage.getItem("he_homes")||"null")||demo;
let favorites=JSON.parse(localStorage.getItem("he_favs")||"[]");
let current=homes;
const money=n=>new Intl.NumberFormat("uz-UZ").format(n)+" so'm";
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function save(){localStorage.setItem("he_homes",JSON.stringify(homes));localStorage.setItem("he_favs",JSON.stringify(favorites))}
function render(list){
const grid=document.getElementById("grid");
if(!list.length){grid.innerHTML='<div class="empty">Mos keladigan uy topilmadi.</div>';return}
grid.innerHTML=list.map(h=>`<article class="card"><div class="card-img"><img src="${safe(h.image)}" onerror="this.src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'"><span class="tag">${safe(h.type)}</span><button class="heart ${favorites.includes(h.id)?"liked":""}" onclick="toggleFav(${h.id})">${favorites.includes(h.id)?"♥":"♡"}</button></div><div class="card-body"><h3>${safe(h.title)}</h3><div class="location">⌖ ${safe(h.city)}, O'zbekiston</div><div class="price">${money(h.price)}</div><div class="meta"><span>▦ ${h.rooms} xona</span><span>⌂ ${h.area} m²</span><span>HomeEstate</span></div></div></article>`).join("");
}
function toggleFav(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];save();render(current)}
function category(type,btn){document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");current=type==="Barchasi"?homes:homes.filter(h=>h.type===type);render(current)}
function searchHomes(){const city=document.getElementById("city").value,type=document.getElementById("type").value,max=Number(document.getElementById("maxPrice").value)||Infinity;current=homes.filter(h=>(!city||h.city===city)&&(!type||h.type===type)&&h.price<=max);render(current);document.getElementById("properties").scrollIntoView({behavior:"smooth"})}
function showAll(){current=homes;render(homes)}
function openModal(){document.getElementById("modal").classList.add("show")}
function closeModal(){document.getElementById("modal").classList.remove("show")}
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
document.getElementById("homeForm").addEventListener("submit",e=>{
e.preventDefault();const f=new FormData(e.target);
homes.unshift({id:Date.now(),title:f.get("title"),type:f.get("type"),city:f.get("city"),price:Number(f.get("price")),rooms:Number(f.get("rooms")),area:Number(f.get("area")),image:f.get("image")||"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"});
save();current=homes;render(homes);e.target.reset();closeModal();alert("E'lon muvaffaqiyatli qo'shildi!");
});
render(homes);
