(function($) {
    "use strict";

    // ______________ Global Loader
    $(window).on("load", function(e) {
        $("#global-loader").fadeOut("slow");
    })


    // ______________ Cover-image
    $(".cover-image").each(function(e) {
        var attr = $(this).attr('data-bs-image-src');
        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).css('background', 'url(' + attr + ') center center');
        }
    });


    // ______________Rating Stars
    var ratingOptions = {
        selectors: {
            starsSelector: '.rating-stars',
            starSelector: '.rating-star',
            starActiveClass: 'is--active',
            starHoverClass: 'is--hover',
            starNoHoverClass: 'is--no-hover',
            targetFormElementSelector: '.rating-value'
        }
    };

    // ______________Active Class
    $(".horizontalMenu-list li a").each(function(e) {
        var pageUrl = window.location.href.split(/[?#]/)[0];
        if (this.href == pageUrl) {
            $(this).addClass("active");
            $(this).parent().addClass("active"); // add active to li of the current link
            $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
            $(this).parent().parent().prev().click(); // click the item to make it drop
        }
    });

    // ______________ Back to Top
    $(window).on("scroll", function(e) {
        if ($(this).scrollTop() > 0) {
            $('#back-to-top').fadeIn('slow');
        } else {
            $('#back-to-top').fadeOut('slow');
        }
    });
    $(document).on("click", "#back-to-top", function(e) {
        $("html, body").animate({
            scrollTop: 0
        }, 0);
        return false;
    });

    // ______________Quantity-right-plus
    var quantitiy = 0;
    $(document).on('click', '.quantity-right-plus', function(e) {
        e.preventDefault();
        var quantity = parseInt($('#quantity').val());
        $('#quantity').val(quantity + 1);
    });
    $(document).on('click', '.quantity-left-minus', function(e) {
        e.preventDefault();
        var quantity = parseInt($('#quantity').val());
        if (quantity > 0) {
            $('#quantity').val(quantity - 1);
        }
    });



    // ______________Chart-circle
    if ($('.chart-circle').length) {
        $('.chart-circle').each(function(e) {
            let $this = $(this);
            $this.circleProgress({
                fill: {
                    color: $this.attr('data-color')
                },
                size: $this.height(),
                startAngle: -Math.PI / 4 * 2,
                emptyFill: '#f9faff',
                lineCap: ''
            });
        });
    }
    const DIV_CARD = 'div.card';

    // ___________TOOLTIP
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // __________POPOVER
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })
    // By default, Bootstrap doesn't auto close popover after appearing in the page
    $(document).on('click', function(e) {
        $('[data-bs-toggle="popover"],[data-original-title]').each(function() {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                (($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false // fix for BS 3.3.6
            }

        });
    });

    // ______________Card Remove
    $(document).on('click', '[data-bs-toggle="card-remove"]', function(e) {
        let $card = $(this).closest(DIV_CARD);
        $card.remove();
        e.preventDefault();
        return false;
    });

    // ______________Card Collapse
    $(document).on('click', '[data-bs-toggle="card-collapse"]', function(e) {
        let $card = $(this).closest(DIV_CARD);
        $card.toggleClass('card-collapsed');
        e.preventDefault();
        return false;
    });

    // ______________Card Full Screen
    $(document).on('click', '[data-bs-toggle="card-fullscreen"]', function(e) {
        let $card = $(this).closest(DIV_CARD);
        $card.toggleClass('card-fullscreen').removeClass('card-collapsed');
        e.preventDefault();
        return false;
    });


})(jQuery);

// ______________ Modal
$(document).ready(function() {
    $("#myModal").modal('show');
});

$(document).ready(function() {
    $(".sticky").parent().addClass('header-absolute');
});

