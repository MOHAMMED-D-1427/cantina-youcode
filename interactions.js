

let addingForm = document.querySelector(".popup-form")
let modifingForm = document.querySelector(".popup-modify-form")
// let close = document.querySelector(".closeMark")

// console.log(addRecetteBtn)
// ========================================== Hide and show Pop-up Form
document.addEventListener("click", function(e){
    if(e.target.matches("header button")){
        // console.log("Clicked")
        addingForm.style.display = "flex"
    }
    if(e.target.matches(".popup-form") || e.target.matches(".closeMark span") || e.target.matches(".popup-modify-form")){
        addingForm.style.display = "none";
        modifingForm.style.display = "none";
    }
    if(e.target.matches(".annule")){
        e.preventDefault();
        addingForm.style.display = "none";
        modifingForm.style.display = "none";
    }
});

// ================================================== Regular Expressions
const gardeManger = document.getElementById("garde-manger");
const daysCards = document.getElementById("days-cards");
const nameField = document.getElementById("name-error");
const priceField = document.getElementById("price-error");
const validationError = document.getElementById("val-error");
const createBtn = document.getElementById("create-btn");
const badge = document.querySelector("#badge > option").value;
const cat = document.querySelector("#cat > option").value;



const regex_name = /^[a-zA-Z]{3,30}$/;
const regex_price = /^([1-9]|[1-3][0-9]|40)$/;

let isValid = false;

document.addEventListener("input", (e)=>{
    const value = e.target.value; 
    if(e.target.matches("input[id='name']")){
        if(!regex_name.test(value)){
            nameField.textContent = "Le nom doit comporter entre 3-30 caras.";
            isValid = false;
        }else{
            nameField.textContent = ''
            isValid = true;
        }
    }else if(e.target.matches("input[id='price']")){
        if(!regex_price.test(Number(value))){
            priceField.textContent = "Le prix doit être de 1 à 40 dh";
            isValid = false;
        }else{
            priceField.textContent = ''
            isValid = true;
        }
    }
})
// ================================================== Show recipes
let recipesData = JSON.parse(localStorage.getItem("recipes"));

function showRecipes(){
    if(recipesData){
        for(let r of recipesData){
            let div = document.createElement("div");
            // let assigne = r.reservedFor == null ? "" : `[Assigné : ${r.reservedFor} - ${r.cat}]`;
            // console.log(!r.reservedFor)
            div.classList.add("recipe")
            let recette = `
            <div data-id='${r.id}'  class=" ${r.opacity} bg-black w-65 p-1.5 pt-5 rounded border-2 border-gray-500 text-sm font-bold h-40 flex flex-col justify-between relative">
                <span  class="text-red-700 bg-red-300 p-0.5 text-xs 
                    absolute top-0 left-0 ${r.reservedFor == "null" ? "invisible":""}"> ${`[Assigné : ${r.reservedFor} - ${r.cat}]`}</span>
                <div class="flex justify-between">
                    <span class="name">${r.name}</span>
                    <span class="price">${r.price} DH</span>
                </div>
                <div>
                    <span class="cat px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-lime-200 text-lime-900">${r.cat}</span>
                    <!-- badge -->
                    <span class="badge px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-green-200 text-green-900">${r.badge}</span>
                </div>
                <select data-cat='${r.cat}' name="days-options" class="day-to-reserve border-2 border-gray-500 rounded p-0.5 w-full bg-black">
                    <option value="null">En réserve</option>
                    <option value="Lundi">Lundi</option>
                    <option value="Mardi">Mardi</option>
                    <option value="Mercredi">Mercredi</option>
                    <option value="Jeudi">Jeudi</option>
                    <option value="Vendredi">Vendredi</option>
                </select>
                <div class="pt-2">
                    <button data-id='${r.id}' class="modify border border-gray-500 px-1.5 rounded cursor-pointer hover:opacity-80 hover:text-blue-700">
                        Modifier</button>
                    <button id="delete" data-id='${r.id}' class=" border border-red-700 px-1.5 rounded cursor-pointer hover:opacity-80 hover:text-red-700">
                        Supprimer</button>
                </div>
            </div>
        `;
        div.innerHTML = recette
        gardeManger.append(div);
        }
    }
}
showRecipes()

// ================================================== Show days

let daysData = JSON.parse(localStorage.getItem("days"));

