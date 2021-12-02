(function($) {  
    $(document).ready(function(){
        $(".digituki-card-group.is-style-light").find("a.content__link").attr("tabindex", "-1")
        $(".wp-block-digituki-card", ".is-style-light").on('keypress',function(e) {
            if(e.which == 13) {
                $a = $(e.currentTarget).find("a");
                $a[0].click();
            }
        });
        $(".wp-block-digituki-card", ".is-style-light").on('click',function(e) {
            $a = $(e.currentTarget).find("a");
            $a[0].click();
        });


        $('.mapframe').on("mousedown", function(e) {
            $(e.currentTarget).addClass("active");
        });
        $(document).on('click', function (e) {
            if ($(e.target).closest(".mapframe").length === 0) {
                $(".mapframe").removeClass("active");
            }
        });
        
        var iframeClickedLast;
          
        // Events     
        function windowBlurred(e) {
            var el = document.activeElement;
            if (el.tagName.toLowerCase() == 'iframe') {
                $(".mapframe").addClass("active");
                iframeClickedLast = true;
            }
        }
          
        function windowFocussed(e) {
            if (iframeClickedLast) {
                var el = document.activeElement;
                $(".mapframe").removeClass("active");
                iframeClickedLast = false;
            }
        }
        

        // Attach Events
        window.addEventListener('focus', windowFocussed, true);  
        window.addEventListener('blur', windowBlurred, true);
          

    })

})( jQuery );