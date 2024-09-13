
let animation = bodymovin.loadAnimation({
    container: document.getElementById('upload_matzhar'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/images/main/upload.json'
});

function goload(){
    var xload = 0;
    var x = setInterval(function(){
        xload++;
        if(xload >= 100) {
            xload = 100;
            clearInterval(x);
            matdone();
        }
        $('#procofp').html(xload);
        $('.lineload2').css('width', xload+'%');
    }, 10);
}

function matdone(){
    $('.fileinputform').addClass('fileinputform-active');
    $('.matzharloader').fadeOut(100,function(){
        $('.donematzhcl').fadeIn(100);
        
    });
    let animation2 = bodymovin.loadAnimation({
        container: document.getElementById('done_matzhar'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '/images/main/done.json'
    });
}

function setmaterialsc(){
    // alert('k14');
    $('.donematzhcl').css('display', 'none');
    $('.fileinputform').removeClass('fileinputform-active');
    $('.fileinputform2').fadeOut(100,function(){
        $('.matzharloader').fadeIn(100);
    });
    goload();
}

// setTimeout(() => {
//   $('#exampleModal').modal('show');
// }, "12000");


$("#form-1").children("button").click(function () {
    otpravka($("#form-1"));
});
$(".closes").click(function () {
    $(".popup").fadeOut(300);
});

function otpravka(divid) {
    var oshibka = 0;

    if ($.trim(divid.children("input[name='name']").val()) == '') {
        divid.children("input[name='name']").css('border', '2px solid red');
        oshibka = 1;
    } else {
        divid.children("input[name='name']").css('border', '2px solid #888888');
    }

    // if ($.trim(divid.children("textarea[name='tilek']").val()) == '') {
    //  divid.children("textarea[name='tilek']").css('border', '2px solid red');
    //  oshibka = 1;
    // } else {
    //  divid.children("textarea[name='tilek']").css('border', '2px solid #888888');
    // }

    if (oshibka == 0) {
        $.ajax({
            method: "POST",
            url: "/zayavka.php",
            data: { 'zhauap': $.trim(divid.children("input[name='zhauap']:checked").val()), 'shaqyruid': $.trim(divid.children("input[name='shaqyruid']").val()), 'konakid': $.trim(divid.children("input[name='konakid']").val()), 'name': $.trim(divid.children("input[name='name']").val()), 'tilek': $.trim(divid.children("textarea[name='tilek']").val()) }
        })
            .done(function (msg) {
                divid.children("input[name='name']").val("");
                divid.children("textarea[name='tilek']").val("");
                // $("#popup-1").fadeOut(300);
                $("#popup").fadeIn(300);
            });
    }
}

$(document).on("beforeSubmit", "#startform", function (event, messages) {
    $('.preloaderclas').show();
  });

/* ---------------CROPPER START----------------------- */

    var bs_modal = $('#modal');
    var image = document.getElementById('image');
    var cropper,reader,file,file2;
   

    $("body").on("change", ".fileinputmatzhar", function(e) {
        try {
            var file = document.getElementById('uploaded-file1').files[0];
            if (file) {
                var fileSize = 0;
                if (file.size > 1024 * 1024) {
                    fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
                } else {
                    fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
                }
                if (/\.(jpe?g|bmp|gif|png)$/i.test(file.name)) {

                } else return false;
            }
        } catch (e) {
            var file = document.getElementById('uploaded-file1').value;
            file = file.replace(/\\/g, "/").split('/').pop();
        }
        var files = e.target.files;

        var done = function(url) { // ÑÑƒÑ€ÐµÑ‚Ñ‚Ñ–Ò£ url-Ñ– Ò›Ð¾Ð¹Ñ‹Ð»Ñ‹Ð¿, Ð¼Ð¾Ð´Ð°Ð»ÑŒÐºÐ° Ð°ÑˆÑ‹Ð»Ð°Ð´Ñ‹
            image.src = url;
            bs_modal.modal('show');
        };

        if (files && files.length > 0) {
            file = files[0];
            if (URL) {
                done(URL.createObjectURL(file));
            } 
        }
    });

    var perem = 0;

    bs_modal.on('shown.bs.modal', function() {
        cropper = new Cropper(image, {
            aspectRatio: 54/59,
            viewMode: 3,
        });
    }).on('hidden.bs.modal', function() {
        if(perem == 1) {
            setmaterialsc();
        } else {
            document.getElementById('uploaded-file1').value = '';
        }
        
        cropper.destroy();
        cropper = null;
    });

    $("#crop").click(function() {
        canvas = cropper.getCroppedCanvas({
            width: 540,
            height: 590,
        });

        canvas.toBlob(function(blob) {

            let nameFile ='file.png';
            let inputForm = document.getElementById('uploaded-file1');
            const file = new File([blob],nameFile)
            const dT = new ClipboardEvent('').clipboardData || new DataTransfer();
            dT.items.add(file);
            inputForm.files = dT.files;
            perem = 1;
        });
        bs_modal.modal('hide');
    });
/* ---------------CROPPER END----------------------- */

var nav = $('#nuskaulik');
if (nav.length) {
  var c1 = nav.position().top;
}

$(window).on('resize',function(){
    var nav = $('#nuskaulik');
    if (nav.length) {
        c1 = $('#nuskaulik').position().top;
    }
});

$(".nuskaulik-a").click(function() {
    $('html, body').animate({scrollTop:c1}, 600, "linear", function () {});
});

/* ------- AUDIO START ------------ */

var audio = new Audio(); // Ð¡Ð¾Ð·Ð´Ð°Ñ‘Ð¼ Ð½Ð¾Ð²Ñ‹Ð¹ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚ Audio

function soundonClick(audio_src) {
    $('.sound-on').hide();
    $('.sound-off').show();
    audio.src = audio_src;
    audio.volume = 1.0;
    audio.play();// ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¸ Ð·Ð°Ð¿ÑƒÑÐºÐ°ÐµÐ¼
}

function soundoffClick() {
    $('.sound-off').hide();
    $('.sound-on').show();
    audio.pause();
}

audio.addEventListener("ended", function() {
    $('.sound-off').hide();
    $('.sound-on').show();
    audio.pause();
});

// $('.sound-on').click();

/* ------- AUDIO END ------------ */