let days = [{day: "Lundi", recipes: [{entree: "Libre", price: ''}, {plat: "Libre", price: ''}, 
    {dessert: 'Libre', price: ''}], reserved: false}, 
    {day: "Mardi", recipes: [{entree: "Libre", price: ''}, {plat: "Libre", price: ''}, 
    {dessert: 'Libre', price: ''}], reserved: false}, 
        {day: "Mercredi", recipes: [{entree: "Libre", price: ''}, {plat: "Libre", price: ''}, 
    {dessert: 'Libre', price: ''}], reserved: false}, 
        {day: "Jeudi", recipes: [{entree: "Libre", price: ''}, {plat: "Libre", price: ''}, 
    {dessert: 'Libre', price: ''}], reserved: false}, 
        {day: "Vendredi", recipes: [{entree: "Libre", price: ''}, {plat: "Libre", price: ''}, 
    {dessert: 'Libre', price: ''}], reserved: false}];

if(daysData){
    days = daysData;
}

function showDays(){

    for(let d of days){

        let div = document.createElement("div");
        div.classList.add("day-card")

        let day = `
        <div class="p-4 w-65 text-gray-400 opacity-80 h-fit
        bg-black rounded border-2 border-gray-500">
        <p class="font-bold ">${d.day}</p>
            <!-- --- -->
            <div>
                <div class="flex items-end my-1.5">
                    <span class="px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-lime-200 text-lime-900">
                        Entrée</span> <p class="text-xs">${d.recipes[0].entree+" - "+d.recipes[0].price}</p>
                </div>
                <div class="flex items-end my-1.5">
                    <span class="px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-orange-200 text-orange-900">
                        Plat</span> <p class="text-xs">${d.recipes[1].plat+" - "+d.recipes[1].price}</p>
                </div>
                <div class="flex items-end my-1.5">
                    <span class="px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-pink-200 text-pink-900">
                        Dessert</span> <p class="text-xs">${d.recipes[2].dessert+" - "+d.recipes[2].price}</p>
                </div>
                <hr>
                <p class="font-bold">Total Jour : <span class="text-green-600">${Number(d.recipes[0].price)+Number(d.recipes[1].price)+Number(d.recipes[2].price) || 0} DH</span>/50 DH</p>
                </div>
                </div>
                `;
                div.innerHTML = day
                daysCards.append(div);
            }

}

showDays()
// ================================================== Remove all days cards
function removeDaysCards(){
    let days = document.querySelectorAll(".day-card ");
    for(let d of days){
        d.remove()
    }
}
// ================================================== Remove all recipes
function removeRecipes(){
    let recipes = document.querySelectorAll(".recipe");
    for(let r of recipes){
        r.remove();
    }
}
// ================================================== Add a recipe to the garde manger

console.log(recipesData)

let recipeId = Number(localStorage.getItem("rId")) || 1;

let recipes = [];
if(recipesData){
    recipes = [...recipesData].sort();

}
// console.log(recipes)
let recipeInfo = {badge, cat, reservedFor: "null"};
document.addEventListener("change", (e)=>{
    if(e.target.matches("input[id='name']")){
        recipeInfo.name = e.target.value;
        
    }else if(e.target.matches("input[id='price']")){
        recipeInfo.price = e.target.value;
 
    }else if(e.target.matches("select[id='cat']")){
        recipeInfo.cat = e.target.value;

    }else if(e.target.matches("select[id='badge']")){
        recipeInfo.badge = e.target.value;
    }
});



