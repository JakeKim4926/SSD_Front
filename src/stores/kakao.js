import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useMountainApiStore } from './mountain_api'

export const useKakaoStore = defineStore('kakao', () => {

    let map = null;
    let address = ref("");
    let latitude = ref(36.343231115396144); // 위도
    let longtitude = ref(127.37178814274175); // 경도

    const mountainApiStore = useMountainApiStore()

    // getter for Map
    const getMap = computed(() => {
        return map;
    })

    // 카카오 맵 API 받자
    const initMap = async function () {
        let myCenter = new kakao.maps.LatLng(33.450701, 126.570667); //카카오본사
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(() => {
                // const lat = position.coords.latitude;
                // const lon = position.coords.longitude;
                myCenter = new kakao.maps.LatLng(latitude.value, longtitude.value);
                new kakao.maps.Marker({
                    map,
                    position: myCenter,
                });
                map.setCenter(myCenter);
            });
        }
        const container = document.getElementById('map');
        const options = {
            center: myCenter,
            level: 6,
        };
        // 지도 객체를 등록합니다.
        map = new kakao.maps.Map(container, options);
        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        const mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        drawMap()
    };

    const getKakao = async function () {
        if (window.kakao && window.kakao.maps) {
            initMap();
        } else {
            const script = document.createElement('script'); // autoload=false 스크립트를 동적으로 로드하기 위해서 사용
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${import.meta.env.VITE_KAKAO_API_KEY
                }`;
            script.addEventListener('load', () => {
                console.log('Kakao Maps SDK script loaded successfully');

                kakao.maps.load(initMap);
            }); //헤드태그에 추가
            script.addEventListener('error', (error) => {
                console.error('Error loading Kakao Maps SDK script:', error);
            });
            document.head.appendChild(script);
        }
    }

    const getAddress = function () {
        // 여기서 주소 얻기
        // 좌표계 변환 API 호출
        axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longtitude.value}&y=${latitude.value}`, {
            headers: {
                'Authorization': `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
            },
        })
            .then(response => {
                // API 응답에서 주소 정보를 추출
                address.value = response.data.documents[0].address.address_name;
            })
            .catch(error => {
                console.error('API 호출 오류:', error);
            });
    }

    const getterAddress = computed(() => {
        return address.value;
    });

    let drawGPS = ref([])

    const drawMap = function () {
        // 카카오 맵 API에 맞추어 그리기 위해 다시 푸시할 배열 하나 만들자
        // 이 배열은 1부터 사용해야해
        console.log('size of list', mountainApiStore.getMountainList.value.length)
        if (mountainApiStore.getMountainList.value.length < 1) {
            console.log("there is nothig to draw")
            return;
        }
        // console.log('바꾸기 전', mountainApiStore.getMountainList.value[1].value.lat_lon[0])
        for (let i = 1; i < mountainApiStore.getMountainList.value.length; i++) {
            // 좌표를 들고있는 반큼 배열에 담자
            drawGPS.value = []
            for (let j = 0; j < mountainApiStore.getMountainList.value[i].value.lat_lon.length; j++) {
                let loadLatitude = mountainApiStore.getMountainList.value[i].value.lat_lon[j][0];
                let loadLongtitude = mountainApiStore.getMountainList.value[i].value.lat_lon[j][1];
                // 카카오 맵 API 형태에 맞게 넣자
                drawGPS.value.push(new kakao.maps.LatLng(loadLatitude, loadLongtitude))
            }
            // console.log(drawGPS.value)
            // 지도에 선을 표시한다 
            var polyline = new kakao.maps.Polyline({
                map: map, // 선을 표시할 지도 객체 
                path: drawGPS.value,
                strokeWeight: 2, // 선의 두께
                strokeColor: '#FF0000', // 선 색
                strokeOpacity: 0.9, // 선 투명도
                strokeStyle: 'solid' // 선 스타일
            });
        }

    }


    return { map, getMap, drawGPS, initMap, getKakao, getAddress, drawMap, address, latitude, longtitude, getterAddress }
}, { persist: true })


