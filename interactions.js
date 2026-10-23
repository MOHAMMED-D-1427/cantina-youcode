

let addingForm = document.querySelector(".popupForm")
// let close = document.querySelector(".closeMark")

// console.log(addRecetteBtn)
// ========================================== Hide and show Pop-up Form
document.addEventListener("click", function(e){
    if(e.target.matches("header button")){
        // console.log("Clicked")
        addingForm.style.display = "flex"
    }
    if(e.target.matches(".popupForm") || e.target.matches(".closeMark span")){
        addingForm.style.display = "none"
    }
    if(e.target.matches(".annule")){
        e.preventDefault()
        addingForm.style.display = "none"
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
    if(e.target.matches("input[id='nom']")){
        if(!regex_name.test(value)){
            nameField.textContent = "Le nom doit comporter entre 3-30 caras.";
            isValid = false;
        }else{
            nameField.textContent = ''
            isValid = true;
        }
    }else if(e.target.matches("input[id='prix']")){
        if(!regex_price.test(Number(value))){
            priceField.textContent = "Le prix doit être de 1 à 40 dh";
            isValid = false;
        }else{
            priceField.textContent = ''
            isValid = true;
        }
    }
})

// ================================================== Add a recipe

let recipeId = 1;

let recipeInfo = {badge, cat};
document.addEventListener("change", (e)=>{
    if(e.target.matches("input[id='nom']")){
        recipeInfo.name = e.target.value;
        
    }else if(e.target.matches("input[id='prix']")){
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
                <span class="">${recipeInfo.name}</span>
                <span >${recipeInfo.price} DH</span>
            </div>
            <div>
                <span class="px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-lime-200 text-lime-900">${recipeInfo.cat}</span>
                <!-- badge -->
                <span class="px-2 py-0.5 mr-1.5 rounded-full text-xs font-medium bg-green-200 text-green-900">${recipeInfo.badge}</span>
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
                <button id="modify" data-id='${recipeId}' class="border border-gray-500 px-1.5 rounded cursor-pointer hover:opacity-80 hover:text-blue-700">
                    Modifier</button>
                <button  id="delete" data-id='${recipeId}' class=" border border-red-700 px-1.5 rounded cursor-pointer hover:opacity-80 hover:text-red-700">
                    Supprimer</button>
            </div>
        </div>
    `;
    div.innerHTML = recette
    gardeManger.append(div);
    recipeId++;
}

createBtn.onclick = (e)=>{
    e.preventDefault()
    if(!isValid){
        e.target.parentElement.style.marginBottom = "27px"
        validationError.textContent = "Veuillez remplir correctement tous les champs.";
        return
    }
    console.log(recipeInfo);
    addRecipe();
    addingForm.style.display = "none"
}

// ================================================== Detele a recipe

document.addEventListener("click", function(e){
    if(e.target.matches("#delete")){
        e.target.closest("#recipe").remove()
    }
});


