/* Clock Timer functionality */
/*var TimeEndSeconds=$('#mt_timereamaing').val();
var Clock = {
    totalSeconds: parseInt(0),
    start: function () {
        if (!this.interval){ var self = this;
            function pad(val) { return val > 9?val:"0"+val; }
            this.interval = setInterval(function(){
                self.totalSeconds+=1; //console.log(self.totalSeconds);
                var hours=pad(Math.floor(self.totalSeconds / (60*60) % 60));
                var minutes=pad(Math.floor(self.totalSeconds / 60 % 60));
                var seconds=pad(parseInt(self.totalSeconds % 60));
                $("#mtRemainingTime").text(hours+':'+minutes+':'+seconds);                          
            }, 1000);            
        }
        console.log(self.totalSeconds);
    },    
    reset: function(){
        Clock.totalSeconds = null; 
        clearInterval(this.interval);
        $("#mtRemainingTime").text('00:00:00');      
        delete this.interval;
    },
    pause: function () {
        clearInterval(this.interval);
        delete this.interval;
    },
    resume: function () {
        this.start();
    },    
    restart: function () {
        this.reset();
        Clock.start();
    }
};

*/

/* Enable tooltip for all elements */
//$(function () {
//    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
//    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl){
//      return new bootstrap.Tooltip(tooltipTriggerEl);
//    });
//});

