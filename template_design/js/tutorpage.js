async function loadTutorInfo() {
	let res = await fetch('/tutorpage')
	if (res.ok) {
		let data = await res.json()
		let tutorInfos = data.data

    // console.log(tutorInfos)
		// getTutorInfo(tutorInfos)
		// console.table(tutorInfos)
  let tutorContainerElem = document.querySelector('.grid')
  for(let tutorInfo of tutorInfos.rows){
    let imagePath = tutorInfo.image_icon ? `${await getImage(tutorInfo.image_icon)}` : "/images/avatar/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction.jpg"
    console.log(tutorInfo.username,tutorInfo.image_icon,tutorInfo.chinese_name) 
    tutorContainerElem.innerHTML += 
      `  <div class="element-item transition metal" data-category="transition">
      <h3 class="name">${tutorInfo.username}</h3>
      <img src="${imagePath}"class="img-fluid speakers-image"alt=""/>
      <p class="subject">${tutorInfo.chinese_name}</p>
      </div>`
    }

	} else {
		alert('cannot fetch info')
	}
}

async function js(){
  // init Isotope
  var $grid = $('.grid').isotope({
      itemSelector: '.element-item',
      layoutMode: 'fitRows',
      getSortData: {
        name: '.name',
        subject: '.subject',
        number: '.number parseInt',
        category: '[data-category]',
        weight: function( itemElem ) {
          var weight = $( itemElem ).find('.weight').text();
          return parseFloat( weight.replace( /[\(\)]/g, '') );
        }
      }
    });
    
    // filter functions
    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };
    
    // bind filter button click
    $('#filters').on( 'click', 'button', function() {
      var filterValue = $( this ).attr('data-filter');
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: filterValue });
    });
    
    // bind sort button click
    $('#sorts').on( 'click', 'button', function() {
      var sortByValue = $(this).attr('data-sort-by');
      $grid.isotope({ sortBy: sortByValue });
    });
    
    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });
      
  }
  // js()

  async function getImage(imageName){

    let res = await fetch('imageName')
   
    if ( res.url.includes('404')){
        return '/images/avatar/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction.jpg'
    }else{
        return `uploads/${imageName}`
    }
}

  async function init(){
    // js()
    await loadTutorInfo()
    js()
  }
  init()