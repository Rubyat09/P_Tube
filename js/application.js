const loadCategories = async () => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await response.json();
    const categories = data.data;
    displayCategories(categories);
};

const displayCategories = (categories) => {
    const categoryOption = document.getElementById("category-option");

    categories.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `<button class="bg-gray-300 my-2 font-semibold px-4 lg:px-12 lg:py-3 rounded-xl" onclick="showCategoryContent('${category.category_id}')">${category.category}</button>`;
        categoryOption.appendChild(div);
    });
};

const showCategoryContent = async (category_id) => {
    const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${category_id}`
    );
    const data = await response.json();
    const categoryInfo = data.data;
    showData(categoryInfo);
    document
        .getElementById("sortArr")
        .addEventListener("click", async function () {
            sortArray(categoryInfo);
        });
};

const sortArray = (categoryInfo) => {
    console.log(categoryInfo);
};

const showData = (categoryInfo) => {
    const categoryContent = document.getElementById("content");
    categoryContent.innerHTML = "";
    const notFound = document.getElementById("notFound");
    notFound.innerHTML = "";


    if (categoryInfo.length === 0) {
        const div = document.createElement("div");
        div.innerHTML = `<div class="mx-auto pt-40 flex justify-center items-center ">
                    <img  src="./Icon.png" alt="">
                </div>
                <div class="text-center p-16 font-bold text-3xl">
                    <h3>Oops!! Sorry, There is no <br> content here</h3>
                </div>`;
        notFound.appendChild(div);
    } else {
        let arr = [];
        const sortArr = {};
        categoryInfo.forEach((category) => {
            const div = document.createElement("div");
            div.classList = `mx-auto px-4 py-8`;

            let time = category.others.posted_date;
            let hr = Math.floor(time / 3600);
            let min = Math.floor((time % 3600) / 60);


            div.innerHTML = ` <div class="bg-white shadow-2xl rounded-lg mb-6" >
                      <div class="md:flex-shrink-0 relative">
                        <img src="${category.thumbnail}" 
                        
                            class="w-96 h-48 rounded-lg rounded-b-none">
                            <p class="absolute bottom-3 left-[200px] rounded-md px-1 bg-gray-800 text-white">
                            ${category.others.posted_date
                                ? hr + " hrs " + min + " min ago "
                                : ""
                            }
                            </p>
                           
                        
                    </div>
                    <div class="px-4 py-2 mt-2">
    
                        <div class=" flex items-center -ml-3 my-3">
                            <div class="user-logo">
                                <img src="${category.authors[0].profile_picture
                }" class="w-12 h-12 object-cover rounded-full mx-4" >
                            </div>
                            <h2 class="text-sm text-gray-900 ml-4">
                                <p class="font-bold text-l">${category.title}</p>
                                <div class="flex flex-column gap-2">
                                    <p>${category.authors[0].profile_name} </p>
                                   
                                 <p> ${category.authors[0].verified
                    ? '<img src="./verify.png" class="w-5">'
                    : "<img>"
                } </p>
                                </div>
                                <p>${category.others.views}</p>
                                
                            </h2>
                            </div>
                        </div>
                    </div>`;

            categoryContent.appendChild(div);
        });
    }
};
loadCategories();
showCategoryContent("1000");






