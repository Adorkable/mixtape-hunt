// Mixtape js

   $(document).ready(function() {
    /* Simple image gallery. Uses default settings */
    $("a[href$='.jpg'],a[href$='.png'],a[href$='.gif'],a[href$='image']").attr('rel', 'gallery').fancybox();
    // $('.fancybox-media').attr('rel', 'media-gallery').fancybox();
  
    $('.fancybox').fancybox();
       
      /*Media helper. Group items, disable animations, hide arrows, enable media and button helpers.
      */
      $('.fancybox-media')
        .attr('rel', 'media-gallery')
        .fancybox({
          openEffect : 'none',
          closeEffect : 'none',
          prevEffect : 'none',
          nextEffect : 'none',

          arrows : false,
          helpers : {
            media : {},
            buttons : {},
            overlay : {
              css : {
                'background' : 'rgba(55,55,55,0.85)'
              }
            }
          }
        });

  });


      // $('.flip-container').click(function() {
      //   $(this).classList.toggle('flip');
      // });

      // $(function() {
      //   if (Modernizr.touch) {   
      //       alert('Touch Screen');
      //   } else {
      //       alert('No Touch Screen');
      //   }
      // });

      // Fade in footer while scrolling down
      // $(function() {
      //     var header = $(".trapezoid");
      //     $(window).scroll(function() {
      //         var scroll = $(window).scrollTop();

      //         if (scroll >= 200) {
      //             header.addClass('fixedfoot');
      //         } else {
      //             header.removeClass('fixedfoot');
      //         }
      //     });
      // });


    // $('div.wellplayed.md-effect-3').addClass('md-show');


      // $('div.wellplayed.md-effect-3').each(function() {
      //   classie.add( this, 'md-show' );
      //   $('.md-overlay').removeEventListener( 'click', removeModalHandler );
      //   $('.md-overlay').addEventListener( 'click', removeModalHandler );
      // });


      // Toggle compose
      // $('a.wellplayed').click(function() {
      //   $('section.wellplayed').removeClass('hidden');
      // });
      // $('.closecompose').click(function() {
      //   $('section.wellplayed').addClass('hidden');
      // });

    // });