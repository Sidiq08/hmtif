(function ($) {

    const app = {
        init: () => {

            app.blockPremiumSettings();

            $('.attention_effect select').on('change', app.attentionEffectPreview);

            //custom switch position
            app.customPositionToggle();
            $('.switcher_position select').on('change', app.customPositionToggle);
            $('.switcher_position select').on('change', app.customPositionPreview);

            app.customPositionPreview();
            $('.custom_position input[type=radio]').on('change', app.customPositionPreview);
            $('.cta_text').on('input', app.customPositionPreview);
            $('.switch_text_light, .switch_text_dark').on('input', app.customPositionPreview);

            //handle color changes
            $(window).on('wppool_color_picker', app.handleColorChange);
            $(window).on('wppool_color_picker_clear', app.handleColorClear);

            //handle get started tabs
            $('.tab-links .tab-link').on('click', app.handleTabs);

            //CTA Deps
            app.ctaDeps();
            $('.enable_cta').on('change', app.ctaDeps);
            $('.enable_cta').on('change', app.customPositionPreview);

            //Switch style
            $('.switch_style input').on('change', function () {
                const style = $('.switch_style input:checked').val();

                wp.ajax.send('get_switch_preview', {
                    data: {
                        style
                    },
                    success: (data) => {
                        if (data.html) {
                            $('.switch-preview .wp-dark-mode-switcher').replaceWith(data.html);
                        }
                    },
                    error: error => console.error(error),
                    complete: () => {
                        app.customPositionPreview();
                        app.attentionEffectPreview();
                    }
                });
            });

        },

        ctaDeps: () => {
            const checked = $('.enable_cta input:checked').val();
            if ('on' === checked) {
                $('.cta_text, .cta_text_color, .cta_bg_color').css('display', 'revert');
            } else {
                $('.cta_text, .cta_text_color, .cta_bg_color').css('display', 'none');
            }
        },

        handleColorChange: (e, data) => {
            let element = data.element;


            if ($(element).parents('.cta_bg_color').length) {
                $('.wp-dark-mode-switcher-cta').css('--wp-dark-mode-cta-bg', data.color)
            }

            if ($(element).parents('.cta_text_color').length) {
                $('.wp-dark-mode-switcher-cta').css('color', data.color)
            }

        },

        handleColorClear: (e, data) => {
            let element = data.element;

            if ($(element).parents('.cta_bg_color').length) {
                $('.wp-dark-mode-switcher-cta').css('--wp-dark-mode-cta-bg', '#555')
            }

            if ($(element).parents('.cta_text_color').length) {
                $('.wp-dark-mode-switcher-cta').css('color', '#fff')
            }
        },

        handleTabs: function(e){
            e.preventDefault();

            const target = $(this).attr('href');
            if ('changelog' === target) {
                return;
            }

            $('.tab-links .tab-link, .tab-content').removeClass('active');

            $(this).addClass('active');
            $(`#${target}`).addClass('active');
        },

        customPositionToggle: () => {

            const val = $('.switcher_position select').val();

            if (!val || 'custom' === val) {
                $('.custom_position').css('display', 'revert');
            } else {
                $('.custom_position').css('display', 'none');
            }
        },

        customPositionPreview: () => {

            let position_side = $('.switcher_position select').val();

            if (!position_side || 'custom' === position_side) {
                position_side = $('.side-selection input:checked').val();
            }

            const element = $('.switch-preview .wp-dark-mode-switcher');
            element.removeClass('left_bottom right_bottom');
            element.addClass(position_side);

            //Cta Text
            const checked = $('.enable_cta input:checked').val();
            if ('on' === checked) {
                let ctaText = $('.cta_text input').val();
                ctaText = ctaText ? `${ctaText} <span></span>` : '';

                if (element.find('.wp-dark-mode-switcher-cta').length) {
                    $('.wp-dark-mode-switcher-cta', element).html(ctaText);
                } else {
                    element.prepend($(`<span class="wp-dark-mode-switcher-cta">${ctaText}</span>`));
                }

                const ctaTextColor = $('.cta_text_color input').val();
                const ctaBgColor = $('.cta_bg_color input').val();
                if (ctaTextColor) {
                    $('.wp-dark-mode-switcher-cta', element).css({color: ctaTextColor});
                }
                if (ctaBgColor) {
                    element.css('--wp-dark-mode-cta-bg', ctaBgColor);
                }
            } else {
                $('.wp-dark-mode-switcher-cta', element).remove();
            }

            //Switch text
            const customTextchecked = $('.custom_switch_text input:checked').val();
            if ('on' === customTextchecked) {
                const lightText = $('.switch_text_light input').val();
                const darkText = $('.switch_text_dark input').val();

                $('.switch-light-text', element).text(lightText);
                $('.switch-dark-text', element).text(darkText);
            }


        },

        blockPremiumSettings: () => {

            if (wpDarkMode.js_ul) {
                return;
            }

            //select option disabled
            $(`.switcher_position select option:last-child,
            .attention_effect select option:nth-child(n+4)
            `).attr('disabled', 'disabled');

            //block image choose
            $(`.color_preset .image-choose-opt:nth-child(n+3), .image-choose-opt:nth-child(n+3):nth-child(-n+12)`)
                .addClass('disabled').append($('<div class="disabled-text wp-dark-mode-ignore"></div>'));

            //Block switches
            $(`.customize_colors,
            .start_at,
            .end_at,
            .specific_category,
            .time_based_mode,
            .custom_position,
            .cta_text,
            .cta_bg_color,
            .cta_text_color,
            .custom_switch_icon,
            .switch_icon_light,
            .switch_icon_dark,
            .custom_switch_text,
            .switch_text_light,
            .switch_text_dark,
            .show_above_post,
            .show_above_page,
            .includes,
            .excludes,
            .exclude_pages,
            .exclude_pages,
            .enable_menu_switch,
            .switch_menus,
            .image-settings-table,
            .custom_css,
            .brightness,
            .contrast,
            .sepia,
            .enable_cta
            `).addClass('disabled');
        },

        attentionEffectPreview: () => {
            const val = $('.attention_effect select').val();

            const element = $('.switch-preview label');

            element.removeClass(`wp-dark-mode-wobble wp-dark-mode-vibrate wp-dark-mode-flicker wp-dark-mode-shake wp-dark-mode-jello wp-dark-mode-bounce wp-dark-mode-heartbeat  wp-dark-mode-blink`).addClass(`wp-dark-mode-${val}`);
        }
    };

    $(document).ready(app.init);

    $(document).ready(function () {

        if ($("#image_compare").length) {
            $("#image_compare").twentytwenty();
        }

        // brightness, contrast & sepia config sliders
        const sliders = $('.brightness, .contrast, .sepia');

        sliders.each(function () {
            const $slider = $(this).find('.wppool-slider');

            $slider.slider({
                slide: (e, ui) => {
                    const handle = $(".wppool-slider-handle", $slider);
                    $("input", $(this)).val(ui.value);
                    handle.text(ui.value);

                    const brightness = $("[name='wp_dark_mode_color[brightness]']").val();
                    const contrast = $("[name='wp_dark_mode_color[contrast]']").val();
                    const sepia = $("[name='wp_dark_mode_color[sepia]']").val();

                    window.wpDarkMode.includes = '.filter-preview';

                    DarkMode.enable({
                        brightness,
                        contrast,
                        sepia,
                    });
                }
            });


        });

        //Handle exclude
        setTimeout(function () {

            const excludes = $('#wpb_visual_composer');

            if (!excludes.length) {
                return;
            }

            if (!wpDarkMode.enable_backend) {
                return;
            }

            excludes.each(function () {
                if ($(this).length) {
                    $(this).addClass('wp-dark-mode-ignore');
                    $(this).find('*').addClass('wp-dark-mode-ignore');
                }
            });

            const is_saved = localStorage.getItem('wp_dark_mode_admin_active');

            if (is_saved && is_saved != 0) {
                document.querySelector('html').classList.add('wp-dark-mode-active');

                DarkMode.enable();

            }

        }, 100);

    });
})(jQuery);