/* Custom modal function */
var bootstrap;
const ajaxurl = $('input[name=ajaxurl]').val();
const ajaxToken = $('input[name=ajaxToken]').val();
const ajaxloader = '<div class="d-flex align-items-center"><strong>Loading...</strong><div class="spinner-border text-primary ms-auto" role="status" aria-hidden="true"></div></div>';
$(function() {
    /* Add to cart */
    $('.addtocart').click(function() {
        var $this = $(this);
        var buttontext = '<span>Add to Cart</span><i class="fe fe-shopping-cart mt-1 ms-2 fs-14"></i>';
        //$(this).html(); $('#cartmsg').addClass('d-none'); //console.log(buttontext);
        //$(this).html('<i class="fa fa-spinner" aria-hidden="true"></i>');
        var postData = {
            cart: $(this).data('cart'),
            requestType: 'frontend',
            requesToken: ajaxToken,
            route: 'ecomm.ManageEcomm.addToCart'
        };
        $.post(ajaxurl + 'ajax', postData, function(resp) { ///console.log(buttontext);
            var response = JSON.parse(resp); ///console.log(response);            
            if (response.error == '') {
                $('#' + $this.data('cartid')).removeClass('d-none');
                $('#' + $this.data('cartid')).addClass('alert-success');
                $('#' + $this.data('cartid')).text(response.message);
                //$('#cartmsg').removeClass('d-none');
                //$('#cartmsg').addClass('alert-success');
                //$('#cartmsg').text(response.message);
                $('.cartqtytop').text(response.count);
                $(this).html(buttontext);
                window.location.href = response.carturl;
            } else {
                $('#' + $this.data('cartid')).addClass('alert-danger');
                $('#' + $this.data('cartid')).text(response.message);
                $('#' + $this.data('cartid')).removeClass('d-none');
                //                $('#cartmsg').addClass('alert-danger');
                //                $('#cartmsg').text(response.message);
                //                $('#cartmsg').removeClass('d-none');
                $(this).html(buttontext);
            }
            $(this).html(buttontext);
        }).fail(function() {
            $(this).html(buttontext);
            console.log('Error Loading data ... ');
        }).always(function() {
            $(this).html(buttontext);
        });
    });

    $('.viewfotm').click(function() {
        var postData = {
            otmId: $(this).attr('id'),
            title: $(this).data('title'),
            requestType: 'frontend',
            requesToken: ajaxToken,
            size: 'lg',
            route: 'modals.ManageModels.openftm'
        };
        $.post(ajaxurl + 'ajax', postData, function(r) {
            $('#viewfotmprofile').html(r);
            $("#viewfotmprofile").modal('show');
        }).fail(function() {
            console.log('Error Loading data ... ');
        });
    });

    $('.getaquotetc').click(function() {
        var postData = {
            tcId: $(this).attr('id'),
            title: $(this).data('title'),
            requestType: 'frontend',
            requesToken: ajaxToken,
            size: 'lg',
            route: 'modals.ManageModels.getAQuoteTC'
        };
        $.post(ajaxurl + 'ajax', postData, function(r) {
            $('#getaquotetc').html(r);
            $("#getaquotetc").modal('show');
        }).fail(function() {
            console.log('Error Loading data ... ');
        });
    });
    /* Apply for the job form */
    /* View mock tests in the package */
    $('.mtnamesinpack').click(function() {
        var postData = {
            ids: $(this).data('ids'),
            title: $(this).data('title'),
            requesToken: ajaxToken,
            requestType: 'frontend',
            size: 'lg',
            route: 'modals.ManageModels.viewmts'
        };
        $.post(ajaxurl + 'ajax', postData, function(r) {
            $('#mtnames_inpack').html(r);
            $("#mtnames_inpack").modal('show');
        }).fail(function() {
            console.log('Error Loading data ... ');
        });
    });

    /* View mock test result ant time */
    $('.viewmtresult').click(function() {
        var postData = {
            mtdata: $(this).data('mtdata'),
            title: $(this).data('title'),
            requesToken: ajaxToken,
            requestType: 'frontend',
            size: 'full-mt',
            route: 'modals.ManageModels.getMTInfoBS'
        };
        $.post(ajaxurl + 'ajax', postData, function(r) {
            $('#mtexamstart').html(r);
            $("#mtexamstart").modal('show');
        }).fail(function() {
            console.log('Error Loading data ... ');
        });
    });

    /* Take mock Test */
    $('.starttaketest').click(function() {
        $('.dismismtmdl').hide();
        var postData = {
            mtdata: $(this).data('mtdata'),
            title: $(this).data('title'),
            requesToken: ajaxToken,
            requestType: 'frontend',
            size: 'full-mt',
            route: 'modals.ManageModels.getMTInfoBS'
        };
        $.post(ajaxurl + 'ajax', postData, function(r) {
            $('#mtexamstart').html(r);
            $("#mtexamstart").modal('show');
        }).fail(function() {
            console.log('Error Loading data ... ');
        });
    });

    /* Start mock test */
    $('body').on('click', '.stmtqusalldone', function() {
        $('.dismismtmdl').hide();
        var mtqus = $(this).data('mtqus');
        var mtresult = $(this).data('mtresult');
        $('#' + mtqus + ' .card-body ').html(ajaxloader);
        $('#' + mtqus + ' .card-footer ').html(ajaxloader);
        $('#' + mtresult + '').html(ajaxloader);
        var postData = {
            mtdata: $(this).data('mtdata'),
            requesToken: ajaxToken,
            requestType: 'frontend',
            route: 'mocktests.getMTQuestion'
        };
        $.post(ajaxurl + 'ajax', postData, function(r) { //console.log(r);    
            var res = JSON.parse(r);
            console.log(res);
            if (res.message == 'done' && res.error == "") {
                //$('#mtRemainingTime').html(Clock.start());
                mtCountDownTimer(res.mt_duration, 'mtRemainingTime');
                $('#' + mtqus + ' .card-body ').html(res.data.body);
                $('#' + mtqus + ' .card-footer ').html(res.data.footer);
                $('#' + mtresult + '').html(res.data.result);
            } else {
                $('#' + mtqus + ' .card-body ').html('<div class="alert alert-danger">' + res.message + '</div>');
            }
        }).fail(function() {
            console.log('Error Loading data ... ');
        });
    });
    /* Next question action  */
    $('body').on('click', '.stmtqusnext_qus', function() {
        ///$('.dismismtmdl').hide();
        var mtqus = $(this).data('mtqus');
        var mtresult = $(this).data('mtresult');
        var postData = {
            mtdata: $(this).data('mtdata'),
            mtqusId: $(this).data('mtqus-id'),
            answered: $('input[name="mtqus_answer[]"]').serializeArray(),
            requesToken: ajaxToken,
            requestType: 'frontend',
            route: 'mocktests.getMTNextQuestion'
        };
        $('#' + mtqus + ' .card-body ').html(ajaxloader);
        $('#' + mtqus + ' .card-footer ').html(ajaxloader);
        $('#' + mtresult + '').html(ajaxloader);
        $.post(ajaxurl + 'ajax', postData, function(r) { //console.log(r);    
            var res = JSON.parse(r);
            console.log(res);
            if (res.message == 'done' && res.error == "") {
                console.log('done  ooooo');
                $('#' + mtqus + ' .card-body ').html(res.data.body);
                $('#' + mtqus + ' .card-footer ').html(res.data.footer);
                $('#' + mtresult + '').html(res.data.result);
            } else {
                $('#' + mtqus + ' .card-body ').html('<div class="alert alert-danger">' + res.message + '</div>');
            }
        }).fail(function() {
            console.log('Error Loading data ... ');
        });
    });
    /* Choice question action  */
    $('body').on('click', '.stmtquschoice_qus', function() {
        var mtqus = $(this).data('mtqus');
        var mtresult = $(this).data('mtresult');
        var postData = {
            mtdata: $(this).data('mtdata'),
            mtqusId: $(this).data('mtqus-id'),
            requesToken: ajaxToken,
            requestType: 'frontend',
            route: 'mocktests.getMTChoiceQuestion'
        };
        $('#' + mtqus + ' .card-body ').html(ajaxloader);
        $('#' + mtqus + ' .card-footer ').html(ajaxloader);
        $('#' + mtresult + '').html(ajaxloader);
        $.post(ajaxurl + 'ajax', postData, function(r) { //console.log(r);    
            var res = JSON.parse(r);
            console.log(res);
            if (res.message == 'done' && res.error == "") {
                console.log('done ');
                $('#' + mtqus + ' .card-body ').html(res.data.body);
                $('#' + mtqus + ' .card-footer ').html(res.data.footer);
                $('#' + mtresult + '').html(res.data.result);
            } else {
                $('#' + mtqus + ' .card-body ').html('<div class="alert alert-danger">' + res.message + '</div>');
            }
        }).fail(function() {
            console.log('Error Loading data ... ');
        });
    });
    /* Contact page  */
    $('#referal_enqtype').on('change', function() {
        var selected = $(this).val();
        if (selected == 'employee_refer') {
            $('.referal_enqtype').show();
        } else {
            $('.referal_enqtype').hide();
        }
    });
});

/* Countdown Timer functionality */ //"Jun 15, 2022 21:37:25"
function pad(val) {
    return val > 9 ? val : "0" + val;
}

function mtCountDownTimer(remainingTime, countDownDiv) {
    var countDownDate = new Date(remainingTime).getTime();
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        //var days = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
        var hours = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        var minutes = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        var seconds = pad(Math.floor((distance % (1000 * 60)) / 1000));
        document.getElementById(countDownDiv).innerHTML = hours + ":" + minutes + ":" + seconds;
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo1").innerHTML = "Time is over";
        }
    }, 1000);
}

function addAutocompleteJs() {
    const inputjs = document.querySelectorAll('input');
    inputjs.forEach(function(element) {
        if (element.classList.contains('autocomplete')) {
            $('#' + element.id).autoComplete({
                resolverSettings: 'custom',
                events: {
                    search: function(qry, callback) {
                        var postData = {
                            requestType: 'frontend',
                            requesToken: ajaxToken,
                            route: $('#' + element.id).data('url'),
                            keywords: qry
                        };
                        $.post(ajaxurl + 'ajax', postData, function(res) {
                            callback(res);
                        });
                    }
                }
            });
        }
    });
}

/* chart */