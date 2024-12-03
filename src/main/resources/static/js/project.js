loc = document.getElementById("loc");   //입력 값
search = document.getElementById("search"); //검색버튼
myloc = document.getElementById("myloc");   // 현위치 조회 버튼

var marker = null;

var markers = [];
var restaurantData = [];
/////////////////////////////////////////////////////////////////////////////////////////-*


// 기존 이미지와 변경할 이미지 URL  - 전준영님 코드
const newImageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAABHNCSVQICAgIfAhkiAAAA0lJREFUWEfNWM9PE1EQ/ra0B40J9Q8gQqJnl5shXS1HT7QXrmylGONFvQnGkwl4Ey9qbGPLlUu3J49U2xBvlLMmkPAH2CZED7Q+Z7oslP5g32wW6Fw2aWfe+943b368MRBUrOwcmSahYHaWMPhrxAHVoN/qx7/xt4JqvhxkG0NklMgmYRgLBCDlAtEVAgzDgVIbqOUrulZ64O49mUS0VSBgSd2Fh+opVUErmsGPT/t+a/mDs7Lv6NTP/RaS/6/Wyd0vzrMbDi5px+mEpVDYGoaAWYy20qgUye39MhjczJKJMZRIfVLOiNhiH22ksZ1zg6hL+sExY+3YziUBc6FwdEePZnsZ7AeXyG5dqCvPc3EtPzucucTSOuWrZ2LHhGWg8B613EnwnTLH6SLW3gtrn8DrHI1NeWnmFNxVubP3FBzBx+51wbmZfyvwacM2VGqWK4kLzso6lGi5VoollTAxZ5kwb0/AvDOB+s8D1H8doFytw6n1ZQfN9anMVfO2B+63rFYC8RvXUFi2kbKmh27oVHeQWSuicfhXE5SnRrW4mr9pwFqkIh7hhKstDGxvc40AXve1aRz+wdT8shwgudZAgPThrD7FHLlTV5jB9KuPuuquHqUVBleh3PZA15LvWInASSW98kF2BxW+icEV6Z4tPJyRYsPG123YdP+0pQPOyoqCof7lNe5SZEqFo3h68Y3ATDUI3JISWEB9/yxRP6Nr3H8ssmVw3EuN61oFZW6Xcp/5SMIcmiN+50Y8WsVtkjTPlamMpSiViKST5wJWiP3NtxinSuEnTSpdk/MvA1YIXl0YFGzCJay4kjm3UjBj9mpBDgxoopqLe4WfsiM/luXCFSPFXQl1JJz/OCo5pzmhdSUj3c8xYcKolXOsa6HK1C5Rp8TjF09G+g3hsidOK7p8aOkNfX151lflXupC6FmY7D7E4Bd/K1qnB88trdOGoaSwSy/+pP+LnzfjWUlEOZcCkIH9g603K/GY6EyZYgRQv0sWk8iujB6lZFOm7l0uKkh6Lv+gg/kPD9mqM9lsF0NhkdlqjdnhTDbPsMiTAbofMDhJajeopNuk5xTNhFEMfyY8iHPuZlSEQ79rmt4B3DyZpoOn6gRKMKTu3uo/XMZNoGLc68wAAAAASUVORK5CYII=";

document.querySelectorAll('.iwhOAe .Query').forEach((item) => {
    item.addEventListener('click', () => {
        // 모든 항목을 초기화
        document.querySelectorAll('.iwhOAe .Query img').forEach((img) => {
            img.src = "https://dcicons.s3.ap-northeast-1.amazonaws.com/new/images/web/react_components/Query/r_un.png";
        });

        // 클릭된 항목만 변경
        const img = item.querySelector('img');
        if (img) {
            img.src = newImageSrc;
        }
    });
});

