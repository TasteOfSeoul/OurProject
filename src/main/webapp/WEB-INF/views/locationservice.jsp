<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>웹페이지 제목</title>

	<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=kyvybyx7ee&submodules=geocoder,places"></script>
</head>
	<body>
		<div>
			<input id="loc" placeholder="지역, 음식 또는 식당명 입력" value="서울">
			<button id="reset"> reset </button>
			<button id="search" type="button" aria-label="검색하기 버튼"> 검색 </button>
		</div>
		<br>
		<br>

		<div id="map" style="width:100%;height:600px;"></div>
		<script>



			// 네이버 지도 초기 설정 함수
			function initMap(latitude, longitude) {
				var mapOptions = {
					center: new naver.maps.LatLng(latitude, longitude),
					zoom: 15
				};
				var map = new naver.maps.Map('map', mapOptions);

				// 현재 위치에 마커 표시
				var marker = new naver.maps.Marker({
					position: new naver.maps.LatLng(latitude, longitude),
					map: map,
					icon: {
						url: "/images/location_icon.png", // 현재 위치와 비슷한 아이콘 URL
						size: new naver.maps.Size(24, 37),
						origin: new naver.maps.Point(0, 0),
						anchor: new naver.maps.Point(12, 37),
					}
				});
			}

			// 사용자의 현재 위치 가져오기


			//navigator.geolocation : HTML5 Geolocation API 에서 제공하는 객체
			// 주로 자바스크립트를 통해 사용자의 위치 정보를 가져올 때 사용됨.
			if (navigator.geolocation) {  //브라우저가 Geolocation 을 지원한다면

				// 첫번째 : 현재위치를 가져왔을 때 처리할 함수
				// 두번째 : 위치정보를 가져오는데 실패한 경우 처리 함수
				navigator.geolocation.getCurrentPosition(
						function (position) {
							var latitude = position.coords.latitude;   // 위도
							var longitude = position.coords.longitude; // 경도

							initMap(latitude, longitude);               // 지도 초기화
						},
						function (error) {
							console.error("위치 정보를 가져올 수 없습니다:", error);
						}
				);
			} else {
				console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
			}

		</script>
	</body>
</html>
