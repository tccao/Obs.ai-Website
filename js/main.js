/* Name:Tinh Cao
File name: main.js
Date: 05/05/2025
 */

$(document).ready(function() {
    // Prevent empty anchor links from scrolling to top
    $('a[href="#"]').on('click', function(e) {
        e.preventDefault();
    });

    // Header scroll effect
    const header = $('header');
    let lastScroll = 0;
    const headerHeight = header.outerHeight();
    const showHeaderThreshold = headerHeight * 2;

    $(window).on('scroll', function() {
        const currentScroll = $(this).scrollTop();
        
        if (currentScroll > headerHeight) {
            // Only apply scroll effects after passing header height
            if (currentScroll > lastScroll) {
                // Scrolling down
                header.css('transform', 'translateY(-100%)');
            }
            else {
                // Scrolling up and past threshold
                header.css('transform', 'translateY(0)');
            }
        } 

        if (currentScroll > showHeaderThreshold) {
            if (currentScroll > lastScroll) {
                // Scrolling down
                header.css('transform', 'translateY(-100%)');
                header.css('transition', 'transform 0.3s ease-in-out');
                header.css('position', 'relative');
            }
            else {
                // Scrolling up and past threshold
                header.css('transform', 'translateY(0)');
                header.css('transition', 'transform 0.3s ease-in-out');
                header.css('position', 'sticky');
            }
        }
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const menuToggle = $('<button>')
        .addClass('menu-toggle')
        .html('&#9776;');
    $('header').append(menuToggle);

    const nav = $('header nav');
    const contentWrapper = $('.content-wrapper');

    menuToggle.on('click', function(e) {
        e.stopPropagation();
        nav.toggleClass('active');
        menuToggle.toggleClass('active');
        contentWrapper.toggleClass('menu-open');
    });

    // Close menu when clicking outside
    $(document).on('click', function(e) {
        if (!nav.is(e.target) && !menuToggle.is(e.target) && nav.has(e.target).length === 0) {
            nav.removeClass('active');
            menuToggle.removeClass('active');
            contentWrapper.removeClass('menu-open');
        }
    });

    // Dynamic copyright year
    $('.footer-bottom p').html(`&copy; ${new Date().getFullYear()} OBS.ai. All rights reserved.`);

    // Social media share buttons
    $('.social-media-links a').on('click', function(e) {
        e.preventDefault();
        const platform = $(this).attr('aria-label').toLowerCase();
        const url = encodeURIComponent('https://tccao.github.io/Obs.ai-Website/');
        const title = encodeURIComponent('OBS.ai - An Ai-Powered Analytics Platform');
        const description = encodeURIComponent('Transform your business with AI-driven analytics to unlock insights and drive growth');
        
        let shareUrl;
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'x':
                shareUrl = `https://x.com/intent/post?text=${title}&url=${url}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${description}`;
                break;
            case 'instagram':
                // Instagram doesn't support direct sharing via URL
                window.open('https://www.instagram.com', '_blank');
                return;
        }
        
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        
        window.open(shareUrl, 'share', `width=${width},height=${height},left=${left},top=${top}`);
    });
}); 