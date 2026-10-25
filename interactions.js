

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
let localStorageData = JSON.parse(localStorage.getItem("recipes"));

if(localStorageData){
    for(let r of localStorageData){
        let div = document.createElement("div");
        let recette = `
        <div id="recipe" class="bg-black w-65 p-1.5 rounded border-2 border-gray-500 text-sm font-bold h-40 flex flex-col justify-between">
            <div class="flex justify-between">
                <span class="name">${r.name}</span>
                <span class="price">${r.price} DH</span>
            </div>
            <div>
                <span class="cat px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-lime-200 text-lime-900">${r.cat}</span>
                <!-- badge -->
                <span class="badge px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-green-200 text-green-900">${r.badge}</span>
            </div>
            <select id="day" class="border-2 border-gray-500 rounded p-0.5 w-full bg-black">
                <option value="">En réserve</option>
                <option value="">Lundi</option>
                <option value="">Mardi</option>
                <option value="">Mercredi</option>
                <option value="">Jeudi</option>
                <option value="">Vendredi</option>
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

// ================================================== Add a recipe

console.log(localStorageData)

let recipeId = Number(localStorage.getItem("rId")) || 1;

let recipes = [];
if(localStorageData){
    recipes = [...localStorageData].sort();

}
// console.log(recipes)
let recipeInfo = {badge, cat};
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
    let recette = `
        <div id="recipe" class="bg-black w-65 p-1.5 rounded border-2 border-gray-500 text-sm font-bold h-40 flex flex-col justify-between">
            <div class="flex justify-between">
                <span class="name">${recipeInfo.name}</span>
                <span class="price">${recipeInfo.price} DH</span>
            </div>
            <div>
                <span class="cat px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-lime-200 text-lime-900">${recipeInfo.cat}</span>
                <!-- badge -->
                <span class="badge px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-green-200 text-green-900">${recipeInfo.badge}</span>
            </div>
            <select id="day" class="border-2 border-gray-500 rounded p-0.5 w-full bg-black">
                <option value="">En réserve</option>
                <option value="">Lundi</option>
                <option value="">Mardi</option>
                <option value="">Mercredi</option>
                <option value="">Jeudi</option>
                <option value="">Vendredi</option>
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
}

createBtn.onclick = (e)=>{
    e.preventDefault()
    if(!isValid){
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

        e.target.closest("#recipe").remove()
    }
});

// ================================================== Modify a recipe

let id = null;
document.addEventListener("click", function(e){
        e.preventDefault();

    if(e.target.matches("#garde-manger .modify")){
        // console.log("Clicked")
        modifingForm.style.display = "flex"
        id = e.target.dataset.id;
        let recipe = recipes.find(r => r.id == id);
        console.log("ID: ",id)
            console.log("R: ",recipe)
        let name = modifingForm.querySelector("#name");
        let price = modifingForm.querySelector("#price");

        name.value = recipe.name;
        price.value = recipe.price;  
    }
    if(e.target.matches(".popup-modify-form #modify-btn")){
        let update = recipes.filter(r => r.id != id);
        console.log("update: ", update, id)
        recipes = [...update, {...recipeInfo, id}];
        localStorage.setItem("recipes", JSON.stringify(recipes.sort()));
        window.navigation.reload()
    }

    
    // ----------------------------

});

// document.addEventListener("click", function(e){
    
//     if(e.target.matches("#recipe .modify")){
//         addingForm.style.display = "flex";
//         let id = e.target.dataset.id;
//         let recipe = recipes.find(r => r.id == id);
//         console.log("ID: ",id)

//         console.log("RS2",recipes)

//         let name = addingForm.querySelector("#name");
//         let price = addingForm.querySelector("#price");
//         let badge = addingForm.querySelector("#badge");
//         let cat = addingForm.querySelector("#cat");
//         let create = addingForm.querySelector("#create-btn");
//         create.textContent = "Modifer"
//         create.id = "modify-btn"
//         console.log("Name: ",name.value)
        
//         name.value = recipe.name;
//         price.value = recipe.price;
//         cat.value = recipe.cat;
//         badge.value = recipe.badge;

//         // console.log(recipe)
//         // console.log(name, price)

//     }
    
// });


























