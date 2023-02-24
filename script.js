
class CartItem{
    constructor(name,desc,img,price){
        this.name=name;
        this.desc=desc;
        thie.img=img;
        this.price=price;
        this.quantity=1;
    }
}

class LocalCart{

    static key = 'cartItem';

     static getLocalCartItem(){
        let cartMap = new Map();
        const cart = localStorage.getItem(key)
        if(cart === null || cart.length === 0) return cartMap
              return  new Map(Object.entries(JSON.parse(cart)))
        
     }
     static addItemToLocalCart(id,item){
        let cart = LocalCart.getLocalCartItem()

        if(cart.has(id)){
            let mapItem = cart.get(id)
            mapItem.quantity+=1
            cart.set(id.mapItem)
        }
        else{
            cart.set(id,item);
            localStorage.setItem(key,JSON.stringify(Object.fromEntries(cart)))
            updateCartUI()
        }
     }
     static removeItemFromCart(id){
        let cart = LocalCart.getLocalCartItem()
        if(cart.has(id)){
            let mapItem = cart.get(id)

            if(mapItem.quantity>1){
                mapItem.quantity-=1
                cart.set(id,mapItem)
            }
            else{
                cart.delete(id)
            }
        }
        if(cart.length === 0){
            localStorage.clear()
            
        }
        else{
            localStorage.set(key,Json.stringify(Object.fromEntries(cart)))
            updateCartUI()
        }
     }
}





const cartIcon = document.querySelector('.fa-cart-shopping');
const cartWindow = document.querySelector('.whole-cart-window');
 cartWindow.inWindow = 0;

 const addToCartBtns = document.querySelectorAll('.add-to-cart-btn')
 addToCartBtns.forEach((btn)=>{
    btn.addEventListener('click',addItemFunction)
 })

 function addItemFunction(e){
    const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
    const img = e.target.parentElement.parentElement.previousElementSibling.src;
    const name = e.target.parentElement.previousElementSibling.textContent;
    const desc = e.target.parentElement.children[0].textContent;
    const price = e.target.parentElement.children[1].textContent;
    price= price.replace("RS",'');
    const item = new CartItem(name,desc,img,price)
    LocalCart.addItemToLocalCart(id,item);

console.log(price);

 }

cartIcon.addEventListener('mouseover',()=>{
  if(cartWindow.classList.contains('hide'))
  cartWindow.classList.remove('hide')
})

cartIcon.addEventListener('mouseleave',()=>{
    //if(!cartWindow.classList.contains('hide'))
    setTimeout(() => {
         if(cartWindow.inWindow === 0){
            cartWindow.classList.add('hide');
         }
    }, 500);
    
})

cartWindow.addEventListener('mouseover',()=>{
    cartWindow.inWindow=1;
})

cartWindow.addEventListener('mouseleave',()=>{
    cartWindow.inWindow=0;
    cartWindow.classList.add('hide');
})


