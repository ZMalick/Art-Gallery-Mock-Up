/* =============================================
   Kay's Originals — Main JavaScript
   ============================================= */

(function () {
  'use strict';

  /* ---- Helpers ---- */
  function getParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /* ---- Render an artwork card (reused everywhere) ---- */
  function renderArtworkCard(art) {
    var artist = KaysData.getArtist(art.artistId);
    var artistName = artist ? artist.name : '';
    return '<article class="artwork-card">' +
      '<a href="artwork.html?id=' + art.id + '" class="card-link">' +
        '<div class="card-frame">' +
          '<img src="' + art.image + '" alt="' + art.title + '" class="card-image" loading="lazy">' +
          '<div class="card-overlay"><span class="overlay-text">View Details</span></div>' +
        '</div>' +
        '<div class="card-info">' +
          '<span class="media-tag tag-' + art.category + '">' + capitalize(art.category) + '</span>' +
          '<h3 class="card-title">' + art.title + '</h3>' +
          '<p class="card-artist">' + artistName + '</p>' +
          '<p class="card-year">' + art.year + '</p>' +
        '</div>' +
      '</a>' +
    '</article>';
  }

  /* ---- Render an artist card (reused everywhere) ---- */
  function renderArtistCard(artist) {
    return '<div class="artist-card">' +
      '<a href="artist.html?id=' + artist.id + '" class="artist-card-link">' +
        '<div class="artist-photo-wrap">' +
          '<img src="' + artist.photo + '" alt="' + artist.name + '" class="artist-photo" loading="lazy">' +
        '</div>' +
        '<div class="artist-info">' +
          '<h3>' + artist.name + '</h3>' +
          '<span class="artist-media">' + artist.media + '</span>' +
          '<p>' + artist.shortBio + '</p>' +
          '<span class="artist-link">View Portfolio &rarr;</span>' +
        '</div>' +
      '</a>' +
    '</div>';
  }

  /* ========================================
     PAGE: Homepage
     ======================================== */
  var featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    var featured = KaysData.artworks.slice(0, 6);
    var html = '';
    for (var i = 0; i < featured.length; i++) {
      html += renderArtworkCard(featured[i]);
    }
    featuredGrid.innerHTML = html;
  }

  var artistGrid = document.getElementById('artistGrid');
  if (artistGrid) {
    var artists = KaysData.artists.slice(0, 3);
    var ahtml = '';
    for (var j = 0; j < artists.length; j++) {
      ahtml += renderArtistCard(artists[j]);
    }
    artistGrid.innerHTML = ahtml;
  }

  /* ========================================
     PAGE: Gallery
     ======================================== */
  var galleryGrid = document.getElementById('galleryGrid');
  var galleryFilters = document.getElementById('galleryFilters');
  var gallerySearch = document.getElementById('gallerySearch');
  var resultsCount = document.getElementById('resultsCount');

  if (galleryGrid) {
    var currentCategory = getParam('category') || 'all';
    var currentQuery = '';

    function renderGallery() {
      var artworks;
      if (currentQuery) {
        artworks = KaysData.searchArtworks(currentQuery);
        if (currentCategory !== 'all') {
          artworks = artworks.filter(function (a) { return a.category === currentCategory; });
        }
      } else {
        artworks = KaysData.getArtworksByCategory(currentCategory);
      }

      var html = '';
      for (var i = 0; i < artworks.length; i++) {
        html += renderArtworkCard(artworks[i]);
      }
      galleryGrid.innerHTML = html || '<p class="no-results">No artwork found matching your search.</p>';

      if (resultsCount) {
        resultsCount.textContent = artworks.length + ' piece' + (artworks.length !== 1 ? 's' : '');
      }
    }

    // Set active filter pill from URL param
    if (galleryFilters) {
      var pills = galleryFilters.querySelectorAll('.filter-pill');
      pills.forEach(function (pill) {
        if (pill.getAttribute('data-category') === currentCategory) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
        pill.addEventListener('click', function () {
          currentCategory = this.getAttribute('data-category');
          pills.forEach(function (p) { p.classList.remove('active'); });
          this.classList.add('active');
          renderGallery();
        });
      });
    }

    if (gallerySearch) {
      gallerySearch.addEventListener('input', function () {
        currentQuery = this.value.trim();
        renderGallery();
      });
    }

    renderGallery();
  }

  /* ========================================
     PAGE: Artwork Detail
     ======================================== */
  var artworkDetail = document.getElementById('artworkDetail');
  if (artworkDetail) {
    var artId = getParam('id');
    var art = artId ? KaysData.getArtwork(artId) : null;

    if (art) {
      var artist = KaysData.getArtist(art.artistId);
      artworkDetail.innerHTML =
        '<div class="detail-layout">' +
          '<div class="detail-image-wrap">' +
            '<img src="' + art.imageLg + '" alt="' + art.title + '" class="detail-image">' +
          '</div>' +
          '<div class="detail-info">' +
            '<span class="media-tag tag-' + art.category + '">' + capitalize(art.category) + '</span>' +
            '<h1 class="detail-title">' + art.title + '</h1>' +
            '<p class="detail-artist-year">' + (artist ? artist.name : '') + ' &middot; ' + art.year + '</p>' +
            '<p class="detail-description">' + art.description + '</p>' +
            '<div class="detail-specs">' +
              '<p><strong>Medium:</strong> ' + art.medium + '</p>' +
              '<p><strong>Dimensions:</strong> ' + art.dimensions + '</p>' +
              '<p><strong>Year:</strong> ' + art.year + '</p>' +
            '</div>' +
            (artist ? '<a href="artist.html?id=' + artist.id + '" class="btn btn-primary" style="margin-top:1.5rem;">View Artist Profile</a>' : '') +
          '</div>' +
        '</div>' +
        (artist ?
          '<div class="detail-about-artist">' +
            '<h3>About the Artist</h3>' +
            '<p>' + artist.shortBio + ' <a href="artist.html?id=' + artist.id + '">View full profile &rarr;</a></p>' +
          '</div>' : '');
    } else {
      artworkDetail.innerHTML =
        '<div class="not-found">' +
          '<h2>Artwork Not Found</h2>' +
          '<p>The artwork you are looking for does not exist.</p>' +
          '<a href="gallery.html" class="btn btn-primary">Back to Gallery</a>' +
        '</div>';
    }
  }

  /* ========================================
     PAGE: All Artists
     ======================================== */
  var allArtistsGrid = document.getElementById('allArtistsGrid');
  if (allArtistsGrid) {
    var allHtml = '';
    for (var k = 0; k < KaysData.artists.length; k++) {
      allHtml += renderArtistCard(KaysData.artists[k]);
    }
    allArtistsGrid.innerHTML = allHtml;
  }

  /* ========================================
     PAGE: Artist Profile
     ======================================== */
  var artistDetail = document.getElementById('artistDetail');
  if (artistDetail) {
    var aId = getParam('id');
    var a = aId ? KaysData.getArtist(aId) : null;

    if (a) {
      var works = KaysData.getArtworksByArtist(a.id);
      var worksHtml = '';
      for (var w = 0; w < works.length; w++) {
        worksHtml += renderArtworkCard(works[w]);
      }

      artistDetail.innerHTML =
        '<div class="profile-header">' +
          '<img src="' + a.photo + '" alt="' + a.name + '" class="profile-photo">' +
          '<div class="profile-info">' +
            '<h1>' + a.name + '</h1>' +
            '<span class="artist-media">' + a.media + '</span>' +
            '<p class="profile-bio">' + a.bio + '</p>' +
          '</div>' +
        '</div>' +
        '<section class="profile-works">' +
          '<h2 class="section-heading" style="font-size:1.6rem;margin-bottom:1.5rem;">Works in Gallery</h2>' +
          '<div class="artwork-grid">' + worksHtml + '</div>' +
        '</section>';
    } else {
      artistDetail.innerHTML =
        '<div class="not-found">' +
          '<h2>Artist Not Found</h2>' +
          '<p>The artist you are looking for does not exist.</p>' +
          '<a href="artists.html" class="btn btn-primary">Back to Artists</a>' +
        '</div>';
    }
  }

  /* ========================================
     PAGE: FAQ Accordion
     ======================================== */
  document.querySelectorAll('.faq-question').forEach(function (question) {
    question.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ========================================
     PAGE: Contact Form
     ======================================== */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  /* ========================================
     SHARED: Mobile Navigation
     ======================================== */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 1024) {
          navLinks.classList.remove('open');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ---- Close mobile menu on resize ---- */
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && navLinks) {
      navLinks.classList.remove('open');
      if (hamburger) {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });

  /* ---- Scroll Reveal ---- */
  var reveals = document.querySelectorAll('.reveal');

  function checkReveal() {
    var windowHeight = window.innerHeight;
    reveals.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  checkReveal();

  /* ---- Navbar shadow on scroll ---- */
  var nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)';
      } else {
        nav.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

})();