// DOM 요소 가져오기
const categoryTab = document.getElementById("category-tab");
const regionTab = document.getElementById("region-tab");
const categoryFilter = document.querySelector(".iwhOAe");
const regionContent = document.getElementById("region-content");
categoryTab.classList.add("active-tab");
categoryFilter.style.display = "grid";
regionContent.style.display = "none";
// 카테고리와 지역 탭 클릭 이벤트 핸들러
categoryTab.addEventListener("click", () => {
    // 카테고리 탭 활성화
    categoryTab.classList.add("active-tab");
    regionTab.classList.remove("active-tab");

    // 콘텐츠 전환
    categoryFilter.style.display = "grid";
    regionContent.style.display = "none";
});

regionTab.addEventListener("click", () => {
    // 지역 탭 활성화
    regionTab.classList.add("active-tab");
    categoryTab.classList.remove("active-tab");

    // 콘텐츠 전환
    categoryFilter.style.display = "none";
    regionContent.style.display = "block";
});

// 지역 선택 모달 관련 코드
const regionModal = document.getElementById("region-modal");
const regionSelectBtn = document.getElementById("region-select-btn");
const closeRegionModal = document.getElementById("close-region-modal");
const guSelector = document.getElementById("gu-selector");
const dongSelector = document.getElementById("dong-selector");
const confirmRegionBtn = document.getElementById("confirm-region");

const dongData = {
    gangnam: ["전체", "삼성동", "청담동", "논현동", "역삼동"],
    gangdong: ["전체", "천호동", "둔촌동", "암사동"],
    gangseo: ["전체", "화곡동", "염창동", "등촌동"],
    gwanak: ["전체", "봉천동", "신림동"],
    dongjak: ["전체", "상도동", "대방동", "사당동"]
};

const dongCoordinates = {
    gangnam: {
        "전체": { lat: 37.5172363, lng: 127.0473248 },
        "역삼동": { lat: 37.5006211, lng: 127.0364292 },
        "삼성동": { lat: 37.5145752, lng: 127.0565097 },
        "논현동": { lat: 37.511702, lng: 127.027621 },
        "청담동": { lat: 37.5199733, lng: 127.0515441 }
    },
    gangdong: {
        "전체": { lat: 37.5301251, lng: 127.1237639 },
        "천호동": { lat: 37.5384865, lng: 127.1239747 },
        "둔촌동": { lat: 37.5270882, lng: 127.136572 },
        "암사동": { lat: 37.5517846, lng: 127.128163 }
    },
    gangseo: {
        "전체": { lat: 37.5610936, lng: 126.821983 },
        "화곡동": { lat: 37.541255, lng: 126.840586 },
        "염창동": { lat: 37.548374, lng: 126.874479 },
        "등촌동": { lat: 37.551049, lng: 126.865784 }
    },
    gwanak: {
        "전체": { lat: 37.478407, lng: 126.951623 },
        "봉천동": { lat: 37.482051, lng: 126.941411 },
        "신림동": { lat: 37.484799, lng: 126.929953 }
    },
    dongjak: {
        "전체": { lat: 37.512409, lng: 126.939934 },
        "상도동": { lat: 37.502916, lng: 126.948591 },
        "대방동": { lat: 37.507225, lng: 126.926666 },
        "사당동": { lat: 37.477659, lng: 126.981934 }
    }
};

// 모달 열기
regionSelectBtn.addEventListener("click", () => {
    regionModal.classList.remove("hidden");
});

// 모달 닫기
closeRegionModal.addEventListener("click", () => {
    regionModal.classList.add("hidden");
});

// 구 선택 이벤트
guSelector.addEventListener("change", () => {
    const selectedGu = guSelector.value;

    dongSelector.innerHTML = "<option value='' disabled selected>동 선택</option>";
    if (dongData[selectedGu]) {
        dongData[selectedGu].forEach((dong) => {
            const option = document.createElement("option");
            option.value = dong;
            option.textContent = dong;
            dongSelector.appendChild(option);
        });
        dongSelector.disabled = false;
    } else {
        dongSelector.disabled = true;
    }
});

