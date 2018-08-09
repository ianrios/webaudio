
$(function() {
    var $all = $(".dial, .bars1, .bars2, .pad")
        , $body = $("body");

    $(".bars1").bars({
                        fgColor:"#222222"
                        , bgColor:"#EEEEEE"
                        /*, change : function (value) {
                            console.log("change : ", value);
                        }*/
                        /*, draw : function () {
                            console.log(this.o);
                        }*/
                    });
    $("#gain").bars({
                        fgColor:"#222222"
                        , bgColor:"#EEEEEE"
                        , change : function (value) {
                          var message = new OSC.Message('/nething/bars/gain', 1, 100, value);
                          osc.send(message);
                        }
                        /*, draw : function () {
                            console.log(this.o);
                        }*/
                    });

    /*$(".bars2").bars({
                        fgColor:"#222222"
                        , bgColor:"#EEEEEE"
                    });*/

    var $pad = $(".pad")
                .xy({
                        displayPrevious:false
                        , min : 0
                        , max : 1000
                        , fgColor:"#222222"
                        , bgColor:"#EEEEEE"
                        , change : function (value) {
                        //    document.getElementById("statusX").innerHTML = value[0] ;
                        //    document.getElementById("statusY").innerHTML = value[1] ;
                            var message = new OSC.Message('/nething/pad/xy', 1000,1000, value[0], value[1]);
                            osc.send(message);
                        }
                    })
                .css({'border':'5px solid #BBB'});

    $(".dial")
                .dial({
                        fgColor:"#222222"
                        , bgColor:"#EEEEEE"
                        , thickness : .3
                        /*, change : function (value) {
                            console.log("change : ", value);
                        }*/
                    })
                .css({display:'inline',padding:'0px 10px'});

    var skins = {
        skin0 : {
            kontrol : {
                fgColor:"#87CEEB"
                , bgColor:"#EEEEEE"
            }
            , rack : {
                "background-color":"#FFFFFF"
                , "color":"#87CEEB"
            }
        }
        , skin1 : {
            kontrol : {
                fgColor:"#222222"
                , bgColor:"#EEEEEE"
            }
            , rack : {
                "background-color":"#FFFFFF"
                , "color":"#222222"
            }
        }
        , skin2 : {
            kontrol : {
                fgColor:"#FFFFFF"
                , bgColor:"#444444"
            }
            , rack : {
                "background-color":"#222222"
                , "color":"#FFFFFF"
            }
        }
        , skin3 : {
            kontrol : {
                fgColor:"#00FF00"
                , bgColor:"#DDDDDD"
            }
            , rack : {
                "background-color":"#FFFFFF"
                , "color":"#00FF00"
            }
        }
        , skin4 : {
            kontrol : {
                fgColor:"#FF0000"
                , bgColor:"#DDDDDD"
            }
            , rack : {
                "background-color":"#EEEEEE"
                , "color":"#FF0000"
            }
        }
    };

    var changeSkin = function(skin) {
        $body.css(skin.rack);
        $all.trigger(
                "configure"
                , skin.kontrol
                );
    }

    $('#skin').bind(
        'change'
        , function(e) {
            changeSkin(skins[$(this).find('option:selected').val()]);
        }
    );

    $('#displayPrevious').bind(
        'change'
        , function(e) {
            $all.trigger("configure", {displayPrevious:parseInt($(this).find('option:selected').val())});
        }
    );

    $('#cursor').bind(
        'change'
        , function(e) {
            $all.trigger("configure", {cursor:parseInt($(this).find('option:selected').val())});
        }
    );

    $(".height").bind(
        'click'
        , function(e) {
            $all.trigger("configure", {height:100});
        }
    );


    var $animBars = $(".bars1"), timeout;
    $("#animate").bind(
        'click',
        function() {
            if($(this).is(':checked')) {
                var  v =  0, s = 'up', i = 0;
                var redraw = function () {

                    if(v==15 || v==0) i++;
                    s = v==15?'down':(v==0?'up':s);
                    s=='up'?v++:v--;

                    $animBars
                        .find('input:eq('+v+')')
                        .val(Math.floor(Math.sin(i+v*i)*100))
                        .trigger('change');

                    timeout = window.setTimeout(redraw, 1000/60);
                };
                redraw();
            } else {
                window.clearTimeout(timeout);
            }
        });
});