function addRecipe(){
    let div = document.createElement("div");
    div.classList.add("recipe")
    let recette = `
        <div data-id='${recipeId}' class=" bg-black w-65 p-1.5 rounded border-2 border-gray-500 text-sm font-bold h-40 flex flex-col justify-between">
            <span  class="text-red-700 bg-red-300 p-0.5 text-xs 
                    absolute top-0 left-0 ${r.reservedFor == "null" ? "invisible":""}"> ${`[Assigné : ${r.reservedFor} - ${r.cat}]`}</span>
            <div class="flex justify-between">
                <span class="name">${recipeInfo.name}</span>
                <span class="price">${recipeInfo.price} DH</span>
            </div>
            <div>
                <span class="cat px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-lime-200 text-lime-900">${recipeInfo.cat}</span>
                <!-- badge -->
                <span class="badge px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-green-200 text-green-900">${recipeInfo.badge}</span>
            </div>
            <select name="days-options" data-cat="${recipeInfo.cat}" class="border-2 border-gray-500 rounded p-0.5 w-full bg-black">
                <option value="null">En réserve</option>
                <option value="Lundi">Lundi</option>
                <option value="Mardi">Mardi</option>
                <option value="Mercredi">Mercredi</option>
                <option value="Jeudi">Jeudi</option>
                <option value="Vendredi">Vendredi</option>
            </select>
            <div class="pt-2">
                <button data-id='${recipeId}' class="modify border border-gray-500 px-1.5 rounded cursor-pointer hover:opacity-80 hover:text-blue-700">
                    Modifier</button>
                <button id="delete"  data-id='${recipeId}' class="delete border border-red-700 px-1.5 rounded cursor-pointer hover:opacity-80 hover:text-red-700">
                    Supprimer</button>
            </div>
        </div>
    `;
    div.innerHTML = recette
    gardeManger.append(div);
    recipeInfo.id = recipeId;
    recipes.push(recipeInfo);
    localStorage.setItem("recipes", JSON.stringify(recipes))

    // console.log("RI: ",recipeInfo)
    console.log("RS: ",recipes)
    ++recipeId;
    localStorage.setItem("rId", recipeId)
    recipeInfo = {badge, cat, id: recipeId};
    // ====================
    toast.textContent = "La recette a été ajoutée.!";
    toast.classList.add("bg-[#007f00db]");
    toast.classList.remove("opacity-0");
    setTimeout(()=>{
        toast.classList.add("opacity-0");
        toast.classList.remove("bg-[#007f00db]");
    }, 2500);
}


createBtn.onclick = (e)=>{
    let nameIn = addingForm.querySelector("input[id='name']").value;
    let priceIn = addingForm.querySelector("input[id='price']").value;
    e.preventDefault()
    if(!isValid || nameIn.trim() == "" || priceIn.trim() == ""){
        console.log(nameIn.trim(), priceIn.trim())
        e.target.parentElement.style.marginBottom = "27px"
        validationError.textContent = "Veuillez remplir correctement tous les champs.";
        return
    }
    // console.log(recipeInfo);
    addRecipe();
    addingForm.style.display = "none"
}

// ================================================== Detele a recipe

document.addEventListener("click", function(e){
    if(e.target.matches("#delete")){
        let id = e.target.dataset.id;
        let update = recipes.filter(r => r.id != id)
        localStorage.setItem("recipes", JSON.stringify(update))

        toast.textContent = "La recette est supprimée!!";
        toast.classList.add("bg-[#ff0000bd]");
        toast.classList.remove("opacity-0");
        setTimeout(()=>{
            toast.classList.add("opacity-0");
            toast.classList.remove("bg-[#ff0000bd]");
        }, 2500);

        e.target.closest(".recipe").remove()
    }
});

// ================================================== Modify a recipe

let id = null;
document.addEventListener("click", function(e){
    e.preventDefault();

    if(e.target.matches("#garde-manger .modify")){
        // console.log("Clicked")
        modifingForm.style.display = "flex";
        id = e.target.dataset.id;
        let recipe = recipes.find(r => r.id == id);
        console.log("ID: ",id);
            console.log("R: ",recipe);
        let name = modifingForm.querySelector("#name");
        let price = modifingForm.querySelector("#price");

        name.value = recipe.name;
        price.value = recipe.price;  

        recipeInfo.name = name.value;
        recipeInfo.price = price.value ;
    }
    if(e.target.matches(".popup-modify-form #modify-btn")){
        let update = recipes.filter(r => r.id != id);
        console.log("update: ", update, id);
        recipes = [...update, {...recipeInfo, id}];
        localStorage.setItem("recipes", JSON.stringify(recipes.sort()));
        recipesData = recipes;
        // window.navigation.reload();
        modifingForm.style.display = "none";
        toast.textContent = "La recette est modifiée!";
        toast.classList.add("bg-[#007f00db]");
        toast.classList.remove("opacity-0");
        setTimeout(()=>{
            toast.classList.add("opacity-0");
            toast.classList.remove("bg-[#007f00db]");
        }, 2500);

        removeRecipes()
        showRecipes()

    }

    
    // ----------------------------

});


// ================================================== Set a recipe to a day