// 지역 선택 완료
confirmRegionBtn.addEventListener("click", () => {
    const selectedGu = guSelector.value;
    const selectedDong = dongSelector.value;

    if (selectedGu && selectedDong) {
        const coordinates = dongCoordinates[selectedGu][selectedDong];
        if (coordinates) {
            const { lat, lng } = coordinates;
            const newPosition = new naver.maps.LatLng(lat, lng);

            //코드 추가 지역선택 시 반경 1km 맛집 정보 팝업 생성 --*
            //가게 검색했을 때 마커
            if(marker) {
                marker.setMap(null);
                marker = null;

            }

            //현 위치 기준 1km 내 식당을 표시해주는 마커
            if(markers && markers.length > 0) {
                markers.forEach(marker => {
                    marker.setMap(null); //배열의 각 마커 지우기

                })

                // 배열 비우기
                markers.length = 0;
            }

            map = new naver.maps.Map('map' , {
                position : newPosition,
                zoom : 15
            })

            fetch('/allData')
                .then(response => response.json())
                .then(data => {
                    restaurantData = data;

                    const filteredRestaurants = filterRestaurants(lat , lng, restaurantData);

                    filteredRestaurants.forEach(restaurant => {

                        //음식점 정보 팝업창
                        const infoWindow00 = new naver.maps.InfoWindow({
                            content: '<div style= display: flex; align-items: center; padding:10px; font-size: 9px">' +
                                '<h4>' + restaurant.restaurantName + '</h4>' +
                                '<p> 종류 : ' + restaurant.category + '</p>' +
                                '</div>'
                        })

                        //음식점 마커
                        const marker00 = new naver.maps.Marker({
                            position : new naver.maps.LatLng(restaurant.latitude, restaurant.longitude),
                            map : map
                        })

                        // 마커 클릭 시 인포윈도우 표시
                        naver.maps.Event.addListener(marker00, 'click', function() {
                            infoWindow00.open(map, marker00);
                        });

                        markers.push(marker00);  //배열에 마커 추가

                    })

                    map.setCenter(newPosition);
                    map.setZoom(15);

                })
                .catch(err => console.error("Failed", err));

            /////////////////////////////////////////////--*

        } else {
            alert("좌표 정보가 없습니다.");
        }

        regionModal.classList.add("hidden");
    } else {
        alert("구와 동을 모두 선택해주세요.");
    }
});

function renderRestaurantList(data) {
    const restaurantList = document.querySelector('.restaurant-list');
    restaurantList.innerHTML = ''; // 기존 리스트 초기화

    if (data.length === 0) {
        // 데이터가 없을 때 기본 메시지 표시
        restaurantList.innerHTML = '<div class="restaurant-list-placeholder">표시할 음식점이 없습니다.</div>';
        return;
    }

    // 데이터가 있으면 리스트 항목 추가
    data.forEach((restaurant) => {
        const listItem = document.createElement('div');
        listItem.className = 'restaurant-list-item';
        listItem.innerHTML = `
            <h4>${restaurant.name}</h4>
            <p>${restaurant.address}</p>
            <p>${restaurant.category}</p>
        `;
        restaurantList.appendChild(listItem);
    });
} // 전준영님 코드



//====================================================================================

//입력창 비우기
reset.addEventListener("click", function() {
    loc.value = "";

})

var map = new naver.maps.Map('map' , {
    center : new naver.maps.LatLng(37.5665, 126.9780),
    zoom : 11
})


