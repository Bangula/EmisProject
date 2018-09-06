
document.getElementById('searchTopic').addEventListener('click', () => {

    let topicInput = document.getElementById('inputWord').value;
    if(topicInput !== ""){
        getData(topicInput);
    };    
});

let btns = document.getElementsByClassName('categoryBtn');
for(i=0; i<btns.length; i++){
    btns[i].addEventListener('click', function(event){
        getData(event.target.id);
    })
};
document.getElementById('inputWord').addEventListener('keyup', function(event){
    event.preventDefault();
    if(event.keyCode === 13){
        document.getElementById('searchTopic').click();
    }

});

document.getElementById('arrow').addEventListener('click', () => {
    document.querySelector('header').scrollIntoView({
        behavior: 'smooth'
    });
});

window.onscroll = () => {
     
    if(window.scrollY > 100){
        document.getElementById('arrowUp').style.opacity = '1'
    }else if(window.scrollY == 0) {
        document.getElementById('arrowUp').style.opacity = '0'
    }     
};

//Usong Fetch to get data from News API service and writing data to DOM
const getData = (keyWord) => {
        
    let url = getUrl(keyWord);
    fetch(url).then(data => {

        return data.json();
    }).then(res => {        

        //Emptying news container for next search       
        let content = document.getElementById('news-header');
        while(content.firstChild){
            content.removeChild(content.firstChild);
        }    
        document.querySelector('#result').scrollIntoView({
            behavior: 'smooth'
        });
        
        //Dynamic DOM update
        for(let i=0; i<res.articles.length; i++){  

            document.querySelector('#resultHeader').style.opacity = '1';
            document.querySelector('#resultSpan').style.opacity = '1';
            document.querySelector('#resultSpan').innerHTML = keyWord;

            let date = new Date(res.articles[i].publishedAt).toLocaleDateString();            
            let newDescription = shortnDescription(res.articles[i].description);
            
            let artic = document.createElement('div');
            artic.setAttribute('class', 'article');
            content.appendChild(artic);

            let s1 = document.createElement('div');
            s1.setAttribute('class', 'sect1');
            artic.appendChild(s1);
            let title1 = document.createElement('h1');
            title1.setAttribute('class', 'title');
            title1.innerHTML = res.articles[i].title;
            s1.appendChild(title1);
            let author1 = document.createElement('p');
            author1.innerHTML = `by ${res.articles[i].author} | ${date}`;
            s1.appendChild(author1);

            let s2 = document.createElement('div');
            s2.setAttribute('class', 'sect2');
            artic.appendChild(s2);
            let imgUrl = document.createElement('img');
            imgUrl.setAttribute('src', `${res.articles[i].urlToImage}`)
            s2.appendChild(imgUrl);

            let s3 = document.createElement('div');
            s3.setAttribute('class', 'sect3');
            artic.appendChild(s3);
            let descrip = document.createElement('p');
            descrip.setAttribute('class', 'description');
            descrip.innerHTML = newDescription;
            s3.appendChild(descrip);
            let artUrl = document.createElement('button');
            artUrl.setAttribute('class', 'articleUrl');
            artUrl.innerHTML = 'VIEW FULL POST';
            s3.appendChild(artUrl);

        }
    }).catch(err => {
        console.log('ERROR!');
    })
}

//Generating URL for API request by keyword 
const getUrl = (keyWord) => {

    let apiKey = 'babd0ca3754540a6b89171dfc0681bef';
    let url = `https://newsapi.org/v2/everything?q=${keyWord}&apiKey=${apiKey}`;
    return url
}


const shortnDescription = (str) => {
    
    if(str.length > 25) {
        str = str.substring(0,200) + "...";
        return str;        
    }return str;
}