document.addEventListener("click", function(e){
    if(e.target.matches(".day-to-reserve")){
        let day = e.target.value;
        let id = e.target.closest("[data-id]").dataset.id;
        let cat = e.target.dataset.cat
        let isReserved = days.find(d => d.day == day)?.reserved;
        let dayInfo = days.find(d => d.day == day);
        
        let toast = document.querySelector("#toast");
        // ====================== Check If recipe is reserved
        console.log(dayInfo?.recipes[0].entree)
        if(dayInfo?.recipes[0].entree != "Libre" && cat == "Entrée" && day != "null"){
            toast.textContent = "La recette est réservée!!";
            toast.classList.add("bg-[#ff0000bd]");
            toast.classList.remove("opacity-0");
            setTimeout(()=>{
                toast.classList.add("opacity-0");
                toast.classList.remove("bg-[#ff0000bd]");
            }, 2500);
            console.log(isReserved, " - The recipe is reserved");
            return 
        }
        if(dayInfo?.recipes[1].plat != "Libre" && cat == "Plat principal" && day != "null"){
            toast.textContent = "La recette est réservée!!";
            toast.classList.add("bg-[#ff0000bd]");
            toast.classList.remove("opacity-0");
            setTimeout(()=>{
                toast.classList.add("opacity-0");
                toast.classList.remove("bg-[#ff0000bd]");
            }, 2500);
            return 
        }
        if(dayInfo?.recipes[2].dessert != "Libre" && cat == "Dessert" && day != "null"){
            toast.textContent = "La recette est réservée!!";
            toast.classList.add("bg-[#ff0000bd]");
            toast.classList.remove("opacity-0");
            setTimeout(()=>{
                toast.classList.add("opacity-0");
                toast.classList.remove("bg-[#ff0000bd]");
            }, 2500);
            return 
        }
        // ====================== Toast for a reserved recipe
        // if(day != "null"){
        //     toast.textContent = "La recette est réservée!";
        //     toast.classList.add("bg-[#007f00db]");
        //     toast.classList.remove("opacity-0");
        //     setTimeout(()=>{
        //         toast.classList.add("opacity-0");
        //         toast.classList.remove("bg-[#007f00db]");
        //     }, 2500);
        // }
        // ====================== Check total price
        if(day != "null"){
            let incomingPrice = recipes.find(r => r.id == id).price

            let totalPrice = Number(dayInfo.recipes[0].price)+Number(dayInfo.recipes[1].price)+Number(dayInfo.recipes[2].price)+Number(incomingPrice)
            console.log("Total Price: ", totalPrice);
            if(totalPrice > 50){
                console.log("==> Le prix est supérieur à 50 DH");
                toast.textContent = "Le prix est supérieur à 50 DH!!";
                toast.classList.add("bg-[#ff0000bd]");
                toast.classList.remove("opacity-0");
                setTimeout(()=>{
                    toast.classList.add("opacity-0");
                    toast.classList.remove("bg-[#ff0000bd]");
                }, 2500);
                return 
            }
        }
        // ======================
        console.log(id);
        let incDecOpacity = day != "null" ? "opacity-60" : " ";
        
        let find = {...recipes.find(r => r.id == id), reservedFor: day, opacity: incDecOpacity};
        let filter = recipes.filter(r => r.id != id);
        
        
        let update = [...filter, find];
        localStorage.setItem("recipes", JSON.stringify(update.sort()));
        recipesData = update;
        recipes = update;
        removeRecipes()
        showRecipes()

        // -------------
        // recipes: [{entree: "Libre", price: ''}, {plat: "Libre", price: ''}, 
        // {dessert: 'Libre', price: ''}]
        
        if(days){
            for(let recipe of recipes){
                for(let x=0; x<days.length; x++){
                    if(recipe.reservedFor == days[x].day){
                        switch(recipe.cat){
                            case "Dessert":
                                days[x].recipes[2].dessert = recipe.name;
                                days[x].recipes[2].price = recipe.price;
                                days[x].reserved = true;
                                // console.log(days);
                                break;
                            case "Plat principal":
                                days[x].recipes[1].plat = recipe.name;
                                days[x].recipes[1].price = recipe.price;
                                days[x].reserved = true;
                                // console.log(days);
                                break;
                            case "Entrée":
                                days[x].recipes[0].entree = recipe.name;
                                days[x].recipes[0].price = recipe.price;
                                days[x].reserved = true;
                                // console.log(days);
                                break;
                            default: 
                                break;
                        }
                    }
                }
            }
            localStorage.setItem("days", JSON.stringify(days))
            removeDaysCards();
            showDays();
        }
        

        


        console.log(recipes)
        // localStorage.setItem("recipes", JSON.stringify(update))

        // e.target.closest(".recipe").remove()
    }
});





