search.addEventListener("click",  function() {
    input = loc.value;

    //console.log("입력값 : ",input);

    //가게 검색했을 때 마커
    if(marker) {
        marker.setMap(null);
        marker = null;

    }

    //현 위치 기준 1km 내 식당을 표시해주는 마커
    if(markers && markers.length > 0) {
        markers.forEach(marker => {
            marker.setMap(null); //배열의 각 마커 지우기

        })

        // 배열 비우기
        markers.length = 0;
    }

    //const url = "/getRestaurantName?input=" + input;
    //console.log(url);


    console.log(`/getRestaurantName?input=${input}`);
    fetch(`http://localhost:8888/getRestaurantName?input=${input}`)
        .then(response => response.json())
        .then(data => {

            //지도에 표시된 특정 위치에 대한 정보를 팝업 형태로 보여줌
            var infowindow = new naver.maps.InfoWindow({
                //content 안에는 html 문자열로 정의함.(이미지,텍스트,링크 등 포함가능)
                content: '<div style= display: flex; align-items: center; padding:10px; font-size: 12px">' +
                    '<img src="/images/image01.png" style="width:100px; height:auto;  overflow-clip-margin: content-box; overflow: clip; ">' + // 이미지 추가
                    '<h4>' + data.name + '</h4>' +
                    '<p> 주소 : ' + data.addr + '</p>' +
                    '<p> 종류 : ' + data.category + '</p>' +
                    '<p> 영업 : ' + data.open +  '~' + data.close + '</p>' +
                    '</div>'
            })

            //새 마커 지도에 추가
            marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(data.latitude, data.longitude),
                map: map
            })


            infowindow.open(map, marker);

            //지도 중심 이동
            map.setCenter(new naver.maps.LatLng(data.latitude, data.longitude));
            map.setZoom(15);

        })
        .catch(error => console.log('Error : ', error));

})

myloc.addEventListener("click", function() {
    //가게 검색했을 때 마커
    if(marker) {
        marker.setMap(null);
        marker = null;

    }

    //현 위치 기준 1km 내 식당을 표시해주는 마커
    if(markers && markers.length > 0) {
        markers.forEach(marker => {
            marker.setMap(null); //배열의 각 마커 지우기

        })

        // 배열 비우기
        markers.length = 0;
    }

    map = new naver.maps.Map('map' , {
        center : new naver.maps.LatLng(37.5172, 127.0413), //내가 있는 지역이 서울이 아니라서 일단 강남구청역으로 고정
        zoom : 11
    })


    // 현재 위치에 마커 표시
    marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5172, 127.0413),
        map: map,
        icon: {
            url: "/images/location_icon.png", // 현재 위치와 비슷한 아이콘 URL
            size: new naver.maps.Size(24, 37),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(12, 37),
        }
    });

    fetch('/allData')
        .then(response => response.json())
        .then(data => {
            restaurantData = data;

            const filteredRestaurants = filterRestaurants(37.5172, 127.0413, restaurantData);

            filteredRestaurants.forEach(restaurant => {

                const infoWindow00 = new naver.maps.InfoWindow({
                    content: '<div style= display: flex; align-items: center; padding:10px; font-size: 9px">' +
                        '<h4>' + restaurant.restaurantName + '</h4>' +
                        '<p> 종류 : ' + restaurant.category + '</p>' +
                        '</div>'
                })

                const marker00 = new naver.maps.Marker({
                    position : new naver.maps.LatLng(restaurant.latitude, restaurant.longitude),
                    map : map
                })

                // 마커 클릭 시 인포윈도우 표시
                naver.maps.Event.addListener(marker00, 'click', function() {
                    infoWindow00.open(map, marker00);
                });

                markers.push(marker00);  //배열에 마커 추가

            })

            map.setCenter(new naver.maps.LatLng(37.5172, 127.0413));
            map.setZoom(15);


        })
        .catch(err => console.error("Failed", err));



})


function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // 지구 반지름 (km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 거리 반환 (km)
}

function filterRestaurants(centerLat, centerLng, restaurants) {
    return restaurants.filter(restaurant => {
        const distance = calculateDistance(centerLat, centerLng, restaurant.latitude, restaurant.longitude);
        return distance <= 1; // 반경 1km 이내
    });
}
