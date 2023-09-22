window.onload = function () {}

cartdetails();
showcart();
function cartdetails(){

    var cbname = localStorage.getItem("ac"); 
    
    var ccname = localStorage.getItem("bc"); 
    
    var cpname = localStorage.getItem("cc"); 
    
    var cpprice = localStorage.getItem("dc"); 
    
    var cpquantity = localStorage.getItem("ec"); 
    
    var cpimage = localStorage.getItem("fc"); 

    if(cbname != null || cbname != undefined)
    {
    let citem =[cbname,ccname,cpname,cpprice,cpquantity,cpimage];
    

    localStorage.removeItem("ac");
    localStorage.removeItem("bc");
    localStorage.removeItem("cc");
    localStorage.removeItem("dc");
    localStorage.removeItem("ec");
    localStorage.removeItem("fc");

    let citems = localStorage.getItem("citems");

    if (citems == null) {
       cartitemsObj = [];
    } else {
      cartitemsObj = JSON.parse(citems);
    }
    let b = 0;
    cartitemsObj.forEach(function(e,index){
      if(e[5] == citem[5])
      {
        e[4]++;
        b=1;
      }
    });
    if(b == 0)
    {
    cartitemsObj.push(citem);
    }
    localStorage.setItem("citems", JSON.stringify(cartitemsObj));
}
 
}

function showcart()
{
    let citems = localStorage.getItem("citems");

    if (citems == null) {
       
        cartitemsObj = [];
    } else {
      cartitemsObj = JSON.parse(citems);
    }

    console.log(cartitemsObj);
    

    let totalcartitems = 0;
    let totalprice = 0;
    let html2="";

    cartitemsObj.forEach(function(e,index){
       console.log("Pname: "+ e[2]);
        html2 +=
        `	
        <div class = "container bd ">
        
        <div class = "row justify-content-center align-items-center">
        
        <div class = "col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" >
        <img src='images/${e[5]}' height=100px weight=90px>
        </div>
        &ensp;
        &ensp;
        &ensp;
        &ensp;
        &ensp;
        &ensp;
        &ensp;
        
        <div class = "col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
            <b>${e[0]}  &ensp; ${e[2]}</b>
            <br><b>${e[1]}</b>
            </div>

        <div class = "col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
            <b>${e[4]}</b>
        </div>

            <div class = "col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
            <b>₹ ${e[3]}</b>
            </div>
            
            
        
            
        <div class = "col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">		
            <a onClick="deletecitem(${index})"><img src ="images/delete.jpg" alt="Remove" height= 25px></a>

            </div>
            

    </div>
    </div>
    <br>  `;
           
        totalcartitems += parseInt(e[4]);
        
        totalprice += parseInt(e[3]);
    });

    localStorage.setItem("totalcart",totalcartitems);

    html2 +=
    `
    <div class = "tp"><h5><b>Total Price: ₹ ${totalprice}   </b> </h5></div>


		<br>		
		
		<button  data-toggle="modal" data-target="#exampleModal"  class = "pd"><h5 class = "ws"><b> Proceed To Checkout</b></h5></button>
		
	
    `;



   let allcartitems = document.getElementById("cartlist");
   if(cartitemsObj.length != 0)
   {
    allcartitems.innerHTML = html2;
   }
   else{
    allcartitems.innerHTML = 
    `
    <center>
	<img src = "images/emptycart.png" height=200px>
	<h2 style="color:firebrick">YOUR CART IS EMPTY</h2>
	</center>
	
    `;
   }
    
}



// Function to delete 
function deletecitem(index) {
    //   console.log("I am deleting", index);
    
    let citems = localStorage.getItem("citems");

    if (citems == null) {
       
        cartitemsObj = [];
    } else {
      cartitemsObj = JSON.parse(citems);
    }
    
      cartitemsObj.splice(index, 1);
      localStorage.setItem("citems", JSON.stringify(cartitemsObj));
      location.reload();
    }