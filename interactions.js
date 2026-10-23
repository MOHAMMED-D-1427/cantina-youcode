

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
const nameField = document.getElementById("name-error")
const priceField = document.getElementById("price-error")
const validationError = document.getElementById("val-error")
const createBtn = document.getElementById("create-btn")

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

createBtn.onclick = (e)=>{
    e.preventDefault()
    if(!isValid){
        e.target.parentElement.style.marginBottom = "27px"
        validationError.textContent = "Veuillez remplir correctement tous les champs.";
        return
    }
}


