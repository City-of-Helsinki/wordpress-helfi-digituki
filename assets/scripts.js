(function($) {  
    $(document).ready(function(){

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