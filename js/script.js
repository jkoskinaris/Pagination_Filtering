/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const studentsListItems = document.getElementsByClassName('student-list')[0].children;
const studentsPerPage=10;

/***
  Function for hiding all the students and then displaying 
  the ones that correspond to the page
 ***/
function hideStudents(studentsList,page){

   let startIndex = (page*studentsPerPage) - studentsPerPage;
   let endIndex = page*studentsPerPage;
   console.log('Students list '+studentsList.length);
   console.log('Start '+startIndex);
   console.log('EndIndex '+endIndex);

   //Initially hide all students
   for(let i=0;i<studentsListItems.length;i++){
   
      let liElement = studentsListItems[i];
      liElement.style.display='none';
   }

   //Show those whose index is between start and end index of given page param
   for(let i=0;i<studentsList.length;i++){

      let liElement = studentsList[i];
      if(i>=startIndex && i<endIndex ){
         //console.log(liElement.textContent);
         liElement.style.display='block';
         
      }
      /*else{
         liElement.style.display='none';
      }*/
   }
}







/*** 
   Function showPage which calls our hideStudents function;perhaps redundancy here
***/
function showPage(studentsList,pageNumber){
   hideStudents(studentsList,pageNumber);
}



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(studentsList){
   //find the div element with id page

   //let existingPaginationDIV=document.querySelector('.pagination');
   //if(existingPaginationDIV !== null){
   //existingPaginationDIV.parentNode.removeChild(document.querySelector('.pagination'));
   removeDOMNodeByClass('.pagination');
  // }
   const pageDIV = document.querySelector('.page');

   let paginationDIV = document.createElement('div');
   paginationDIV.className='pagination';

   let linksUL = document.createElement('ul');

   const pages = Math.ceil(studentsList.length/studentsPerPage);

   console.log("I will create "+pages+" pages");

   for(let i=1;i<=pages;i++){

      const liElement = document.createElement('li');
      
      const linkElement = createLinkElement(i);
      linkElement.addEventListener('click', (e) =>{

         const page =e.target.textContent;
         console.log("Page to submit "+page);

         removeActiveClassFromLinks();

         let clickedLink = e.target;
         clickedLink.className='active';

         showPage(studentsList,page);
      });

      liElement.appendChild(linkElement);
      linksUL.appendChild(liElement);
   }

   paginationDIV.appendChild(linksUL);
   pageDIV.appendChild(paginationDIV);

}

/***
 * Function that resets the class name of all links
 * 
 */
function removeActiveClassFromLinks(){

   const links = document.querySelectorAll('li > a');
   for(let i=0;i<links.length;i++){
   links[i].className="";
  }
}

function appendSearch(){

   const pageHeaderDIV = document.getElementsByClassName('page-header')[0];

   let divSearch = document.createElement('div');
   divSearch.className='student-search';

   let inputElement = document.createElement('input');
   inputElement.placeholder="Search for students ...";

   let searchButton = document.createElement('button');
   searchButton.textContent='Search';
   
   divSearch.appendChild(inputElement);
   divSearch.appendChild(searchButton);
   
   pageHeaderDIV.appendChild(divSearch);

   inputElement.addEventListener('keyup',(e)=>{

      
         let searchValue = inputElement.value;
         console.log('Search button is clicked with searchValue '+searchValue);
         searchStudents(searchValue);
      
      
   
   
   });

   searchButton.addEventListener('click',(e)=>{

   if(e.target.tagName === 'BUTTON' && e.target.textContent==='Search'){
      let searchValue = inputElement.value;
      console.log('Search button is clicked with searchValue '+searchValue);
      searchStudents(searchValue);
   }
   


});

}

function searchStudents(searchValue){

   //let noResultDiv = document.querySelector('.noResultClass');
   //if(noResultDiv !== null){
      //document.querySelector('.noResultClass').parentNode.removeChild(document.querySelector('.noResultClass'));
      removeDOMNodeByClass('.noResultClass');
   //}

   let searchedStudentsListItems = [];  
   for(let i=0;i<studentsListItems.length;i++){

      let textContent = studentsListItems[i].textContent;
      //console.log('index '+i+' textContent '+textContent+" iOf:"+textContent.indexOf(searchValue));
      if(textContent.indexOf(searchValue)>0){
         //console.log("Found value in li index "+i);
         //console.log('index '+i+' textContent '+textContent+" iOf:"+textContent.indexOf(searchValue));
         searchedStudentsListItems.push(studentsListItems[i]);
      }
   }

   console.log('Total search results '+searchedStudentsListItems.length);
   if(searchedStudentsListItems.length>0){
      showPage(searchedStudentsListItems,1);
      appendPageLinks(searchedStudentsListItems);
   }else{
      appendNoResultsDIV();
      showPage(studentsListItems,0);
   }

}

function appendNoResultsDIV(){

   

      const studentSearchDIV = document.getElementsByClassName('student-search')[0];
   
      /*let divNoResult = document.createElement('div');
      divNoResult.innerHTML="<h1>No results found<h1>";
      divNoResult.className='noResultClass';
      */
      let divNoResult = createNoResultsDIV();
      studentSearchDIV.appendChild(divNoResult);
      //document.querySelector('.pagination').parentNode.removeChild(document.querySelector('.pagination'));
      removeDOMNodeByClass('.pagination');

}

function createLinkElement(index){
      const linkElement = document.createElement("a");
      linkElement.href="#";
      linkElement.textContent=index;
      if(index===1){
         linkElement.className='active';
      }
      

      return linkElement;

}

// Function that when given the className removes the element (if it exists) from it's parent (if it exists)
function removeDOMNodeByClass(nameOfClass){
   let specificDOMnode = document.querySelector(nameOfClass);
   if(specificDOMnode !== null){
      let parentDOMNode = specificDOMnode.parentNode;
      if(parentDOMNode !== null){
       
         parentDOMNode.removeChild(specificDOMnode);

      }
   }
}

function createNoResultsDIV(){
   let divNoResult = document.createElement('div');
   divNoResult.innerHTML="<h1>No results found<h1>";
   divNoResult.className='noResultClass';
   return divNoResult;
}


appendSearch();
showPage(studentsListItems,1);
appendPageLinks(studentsListItems);


// Remember to delete the comments that came with this file, and replace them with your own code comments.