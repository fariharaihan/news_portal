const categoryLoadData = async () => {
    const cateGoryUrl = `https://openapi.programming-hero.com/api/news/categories`;
    // const cateGoryUrl = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try {
        const res = await fetch(cateGoryUrl);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch (error) {
        alert('Something wrong')
    }
}

const displayCategory = allCategoris => {
    // console.log(allCategoris)
    const categoryContainer = document.getElementById('category-container');

    categoryContainer.classList.add('list-item')
    allCategoris.forEach(category => {
        // console.log(category)
        const categoryDiv = document.createElement('ul')
        categoryDiv.innerHTML = `
        <a onclick="categoryNewsloadData('${category.category_id}')">${category.category_name}</a>
        `;

        categoryContainer.appendChild(categoryDiv);

    })
}


const categoryNewsloadData = async (_id) => {
    toggleSpinner(true);
    const newsCategoryUrl = `https://openapi.programming-hero.com/api/news/category/${_id}`;
    // const newsCategoryUrl = ` https://openapi.programming-hero.com/api/news/category/01`;
    try {
        const res = await fetch(newsCategoryUrl);
        const data = await res.json();
        displayCategoryNews(data.data);
    }
    catch (error) {
        alert('Smonething Worng')
    }
}


const displayCategoryNews = categoryItem => {
    // console.log(categoryItem)
    const newsContainer = document.getElementById('news-container')
    newsContainer.textContent = '';
    categoryItem.forEach(news => {
        // console.log(news)

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `

        <div class="card mb-3 ">
        <div  class="row g-0">
            <div class="col-md-2">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-10">
                <div class="card-body">
                    <h5 class="card-title">${news.title ? news.title : 'No title found'}</h5>
                    <p class="card-text">${news.details.slice(0, 90)}...</p>
                     <div class=" d-flex aling-item-center justify-content-between">
                        <div class="d-flex"><img src="${news.author.img}" class="img-thumbnail" alt=""><span class="px-3"style="width:100px">${news.author.name ? news.author.name : 'No data found'}</span></div>
                        <div><i class="fa-regular fa-eye"></i>${news.total_view ? news.total_view : 'No viewer found'}</div>
                        <button onclick="loadNewsDetails('${news._id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsModal">View All</button>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
     `;
        newsContainer.appendChild(newsDiv);
    });
    toggleSpinner(false);
}
// ----loader----
const toggleSpinner = isLoading => {
    const loadersection = document.getElementById('loader')
    if (isLoading) {
        loadersection.classList.remove('d-none')
    }
    else {
        loadersection.classList.add('d-none')
    }
}
// ---view more data
const loadNewsDetails = async (id) => {
    const newsDetailurl = ` https://openapi.programming-hero.com/api/news/${id}`;

    try {
        const res = await fetch(newsDetailurl);
        const data = await res.json();
        displayModalDetail(data.data[0])
    }
    catch (error) {
        alert('Smonething Worng')
    }

}
const displayModalDetail = news => {
    console.log(news)
    const modalTitle = document.getElementById('newsModalLabel');
    modalTitle.innerText = news.title;
    const modalBody = document.getElementById('modal-info');
    modalBody.innerHTML = `
        <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        <h5>News title: ${news.title}</h5>
        <p>Total view: ${news.total_view ? news.total_view : 'No data found'}</p>
        <p>Rating: ${news.rating.number ? news.rating.number : 'No data found'}</p>
        <p>author name: ${news.author.name ? news.author.name : 'no data found'}</p>
        <p>Publish date: ${news.author.published_date ? news.author.published_date : 'No data found'}</p>

    `
}
// loadCategory()
categoryLoadData()