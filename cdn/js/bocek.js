let b_v;

$.notify = function (deg1, deg2) {
    if (typeof swal == 'undefined')
        $.boceksoft.include('js', 'sweetalert', b_v.scriptsPath + 'js/sweetalert.min.js', '', undefined, "$.notify('" + deg1 + "','" + deg2 + "');");
    else
        swal({
            title: (deg2 == "danger" ? "Hata" : "Başarılı"),
            text: deg1,
            icon: (deg2 == "danger" ? "error" : deg2)
        });
}
$.boceksoft = {
    /*!
     * BÃƒÆ’Ã‚Â¶ceksoft JS
     * version: 2.0.61
     * Requires jQuery v3.7
     * Must-Haves :
     *          https://cdn/js/validator.js
     *          https://cdn/js/jquery.form.js
     *          https://cdn/js/bootbox.min.js
     *          https://cdn/js/bootbox.min.js
     *          https://cdn/js/sweetalert.min.js
     *          https://cdn/css/jquery/jquery.fancybox.min.css
     *          https://cdn/js/jquery/jquery.fancybox.min.js
     * Copyright (c) 2021 BÃ¶ceksoft Digital Solutions
     */
    variables: {
        frontendMode: false,
        devoloperMode: false,
        scriptsPath: (true == true ? "../cdn/uploads/" : "/"),
        imagePath: "http://localhost:8888/cdn/",
        currentLang: window.location.pathname.split("/")[1],
        dataUrl: $("#rzvForm").data("url"),
        calendarFiyatlarDovizIcon: "",
        calendarFiyatlarDovizGiris: "",
        calendarFiyatlarDovizCikis: "",
        calendarFiyatlarTarihler: undefined,
        activedays: [],
        calendarFiyatlar: undefined,
        giristarihler: undefined,
        cikistarihler: undefined,
        dolutarihler: undefined,
        Rgiristarihler: undefined,
        Rcikistarihler: undefined,
        RezervasyonBekleyenler: undefined,
        RezervasyonSaatler: undefined,
        calendarFiyatlarhaftasonutarihler: undefined,
        calendarHaftasonufiyatlar: undefined,
        aynilar: [],
        aynilar_dolu_opsiyon: [],
        aynilar_opsiyon_dolu: [],
        ajaxAutoAjax: undefined,
        rzvhesaplabtnhtml: $(".rzvForm .rezHesaplaBtn").html(),
        Calendardate1: undefined,
        Calendardate2: undefined,
        includefiles: []
    },
    include: function (type, name, path, version, event, evalCode) {
        if (b_v.frontendMode == true && path.substr(0, 1) == "/")
            path = path.substr(1, path.length - 1);
        let control = b_v.includefiles.filter(x => x.type == type && x.path == path);
        if (control.length == 0) {
            b_v.includefiles.push({
                type: type,
                path: path,
                loaded: (type == "css" ? true : false)
            });
            if (type == "css") {
                if ($("link[data-" + name + "='true']").length > 0)
                    $("link[data-" + name + "='true']").eq(0).before('<link href="' + path + '" rel="stylesheet" type="text/css">');
                else
                    $("head").append('<link href="' + path + '" rel="stylesheet" type="text/css">');
                eval(evalCode);
            } else if (type == "js")
                $.getScript(path + (version != "" ? "?v=" + version : "")).done(function (e) {
                    eval(evalCode);
                    b_v.includefiles.filter(x => x.type == type && x.path == path)[0].loaded = true;
                });
        } else if (control[0].loaded == true)
            eval(evalCode);
        else
            setTimeout(function () {
                console.log(type + '=' + path);
                $.boceksoft.include(type, name, path, version, event, evalCode);
            }, 300);
    },
    cookie: function (cname, cvalue, exdays) {
        if (cvalue != undefined && cvalue != null) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + encodeURIComponent(cvalue.replaceAll(';', '').replaceAll('=', '-')) + ";" + expires + ";path=/";
            return "";
        } else {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ')
                    c = c.substring(1);
                if (c.indexOf(name) == 0)
                    return c.substring(name.length, c.length);
            }
            return "";
        }
    },
    formAjax: function () {
        let nextBt = false;
        try {
            $("[data-ajax='true']").validator();
            nextBt = true;
        } catch (e) {
            console.log("tekrar deniyor");
            setTimeout(function () { $.boceksoft.formAjax(); }, 300);
        }
        if (nextBt) {
            $("[data-ajax='true']").validator().on("submit", function (e) {
                if (e.isDefaultPrevented()) { } else {
                    var result_type = $(this).data("result-type").replace("notify", "alert"),
                        form = $(this),
                        refresh = $(this).data("refresh"),
                        duration = $(this).data("result-duration") != undefined ? $(this).data("result-duration") : 500,
                        developmentmode = form.data("development-mode"),
                        redirect = form.data("redirect"),
                        txt = form.find("button[type='submit']").html();
                    $(this).ajaxSubmit({
                        beforeSend: function () {
                            $(".loading-absolute").fadeIn();
                            form.find("button[type='submit']")
                                .attr("disabled", true)
                                .html("<i class='fa fa-spinner fa-spin'></i>&nbsp;" + (b_v.currentLang == "en" ? "Loading..." : (b_v.currentLang == "de" ? "Loading..." : "YÃ¼kleniyor...")));
                            $("button[data-form-action='" + form.attr("action") + "']").attr("disabled", true)
                                .html("<i class='fa fa-spinner fa-spin'></i>&nbsp;" + (b_v.currentLang == "en" ? "Loading..." : (b_v.currentLang == "de" ? "Loading..." : "YÃ¼kleniyor...")));
                        },
                        success: function (e) {
                            if (developmentmode == true) {
                                console.log(e);
                            } else {
                                var arr = e.split(";/");
                                if (arr[0] == "0") {
                                    //Hata Yoksa
                                    form.trigger("reset");
                                    if (!form.data("onsuccess") == '') {
                                        eval(form.data("onsuccess").replace("{response}", arr[1]));
                                    }
                                    if (result_type == "modal") {
                                        bootbox.alert({
                                            title: (b_v.currentLang == "en" ? "Info" : (b_v.currentLang == "de" ? "Die Info" : "Bilgi")),
                                            message: arr[1],
                                            backdrop: true,
                                            callback: function () {
                                                if (refresh == true) {
                                                    location.reload();
                                                }
                                                if (redirect != null) {
                                                    window.location.href = redirect;
                                                }
                                            }
                                        });
                                    } else if (result_type == "swal") {
                                        swal({
                                            title: (b_v.currentLang == "en" ? "Success" : (b_v.currentLang == "de" ? "Erfolg" : "BaÅŸarÄ±lÄ±")),
                                            text: arr[1],
                                            icon: "success"
                                        }).then(function (value) {
                                            if (refresh == true) {
                                                location.reload();
                                            }
                                            if (redirect != null) {
                                                window.location.href = redirect;
                                            }
                                        });

                                    } else if (result_type == "alert") {
                                        $(".error_message_").fadeOut().remove();
                                        $(".status_message_").fadeOut().remove();
                                        $(".success_message_").fadeOut().remove();
                                        var html = "<div class='row success_message_ mt-2  ' style='display:none;'><div class='col-sm-12'><div class='alert alert-success'><p style='margin:0;'>" + arr[1] + "</p></div></div></div>";
                                        form.append(html);
                                        $(".success_message_").fadeIn(function () {
                                            setTimeout(function () {
                                                $(".success_message_").fadeOut();
                                                if (refresh == true) {
                                                    location.reload();
                                                }
                                                if (redirect != null) {
                                                    window.location.href = redirect;
                                                }
                                            }, duration);
                                        });
                                    } else if (result_type == "url") {
                                        if (arr.length > 2)
                                            if (arr[2] == "hemenode") {
                                                window.location = form.data("hemenkirala").replace("{rezid}", form.find("input[name='kayitId']").val());
                                                return false;
                                            }
                                            else if (arr[2] == "rez") {
                                                window.location = form.data("url").replace("{rezid}", arr[1]);
                                                return false;
                                            }


                                        $("body").append("<form id='a1' method='" + form.attr("method") + "' action='" + form.data("url") + "'><input name='villaname' value='" + form.find("input[name='villaname']").val() + "' /><input name='reservationdate1' value='" + form.find("input[name='reservationdate1']").val() + "' /><input name='reservationdate2' value='" + form.find("input[name='reservationdate2']").val() + "' /><input name='kayitid' value='" + form.find("input[name='kayitId']").val() + "' /></form>");
                                        $("#a1").trigger("submit");
                                    }
                                } else {
                                    if (arr.length > 2)
                                        if (arr[2] == "robot")
                                            $.boceksoft.recaptcha();
                                    //Hata Varsa
                                    if (result_type == "modal") {
                                        bootbox.alert({
                                            title: (b_v.currentLang == "en" ? "Error!" : (b_v.currentLang == "de " ? "Error!" : "Hata!")),
                                            message: arr[1],
                                            backdrop: true
                                        });
                                    } else if (result_type == "swal" || result_type == "url") {
                                        swal((b_v.currentLang == "en" ? "Error!" : (b_v.currentLang == "de " ? "Error!" : "Hata!")), arr[1], 'error');
                                    } else if (result_type == "alert") {
                                        $(".error_message_").fadeOut().remove();
                                        $(".status_message_").fadeOut().remove();
                                        $(".success_message_").fadeOut().remove();
                                        var html = "<div class='row error_message_ mt-2 ' style='display:none;'><div class='col-sm-12'><div class='alert alert-danger'><p style='margin:0;'>" + arr[1] + "</p></div></div></div>";
                                        form.append(html);
                                        $(".error_message_").fadeIn(function () {
                                            setTimeout(function () {
                                                $(".error_message_").fadeOut();
                                            }, duration);
                                        });
                                    }
                                }
                            }
                        },
                        error: function (xhr, status, text) {
                            if (status == "timeout") {
                                if (result_type == "modal") {
                                    bootbox.alert({
                                        title: (b_v.currentLang == "en" ? "Error!" : (b_v.currentLang == "de " ? "Error!" : "Hata!")),
                                        message: (b_v.currentLang == "en" ? "Timeout!" : "Zaman AÅŸÄ±mÄ±"),
                                        backdrop: true
                                    });
                                } else if (result_type == "swal") {
                                    swal((b_v.currentLang == "en" ? "Timeout!" : "Zaman AÅŸÄ±mÄ±"), arr[1], 'warning');
                                } else if (result_type == "alert") {
                                    $(".error_message_").fadeOut().remove();
                                    $(".status_message_").fadeOut().remove();
                                    $(".success_message_").fadeOut().remove();
                                    var html = "<div class='row error_message_ mt-2 ' style='display:none;'><div class='col-sm-12'><div class='alert alert-danger'><p style='margin:0;'>" + (b_v.currentLang == "en" ? "Timeout!" : "Zaman AÅŸÄ±mÄ±") + "</p></div></div></div>";
                                    form.append(html);
                                    $(".error_message_").fadeIn(function () {
                                        setTimeout(function () {
                                            $(".error_message_").fadeOut();
                                        }, duration);
                                    });

                                }
                            } else {
                                console.log(xhr.responseText);
                                if (result_type == "modal") {
                                    bootbox.alert({
                                        title: (b_v.currentLang == "en" ? "Info" : (b_v.currentLang == "de" ? "Die Info" : "Bilgi")),
                                        message: (b_v.currentLang == "en" ? "Error! Error Code :" : "Hata! Hata Kodu: ") + xhr.status,
                                        backdrop: true
                                    });
                                } else if (result_type == "alert") {
                                    $(".error_message_").fadeOut().remove();
                                    $(".status_message_").fadeOut().remove();
                                    $(".success_message_").fadeOut().remove();
                                    var html = "<div class='row error_message_ mt-2 ' style='display:none;'><div class='col-sm-12'><div class='alert alert-danger'><p style='margin:0;'> Connection error. Error code " + xhr.status + "</p></div></div></div>";
                                    form.append(html);
                                    $(".error_message_").fadeIn(function () {
                                        setTimeout(function () {
                                            $(".error_message_").fadeOut();
                                        }, duration);
                                    });
                                }
                            }
                        },
                        complete: function () {
                            $(".loading-absolute").fadeOut();
                            form.find("button[type='submit']")
                                .attr("disabled", false)
                                .html(txt);

                            $("button[data-form-action='" + form.attr("action") + "']")
                                .attr("disabled", false)
                                .html(txt);
                        }
                    });
                }
                return false;
            });
        }
    },
    recaptcha: function () {
        try {
            grecaptcha.reset();
        } catch (e) {
        }

        if ($("form[data-recaptcha][data-recaptcha-id]").length > 0) {
            var evX = `
                setTimeout(function(){
                    $("form[data-recaptcha][data-recaptcha-id]").each(function(){
                        var $this=$(this);
                        grecaptcha.render($this.data("recaptcha-id"), {
                            'sitekey': $this.data("recaptcha")
                        });
                    });
                },500);
            `;
            $.boceksoft.include('js', 'recaptcha', 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit', '', undefined, evX);
            try {
                grecaptcha.reset();
            } catch (e) {

            }
        }
    },
    ChangeUrl: function (page, url) {
        function changeDesc(array, key, val) {
            for (var i in array) {
                if (array[i].key == key) {
                    array[i].val = val;
                    break;
                }
            }
        }
        let urlx = url.split("?")[0];
        let urlArr = [];
        let urlPar = "";
        if (url.split("?")[1] != "") {
            urlPar = "?";
            let ss = url.split("?")[1].split("&");
            for (let i = 0; i < ss.length; i++)
                if (ss[i].split("=")[1] != "") {
                    let uac = urlArr.filter(x => x.key == ss[i].split("=")[0])[0];
                    if (uac != undefined)
                        changeDesc(urlArr, ss[i].split("=")[0], uac.val + ',' + ss[i].split("=")[1]);
                    else
                        urlArr.push({
                            key: ss[i].split("=")[0],
                            val: ss[i].split("=")[1]
                        });
                }
            for (var i = 0; i < urlArr.length; i++) {
                urlPar += (urlPar != "?" ? "&" : "") + urlArr[i].key + "=" + urlArr[i].val;
            }
        }
        if (typeof (history.pushState) != "undefined") {
            let obj = { Page: page, Url: urlx + urlPar };
            history.pushState(obj, obj.Page, obj.Url);
        } else {
            window.location.href = "/";
            // alert("Browser does not support HTML5.");
        }
    },
    ajaxAuto: function (element) {
        var x = $(element);
        var pressHtml = x.data("press");
        var lastadata = "";

        x.find("input,select").on("change", function () {
            var a = x.serialize();
            setTimeout(function () {
                if (a == x.serialize() && lastadata != a) {
                    lastadata = a;
                    if (x.attr("action") != "javascript:void(0);") {
                        if (x.attr("action") != undefined) {
                            $.boceksoft.ChangeUrl('Page1', x.attr("action") + "?" + a);
                        } else {
                            $.boceksoft.ChangeUrl('Page1', "?" + a);
                        }
                    }
                    if (b_v.ajaxAutoAjax != null && b_v.ajaxAutoAjax != undefined)
                        b_v.ajaxAutoAjax.abort();
                    b_v.ajaxAutoAjax = $.ajax({
                        type: x.attr("method"),
                        url: x.data("fakeaction"),
                        data: a,
                        beforeSend: function () {
                            $(".list-loading").removeClass('d-none');
                            $(pressHtml).html('<div class="text-center" style="width:100%;"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
                        },
                        success: function (result) {
                            $(".list-loading").addClass('d-none');
                            if (x.data("fakeaction") == "/ajax/filtre") {
                                var sonuc = result.split(";/;/");
                                $(".totalCount").html(sonuc[0]);
                                $(pressHtml).html(sonuc[1]);
                                $(".pagination").html(sonuc[2]);
                                $('[data-toggle="tooltip"]').tooltip();
                                if ($(pressHtml).find(".listingPage").length > 2) {
                                    $(".listelemeListNextBtn").removeClass("d-none");
                                } else {
                                    $(".listelemeListNextBtn").addClass("d-none");
                                }
                            } else {
                                $(pressHtml).html(result);
                            }
                            eval(x.data("onsuccess"));
                        },
                        error: function (xhr, status, text) {
                            $(pressHtml).html("<div class=\"row\"><div class=\"col-sm-12\"><div class=\"alert alert-danger\">" + (b_v.currentLang == "en" ? "Error! There was a problem retrieving data. (Error code :" : "Hata! Verileri alÄ±rken bir sorun oluÅŸtu. (Hata Kodu :") + " + xhr.status + " + Text + " + text + </div></div></div>");
                        }
                    });
                };
            }, 600);
        });
    },
    instagram: function () {
        $.ajax({
            type: 'post',
            url: '/ajax/instagramOptions',
            success: function (e) {
                var arr = e.split(";/");
                var options = {
                    items: arr[0],
                    itemPadding: "3px",
                    userId: arr[1],
                    access_token: arr[2],
                    imageHeight: arr[3] + "px"
                };
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    cache: false,
                    url: "https://graph.instagram.com/me/media/?fields=id,caption,media_type,media_url&access_token=" + options.access_token,
                    success: function (x) {
                        var veriler = x;
                        console.log(veriler);
                        $.boceksoftx = {
                            instagramMedia: function (element) {
                                var el = $(element);
                                var c = '';
                                $("body").append(c);

                                for (var i = 0; i < (options.items > veriler.data.length ? veriler.data.length : options.items); i++) {
                                    var __item = veriler.data[i];
                                    var likeCount = "<svg style='width: 22px;position: absolute;top: 30px;left: 40px;fill: white;' viewBox='0 0 24 24'><path d='M17.7,1.5c-2,0-3.3,0.5-4.9,2.1c0,0-0.4,0.4-0.7,0.7c-0.3-0.3-0.7-0.7-0.7-0.7c-1.6-1.6-3-2.1-5-2.1C2.6,1.5,0,4.6,0,8.3c0,4.2,3.4,7.1,8.6,11.5c0.9,0.8,1.9,1.6,2.9,2.5c0.1,0.1,0.3,0.2,0.5,0.2s0.3-0.1,0.5-0.2c1.1-1,2.1-1.8,3.1-2.7c4.8-4.1,8.5-7.1,8.5-11.4C24,4.6,21.4,1.5,17.7,1.5z M14.6,18.6c-0.8,0.7-1.7,1.5-2.6,2.3c-0.9-0.7-1.7-1.4-2.5-2.1c-5-4.2-8.1-6.9-8.1-10.5c0-3.1,2.1-5.5,4.9-5.5c1.5,0,2.6,0.3,3.8,1.5c1,1,1.2,1.2,1.2,1.2C11.6,5.9,11.7,6,12,6.1c0.3,0,0.5-0.2,0.7-0.4c0,0,0.2-0.2,1.2-1.3c1.3-1.3,2.1-1.5,3.8-1.5c2.8,0,4.9,2.4,4.9,5.5C22.6,11.9,19.4,14.6,14.6,18.6z'></path></svg><i style='position: absolute;font-style: normal;top: 29px;left: 69px;font-size: 20px;'>1</i>";
                                    var reviewCount = "<svg style='width: 22px;position: absolute;top: 30px;right: 56px;fill: white;' viewBox='0 0 24 24'><path d='M1,11.9C1,17.9,5.8,23,12,23c1.9,0,3.7-1,5.3-1.8l5,1.3l0,0c0.1,0,0.1,0,0.2,0c0.4,0,0.6-0.3,0.6-0.6c0-0.1,0-0.1,0-0.2l-1.3-4.9c0.9-1.6,1.4-2.9,1.4-4.8C23,5.8,18,1,12,1C5.9,1,1,5.9,1,11.9z M2.4,11.9c0-5.2,4.3-9.5,9.5-9.5c5.3,0,9.6,4.2,9.6,9.5c0,1.7-0.5,3-1.3,4.4l0,0c-0.1,0.1-0.1,0.2-0.1,0.3c0,0.1,0,0.1,0,0.1l0,0l1.1,4.1l-4.1-1.1l0,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0.1l0,0c-1.4,0.8-3.1,1.8-4.8,1.8C6.7,21.6,2.4,17.2,2.4,11.9z'></path></svg><i style='position: absolute;font-style: normal;top: 29px;right: 32px;font-size: 20px;'>1</i>";
                                    if (__item.caption != null) {
                                        var captionx = '<span class="__text">' + __item.caption + '</span>';
                                    } else {
                                        var captionx = "";
                                    }

                                    var html = ``;
                                    if (__item.media_type == "CAROUSEL_ALBUM") {
                                        html = `
                                            <div class="item">
                                                <a href="javascript:void(0)" onclick="$.boceksoftx.loadmedia('','${__item.id}',${i});">\
                                                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${__item.media_url}" data-srcauto="0" alt="" class="lazy cover w-100" width="280" height="280">
                                                <div class="shadow">
                                                    <div class="caption">
                                                        ${likeCount}
                                                            --
                                                        ${reviewCount}
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                                    } else if (__item.media_type == "IMAGE") {
                                        html = `
                                            <div class="item">
                                                <a href="javascript:void(0)" onclick="$.boceksoftx.loadmedia('','${__item.id}',${i});">\
                                                    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${__item.media_url}" data-srcauto="0" alt="" class="lazy cover w-100" width="280" height="280">
                                                    <div class="shadow">
                                                        <div class="caption">
                                                            ${likeCount}
                                                                --
                                                            ${reviewCount}
                                                            <span>' +${__item.caption} + '</span>\
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        `;

                                    } else if (__item.media_type == "VIDEO") {
                                        html = `
                                            <div class="item">
                                                <a href="javascript:void(0)" onclick="$.boceksoftx.loadmedia('${__item.link}','${__item.id}',${i});">
                                                    <video class="control-video" poster="${__item.media_url}" muted="" id="video-'${__item.id}">
                                                        <source src="${__item.media_url}" type="video/mp4">
                                                    </video>
                                                    <div class="shadow">
                                                        <div class="caption">
                                                            ${likeCount}
                                                                --
                                                            ${reviewCount}
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        `;
                                    }
                                    el.append(html);
                                }


                                if (element.indexOf("carousel") > -1)
                                    $(element).owlCarousel({
                                        loop: true,
                                        margin: 0,
                                        nav: false,
                                        dots: false,
                                        autoplay: false,
                                        responsive: {
                                            0: {
                                                items: 1.4
                                            },
                                            400: {
                                                items: 2
                                            },
                                            600: {
                                                items: 3
                                            },
                                            991: {
                                                items: 4
                                            },
                                            1200: {
                                                items: 5
                                            },
                                            1400: {
                                                items: 6
                                            }
                                        }
                                    });

                            },
                            loadmedia: function (url, id, index) {
                                if ($(".boceksoft_bg").length == 0)
                                    $("body").append("<div class='boceksoft_bg'></div><div class='boceksoft-instagram-wrap'><div class='boceksoft-instagram-media'></div></div>");
                                $(".boceksoft-instagram-media").html("");

                                $(".boceksoft_bg").on("click", function (e) {
                                    $(this).next(".boceksoft-instagram-wrap").fadeOut(300).remove();
                                    $(this).fadeOut(300).remove();
                                });
                            }
                        }
                        $.boceksoft.instagramMedia(".instagram-carousel");
                    }
                });
            }
        });
    },
    formatMoney: function (n, kusurat = true) {
        var c = parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.').replace(/\.(\d+)$/, ',$1');
        if (!kusurat)
            c = c.split(',')[0];
        return c;
    },
    hesapla: function (date1, date2, id) {
        $(".rzvForm .hata").html("");
        if (date1 != "" && date2 != "") {
            var data = ($("#rzvForm").length > 0 ? $("#rzvForm").serialize() : $("#rzvForm2").serialize());
            if (b_v.hesaplaajax != undefined)
                b_v.hesaplaajax.abort();
            b_v.hesaplaajax = $.ajax({
                type: 'post',
                url: '/ajax/fiyat_hesapla',
                cache: false,
                data: data,
                beforeSend: function () {
                    $(".rzvForm .fiyathesaplabtn").removeClass("d-none");
                    $(".rzvForm [type='submit']").addClass("d-none");
                    $(".rzvForm .rezHesaplaBtn").html("YÃ¼kleniyor...").removeClass("d-none");
                    $(".loadingx").removeClass("d-none");
                    $(".hesaplama_sonuclari").addClass("d-none");
                    $(".hemen_kirala_btns").addClass("d-none");
                    $("#rzvForm .col-sm-12:last").remove();
                    $(".rzvForm .hata").addClass("d-none");
                    $(".hesaplama_sonuclari ul li").eq(2).find("strong").html("-");
                    $(".hesaplama_sonuclari ul li").eq(3).find("strong").html("-");
                },
                success: function (cevap) {
                    $(".rzvForm .rezHesaplaBtn").html(b_v.rzvhesaplabtnhtml);
                    var arr = JSON.parse(cevap)[0];
                    if (arr["hata"] != undefined && arr["hata"] != "") {
                        $(".rzvForm .hata").removeClass("d-none");
                        $(".rzvForm .hata").html("<div class='col-xs-12 d-flex w-100'><div class='py-2 px-3 my-2 rounded shadow-sm text-white bg-danger' style='margin: 10px 0;line-height: 18px;font-size: 15px;width:100%;'>" + arr["hata"] + "</div></div>");
                    } else {
                        if ($("input[name='qq']").val() != "1") {
                            $(".rzvForm .hata").addClass("d-none");
                            $(".rzvForm .rezHesaplaBtn").addClass("d-none");
                            $(".rzvForm [type='submit']").removeClass("d-none");
                            $("input[name='temizlik']").val("Fiyata Dahil");
                            $("input[name='elektrik']").val("Fiyata Dahil");
                            if (arr["hemenkirala"] == "true")
                                $(".hemen_kirala_btns").removeClass("d-none");
                            console.log(arr.isList);
                            if (arr.isList == true) {
                                $(".hesaplama_sonuclari").removeClass("d-none");
                                $(".hesaplama_sonuclari").each(function () {
                                    $(this).find(".return_data").each(function () {
                                        var rd = $(this);
                                        rd.removeClass("d-none");
                                        var valEvents = rd.find(".val");
                                        valEvents.each(function () {
                                            var valEvent = $(this);

                                            let variables = [], ifvariables = [];
                                            let returnEval = valEvent.data("return"), ifStr = valEvent.data("return-if");
                                            if (returnEval.split(":").length >= 1) {
                                                parcala = returnEval.split(":");
                                                for (let pi = 0; pi < parcala.length; pi++)
                                                    if (pi % 2 == 1)
                                                        variables.push(parcala[pi]);
                                                let gizle = true;
                                                variables.forEach(function (v) {
                                                    if (eval("arr." + v + "!=0"))
                                                        gizle = false;
                                                    returnEval = returnEval.replace(":" + v + ":", "arr." + v)
                                                });

                                                if (ifStr != undefined) {
                                                    let parcala = ifStr.split(":");
                                                    for (let pi = 0; pi < parcala.length; pi++)
                                                        if (pi % 2 == 1)
                                                            ifvariables.push(parcala[pi]);

                                                    ifvariables.forEach(function (v) {
                                                        ifStr = ifStr.replace(":" + v + ":", "arr." + v)
                                                    });
                                                    if (!eval(ifStr))
                                                        gizle = true;
                                                }
                                                if (gizle)
                                                    rd.addClass("d-none");
                                                valEvent.html(eval(returnEval));
                                            }
                                            else
                                                valEvent.html(returnEval);

                                        });
                                    });
                                });
                            }

                            if (arr["uyari"] != undefined && arr["uyari"] != "")
                                $(".rzvForm .hata").removeClass("d-none").html("<div class='col-xs-12 d-flex w-100'><div class='py-2 px-3 my-2 rounded shadow-sm text-white bg-info' style='margin: 10px 0;line-height: 18px;font-size: 15px;width:100%; margin-bottom:30px;'>" + arr["uyari"] + "</div></div>");
                            if (arr["uyariIslem"] == "OdemeliVar")
                                $("#rzvForm").data("url", b_v.dataUrl + "?o=1");
                            else
                                $("#rzvForm").data("url", b_v.dataUrl);
                        }
                    }
                },
                error: function (xhr, status, text) {
                    $(".rzvForm .hata").addClass("d-none");
                    if (status == "timeout")
                        $(".rzvForm .hata").html("<div class='col-xs-12 d-flex w-100'><div class='py-2 px-3 my-2 rounded shadow-sm text-white bg-danger' style='margin: 10px 0;line-height: 18px;font-size: 15px;width:100%; margin-bottom:30px;'>" + (b_v.currentLang == "en" ? "Timeout!" : "Zaman AÅŸÄ±mÄ±!") + "</div></div>");
                    else
                        $(".rzvForm .hata").html("<div class='col-xs-12 d-flex w-100'><div class='py-2 px-3 my-2 rounded shadow-sm text-white bg-danger' style='margin: 10px 0;line-height: 18px;font-size: 15px;width:100%; margin-bottom:30px;'>" + xhr.status + "</div></div>");
                },
                complete: function () {
                    $(".loadingx").hide();
                }
            });
        } else {
            $.notify((b_v.currentLang == "en" ? "Please specify the date of arrival and departure!" : "LÃ¼tfen giriÅŸ ve Ã§Ä±kÄ±ÅŸ tarihinizi belirtiniz!"), "danger")
        }
    },
    talepgonder: function (btn) {
        $.ajax({
            type: 'post',
            url: '/ajax/talepgonder',
            data: $("#rzvForm").serialize(),
            beforeSend: function () {
                btn.addClass("disabled").prop("disabled", true).html((b_v.currentLang == "en" ? 'Sending<img src="/img/spacer.gif" style="background-image:url(\'/img/simple_loading.gif\');width: 29px;height: 29px;background-position: bottom center;background-size: contain;">' : (b_v.currentLang == "de" ? 'Senden<img src="/img/spacer.gif" style="background-image:url(\'/img/simple_loading.gif\');width: 29px;height: 29px;background-position: bottom center;background-size: contain;">' : 'GÃƒÂ¶nderiliyor<img src="/img/spacer.gif" style="background-image:url(\'/img/simple_loading.gif\');width: 29px;height: 29px;background-position: bottom center;background-size: contain;">')));
            },
            success: function (e) {
                var r = e.split(";/");
                if (r[0] == "0") {
                    if (r[2] == "hemenode")
                        window.location = $("#rzvForm").data("hemenkirala").replace("{rezid}", r[1]);
                    else if (r[2] == "rez")
                        window.location = $("#rzvForm").data("url").replace("{rezid}", r[1]);
                    else {
                        $("#rzvForm").attr("action", $("#rzvForm").data("url"));
                        $("#rzvForm").append("<input type='hidden' name='kayitid' value='" + r[1] + "' />");
                        $("#rzvForm").submit();
                    }
                } else
                    swal("UYARI", r[1], "error");
            },
            complete: function () {
                btn.removeClass("disabled").prop("disabled", false).html((b_v.currentLang == "en" ? "Send Reservation Request" : (b_v.currentLang == "de" ? "Reservierungsanfrage senden" : "Rezervasyon Talebi GÃ¶nder")));
            }
        });
    },
    favori: function (baslik, title, url, resim, bolgebaslik, id, tip) {
        if (!$.boceksoft.cookie("favoriList") == "")
            var arr = JSON.parse($.boceksoft.cookie("favoriList"));
        else
            var arr = [];
        var item = {
            id: id,
            tip: tip,
            baslik: baslik,
            title: title,
            url: url,
            resim: resim,
            bolgebaslik: bolgebaslik
        }
        var silindex = -1;
        for (var i = 0; i < arr.length; i++)
            if (arr[i]["id"] == item.id && arr[i]["tip"] == item.tip)
                silindex = i;
        if (silindex == -1)
            arr.push(item);
        else
            arr.splice(silindex, 1);
        $.boceksoft.cookie("favoriList", JSON.stringify(arr), 7);
        $.boceksoft.favorigetir();
        $(".ui-tooltip").fadeOut();
    },
    favorigetir: function () {
        $("#favoriteList ul").html("<li  style='color: #005a82; font-size: 14px;'>" + (b_v.currentLang == "en" ? "There is no product in your favorite list." : "Favori listenizde herhangi bir Ürün bulunmamaktadır.") + "</li>");
        $(".favBtn").removeClass("active added");
        $(".favBtn").attr("title", "Favoriye Ekle");
        $(".favorite-count").html("0");
        if (!$.boceksoft.cookie("favoriList") == "") {
            var arr = JSON.parse($.boceksoft.cookie("favoriList"));
            $("#favoriteList ul").html("");
            if (arr.length > 0) {
                $(".favorite-count").html(arr.length);
                for (let index = 0; index < arr.length; index++) {
                    const item = arr[index];
                    console.log(item);
                    var test = false;
                    $("#favoriteList ul").append(`
                    <li class="mb-2">
                        <div class="d-flex align-items-center position-relative text-dark">
                            <a href="/${item["url"]}"" title="${item["title"]}"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${item["resim"]}"
                            alt="${item["title"]}" width="60" height="50" class="lazy cover rounded-2"></a>
                            <a href="/${item["url"]}"" title="${item["title"]}" class="d-flex text-decoration-none flex-column ms-2 text-dark">
                                <span class="fs-8 fw-semibold">${item["baslik"]}</span>
                                <span class="fs-8"><i class="fa fa-map-pin"></i> ${item["bolgebaslik"]}</span>
                            </a>
                            <button class="btn shadow-none p-1 ms-auto favoriDel"  onclick="$.boceksoft.favori(\'${item["baslik"]}\',\'${item["title"]}\',\'${item["url"]}\',\'${item["resim"]}\',\'${item["bolgebaslik"]}\',${item["id"]},\'${item["tip"]}\')"> <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                            <path
                                d="M23.6894 10.3212C23.2753 9.90709 22.6064 9.90709 22.1923 10.3212L17 15.5028L11.8077 10.3106C11.3936 9.89647 10.7247 9.89647 10.3106 10.3106C9.89647 10.7247 9.89647 11.3936 10.3106 11.8077L15.5028 17L10.3106 22.1923C9.89647 22.6064 9.89647 23.2753 10.3106 23.6894C10.7247 24.1035 11.3936 24.1035 11.8077 23.6894L17 18.4972L22.1923 23.6894C22.6064 24.1035 23.2753 24.1035 23.6894 23.6894C24.1035 23.2753 24.1035 22.6064 23.6894 22.1923L18.4972 17L23.6894 11.8077C24.0929 11.4042 24.0929 10.7247 23.6894 10.3212Z"
                                fill="#29344C"></path>
                        </svg></button>
                        </div>
                    </li>`);
                    $(window).trigger("scroll");
                    $("." + item["tip"] + "_" + item["id"]).addClass("active added");
                    $("." + item["tip"] + "_" + item["id"]).attr("title", "Favoriden Çıkar")
                }
                $("#favoriteList ul").append('<li class="btn btn-bvk-gradient-success w-100 fs-7 fw-semibold ls-09" onclick="$.boceksoft.karsilastir();$(\'.compare-panel\').addClass(\'panel-all-show\');$(\'.fav-list\').removeClass(\'show\');$(\'.favori-shadow \').removeClass(\'show\');">' + (window.location.pathname.split('/')[1] == "en" ? "COMPARE" : (window.location.pathname.split('/')[1] == "ru" ? "Ğ¡Ğ ĞĞ’ĞĞ˜Ğ¢Ğ¬Â¬" : "KARŞILAŞTIR")) + '</li>');
            } else {
                $("#favoriteList ul").append('<li> Henüz Hiç Favori Eklemediniz.</li>');
            }
        }

    },
    karsilastir: function () {
        var arr = JSON.parse($.boceksoft.cookie("favoriList"));
        $(".compare-panel table").html("<tbody><tr><td><div class='loading'></div></td></tr></tbody>");
        var favoriId = "";
        for (let index = 0; index < arr.length; index++) {
            const item = arr[index];
            favoriId += (favoriId != "" ? "," : "") + item["id"];
        }
        $("ul.compare-panel-actions li .mix").html(arr.length);
        $.ajax({
            type: 'post',
            url: '/ajax/karsilastir',
            data: 'id=' + favoriId,
            success: function (result) {
                $(".compare-panel-btn").attr("loading", "ready");
                $(".compare-panel table").html(result);
            },
            complete: function () {
                $("body").css("cursor", "default");
            }
        });
    },
    lazyLoad: function (x) {
        $(window).scroll(function () {
            var item = $(".lazy");
            $(item).each(function (i) {
                if (!$(this).hasClass("loaded") && ($(this).data("loadmin") != undefined ? parseInt($(this).data("loadmin")) : $(window).width()) <= $(window).width()) {
                    var element = $(this);
                    var srcyebas = element.data("srcyebas"); //true ise eÃ„Å¸er sadece Width ini alÃ„Â±r.
                    var contain = element.data("contain"); //1 ise eÃ„Å¸er contain seklinde getirir.
                    var background = element.data("background"); //1 ise eÃ„Å¸er arkaplan resmine koyar (11x11)
                    var srcauto = element.data("srcauto"); //0 ise eÃ„Å¸er Otomatik boyutlandÃ„Â±rmayÃ„Â± kapatÃ„Â±r (11x11)                  
                    srcauto = "0"; //0 ise eÃ„Å¸er Otomatik boyutlandÃ„Â±rmayÃ„Â± kapatÃ„Â±r (11x11)                  
                    var backgroundColor = element.data("bgcolor"); //bos degilse ve contain 1 ise eÃ„Å¸er xc1 e x255,255,255 tarzÃ„Â±nda ekleme yapar
                    if (backgroundColor == undefined) backgroundColor = "";
                    var bottom_of_object = $(this).offset().top;
                    var bottom_of_window = $(window).scrollTop() + $(window).height();
                    if (bottom_of_window > bottom_of_object && $(this).data("src") != undefined) {
                        var im = $(this).data("src");
                        if ((srcauto == undefined || (srcauto != "false" && srcauto != false)) && im.indexOf("/uploads") > -1 && im.indexOf(".svg") == -1)
                            if ((srcyebas == undefined || srcyebas == "false") && element.height() > 10) {
                                im = im.replace("/view", "/{WxH}").replace("/thumbs", "/{WxH}").replace("/small", "/{WxH}");
                                if (im.indexOf("{WxH}") == -1)
                                    im = im.replace("/uploads", "/uploads/{WxH}");
                                if (element.prop("tagName") == "IMG" && background != "1")
                                    srcyebas = "true";
                            } else if (element.width() > 10) {
                                im = im.replace("/view", "/{W}").replace("/thumbs", "/{W}").replace("/small", "/{W}");
                                if (im.indexOf("{W}") == -1)
                                    im = im.replace("/uploads", "/uploads/{W}");
                            }
                        if (im.indexOf("{WxH}") > -1 || im.indexOf("{W}") > -1)
                            im = im.replace("{WxH}", element.width() + 'x' + element.height() + (contain == "1" ? "xc1" + (backgroundColor.indexOf(",") > 0 ? "x" + backgroundColor : "") : "")).replace("{W}", element.width());
                        var img = new Image();
                        img.src = im;
                        img.onload = function (e) {
                            if (srcyebas != null)
                                element.attr("src", im);
                            else
                                element.css({ 'background-image': 'url(\'' + im + '\')' });
                            element.removeClass("loadingimg");
                            element.addClass("loaded");
                        }, img.onerror = function () {
                            im = "/img/no.png";
                            if (srcyebas != null)
                                element.attr("src", im);
                            else
                                element.css({ 'background-image': 'url(\'' + im + '\')' });
                            element.removeClass("loadingimg");
                            element.addClass("loaded");
                        }
                    }
                }
            });
        });
        $(window).trigger("scroll");
    },
    odeme: function (email, onaykodu) {
        if (email != '' && onaykodu != '') {
            $.ajax({
                type: 'post',
                url: '/ajax/onaykontrol/',
                data: 'mail=' + email + '&kod=' + onaykodu,
                success: function (e) {
                    var arr = e.split(";/");
                    if (arr[0] == "1") {
                        window.location.href = arr[1];
                    } else {
                        alert(arr[1]);
                    }
                }
            });
        } else {
            alert("Email veya onaykodu alanÄ± boÅŸ olamaz.");
        }
    },
    hemenKirala: function () {

        var deg = $("select[name='tur']").val();

        $.ajax({
            type: 'get',
            url: '/ajax/hemenKirala',
            data: 'id=' + $.boceksoft.urlVeri("id") + '&tarihler=' + $.boceksoft.urlVeri("tarihler") + '&yetiskin=' + $.boceksoft.urlVeri("yetiskin") + '&cocuk=' + $.boceksoft.urlVeri("cocuk") + '&tur=' + deg,
            beforeSend: function () {
                $(".bas").html('<div class="text-center"><img src="' + b_v.scriptsPath + '/img/loader.gif" style="max-width:100%;display: inline-block;margin: 0 auto;float: none;" /></div>');
            },
            success: function (e) {
                $(".bas").html(e);
                $(".bookingForm").validator("destroy");
                $(".bookingForm").validator();
                var grayThemeCreditly = Creditly.initialize(
                    '.creditly-wrapper.gray-theme .expiration-month-and-year',
                    '.creditly-wrapper.gray-theme .credit-card-number',
                    '.creditly-wrapper.gray-theme .security-code',
                    '.creditly-wrapper.gray-theme .card-type'
                );
            },
            error: function () {

            }
        });


    },
    orderby: function (deg) {
        setTimeout(function () {
            $("input[name='order_by']").val(deg).trigger("change");
        });
    },
    getComments: function (id, page, islm) {
        $.ajax({
            type: 'post',
            url: '/ajax/getcomments',
            data: 'id=' + id + '&page=' + page + '&islm=' + islm,
            beforeSend: function () {
                $(".commentArea").css("background", "white");
                $(".commentArea").html('<div class="text-center" style="width:100%;"><img src="' + b_v.scriptsPath + '/img/loader.gif" style="max-width:100%;display: inline-block;margin: 0 auto;float: none;" /></div>');
            },
            success: function (e) {
                $(".commentArea").html(e);
                //$('.ItemRating').barrating({
                //    theme: 'bootstrap-stars',
                //    readonly: true
                //
                //});
            },
            error: function () {
                $.notify((b_v.currentLang == "en" ? "An error occurred while fetching comments." : "Yorumlar getirilirken bir hata oluÅŸtu."), 'danger');
            }


        });



    },
    levDist: function (s, t) {
        var d = [],
            n = s.length,
            m = t.length;
        if (n == 0) return m;
        if (m == 0) return n;
        for (var i = n; i >= 0; i--) d[i] = [];
        for (var i = n; i >= 0; i--) d[i][0] = i;
        for (var j = m; j >= 0; j--) d[0][j] = j;
        for (var i = 1; i <= n; i++) {
            var s_i = s.charAt(i - 1);
            for (var j = 1; j <= m; j++) {
                if (i == j && d[i][j] > 4) return n;
                var t_j = t.charAt(j - 1);
                var cost = (s_i == t_j) ? 0 : 1;
                var mi = d[i - 1][j] + 1;
                var b = d[i][j - 1] + 1;
                var c = d[i - 1][j - 1] + cost;
                if (b < mi) mi = b;
                if (c < mi) mi = c;
                d[i][j] = mi;
                if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                    d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
                }
            }
        }
        return d[n][m];
    },
    liveSearch: function () {
        $(".searchSuggestions input").on("click", function () {
            var $input = $(".searchSuggestions input");
            if ($(".searchSuggestions input").attr("loading") == undefined) {
                $(".searchSuggestions input").attr("loading", "loading");
                if (b_v.frontendMode == false) {
                    liveFn("Boceksoft Test Villası±##Boceksoft Test Villası±##detay.html##MuÄŸla / Fethiye##luxury-villa.jpg.jpg##BC1030;/Villa Hayat##Villa Hayat##detay.html##MuÄŸla / Fethiye##villa1.jpg##BC1030");
                } else {
                    $.ajax({
                        type: 'post',
                        url: '/ajax/arama',
                        success: function (result) {
                            liveFn(result);
                        }
                    });
                }

                function liveFn(result) {
                    $(".searchSuggestions input").attr("loading", "ready");
                    var rows = result.split(";/");
                    var jsonObj = [];
                    for (i = 0; i < rows.length; i++) {
                        var row = rows[i].split("##");
                        var obj = {};
                        obj["baslik"] = row[0];
                        obj["title"] = row[1];
                        obj["url"] = row[2];
                        obj["bolgebaslik"] = row[3];
                        obj["resim"] = row[4];
                        obj["evkodu"] = row[5];
                        jsonObj.push(obj);
                    }

                    String.prototype.advancedStr = function () {
                        var string = this;
                        var newString = "";
                        for (var i = 0; i < string.length; i++) {
                            newString += string[i] + " ";
                        }

                        var letters = { "Ä°": "i", "I": "Ä±", "Å": "ÅŸ", "Ä": "ÄŸ", "Ãœ": "Ã¼", "Ã–": "Ã¶", "Ã‡": "Ã§" };
                        newString = newString.replace(/(([Ä°IÅÄÃœÃ‡Ã–]))+/g, function (letter) { return letters[letter]; })

                        string = "";
                        for (var i = 0; i < newString.length; i++)
                            string += (i == 0 || i % 2 == 0) ? newString[i] : "";

                        return string.toLowerCase();
                    }

                    String.prototype.turkishToLower = function () {
                        var string = this;
                        var newString = "";
                        for (var i = 0; i < string.length; i++) {
                            newString += string[i] + " ";
                        }
                        var letters = { "Ä°": "i", "I": "Ä±", "Å": "ÅŸ", "Ä": "ÄŸ", "Ãœ": "Ã¼", "Ã–": "Ã¶", "Ã‡": "Ã§" };
                        string = string.replace(/(([Ä°IÅÄÃœÃ‡Ã–]))+/g, function (letter) { return letters[letter]; })

                        string = "";
                        for (var i = 0; i < newString.length; i++)
                            string += (i == 0 || i % 2 == 0) ? newString[i] : "";

                        return string.toLowerCase();
                    }
                    $input.each(function () {
                        $(this).on("keyup", function () {
                            var $this = $(this);
                            var deg = $(this).val().turkishToLower();
                            if (deg.length > 1) {
                                $this.parents("form").find("ul.SpeedSearchList").html("");
                                var sonuclar = jsonObj.filter(function (n) {
                                    return (n.baslik.turkishToLower().indexOf(deg) > -1 || n.evkodu.turkishToLower().indexOf(deg) > -1);
                                });
                                var baslikgoresonuc = 0;
                                var bolgegoresonuc = 0;
                                if (sonuclar.length == 0)
                                    sonuclar = $.merge(sonuclar, $.grep(jsonObj, function (e) {
                                        return $.grep(deg.split(" "), function (tez) {
                                            if ($.grep((e.bolgebaslik != undefined ? e.bolgebaslik : "").turkishToLower().split(" "), function (e2) { return $.boceksoft.levDist(e2, tez) <= 2 && tez.length > 2 || e2 == tez || e2.indexOf(tez) > (e2 == tez ? 99 : -1) }).length > 0)
                                                bolgegoresonuc++;
                                            if ($.grep((e.baslik != undefined ? e.baslik : "").turkishToLower().split(" "), function (e2) { return $.boceksoft.levDist(e2, tez) <= 2 && tez.length > 2 || e2 == tez || e2.indexOf(tez) > (e2 == tez ? 99 : -1) }).length > 0)
                                                baslikgoresonuc++;
                                            return $.grep((e.bolgebaslik != undefined ? e.bolgebaslik : "").turkishToLower().split(" "), function (e2) { return $.boceksoft.levDist(e2, tez) <= 2 && tez.length > 2 || e2 == tez || e2.indexOf(tez) > (e2 == tez ? 99 : -1) }).length > 0 ||
                                                $.grep((e.baslik != undefined ? e.baslik : "").turkishToLower().split(" "), function (e2) { return $.boceksoft.levDist(e2, tez) <= 2 && tez.length > 2 || e2 == tez || e2.indexOf(tez) > (e2 == tez ? 99 : -1) }).length > 0
                                        }).length == deg.split(" ").length && $.grep(sonuclar, function (e2) { return e2.baslik == e.baslik }).length == 0
                                    }));
                                sonuclar.sort(function (a, b) {
                                    if (baslikgoresonuc > bolgegoresonuc || (baslikgoresonuc == 0 && bolgegoresonuc == 0))
                                        return a.baslik.length - b.baslik.length;
                                    else
                                        return a.bolgebaslik.length - b.bolgebaslik.length;
                                });

                                for (var z = 0; z < (sonuclar.length > 9 ? 10 : sonuclar.length); z++) {
                                    var html = `
                                        <li>
                                            <a href="${sonuclar[z].url}" class="d-flex align-items-center text-decoration-none position-relative text-dark  p-2">
                                                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="../cdn/uploads/sliderimg1.jpg" data-srcauto="0" alt="${sonuclar[z].title}" width="50" height="50" class="lazy cover rounded shadow-sm me-2">
                                                <div class="d-flex flex-column ms-1">
                                                    <span class="fs-8 fw-semibold">${sonuclar[z].baslik}</span>
                                                    <span class="fs-8"><i class="fas fa-map-pin"></i> ${sonuclar[z].bolgebaslik}</span>
                                                </div>
                                            </a>
                                        </li>
                                    `;
                                    $this.parents("form").find("ul.SpeedSearchList").append(html);
                                }
                                $this.parents("form").find(".SpeedSearchList").fadeIn(300);
                                $(window).trigger("scroll");
                                $this.parents("form").find("ul.SpeedSearchList").on("scroll", function () {
                                    $(window).trigger("scroll");
                                });
                            } else {
                                $this.parents("form").find(".SpeedSearchList").fadeOut(300);
                            }
                        });
                    });
                    if ($(".searchSuggestions input").is(":focus"))
                        $("input[name='searchlocationcode']").trigger("keyup");
                }
            }
        });
        if  ($(".searchSuggestions input").is(":focus"))
            $(".searchSuggestions input").trigger("click");
    },
    liveSearchTypeAndRegion: function () {
        $(".liveSearchTypeAndRegion input").on("click", function () {
            if ($(".liveSearchTypeAndRegion input").attr("loading") == undefined) {
                $(".liveSearchTypeAndRegion input").attr("loading", "loading");
                if (b_v.frontendMode == true) {
                    var fakeData = {
                        "Destinations": [
                            { "name": "bolge", "bolgeid": 1, "title": "Muğla" },
                            { "name": "bolge", "bolgeid": 2, "title": "Fethiye" },
                            { "name": "bolge", "bolgeid": 3, "title": "Akdeniz" },
                            { "name": "bolge", "bolgeid": 4, "title": "Kaş" },
                        ],
                        "Types": [
                            { "name": "tip", "tipid": 1, "title": "Muhafazakar Villa" },
                            { "name": "tip", "tipid": 2, "title": "Balayı Villaları" },
                            { "name": "tip", "tipid": 3, "title": "Korunaklı Villalar" },
                            { "name": "tip", "tipid": 4, "title": "Doğa Manzaralı Villalar" },
                        ]
                    };
                    liveTandDFn(fakeData);
                } else {
                    $.ajax({
                        type: 'post',
                        url: '/ajax/aramatipvebolge',
                        dataType: "json",
                        contentType: 'application/json',
                        success: function (result) {
                            liveTandDFn(result);
                        }
                    });
                }

                function liveTandDFn(result) {
                    $(".liveSearchTypeAndRegion input").attr("loading", "ready");
                    var jsonObj = {};
                    jsonObj["Type"] = result["Types"];
                    jsonObj["Region"] = result["Destinations"];
                    jsonObj["TypeAndRegion"] = [];

                    var temizTipler = jsonObj["Type"].filter(x => (jsonObj["Region"].filter(x2 => x.title.indexOf(x2.title) > -1).length == 0));
                    jsonObj["Region"].forEach(function (item1) {
                        temizTipler.forEach(function (item2) {
                            var mergedObj = {};
                            Object.keys(item1).forEach(function (key) {
                                mergedObj[key] = (mergedObj[key] == undefined ? "" : mergedObj[key] + " ");
                                mergedObj[key] += item1[key];
                            });
                            Object.keys(item2).forEach(function (key) {
                                mergedObj[key] = (mergedObj[key] == undefined ? "" : mergedObj[key] + " ");
                                mergedObj[key] += item2[key];
                            });
                            jsonObj["TypeAndRegion"].push(mergedObj);
                        });
                    });
                    jsonObj["Region"].forEach(function (item1) {
                        item1.title += " Kiralık Yazlıklar";
                    });
                    console.log(jsonObj["TypeAndRegion"]);


                    String.prototype.turkishToLower = function () {
                        var string = this;
                        var letters = { "Ä°": "i", "I": "Ä±", "Å": "ÅŸ", "Ä": "ÄŸ", "Ãœ": "Ã¼", "Ã–": "Ã¶", "Ã‡": "Ã§" };
                        string = string.replace(/(([Ã„Â°IÃ…ÂÃ„ÂÃƒÅ“Ãƒâ€¡Ãƒâ€“]))+/g, function (letter) { return letters[letter]; })
                        return string.toLowerCase();
                    }

                    $(document).on("click", ".liveSearchTypeAndRegion [data-selected-btn]", function () {
                        $(this).parents("form").find(".liveSearchSelectedInput input[type='checkbox']").attr("checked", false);
                        var inputValHtml = "";
                        $(".liveSearchTypeAndRegion .liveSearchInput").attr("placeholder", $(this).text().trim());
                        if ($(this).data("selected-btn") != "") {
                            var valData = $.parseJSON($(this).data("selected-btn").replaceAll("'", "\""));
                            valData.forEach(function (e) {
                                inputValHtml += "<input type='checkbox' checked='checked' name='" + e.name + "' value='" + e.id + "'/>";
                            })
                        }
                        $(this).parents("form").find(".liveSearchSelectedInput").append(inputValHtml);
                        $(this).parents("form").find(".liveSearchSelectedInput input").eq(0).trigger("change");
                        $(".sonucListesiUlWrap").addClass("d-none visually-hidden");
                    });

                    $(".liveSearchTypeAndRegion .liveSearchInput").on("focusout", function () {
                        setTimeout(function () {
                            $(".liveSearchTypeAndRegion .liveSearchInput").val("");
                            $(".liveSearchTypeAndRegion .liveSearchResultList").html("");
                        }, 100)

                    });
                    $(".liveSearchTypeAndRegion .liveSearchInput").on("keyup", function () {
                        var deg = $(this).val().turkishToLower();
                        if (deg.length > 1) {
                            $(".liveSearchTypeAndRegion .liveSearchResultList").html(`
                                <li data-selected-btn="" style="cursor:pointer;" class="text-theme-second-dark border-bottom border-theme-light fs-7 fw-normal py-3 lh-16 d-flex align-items-center" data-id="0">
                                    <div class="me-2 pe-1">
                                        <img src="${b_v.imagePath}/img/icons/locationsvg.svg" class="contain flex-shrink-0" width="11" height="13">
                                    </div>
                                    <span>TÃ¼m BÃ¶lgeler</span>
                                </li>`);
                            var sonuclar = [];
                            var data1 = [];
                            sonuclar = sonuclar.concat(jsonObj["Region"].filter(function (n) {
                                return (n.title.turkishToLower().indexOf(deg) > -1);
                            }));
                            sonuclar = sonuclar.concat(jsonObj["Type"].filter(function (n) {
                                return (n.title.turkishToLower().indexOf(deg) > -1);
                            }));
                            sonuclar = sonuclar.concat(jsonObj["TypeAndRegion"].filter(function (n) {
                                return (n.title.turkishToLower().indexOf(deg) > -1);
                            }));
                            if (sonuclar.length == 0) {
                                data1 = [];
                                data1 = $.merge(data1, $.grep(jsonObj["Region"], function (e) {
                                    return $.grep(deg.split(" "), function (tez) {
                                        return $.grep(e.title.turkishToLower().split(" "), function (e2) {
                                            return $.boceksoft.levDist(e2, tez) <= 2 && tez.length > 2 || e2 == tez || e2.indexOf(tez) > (e2 == tez ? 99 : -1)
                                        }).length > 0
                                    }).length == deg.split(" ").length && $.grep(data1, function (e2) {
                                        return e2.title == e.title
                                    }).length == 0
                                }));
                                sonuclar = sonuclar.concat(data1);

                                data1 = $.merge(data1, $.grep(jsonObj["Type"], function (e) {
                                    return $.grep(deg.split(" "), function (tez) {
                                        return $.grep(e.title.turkishToLower().split(" "), function (e2) {
                                            return $.boceksoft.levDist(e2, tez) <= 2 && tez.length > 2 || e2 == tez || e2.indexOf(tez) > (e2 == tez ? 99 : -1)
                                        }).length > 0
                                    }).length == deg.split(" ").length && $.grep(data1, function (e2) {
                                        return e2.title == e.title
                                    }).length == 0
                                }));
                                sonuclar = sonuclar.concat(data1);

                                data1 = [];
                                data1 = $.merge(data1, $.grep(jsonObj["TypeAndRegion"], function (e) {
                                    return $.grep(deg.split(" "), function (tez) {
                                        return $.grep(e.title.turkishToLower().split(" "), function (e2) {
                                            return $.boceksoft.levDist(e2, tez) <= 2 && tez.length > 2 || e2 == tez || e2.indexOf(tez) > (e2 == tez ? 99 : -1)
                                        }).length > 0
                                    }).length == deg.split(" ").length && $.grep(data1, function (e2) {
                                        return e2.title == e.title
                                    }).length == 0
                                }));
                                sonuclar = sonuclar.concat(data1);

                            }
                            if (sonuclar.length == 0) {
                                $(".liveSearchTypeAndRegion .liveSearchResultList").html("<li>SonuÃ§ BulunamadÃ„Â±</li>");
                            }
                            else {
                                var gosterilenler = [];
                                for (var z = 0; z < (sonuclar.length > 9 ? 10 : sonuclar.length); z++) {
                                    if (gosterilenler.filter(x => x == sonuclar[z].title).length == 0) {
                                        gosterilenler.push(sonuclar[z].title);
                                        var returnDataStr = "";
                                        var s = sonuclar[z].name.split(" ");
                                        for (var i = 0; i < s.length; i++) {
                                            returnDataStr += (returnDataStr != "" ? "," : "");
                                            returnDataStr += "{'name':'" + s[i] + "','id':" + sonuclar[z][s[i] + "id"] + "}";
                                        }

                                        var html = `
                                            <li data-selected-btn="[${returnDataStr}]" style="cursor:pointer;" class="text-theme-second-dark border-bottom border-theme-light fs-7 fw-normal py-3 lh-16 d-flex align-items-center" data-id="1">
                                                <div class="me-2 pe-1">
                                                    <img src="${b_v.imagePath}/img/icons/locationsvg.svg" class="contain flex-shrink-0" width="11" height="13">
                                                </div>
                                                <span>${sonuclar[z].title}</span>
                                            </li>
                                        `;
                                        $(".liveSearchTypeAndRegion .liveSearchResultList").append(html);
                                    }
                                }
                                $(".liveSearchTypeAndRegion .liveSearchResultList").removeClass("d-none");
                                $(window).trigger("scroll");
                                $(".liveSearchTypeAndRegion .liveSearchResultList").on("scroll", function () {
                                    $(window).trigger("scroll");
                                });
                            }
                        } else {
                            $(".liveSearchTypeAndRegion .liveSearchResultList").addClass("d-none");
                        }
                    });

                    if ($(".liveSearchTypeAndRegion .liveSearchInput").is(":focus"))
                        $(".liveSearchTypeAndRegion .liveSearchInput").trigger("keyup");
                }
            }
        });
        if ($(".searchSuggestions input").is(":focus"))
            $(".searchSuggestions input").trigger("click");
    },
    villasCalendar: function (id, doviz, girisSaati, cikisSaati, villaAdi) {
        if ($(".modalRezervationForm").length > 0)
            $(".modalRezervationForm .girisSaati").html(girisSaati),
                $(".modalRezervationForm .cikisSaati").html(cikisSaati),
                $("#calendarModal .villaCalendar .calendarInfo .villaName").html(villaAdi),
                $(".modalRezervationForm .homesIdValue").val(id);
        if (b_v.frontendMode == false)
            $.ajax({
                type: 'post',
                url: '/ajax/villatarih',
                data: 'id=' + id + "&doviz=" + doviz,
                success: function (e) {
                    $.boceksoft.takvimcalistir(e, id);
                }
            });
        else
            $.boceksoft.takvimcalistir("########################", 0);
    },
    takvimcalistir: function (e, id) {
        var arr = e.split("##");
        b_v.giristarihler = arr[0].split(","),
            b_v.cikistarihler = arr[1].split(","),
            b_v.dolutarihler = arr[2].split(","),
            b_v.Rgiristarihler = arr[3].split(","),
            b_v.Rcikistarihler = arr[4].split(","),
            b_v.RezervasyonBekleyenler = arr[5].split(","),
            b_v.RezervasyonSaatler = arr[6].split(","),
            b_v.calendarFiyatlarTarihler = arr[8].split(","),
            b_v.calendarFiyatlar = arr[9].split(","),
            //b_v.calendarFiyatlarhaftasonutarihler = arr[10].split(","),
            //b_v.calendarHaftasonufiyatlar = arr[11].split(","),
            b_v.calendarFiyatlarDovizIcon = arr[10];
        b_v.calendarFiyatlarDovizGiris = arr[11];
        b_v.calendarFiyatlarDovizCikis = arr[12];
        b_v.activedays = [];
        if (arr[7] != "")
            b_v.activedays = $.parseJSON(arr[7]);

        let calendarData = {
            doluCikislar: b_v.cikistarihler,
            doluGirisler: b_v.giristarihler,
            doluGunler: b_v.dolutarihler,
            doviz: b_v.calendarFiyatlarDovizGiris,
            doviz_code: b_v.calendarFiyatlarDovizCikis,
            doviz_icon: b_v.calendarFiyatlarDovizIcon,
            fiyatlar: b_v.calendarFiyatlar,
            fiyatlarTarihler: b_v.calendarFiyatlarTarihler,
            fiyatlarhaftasonutarihler: b_v.calendarFiyatlarhaftasonutarihler,
            haftasonufiyatlar: b_v.calendarHaftasonufiyatlar,
            kurallar: b_v.activedays,
            odemeCikislar: b_v.Rcikistarihler,
            odemeGirisler: b_v.Rgiristarihler,
            odemeGunler: b_v.RezervasyonBekleyenler,
            odemeSaatler: b_v.RezervasyonSaatler,
            evid: id
        };

        $.boceksoft.calendar(calendarData);


        if ($.boceksoft.urlVeri("q") != "") {
            var a = $.boceksoft.urlVeri("q").split("-");
            if (a.length > 1) {
                let tarih1 = a[0].split(".");
                let tarih2 = a[1].split(".");
                $("[name='reservationdate1']").val((tarih1[0].length == 1 ? "0" : "") + tarih1[0] + "." + tarih1[1] + "." + tarih1[2]).eq(0).trigger("change");
                $("[name='reservationdate2']").val((tarih2[0].length == 1 ? "0" : "") + tarih2[0] + "." + tarih2[1] + "." + tarih2[2]).eq(0).trigger("change");
            }
        }

    },
    calendar: function (calendarData, data_calendars) {
        let aynilar = [];
        var defaultNames = [
            { name: "doluCikislar", default: "", type: "array" },
            { name: "doluGirisler", default: "", type: "array" },
            { name: "doluGunler", default: "", type: "array" },
            { name: "doviz", default: "tl", type: "string" },
            { name: "doviz_code", default: "tl", type: "string" },
            { name: "doviz_icon", default: "â‚º", type: "string" },
            { name: "fiyatlar", default: "", type: "array" },
            { name: "fiyatlarTarihler", default: "", type: "array" },
            { name: "fiyatlarhaftasonutarihler", default: "", type: "array" },
            { name: "haftasonufiyatlar", default: "", type: "array" },
            { name: "kurallar", default: "", type: "array" },
            { name: "odemeCikislar", default: "", type: "array" },
            { name: "odemeGirisler", default: "", type: "array" },
            { name: "odemeGunler", default: "", type: "array" },
            { name: "odemeSaatler", default: "", type: "array" },
            { name: "evid", default: "0", type: "string" }
        ];
        if (calendarData.length == 0) {
            defaultNames.forEach(function (i) {
                if (i.type == "array")
                    calendarData[i.name] = [];
                else
                    calendarData[i.name] = i.default;
            });
        }
        console.log(calendarData);
        if (calendarData != undefined)
            $.each(calendarData.doluGirisler, function (indexInArray, valueOfElement) {
                if ($.inArray(calendarData.doluGirisler[indexInArray], calendarData.doluCikislar) > -1)
                    aynilar.push(calendarData.doluGirisler[indexInArray]);
            });

        var rezdate1 = "[name='reservationdate1']";
        var rezdate2 = "[name='reservationdate2']";


        var calendars = [];
        if (data_calendars != undefined && data_calendars != null) {
            calendars = data_calendars;
        }
        else
            calendars = [
                {
                    event: "#rezdatepicker",
                    type: "single"
                },
                {
                    event: "#calendar",
                    type: "single",
                    onSelect: function (i) {
                        if (b_v.Calendardate1 != undefined && b_v.Calendardate2 != undefined) {
                            var s = new Date(b_v.Calendardate1);
                            var s2 = new Date(b_v.Calendardate2);
                            $("#reservationdate1").val(s.getDate() + "." + (s.getMonth() + 1) + "." + s.getFullYear());
                            $("#reservationdate2").val(s2.getDate() + "." + (s2.getMonth() + 1) + "." + s2.getFullYear()).trigger("change");
                            if ($("#rzvForm").length > 0)
                                $("body,html").animate({ scrollTop: $("#rzvForm").offset().top - 50 }, 500)
                        }
                    }
                },
                {
                    event: "#calendar2",
                    type: "single",
                    modal: true,
                    onSelect: function (i) {
                        if (b_v.Calendardate1 != undefined && b_v.Calendardate2 != undefined) {
                            $("#calendarReservationdate1").trigger("change");
                            $("#calendarReservationdate2").trigger("change");
                            if ($("#rzvForm").length > 0)
                                $("body,html").animate({ scrollTop: $("#rzvForm").offset().top - 50 }, 500)
                        }
                    }
                },
                {
                    event: "#reservationdate1",
                    type: "double",
                    dateindex: 2,
                    nextIndex: 4
                },
                {
                    event: "#reservationdate2",
                    type: "double",
                    dateindex: 4
                }
            ];
        calendars.forEach(function (i) {
            if ($(i.event).length > 0) {
                var doubleDate = false, i2 = null;
                if (i.type == "double") {
                    doubleDate = true;
                    i2 = calendars[i.nextIndex];
                }

                let calendarItem = 1;
                if ($(i.event).data("calendar-item") != undefined) {
                    calendarItem = $(i.event).data("calendar-item");
                    if ($(i.event).data("calendar-responsive") != undefined) {
                        let calendarResonsiveItem = $.parseJSON($(i.event).data("calendar-responsive").replace(/'/g, '"'));
                        calendarResonsiveItem.forEach(element => {
                            if (element.size >= $(window).width())
                                calendarItem = element.item;
                        });
                    }
                }

                try {
                    $(i.event).datepicker("destroy");
                }
                catch (e) {
                }
                $(i.event).datepicker({
                    monthNamesShort: $.datepicker.regional["tr"].monthNames,
                    numberOfMonths: calendarItem,
                    minDate: '0',
                    dateFormat: 'dd.mm.yy',
                    onSelect: function (setDate) {
                        let ssx = setDate.split('.');
                        if (b_v.Calendardate1 == undefined)
                            b_v.Calendardate1 = ssx[2] + "-" + ssx[1] + "-" + ssx[0] + "T00:00:00";
                        else if (b_v.Calendardate2 == undefined && b_v.Calendardate1 != ssx[2] + "-" + ssx[1] + "-" + ssx[0])
                            b_v.Calendardate2 = ssx[2] + "-" + ssx[1] + "-" + ssx[0] + "T00:00:00";
                        else
                            b_v.Calendardate1 = ssx[2] + "-" + ssx[1] + "-" + ssx[0] + "T00:00:00", b_v.Calendardate2 = undefined;
                        if (b_v.Calendardate1 != undefined && b_v.Calendardate2 != undefined) {
                            let datex1 = new Date(b_v.Calendardate1), datex2 = new Date(b_v.Calendardate2);
                            if (datex1 > datex2) {
                                let selectDates = [b_v.Calendardate1, b_v.Calendardate2];
                                b_v.Calendardate1 = selectDates[1];
                                b_v.Calendardate2 = selectDates[0];
                                datex1 = new Date(b_v.Calendardate1), datex2 = new Date(b_v.Calendardate2);
                            }
                            $(rezdate1).val((datex1.getDate() < 10 ? "0" : "") + datex1.getDate() + "." + ((datex1.getMonth() + 1) < 10 ? "0" : "") + (datex1.getMonth() + 1) + "." + datex1.getFullYear());
                            $(rezdate2).val((datex2.getDate() < 10 ? "0" : "") + datex2.getDate() + "." + ((datex2.getMonth() + 1) < 10 ? "0" : "") + (datex2.getMonth() + 1) + "." + datex2.getFullYear());
                            $(rezdate1).eq(0).trigger("change");

                            if (i.modal) {
                                if ($(".modalRezervationForm").length > 0) {
                                    $(".modalRezervationForm .contactForm form .successDate").hide(),
                                        $(".modalRezervationForm .contactForm form [type='submit']").addClass("d-none");
                                    $(".modalRezervationForm").addClass("show");
                                    $("#rzvForm2").data("id", calendarData.evid);
                                    $("[name='reservationdate1']").trigger("change");

                                }
                            }
                            else if ($(window).width() < 1200) {
                                $(".rezervation").trigger("click");
                            }
                        }

                        calendars.forEach(function (gi) {
                            $(gi.event).datepicker("refresh");
                        });
                        if (i.onSelect != undefined && typeof (i.onSelect) == "function") {
                            i.onSelect(i);
                        }
                        if (i.onComplete != undefined && typeof (i.onComplete) == "function" && b_v.Calendardate1 != undefined && b_v.Calendardate2 != undefined) {
                            i.onComplete(i);
                        }
                        $(i.event).trigger("change");
                    },
                    beforeShowDay: function (date) {
                        let m = date.getMonth(), d = date.getDate(), y = date.getFullYear();
                        let nowDate = new Date(y + '/' + (m + 1) + '/' + d + '');


                        let EkTitle = "", EkClass = "";
                        if (b_v.Calendardate1 != undefined && b_v.Calendardate2 != undefined) {
                            let date1 = $.datepicker.parseDate("yy-mm-dd", b_v.Calendardate1.split("T")[0]);
                            let date2 = $.datepicker.parseDate("yy-mm-dd", b_v.Calendardate2.split("T")[0]);
                            if ((date.getTime() == date1.getTime()) || (date >= date1 && date <= date2)) {
                                let selectClass = "dp-highlight";
                                if (nowDate.toString() == date1.toString() && nowDate.toString() == date2.toString())
                                    selectClass = "dp-highlight-giris-cikis";
                                else if (nowDate.toString() == date1.toString())
                                    selectClass = "dp-highlight-giris";
                                else if (nowDate.toString() == date2.toString())
                                    selectClass = "dp-highlight-cikis";
                                EkClass += "tdselect " + selectClass;
                            }
                        }
                        if (calendarData != undefined) {
                            let priceDateIndex = $.inArray(y + '-' + (m + 1) + '-' + d, calendarData.fiyatlarTarihler);
                            if (priceDateIndex > -1)
                                EkTitle = $.boceksoft.doviz_cevir(calendarData.fiyatlar[priceDateIndex], calendarData.doviz, calendarData.doviz_code, calendarData.doviz_icon, true);

                            var dcontrol = y + '-' + (m + 1) + '-' + d;

                            if (aynilar.indexOf(dcontrol) >= 0)
                                return [true, 'jutcikisgiris ui-datepicker-unselectable tooltip-g ' + EkClass, EkTitle];
                            else if (calendarData.doluGirisler.indexOf(dcontrol) >= 0)
                                return [true, 'jutgiris ' + EkClass, EkTitle];
                            else if (calendarData.doluCikislar.indexOf(dcontrol) >= 0)
                                return [true, 'jutcikis ' + EkClass, EkTitle];
                            else if (calendarData.doluGunler.indexOf(dcontrol) >= 0)
                                return [true, 'jutdolus ui-datepicker-unselectable tooltip-g ', EkTitle];
                            else if (calendarData.odemeGirisler.indexOf(dcontrol) >= 0)
                                return [true, 'jutrzvgiris tooltip-r ' + EkClass, EkTitle];
                            else if (calendarData.odemeCikislar.indexOf(dcontrol) >= 0)
                                return [true, 'jutrzvcikis tooltip-r ' + EkClass, EkTitle];
                            else if (calendarData.odemeGunler.indexOf(dcontrol) >= 0)
                                return [true, 'jutrzrv ui-datepicker-unselectable tooltip-r ', EkTitle];
                        }
                        return [true, EkClass, EkTitle];
                    },
                    onClose: function (selectedDate) {
                        if (doubleDate && i2 != undefined) {
                            console.log("test");
                            setTimeout(function () {
                                $(i2.event).datepicker("option", "minDate", selectedDate).focus();
                            }, 100);
                        }

                    }
                });

                if ($(i.event).find(".ui-datepicker-group").length > 2 && !1) {
                    $(i.event).on("click", function () {
                        if ($(i.event).find(".ui-datepicker-group").eq(1).find(".ui-datepicker-header .ui-datepicker-next").length == 0) {
                            $(i.event).find(".ui-datepicker-group").eq(1).find(".ui-datepicker-header").append(`
                                <a class="ui-datepicker-next ui-corner-all" onclick="$(this).parents('.ui-datepicker').find('.ui-datepicker-group-last .ui-datepicker-next').trigger('click');
                                " data-handler="next" data-event="click" title="ileri">
                                    <span class="ui-icon ui-icon-circle-triangle-e">ileri</span>
                                </a>
                                <style>
                                    ${i.event}{position: relative}
                                    ${i.event} .ui-datepicker-group-last .ui-datepicker-next{
                                        display: none;
                                    }
                                </style>
                            `);
                        }
                    });
                    $(i.event).trigger("click");
                }

                //HOVER
                $(document).on("mouseover", i.event + " td", function () {
                    if (b_v.Calendardate1 != undefined && b_v.Calendardate2 == undefined) {
                        if ($(i.event + " .ui-state-active").length > 0 && $(i.event + " td.dp-highlight").length == 0) {
                            var activeIndexs = {
                                td: $(i.event + " .ui-state-active").parents("td").index(),
                                tr: $(i.event + " .ui-state-active").parents("tr").index(),
                                group: $(i.event + " .ui-state-active").parents(".ui-datepicker-group").index()
                            }
                            var hoverIndexs = {
                                this: $(this),
                                td: $(this).index(),
                                tr: $(this).parents("tr").index(),
                                group: $(this).parents(".ui-datepicker-group").index()
                            }
                            $(i.event + " td").each(function () {
                                var eventIndexs = {
                                    this: $(this),
                                    td: $(this).index(),
                                    tr: $(this).parents("tr").index(),
                                    group: $(this).parents(".ui-datepicker-group").index()
                                }
                                if (
                                    (
                                        (activeIndexs.group < eventIndexs.group || (activeIndexs.group == eventIndexs.group && activeIndexs.tr < eventIndexs.tr) || (activeIndexs.group == eventIndexs.group && activeIndexs.tr == eventIndexs.tr && activeIndexs.td < eventIndexs.td)) &&
                                        (eventIndexs.group < hoverIndexs.group || (eventIndexs.group == hoverIndexs.group && eventIndexs.tr < hoverIndexs.tr) || (eventIndexs.group == hoverIndexs.group && eventIndexs.tr == hoverIndexs.tr && eventIndexs.td < hoverIndexs.td)) &&
                                        (activeIndexs.group < hoverIndexs.group || (activeIndexs.group == hoverIndexs.group && activeIndexs.tr < hoverIndexs.tr) || (activeIndexs.group == hoverIndexs.group && activeIndexs.tr == hoverIndexs.tr && activeIndexs.td < hoverIndexs.td))
                                    )
                                    ||
                                    (
                                        (activeIndexs.group > eventIndexs.group || (activeIndexs.group == eventIndexs.group && activeIndexs.tr > eventIndexs.tr) || (activeIndexs.group == eventIndexs.group && activeIndexs.tr == eventIndexs.tr && activeIndexs.td > eventIndexs.td)) &&
                                        (eventIndexs.group > hoverIndexs.group || (eventIndexs.group == hoverIndexs.group && eventIndexs.tr > hoverIndexs.tr) || (eventIndexs.group == hoverIndexs.group && eventIndexs.tr == hoverIndexs.tr && eventIndexs.td > hoverIndexs.td)) &&
                                        (activeIndexs.group > hoverIndexs.group || (activeIndexs.group == hoverIndexs.group && activeIndexs.tr > hoverIndexs.tr) || (activeIndexs.group == hoverIndexs.group && activeIndexs.tr == hoverIndexs.tr && activeIndexs.td > hoverIndexs.td))
                                    )
                                ) {
                                    if (eventIndexs.this.find("a").length > 0)
                                        eventIndexs.this.addClass("in-range");
                                }
                            });
                            if ($(i.event + " td.in-range").length > 0)
                                hoverIndexs.this.attr("data-night", ($(i.event + " td.in-range").length + 1) + " Gece");
                        }
                    }
                }).on("mousemove", i.event + " td", function (event) {
                }).on("mouseout", i.event + " td", function () {
                    $(i.event + " td[data-night]").removeAttr("data-night");
                    $(i.event + " td.in-range").removeClass("in-range");
                });
            }
        });
    },

    dateName: function (getDay) {
        var veri = getDay.toString();
        if (veri == "0")
            return "Pazar";
        else if (veri == "1")
            return "Pazartesi";
        else if (veri == "2")
            return "Salı";
        else if (veri == "3")
            return "Çarşamba";
        else if (veri == "4")
            return "Perşembe";
        else if (veri == "5")
            return "Cuma";
        else
            return "Cumartesi";
    },
    monthName: function (getMonth) {
        var veri = parseInt(getMonth);
        switch (veri) {
            case 1:
                return "Ocak";
            case 2:
                return "Şubat";
            case 3:
                return "Mart";
            case 4:
                return "Nisan";
            case 5:
                return "Mayıs";
            case 6:
                return "Haziran";
            case 7:
                return "Temmuz";
            case 8:
                return "Ağustos";
            case 9:
                return "Eylül";
            case 10:
                return "Ekim";
            case 11:
                return "Kasım";
            case 12:
                return "Aralık";
            default:
                return "?"
        }
    },
    showCalendarModal: function (id, doviz, girisSaati, cikisSaati, villaAdi) {
        b_v.Calendardate1 = undefined, b_v.Calendardate2 = undefined;
        $("#calendarModal").addClass("show"),
            $("#calendarModal .villaCalendar .loading").show(),
            $("#calendarModal .calendarBody").html("<div id='calendar2' data-calendar-title='true' class='calendarpage' data-calendar-responsive=\"[{'size':768,'item':1}]\" data-calendar-item='9' data-id='" + id + "' data-villa-adi='" + villaAdi + "' data-doviz='" + doviz + "' data-giris='" + girisSaati + "' data-cikis='" + cikisSaati + "'></div>");
        $.boceksoft.villasCalendar(id, doviz, girisSaati, cikisSaati, villaAdi);
    },
    urlVeri: function (a) {
        var b = new RegExp("[?&]" + a + "=([^&#]*)").exec(window.location.href);
        return b ? b[1] || 0 : ""
    },
    shuffle: function (array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },
    whatsapp: function () {
        var date = new Date();
        if ($(".whatsappChat,.whatsappBtn").attr("loading") == undefined) {
            $(".whatsappChat,.whatsappBtn").attr("loading", "loading");
            $.ajax({
                url: "/ajax/whatsapp",
                success: function (xml) {
                    $(".whatsappChat,.whatsappBtn").attr("loading", "ready");
                    if (xml != "") {
                        $xml = $(xml);
                        var whatsappAktif = false;
                        var temsilciler = [];
                        var lastwphref = "";
                        $xml.find("data").find("user").each(function (e) {
                            if ($xml.find("data").find("user").eq(e).find("activeTime").text() != undefined && $xml.find("data").find("user").eq(e).find("activeTime").text() != "") {
                                var TemsilciTimes = $xml.find("data").find("user").eq(e).find("activeTime").text().split(" - ");
                                if (TemsilciTimes.length == 2)
                                    if (TemsilciTimes[0].indexOf(":") > 1 && TemsilciTimes[1].indexOf(":") > 1) {
                                        var nowTime = parseInt(date.getHours() + '' + (date.getMinutes() < 10 ? "0" : "") + '' + parseInt(date.getMinutes()));

                                        var BasTarih = TemsilciTimes[0].split(":");
                                        var StrTime = BasTarih[0] + '' + (parseInt(BasTarih[1]) < 10 ? "0" : "") + '' + parseInt(BasTarih[1])
                                        var BitTarih = TemsilciTimes[1].split(":");
                                        var EndTime = (parseInt(BitTarih[0]) == 0 ? "24" : BitTarih[0]) + '' + (parseInt(BitTarih[1]) < 10 ? "0" : "") + '' + parseInt(BitTarih[1]);

                                        if (parseInt(nowTime) >= parseInt(StrTime) && parseInt(nowTime) <= parseInt(EndTime)) {
                                            whatsappAktif = true;
                                            var wptemsilci = "";
                                            lastwphref = "https://wa.me/" + $xml.find("data").find("user").eq(e).find("phone").text().replace("+", "").replace(/ /g, "") + "?text=" + $("#WhatsappPanelIletisim").data("whatsapp-text");
                                            wptemsilci += "<li>";
                                            wptemsilci += "<a onclick='gtag_report_conversion();' target='_blank' href='https://wa.me/" + $xml.find("data").find("user").eq(e).find("phone").text().replace("+", "").replace(/ /g, "") + "?text=" + $("#WhatsappPanelIletisim").data("whatsapp-text") + "'>";
                                            wptemsilci += "<img src='/img/spacer.gif' class='lazy' data-src='/img/whatsapp.png' />";
                                            wptemsilci += "<span>" + $xml.find("data").find("user").eq(e).find("name").text() + "</span>";
                                            wptemsilci += "</a>";
                                            wptemsilci += "</li>";
                                            temsilciler.push(wptemsilci);
                                        }

                                    }
                            }
                        });
                        $.boceksoft.shuffle(temsilciler);
                        var whatsappIletisim = "<ul>";
                        for (i = 0; i < temsilciler.length; i++)
                            whatsappIletisim += temsilciler[i];
                        whatsappIletisim += "</ul>";
                        if (whatsappAktif == true)
                            $("#WhatsappPanelIletisim .temsilciler").html(whatsappIletisim);
                        else
                            $(".whatsappChat,.whatsappBtn").hide();
                        if (temsilciler.length == 1) {
                            $(".whatsappChat a").attr("href", lastwphref).attr("target", "_blank").removeAttr("onclick");
                        }
                    }
                    $(window).trigger("scroll");
                }
            });
        }

    },
    doviz_kurlari: function () {
        $.ajax({
            url: "/ajax/dovizkurlar",
            type: "POST",
            data: "",
            success: function (e) {
                var arr = JSON.parse(e);
                $("[data-click-btn][data-doviz-code='tl']").data("kur", arr["tl"]);
                $("[data-click-btn][data-doviz-code='dolar']").data("kur", arr["dolar"]);
                $("[data-click-btn][data-doviz-code='euro']").data("kur", arr["euro"]);
                $("[data-click-btn][data-doviz-code='pound']").data("kur", arr["pound"]);
                $("[data-now-currency]").html(arr["currency"]);
                $("[data-click-btn='doviz'][data-doviz-code='" + $.boceksoft.cookie("doviz_code") + "']");
                if ($.boceksoft.cookie("doviz_code") != "tl")
                    $("[data-click-btn='doviz'][data-doviz-code='" + $.boceksoft.cookie("doviz_code") + "']").trigger("click");
            }
        });
    },
    doviz_cevir: function (tutar, giris, cikis, birim, birimgoster) {
        if (giris != undefined) {
            var birimFiyati = parseFloat(tutar) / parseFloat(cikis.toString().replace(",", "."));
            var sonuc = (Math.round(parseFloat(birimFiyati) * parseFloat(giris.toString().replace(",", ".")))).toString();
            sonuc = $.boceksoft.formatMoney(sonuc, false);
            if (birimgoster == true)
                sonuc = (birim != "TL" && birim != "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Âº" && birim != "Ã¢â€šÂº" ? birim + " " : "") + sonuc + (birim == "TL" || birim == "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Âº" || birim == "Ã¢â€šÂº" ? " " + birim : "");
            return sonuc;
        }
        else
            return tutar;
    },
    event_click: function () {
        $("[data-click-btn]").on("click", function () {
            var event = $(this);
            var eventIslem = event.data("click-btn");
            if (eventIslem == "doviz") {
                var eventIcon = event.data("doviz-icon"),
                    eventKur = event.data("kur"),
                    eventDovizCode = event.data("doviz-code");
                $("[data-now-currency-input]").val(eventDovizCode);
                $("[data-doviz][data-doviz-goster]").each(function () {
                    var eachEvent = $(this);
                    var eachDoviz = eachEvent.data("doviz"),
                        eachKur = eachEvent.data("kur"),
                        eachPrice = eachEvent.data("price"),
                        eachDovizGoster = eachEvent.data("doviz-goster");
                    eachEvent.html($.boceksoft.doviz_cevir(eachPrice, (eachKur != "0" ? eachKur : $("[data-click-btn][data-doviz-code='" + eachDoviz + "']").data("kur")), eventKur, eventIcon, (eachDovizGoster == "1" ? true : false)));
                });
                if (1 == 1) {
                    $("[data-now-currency]").html(event.data("write-html"));
                } else {
                    $("[data-now-currency]").html("YÃ¼kleniyor...");
                    $.ajax({
                        url: "/exchange/" + (eventDovizCode != "tl" ? (eventDovizCode != "dolar" ? (eventDovizCode != "pound" ? "euro" : "gbp") : "dolar") : "tl"),
                        data: "yonlendirme=0",
                        type: "get",
                        success: function () {
                            if ($("#reservationdate2").length > 0 && $("#reservationdate2").val() != "")
                                $("#reservationdate2").trigger("change");
                            $("[data-now-currency]").html(event.data("write-html"));
                        }
                    });
                }

            }
        });

        window.currency = $.boceksoft.cookie("doviz_code").replace("dolar", "USD").replace("tl", "TL").replace("pound", "GBP").replace("euro", "EUR");
        $("[data-click-btn='doviz']").on("click", function () {
            var dovizcode = $(this).data("doviz-code");
            window.currency = dovizcode.replace("dolar", "USD").replace("tl", "TL").replace("pound", "GBP").replace("euro", "EUR");
        });

        $("[data-input-auto-change]").on("change", function () {
            var name = $(this).data("input-auto-change") != "" && $(this).data("input-auto-change") != undefined ? $(this).data("input-auto-change") : $(this).attr('name');
            var writeEvent = $("[data-input-auto-text='" + name + "']");
            var value = "";

            if ($(this).val() != "") {
                if (writeEvent.data("input-auto-text-type") == "date") {
                    var din = $(this).val().replaceAll("-", ".").replaceAll("/", ".").split(".");
                    value = writeEvent.data("input-auto-text-value").replaceAll("dd", din[0]).replaceAll("mm", din[1]).replaceAll("yy", din[2]).replaceAll("day", din[0]).replaceAll("min.month", $.boceksoft.monthName(din[1]).substr(0, 3)).replaceAll("month", $.boceksoft.monthName(din[1])).replaceAll("year", din[2]);
                }
                else {
                    value = writeEvent.data("input-auto-text-value") != "" && writeEvent.data("input-auto-text-value") != undefined ? writeEvent.data("input-auto-text-value").replace("{val}", $(this).val()) : $(this).val();
                }
            }
            else {
                value = writeEvent.data("input-auto-text-default-value");
            }
            setTimeout(function () {
                $("[data-input-auto-text='" + name + "']").html(value != undefined ? value : "");
            }, 10)
        })
    },
    includeControl: function () {
        if ($("[data-ajax='true']").length > 0) {
            $("[data-ajax='true']").on("click", function () {
                if (!$("[data-ajax='true']").hasClass("trueclick")) {
                    $.boceksoft.include('js', 'validator', b_v.scriptsPath + 'js/validator.js', '', undefined, "");
                    $.boceksoft.include('js', 'jquery.form', b_v.scriptsPath + 'js/jquery.form.js', '', undefined, "");
                    $.boceksoft.include('js', 'bootbox', b_v.scriptsPath + 'js/bootbox.min.js', '', undefined, "");
                    $.boceksoft.include('js', 'sweetalert', b_v.scriptsPath + 'js/sweetalert.min.js', '', $(this), '$("[data-ajax=\'true\']").addClass("trueclick");$.boceksoft.formAjax();');
                    return false;
                }
            });
        }
        /*$(document).on("click", "[data-fancybox]", function () {
            if ($(this).data("load") == "false" || $(this).data("load") == undefined) {
                $("[data-fancybox]").data("load", "true");
                $.boceksoft.include('css', 'fancybox', b_v.scriptsPath + '../css/fancybox.css', '', $(this), "");
                $.boceksoft.include('js', 'fancybox', b_v.scriptsPath + '../js/fancybox.umd.js', '', $(this), {
                    "thumbs": {
                        "autoStart": true,
                        "axis": "x"
                    }
                });
                return false;
            }
        });*/
        $(document).on("click", "[data-fancybox],[data-fancybox-trigger]", function () {
            if ($(this).data("load") == "false" || $(this).data("load") == undefined) {
                $("[data-fancybox],[data-fancybox-trigger]").data("load", "true");
                $.boceksoft.include('css', 'fancybox', b_v.scriptsPath + '../css/fancybox.css', '', this, "");
                $.boceksoft.include('js', 'fancybox', b_v.scriptsPath + '../js/fancybox.umd.js', '', this, `
                $("[data-fancybox]").each(function (){
                    if($(this).data("href")!=undefined && $(this).data("href")!="")
                        $(this).attr("href",$(this).data("href"));
                });
                event.click()
                `);
                return false;
            }
        });
    },
    formAutoFill: function (form, data, cat) {
        data.split("&").filter(function (e) {
            if (e.indexOf("=") > -1) {
                let x = e.split("="),
                    u = form.find("[name='" + x[0] + "']"),
                    i = "val";
                console.log(x[1]);
                console.log(("[name='" + x[0] + "'][value='" + x[1].replace(/,/g, "'],[name='" + x[0] + "'][value='") + "']"));
                if (cat == "listingload" && (x[0] == "tip" || x[0] == "bolge" ||
                    x[0] == "indirimliVillalar" || x[0] == "esnekTarih") || u.length > 0)
                    u = form.find("[name='" + x[0] + "'][value='" + x[1].replace(/,/g, "'],[name='" + x[0] + "'][value='") + "']"),
                        i = "checked";
                if (i == "val") u.val(x[1]);
                else if (i == "checked") u.prop("checked", true);
                if (u.length > 0) return true;
            }
            return false;
        });
    },
    title: function () {
        $("body").append(`
                        <style>
                            div#bug_title {
                                position: absolute;
                                z-index: 9999;
                                background: #009FF5;
                                color:#fff;
                                width: 290px;
                                box-shadow: 0px 3px 14px 0px rgba(0, 52, 102, 0.40);
                                padding: 10px 20px;
                                font-size: 12px;
                                font-weight:700;
                                border-radius: 6px;
                                max-width: max-content;
                            }
                        </style>
                        <div id="bug_title"></div>`);
        let oldText = "";
        $(document).on("mousemove", "[data-bocek-title]", function (el) {
            let $this = $(this);
            let text = $this.attr("data-bocek-title");
            let placement = ($this.attr("data-bocek-placement") != undefined ? $this.attr("data-bocek-placement") : "bottom right");
            $("#bug_title").removeClass("d-none");
            if (oldText != text) {
                oldText = text;
                $("#bug_title").html("<span>" + text + "</span>");
            }
            let LocationY = 0, LocationX = 0;
            if (placement == "bottom")
                LocationY = el.pageY + 20, LocationX = el.pageX - ($("#bug_title").width() / 2);
            else if (placement == "top")
                LocationY = el.pageY - $("#bug_title").height() - 20, LocationX = el.pageX - ($("#bug_title").width() / 2);
            else if (placement == "left")
                LocationY = el.pageY - ($("#bug_title").height() / 2), LocationX = el.pageX - $("#bug_title").width() - 20;
            else if (placement == "right")
                LocationY = el.pageY - ($("#bug_title").height() / 2), LocationX = el.pageX + 20;
            else if (placement == "bottom right")
                LocationY = el.pageY + 20, LocationX = el.pageX + 20;
            else if (placement == "bottom left")
                LocationY = el.pageY + 20, LocationX = el.pageX - $("#bug_title").width() - 20;
            else if (placement == "top right")
                LocationY = el.pageY - $("#bug_title").height() - 20, LocationX = el.pageX + 20;
            else if (placement == "top left")
                LocationY = el.pageY - $("#bug_title").height() - 20, LocationX = el.pageX - $("#bug_title").width() - 20;

            $("#bug_title").css("top", LocationY);
            $("#bug_title").css("left", LocationX);
            if ($("#bug_title").width() + el.pageX + 20 > $(window).width()) {
                $("#bug_title").css("left", $(window).width() - $("#bug_title").width() - 20);
            }
        });
        $(document).on("mousemove", "*", function (el) {
            if (!$("#bug_title").hasClass("d-none")) {
                if ($(this).attr("data-bocek-title") == undefined && $(this).parents("[data-bocek-title]").length == 0 && $(this).find("[data-bocek-title]").length == 0)
                    $("#bug_title").addClass("d-none");
            }
        });
    },
    onReady: function () {
        if ($("#listingForm").length > 0 && document.location.href.indexOf("?") > -1)
            $.boceksoft.formAutoFill($("#listingForm"), document.location.href.split("?")[1], "listingload");

        $("[data-ajax='true']").on("submit", function (e) {
            e.isDefaultPrevented();
            $.boceksoft.includeControl();
        });

        $.boceksoft.includeControl();
        $.boceksoft.title();
        let recaptchaBit = false;
        $("form").on("click", function () {
            if (recaptchaBit == false) {
                $.boceksoft.recaptcha();
                recaptchaBit = true;
            }
        });
        $.boceksoft.lazyLoad(".lazy");
        $.boceksoft.favorigetir();
        // if (!b_v.frontendMode) {
        //     $.boceksoft.instagram();
        //     $.boceksoft.whatsapp();
        //     $.boceksoft.doviz_kurlari();
        // }
        $.boceksoft.liveSearch();
        $.boceksoft.liveSearchTypeAndRegion();
        if ($(".commentArea").data("id") != undefined)
            $.boceksoft.getComments($(".commentArea").data("id"), 1, $(".commentArea").data("islm"));
        if ($("#calendar").data("id") != undefined)
            $.boceksoft.villasCalendar($("#calendar").data("id"), $("#calendar").data("doviz"), $("#calendar").data("giris"), $("#calendar").data("cikis"), $("#calendar").data("villa-adi"));
        $.boceksoft.ajaxAuto("[data-ajaxAuto='true']");
        $.boceksoft.event_click();
    }
};

$(document).ready(function () {
    b_v = $.boceksoft.variables;
    $.boceksoft.onReady();
});



var bocekObj = {};
$.variable = new Proxy(bocekObj, {
    set: function (target, key, value) {
        if (target[key] == undefined)
            $("body").append(`<input type="hidden" id="bocek_proxy_${key}" name="bocek_proxy_${key}" value="${value}"/>`);
        //console.log(target[key] + ":" + value); //Eski ve Yeni Hali Ãƒâ€Ã‚Â°ÃƒÆ’Ã‚Â§in
        $("#bocek_proxy_" + key).val(value).trigger("change");
        target[key] = value;
        return true;
    },
});
$.variableChange = new Proxy(bocekObj, {
    set: function (target, key, value) {
        $(document).on("change", "#bocek_proxy_" + key, function () {
            let oldvalue = target[key];
            let newvalue = $("#bocek_proxy_" + key).val();
            if (typeof (value) == "function")
                value(oldvalue, newvalue);
            else
                eval(value);
        });
        return true;
    },
});