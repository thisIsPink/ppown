( function( $ ) {

	function stickyHeader() {
		var header = document.getElementById( "header-top" );
		var hero = document.getElementById( "hero" );
		var sticky = header.offsetTop;

		if ( window.pageYOffset > sticky ) {
			header.classList.add( "sticky" );
			hero.classList.add( "top-padding" );
		} else {
			header.classList.remove( "sticky" );
			hero.classList.remove( "top-padding" );
		}
	}

	stickyHeader();

	var lastId;
	var scrollItems = $( ".anchor-link" ).map( function(){
	   	var item = $( $( this ).attr( "href" ) );
	    if ( item.length ) { return item; }
	});

	function hideMobileMenu(){
		$( "#header-top" ).removeClass( "open" );
		$( "body" ).removeClass( "no-overflow" );
	}

	window.onscroll = function(){ 
		stickyHeader();
		var fromTop = $( this ).scrollTop() + 92;

		var cur = scrollItems.map(function(){
	     if ( $( this ).offset().top < fromTop )
	       return this;
	   });

		// Get the id of the current element
	    cur = cur[ cur.length - 1 ];
	    var id = cur && cur.length ? cur[ 0 ].id : "";

	    // set last id to current id and add class active to the 
		if( lastId !== id ) {
			lastId = "#" + id;
			$( ".anchor-link" ).removeClass( "active" );
			$( ".anchor-link" ).each( function(){
				if( $( this ).attr( "href" ) === lastId ){
					$( this ).addClass( "active" );
				}
			})
		}
	};

	if ( window.location.hash ){
		var hash = window.location.hash;
		$( ".links-wrapper a" ).each( function(){
			if ( $( this ).attr( "href" ) === hash ){
				$( this ).addClass( "active" );
			}
		});
	}

	// Header links for active classes
	$( ".anchor-link" ).on( "click", function( e ){
		e.preventDefault();

		$( ".links-wrapper a" ).each( function(){
			$( this ).removeClass( "active" );
		});

		// hide mobile once anchor is clicked
		hideMobileMenu();

		// Animate the scroll to the section
		var section = $( this ).attr( "href" );

		$( "html, body" ).animate({
			scrollTop: $( section ).offset().top - 90
		}, 1200);
	});

	// Mobile Menu functionality
	$( '.hamburger' ).on( "click", function() {
		$( "#header-top" ).toggleClass( "open" );
		$( "body" ).toggleClass( "no-overflow" );
	})

	// Mobile Menu 
	$( window ).resize(function() {
	  if ( $( window ).width() < 992 ){
	  	hideMobileMenu()
	  }
	});



} )( jQuery );

