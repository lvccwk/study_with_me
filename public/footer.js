let footer = document.querySelector('#footer')
if (footer) {
    footer.innerHTML = `
<footer class="site-footer">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-12 col-12 border-bottom pb-5 mb-5">
					<div class="d-flex">
						<a href="index.html" class="navbar-brand">
							<i class="bi-bullseye brand-logo"></i>
							<span class="brand-text">STUDY <br />
								WITH ME</span>
						</a>

						<ul class="social-icon ms-auto">
							<li>
								<a href="#" class="social-icon-link bi-facebook"></a>
							</li>

							<li>
								<a href="#" class="social-icon-link bi-instagram"></a>
							</li>

							<li>
								<a href="#" class="social-icon-link bi-whatsapp"></a>
							</li>

							<li>
								<a href="#" class="social-icon-link bi-youtube"></a>
							</li>
						</ul>
					</div>
				</div>

				<div class="col-lg-7 col-12">
					<ul class="footer-menu d-flex flex-wrap">
						<li class="footer-menu-item">
							<a href="#" class="footer-menu-link">關於我們</a>
						</li>

						<li class="footer-menu-item">
							<a href="/tutorpage.html" class="footer-menu-link">導師資料</a>
						</li>

						<li class="footer-menu-item">
							<a href="#" class="footer-menu-link">上課時間</a>
						</li>

						<li class="footer-menu-item">
							<a href="#" class="footer-menu-link">學習資源</a>
						</li>

						<li class="footer-menu-item">
							<a href="#" class="footer-menu-link">討論區</a>
					</ul>
				</div>

				<div class="col-lg-5 col-12 ms-lg-auto">
					<div class="copyright-text-wrap d-flex align-items-center">
						<p class="copyright-text ms-lg-auto me-4 mb-0">
							Copyright © 2022 Study with me

							<br />All Rights Reserved.

						</p>

						<a href="#section_1" class="bi-arrow-up arrow-icon custom-link"></a>
					</div>
				</div>
			</div>
		</div>
	</footer>
`
}

