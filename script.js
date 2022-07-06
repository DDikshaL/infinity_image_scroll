const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

//Unsplash API
let count = 5;
const apiKey = 'bKaIoBg_gQYHA3Drk85kYXqbUGjzYIJxAxapG9LxdFc';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded()
{
    // console.log('Image Loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages)
    {
        loader.hidden = true;
        ready = true;
        // console.log('ready=',ready);
        initialLoad = false;
        count = 30;
        apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}


//Helper function for set Attributes on DOM element
function setAttributes(element, attributes)
{
    for(const key in attributes)
    {
        element.setAttribute(key,attributes[key]);
    }

}


//Create Elements for links and photos, add to DOM
function displayPhotos()
{
     imagesLoaded = 0;
     totalImages = photosArray.length;
    // console.log('totalImages', totalImages);
   

    //Run this function for each object in photoArray
    photosArray.forEach((photo) => {

    //Create <a> link to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item,{
        href: photo.links.html,
        target: '_blank',
    });

    //Create img for photos
    const img = document.createElement('img');
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.alt_description);

    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });

    //Event Listener, check when each is finished loading
    img.addEventListener('load',imageLoaded);

    //Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });

}
//Get photos from unsplash API

async function getPhotos()
{
    try
    {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();

    }catch(error)
    {
        //Catch Error Here
    }
}

//Check to see if scrolling near bottom of the page, Load more photos
window.addEventListener('scroll', () =>
{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready)
    {
        ready = false;
        getPhotos();
        
    }
})

//on Load

getPhotos();

